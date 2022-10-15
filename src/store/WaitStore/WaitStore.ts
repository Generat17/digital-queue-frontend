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

type PrivateFields = "_couponNumber" | "_meta";

type Coupon = {
  CouponID: number;
};

export default class WaitStore {
  private _couponNumber: number = -1;
  private readonly apiStore = new ApiStore(BASE_URL);
  private _meta: Meta = Meta.initial;

  constructor() {
    makeAutoObservable<WaitStore, PrivateFields>(this, {
      _couponNumber: observable,
      _meta: observable,
      couponNumber: computed,
      meta: computed,
      getCoupon: action,
    });
  }

  get couponNumber(): number {
    return this._couponNumber;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getCoupon(service: string): Promise<void> {
    const response = await this.apiStore.request<Coupon>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/coupon/${service}`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._couponNumber = response.data.CouponID;
        this._meta = Meta.success;
        return;
      } catch (e) {
        this._meta = Meta.error;
      }
    });
  }
}
