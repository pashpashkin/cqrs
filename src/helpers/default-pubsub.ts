import { Subject } from 'rxjs';
import { IEvent, IEventPublisher, IMessageSource } from '../interfaces';

export class DefaultPubSub implements IEventPublisher, IMessageSource {
  private subject$: Subject<any>;

  publish<T extends IEvent>(event: T) {
    if (!this.subject$) {
      throw new Error('Invalid underlying subject (call bridgeEventsTo())');
    }
    this.subject$.next(event);
  }

  async publishAll<T extends IEvent>(events: T[]) {
    if (!this.subject$) {
      throw new Error('Invalid underlying subject (call bridgeEventsTo())');
    }
    (events || []).forEach(event => this.subject$.next(event));
  }

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    this.subject$ = subject;
  }
}
