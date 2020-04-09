import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigation } from './Navigation'

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>SDG Handbook</title>
        <body className="bg-gray-100 text-gray-900" />
      </Helmet>
      <header className="container mx-auto">
        <h1>SDG Handbook</h1>
      </header>
      <main className="flex flex-row">
        <Navigation />
        <div className="page">{children}</div>
      </main>
      <footer className="container mx-auto">
        © 2017 - {new Date().getFullYear()}, Built with &hearts; in St.
        Petersburg, Florida.
      </footer>
    </>
  )
}

export default Layout
