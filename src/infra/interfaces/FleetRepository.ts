import { FleetData } from '../../domain/FleetData';

export interface FleetRepository {
  findById(id: string): FleetData | null;
  findAll(): FleetData[];
  save(fleet: FleetData): void;
  deleteById(id: string): void;
}
