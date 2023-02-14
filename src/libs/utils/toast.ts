import { notification } from 'antd'

export default function toast({
  type = 'success',
  message,
  description,
}: {
  type?: 'success' | 'info' | 'warning' | 'error'
  message: string | undefined
  description?: string
}) {
  notification[type]({
    description: description,
    message: message,
    placement: 'topRight',
  })
}
