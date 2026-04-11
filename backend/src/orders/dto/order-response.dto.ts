export class OrderResponseDto {
  id: string;
  title: string;
  date: string;
  description: string;
  products: ProductDto[];
}

export class ProductDto {
  id: string;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;

  guarantee: {
    start: string;
    end: string;
  };

  price: {
    value: number;
    symbol: string;
    isDefault: number;
  }[];

  order: string;
  date: string;
}
