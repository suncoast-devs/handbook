import React from 'react'
import Link from 'gatsby-link'
import { useUIContext } from '../../../context/UIContext'

export function ModuleItem({ children, module }) {
  const { navigateToModule } = useUIContext()
  return (
    <div
      className="mt-1 group flex items-center justify-between px-3 py-2 text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 rounded-l-md hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150 hover:cursor-pointer"
      onClick={() => navigateToModule(module)}
      role="button"
      onKeyDown={({ key }) => {
        console.log({ key })
        if (key === 'Enter' || key === ' ') {
          navigateToModule(module)
        }
      }}
      tabIndex={0}
    >
      {children}
      <i className="far fa-angle-right"></i>
    </div>
  )
}

export function LessonItem({ children, lesson, ...props }) {
  return (
    <Link
      className="mt-1 group flex items-center justify-between px-3 py-2 text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 rounded-l-md hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150 hover:cursor-pointer"
      activeClassName="text-gray-200 bg-gray-600"
      to={lesson}
      tabIndex={0}
      {...props}
    >
      {children}
      <i className="far fa-angle-right"></i>
    </Link>
  )
}
