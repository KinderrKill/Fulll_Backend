import { VehicleData } from '../../domain/VehicleData';

export interface VehicleRepository {
  findByPlate(plate: string): VehicleData | null;
  findAll(): VehicleData[];
  save(fleet: VehicleData): void;
  deleteByPlate(plate: string): void;
}
