const AddSubscription = Symbol("AddSubscription");

class Subscription {
  constructor (action) {
    this.handlers = [];
    action[AddSubscription](this);
  }
  on (func) {
    this.handlers.push(func);
  }

  broadcast (data) {
    this.handlers.forEach((func) => func(data))
  }
}

class Action {
  constructor (name) {
    this.name = name;
    this.subscribers = [];
    this.weakMap = new WeakMap
  }

  emit (data) {
    console.log(`EMIT ${this.name}:`, data);
    this.subscribers.forEach((subscriber) =>{
      subscriber.broadcast(data);
    })
  }

  [AddSubscription] (subscription) {
    this.subscribers.push(subscription);
  }

  subscribe (ctx) {
    return new Subscription(this);
  }
}

let arse = new Action("test");

//arse.subscribe(this).on((data) => alert(data));

export {arse as TestAction};