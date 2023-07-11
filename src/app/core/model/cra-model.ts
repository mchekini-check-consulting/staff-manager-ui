export class CraModel {
  private _id?: string;
  private _startingDate: string;
  private _endingDate: string;
  private _extendHours?: number;
  private _astreinte: boolean;
  private _objects: { category: string; hours: number; comment?: string }[];

  constructor(
    startingDate: string,
    endingDate: string,
    astreinte: boolean,
    objects: { category: string; hours: number; comment?: string }[],
    extendHours?: number,
    id?: string
  ) {
    this._id = id;
    this._startingDate = startingDate;
    this._endingDate = endingDate;
    this._extendHours = extendHours;
    this._astreinte = astreinte;
    this._objects = objects;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  get startingDate(): string {
    return this._startingDate;
  }

  set startingDate(startingDate: string) {
    this._startingDate = startingDate;
  }

  get endingDate(): string {
    return this._endingDate;
  }

  set endingDate(endingDate: string) {
    this._endingDate = endingDate;
  }

  get extendHours(): number | undefined {
    return this._extendHours;
  }

  set extendHours(extendHours: number | undefined) {
    this._extendHours = extendHours;
  }

  get astreinte(): boolean {
    return this._astreinte;
  }

  set astreinte(astreinte: boolean) {
    this._astreinte = astreinte;
  }

  get objects(): { category: string; hours: number; comment?: string }[] {
    return this._objects;
  }

  set objects(
    objects: { category: string; hours: number; comment?: string }[]
  ) {
    this._objects = objects;
  }
}
