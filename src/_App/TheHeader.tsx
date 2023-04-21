import { Layout, Col, Row, Button, message } from 'antd'
import { useRouter } from 'next/router'

const { Header } = Layout

export default function TheHeader() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
    message.success('Logout successful!')
  }

  return (
    <Header>
      <Row>
        <Col span={8}>
          <h1 style={{ color: 'white' }}>RAMMAI | Home</h1>
        </Col>
        <Col span={15}></Col>
        <Col span={1}>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Col>
      </Row>
    </Header>
  )
}
