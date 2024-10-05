'use client'

import { Suspense } from "react"
import Loading from "@/components/atoms/Loading"
import AuthPadLock from "@/components/auth/AuthPadLock"

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AuthPadLock />
    </Suspense>
  )
}

export default Page