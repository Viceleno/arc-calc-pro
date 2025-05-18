
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSubmitted(true);
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
          <p className="text-muted-foreground">Calculadora para Arquitetos</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="arq-heading">Recuperar senha</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "E-mail de recuperação enviado." 
                : "Digite seu e-mail para receber um link de recuperação"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
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
                  {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
                <div className="text-sm text-center text-muted-foreground mt-2">
                  <Link to="/login" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar para o login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="text-center p-4">
                <p className="mb-4">
                  Enviamos um e-mail de recuperação para <strong>{email}</strong>. 
                  Por favor, verifique sua caixa de entrada e spam.
                </p>
                <div className="text-sm text-center mt-4">
                  <Link to="/login" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar para o login
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
