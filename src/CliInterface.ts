import { GPS } from './utils/SharedTypes';
import { VehicleCommandHandler } from './app/commands/VehicleCommandHandler';
import { CLI_CHOICE, getConvertedMessage, getErrorMessage } from './utils/Constants';
import { select, input } from '@inquirer/prompts';
import { MSG_CLI, MSG_FM, MSG_VM, MSG_TEST } from './utils/Lang';
import { FleetCommandHandler } from './app/commands/FleetCommandHandler';

let fleetCommandHandler: FleetCommandHandler;
let vehicleCommandHandler: VehicleCommandHandler;

export function startCLI(
  inputFleetCommandHandler: FleetCommandHandler,
  inputVehicleCommandHandler: VehicleCommandHandler
) {
  if (inputFleetCommandHandler === undefined || inputVehicleCommandHandler === undefined) {
    console.error(MSG_CLI.ERROR_INIT);
    return;
  } else {
    fleetCommandHandler = inputFleetCommandHandler;
    vehicleCommandHandler = inputVehicleCommandHandler;

    askAction();
  }
}

async function askAction() {
  const answers = await select({
    message: MSG_CLI.ASK_ACTION,
    choices: [CLI_CHOICE.CREATE_FLEET, CLI_CHOICE.REGISTER_VEHICLE, CLI_CHOICE.LOCATE_VEHICLE, CLI_CHOICE.CONSULT_DATA],
  });

  switch (answers) {
    case CLI_CHOICE.CREATE_FLEET.value:
      await createFleet();
    case CLI_CHOICE.REGISTER_VEHICLE.value:
      await registerVehicle();
    case CLI_CHOICE.LOCATE_VEHICLE.value:
      await locateVehicle();
    case CLI_CHOICE.CONSULT_DATA.value:
      await consultData();
    default:
      await askAction();
  }
}

async function createFleet() {
  const answers = {
    latitude: await input({
      message: MSG_CLI.ASK_LAT,
      validate: (inputValue) => {
        const numberValue = parseFloat(inputValue);
        return !isNaN(numberValue) ? true : MSG_CLI.NAN;
      },
    }),
    longitude: await input({
      message: MSG_CLI.ASK_LNG,
      validate: (inputValue) => {
        const numberValue = parseFloat(inputValue);
        return !isNaN(numberValue) ? true : MSG_CLI.NAN;
      },
    }),
    altitude: await input({
      message: MSG_CLI.ASK_ALT,
      validate: (inputValue) => {
        if (inputValue === '') return true;

        const numberValue = parseFloat(inputValue);
        return !isNaN(numberValue) ? true : MSG_CLI.NAN_OPTIONAL;
      },
    }),
  };

  const fleet = fleetCommandHandler.register(
    parseInt(answers.latitude),
    parseInt(answers.longitude),
    parseInt(answers.altitude)
  );

  if (fleet === undefined) {
    throw new Error(getErrorMessage(MSG_TEST.ERROR_DURING_FLEET_CREATION));
  }

  displayBlankLine();
  console.log(getConvertedMessage(MSG_CLI.FLEET_CREATED));
  console.log(getConvertedMessage(MSG_CLI.FLEET_ID, fleet.getId()));
  console.log(getConvertedMessage(MSG_CLI.FLEET_GPS, JSON.stringify(fleet.getLocation())));
  displayBlankLine();

  await askAction();
}

async function registerVehicle() {
  displayBlankLine();
  const answers = {
    fleetId: await input({ message: MSG_CLI.ASK_FLEET_ID }),
    plate: await input({ message: MSG_CLI.ASK_PLATE }),
  };
  displayBlankLine();

  try {
    const fleetData = fleetCommandHandler.getById(answers.fleetId);
    if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, answers.fleetId));

    const vehicle = vehicleCommandHandler.register(answers.plate, answers.fleetId);
    if (vehicle === undefined) throw new Error(getErrorMessage(MSG_TEST.ERROR_DURING_VEHICLE_CREATION));
    vehicleCommandHandler.assignLocationToVehicle(answers.plate, fleetData.getId());

    fleetCommandHandler.addVehicleToFleet(fleetData.getId(), answers.plate);
  } catch (error) {
    console.error(error);
  }

  await askAction();
}

async function locateVehicle() {
  displayBlankLine();
  const plate = await input({ message: MSG_CLI.ASK_PLATE });
  displayBlankLine();

  try {
    const vehicleData = vehicleCommandHandler.getByPlate(plate);
    if (vehicleData !== undefined) {
      const vehicleLocation = vehicleData.getLocation();
      if (vehicleLocation !== undefined) {
        const fleetData = fleetCommandHandler.getByLocation(vehicleLocation);
        if (fleetData === undefined) {
          throw new Error(
            getErrorMessage(MSG_CLI.LOCATE_ERROR_NO_FLEET_FOUND, [plate, JSON.stringify(vehicleLocation)])
          );
        }
        console.log(
          getConvertedMessage(MSG_CLI.LOCATE_SUCESS, [plate, JSON.stringify(vehicleLocation), fleetData.getId()])
        );
      }
    }
  } catch {
    console.error(getErrorMessage(MSG_CLI.LOCATE_ERROR, [plate]));
  }

  displayBlankLine();
  await askAction();
}

async function consultData() {
  displayBlankLine();
  console.log(MSG_CLI.CONSULT_FLEET);

  fleetCommandHandler.getFleets().forEach((fleet) => {
    console.log(getConvertedMessage(MSG_CLI.FLEET_ID, fleet.getId()));
    console.log(getConvertedMessage(MSG_CLI.FLEET_GPS, JSON.stringify(fleet.getLocation())));

    console.log(getConvertedMessage(MSG_CLI.FLEET_VEHICLES, JSON.stringify(fleet.getParkedVehicles())));
    displayBlankLine();
  });

  console.log(MSG_CLI.CONSULT_VEHICLE);

  vehicleCommandHandler.getVehicles().forEach((vehicle) => {
    console.log(JSON.stringify(vehicle));
  });

  displayBlankLine();

  await askAction();
}

function displayBlankLine(): void {
  return console.log('');
}
