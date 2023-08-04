import { VehicleData } from './../domain/VehicleData';
import { VehicleRepository } from './interfaces/VehicleRepository';

export class VehicleRepositoryImpl implements VehicleRepository {
  private inMemoryVehicles: VehicleData[] = [];

  findByPlate(plate: string): VehicleData | null {
    const vehicleData = this.inMemoryVehicles.find((vehicle) => vehicle.getPlate() === plate);
    return vehicleData ? vehicleData : null;
  }

  findAll(): VehicleData[] {
    return this.inMemoryVehicles;
  }

  save(vehicleData: VehicleData): void {
    const existingIndex = this.inMemoryVehicles.findIndex((vehicle) => vehicle.getPlate() === vehicleData.getPlate());

    if (existingIndex !== -1) {
      this.inMemoryVehicles[existingIndex] = vehicleData;
    } else {
      this.inMemoryVehicles.push(vehicleData);
    }
  }

  deleteByPlate(plate: string): void {
    this.inMemoryVehicles = this.inMemoryVehicles.filter((vehicle) => vehicle.getPlate() !== plate);
  }
}
