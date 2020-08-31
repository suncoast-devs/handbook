import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigation } from './Navigation'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

function WIPBanner({ relativePath, absolutePath }) {
  return relativePath ? (
    <div className="relative bg-purple-800 flex items-center print:hidden">
      <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-purple-300">
            <span className="md:inline">This page is a work in progress.</span>
            <span className="block sm:ml-2 sm:inline-block">
              <a
                href={`https://github.com/suncoast-devs/handbook/edit/master/${relativePath}`}
                className="text-purple-100 font-bold underline"
              >
                You can help improve it. &rarr;
              </a>
            </span>
          </p>
        </div>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="text-purple-200 px-4 text-xl hover:text-white">
          <a href={`vscode://file/${absolutePath}`} title="Open in VS Code">
            <i className="fad fa-file-code"></i>
          </a>
        </div>
      )}
    </div>
  ) : null
}

export function Layout({
  title,
  module,
  program,
  children,
  relativePath,
  absolutePath,
}) {
  const mainRef = React.useRef(null)
  return (
    <>
      <Helmet>
        <title>{`SDG Handbook${title ? ` - ` + title : ''}`}</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          src="https://kit.fontawesome.com/abb24df607.js"
          crossorigin="anonymous"
        ></script>
        <body className="bg-gray-100 text-gray-900" />
      </Helmet>
      <div className="h-screen print:h-full flex overflow-hidden print:overflow-visible bg-gray-100">
        <Navigation module={module} program={program} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden print:overflow-visible">
          <SiteHeader />
          <WIPBanner relativePath={relativePath} absolutePath={absolutePath} />
          <main
            className="flex-1 relative z-0 overflow-y-auto pt-6 focus:outline-none"
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
