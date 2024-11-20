'use client';

import React, { useState } from 'react'
import { Button } from '@components/ui/button'
import { oAuth, signIn, signUp } from '@functions/auth'
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { FaGoogle, FaDiscord } from "react-icons/fa";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [payload, setPayload] = useState({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = payload;
    const _payload = { email, password };
    if (isLogin) {
      signIn(_payload);
    } else {
      signUp(_payload);
    }
  }

  return (
    <div className='flex w-full h-[100dvh] items-center justify-center flex-col max-w-sm mx-auto'>
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="font-semibold tracking-tight text-xl">
            {isLogin ? 'Login' : 'Create an account'}
          </h3>
          <p className="text-xs text-muted-foreground mt-3">
            {isLogin ? 'Enter your credentials to access your documents' : 'Enter your email below to create your account'}
          </p>
        </div>
        <div className="p-6 pt-0 grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button onClick={() => oAuth('discord')}><FaDiscord /> Discord</Button>
            <Button onClick={() => oAuth('google')}><FaGoogle /> Google</Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span
              className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
          </div>
          <form autoComplete='off' className='space-y-3' onSubmit={handleSubmit} method="POST" action="">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" onChange={handleInputChange} type="email" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input name="password" onChange={handleInputChange} autoComplete='new-password' type="password" />
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit">{isLogin ? 'Login' : 'Sign up'}</Button>
            </div>
          </form>
          <Button onClick={() => setIsLogin((prev) => !prev)} variant='link' className='text-xs'>
            {isLogin ? 'Create an account' : 'Already a member? Login'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
