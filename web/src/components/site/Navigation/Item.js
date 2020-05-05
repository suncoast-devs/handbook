import React from 'react'
import Link from 'gatsby-link'
import { useUIContext } from '../../../context/UIContext'

export function Item({ children, onClick, ...props }) {
  return (
    <Link
      className="mt-1 group flex items-center justify-between px-3 py-2 text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 rounded-l-md hover:bg-gray-600 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150 hover:cursor-pointer"
      activeClassName="text-gray-200 bg-gray-600"
      onClick={(event) => {
        if (onClick) {
          event.preventDefault()
          onClick()
        }
      }}
      {...props}
    >
      {children}
      <i className="far fa-angle-right"></i>
    </Link>
  )
}

export function ModuleItem({ children, module }) {
  const { navigateToModule } = useUIContext()
  return <Item onClick={() => navigateToModule(module)}>{children}</Item>
}

export function LessonItem({ children, lesson }) {
  return <Item to={lesson}>{children}</Item>
}
