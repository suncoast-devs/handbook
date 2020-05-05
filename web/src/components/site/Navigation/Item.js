import React from 'react'
import { navigate } from 'gatsby-link'
import { useUIContext } from '../../../context/UIContext'

// TODO: Use <Link> and `activeClassName instead of styling the li.
export function Item({ children, onClick }) {
  return (
    <li
      className="mt-1 group flex items-center justify-between px-3 py-2 text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 rounded-l-md hover:bg-gray-600 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 hover:cursor-pointer"
      onClick={(event) => {
        event.preventDefault()
        onClick()
      }}
    >
      {children}
      <i className="far fa-angle-right"></i>
    </li>
  )
}

export function ModuleItem({ children, module }) {
  const { navigateToModule } = useUIContext()
  return <Item onClick={() => navigateToModule(module)}>{children}</Item>
}

export function LessonItem({ children, lesson }) {
  return <Item onClick={() => navigate(lesson)}>{children}</Item>
}
