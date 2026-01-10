'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Upload,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  rating: number;
  prepTime: number;
}

export default function MenuManagementPage() {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || role !== 'staff') {
      router.push('/login');
    }
  }, [isLoggedIn, role, router]);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil',
      price: 12.99,
      category: 'Pizza',
      image: '/placeholder-food.jpg',
      isAvailable: true,
      rating: 4.5,
      prepTime: 15
    },
    {
      id: '2',
      name: 'Chicken Burger',
      description: 'Grilled chicken, lettuce, tomato, mayo',
      price: 8.99,
      category: 'Burgers',
      image: '/placeholder-food.jpg',
      isAvailable: true,
      rating: 4.2,
      prepTime: 10
    }
  ]);

  const [isAddingFood, setIsAddingFood] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    prepTime: ''
  });

  if (!isLoggedIn || role !== 'staff') {
    return null;
  }

  const handleAddFood = () => {
    if (formData.name && formData.price && formData.category) {
      const newFood: FoodItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: '/placeholder-food.jpg',
        isAvailable: true,
        rating: 0,
        prepTime: parseInt(formData.prepTime) || 15
      };
      setFoodItems([...foodItems, newFood]);
      setFormData({ name: '', description: '', price: '', category: '', prepTime: '' });
      setIsAddingFood(false);
    }
  };

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price.toString(),
      category: food.category,
      prepTime: food.prepTime.toString()
    });
  };

  const handleUpdateFood = () => {
    if (editingFood && formData.name && formData.price && formData.category) {
      setFoodItems(foodItems.map(item =>
        item.id === editingFood.id
          ? {
              ...item,
              name: formData.name,
              description: formData.description,
              price: parseFloat(formData.price),
              category: formData.category,
              prepTime: parseInt(formData.prepTime) || item.prepTime
            }
          : item
      ));
      setEditingFood(null);
      setFormData({ name: '', description: '', price: '', category: '', prepTime: '' });
    }
  };

  const handleDeleteFood = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setFoodItems(foodItems.map(item =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/staff-dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600 mt-1">Add, edit, and manage your food items</p>
            </div>
          </div>
          <Button onClick={() => setIsAddingFood(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Food Item
          </Button>
        </div>

        {/* Add/Edit Food Form */}
        {(isAddingFood || editingFood) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</CardTitle>
              <CardDescription>
                {editingFood ? 'Update the food item details' : 'Fill in the details for the new food item'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Food Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Margherita Pizza"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Pizza, Burgers, Desserts"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="12.99"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    placeholder="15"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the food item..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={editingFood ? handleUpdateFood : handleAddFood}>
                  {editingFood ? 'Update Item' : 'Add Item'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingFood(false);
                    setEditingFood(null);
                    setFormData({ name: '', description: '', price: '', category: '', prepTime: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </div>
                  <Badge variant={item.isAvailable ? 'default' : 'secondary'}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-green-600">₹{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prep Time:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.prepTime} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditFood(item)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAvailability(item.id)}
                    className="flex-1"
                  >
                    {item.isAvailable ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteFood(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {foodItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No food items yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first food item to the menu</p>
              <Button onClick={() => setIsAddingFood(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}