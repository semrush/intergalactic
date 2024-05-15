class Register {
  data: any = {};

  get<D>(name: string, defaultValue?: D): D {
    if (name in this.data) {
      return this.data[name];
    } else {
      return this.set(name, defaultValue) as any;
    }
  }

  set<D>(name: string, value: D): D {
    this.data[name] = value;
    return this.data[name];
  }
}

export { Register };
export default new Register();
