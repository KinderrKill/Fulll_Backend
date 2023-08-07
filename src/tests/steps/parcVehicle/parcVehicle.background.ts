import { FleetData } from '../../../domain/FleetData';
import { VehicleData } from '../../../domain/VehicleData';
import { Given, Then } from '@cucumber/cucumber';

import { fleetCommandHandler, vehicleCommandHandler } from '../../sharedValue';

export const demoVehicle = new VehicleData('AA-100-AA');

export let demoFleet: FleetData;

Given(/^a new fresh fleet$/, () => {
  // Conditional because this be called before each step
  if (!demoFleet) {
    const tempFleet = fleetCommandHandler.register(10.43, 20.2103, 10);
    if (tempFleet !== undefined) {
      demoFleet = tempFleet;
    }
  }
});

Given(/^a new fresh vehicle$/, () => {
  // Conditional because this be called before each step
  if (vehicleCommandHandler.getByPlate(demoVehicle.getPlate()) === undefined) {
    vehicleCommandHandler.register(demoVehicle.getPlate());
  }
});

Then(/^I have registered this vehicle into my new fleet$/, () => {
  // Conditional because this be called before each step
  const fleet = fleetCommandHandler.getById(demoFleet.getId());

  if (fleet && fleet.getVehicleByPlate(demoVehicle.getPlate()) === undefined) {
    fleetCommandHandler.addVehicleToFleet(fleet?.getId(), demoVehicle.getPlate());
  }
});
