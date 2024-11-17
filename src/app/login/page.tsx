import React from 'react'
import { Button } from '@components/ui/button'
import { signIn } from '@functions/auth'

const Login: React.FC = () => {
  return (
    <div className='flex w-full h-full items-center justify-center flex-col'>
      <p className='my-3'>You are not logged in</p>
      <Button variant="default" onClick={signIn}>Login with Discord</Button>
    </div>
  )
}

export default Login
