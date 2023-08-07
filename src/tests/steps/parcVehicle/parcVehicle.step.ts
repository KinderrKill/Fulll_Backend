import { vehicleCommandHandler } from './../../sharedValue';
import { MSG_TEST } from '../../../utils/Lang';
import { GPS } from '../../../utils/SharedTypes';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoVehicle, demoFleet } from './parcVehicle.background';
import { getErrorMessage } from '../../../utils/Constants';

let demoLocation: GPS;

Given(/^a location$/, () => {
  demoLocation = demoFleet.getLocation();
});

When(/^I park my vehicle at this location$/, () => {
  vehicleCommandHandler.assignLocationToVehicle(demoVehicle.getPlate(), demoFleet.getId());
});

Then(/^the known location of my vehicle should verify this location$/, () => {
  const vehicle = vehicleCommandHandler.getByPlate(demoVehicle.getPlate());
  if (vehicle && demoLocation !== vehicle.getLocation()) {
    throw new Error(
      getErrorMessage(MSG_TEST.NOT_THE_SAME_LOCATION, [demoVehicle.getPlate(), demoFleet.getLocation().toString()])
    );
  } else {
    return true;
  }
});
