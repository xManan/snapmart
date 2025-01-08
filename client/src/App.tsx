import Navbar from '@/components/Navbar'
import CategorySection from '@/components/CategorySection'

function App() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto pt-6 px-4">
                <CategorySection />
            </div>
        </>
    )
}

export default App
