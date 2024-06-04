import prisma from '@/lib/prisma/prisma'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export type Booking = {
  id: number
  createsAt: Date
  bookingDate: Date
  bookingTime: number
  registName: string
  name: string
  password: string
}

const schema = z.object({
  startDay: z.string().optional(),
  endDay: z.string().optional(),
})

const api = new Hono().basePath('/api')

const route = api.get('/booking', zValidator('query', schema), async (c) => {
  const startDay = c.req.query('startDay')
  const endDay = c.req.query('endDay')
  const bookings = await prisma.booking.findMany(
    {
      where: {
        bookingDate: {
          gte: startDay ? new Date(startDay) : new Date(),
          lte: endDay ? new Date(endDay): new Date(),
        },
      },
      orderBy: [
        { bookingDate: 'asc' },
        { bookingTime: 'asc' },
      ],
    }
  )
  console.log(bookings)
  if (bookings) {
    return c.json({ body: bookings, ok: true })
  } else {
    return c.json({ ok: false, }, 403)
  }
})

export type AppType = typeof route