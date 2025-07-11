export type Charger = {
  id: number;
  title: string;
  description: string;
  brand: string;
  countryOfOrigin: string;
  connectorType: string;
  stationType: string;
  chargingPower: string;
  amperage: string;
  connectionType: string;
  inputVoltage: string;
  cableLength: string;
  currentType: string;
  bodyMaterial: string;
  hasApp: boolean;
  connectivityModule: string;
  scheduleAndHistory: boolean;
  protectionClass: string;
  accessProtection: string;
  statusDisplay: string;
  connectorsCount: number;
  additionalFeatures: string[];
  rcd: boolean;
  loadBalancingModule: boolean;
  energyMeter: boolean;
  connectionProtocol: string;
  width: string;
  length: string;
  height: string;
  weight: string;
  price: number;
};
