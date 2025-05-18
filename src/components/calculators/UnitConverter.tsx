
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UnitConverter = () => {
  // Estado para conversão de comprimento
  const [fromLengthUnit, setFromLengthUnit] = useState('meter');
  const [toLengthUnit, setToLengthUnit] = useState('centimeter');
  const [lengthValue, setLengthValue] = useState<number>(1);
  const [convertedLength, setConvertedLength] = useState<number>(100);
  
  // Estado para conversão de área
  const [fromAreaUnit, setFromAreaUnit] = useState('squareMeter');
  const [toAreaUnit, setToAreaUnit] = useState('squareFeet');
  const [areaValue, setAreaValue] = useState<number>(1);
  const [convertedArea, setConvertedArea] = useState<number>(10.764);

  // Unidades de comprimento disponíveis
  const lengthUnits = [
    { value: 'millimeter', label: 'Milímetros (mm)' },
    { value: 'centimeter', label: 'Centímetros (cm)' },
    { value: 'meter', label: 'Metros (m)' },
    { value: 'kilometer', label: 'Quilômetros (km)' },
    { value: 'inch', label: 'Polegadas (in)' },
    { value: 'foot', label: 'Pés (ft)' },
    { value: 'yard', label: 'Jardas (yd)' },
    { value: 'mile', label: 'Milhas (mi)' },
  ];
  
  // Unidades de área disponíveis
  const areaUnits = [
    { value: 'squareMillimeter', label: 'Milímetros quadrados (mm²)' },
    { value: 'squareCentimeter', label: 'Centímetros quadrados (cm²)' },
    { value: 'squareMeter', label: 'Metros quadrados (m²)' },
    { value: 'hectare', label: 'Hectares (ha)' },
    { value: 'squareKilometer', label: 'Quilômetros quadrados (km²)' },
    { value: 'squareInch', label: 'Polegadas quadradas (in²)' },
    { value: 'squareFoot', label: 'Pés quadrados (ft²)' },
    { value: 'squareYard', label: 'Jardas quadradas (yd²)' },
    { value: 'acre', label: 'Acres (ac)' },
    { value: 'squareMile', label: 'Milhas quadradas (mi²)' },
  ];
  
  // Fator de conversão para unidades de comprimento (para metros)
  const lengthToMeter: Record<string, number> = {
    millimeter: 0.001,
    centimeter: 0.01,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  };
  
  // Fator de conversão para unidades de área (para metros quadrados)
  const areaToSquareMeter: Record<string, number> = {
    squareMillimeter: 0.000001,
    squareCentimeter: 0.0001,
    squareMeter: 1,
    hectare: 10000,
    squareKilometer: 1000000,
    squareInch: 0.00064516,
    squareFoot: 0.09290304,
    squareYard: 0.83612736,
    acre: 4046.8564224,
    squareMile: 2589988.110336,
  };

  // Função para converter comprimento
  const convertLength = () => {
    const toMeter = lengthValue * lengthToMeter[fromLengthUnit];
    const result = toMeter / lengthToMeter[toLengthUnit];
    setConvertedLength(result);
  };
  
  // Função para converter área
  const convertArea = () => {
    const toSquareMeter = areaValue * areaToSquareMeter[fromAreaUnit];
    const result = toSquareMeter / areaToSquareMeter[toAreaUnit];
    setConvertedArea(result);
  };
  
  // Funções handler para mudanças nos inputs
  const handleLengthValueChange = (value: number) => {
    setLengthValue(value);
    setTimeout(() => convertLength(), 0);
  };
  
  const handleFromLengthUnitChange = (value: string) => {
    setFromLengthUnit(value);
    setTimeout(() => convertLength(), 0);
  };
  
  const handleToLengthUnitChange = (value: string) => {
    setToLengthUnit(value);
    setTimeout(() => convertLength(), 0);
  };
  
  const handleAreaValueChange = (value: number) => {
    setAreaValue(value);
    setTimeout(() => convertArea(), 0);
  };
  
  const handleFromAreaUnitChange = (value: string) => {
    setFromAreaUnit(value);
    setTimeout(() => convertArea(), 0);
  };
  
  const handleToAreaUnitChange = (value: string) => {
    setToAreaUnit(value);
    setTimeout(() => convertArea(), 0);
  };
  
  // Formatação de números
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return '0';
    
    if (num >= 1000000 || num <= 0.00001) {
      return num.toExponential(4);
    }
    
    if (Number.isInteger(num)) {
      return num.toString();
    }
    
    return num.toFixed(4).replace(/\.?0+$/, '');
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="arq-heading">Conversor de Unidades</CardTitle>
        <CardDescription>
          Converta entre diferentes unidades de medida para arquitetura.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="length">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="length">Comprimento</TabsTrigger>
            <TabsTrigger value="area">Área</TabsTrigger>
          </TabsList>
          
          <TabsContent value="length" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="lengthValue">Valor</Label>
                  <Input
                    id="lengthValue"
                    type="number"
                    value={lengthValue || ''}
                    onChange={(e) => handleLengthValueChange(Number(e.target.value))}
                    step="any"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromLengthUnit">De</Label>
                  <Select 
                    value={fromLengthUnit}
                    onValueChange={handleFromLengthUnitChange}
                  >
                    <SelectTrigger id="fromLengthUnit">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toLengthUnit">Para</Label>
                  <Select 
                    value={toLengthUnit}
                    onValueChange={handleToLengthUnitChange}
                  >
                    <SelectTrigger id="toLengthUnit">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-secondary p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">Resultado</p>
                  <p className="text-lg font-semibold">{formatNumber(convertedLength)}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">Unidade</p>
                  <p className="text-lg font-semibold">
                    {lengthUnits.find(u => u.value === toLengthUnit)?.label.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="area" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="areaValue">Valor</Label>
                  <Input
                    id="areaValue"
                    type="number"
                    value={areaValue || ''}
                    onChange={(e) => handleAreaValueChange(Number(e.target.value))}
                    step="any"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromAreaUnit">De</Label>
                  <Select 
                    value={fromAreaUnit}
                    onValueChange={handleFromAreaUnitChange}
                  >
                    <SelectTrigger id="fromAreaUnit">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toAreaUnit">Para</Label>
                  <Select 
                    value={toAreaUnit}
                    onValueChange={handleToAreaUnitChange}
                  >
                    <SelectTrigger id="toAreaUnit">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-secondary p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">Resultado</p>
                  <p className="text-lg font-semibold">{formatNumber(convertedArea)}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">Unidade</p>
                  <p className="text-lg font-semibold">
                    {areaUnits.find(u => u.value === toAreaUnit)?.label.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
