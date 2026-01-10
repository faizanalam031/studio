export type User = {
  name: string;
  mobile: string;
  email: string;
  avatarUrl: string;
};

export type FoodStall = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  imageUrl: string;
  imageHint: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  stallId: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
};

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export type WalletTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
};
