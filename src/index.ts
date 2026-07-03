import { markdownRenderer } from 'inkdrop'
import type { Environment, IInkdropPlugin } from '@inkdropapp/types'
import { createGistProvider, PROVIDER_ID } from './gist.js'

class InkdropPlugin implements IInkdropPlugin {
  activate(app: Environment) {
    markdownRenderer.embeddings.register(createGistProvider(app))
  }

  deactivate() {
    markdownRenderer.embeddings.unregister(PROVIDER_ID)
  }
}

const plugin = new InkdropPlugin()
export default plugin
