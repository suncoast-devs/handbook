import React from 'react'
import { UIContextProvider } from './src/components/UIContext'
import './src/styles/screen.css'

export const wrapRootElement = ({ element, props }) => (
  <UIContextProvider {...props}>{element}</UIContextProvider>
)
