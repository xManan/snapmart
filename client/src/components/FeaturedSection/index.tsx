import SectionLabel from '@/components/SectionLabel'
import { Carousel } from "flowbite-react"

function FeaturedSection() {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <SectionLabel label="FEATURED" />
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img className="duration-700 ease-in-out" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                    <img className="duration-700 ease-in-out" src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                    <img className="duration-700 ease-in-out" src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                    <img className="duration-700 ease-in-out" src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                    <img className="duration-700 ease-in-out" src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
            </div>
        </div>
    )
}

export default FeaturedSection
