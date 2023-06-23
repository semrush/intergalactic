class Register {
  data = {};

  get<D>(name, defaultValue?: D): D {
    if (name in this.data) {
      return this.data[name];
    } else {
      return this.set(name, defaultValue);
    }
  }

  set<D>(name, value: D): D {
    this.data[name] = value;
    return this.data[name];
  }
}

export { Register };
export default new Register();
