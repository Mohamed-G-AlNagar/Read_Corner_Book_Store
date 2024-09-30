export interface Book {
    bookId: number;
    bookTitle: string;
    price: number;
    bookCover: string
}

export interface CartItem {
    cartItemId: number;
    book: Book;
    quantity: number;
    cartId: number;
}

export interface Cart {
    cartId: number;
    cartItems: CartItem[];
}
