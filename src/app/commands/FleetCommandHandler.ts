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

  register(latitude: number, longitude: number, altitude?: number): FleetData | undefined {
    try {
      const newFleet = new FleetData(randomUUID(), latitude, longitude, altitude);
      this.fleetManager.registerFleet(newFleet);
      return newFleet;
    } catch (error) {
      throw new Error(error?.toString());
    }
  }

  getById(fleetId: string): FleetData | undefined {
    try {
      const fleetData = this.fleetManager.getById(fleetId);
      if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, fleetId));

      return fleetData;
    } catch (error) {
      throw new Error(error?.toString());
    }
  }

  getByLocation(location: GPS): FleetData | undefined {
    return this.fleetManager.getFleets().find((fleet) => {
      return fleet.getLocation() === location;
    });
  }

  getFleets(): FleetData[] {
    return this.fleetManager.getFleets();
  }

  addVehicleToFleet(fleetId: string, plate: string) {
    try {
      const vehicleData = this.vehicleManager.getByPlate(plate);
      if (vehicleData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      this.fleetManager.addVehicleToFleet(fleetId, vehicleData);
    } catch (error) {
      throw new Error(error?.toString());
    }
  }

  removeVehicleToFleet(fleetId: string, plate: string) {
    try {
      const vehicleData = this.vehicleManager.getByPlate(plate);
      if (vehicleData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      this.fleetManager.removeVehicleToFleet(fleetId, vehicleData);
    } catch (error) {
      throw new Error(error?.toString());
    }
  }
}
