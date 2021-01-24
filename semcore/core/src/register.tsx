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
    return (this.data[name] = value);
  }
}

export { Register };
export default new Register();
