import { IBrand } from "./brand.interface";
import { ICategory } from "./categories.interface";
import { ISubcategory } from "./subCategory.interface";


export interface ICartRoot {
    data: ICartResponse;
    message: string | null;
    success: boolean;
}

export interface ICartResponse {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: ICart
}

export interface ICart {
    _id: string;
    cartOwner: number;
    products: IProductCart[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}


export interface IProductCart {
    count: number;
    _id: string;
    product: ICartProductDetails;
    price: number;
}

export interface ICartProductDetails {
    subCategory: ISubcategory[];
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    id: string;
}

