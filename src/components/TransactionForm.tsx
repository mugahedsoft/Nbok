import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTransaction } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TransactionFormProps {
  onSuccess?: () => void;
}

const TransactionForm = ({ onSuccess }: TransactionFormProps) => {
  const [operationNumber, setOperationNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ operation?: string; amount?: string }>({});
  const { toast } = useToast();

  const validateOperationNumber = (value: string) => {
    if (!/^\d{4}$/.test(value)) {
      return "رقم العملية يجب أن يكون 4 أرقام";
    }
    return "";
  };

  const validateAmount = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      return "المبلغ يجب أن يكون رقماً موجباً";
    }
    return "";
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setOperationNumber(value);
    if (value.length === 4) {
      const error = validateOperationNumber(value);
      setErrors((prev) => ({ ...prev, operation: error }));
    } else {
      setErrors((prev) => ({ ...prev, operation: "" }));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setAmount(value);
    if (value) {
      const error = validateAmount(value);
      setErrors((prev) => ({ ...prev, amount: error }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const operationError = validateOperationNumber(operationNumber);
    const amountError = validateAmount(amount);

    if (operationError || amountError) {
      setErrors({ operation: operationError, amount: amountError });
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      await addTransaction({
        operationNumber,
        amount: parseFloat(amount),
        date: now.toLocaleDateString("ar-SD"),
        time: now.toLocaleTimeString("ar-SD"),
        timestamp: now.getTime(),
      });

      toast({
        title: "تم حفظ العملية بنجاح",
        description: `رقم العملية: ${operationNumber} - المبلغ: ${parseFloat(amount).toLocaleString("ar-SD")} ج.س`,
      });

      setOperationNumber("");
      setAmount("");
      setErrors({});
      onSuccess?.();
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم يتم حفظ العملية. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = operationNumber.length === 4 && parseFloat(amount) > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="operationNumber" className="font-arabic text-base">
          رقم العملية
        </Label>
        <div className="relative">
          <Input
            id="operationNumber"
            type="text"
            inputMode="numeric"
            placeholder="0000"
            value={operationNumber}
            onChange={handleOperationChange}
            className={cn(
              "text-center text-2xl font-mono tracking-widest h-14",
              "font-arabic placeholder:text-muted-foreground/50",
              errors.operation && "border-destructive focus-visible:ring-destructive"
            )}
            dir="ltr"
          />
          {operationNumber.length === 4 && !errors.operation && (
            <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {errors.operation && (
          <p className="text-sm text-destructive flex items-center gap-1 font-arabic">
            <AlertCircle className="w-4 h-4" />
            {errors.operation}
          </p>
        )}
        <p className="text-xs text-muted-foreground font-arabic">
          أدخل رقم العملية المكون من 4 أرقام
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="font-arabic text-base">
          المبلغ (ج.س)
        </Label>
        <div className="relative">
          <Input
            id="amount"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            className={cn(
              "text-center text-2xl h-14",
              "font-arabic placeholder:text-muted-foreground/50",
              errors.amount && "border-destructive focus-visible:ring-destructive"
            )}
            dir="ltr"
          />
        </div>
        {errors.amount && (
          <p className="text-sm text-destructive flex items-center gap-1 font-arabic">
            <AlertCircle className="w-4 h-4" />
            {errors.amount}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full h-14 text-lg font-arabic font-bold"
      >
        {isSubmitting ? "جاري الحفظ..." : "حفظ العملية"}
      </Button>
    </form>
  );
};

export default TransactionForm;
