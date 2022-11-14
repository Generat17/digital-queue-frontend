import { IClient } from "@models/IClient";
import { IEmployee } from "@models/IEmployee";
import { IWorkstation } from "@models/IWorkstation";
import AuthService from "@services/AuthService";
import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import { makeAutoObservable, runInAction } from "mobx";

export default class AuthStore {
  private _meta: Meta = Meta.initial;
  user = {} as IEmployee;
  workstation = {} as IWorkstation;
  client = {} as IClient;
  isAuth = false;
  isLoading = false;
  private readonly apiStore = new ApiStore(BASE_URL);

  constructor() {
    makeAutoObservable(this);
  }

  get meta(): Meta {
    return this._meta;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IEmployee) {
    this.user = user;
  }

  setClient(client: IClient) {
    this.client = client;
  }

  setWorkstation(workstation: IWorkstation) {
    this.workstation = workstation;
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
      this.setWorkstation(response.data.workstation);
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
      this.setWorkstation(response.data.workstation);
    } catch (e) {
    } finally {
      this.setLoading(false);
    }
  }

  async getClient(): Promise<void> {
    this._meta = Meta.loading;

    const response = await this.apiStore.request<IClient>({
      method: HTTPMethod.POST,
      data: {},
      headers: {},
      endpoint: `/auth/employee/client`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error getClient");
      }
      try {
        this.setClient(response.data);
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
        // eslint-disable-next-line no-console
        console.log("error getClient");
      }
    });
  }
}
