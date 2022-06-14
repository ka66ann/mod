export { Hono } from './hono.ts'
export type { Handler, Next } from './hono.ts'
export { Context } from './context.ts'
export type { Env } from './context.ts'

declare global {
  interface FetchEvent extends Event {
    readonly request: Request
    respondWith(response: Promise<Response> | Response): Promise<Response>
  }
}
