import {VscSettings} from '@react-icons/all-files/vsc/VscSettings'
import {AiOutlineCloseCircle} from '@react-icons/all-files/ai/AiOutlineCloseCircle'
import {OnlyDesktop, OnlyMobile} from './LayoutHelpers'
import {Button} from "react-bootstrap";

const SidebarLayout = ({
                           children,
                           title,
                           rightTitle,
                           onClose,
                           onRightTitle,
                       }: {
    children: React.ReactNode
    title?: string
    rightTitle?: string
    onClose?: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
    onRightTitle?: React.MouseEventHandler<HTMLSpanElement>
}) => {
    return (
        <div className='d-flex flex-column page-sidemenu'>
            <div className='d-flex justify-content-between align-items-center mb-5'>
                <h4 className='fw-bold'>{title}</h4>
                {onRightTitle && (
                    <OnlyDesktop>
            <span
                onClick={onRightTitle}
                data-test-id='page-sidebar-desktop__secondary-action-button'
                className='text-primary hover-pointer'
            >
              {rightTitle}
            </span>
                    </OnlyDesktop>
                )}
                <OnlyMobile>
                    <div
                        onClick={onClose}
                        className='hover-pointer'
                        data-test-id='page-sidebar-mobile__close-sidebar-button'
                    >
                        <AiOutlineCloseCircle size={24}/>
                    </div>
                </OnlyMobile>
            </div>
            {children}
            <OnlyMobile className='d-flex flex-column mt-auto'>
                <Button variant='transparent' className='color-primary'/>
                <Button variant='primary' onClick={onClose}/>
            </OnlyMobile>
        </div>
    )
}

interface PageSidebarProps {
    sidebar: React.ReactNode
    isSidebarShown: boolean
    title?: string
    rightTitle?: string
    closeSidebar: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
    onRightTitle?: React.MouseEventHandler<HTMLSpanElement>
}

const SidebarModalContainer = ({isShown = false, onClose, children}: {
    isShown: boolean
    onClose: React.MouseEventHandler<any>
    children: React.ReactNode
}) => {
    return (
        <>
            <div className={`sidebar-modal-dialog ${isShown ? 'show' : ''}`}>{children}</div>
            <div onClick={onClose} className={`sidebar-modal-backdrop ${isShown ? 'show' : ''}`}/>
        </>
    )
}

export const PageSidebar = ({
                                sidebar,
                                title,
                                rightTitle,
                                isSidebarShown,
                                closeSidebar,
                                onRightTitle,
                            }: PageSidebarProps) => {
    if (!sidebar) return null
    return (
        <SidebarModalContainer isShown={isSidebarShown} onClose={closeSidebar}>
            <SidebarLayout
                title={title}
                onClose={closeSidebar}
                onRightTitle={onRightTitle}
                rightTitle={rightTitle}
            >
                {sidebar}
            </SidebarLayout>
        </SidebarModalContainer>
    )
}

export const PageSidebarMobileOpener = ({
                                            openSidebar,
                                            openSidebarMobileTitle,
                                        }: {
    openSidebarMobileTitle?: string
    openSidebar: React.MouseEventHandler<HTMLDivElement>
}) => {
    return (
        <OnlyMobile>
            <div
                data-test-id='page-sidebar-mobile__open-sidebar-button'
                className='d-flex justify-content-center align-items-center bg-primary-light rounded p-3 mx-5 hover-pointer'
                onClick={openSidebar}
            >
                <span className='text-primary fw-bold me-2'>{openSidebarMobileTitle}</span>
                <VscSettings className='text-primary'/>
            </div>
        </OnlyMobile>
    )
}
