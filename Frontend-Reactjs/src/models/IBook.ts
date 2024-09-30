export interface IBook {
    id: number;
    title: string;
    author: string;
    description?: string,
    category: string;
    stock: number;
    price: number;
    bookCover?: string;
    rating?: number;
}
export interface BookFormData {
    id?: number;
    title: string;
    author: string;
    description: string;
    category: string;
    stock: number;
    price: number;
    totalCopies: number;
    bookCoverImage?: FileList;
}