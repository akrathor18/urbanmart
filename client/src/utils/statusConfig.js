import { 
  Clock, 
  Package, 
  Truck, 
  CheckCircle2, 
  XCircle,
  ShoppingCart,
  CreditCard,
  AlertCircle,
  Timer
} from "lucide-react";

const statusConfig = {
  CREATED: {
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: ShoppingCart,
    label: "Created",
  },
  PENDING_PAYMENT: {
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Clock,
    label: "Pending Payment",
  },
  PAID: {
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CreditCard,
    label: "Paid",
  },
  FAILED: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: AlertCircle,
    label: "Failed",
  },
  EXPIRED: {
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: Timer,
    label: "Expired",
  },
  SHIPPED: {
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Truck,
    label: "Shipped",
  },
  DELIVERED: {
    color: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
    label: "Delivered",
  },
  CANCELED: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    label: "Cancelled",
  },
};

export default statusConfig;