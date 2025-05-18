
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AreaCalculator from '@/components/calculators/AreaCalculator';
import UnitConverter from '@/components/calculators/UnitConverter';
import MaterialEstimator from '@/components/calculators/MaterialEstimator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-arq-dark">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo à sua calculadora arquitetônica. Selecione a ferramenta desejada abaixo.
          </p>
        </div>
        
        <Tabs defaultValue="area" className="space-y-8">
          <TabsList className="w-full flex-wrap h-auto p-1 bg-secondary">
            <TabsTrigger value="area" className="flex-1 py-2">
              Calculadora de Área
            </TabsTrigger>
            <TabsTrigger value="converter" className="flex-1 py-2">
              Conversor de Unidades
            </TabsTrigger>
            <TabsTrigger value="material" className="flex-1 py-2">
              Estimador de Materiais
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="area">
            <AreaCalculator />
          </TabsContent>
          
          <TabsContent value="converter">
            <UnitConverter />
          </TabsContent>
          
          <TabsContent value="material">
            <MaterialEstimator />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ArqCalc - Calculadora para Arquitetos © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
