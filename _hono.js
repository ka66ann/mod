import { Context } from "./_context.js";
class Hono {
  constructor() {
    this.context = new Context("Hello");
  }
  hello() {
    this.context.say();
  }
  handle(req) {
    const url = req.url;
    const message = `You access: ${url}: ${this.context.getMessage()}`;
    return new Response(message);
  }
  fire() {
    addEventListener("fetch", (event) => {
      event.respondWith(this.handle(event.request));
    });
  }
}
export {
  Hono
};
