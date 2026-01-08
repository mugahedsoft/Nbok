import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { clearAllTransactions } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Info, Moon } from "lucide-react";
import bankakLogo from "@/assets/bankak-logo.png";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const handleClearData = async () => {
    try {
      await clearAllTransactions();
      toast({
        title: "تم حذف البيانات",
        description: "تم حذف جميع العمليات بنجاح",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم حذف البيانات",
        variant: "destructive",
      });
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header title="الإعدادات" showBack />

      <main className="p-4 pb-8 space-y-4 animate-fade-in">
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <Label htmlFor="dark-mode" className="font-arabic">
                الوضع الليلي
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full font-arabic"
              >
                <Trash2 className="w-5 h-5 ml-2" />
                حذف جميع البيانات
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-arabic" dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم حذف جميع العمليات المسجلة نهائياً. لا يمكن التراجع عن هذا الإجراء.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row-reverse gap-2">
                <AlertDialogCancel className="font-arabic">إلغاء</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearData}
                  className="bg-destructive text-destructive-foreground font-arabic"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-bold text-foreground">حول التطبيق</h3>
          </div>
          <div className="flex flex-col items-center gap-4">
            <img
              src={bankakLogo}
              alt="بنكك"
              className="h-16 object-contain"
            />
            <div className="text-center space-y-1">
              <p className="font-bold text-foreground">نظام بنكك لإدارة العمليات</p>
              <p className="text-sm text-muted-foreground">الإصدار 1.0.0</p>
              <p className="text-xs text-muted-foreground mt-2">
                نظام داخلي لإدارة ومتابعة العمليات المالية
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-4">
          <p className="text-sm text-muted-foreground text-center">
            البيانات محفوظة محلياً على جهازك فقط
          </p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
