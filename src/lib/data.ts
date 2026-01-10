import type { FoodStall, MenuItem, Order, User, WalletTransaction } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback for safety, though this shouldn't happen if IDs are correct
    return { imageUrl: 'https://picsum.photos/seed/error/600/400', imageHint: 'placeholder' };
  }
  return { imageUrl: image.imageUrl, imageHint: image.imageHint };
};

export const foodStalls: FoodStall[] = [
  { id: '1', name: 'Pasta Paradise', cuisine: 'Italian', rating: 4.5, ...findImage('pasta-paradise-stall') },
  { id: '2', name: 'Burger Barn', cuisine: 'American', rating: 4.2, ...findImage('burger-barn-stall') },
  { id: '3', name: 'Taco Town', cuisine: 'Mexican', rating: 4.8, ...findImage('taco-town-stall') },
  { id: '4', name: 'Sushi Spot', cuisine: 'Japanese', rating: 4.9, ...findImage('sushi-spot-stall') },
  { id: '5', name: 'Pizza Palace', cuisine: 'Italian', rating: 4.4, ...findImage('pizza-palace-stall') },
  { id: '6', name: 'Salad Station', cuisine: 'Healthy', rating: 4.7, ...findImage('salad-station-stall') },
];

export const menuItems: MenuItem[] = [
  { id: 'm1', stallId: '1', name: 'Spaghetti Carbonara', description: 'Classic creamy pasta with pancetta.', price: 12.99, ...findImage('spaghetti-carbonara') },
  { id: 'm2', stallId: '1', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil.', price: 10.50, ...findImage('margherita-pizza') },
  { id: 'm3', stallId: '2', name: 'Classic Cheeseburger', description: 'Juicy beef patty with cheddar cheese.', price: 9.99, ...findImage('classic-cheeseburger') },
  { id: 'm4', stallId: '2', name: 'Veggie Wrap', description: 'Grilled vegetables in a soft tortilla.', price: 8.50, ...findImage('veggie-wrap') },
  { id: 'm5', stallId: '3', name: 'Chicken Tacos', description: 'Three tacos with grilled chicken and salsa.', price: 11.00, ...findImage('chicken-tacos') },
  { id: 'm6', stallId: '4', name: 'California Roll', description: '8 pieces of crab, avocado, and cucumber sushi.', price: 14.00, ...findImage('california-roll') },
  { id: 'm7', stallId: '5', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.', price: 6.99, ...findImage('chocolate-lava-cake') },
  { id: 'm8', stallId: '6', name: 'Fresh Orange Juice', description: 'Freshly squeezed juice.', price: 4.50, ...findImage('fresh-orange-juice') },
];

export const user: User = {
  name: 'Alex Doe',
  mobile: '123-456-7890',
  email: 'alex.doe@example.com',
  avatarUrl: findImage('user-avatar').imageUrl,
};

export const orders: Order[] = [
  { id: 'o1', date: '2024-07-20', status: 'Delivered', total: 22.98, items: [{ menuItemId: 'm1', quantity: 1 }, { menuItemId: 'm7', quantity: 1 }] },
  { id: 'o2', date: '2024-07-22', status: 'Processing', total: 9.99, items: [{ menuItemId: 'm3', quantity: 1 }] },
  { id: 'o3', date: '2024-07-15', status: 'Delivered', total: 11.00, items: [{ menuItemId: 'm5', quantity: 1 }] },
];

export const favoriteItemIds: string[] = ['m1', 'm5', 'm6'];

export const walletTransactions: WalletTransaction[] = [
    { id: 't1', date: '2024-07-20', description: 'Added funds', amount: 50.00, type: 'credit' },
    { id: 't2', date: '2024-07-20', description: 'Order #o1', amount: 22.98, type: 'debit' },
    { id: 't3', date: '2024-07-22', description: 'Order #o2', amount: 9.99, type: 'debit' },
]

// API-like functions
export const getFoodStalls = () => foodStalls;
export const getFoodStallById = (id: string) => foodStalls.find(stall => stall.id === id);
export const getMenuForStall = (stallId: string) => menuItems.filter(item => item.id.startsWith('m') && item.stallId === stallId);
export const getMenuItemById = (id: string) => menuItems.find(item => item.id === id);
export const getUser = () => user;
export const getOrders = () => orders;
export const getFavoriteItems = () => menuItems.filter(item => favoriteItemIds.includes(item.id));
export const getWalletBalance = () => walletTransactions.reduce((acc, t) => acc + (t.type === 'credit' ? t.amount : -t.amount), 0);
export const getWalletTransactions = () => walletTransactions;
