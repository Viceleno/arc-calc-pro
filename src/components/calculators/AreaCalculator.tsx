
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AreaCalculator = () => {
  // Estado para cálculo retangular
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [rectangleArea, setRectangleArea] = useState<number>(0);
  const [rectanglePerimeter, setRectanglePerimeter] = useState<number>(0);
  
  // Estado para cálculo triangular
  const [base, setBase] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [sideA, setSideA] = useState<number>(0);
  const [sideB, setSideB] = useState<number>(0);
  const [sideC, setSideC] = useState<number>(0);
  const [triangleArea, setTriangleArea] = useState<number>(0);
  const [trianglePerimeter, setTrianglePerimeter] = useState<number>(0);
  
  // Estado para cálculo circular
  const [radius, setRadius] = useState<number>(0);
  const [circleArea, setCircleArea] = useState<number>(0);
  const [circlePerimeter, setCirclePerimeter] = useState<number>(0);
  
  // Cálculo para retângulo
  useEffect(() => {
    setRectangleArea(length * width);
    setRectanglePerimeter(2 * (length + width));
  }, [length, width]);
  
  // Cálculo para triângulo
  useEffect(() => {
    // Área do triângulo
    setTriangleArea((base * height) / 2);
    
    // Perímetro do triângulo
    if (sideA && sideB && sideC) {
      setTrianglePerimeter(sideA + sideB + sideC);
    } else {
      setTrianglePerimeter(0);
    }
  }, [base, height, sideA, sideB, sideC]);
  
  // Cálculo para círculo
  useEffect(() => {
    setCircleArea(Math.PI * radius * radius);
    setCirclePerimeter(2 * Math.PI * radius);
  }, [radius]);
  
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return '0';
    return num.toFixed(2);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="arq-heading">Calculadora de Área</CardTitle>
        <CardDescription>
          Calcule a área e perímetro de diferentes formas geométricas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rectangle">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="rectangle">Retângulo</TabsTrigger>
            <TabsTrigger value="triangle">Triângulo</TabsTrigger>
            <TabsTrigger value="circle">Círculo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rectangle" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="length">Comprimento (m)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="Comprimento"
                  value={length || ''}
                  onChange={(e) => setLength(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="width">Largura (m)</Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="Largura"
                  value={width || ''}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Área:</p>
                  <p className="text-lg font-semibold">{formatNumber(rectangleArea)} m²</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Perímetro:</p>
                  <p className="text-lg font-semibold">{formatNumber(rectanglePerimeter)} m</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="triangle" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="triangleBase">Base (m)</Label>
                <Input
                  id="triangleBase"
                  type="number"
                  placeholder="Base"
                  value={base || ''}
                  onChange={(e) => setBase(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="triangleHeight">Altura (m)</Label>
                <Input
                  id="triangleHeight"
                  type="number"
                  placeholder="Altura"
                  value={height || ''}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-2">Para cálculo do perímetro:</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sideA">Lado A (m)</Label>
                  <Input
                    id="sideA"
                    type="number"
                    placeholder="Lado A"
                    value={sideA || ''}
                    onChange={(e) => setSideA(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sideB">Lado B (m)</Label>
                  <Input
                    id="sideB"
                    type="number"
                    placeholder="Lado B"
                    value={sideB || ''}
                    onChange={(e) => setSideB(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="sideC">Lado C (m)</Label>
                  <Input
                    id="sideC"
                    type="number"
                    placeholder="Lado C"
                    value={sideC || ''}
                    onChange={(e) => setSideC(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Área:</p>
                  <p className="text-lg font-semibold">{formatNumber(triangleArea)} m²</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Perímetro:</p>
                  <p className="text-lg font-semibold">{formatNumber(trianglePerimeter)} m</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="circle" className="space-y-4">
            <div>
              <Label htmlFor="radius">Raio (m)</Label>
              <Input
                id="radius"
                type="number"
                placeholder="Raio"
                value={radius || ''}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Área:</p>
                  <p className="text-lg font-semibold">{formatNumber(circleArea)} m²</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Circunferência:</p>
                  <p className="text-lg font-semibold">{formatNumber(circlePerimeter)} m</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AreaCalculator;
