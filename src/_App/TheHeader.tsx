// import { useRouter } from 'next/router'
import { Layout } from 'antd'

const { Header } = Layout

export default function TheHeader() {
  // const router = useRouter()

  return (
    <Header>
      <h1 style={{ color: 'white' }}>Crowd Counting | Home</h1>
    </Header>
  )
}
