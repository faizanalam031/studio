'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Phone,
  MapPin,
  DollarSign,
  User,
  Package
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderTime: string;
  estimatedDelivery: string;
  paymentMethod: string;
  specialInstructions?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'confirmed': return 'bg-blue-100 text-blue-800';
    case 'preparing': return 'bg-orange-100 text-orange-800';
    case 'ready': return 'bg-green-100 text-green-800';
    case 'delivered': return 'bg-purple-100 text-purple-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'pending': return <Clock className="h-4 w-4" />;
    case 'confirmed': return <CheckCircle className="h-4 w-4" />;
    case 'preparing': return <Package className="h-4 w-4" />;
    case 'ready': return <CheckCircle className="h-4 w-4" />;
    case 'delivered': return <Truck className="h-4 w-4" />;
    case 'cancelled': return <XCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
  switch (currentStatus) {
    case 'pending': return 'confirmed';
    case 'confirmed': return 'preparing';
    case 'preparing': return 'ready';
    case 'ready': return 'delivered';
    default: return null;
  }
};

export default function OrderManagementPage() {
  const { isLoggedIn, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || role !== 'staff') {
      router.push('/login');
    }
  }, [isLoggedIn, role, router]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'John Doe',
      customerPhone: '+1 (555) 123-4567',
      customerAddress: '123 Main St, City, State 12345',
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
        { id: '2', name: 'Chicken Burger', quantity: 2, price: 8.99 }
      ],
      total: 30.97,
      status: 'pending',
      orderTime: '2024-01-11T10:30:00',
      estimatedDelivery: '11:00 AM',
      paymentMethod: 'Credit Card',
      specialInstructions: 'Extra cheese on pizza'
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      customerPhone: '+1 (555) 987-6543',
      customerAddress: '456 Oak Ave, City, State 12345',
      items: [
        { id: '3', name: 'Caesar Salad', quantity: 1, price: 9.99 },
        { id: '4', name: 'French Fries', quantity: 1, price: 4.99 }
      ],
      total: 14.98,
      status: 'preparing',
      orderTime: '2024-01-11T10:15:00',
      estimatedDelivery: '10:45 AM',
      paymentMethod: 'Cash',
    },
    {
      id: 'ORD003',
      customerName: 'Mike Johnson',
      customerPhone: '+1 (555) 456-7890',
      customerAddress: '789 Pine Rd, City, State 12345',
      items: [
        { id: '5', name: 'Pepperoni Pizza', quantity: 1, price: 14.99 }
      ],
      total: 14.99,
      status: 'ready',
      orderTime: '2024-01-11T09:45:00',
      estimatedDelivery: '10:15 AM',
      paymentMethod: 'Credit Card',
    }
  ]);

  if (!isLoggedIn || role !== 'staff') {
    return null;
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => ['confirmed', 'preparing', 'ready'].includes(order.status));
  const completedOrders = orders.filter(order => ['delivered', 'cancelled'].includes(order.status));

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
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
              <p className="text-gray-600 mt-1">Manage all customer orders and deliveries</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="px-3 py-1">
              Pending: {pendingOrders.length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Active: {activeOrders.length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Total: {orders.length}
            </Badge>
          </div>
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending orders</h3>
                  <p className="text-gray-600">All orders have been processed</p>
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusUpdate={updateOrderStatus}
                  showActions={true}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active orders</h3>
                  <p className="text-gray-600">No orders currently being prepared</p>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusUpdate={updateOrderStatus}
                  showActions={true}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed orders</h3>
                  <p className="text-gray-600">Completed orders will appear here</p>
                </CardContent>
              </Card>
            ) : (
              completedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusUpdate={updateOrderStatus}
                  showActions={false}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onStatusUpdate,
  showActions
}: {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
  showActions: boolean;
}) {
  const nextStatus = getNextStatus(order.status);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription className="mt-1">
              Ordered at {new Date(order.orderTime).toLocaleTimeString()}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(order.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{order.customerPhone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <span>{order.customerAddress}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="font-medium text-green-600">₹{order.total}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Payment: </span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Delivery: </span>
              <span className="font-medium">{order.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-medium mb-2">Order Items:</h4>
          <div className="space-y-1">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        {order.specialInstructions && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h4 className="font-medium text-yellow-800 mb-1">Special Instructions:</h4>
            <p className="text-yellow-700 text-sm">{order.specialInstructions}</p>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && nextStatus && (
          <div className="flex gap-2">
            <Button
              onClick={() => onStatusUpdate(order.id, nextStatus)}
              className="flex-1"
            >
              Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
            </Button>
            <Button
              variant="outline"
              onClick={() => onStatusUpdate(order.id, 'cancelled')}
              className="text-red-600 hover:text-red-700"
            >
              Cancel Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}