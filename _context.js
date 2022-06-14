class Context {
  constructor(m) {
    this.message = m;
  }
  say() {
    console.log(this.message);
  }
  getMessage() {
    return this.message;
  }
}
export {
  Context
};
