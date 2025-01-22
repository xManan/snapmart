import SectionLabel from '@/components/SectionLabel'
import CategorySectionItem from '@/components/CategorySectionItem'
import { Category } from '@/types/category'

interface CategorySectionProps {
    categories: Category[]
}

function CategorySection({ categories }: CategorySectionProps) {
    return (
        <div className="flex flex-col gap-4">
            <SectionLabel label='SHOP BY CATEGORY' />
            <div className="grid grid-cols-3 lg:grid-cols-8 md:grid-cols-6 gap-x-8 gap-y-16 mb-16">
                {categories.map((category, idx) => (
                    <CategorySectionItem key={"key" + idx} category={category} />
                ))}
            </div>
        </div>
    )
}

export default CategorySection
