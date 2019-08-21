import { IEvent } from './event.interface';

export interface IEventPublisher {
  publish<T extends IEvent>(event: T);
  publishAll<T extends IEvent>(events: T[]): Promise<void>;
}
