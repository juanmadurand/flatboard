const methods = ['trace', 'info', 'warn', 'error'];

class Logger {
  constructor() {
    methods.forEach((method) => {
      this[method] = (...params) => (
        __DEVELOPMENT__ && console[method](...params)
      );
    });
  }
}

export default new Logger();
