import { Router } from '../../router.ts'
import type { Result } from '../../router.ts'
import { Node } from './node.ts'

export class TrieRouter<T> extends Router<T> {
  node: Node<T>

  constructor() {
    super()
    this.node = new Node()
  }

  add(method: string, path: string, handler: T) {
    this.node.insert(method, path, handler)
  }

  match(method: string, path: string): Result<T> | null {
    return this.node.search(method, path)
  }
}
