import { MSG_F } from '../utils/Lang';
import { VehicleData } from './VehicleData';
import { GPS } from '../utils/SharedTypes';
import { getErrorMessage } from '../utils/Constants';
import { ModifiableData } from '../utils/ModifiableData';

export class FleetData extends ModifiableData {
  private id: string;
  private registeredVehicles: VehicleData[];
  private location: GPS;

  constructor(id: string, latitude: number, longitude: number, altitude?: number) {
    super();

    this.id = id;
    this.registeredVehicles = [];
    this.location = {
      latitude,
      longitude,
      altitude,
    };

    this.setModified();
  }

  addVehicle(vehicleData: VehicleData) {
    if (this.registeredVehicles.includes(vehicleData)) {
      throw new Error(getErrorMessage(MSG_F.VEHICLE_ALREADY_PARKED, [vehicleData.getPlate(), this.id]));
    }

    this.registeredVehicles.push(vehicleData);
    this.setModified();
  }

  removeVehicle(plate: string) {
    const indexToRemove = this.registeredVehicles.findIndex((vehicle) => vehicle.getPlate() === plate);
    if (indexToRemove !== -1) {
      this.registeredVehicles.splice(indexToRemove, 1);
      this.setModified();
    }
  }

  getId() {
    return this.id;
  }

  getParkedVehicles() {
    return this.registeredVehicles;
  }

  getVehicleByPlate(plate: string): VehicleData | undefined {
    return this.registeredVehicles.find((vehicle) => vehicle.getPlate() === plate);
  }

  getLocation() {
    return this.location;
  }
}
