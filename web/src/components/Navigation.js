import React from 'react'
import { Transition } from './Transition.js'
import SDGIcon from '../images/button.svg'

export function Navigation({ isOpen, isHidden, hide, close }) {
  return (
    <>
      {/* Off-canvas menu for mobile */}
      <div className={`${isHidden ? 'hidden ' : ''}md:hidden`}>
        <div className="fixed inset-0 flex z-40">
          <Transition
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={isOpen}
            onExited={hide}
          >
            <div className="fixed inset-0" onClick={close}>
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
            show={isOpen}
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
              <div className="absolute top-0 right-0 -mr-14 p-1">
                <button
                  className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close Sidebar"
                  onClick={close}
                >
                  <i className="text-white far fa-times"></i>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <img className="h-8 w-auto" src={SDGIcon} alt="SDG Icon" />
                <span className="ml-2 font-black text-purple-300">
                  Student Handbook
                </span>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2">
                  <a
                    href="#"
                    className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                  >
                    <i className="mr-4 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 far fa-house"></i>
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
                  >
                    <i className="mr-4 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 far fa-users"></i>
                    Team
                  </a>
                </nav>
              </div>
            </div>
          </Transition>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 text-white">
            SDG Handbook
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <nav className="flex-1 px-2 py-4 bg-gray-800">
              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i className="mr-3 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 far fa-house"></i>
                Dashboard
              </a>
              <a
                href="#"
                className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i className="mr-3 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150 far fa-users"></i>
                Team
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
