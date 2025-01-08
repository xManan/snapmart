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
            <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600 tracking-wider whitespace-nowrap">SHOP BY CATEGORY</p>
                <div className="bg-gray-300 w-full h-[1px]"></div>
            </div>
            <div className="grid grid-flow-col grid-rows-8 lg:grid-rows-3 md:grid-rows-4 gap-x-8 gap-y-16">
                {categories.map((category) => (
                    <div className="text-center relative">
                        <div className="w-full aspect-square bg-gray-300 rounded-lg"></div>
                        <p className="absolute w-full text-sm font-thin text-gray-600 line-clamp-2">{ category }</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySection
