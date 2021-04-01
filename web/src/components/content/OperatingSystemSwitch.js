import React, { useContext, useEffect, useState } from 'react'

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
          className={`pb-2 border-b-4 border-${
            ourOs.localeCompare('Mac') === 0 ? 'indigo-600' : 'transparent'
          } fal fa-fw fa-2x fa-apple-alt cursor-pointer`}
        />
      </span>
      <span onClick={() => setOS('Windows')}>
        <i
          className={`pb-2 border-b-4 border-${
            ourOs.localeCompare('Windows') === 0 ? 'indigo-600' : 'transparent'
          } fab fa-fw  fa-2x fa-windows cursor-pointer`}
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
