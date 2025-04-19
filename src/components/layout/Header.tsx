
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header = ({ isLoggedIn, onLogin, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-2xl font-bold text-cv-blue">
            CV Wizard
          </Link>
          <span className="ml-2 text-xs bg-cv-lightblue text-cv-darkblue px-2 py-1 rounded-full">
            AI-Powered
          </span>
        </div>
        
        <nav className="hidden md:flex space-x-6 text-cv-gray font-medium">
          <Link to="/" className="hover:text-cv-blue transition-colors">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="hover:text-cv-blue transition-colors">
                Dashboard
              </Link>
              <Link to="/history" className="hover:text-cv-blue transition-colors">
                History
              </Link>
              <Link to="/profile" className="hover:text-cv-blue transition-colors">
                Profile
              </Link>
            </>
          )}
        </nav>
        
        <div>
          {isLoggedIn ? (
            <Button variant="outline" onClick={onLogout}>
              Sign Out
            </Button>
          ) : (
            <Button onClick={onLogin}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
