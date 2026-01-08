import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import bankakLogo from "@/assets/bankak-logo.png";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header = ({ title, showBack = false }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        {showBack && !isHome ? (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10" />
        )}

        {title ? (
          <h1 className="font-arabic font-bold text-lg">{title}</h1>
        ) : (
          <img
            src={bankakLogo}
            alt="بنكك"
            className="h-10 object-contain bg-white rounded-lg px-2 py-1"
          />
        )}

        <div className="w-10" />
      </div>
    </header>
  );
};

export default Header;
