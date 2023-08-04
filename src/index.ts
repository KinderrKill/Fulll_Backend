import { startCLI } from './CliInterface';
import { FleetManager } from './domain/FleetManager';
import { VehicleManager } from './domain/VehicleManager';

let fleetManager: FleetManager | undefined;
let vehicleManager: VehicleManager | undefined;

function startApplication() {
  fleetManager = new FleetManager();
  vehicleManager = new VehicleManager();

  fleetManager.onEnable();
  vehicleManager.onEnable();

  // Start the CLI interface
  startCLI();
}

function onExit() {
  fleetManager !== undefined && fleetManager.onDisable();
  vehicleManager !== undefined && vehicleManager.onDisable();
}

startApplication();

process.on('exit', onExit);

export { fleetManager, vehicleManager };
