
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

// Define os tipos para o contexto
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Configura o listener de autenticação e verifica sessão atual
  useEffect(() => {
    // Configura o listener para mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Redireciona com base no evento de autenticação
        if (event === 'SIGNED_IN' && window.location.pathname === '/login') {
          navigate('/dashboard');
        } else if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // Verifica se já existe uma sessão
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login realizado com sucesso!");
      
      // Não é necessário navegar aqui, o listener onAuthStateChange cuidará disso
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast.error(error.message === 'Invalid login credentials' 
        ? 'Credenciais inválidas. Verifique seu email e senha.' 
        : error.message || 'Erro ao fazer login. Verifique suas credenciais.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de cadastro
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Primeiro verificar se o usuário já existe
      const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (existingUser?.user) {
        toast.error("Este email já está cadastrado. Por favor, faça login.");
        navigate('/login');
        return;
      }

      // Se não existir, realizar o cadastro
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: window.location.origin + '/login',
        },
      });

      if (error) throw error;

      // Verifica se o usuário já foi confirmado ou se precisa confirmar o email
      if (data?.user?.identities?.length === 0) {
        toast.error("Este email já está cadastrado. Por favor, faça login ou recupere sua senha.");
        navigate('/login');
        return;
      }
      
      toast.success("Cadastro realizado com sucesso! Por favor, verifique seu e-mail para confirmar a conta.");
      navigate('/login');
      
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      
      if (error.message.includes('already registered')) {
        toast.error("Este email já está cadastrado. Por favor, faça login.");
        navigate('/login');
        return;
      }
      
      toast.error(error.message || 'Erro ao criar conta. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de reset de senha
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;

      toast.success("E-mail de recuperação enviado. Verifique sua caixa de entrada.");
      navigate('/login');
    } catch (error: any) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      toast.error(error.message || 'Erro ao enviar e-mail de recuperação.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logout realizado com sucesso!");
      
      // Não é necessário navegar aqui, o listener onAuthStateChange cuidará disso
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout.');
      throw error;
    }
  };

  // Valor do contexto que será disponibilizado
  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    login,
    signUp,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
