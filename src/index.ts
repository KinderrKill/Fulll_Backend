import { startCLI } from './CliInterface';
import { FleetManager } from './domain/FleetManager';
import { VehicleManager } from './domain/VehicleManager';
import { VehicleCommandHandler } from './app/commands/VehicleCommandHandler';
import { FleetCommandHandler } from './app/commands/FleetCommandHandler';

let fleetManager: FleetManager | undefined;
let vehicleManager: VehicleManager | undefined;

let fleetCommandHandler: FleetCommandHandler | undefined;
let vehicleCommandHandler: VehicleCommandHandler | undefined;

function startApplication() {
  fleetManager = new FleetManager();
  vehicleManager = new VehicleManager();

  fleetManager.onEnable();
  vehicleManager.onEnable();

  fleetCommandHandler = new FleetCommandHandler(fleetManager, vehicleManager);
  vehicleCommandHandler = new VehicleCommandHandler(fleetManager, vehicleManager);

  // Start the CLI interface
  startCLI(fleetCommandHandler, vehicleCommandHandler);
}

function onExit() {
  fleetManager !== undefined && fleetManager.onDisable();
  vehicleManager !== undefined && vehicleManager.onDisable();
}

startApplication();

process.on('exit', onExit);

export { fleetManager, vehicleManager };
