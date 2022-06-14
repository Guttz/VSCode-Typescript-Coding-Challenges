type EventName = string;
type CallbackParam = string | number;
type ICallback = (...params: CallbackParam[]) => void;

class Emitter {
  subscriptions: Map<EventName, Subscription[] | undefined> = new Map();

  subscribe(eventName: EventName, callback: ICallback) {
    if (!this.subscriptions.has(eventName))
      this.subscriptions.set(eventName, []);
    const newSubscription = new Subscription(callback);
    this.subscriptions.get(eventName).push(newSubscription);

    return newSubscription;
  }

  emit(eventName: EventName, ...args: CallbackParam[]) {
    const updatedSubscriptions = this.subscriptions
      .get(eventName)
      ?.filter((subscription) => {
        const activeSubscription = subscription.callback !== undefined;
        if (activeSubscription) subscription.callback(...args);

        return activeSubscription;
      });

    if (!!updatedSubscriptions)
      this.subscriptions.set(eventName, updatedSubscriptions);
  }
}

class Subscription extends Emitter {
  callback: ICallback;

  constructor(callback: ICallback) {
    super();
    this.callback = callback;
  }

  release() {
    this.subscriptions; // maybe empty them like this?  // prob not a good idea here
    this.callback = undefined;
  }
}
