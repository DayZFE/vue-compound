export type TrackingKey = (string | number);

export type TrackBy<T> = (this: void, data: T) => TrackingKey;
