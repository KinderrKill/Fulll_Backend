import { VehicleManager } from './domain/VehicleManager';
import { FleetManager } from './domain/FleetManager';
import { VehicleData } from './domain/VehicleData';
import { randomUUID } from 'crypto';
import { CLI_CHOICE, getConvertedMessage, getErrorMessage } from './utils/Constants';
import { select, input } from '@inquirer/prompts';
import { fleetManager as fm, vehicleManager as vm } from './index';
import { FleetData } from './domain/FleetData';
import { MSG_CLI, MSG_FM } from './utils/Lang';

let fleetManager: FleetManager;
let vehicleManager: VehicleManager;

export function startCLI() {
  if (fm === undefined || vm === undefined) {
    console.error(MSG_CLI.ERROR_INIT);
    return;
  } else {
    fleetManager = fm;
    vehicleManager = vm;

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

  const fleet = new FleetData(
    randomUUID(),
    parseInt(answers.latitude),
    parseInt(answers.longitude),
    parseInt(answers.altitude) ? parseInt(answers.altitude) : undefined
  );

  fleetManager.registerFleet(fleet);

  console.log('');
  console.log(MSG_CLI.FLEET_CREATED, fleet);
  console.log(MSG_CLI.FLEET_ID, fleet.getId());
  console.log(MSG_CLI.FLEET_GPS, fleet.getLocation());
  console.log('');

  await askAction();
}

async function registerVehicle() {
  console.log('');
  const answers = {
    fleetId: await input({ message: MSG_CLI.ASK_FLEET_ID }),
    plate: await input({ message: MSG_CLI.ASK_PLATE }),
  };
  console.log('');

  try {
    const fleetData = fleetManager.getById(answers.fleetId);
    if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, answers.fleetId));

    const vehicleData = new VehicleData(answers.plate, answers.fleetId);
    vehicleManager.registerVehicle(vehicleData);
    vehicleManager.updateVehicleLocation(vehicleData, fleetData.getLocation());

    fleetManager.addVehicleToFleet(answers.fleetId, vehicleData);
  } catch (error) {
    console.error(error);
  }

  await askAction();
}

async function locateVehicle() {
  console.log('');
  const plate = await input({ message: MSG_CLI.ASK_PLATE });
  console.log('');

  try {
    const vehicleData = vehicleManager.getByPlate(plate);
    if (vehicleData !== undefined && vehicleData.getLocation() !== undefined) {
      console.log(getConvertedMessage(MSG_CLI.LOCATE_SUCESS, [plate, JSON.stringify(vehicleData.getLocation())]));
    }
  } catch {
    console.error(getErrorMessage(MSG_CLI.LOCATE_ERROR, [plate]));
  }

  console.log('');
  await askAction();
}

async function consultData() {
  console.log('');
  console.log(MSG_CLI.CONSULT_FLEET);

  fleetManager.getFleets().forEach((fleet) => {
    console.log(MSG_CLI.FLEET_ID, fleet.getId());
    console.log(MSG_CLI.FLEET_GPS, JSON.stringify(fleet.getLocation()));

    console.log(MSG_CLI.FLEET_VEHICLES, fleet.getParkedVehicles());
    console.log('');
  });

  console.log(MSG_CLI.CONSULT_VEHICLE);

  vehicleManager.getVehicles().forEach((vehicle) => {
    console.log('.', vehicle);
  });

  console.log('');
  await askAction();
}
