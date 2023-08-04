import { VehicleManager } from '../../domain/VehicleManager';
import { MSG_FM, MSG_VM } from '../../utils/Lang';
import { FleetData } from '../../domain/FleetData';
import { GPS } from '../../utils/SharedTypes';
import { randomUUID } from 'crypto';
import { getErrorMessage } from '../../utils/Constants';
import { FleetManager } from '../../domain/FleetManager';

export class FleetCommandHandler {
  private fleetManager: FleetManager;
  private vehicleManager: VehicleManager;

  constructor(fleetManager: FleetManager, vehicleManager: VehicleManager) {
    this.fleetManager = fleetManager;
    this.vehicleManager = vehicleManager;
  }

  register({ latitude, longitude, altitude }: GPS) {
    try {
      const newFleet = new FleetData(randomUUID(), latitude, longitude, altitude);
      this.fleetManager.registerFleet(newFleet);
    } catch (error) {
      console.error(error);
    }
  }

  getById(fleetId: string) {
    try {
      const fleetData = this.fleetManager.getById(fleetId);
      if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, fleetId));

      return fleetData;
    } catch (error) {
      console.error(error);
    }
  }

  addVehicleToFleet(fleetId: string, plate: string) {
    try {
      const vehicleData = this.vehicleManager.getByPlate(plate);
      if (vehicleData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      this.fleetManager.addVehicleToFleet(fleetId, vehicleData);
    } catch (error) {
      console.error(error);
    }
  }

  removeVehicleToFleet(fleetId: string, plate: string) {
    try {
      const vehicleData = this.vehicleManager.getByPlate(plate);
      if (vehicleData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      this.fleetManager.removeVehicleToFleet(fleetId, vehicleData);
    } catch (error) {
      console.error(error);
    }
  }
}
