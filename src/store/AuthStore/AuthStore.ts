import { makeAutoObservable } from "mobx";

import { IEmployee } from "../../models/IEmployee";
import AuthService from "../../services/AuthService";

export default class AuthStore {
  user = {} as IEmployee;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IEmployee) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(username: string, password: string, workstationId: string) {
    try {
      const response = await AuthService.login(
        username,
        password,
        workstationId
      );
      // eslint-disable-next-line no-console
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "employeeId",
        String(response.data.employee.employee_id)
      );
      localStorage.setItem("workstationId", workstationId);

      this.setAuth(true);
      this.setUser(response.data.employee);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error login");
    }
  }

  async registration(username: string, password: string) {
    try {
      const response = await AuthService.registration(username, password);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.employee);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error registration");
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout(String(this.user.employee_id));
      // eslint-disable-next-line no-console
      console.log(response);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("employeeId");
      localStorage.removeItem("workstationId");
      this.setAuth(false);
      this.setUser({} as IEmployee);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error logout");
    }
  }

  async checkAuth(workstationId: string, employeeId: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.refresh(
        workstationId,
        employeeId,
        localStorage.getItem("refreshToken")!
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "employeeId",
        String(response.data.employee.employee_id)
      );
      localStorage.setItem("workstationId", workstationId);
      this.setAuth(true);
      this.setUser(response.data.employee);
    } catch (e) {
    } finally {
      this.setLoading(false);
    }
  }
}
