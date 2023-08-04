export abstract class ModifiableData {
  modified: boolean;

  constructor() {
    this.modified = false;
  }

  setModified() {
    this.modified = true;
  }

  isModified() {
    return this.modified;
  }
}
