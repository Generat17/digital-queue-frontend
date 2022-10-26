import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_accessToken" | "_meta";

type AccessToken = {
  AccessToken: string;
};

export default class AuthStore {
  private _accessToken: string = "";
  private readonly apiStore = new ApiStore(BASE_URL);
  private _meta: Meta = Meta.initial;
  constructor() {
    makeAutoObservable<AuthStore, PrivateFields>(this, {
      _accessToken: observable,
      _meta: observable,
      accessToken: computed,
      meta: computed,
      getAccessToken: action,
    });
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getAccessToken(
    login: string,
    password: string,
    workstation: string
  ): Promise<void> {
    const response = await this.apiStore.request<AccessToken>({
      method: HTTPMethod.POST,
      data: { login: login, password: password },
      headers: {},
      endpoint: `/auth/sign-in/${workstation}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._accessToken = response.data.token;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
}
