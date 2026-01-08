import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ReportSummary from "@/components/ReportSummary";
import TransactionList from "@/components/TransactionList";
import { getDailyTransactions, Transaction } from "@/lib/db";
import { Loader2 } from "lucide-react";

const DailyReport = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getDailyTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const today = new Date().toLocaleDateString("ar-SD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header title="الجرد اليومي" showBack />

      <main className="p-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <ReportSummary
              transactions={transactions}
              title="الجرد اليومي"
              period={today}
            />

            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <h3 className="font-bold mb-4 text-foreground">العمليات</h3>
              <TransactionList transactions={transactions} showDate={false} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DailyReport;
