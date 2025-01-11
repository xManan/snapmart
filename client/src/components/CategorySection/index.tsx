import SectionLabel from '@/components/SectionLabel'
import CategorySectionItem from '@/components/CategorySectionItem'

function CategorySection() {
    const categories = [
        "Fresh Vegetables",
        "Fresh Fruits",
        "Dairy, Bread and Eggs",
        "Rice, Atta and Dals",
        "Masalas and Dry Fruits",
        "Edible Oils and Ghee",
        "Munchies",
        "Sweet Tooth",
        "Cold Drinks and Juices",
        "Biscuits and Cakes",
        "Instant and Frozen Food",
        "Meat and Seafood",
        "Cereals and Breakfast",
        "Sauces and Spreads",
        "Tea, Coffee and More",
        "Cleaning Essentials",
        "Pharma and Hygiene",
        "Bath, Body and Hair",
        "Paan Corner",
        "Home and Kitchen",
        "Office and Electricals",
        "Baby Care",
        "Pet Supplies",
        "Beauty and Grooming"
    ]
    return (
        <div className="flex flex-col gap-4">
            <SectionLabel label='SHOP BY CATEGORY' />
            <div className="grid grid-flow-col grid-rows-8 lg:grid-rows-3 md:grid-rows-4 gap-x-8 gap-y-16 mb-16">
                {categories.map((category) => (
                    <CategorySectionItem category={ category } />
                ))}
            </div>
        </div>
    )
}

export default CategorySection
