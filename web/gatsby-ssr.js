import React from 'react'
import { UIContextProvider } from './src/context/UIContext'

export const wrapRootElement = ({ element, props }) => (
  <UIContextProvider {...props}>{element}</UIContextProvider>
)
