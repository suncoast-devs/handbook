import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navigation } from './Navigation'

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarHidden, setIsSidebarHidden] = useState(true)

  function openSidebar() {
    setIsSidebarOpen(true)
    setIsSidebarHidden(false)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function hideSidebar() {
    setIsSidebarHidden(true)
  }

  return (
    <>
      <Helmet>
        <title>SDG Handbook</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          src="https://kit.fontawesome.com/abb24df607.js"
          crossorigin="anonymous"
        ></script>
        <body className="bg-gray-100 text-gray-900" />
      </Helmet>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Navigation
          isOpen={isSidebarOpen}
          isHidden={isSidebarHidden}
          hide={hideSidebar}
          close={closeSidebar}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
              aria-label="Open Sidebar"
              onClick={openSidebar}
            >
              <i className="far fa-bars"></i>
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <div className="w-full flex md:ml-0">
                  <label htmlFor="search_field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <i className="far fa-search"></i>
                    </div>
                    <input
                      id="search_field"
                      className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <a href="https://github.com/suncoast-devs/handbook">
                  <i className="fab fa-github-alt"></i>
                </a>
              </div>
            </div>
          </div>
          <main
            className="flex-1 relative z-0 overflow-y-auto py-6 focus:outline-none"
            tabIndex={0}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">{children}</div>
              {/* /End replace */}
              <footer className="container mx-auto">
                &copy; 2017 - {new Date().getFullYear()}; Built with &hearts; in
                St. Petersburg, Florida.
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
