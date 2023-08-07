import { MSG_TEST } from './../../../utils/Lang';
import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, When, Then } from '@cucumber/cucumber';

import { fleetCommandHandler, vehicleCommandHandler } from '../../sharedValue';
import { getErrorMessage } from '../../../utils/Constants';

const demoVehicle = new VehicleData('AA-000-AA');
let demoFleet: FleetData;

Given(/^a fleet$/, () => {
  const tempFleet = fleetCommandHandler.register(1.073197, 49.381959);
  if (tempFleet !== undefined) {
    demoFleet = tempFleet;
  } else {
    throw Error(getErrorMessage(MSG_TEST.ERROR_DURING_FLEET_CREATION));
  }
});

Then(/^a vehicle$/, () => {
  vehicleCommandHandler.register(demoVehicle.getPlate());
});

When(/^I register this vehicle into my fleet$/, () => {
  fleetCommandHandler.addVehicleToFleet(demoFleet.getId(), demoVehicle.getPlate());
});

Then(/^this vehicle should be part of my vehicle fleet$/, () => {
  fleetCommandHandler.getById(demoFleet.getId())?.getVehicleByPlate(demoVehicle.getPlate());
});
