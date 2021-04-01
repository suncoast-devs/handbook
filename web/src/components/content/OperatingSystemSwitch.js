import React, { useContext, useEffect, useState } from 'react'
import cx from 'classnames'

export const OperatingSystemContext = React.createContext({
  os: '',
  setOS: (_) => {},
})

export function OperatingSystemSelector() {
  const [ourOs, setOurOs] = useState('')
  const { os, setOS } = useContext(OperatingSystemContext)

  useEffect(
    function () {
      setOurOs(os)
    },
    [os]
  )

  console.log({ os, ourOs })

  return (
    <div className="flex justify-end my-1">
      <span>{ourOs}</span>
      <span onClick={() => setOS('Mac')}>
        <i
          className={cx(
            'pb-2',
            'border-b-4',
            ourOs.localeCompare('Mac') === 0
              ? 'border-indigo-600'
              : 'border-transparent',
            'fal',
            'fa-fw',
            'fa-2x',
            'fa-apple-alt',
            'cursor-pointer',
            ourOs
          )}
        />
      </span>
      <span onClick={() => setOS('Windows')}>
        <i
          className={cx(
            'pb-2',
            'border-b-4',
            ourOs.localeCompare('Windows') === 0
              ? 'border-indigo-600'
              : 'border-transparent',
            'fal',
            'fa-fw',
            'fa-2x',
            'fa-windows',
            'cursor-pointer',
            ourOs
          )}
        />
      </span>
    </div>
  )
}
export function OperatingSystemSwitch({ allowedOperatingSystems, children }) {
  const { os } = useContext(OperatingSystemContext)

  console.log({ os })

  if (allowedOperatingSystems.includes(os)) {
    return (
      <>
        <OperatingSystemSelector />
        {children}
      </>
    )
  }

  return null
}
