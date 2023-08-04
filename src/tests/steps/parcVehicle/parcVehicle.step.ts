import { MSG_TEST } from '../../../utils/Lang';
import { GPS } from '../../../utils/SharedTypes';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoVehicle, demoFleet } from './parcVehicle.background';
import { getErrorMessage } from '../../../utils/Constants';
import { demoVehicleManager } from '../../sharedValue';

let demoLocation: GPS;

Given(/^a location$/, () => {
  demoLocation = demoFleet.getLocation();
});

When(/^I park my vehicle at this location$/, () => {
  demoVehicleManager.updateVehicleLocation(demoVehicle, demoLocation);
});

Then(/^the known location of my vehicle should verify this location$/, () => {
  if (demoFleet.getLocation() !== demoVehicle.getLocation()) {
    throw new Error(
      getErrorMessage(MSG_TEST.NOT_THE_SAME_LOCATION, [demoVehicle.getPlate(), demoFleet.getLocation().toString()])
    );
  } else {
    return true;
  }
});
