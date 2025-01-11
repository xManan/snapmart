import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'

function App() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto pt-6 px-4">
                <Home />
            </div>
        </>
    )
}

export default App
