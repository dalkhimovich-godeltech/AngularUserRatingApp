export class User {

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get age(): number {
    return this._age;
  }

  get rate(): number {
    return this._rate;
  }

  get skills(): string[] {
    return this._skills;
  }

  constructor(id: number, name: string, age: number, rate: number, skills: string[]) {
    this._id = id;
    this._name = name;
    this._age = age;
    this._rate = rate;
    this._skills = skills;

  }
  private _id: number;
  private _name: string;
  private _age: number;
  private _rate: number;
  private _skills: string[];

  public static ConvertFromJson(jsonObject: any): User {
    return new User(jsonObject.id, jsonObject.name, jsonObject.age, jsonObject.rate, jsonObject.skills);
  }

  public stringify(): string {
    return `{"id":${this.id}, "name": "${this.name}", "age": ${this.age}, "rate": ${this.rate}, `
      + `"skills": ${this.stringifyArray(this.skills)}}`;
  }

  public increaseRate(): void {
    this._rate += 1;
  }

  public decreaseRate(): void {
    this._rate -= 1;
  }

  private stringifyArray(skills: string[]) {
    return '["' + skills.join('", "') + '"]';
  }
}
