import React from 'react'
import { Link } from 'gatsby'
import cx from 'classnames'
import SDGIcon from '../../../images/button.svg'
import { Transition } from '../Transition'
import { useUIContext } from '../../../context/UIContext'
import { Menu } from './Menu'

function Header() {
  return (
    <div className="h-16 flex flex-shrink-0 items-center bg-gray-900 px-4 text-white">
      <img className="h-8 w-auto" src={SDGIcon} alt="SDG Icon" />
      <Link to="/" className="ml-2 font-bold">
        Student Handbook
      </Link>
    </div>
  )
}

export function Navigation() {
  const {
    closeSidebar,
    hideSidebar,
    isSidebarOpen,
    isSidebarHidden,
  } = useUIContext()

  return (
    <>
      <div
        className={cx({ hidden: isSidebarHidden }, 'md:hidden print:invisible')}
      >
        <div className="fixed inset-0 flex z-40">
          <Transition
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={isSidebarOpen}
            onExited={hideSidebar}
          >
            <div
              className="fixed inset-0"
              onClick={closeSidebar}
              aria-label="Close Sidebar"
              onKeyDown={({ key }) => {
                if (key === 'Enter' || key === ' ') {
                  closeSidebar()
                }
              }}
              tabIndex={0}
              role="button"
            >
              <div className="absolute inset-0 bg-gray-600 opacity-75" />
            </div>
          </Transition>
          <Transition
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            show={isSidebarOpen}
          >
            <div className="relative flex-1 flex flex-col max-w-sm w-full">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button
                  className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close Sidebar"
                  onClick={closeSidebar}
                >
                  <i className="text-white far fa-times"></i>
                </button>
              </div>
              <Header />
              <Menu />
            </div>
          </Transition>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      </div>
      <div className="hidden md:flex md:flex-shrink-0 print:invisible">
        <div className="flex flex-col w-96">
          <Header />
          <Menu />
        </div>
      </div>
    </>
  )
}
