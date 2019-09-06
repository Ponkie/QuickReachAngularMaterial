import { IProduct } from "./IProduct";
import { ICategory } from "./ICategory";

export interface IProductCategory
{
    categoryId: number
    productId: number
    product?: IProduct
    category?: ICategory
}