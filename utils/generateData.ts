// Colombian drug lab data generation
export interface DrugLab {
  id: string;
  name: string;
  description: string;
  position: [number, number];
  type: string;
  size: string;
  status: string;
  videoUrl: string;
}

// Lab number generation
const labPrefixes = ["LAB", "DL", "OP", "SITE", "UNIT"];

// Lab types and characteristics
const labTypes = [
  "Laboratorio de procesamiento",
  "Centro de refinamiento", 
  "Planta de producción",
  "Instalación de síntesis",
  "Complejo manufacturero",
  "Unidad de transformación",
  "Facilidad de elaboración",
  "Estación de procesamiento"
];

const labSizes = [
  "pequeño", "mediano", "grande", "industrial", "artesanal", "semi-industrial"
];

const labStatuses = [
  "Activo", "Desmantelado", "Abandonado", "Intervenido", "En investigación", "Clausurado"
];

const labDescriptions = [
  "Instalación clandestina ubicada en zona rural con equipos de procesamiento químico",
  "Complejo industrial adaptado para la síntesis de sustancias controladas",
  "Laboratorio móvil con capacidad de producción limitada",
  "Facilidad equipada con tecnología avanzada para refinamiento",
  "Centro de producción con múltiples etapas de procesamiento",
  "Instalación camuflada en estructura comercial legítima",
  "Laboratorio de alta capacidad con sistemas de ventilación industrial",
  "Complejo con múltiples áreas especializadas de producción"
];

const bogotaLocations = [
  "zona rural", "área montañosa", "zona urbana", "periferia", "área industrial",
  "campo abierto", "zona boscosa", "terreno baldío", "área residencial", "zona comercial",
  "barrio popular", "sector industrial", "zona verde", "área suburbana", "complejo residencial"
];

// Available video URLs
const videoUrls = [
  "https://www.youtube.com/embed/GSjEduXXsGY?si=DM1xmEERnBBR5poV",
  "https://www.youtube.com/embed/Gs3Y3tCIe8k?si=TBYNRrJYc5FhdLMX",
  "https://www.youtube.com/embed/xWmgPcd9UtI?si=2429sgUICJEj-5Tj"
];

// Function to generate random Colombian drug lab data
export function generateDrugLabData(
  count: number, 
  center: [number, number], 
  maxRadiusKm: number
): DrugLab[] {
  const labs: DrugLab[] = [];
  const [centerLat, centerLng] = center;
  
  for (let i = 0; i < count; i++) {
    // Generate random position within radius
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * maxRadiusKm / 111; // Convert km to degrees
    
    const lat = centerLat + distance * Math.cos(angle);
    const lng = centerLng + distance * Math.sin(angle);
    
    // Generate random lab number
    const prefix = labPrefixes[Math.floor(Math.random() * labPrefixes.length)];
    const number = Math.floor(Math.random() * 9999) + 1; // Random number 1-9999
    const name = `${prefix}-${number.toString().padStart(4, '0')}`;
    
    // Generate description
    const labType = labTypes[Math.floor(Math.random() * labTypes.length)];
    const labSize = labSizes[Math.floor(Math.random() * labSizes.length)];
    const labStatus = labStatuses[Math.floor(Math.random() * labStatuses.length)];
    const location = bogotaLocations[Math.floor(Math.random() * bogotaLocations.length)];
    
    const description = `${labType} de tamaño ${labSize} encontrado en ${location} de Bogotá. Estado: ${labStatus}.`;
    
    // Random video URL
    const videoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
    
    labs.push({
      id: `lab-${i + 1}`,
      name: name,
      description: description,
      position: [lat, lng],
      type: labType,
      size: labSize,
      status: labStatus,
      videoUrl: videoUrl
    });
  }
  
  return labs;
}

// Function to generate a single lab with more detailed description
export function generateDetailedLabDescription(lab: DrugLab): string {
  const details = [
    `Capacidad estimada: ${Math.floor(Math.random() * 500) + 50} kg/mes`,
    `Equipos encontrados: ${Math.floor(Math.random() * 20) + 5} unidades`,
    `Personal detenido: ${Math.floor(Math.random() * 15) + 1} personas`,
    `Valor incautado: $${(Math.random() * 50000000 + 5000000).toLocaleString()} COP`,
    `Tiempo de operación estimado: ${Math.floor(Math.random() * 24) + 1} meses`
  ];
  
  const randomDetail = details[Math.floor(Math.random() * details.length)];
  return `${lab.description} ${randomDetail}`;
}
