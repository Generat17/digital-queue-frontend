export type QueueItemApi = {
  Id: number;
  Time: number;
  Service: string;
};

export type QueueItemModel = {
  id: number;
  time: number;
  service: string;
};

export const normalizeQueueItem = (from: QueueItemApi): QueueItemModel => ({
  id: from.Id + 1,
  time: from.Time,
  service: from.Service,
});
