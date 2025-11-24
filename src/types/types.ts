export interface Item {
   id: number;
   title: string;
   price: number;
   description: string;
   category: string;
   rating: {
      rate: number;
      count: number;
   };
   image: string;
}

export interface AuthUser {
   id: string;
   firstName: string;
   lastName: string;
}

export interface FirestoreConfig {
   maxProductId: number;
}

export interface CartItem extends Item {
    quantity: number;
}

export interface Order {
   id: string;
   user: AuthUser;
   totalItems: number;
   totalAmount: number;
   items: CartItem[];
}
