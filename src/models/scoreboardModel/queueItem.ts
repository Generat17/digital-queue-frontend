export type QueueItemApi = {
  Id: number;
  Time: number;
  Service: string;
  Workstation: number;
};

export type QueueItemModel = {
  id: number;
  time: number;
  service: string;
  workstation: number;
};

export const normalizeQueueItem = (from: QueueItemApi): QueueItemModel => ({
  id: from.Id + 1,
  time: from.Time,
  service: from.Service,
  workstation: from.Workstation,
});
