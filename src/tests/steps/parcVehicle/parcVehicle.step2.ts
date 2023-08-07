import { FleetData } from './../../../domain/FleetData';
import { MSG_TEST, MSG_VM } from '../../../utils/Lang';
import { GPS } from '../../../utils/SharedTypes';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoVehicle, demoFleet } from './parcVehicle.background';
import { getErrorMessage } from '../../../utils/Constants';
import { vehicleCommandHandler, fleetCommandHandler } from './../../sharedValue';

let demoAnotherFleet: FleetData;

Given(/^another brand new fleet$/, () => {
  if (!demoAnotherFleet) {
    const tempFleet = fleetCommandHandler.register(24.43, 20.2103, 10);
    if (tempFleet !== undefined) {
      demoAnotherFleet = tempFleet;
    }
  }
});

When(/^my vehicle has been parked into this new location$/, () => {
  vehicleCommandHandler.assignLocationToVehicle(demoVehicle.getPlate(), demoAnotherFleet.getId());
});

Then(
  /^I try to park my vehicle at this location and should be informed that my vehicle is already parked at this location$/,
  () => {
    try {
      vehicleCommandHandler.assignLocationToVehicle(demoVehicle.getPlate(), demoAnotherFleet.getId());
    } catch {
      return true;
    }

    throw new Error(getErrorMessage(MSG_TEST.NOT_THE_SAME_LOCATION, [demoVehicle.getPlate(), demoFleet.toString()]));
  }
);
