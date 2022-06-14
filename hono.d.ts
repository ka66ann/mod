import { Context } from './_context.js';
export declare class Hono {
    context: Context;
    constructor();
    hello(): void;
    handle(req: Request): Response;
    fire(): void;
}
