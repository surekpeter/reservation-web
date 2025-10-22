// external
import React, { useState } from 'react'
import { PageSidebar, PageSidebarMobileOpener } from './PageSidebar'
import  Spinner from '../spinner'

interface PageLayoutProps {

  // sidebar props
  sidebar?: React.ReactNode
  sidebarTitle?: string
  sidebarRightTitle?: string
  openSidebarMobileTitle?: string

  // general props
  className?: string
  children: React.ReactNode | React.ReactNode[]

  // local navigation
  isLoading?: boolean
  onTabChange?: () => void
}

export const PageLayout = ({
  children,
  className,
  isLoading = false,
  sidebar,
  sidebarTitle,
  sidebarRightTitle,
  openSidebarMobileTitle,
}: PageLayoutProps) => {
  const [isSidebarShown, setSidebarShown] = useState(false)
  const closeSidebar = () => setSidebarShown(false)
  const openSidebar = () => setSidebarShown(true)

  return (
    <div
      className={`page-layout ${sidebar ? 'page-layout--sidemenu-offset' : ''} position-relative ${
        className || ''
      }`}
    >
      <PageSidebar
        sidebar={sidebar}
        isSidebarShown={isSidebarShown}
        closeSidebar={closeSidebar}
        title={sidebarTitle}
        rightTitle={sidebarRightTitle}
      />
      <div className='page-main position-relative'>
        {sidebar && (
          <PageSidebarMobileOpener
            openSidebar={openSidebar}
            openSidebarMobileTitle={openSidebarMobileTitle}
          />
        )}
        <div className='page-content'>{isLoading ? <Spinner /> : children}</div>
      </div>
    </div>
  )
}
