import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import {
  normalizeResponsibility,
  ResponsibilityApi,
  ResponsibilityModel,
} from "@store/models/responsibilityModel";
import { IResponsibilityStore } from "@store/ResponsibilityStore/types";
import { BASE_URL } from "@utils/baseURL";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_list" | "_meta";

export default class ResponsibilityStore
  implements ILocalStore, IResponsibilityStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, ResponsibilityModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ResponsibilityStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getResponsibilityList: action,
    });
  }

  get list(): ResponsibilityModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getResponsibilityList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<ResponsibilityApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/responsibility`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: ResponsibilityModel[] = [];
        for (const item of response.data) {
          list.push(normalizeResponsibility(item));
        }

        this._meta = Meta.success;
        this._list = normalizeCollection(list, (listItem) => listItem.id);
        return;
      } catch (e) {
        this._meta = Meta.error;
        this._list = getInitialCollectionModel();
      }
    });
  }

  destroy(): void {
    // nothing to do
  }
}
