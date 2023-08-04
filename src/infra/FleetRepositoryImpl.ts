import { FleetData } from '../domain/FleetData';
import { FleetRepository } from './interfaces/FleetRepository';

export class FleetRepositoryImpl implements FleetRepository {
  private inMemoryFleets: FleetData[] = [];

  findById(id: string): FleetData | null {
    const fleet = this.inMemoryFleets.find((f) => f.getId() === id);
    return fleet ? fleet : null;
  }

  findAll(): FleetData[] {
    return [...this.inMemoryFleets];
  }

  save(fleet: FleetData): void {
    const existingIndex = this.inMemoryFleets.findIndex((f) => f.getId() === fleet.getId());

    if (existingIndex !== -1) {
      this.inMemoryFleets[existingIndex] = fleet;
    } else {
      this.inMemoryFleets.push(fleet);
    }
  }

  deleteById(id: string): void {
    this.inMemoryFleets = this.inMemoryFleets.filter((f) => f.getId() !== id);
  }
}
