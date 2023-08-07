import { VehicleCommandHandler } from './../app/commands/VehicleCommandHandler';
import { FleetCommandHandler } from '../app/commands/FleetCommandHandler';
import { FleetManager } from '../domain/FleetManager';
import { VehicleManager } from '../domain/VehicleManager';

export const demoFleetManager = new FleetManager();
export const demoVehicleManager = new VehicleManager();

export const fleetCommandHandler = new FleetCommandHandler(demoFleetManager, demoVehicleManager);
export const vehicleCommandHandler = new VehicleCommandHandler(demoFleetManager, demoVehicleManager);
