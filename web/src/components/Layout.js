import React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer>
        © 2017 - {new Date().getFullYear()}, Built with &hearts; in St.
        Petersburg, Florida.
      </footer>
    </>
  )
}

export default Layout
