import { Layout } from 'antd'

const { Footer } = Layout

export default function TheFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <strong>RAMMAI © {new Date().getFullYear()}</strong> by PT DVD
    </Footer>
  )
}
