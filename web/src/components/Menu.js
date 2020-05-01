import React, { useState } from 'react'
import cx from 'classnames'
import { Transition } from './Transition'

function SubHeading({ children }) {
  return <h4 className="mx-6 mt-3 font-semibold">{children}</h4>
}

export function Menu() {
  const [module, setModule] = useState(0)

  function Heading({ children, onClick, icon }) {
    return (
      <h3 className="pl-6 pr-3 flex items-center text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider">
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

  function Item({ children }) {
    return (
      <li
        className="mt-1 group flex items-center justify-between px-3 py-2 text-sm leading-5 font-medium text-gray-400 hover:text-gray-200 rounded-l-md hover:bg-gray-600 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
        onClick={() => setModule(1)}
      >
        {children}
        <i className="far fa-angle-right"></i>
      </li>
    )
  }

  function ProgramMenu() {
    return (
      <>
        <Heading icon="far fa-house">All Programs</Heading>
        <nav className="mb-6">
          <SubHeading>Web Development Program</SubHeading>
          <ul className="pl-3">
            <Item>Introduction to Programming with C#</Item>
            <Item>Fundamentals of Front-end Web Development</Item>
          </ul>
        </nav>
        <nav>
          <SubHeading>Web Development Test Drive</SubHeading>
          <ul className="pl-3">
            <Item>HTML: Structure & Semantics</Item>
            <Item>CSS: Style & Presentation</Item>
            <Item>JavaScript: Behavior & Interaction</Item>
          </ul>
        </nav>
      </>
    )
  }

  function ModuleMenu() {
    return (
      <>
        <Heading onClick={() => setModule(0)} icon="fas fa-caret-left">
          Web Development Test Drive
        </Heading>
        <SubHeading>HTML: Structure & Semantics</SubHeading>
        <div className="m-3 p-3 text-sm leading-tight tracking-light text-gray-300 bg-gray-700 rounded">
          <p>
            HTML (HyperText Markup Language) is the most basic building block of
            the Web. It defines the meaning and structure of web content.
          </p>
        </div>
        <Heading>Lessons</Heading>
        <ul className="pl-3">
          <Item>Introduction to HTML</Item>
        </ul>
      </>
    )
  }

  return (
    <div className="pt-6 flex-1 h-0 overflow-y-auto overflow-x-hidden bg-gray-800 text-white relative">
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        show={module === 0}
      >
        <div className="absolute left-0 right-0 translat">
          <ProgramMenu />
        </div>
      </Transition>
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        show={module === 1}
      >
        <div className="absolute left-0 right-0">
          <ModuleMenu />
        </div>
      </Transition>
    </div>
  )
}
