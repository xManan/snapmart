import { PropsWithChildren } from "react"

interface OverlayContainerProps extends PropsWithChildren {
    show: boolean
}
function OverlayContainer({show, children}: OverlayContainerProps) {
    return (
        <div className={ (show ? '' : 'hidden ') + `fixed top-0 left-0 w-full h-full bg-opacity-50 z-20` }>
            {children}
        </div>
    )
}

export default OverlayContainer
