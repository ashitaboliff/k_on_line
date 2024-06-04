import prisma from '@/lib/prisma/prisma'
import { Hono } from 'hono'
import { csrf } from 'hono/csrf'
import { cors } from 'hono/cors'

export type Booking = {
  id: number
  createsAt: Date
  bookingDate: Date
  bookingTime: number
  registName: string
  name: string
  password: string
}

const api = new Hono<{ Bindings: Booking }>()
api.use('/api/*', cors())

api.get('/api/booking:startDay:endDay', async (c) => {
  const startDay = c.req.param('startDay')
  const endDay = c.req.param('endDay')
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
  if (bookings) {
    return c.json({ body: bookings, ok: true })
  } else {
    return c.json({ ok: false, }, 404)
  }
})