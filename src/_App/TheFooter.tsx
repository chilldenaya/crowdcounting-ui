import { Layout } from 'antd'

const { Footer } = Layout

export default function TheFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <strong>App Name © {new Date().getFullYear()}</strong> by Us
    </Footer>
  )
}
