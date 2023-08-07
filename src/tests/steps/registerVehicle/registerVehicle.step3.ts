import { vehicleCommandHandler } from './../../sharedValue';
import { MSG_TEST } from '../../../utils/Lang';
import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, When, Then } from '@cucumber/cucumber';
import { fleetCommandHandler } from '../../sharedValue';
import { getErrorMessage } from '../../../utils/Constants';

const demoVehicle = new VehicleData('AA-002-AA');

let demoFleet: FleetData;
let demoAnotherFleet: FleetData;

Given(/^a new fleet$/, () => {
  const tempFleet = fleetCommandHandler.register(10.07, 70.59);
  if (tempFleet !== undefined) {
    demoFleet = tempFleet;
  } else {
    throw Error(getErrorMessage(MSG_TEST.ERROR_DURING_FLEET_CREATION));
  }
});

Then(/^the fleet of another user$/, () => {
  const tempFleet = fleetCommandHandler.register(5.07, 50.59, 27);
  if (tempFleet !== undefined) {
    demoAnotherFleet = tempFleet;
  } else {
    throw Error(getErrorMessage(MSG_TEST.ERROR_DURING_FLEET_CREATION));
  }
});

Then(/^a new vehicle$/, () => {
  vehicleCommandHandler.register(demoVehicle.getPlate());
});

Then(/^this vehicle has been registered into the other user's fleet$/, () => {
  fleetCommandHandler.addVehicleToFleet(demoFleet.getId(), demoVehicle.getPlate());
});

When(/^I register the vehicle into my fleet$/, () => {
  fleetCommandHandler.addVehicleToFleet(demoAnotherFleet.getId(), demoVehicle.getPlate());
});

Then(/^this vehicle should be part of both fleets$/, () => {
  const fleetsToCheck = [demoFleet, demoAnotherFleet];

  const areAllFleetsPresent = fleetsToCheck.every((fleet) => fleet.getVehicleByPlate(demoVehicle.getPlate()));

  if (!areAllFleetsPresent) {
    throw new Error(
      getErrorMessage(MSG_TEST.FLEETS_ARE_NOT_ALL_PRESENTS, [
        demoVehicle.getPlate(),
        demoFleet.getId(),
        demoAnotherFleet.getId(),
      ])
    );
  }

  return true;
});
