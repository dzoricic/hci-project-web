import { useEffect } from 'react'
import Router from 'next/router'
import { Loading } from '@nextui-org/react';

export default function Home() {
  useEffect(function redirect() {
    Router.push('/home');
  }, [])

  return <Loading type = 'spinner' size = 'xl'/>
}
