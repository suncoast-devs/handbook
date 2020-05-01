import React from 'react'
import cx from 'classnames'

export function Heading({ children, onClick, icon }) {
  return (
    <h3 className="pl-6 pr-3 mt-3 flex items-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider">
      {icon && (
        <span className="mr-2">
          <i className={icon}></i>
        </span>
      )}
      <a
        href={onClick && '#'}
        onClick={onClick}
        className={cx({ 'hover:text-gray-400': onClick })}
      >
        {children}
      </a>
    </h3>
  )
}
