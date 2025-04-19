
import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthDialogOpen: boolean;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  // These functions will need to be implemented with Supabase
  const login = async (email: string, password: string) => {
    // Placeholder for Supabase authentication
    console.log("Login with:", email, password);
    // Mock successful login for now
    setUser({ id: "user-123", email: email });
    closeAuthDialog();
  };

  const register = async (email: string, password: string) => {
    // Placeholder for Supabase authentication
    console.log("Register with:", email, password);
    // Mock successful registration for now
    setUser({ id: "user-123", email: email });
    closeAuthDialog();
  };

  const logout = () => {
    // Placeholder for Supabase logout
    setUser(null);
  };

  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthDialogOpen,
        openAuthDialog,
        closeAuthDialog,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
