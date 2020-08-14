import React from 'react'
import { useUIContext } from '../../context/UIContext'
import { Search } from './Search'

export function SiteHeader() {
  const { openSidebar } = useUIContext()

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow print:hidden">
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
            <Search />
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <a href="https://github.com/suncoast-devs/handbook">
            <i className="fab fa-github-alt"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
