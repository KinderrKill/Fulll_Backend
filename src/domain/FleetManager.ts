import { VehicleData } from './VehicleData';
import { MSG_FM } from '../utils/Lang';
import { FleetRepositoryImpl } from '../infra/FleetRepositoryImpl';
import { FleetData } from './FleetData';
import { FleetRepository } from '../infra/interfaces/FleetRepository';
import { getErrorMessage } from '../utils/Constants';

export class FleetManager {
  private repository: FleetRepository;
  private fleets: FleetData[];

  constructor() {
    this.repository = new FleetRepositoryImpl();
    this.fleets = [];
  }

  public onEnable() {
    this.fleets = this.repository.findAll();
  }

  public onDisable() {
    this.fleets.filter((data) => data.isModified()).forEach((data) => this.repository.save(data));
  }

  public registerFleet(fleetData: FleetData) {
    if (
      this.getById(fleetData.getId()) !== undefined ||
      this.fleets.some((fleet) => fleet.getLocation() === fleetData.getLocation())
    ) {
      throw new Error(getErrorMessage(MSG_FM.ALREADY_REGISTERED, [fleetData.getId()]));
    }

    this.fleets.push(fleetData);
  }

  public removeFleet(fleetId: string) {
    const indexToRemove = this.fleets.findIndex((fleet) => fleet.getId() === fleetId);
    if (indexToRemove !== -1) {
      this.fleets.splice(indexToRemove, 1);

      this.repository.deleteById(fleetId);
    }
  }

  public addVehicleToFleet(fleetId: string, vehicleData: VehicleData) {
    const fleetData = this.getById(fleetId);
    if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, fleetId));

    fleetData.addVehicle(vehicleData);
  }

  public removeVehicleToFleet(fleetId: string, vehicleData: VehicleData) {
    const fleetData = this.getById(fleetId);
    if (fleetData === undefined) throw new Error(getErrorMessage(MSG_FM.UNDEFINED_FLEET, fleetId));

    fleetData.removeVehicle(vehicleData.getPlate());
  }

  public getById(id: string): FleetData | undefined {
    return this.fleets.find((fleet) => fleet.getId() === id);
  }

  public getFleets() {
    return this.fleets;
  }
}
