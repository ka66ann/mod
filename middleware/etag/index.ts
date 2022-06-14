import type { Context } from '../../context.ts'
import type { Next } from '../../hono.ts'
import { parseBody } from '../../utils/body.ts'
import { sha1 } from '../../utils/crypto.ts'

type ETagOptions = {
  weak: boolean
}

export const etag = (options: ETagOptions = { weak: false }) => {
  return async (c: Context, next: Next) => {
    const ifNoneMatch = c.req.header('If-None-Match') || c.req.header('if-none-match')

    await next()

    if (!c.res) return

    const clone = c.res.clone()
    const body = (await parseBody(c.res)) as string
    const hash = await sha1(body)

    const etag = options.weak ? `W/"${hash}"` : `"${hash}"`

    if (ifNoneMatch && ifNoneMatch === etag) {
      await clone.blob() // Force using body
      c.res = new Response(null, {
        status: 304,
        statusText: 'Not Modified',
      })
      c.res.headers.delete('Content-Length')
    } else {
      c.res = new Response(clone.body, clone)
      c.res.headers.append('ETag', etag)
    }
  }
}
