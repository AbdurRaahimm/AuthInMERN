import React from 'react'
import Navber from './Navber'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
        <Navber />
        <main>
            <Outlet />
        </main>
    </>
  )
}
