import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 1.0,
})

import './bootstrap'
import '../css/app.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(
            <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
                <App {...props} />
            </Sentry.ErrorBoundary>
        )
        // root.render(<App {...props} />)
    },
    progress: {
        color: '#00DDFF',
    },
})
