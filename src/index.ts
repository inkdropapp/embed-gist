import { markdownRenderer } from 'inkdrop'
import { gistProvider, PROVIDER_ID } from './gist.js'

class InkdropPlugin {
  activate() {
    markdownRenderer.embeddings.register(gistProvider)
  }

  deactivate() {
    markdownRenderer.embeddings.unregister(PROVIDER_ID)
  }
}

const plugin = new InkdropPlugin()
export default plugin
