import { IEmployee } from "../IEmployee";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  employee: IEmployee;
}
