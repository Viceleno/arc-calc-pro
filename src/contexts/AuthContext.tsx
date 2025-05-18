
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define os tipos para o usuário e o contexto
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Cria o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há um usuário armazenado no localStorage ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('arqcalc-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulação de autenticação (em um app real, isso seria uma chamada API)
      if (email === 'demo@arqcalc.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Usuário Demo',
          email: 'demo@arqcalc.com'
        };
        
        setUser(userData);
        localStorage.setItem('arqcalc-user', JSON.stringify(userData));
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('arqcalc-user');
  };

  // Valor do contexto que será disponibilizado
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
