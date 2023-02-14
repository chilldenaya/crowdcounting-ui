import Link from 'next/link'
import { Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

export default function TheMenu() {
  const items = [
    {
      icon: <HomeOutlined />,
      key: 'home',
      label: <Link href="/dashboard">Home</Link>,
    },
  ]

  return <Menu theme="dark" mode="inline" items={items} />
}
