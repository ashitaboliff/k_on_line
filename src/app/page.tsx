import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { html, raw } from 'hono/html'
import React from 'react'
import MainPage from '@/components/BookingMainPage'

const Page = () => {
  return (
    <MainPage />
  )
}

export default Page