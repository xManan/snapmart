import freshVegeImg from '@/assets/fresh-vegetables.webp'
import coldDrinkImg from '@/assets/cold-drinks-and-juices.avif'
interface CategorySectionItemProps {
    category: string
}
function CategorySectionItem({ category }: CategorySectionItemProps) {
    return (
        <div className="group text-center relative cursor-pointer">
            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img className="transition-transform scale-90 group-hover:scale-100" src={Math.floor(Math.random() * 100) % 2 == 0 ? freshVegeImg : coldDrinkImg} />
            </div>
            <p className="absolute w-full text-sm font-thin text-gray-600 line-clamp-2">{ category }</p>
        </div>
    )
}

export default CategorySectionItem
