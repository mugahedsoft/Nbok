import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TransactionList from "@/components/TransactionList";
import { getAllTransactions, Transaction } from "@/lib/db";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.operationNumber.includes(searchQuery) ||
      tx.amount.toString().includes(searchQuery)
  );

  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="min-h-screen bg-background font-arabic" dir="rtl">
      <Header title="سجل العمليات" showBack />

      <main className="p-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="بحث برقم العملية أو المبلغ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 font-arabic"
              />
            </div>

            <div className="bg-primary text-primary-foreground rounded-xl p-4 text-center">
              <p className="text-sm opacity-80">إجمالي المبالغ</p>
              <p className="text-2xl font-bold">
                {totalAmount.toLocaleString("ar-SD")} ج.س
              </p>
              <p className="text-sm opacity-80">
                {filteredTransactions.length} عملية
              </p>
            </div>

            <TransactionList transactions={filteredTransactions} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Transactions;
