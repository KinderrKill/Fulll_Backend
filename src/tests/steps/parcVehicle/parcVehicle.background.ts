import { randomUUID } from 'crypto';
import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoFleetManager, demoVehicleManager } from '../../sharedValue';

export const demoVehicle = new VehicleData('AA-100-AA');
export const demoFleet = new FleetData(randomUUID(), 10.073197, 490.381959);
export const demoAnotherFleet = new FleetData(randomUUID(), 490.381959, 10.07, 10);

Given(/^a new fresh fleet$/, () => {
  // Conditional because this be called before each step
  if (demoFleetManager.getById(demoFleet.getId()) === undefined) {
    demoFleetManager.registerFleet(demoFleet);
  }
});

Given(/^a new fresh vehicle$/, () => {
  // Conditional because this be called before each step
  if (demoVehicleManager.getByPlate(demoVehicle.getPlate()) === undefined) {
    demoVehicleManager.registerVehicle(demoVehicle);
  }
});

Then(/^I have registered this vehicle into my new fleet$/, () => {
  // Conditional because this be called before each step
  if (demoFleet.getVehicleByPlate(demoVehicle.getPlate()) === undefined) {
    demoFleetManager.addVehicleToFleet(demoFleet.getId(), demoVehicle);
  }
});
