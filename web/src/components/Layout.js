import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigation } from './Navigation'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function Layout({ title, children }) {
  const mainRef = React.useRef(null)
  return (
    <>
      <Helmet>
        <title>{`SDG Handbook${title && ` - ` + title}`}</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          src="https://kit.fontawesome.com/abb24df607.js"
          crossorigin="anonymous"
        ></script>
        <body className="bg-gray-100 text-gray-900" />
      </Helmet>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Navigation />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <SiteHeader />
          <main
            className="flex-1 relative z-0 overflow-y-auto pt-6focus:outline-none"
            tabIndex={0}
            ref={mainRef}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl mt-6 font-semibold text-gray-900">
                {title || 'Missing Document Title'}
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-16">
              <div className="py-4">{children}</div>
            </div>
            <SiteFooter main={mainRef} />
          </main>
        </div>
      </div>
    </>
  )
}
