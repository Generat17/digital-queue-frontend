import {
  normalizeWorkstation,
  WorkstationApi,
  WorkstationModel,
} from "@models/workstationModel";
import { HTTPMethod } from "@shared//store/ApiStore/types";
import ApiStore from "@shared/store/ApiStore";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@shared/store/models/collection";
import { IWorkstationStore } from "@store/WorkstationStore/types";
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

export default class WorkstationStore
  implements ILocalStore, IWorkstationStore
{
  private readonly apiStore = new ApiStore(BASE_URL);

  private _list: CollectionModel<number, WorkstationModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<WorkstationStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      list: computed,
      meta: computed,
      getWorkstationList: action,
    });
  }

  get list(): WorkstationModel[] {
    return linearizeCollection(this._list);
  }

  get meta(): Meta {
    return this._meta;
  }

  async getWorkstationList(): Promise<void> {
    this._meta = Meta.loading;
    this._list = getInitialCollectionModel();

    const response = await this.apiStore.request<WorkstationApi[]>({
      method: HTTPMethod.GET,
      data: {},
      headers: {},
      endpoint: `/api/workstation`,
    });

    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }

      try {
        const list: WorkstationModel[] = [];

        for (const item of response.data.data) {
          list.push(normalizeWorkstation(item));
        }

        this._meta = Meta.success;

        this._list = normalizeCollection(
          list,
          (listItem) => listItem.workstationId
        );
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
