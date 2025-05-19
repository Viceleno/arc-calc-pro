
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (error) {
      // Erro já tratado no AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="arq-heading text-3xl text-arq-blue mb-2">ArqCalc</h1>
          <p className="text-muted-foreground">Recuperação de senha</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="arq-heading">Esqueceu sua senha?</CardTitle>
            <CardDescription>
              {!isSent 
                ? "Digite seu email para receber instruções de recuperação" 
                : "Verifique seu email para redefinir sua senha"}
            </CardDescription>
          </CardHeader>
          
          {!isSent ? (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar instruções'}
                </Button>
                <div className="text-sm text-center text-muted-foreground mt-2">
                  Lembrou sua senha?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Voltar para o login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Se houver uma conta associada a este email, você receberá instruções para redefinir sua senha.
              </p>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => window.location.href = '/login'}
              >
                Voltar para o login
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
