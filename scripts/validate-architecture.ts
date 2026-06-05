import fs from 'fs';
import path from 'path';

/**
 * Script de Validación de Arquitectura NEXERGY OIL
 * 
 * Este script verifica que los componentes clave de la arquitectura 
 * estén presentes y configurados correctamente para asegurar la continuidad.
 */

const PROJECT_ROOT = path.join(process.cwd());

const REQUIRED_FILES = [
  'client/src/components/Hero.tsx',
  'client/src/components/Navigation.tsx',
  'client/src/components/OperationalInput.tsx',
  'server/routers.ts',
  'drizzle/schema.ts',
  'ARCHITECTURE.md'
];

const BRANDING_CHECKS = [
  { file: 'client/src/components/Hero.tsx', pattern: /NEXERGY[\s\S]*?OIL/ },
  { file: 'client/src/components/Hero.tsx', pattern: /Operational Intelligence Layer/ },
  { file: 'client/src/components/Navigation.tsx', pattern: /NEXERGY[\s\S]*?OIL/ },
  { file: 'client/src/components/Footer.tsx', pattern: /NEXERGY[\s\S]*?OIL/ }
];

const DB_SCHEMA_CHECKS = [
  { file: 'drizzle/schema.ts', pattern: /export const dataIngestion = mysqlTable/ },
  { file: 'drizzle/schema.ts', pattern: /export const digitalTwinGoals = mysqlTable/ },
  { file: 'drizzle/schema.ts', pattern: /storageKey: text\('storageKey'\)/ }
];

const TRPC_ROUTER_CHECKS = [
  { file: 'server/routers.ts', pattern: /ingestion: router\({/ },
  { file: 'server/routers.ts', pattern: /digitalTwin: router\({/ },
  { file: 'server/routers.ts', pattern: /message: "Recibido\. Activando agentes/ }
];

function validate() {
  console.log('🚀 Iniciando validación de arquitectura NEXERGY OIL...\n');
  let errors = 0;

  // 1. Verificar archivos requeridos
  console.log('--- Verificando archivos requeridos ---');
  REQUIRED_FILES.forEach(file => {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${file} existe.`);
    } else {
      console.error(`❌ ERROR: Falta el archivo ${file}`);
      errors++;
    }
  });

  // 2. Verificar Branding
  console.log('\n--- Verificando Branding ---');
  BRANDING_CHECKS.forEach(check => {
    const fullPath = path.join(PROJECT_ROOT, check.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (check.pattern.test(content)) {
        console.log(`✅ Branding verificado en ${check.file}.`);
      } else {
        console.error(`❌ ERROR: Branding incorrecto o ausente en ${check.file}`);
        errors++;
      }
    }
  });

  // 3. Verificar Esquema DB
  console.log('\n--- Verificando Esquema de Base de Datos ---');
  DB_SCHEMA_CHECKS.forEach(check => {
    const fullPath = path.join(PROJECT_ROOT, check.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (check.pattern.test(content)) {
        console.log(`✅ Esquema verificado: ${check.pattern.source.includes('dataIngestion') ? 'dataIngestion' : check.pattern.source.includes('digitalTwinGoals') ? 'digitalTwinGoals' : 'Storage Key'}`);
      } else {
        console.error(`❌ ERROR: Esquema de DB incompleto en ${check.file}`);
        errors++;
      }
    }
  });

  // 4. Verificar tRPC Routers
  console.log('\n--- Verificando tRPC Routers ---');
  TRPC_ROUTER_CHECKS.forEach(check => {
    const fullPath = path.join(PROJECT_ROOT, check.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (check.pattern.test(content)) {
        console.log(`✅ Router verificado: ${check.pattern.source.includes('ingestion') ? 'ingestion' : check.pattern.source.includes('digitalTwin') ? 'digitalTwin' : 'Feedback Message'}`);
      } else {
        console.error(`❌ ERROR: Router tRPC incompleto en ${check.file}`);
        errors++;
      }
    }
  });

  console.log('\n--- Resultado Final ---');
  if (errors === 0) {
    console.log('✨ VALIDACIÓN EXITOSA: La arquitectura de NEXERGY OIL está lista para producción.');
    process.exit(0);
  } else {
    console.error(`🛑 VALIDACIÓN FALLIDA: Se encontraron ${errors} errores.`);
    process.exit(1);
  }
}

validate();
