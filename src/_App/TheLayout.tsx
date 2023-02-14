import { ReactNode } from 'react'
import { Layout } from 'antd'
import TheContent from './TheContent'
import TheFooter from './TheFooter'
import TheHeader from './TheHeader'

export default function TheLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <TheHeader />
      <TheContent>{children}</TheContent>
      <TheFooter />
    </Layout>
  )
}
