'use client'

import { Suspense } from "react"
import Loading from "@/components/atoms/Loading"

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>Page</div>
    </Suspense>
  )
}