import { Category } from '@/types/category'
import PropsWithClassName from '@/types/propsWithClassName'
import { Link } from 'react-router-dom'

interface CategorySectionItemProps extends PropsWithClassName {
    category: Category
    highlight?: boolean
}

function CategorySectionItem({ category, highlight, className }: CategorySectionItemProps) {
    return (
        <Link to={ "/category/" + category.category_id }>
            <div className={ `relative text-center cursor-pointer text-sm ${highlight && 'bg-green-100'} rounded-lg ${className || ''}`  }>
                <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <img className="transition-transform" src={ import.meta.env.VITE_SNAPMART_API_URL + category.category_img_path } />
                </div>
                <p className="absolute w-full font-thin text-gray-600 line-clamp-2">{ category.category_name }</p>
            </div>
        </Link>
    )
}

export default CategorySectionItem
