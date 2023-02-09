import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import s from './index.module.scss'

const { Title, Text } = Typography

export default function LoginCard() {
  return (
    <main className={s.main}>
      <Card
        title={
          <Row style={{ marginBottom: 15, marginTop: 15 }} gutter={10}>
            <Col>
              <Image alt="App Logo" src="/logo.svg" width={44} height={44} />
            </Col>
            <Col>
              <Title level={3} style={{ margin: 'unset' }}>
                Crowd Counting App
              </Title>
              <Text type="secondary">A slogan can be placed here.</Text>
            </Col>
          </Row>
        }
        headStyle={{ fontWeight: 'unset' }}
        className={s.loginCard}
      >
        <Form initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            rules={[
              {
                message: 'Please input your Username!',
                required: true,
              },
            ]}
          >
            <Input
              type="email"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                message: 'Please input your Password!',
                required: true,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 'unset' }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<LoginOutlined />}
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  )
}
