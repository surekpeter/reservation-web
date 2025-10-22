import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export const OnlyDesktop = ({ children, className }: Props) => {
  return <div className={`d-none d-md-block ${className || ''}`}>{children}</div>
}

export const OnlyMobile = ({ children, className }: Props) => {
  return <div className={`d-md-none ${className || ''}`}>{children}</div>
}
