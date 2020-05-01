import React from 'react'

export function Description({ children }) {
  return (
    <div className="m-3 p-3 text-sm leading-tight tracking-light text-gray-300 bg-gray-700 rounded">
      {children}
    </div>
  )
}
