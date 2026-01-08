import { Transaction } from "@/lib/db";
import { FileText } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  showDate?: boolean;
}

const TransactionList = ({ transactions, showDate = true }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <FileText className="w-12 h-12 mb-3 opacity-50" />
        <p className="font-arabic text-base">لا توجد عمليات</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((tx) => (
          <div
            key={tx.id}
            className="bg-card border border-border rounded-xl p-4 shadow-sm animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-mono text-lg font-bold text-foreground">
                  #{tx.operationNumber}
                </p>
                {showDate && (
                  <p className="text-sm text-muted-foreground font-arabic">
                    {tx.date} - {tx.time}
                  </p>
                )}
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-primary font-arabic">
                  {tx.amount.toLocaleString("ar-SD")}
                </p>
                <p className="text-xs text-muted-foreground font-arabic">ج.س</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TransactionList;
