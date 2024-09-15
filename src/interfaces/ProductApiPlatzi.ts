export interface ProductApiPlatzi {
    id: number,
    title: string,
    price: number,
    description: string,
    category: Category,
    images: Array<string>,
    isDesired?: boolean,
}

interface Category {
    id: number,
    name: string,
    image: string
}