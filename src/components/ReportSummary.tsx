import { Transaction } from "@/lib/db";
import { TrendingUp, Hash, Calendar } from "lucide-react";

interface ReportSummaryProps {
  transactions: Transaction[];
  title: string;
  period: string;
}

const ReportSummary = ({ transactions, title, period }: ReportSummaryProps) => {
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const count = transactions.length;

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold font-arabic text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground font-arabic flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          {period}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary text-primary-foreground rounded-xl p-4 text-center shadow-[var(--shadow-button)]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-arabic">إجمالي المبالغ</span>
          </div>
          <p className="text-2xl font-bold font-arabic">
            {totalAmount.toLocaleString("ar-SD")}
          </p>
          <p className="text-xs opacity-80 font-arabic">ج.س</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
            <Hash className="w-5 h-5" />
            <span className="text-sm font-arabic">عدد العمليات</span>
          </div>
          <p className="text-2xl font-bold text-foreground font-arabic">{count}</p>
          <p className="text-xs text-muted-foreground font-arabic">عملية</p>
        </div>
      </div>
    </div>
  );
};

export default ReportSummary;
