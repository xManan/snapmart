import { Spinner } from "flowbite-react"

function Loader() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-x-1/2">
            <Spinner aria-label="loading" size="xl" />
        </div>)
}

export default Loader
