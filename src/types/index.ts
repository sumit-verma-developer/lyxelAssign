
  export interface Product {
    id: string;
    title: string;
    description: string;
    image_link: string;
    delivery_price: string;
    category_name?: string; 
  }
 
  export interface SectionedProduct {
    name: string;
    title: string;
    data: Product[];
  }
 export interface ProductCardProps {
    item: Product;
  }