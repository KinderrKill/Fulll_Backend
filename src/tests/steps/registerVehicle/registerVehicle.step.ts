import { randomUUID } from 'crypto';
import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, When, Then } from '@cucumber/cucumber';

import { demoFleetManager, demoVehicleManager } from '../../sharedValue';

const demoVehicle = new VehicleData('AA-000-AA');
const demoFleet = new FleetData(randomUUID(), 1.073197, 49.381959);

Given(/^a fleet$/, () => {
  demoFleetManager.registerFleet(demoFleet);
});

Then(/^a vehicle$/, () => {
  demoVehicleManager.registerVehicle(demoVehicle);
});

When(/^I register this vehicle into my fleet$/, () => {
  demoFleetManager.addVehicleToFleet(demoFleet.getId(), demoVehicle);
});

Then(/^this vehicle should be part of my vehicle fleet$/, () => {
  demoFleet.getVehicleByPlate(demoVehicle.getPlate());
});
