import React from 'react'
import { Transition } from '../Transition'
import { ModuleMenu } from './ModuleMenu'
import { ProgramMenu } from './ProgramMenu'

export function Menu({ program, module }) {
  return (
    <div className="pt-3 flex-1 h-0 overflow-y-auto overflow-x-hidden bg-gray-800 text-white relative">
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        show={!program}
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
        show={!!program && !!module}
      >
        <div className="absolute left-0 right-0">
          <ModuleMenu program={program} module={module} />
        </div>
      </Transition>
    </div>
  )
}
