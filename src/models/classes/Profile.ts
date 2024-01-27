import { JsonClass } from "models/types";
import { CommonUtils } from "utils";

class Profile {
  readonly _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  age: number;

  constructor(data: JsonClass<Profile>) {
    this._id = data.id as number;
    this.firstName = data.firstName as string;
    this.lastName = data.lastName as string;
    this.email = data.email as string;
    this.password = data.password as string;
    this.phone = data.phone as string;
    this.address = data.address as string;
    this.age = data.age as number;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  getFormatId() {
    return "#" + this.id;
  }

  isValidEmail(): boolean {
    return CommonUtils.checkEmailFormat(this.email);
  }
}

export default Profile;
