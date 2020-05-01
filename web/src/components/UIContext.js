import React from 'react'

export const UIContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'openSidebar': {
      return { ...state, isSidebarOpen: true, isSidebarHidden: false }
    }

    case 'closeSidebar': {
      return { ...state, isSidebarOpen: false }
    }

    case 'hideSidebar': {
      return { ...state, isSidebarHidden: true }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function UIContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    isSidebarOpen: false,
    isSidebarHidden: true,
  })

  return (
    <UIContext.Provider
      value={{
        openSidebar: () => dispatch({ type: 'openSidebar' }),
        closeSidebar: () => dispatch({ type: 'closeSidebar' }),
        hideSidebar: () => dispatch({ type: 'hideSidebar' }),
        ...state,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUIContext() {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIContextProvider')
  }
  return context
}
