
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout = ({ children, isLoggedIn, onLogin, onLogout }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
