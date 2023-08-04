import { MSG_TEST } from '../../../utils/Lang';
import { randomUUID } from 'crypto';
import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, When, Then } from '@cucumber/cucumber';
import { demoFleetManager, demoVehicleManager } from '../../sharedValue';
import { getErrorMessage } from '../../../utils/Constants';

const demoVehicle = new VehicleData('AA-002-AA');
const demoFleet = new FleetData(randomUUID(), 1.073197, 49.381959);
const demoAnotherFleet = new FleetData(randomUUID(), 49.381959, 1.07, 10);

Given(/^a new fleet$/, () => {
  demoFleetManager.registerFleet(demoFleet);
});

Then(/^the fleet of another user$/, () => {
  demoFleetManager.registerFleet(demoAnotherFleet);
});

Then(/^a new vehicle$/, () => {
  demoVehicleManager.registerVehicle(demoVehicle);
});

Then(/^this vehicle has been registered into the other user's fleet$/, () => {
  demoAnotherFleet.addVehicle(demoVehicle);
  demoVehicle.addFleet(demoFleet.getId());
});

When(/^I register the vehicle into my fleet$/, () => {
  demoFleet.addVehicle(demoVehicle);
  demoVehicle.addFleet(demoAnotherFleet.getId());
});

Then(/^this vehicle should be part of both fleets$/, () => {
  const fleetsToCheck = [demoFleet.getId(), demoAnotherFleet.getId()];

  const areAllFleetsPresent = fleetsToCheck.every((fleetId) => demoVehicle.getFleets().includes(fleetId));

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
