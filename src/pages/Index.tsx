import { useNavigate } from "react-router-dom";
import {
  Plus,
  Calendar,
  CalendarDays,
  CalendarRange,
  FileText,
  Settings,
} from "lucide-react";
import Header from "@/components/Header";
import DashboardButton from "@/components/DashboardButton";

const Index = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Plus,
      label: "إدخال عملية",
      path: "/add-transaction",
      variant: "primary" as const,
    },
    {
      icon: Calendar,
      label: "الجرد اليومي",
      path: "/daily-report",
      variant: "secondary" as const,
    },
    {
      icon: CalendarDays,
      label: "الجرد الأسبوعي",
      path: "/weekly-report",
      variant: "secondary" as const,
    },
    {
      icon: CalendarRange,
      label: "الجرد الشهري",
      path: "/monthly-report",
      variant: "secondary" as const,
    },
    {
      icon: FileText,
      label: "سجل العمليات",
      path: "/transactions",
      variant: "secondary" as const,
    },
    {
      icon: Settings,
      label: "الإعدادات",
      path: "/settings",
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header />

      <main className="p-4 pb-8">
        <div className="mb-6 text-center animate-fade-in">
          <p className="text-muted-foreground">صباح الخير</p>
          <h2 className="text-xl font-bold text-foreground">نظام إدارة العمليات</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={item.path}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DashboardButton
                icon={item.icon}
                label={item.label}
                onClick={() => navigate(item.path)}
                variant={item.variant}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-card rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm text-muted-foreground font-arabic">
              النظام يعمل بدون إنترنت - البيانات محفوظة محلياً
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
