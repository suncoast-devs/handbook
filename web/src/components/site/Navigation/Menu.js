import React from 'react'
import { Transition } from '../Transition'
import { useUIContext } from '../../../context/UIContext'
import { ModuleMenu } from './ModuleMenu'
import { AssignmentMenu } from './AssignmentMenu'
import { WarmUpMenu } from './WarmUpMenu'
import { ProgramMenu } from './ProgramMenu'

export function Menu() {
  const { currentNavTarget } = useUIContext()

  return (
    <div className="pt-3 flex-1 h-0 overflow-y-auto overflow-x-hidden bg-gray-800 text-white relative">
      <Transition
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        show={!currentNavTarget}
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
        show={!!currentNavTarget}
      >
        <div className="absolute left-0 right-0">
          {(() => {
            switch (currentNavTarget && currentNavTarget.menu) {
              case 'module':
                return <ModuleMenu />
              case 'assignments':
                return <AssignmentMenu />
              case 'warm-ups':
                return <WarmUpMenu />
              default:
                return null
            }
          })()}
        </div>
      </Transition>
    </div>
  )
}
