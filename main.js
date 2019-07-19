// An implementation of the Observer pattern
class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

class StatefulObject extends Subject {
  constructor() {
    super();

    this.state = {};
  }

  setState(state) {
    if (typeof state === "function") {
      state = state(this.state);
    }

    this.state = Object.assign(this.state, state);

    this.notify(this.state);
  }
}

const S = new StatefulObject();

// Add a log function. This could be something
// Like DOM updating
const log = state => console.log(state);
S.attach(log);

S.setState({
  on: true
});

// Toggle the on in a convoluted way
S.setState(state => {
  if (state.on) {
    return { on: false };
  } else {
    return { on: true };
  }
});
