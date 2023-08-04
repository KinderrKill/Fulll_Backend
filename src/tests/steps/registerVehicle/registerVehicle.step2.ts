import { FleetData } from '../../../domain/FleetData';
import { randomUUID } from 'crypto';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, Then } from '@cucumber/cucumber';
import { demoFleetManager, demoVehicleManager } from '../../sharedValue';
import { MSG_TEST } from '../../../utils/Lang';
import { getErrorMessage } from '../../../utils/Constants';

const demoVehicle = new VehicleData('AA-001-AA');
const demoFleet = new FleetData(randomUUID(), 1.073197, 49.381959);

Given(/^another fleet$/, () => {
  demoFleetManager.registerFleet(demoFleet);
});

Then(/^another vehicle$/, () => {
  demoVehicleManager.registerVehicle(demoVehicle);
});

Then(/^I have registered this vehicle into my fleet$/, () => {
  demoFleetManager.addVehicleToFleet(demoFleet.getId(), demoVehicle);
});

Then(
  /^I try to register this vehicle again and should be informed this this vehicle has already been registered$/,
  () => {
    try {
      demoFleetManager.addVehicleToFleet(demoFleet.getId(), demoVehicle);
    } catch {
      return true;
    }
    throw Error(getErrorMessage(MSG_TEST.VEHICLE_REGISTERED_TWICE, [demoVehicle.getPlate(), demoFleet.getId()]));
  }
);
