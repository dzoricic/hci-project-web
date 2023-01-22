import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {
  useEffect(function redirect() {
    Router.push('/home');
  }, [])

  return <></>
}
