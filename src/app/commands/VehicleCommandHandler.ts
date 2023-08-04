import { GPS } from '../../utils/SharedTypes';
import { MSG_VM, MSG_FM } from '../../utils/Lang';
import { VehicleData } from './../../domain/VehicleData';
import { VehicleManager } from '../../domain/VehicleManager';
import { FleetManager } from '../../domain/FleetManager';
import { getErrorMessage } from '../../utils/Constants';

export class VehicleCommandHandler {
  private fleetManager: FleetManager;
  private vehicleManager: VehicleManager;

  constructor(fleetManager: FleetManager, vehicleManager: VehicleManager) {
    this.fleetManager = fleetManager;
    this.vehicleManager = vehicleManager;
  }

  register(plate: string, fleetId?: string) {
    try {
      const newVehicle = new VehicleData(plate, fleetId);
      this.vehicleManager.registerVehicle(newVehicle);
    } catch (error) {
      console.error(error);
    }
  }

  getByPlate(plate: string): VehicleData | undefined {
    try {
      const vehicleData = this.vehicleManager.getByPlate(plate);
      if (vehicleData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      return vehicleData;
    } catch (error) {
      console.error(error);
    }
  }

  assignLocationToVehicle(plate: string, fleetId: string) {
    try {
      const fleetData = this.fleetManager.getById(fleetId);
      if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, fleetId));

      const vehiculeData = this.vehicleManager.getByPlate(plate);
      if (vehiculeData === undefined) throw new Error(getErrorMessage(MSG_VM.UNDEFINED_VEHICLE, plate));

      this.vehicleManager.updateVehicleLocation(vehiculeData, fleetData.getLocation());
    } catch (error) {
      console.error(error);
    }
  }

  locateVehicle(plate: string): GPS | undefined {
    try {
      const vehicleData = this.getByPlate(plate);
      return vehicleData?.getLocation();
    } catch (error) {
      console.error(error);
    }
  }
}
