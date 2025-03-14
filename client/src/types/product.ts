export interface Product {
    product_id: number,
    product_name: string,
    product_img_path: string,
    product_units: ProductUnit[]
}

export interface ProductUnit {
	product_unit_id: number
	quantity: number
	unit: string
	price: number
}
