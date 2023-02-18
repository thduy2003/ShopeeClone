import React from 'react'
import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
interface Props {
  children?: React.ReactNode
}
const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
