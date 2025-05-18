
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-arq-blue/90 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Cálculos Arquitetônicos Simplificados
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-blue-100">
              Ferramenta profissional para arquitetos realizarem cálculos precisos de medidas, 
              estimativas de materiais e conversões de unidades.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-white text-arq-blue hover:bg-blue-50">
                    Acessar Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button size="lg" className="bg-white text-arq-blue hover:bg-blue-50">
                      Iniciar Agora
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Criar Conta
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Recursos Essenciais para Arquitetos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-arq-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-arq-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Cálculos de Área</h3>
                <p className="text-gray-600">
                  Calcule áreas e perímetros de diferentes formas geométricas com precisão para projetos arquitetônicos.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-arq-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-arq-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Conversor de Unidades</h3>
                <p className="text-gray-600">
                  Converta facilmente entre diferentes unidades de medida utilizadas na arquitetura e construção civil.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-arq-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-arq-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">Estimativa de Materiais</h3>
                <p className="text-gray-600">
                  Calcule a quantidade de materiais necessários para sua obra, economizando tempo e evitando desperdícios.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-arq-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Comece a Usar Hoje Mesmo
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
              Economize tempo nos cálculos e dedique mais tempo ao design. Ferramenta essencial para arquitetos e estudantes.
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-arq-blue hover:bg-blue-600">
                  Acessar Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="lg" className="bg-arq-blue hover:bg-blue-600">
                  Criar Conta Gratuita
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="arq-heading text-xl text-arq-blue">ArqCalc</h3>
              <p className="text-sm text-muted-foreground">Calculadora para Arquitetos</p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ArqCalc. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
