import Loader from '@/components/Loader'
interface LoadingWrapperProps extends React.PropsWithChildren {
    loading: boolean
}
function LoadingWrapper({loading, children}: LoadingWrapperProps) {
    return (
        <>
            {loading ? <Loader /> : children }
        </>
    )
}
export default LoadingWrapper
