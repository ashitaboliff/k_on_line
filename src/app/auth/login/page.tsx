'use client'

import { signIn } from 'next-auth/react'

const Login = () => {
  return (
    <div>
      <button
        onClick={() => {
          signIn('AdminCredentials')
        }}
      >
        Admin Login
      </button>
      <button
        onClick={() => {
          signIn('TestCredentials')
        }}
      >
        Test Login
      </button>
      <button
        onClick={() => {
          signIn('line')
        }}
      >
        Line Login
      </button>
    </div>
  )
}

export default Login