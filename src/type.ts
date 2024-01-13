type Rating = {
  rate: number;
  count: number;
};

type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
};

// interface는 union이 불가
