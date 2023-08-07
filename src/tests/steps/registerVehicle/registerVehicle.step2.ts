import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, Then } from '@cucumber/cucumber';
import { fleetCommandHandler, vehicleCommandHandler } from '../../sharedValue';
import { MSG_TEST } from '../../../utils/Lang';
import { getErrorMessage } from '../../../utils/Constants';

const demoVehicle = new VehicleData('AA-001-AA');
let demoFleet: FleetData;

Given(/^another fleet$/, () => {
  const tempFleet = fleetCommandHandler.register(49.073197, 1.381959, 14.25554);
  if (tempFleet !== undefined) {
    demoFleet = tempFleet;
  } else {
    throw Error(getErrorMessage(MSG_TEST.ERROR_DURING_FLEET_CREATION));
  }
});

Then(/^another vehicle$/, () => {
  vehicleCommandHandler.register(demoVehicle.getPlate());
});

Then(/^I have registered this vehicle into my fleet$/, () => {
  fleetCommandHandler.addVehicleToFleet(demoFleet.getId(), demoVehicle.getPlate());
});

Then(
  /^I try to register this vehicle again and should be informed this this vehicle has already been registered$/,
  () => {
    try {
      fleetCommandHandler.addVehicleToFleet(demoFleet.getId(), demoVehicle.getPlate());
    } catch {
      return true;
    }
    throw Error(getErrorMessage(MSG_TEST.VEHICLE_REGISTERED_TWICE, [demoVehicle.getPlate(), demoFleet.getId()]));
  }
);
