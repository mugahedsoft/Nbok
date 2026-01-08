import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import TransactionForm from "@/components/TransactionForm";

const AddTransaction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header title="إدخال عملية جديدة" showBack />

      <main className="p-4 pb-8 animate-fade-in">
        <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] border border-border">
          <TransactionForm onSuccess={() => navigate("/")} />
        </div>

        <div className="mt-6 p-4 bg-muted rounded-xl">
          <h3 className="font-bold text-sm mb-2 text-foreground">ملاحظات:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• رقم العملية يجب أن يكون 4 أرقام</li>
            <li>• المبلغ يجب أن يكون قيمة موجبة</li>
            <li>• سيتم حفظ العملية محلياً على جهازك</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AddTransaction;
