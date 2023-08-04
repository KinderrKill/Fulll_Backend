import { demoVehicleManager } from './../../sharedValue';
import { MSG_TEST, MSG_VM } from '../../../utils/Lang';
import { GPS } from '../../../utils/SharedTypes';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoVehicle, demoFleet, demoAnotherFleet } from './parcVehicle.background';
import { getErrorMessage } from '../../../utils/Constants';

let demoAnotherLocation: GPS;

Given(/^a new location$/, () => {
  demoAnotherLocation = demoAnotherFleet.getLocation();
});

When(/^my vehicle has been parked into this new location$/, () => {
  demoVehicleManager.updateVehicleLocation(demoVehicle, demoAnotherLocation);
});

Then(
  /^I try to park my vehicle at this location and should be informed that my vehicle is already parked at this location$/,
  () => {
    try {
      demoVehicleManager.updateVehicleLocation(demoVehicle, demoAnotherLocation);
    } catch {
      return true;
    }

    throw new Error(getErrorMessage(MSG_TEST.NOT_THE_SAME_LOCATION, [demoVehicle.getPlate(), demoFleet.toString()]));
  }
);
