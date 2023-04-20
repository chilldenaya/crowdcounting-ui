import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { LockOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import s from './index.module.scss'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { Title, Text } = Typography

export default function LoginCard() {
  const router = useRouter()

  const onFinish = (values: { username: string; password: string }) => {
    if (
      values.username === 'admin@admin.com' &&
      values.password === 'adminadmin'
    ) {
      router.push('/dashboard')
    } else {
      toast.warn('Maaf username dan/atau Password anda salah!', {
        autoClose: 2000,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
        pauseOnHover: true,
        position: 'top-center',
        progress: undefined,
        theme: 'colored',
      })
    }
  }

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
                RAMMAI
              </Title>
              <Text type="secondary">Crowd Counting App</Text>
            </Col>
          </Row>
        }
        headStyle={{ fontWeight: 'unset' }}
        className={s.loginCard}
      >
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                message: 'Please input your Username!',
                required: true,
              },
              {
                max: 50,
                message: 'Value should be less than 50 character',
              },
            ]}
          >
            <Input
              type="text"
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
              {
                max: 50,
                message: 'Value should be less than 50 character',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <ToastContainer
            autoClose={5000}
            closeOnClick
            draggable
            position="top-center"
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
          />
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
