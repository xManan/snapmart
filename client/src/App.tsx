import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import CategoryPage from '@/pages/Category'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/App.css'

function App() {
    return (
        <Router>
            <Navbar />
            <div className="max-w-6xl mx-auto pt-6 px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
