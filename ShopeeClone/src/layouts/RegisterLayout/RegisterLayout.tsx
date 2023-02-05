import React from 'react'
import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'
interface Props {
  children?: React.ReactNode
}
const RegisterLayout = ({ children }: Props) => {
  return (
    <div>
      <RegisterHeader></RegisterHeader>
      {children}
      <Footer></Footer>
    </div>
  )
}

export default RegisterLayout
