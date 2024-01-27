import { JsonClass } from "models/types";

class Account {
  private _name: string;
  private _address: string;
  private _email: string;

  constructor(attributes: JsonClass<Account>) {
    this._name = attributes.name as string;
    this._address = attributes.address as string;
    this._email = attributes.email as string;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Getter address
   * @return {string}
   */
  public get address(): string {
    return this._address;
  }

  /**
   * Setter address
   * @param {string} value
   */
  public set address(value: string) {
    this._address = value;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }
}

export default Account;
