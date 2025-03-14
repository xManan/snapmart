import SectionLabel from '@/components/SectionLabel'
import { Carousel } from "flowbite-react"

interface FeaturedSectionProps {
    featured: string[]
}
function FeaturedSection({ featured }: FeaturedSectionProps) {
    return (
        <div className="flex flex-col gap-4 mb-8">
            <SectionLabel label="FEATURED" />
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    { featured.map((img, idx) => (
                        <img key={'featured-' + idx} className="duration-700 ease-in-out" src={img} alt="..." />
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default FeaturedSection
