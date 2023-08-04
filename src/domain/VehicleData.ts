import { GPS } from '../utils/SharedTypes';
import { ModifiableData } from '../utils/ModifiableData';

export class VehicleData extends ModifiableData {
  private plate: string;
  private fleets: string[];
  private location?: GPS;

  constructor(plate: string, fleetId?: string) {
    super();

    this.plate = plate;
    this.fleets = fleetId ? [fleetId] : [];

    this.setModified();
  }

  addFleet(fleetId: string): VehicleData {
    this.fleets = [...this.fleets, fleetId];
    this.setModified();
    return this;
  }

  addLocation(location: GPS): VehicleData {
    this.location = location;
    this.setModified();
    return this;
  }

  getPlate() {
    return this.plate;
  }

  getFleets() {
    return this.fleets;
  }

  getLocation() {
    return this.location;
  }
}
