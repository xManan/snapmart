import CategorySection from '@/components/CategorySection'
import FeaturedSection from '@/components/FeaturedSection'
import ProductSlider from '@/components/ProductSlider'
import LoadingWrapper from '@/components/LoadingWrapper'
import { Category, CategoryWithProducts } from '@/types/category'
import { useState, useEffect } from 'react'

function Home() {
    const [categories, setCategories] = useState<Category[]>([])
    const [featuredCategoriesWithProducts, setFeaturedCategoriesWithProducts] = useState<CategoryWithProducts[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await fetch(import.meta.env.VITE_SNAPMART_API_URL + "/api/v1/index")
                const data = await res.json()
                setCategories(data.data.categories)
                setFeaturedCategoriesWithProducts(data.data.featured_categories_with_products)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        })();
    }, [])
    return (
        <LoadingWrapper {...{ loading }}>
            <CategorySection {...{ categories }} />
            <FeaturedSection />
            {featuredCategoriesWithProducts.map(category => (
                <ProductSlider key={'product-slider-' + category.category_id} categoryWithProducts={category} />
            ))}
        </LoadingWrapper>
    )
}

export default Home
