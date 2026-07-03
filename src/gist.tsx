import { useEffect, useRef, useState } from 'react'
import type {
  EmbeddedComponentProps,
  EmbeddingProvider,
  Environment
} from '@inkdropapp/types'
import { isGistURL, getEmbedURL, type ThemeAppearance } from './utils.js'

export const PROVIDER_ID = 'embed:gist'

function getThemeAppearance(app: Environment): ThemeAppearance {
  const isDark = app.themes
    .getActiveThemes()
    .some(theme => theme.metadata.themeAppearance === 'dark')
  return isDark ? 'dark' : 'light'
}

/**
 * Creates the Gist embedding provider bound to the given Inkdrop environment.
 * The environment is needed to detect the active theme appearance so the
 * embedded gist can be rendered in dark mode.
 */
export function createGistProvider(app: Environment): EmbeddingProvider {
  const Gist: React.FC<EmbeddedComponentProps> = props => {
    const { href } = props
    const contentFrame = useRef<HTMLIFrameElement>(null)
    const [frameId] = useState('gist-' + Math.random())
    const [theme, setTheme] = useState<ThemeAppearance>(() =>
      getThemeAppearance(app)
    )

    useEffect(() => {
      const disposable = app.themes.onDidChangeActiveThemes(() => {
        setTheme(getThemeAppearance(app))
      })
      return () => disposable.dispose()
    }, [])

    if (!href) {
      return (
        <div className="embed-error">
          <p>Invalid Gist URL.</p>
        </div>
      )
    }

    const url = getEmbedURL(href, frameId, theme)

    return (
      <iframe
        id={frameId}
        className="embed-frame"
        ref={contentFrame}
        src={url}
      />
    )
  }

  return {
    id: PROVIDER_ID,
    test: (url: string) => isGistURL(url),
    getComponent: () => Gist
  }
}
