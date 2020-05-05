import React from 'react'
import { UIContextProvider } from './src/components/UIContext'

export const wrapRootElement = ({ element, props }) => (
  <UIContextProvider {...props}>{element}</UIContextProvider>
)
