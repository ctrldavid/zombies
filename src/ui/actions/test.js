class Action {
  constructor (name) {
    this.name = name;
    this.listeners = [];
  }

  emit (data) {
    console.log("emit", data);
    this.listeners.forEach((listener) =>{
      listener(data);
    })
  }

  on (listener) {
    this.listeners.push(listener);
  }
}

let arse = new Action("test");

export {arse as TestAction};
