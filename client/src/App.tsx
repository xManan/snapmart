import Navbar from '@/components/Navbar'
import Home from '@/pages/Home'
import CategoryPage from '@/pages/Category'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@/App.css'
import { useEffect } from 'react';
import useStore from '@/store/global'
import { logoutService } from '@/lib/services'

function App() {
    const setUserLoggedIn = useStore(state => state.setUserLoggedIn)
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + "/api/v1/verify-token", {
                    method: 'POST',
                    credentials: "include",
                })
                const data = await res.json()
                if (data.success) {
                    setUserLoggedIn(true)
                }
            } catch (error) {
                console.error(error)
            }
        })();
    }, [])
    return (
        <Router basename='/snapmart'>
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
