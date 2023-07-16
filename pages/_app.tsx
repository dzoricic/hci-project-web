import  '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { UserContextProvider } from 'common/user-context/user-context-provider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#7000FF',
      primary_dark: '#4803a1',
      secondary: '#FFFFFF',
      secondary_dark: '#ededed',
      error: '#FCC5D8',
      background: '#1E1E1E',
      background_secondary: '#2C2C2C',
    },
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps}/>
        <ToastContainer/>
      </UserContextProvider>
    </NextUIProvider>
  )
}
