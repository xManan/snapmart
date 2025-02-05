import CategorySectionItem from "@/components/CategorySectionItem"
import LoadingWrapper from "@/components/LoadingWrapper"
import ProductCard from "@/components/ProductCard"
import { Category as CategoryType } from "@/types/category"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Category() {
    const { categoryId } = useParams()
    const { subcategoryId } = useParams()
    const [subcategories, setSubcategories] = useState<CategoryType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedIdx, setSelectedIdx] = useState<number>(0)
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                let endpoint: string
                if(subcategoryId === undefined) {
                    endpoint = import.meta.env.VITE_SNAPMART_API_URL + "/api/v1/category/" + categoryId + "/products"
                } else {
                    endpoint = import.meta.env.VITE_SNAPMART_API_URL + "/api/v1/category/" + categoryId + "/" + subcategoryId + "/products"
                }
                const res = await fetch(endpoint)
                const data = await res.json()
                const idx = subcategoryId ? data.data.subcategories.findIndex((ele: any) => ele.category_id == subcategoryId) : 0
                setSelectedIdx(idx)
                setSubcategories(data.data.subcategories)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        })();
    }, [categoryId, subcategoryId])
    return (
        <div className="flex flex-col gap-2">
            {subcategories.length > 0 &&
            <div className="flex gap-4 overflow-x-scroll overflow-y-hidden pb-10 mb-2">
                {subcategories.map((subCategory, idx) => {
                    subCategory.category_img_path = '/public/imgs/exotic-fruits'
                    return (
                        <CategorySectionItem category={subCategory} highlight={selectedIdx == idx} className="min-w-16 md:min-w-20 text-xs" />
                    )})
                }
            </div>
            }
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))]">
                <LoadingWrapper {...{ loading }}>
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk Asdas Asda ASd", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                    <ProductCard product={{ product_id: 1, product_name: "Amul Milk", product_units: [{ product_unit_id: 1, quantity: 500, unit: "ml", price: 3400 }] }} />
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default Category
