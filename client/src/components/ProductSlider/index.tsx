import SectionLabel from "@/components/SectionLabel"
import { CategoryWithProducts } from "@/types/category"
import ProductCard from "@/components/ProductCard"
import PrevSliderButton from "@/components/PrevSliderButton"
import NextSliderButton from "@/components/NextSliderButton"
import { useRef } from "react"

interface ProductSliderProps {
    categoryWithProducts: CategoryWithProducts
}
function ProductSlider({ categoryWithProducts: category }: ProductSliderProps) {
    const productSliderRef = useRef<HTMLDivElement>(null);
    const isMobile = () => {
        return window && window.innerWidth < 768;
    };
    const scrollBy = isMobile() ? 352 : 600
    const scrollNext = () => {
        if(productSliderRef.current) {
            productSliderRef.current.scrollBy({ left: scrollBy, behavior: "smooth" })
        }
    }
    const scrollPrev = () => {
        if(productSliderRef.current) {
            productSliderRef.current.scrollBy({ left: -scrollBy, behavior: "smooth" })
        }
    }
    return (
        <div className="flex flex-col gap-4 mt-8">
            <SectionLabel label={category.category_name.toUpperCase()}>
                <div className="flex flex-row-reverse gap-2">
                    <NextSliderButton onClick={() => scrollNext()} />
                    <PrevSliderButton onClick={() => scrollPrev()} />
                </div>
            </SectionLabel>
            <div className="flex gap-4 pb-4 overflow-scroll" ref={productSliderRef}>
                {category.products.map(product => (
                    <ProductCard {...{product}} />
                ))}
                <a className="text-sm-green hover:underline cursor-pointer whitespace-nowrap text-xl my-auto">See All</a>
            </div>
        </div>
    )
}

export default ProductSlider
