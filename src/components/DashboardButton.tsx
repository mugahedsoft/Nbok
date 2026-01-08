import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}

const DashboardButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  className,
}: DashboardButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-6 rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] active:scale-[0.98]",
        "min-h-[120px] w-full",
        "font-arabic font-medium text-sm",
        "shadow-[var(--shadow-card)]",
        {
          "bg-primary text-primary-foreground hover:shadow-[var(--shadow-button)]":
            variant === "primary",
          "bg-card text-card-foreground border border-border hover:border-primary/30":
            variant === "secondary",
          "bg-[var(--gradient-gold)] text-secondary-foreground animate-pulse-gold":
            variant === "gold",
        },
        className
      )}
    >
      <div
        className={cn(
          "p-3 rounded-lg",
          {
            "bg-primary-foreground/10": variant === "primary",
            "bg-primary/10": variant === "secondary",
            "bg-secondary-foreground/10": variant === "gold",
          }
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
};

export default DashboardButton;
