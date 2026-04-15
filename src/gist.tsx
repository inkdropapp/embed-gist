import { useRef, useState } from 'react'
import type {
  EmbeddedComponentProps,
  EmbeddingProvider
} from '@inkdropapp/types'
import { isGistURL, getEmbedURL } from './utils.js'

export const PROVIDER_ID = 'embed:gist'

const Gist: React.FC<EmbeddedComponentProps> = props => {
  const { href } = props
  const contentFrame = useRef<HTMLIFrameElement>(null)
  const [frameId] = useState('gist-' + Math.random())

  if (!href) {
    return (
      <div className="embed-error">
        <p>Invalid Gist URL.</p>
      </div>
    )
  }

  const url = getEmbedURL(href, frameId)

  return (
    <iframe
      id={frameId}
      className="embed-frame"
      ref={contentFrame}
      src={url}
    />
  )
}

export const gistProvider: EmbeddingProvider = {
  id: PROVIDER_ID,
  test: (url: string) => isGistURL(url),
  getComponent: () => Gist
}
