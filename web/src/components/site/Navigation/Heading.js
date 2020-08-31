import React from 'react'
import cx from 'classnames'

export function Heading({ children, icon }) {
  return (
    <h3 className="pl-6 pr-3 mt-3 flex items-center text-gray-500 text-xs leading-4 ">
      {icon && (
        <span className="mr-2">
          <i className={icon}></i>
        </span>
      )}
      <span className={cx('uppercase tracking-wider font-semibold')}>
        {children}
      </span>
    </h3>
  )
}
