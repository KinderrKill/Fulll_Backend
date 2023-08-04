import { MSG_VM } from '../utils/Lang';
import { VehicleRepositoryImpl } from '../infra/VehicleRepositoryImpl';
import { VehicleData } from './VehicleData';
import { VehicleRepository } from '../infra/interfaces/VehicleRepository';
import { GPS } from '../utils/SharedTypes';
import { getErrorMessage } from '../utils/Constants';

export class VehicleManager {
  private repository: VehicleRepository;
  private vehicles: VehicleData[];

  constructor() {
    this.repository = new VehicleRepositoryImpl();
    this.vehicles = [];
  }

  public onEnable() {
    this.vehicles = this.repository.findAll();
  }

  public onDisable() {
    this.vehicles.filter((data) => data.isModified()).forEach((data) => this.repository.save(data));
  }

  public registerVehicle(vehicleData: VehicleData) {
    if (this.vehicles.some((vehicle) => vehicle.getPlate() === vehicleData.getPlate())) {
      throw new Error(getErrorMessage(MSG_VM.ALREADY_REGISTERED, [vehicleData.getPlate()]));
    }

    this.vehicles.push(vehicleData);
  }

  public removeVehicle(plate: string) {
    const indexToRemove = this.vehicles.findIndex((vehicle) => vehicle.getPlate() === plate);
    if (indexToRemove !== -1) {
      this.vehicles.splice(indexToRemove, 1);

      this.repository.deleteByPlate(plate);
    }
  }

  public updateVehicleLocation(vehicleData: VehicleData, updatedLocation: GPS) {
    if (vehicleData.getLocation() === updatedLocation) {
      throw new Error(getErrorMessage(MSG_VM.SAME_LOCATION, updatedLocation.toString()));
    }

    const vehicleIndex = this.vehicles.findIndex((vehicle) => vehicle.getPlate() === vehicleData.getPlate());
    this.vehicles[vehicleIndex] = vehicleData.addLocation(updatedLocation);
  }

  public getByPlate(plate: string): VehicleData | undefined {
    return this.vehicles.find((vehicle) => vehicle.getPlate() === plate);
  }

  public getVehicles() {
    return this.vehicles;
  }
}
