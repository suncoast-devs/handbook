import React, { useContext } from 'react'

export const OperatingSystemContext = React.createContext({
  os: '',
  setOS: (_) => {},
})

export function OperatingSystemSelector() {
  const { setOS } = useContext(OperatingSystemContext)

  return (
    <div className="flex justify-end my-1">
      <span onClick={() => setOS('Mac')}>
        <i className="fal fa-fw fa-2x fa-apple-alt cursor-pointer" />
      </span>
      <span onClick={() => setOS('Windows')}>
        <i className="fab fa-fw  fa-2x fa-windows cursor-pointer" />
      </span>
    </div>
  )
}
export function OperatingSystemSwitch({ allowedOperatingSystems, children }) {
  const { os } = useContext(OperatingSystemContext)

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
