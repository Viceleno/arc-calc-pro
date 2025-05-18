
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MaterialEstimator = () => {
  // Estado para cálculo de tijolos/blocos
  const [wallLength, setWallLength] = useState<number>(10);
  const [wallHeight, setWallHeight] = useState<number>(2.5);
  const [brickType, setBrickType] = useState('standard');
  const [doorCount, setDoorCount] = useState<number>(1);
  const [windowCount, setWindowCount] = useState<number>(2);
  
  // Estado para cálculo de tintas
  const [wallArea, setWallArea] = useState<number>(50);
  const [paintCoats, setPaintCoats] = useState<number>(2);
  const [paintYield, setPaintYield] = useState<number>(10);
  
  // Estado para cálculo de azulejos/pisos
  const [floorArea, setFloorArea] = useState<number>(20);
  const [tileSize, setTileSize] = useState('standard');
  const [tileExtra, setTileExtra] = useState<number>(10);
  
  // Tipo de tijolos/blocos disponíveis
  const brickTypes = [
    { value: 'standard', label: 'Tijolo comum (19x19x9 cm)', area: 0.0361, perMSquare: 25 },
    { value: 'hollow', label: 'Bloco furado (19x19x14 cm)', area: 0.0361, perMSquare: 25 },
    { value: 'concrete', label: 'Bloco de concreto (40x20x15 cm)', area: 0.08, perMSquare: 12.5 },
    { value: 'ceramic', label: 'Tijolo cerâmico (11.5x7.5x24 cm)', area: 0.0288, perMSquare: 34 },
    { value: 'glass', label: 'Tijolo de vidro (19x19x8 cm)', area: 0.0361, perMSquare: 25 },
  ];
  
  // Tamanhos de azulejos disponíveis
  const tileSizes = [
    { value: 'small', label: 'Pequeno (20x20 cm)', area: 0.04, perMSquare: 25 },
    { value: 'standard', label: 'Padrão (30x30 cm)', area: 0.09, perMSquare: 11.11 },
    { value: 'medium', label: 'Médio (45x45 cm)', area: 0.2025, perMSquare: 4.94 },
    { value: 'large', label: 'Grande (60x60 cm)', area: 0.36, perMSquare: 2.78 },
    { value: 'rectangle', label: 'Retangular (30x60 cm)', area: 0.18, perMSquare: 5.56 },
  ];
  
  // Cálculo para tijolos/blocos
  const calculateBricks = () => {
    const selectedBrick = brickTypes.find(type => type.value === brickType);
    if (!selectedBrick) return { brickCount: 0, mortar: 0 };
    
    // Área total da parede
    const totalWallArea = wallLength * wallHeight;
    
    // Área de portas (estimativa: 2.1m x 0.8m)
    const doorArea = doorCount * (2.1 * 0.8);
    
    // Área de janelas (estimativa: 1.2m x 1.0m)
    const windowArea = windowCount * (1.2 * 1.0);
    
    // Área líquida
    const netWallArea = totalWallArea - doorArea - windowArea;
    
    // Quantidade de tijolos
    const brickCount = Math.ceil(netWallArea * selectedBrick.perMSquare);
    
    // Estimativa de argamassa (em metros cúbicos)
    // Aproximadamente 0.03 m³ por m² de parede
    const mortar = netWallArea * 0.03;
    
    return { brickCount, mortar };
  };
  
  // Cálculo para tintas
  const calculatePaint = () => {
    // Litros de tinta necessários
    const totalPaintArea = wallArea * paintCoats;
    const paintLiters = totalPaintArea / paintYield;
    
    // Quantidade de latas (considerando latas de 18L, 3.6L e 0.9L)
    const cans18L = Math.floor(paintLiters / 18);
    let remainingPaint = paintLiters % 18;
    
    const cans3_6L = Math.floor(remainingPaint / 3.6);
    remainingPaint = remainingPaint % 3.6;
    
    const cans0_9L = Math.ceil(remainingPaint / 0.9);
    
    return { paintLiters, cans18L, cans3_6L, cans0_9L };
  };
  
  // Cálculo para azulejos/pisos
  const calculateTiles = () => {
    const selectedTile = tileSizes.find(tile => tile.value === tileSize);
    if (!selectedTile) return { tileCount: 0, boxCount: 0 };
    
    // Quantidade de azulejos
    const baseTileCount = Math.ceil(floorArea * selectedTile.perMSquare);
    
    // Adicionar percentual extra
    const tileCount = Math.ceil(baseTileCount * (1 + tileExtra / 100));
    
    // Quantidade de caixas (assume uma média de 1m² por caixa)
    const boxCount = Math.ceil(tileCount / selectedTile.perMSquare);
    
    return { tileCount, boxCount };
  };
  
  // Resultados dos cálculos
  const brickResult = calculateBricks();
  const paintResult = calculatePaint();
  const tileResult = calculateTiles();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="arq-heading">Estimador de Materiais</CardTitle>
        <CardDescription>
          Calcule a quantidade de materiais necessários para sua obra.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bricks">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bricks">Tijolos/Blocos</TabsTrigger>
            <TabsTrigger value="paint">Tintas</TabsTrigger>
            <TabsTrigger value="tiles">Azulejos/Pisos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bricks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wallLength">Comprimento da Parede (m)</Label>
                <Input
                  id="wallLength"
                  type="number"
                  value={wallLength || ''}
                  onChange={(e) => setWallLength(Number(e.target.value))}
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="wallHeight">Altura da Parede (m)</Label>
                <Input
                  id="wallHeight"
                  type="number"
                  value={wallHeight || ''}
                  onChange={(e) => setWallHeight(Number(e.target.value))}
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brickType">Tipo de Tijolo/Bloco</Label>
              <Select 
                value={brickType}
                onValueChange={(value) => setBrickType(value)}
              >
                <SelectTrigger id="brickType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {brickTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="doorCount">Quantidade de Portas</Label>
                <Input
                  id="doorCount"
                  type="number"
                  value={doorCount || ''}
                  onChange={(e) => setDoorCount(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="windowCount">Quantidade de Janelas</Label>
                <Input
                  id="windowCount"
                  type="number"
                  value={windowCount || ''}
                  onChange={(e) => setWindowCount(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <h3 className="font-medium mb-3">Estimativa de Materiais:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Tijolos necessários:</p>
                  <p className="text-lg font-semibold">{brickResult.brickCount} unidades</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Argamassa:</p>
                  <p className="text-lg font-semibold">{brickResult.mortar.toFixed(2)} m³</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="paint" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="wallArea">Área Total (m²)</Label>
                <Input
                  id="wallArea"
                  type="number"
                  value={wallArea || ''}
                  onChange={(e) => setWallArea(Number(e.target.value))}
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="paintCoats">Número de Demãos</Label>
                <Input
                  id="paintCoats"
                  type="number"
                  value={paintCoats || ''}
                  onChange={(e) => setPaintCoats(Number(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="paintYield">Rendimento da Tinta (m²/litro)</Label>
              <Input
                id="paintYield"
                type="number"
                value={paintYield || ''}
                onChange={(e) => setPaintYield(Number(e.target.value))}
                step="0.1"
              />
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <h3 className="font-medium mb-3">Estimativa de Materiais:</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Volume total de tinta:</p>
                  <p className="text-lg font-semibold">{paintResult.paintLiters.toFixed(2)} litros</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Sugestão de latas:</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {paintResult.cans18L > 0 && (
                      <div className="bg-white/50 p-2 rounded-md text-center">
                        <p className="font-semibold">{paintResult.cans18L}</p>
                        <p className="text-xs">Latas de 18L</p>
                      </div>
                    )}
                    {paintResult.cans3_6L > 0 && (
                      <div className="bg-white/50 p-2 rounded-md text-center">
                        <p className="font-semibold">{paintResult.cans3_6L}</p>
                        <p className="text-xs">Latas de 3,6L</p>
                      </div>
                    )}
                    {paintResult.cans0_9L > 0 && (
                      <div className="bg-white/50 p-2 rounded-md text-center">
                        <p className="font-semibold">{paintResult.cans0_9L}</p>
                        <p className="text-xs">Latas de 0,9L</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tiles" className="space-y-4">
            <div>
              <Label htmlFor="floorArea">Área Total (m²)</Label>
              <Input
                id="floorArea"
                type="number"
                value={floorArea || ''}
                onChange={(e) => setFloorArea(Number(e.target.value))}
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tileSize">Tamanho do Azulejo/Piso</Label>
              <Select 
                value={tileSize}
                onValueChange={(value) => setTileSize(value)}
              >
                <SelectTrigger id="tileSize">
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {tileSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tileExtra">Percentual Extra (%)</Label>
              <Input
                id="tileExtra"
                type="number"
                value={tileExtra || ''}
                onChange={(e) => setTileExtra(Number(e.target.value))}
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Adicione um percentual para cobrir quebras, recortes e reposição futura.
              </p>
            </div>
            
            <div className="mt-6 bg-secondary p-4 rounded-md">
              <h3 className="font-medium mb-3">Estimativa de Materiais:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Quantidade de peças:</p>
                  <p className="text-lg font-semibold">{tileResult.tileCount} unidades</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Quantidade de caixas:</p>
                  <p className="text-lg font-semibold">~{tileResult.boxCount} caixas</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MaterialEstimator;
