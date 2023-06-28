export class AppDetailsModel {
  private _name: string;
  private _version: string;

  constructor(name: string, version: string) {
    this._name = name;
    this._version = version;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }
}
