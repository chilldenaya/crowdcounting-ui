import { ReactNode } from 'react'
import s from '@/styles/_App/TheContent.module.css'

export default function TheContent({ children }: { children: ReactNode }) {
  return <div className={s.content}>{children}</div>
}
