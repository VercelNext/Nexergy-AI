# NEXERGY OIL - Arquitectura de Flujo de Datos

## Visión General

NEXERGY OIL implementa un flujo de datos escalable desde **Data Ingestion** hasta **Digital Twin Configuration**, preparado para integración futura con **Cloudflare R2** y **D1**.

## Flujo de Datos

```
User Input (Data Ingestion Form)
    ↓
tRPC Mutation: ingestion.submit
    ↓
Database: dataIngestion table (D1)
    ↓
Feedback Message: "Recibido. Activando agentes..."
    ↓
Digital Twin Configuration Form
    ↓
tRPC Mutation: digitalTwin.configureGoal
    ↓
Database: digitalTwinGoals table (D1)
    ↓
Success Confirmation
```

## Componentes Principales

### Frontend

- **Hero.tsx**: Hero section limpio con branding NEXERGY OIL
- **Navigation.tsx**: Navegación centralizada con botón "Enviar consulta" en esquina superior derecha
- **OperationalInput.tsx**: Componente dual con flujo Data Ingestion → Digital Twin
- **OperationalOrchestrator.tsx**: Visualización del pipeline de 5 pasos
- **OperationalDashboard.tsx**: Dashboard con métricas en tiempo real
- **IntelligenceLayers.tsx**: Capas de inteligencia modular
- **ContactButton.tsx**: Botón de contacto centralizado con estilo NEXERGY OIL

### Backend

- **routers.ts**: Procedimientos tRPC para ingestion y digitalTwin
- **db.ts**: Funciones de persistencia en base de datos
- **schema.ts**: Tablas Drizzle para dataIngestion y digitalTwinGoals

## Esquema de Base de Datos

### Tabla: data_ingestion

```sql
CREATE TABLE data_ingestion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sourceName TEXT NOT NULL,
  sourceType TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  metadata TEXT,
  storageKey TEXT, -- Preparado para R2
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: digital_twin_goals

```sql
CREATE TABLE digital_twin_goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ingestionId INT NOT NULL,
  goalType TEXT NOT NULL,
  description TEXT NOT NULL,
  optimizationTarget TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ingestionId) REFERENCES data_ingestion(id)
);
```

## Procedimientos tRPC

### ingestion.submit

**Input:**
```typescript
{
  sourceName: string;
  sourceType: string;
  metadata?: string;
}
```

**Output:**
```typescript
{
  success: boolean;
  id: number;
  message: string; // "Recibido. Activando agentes específicos..."
}
```

### digitalTwin.configureGoal

**Input:**
```typescript
{
  ingestionId: number;
  goalType: string;
  description: string;
  optimizationTarget?: string;
}
```

**Output:**
```typescript
{
  success: boolean;
  id: number;
}
```

## Preparación para Cloudflare R2

El campo `storageKey` en la tabla `data_ingestion` está preparado para almacenar referencias a archivos en R2. Para implementar la integración:

1. **Configurar credenciales de R2** en variables de entorno:
   ```
   CLOUDFLARE_ACCOUNT_ID=<your-account-id>
   CLOUDFLARE_API_TOKEN=<your-api-token>
   CLOUDFLARE_R2_BUCKET_NAME=<your-bucket-name>
   ```

2. **Crear helper de upload** en `server/storage.ts`:
   ```typescript
   export async function uploadToR2(file: Buffer, key: string) {
     // Implementación con SDK de Cloudflare
   }
   ```

3. **Actualizar mutation de ingestion** para procesar archivos:
   ```typescript
   ingestion.submit: publicProcedure
     .input(z.object({
       sourceName: z.string(),
       sourceType: z.string(),
       file: z.instanceof(File).optional(),
     }))
     .mutation(async ({ input }) => {
       let storageKey: string | undefined;
       if (input.file) {
         storageKey = await uploadToR2(input.file, `ingestion/${Date.now()}`);
       }
       // ... resto de la lógica
     })
   ```

## Scroll Continuo

La landing implementa scroll continuo desde Hero hasta Footer:

- **Hero**: Sección principal con branding NEXERGY OIL
- **Orchestrator**: Pipeline de 5 pasos (id="orchestrator")
- **Data Ingestion**: Formulario de ingesta (id="analytics")
- **Dashboard**: Métricas en tiempo real (id="dashboard")
- **Intelligence Layers**: Capas de inteligencia (id="about")
- **Trust & Governance**: Sección de confianza
- **Platform Architecture**: Arquitectura de la plataforma
- **Footer**: Pie de página con información de contacto

Todos los elementos tienen IDs para navegación suave mediante `scrollIntoView({ behavior: 'smooth' })`.

## Validación Local

Para validar localmente sin despliegue:

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Acceder a http://localhost:5173
```

## Próximos Pasos

1. **Migración de Base de Datos**: Ejecutar migraciones Drizzle para crear tablas
2. **Integración con R2**: Implementar upload de archivos a Cloudflare R2
3. **Procesamiento de Datos**: Agregar lógica de procesamiento en agentes específicos
4. **Notificaciones**: Implementar sistema de notificaciones para actualizaciones de estado
5. **Autenticación**: Integrar con sistema de autenticación existente

## Notas de Mantenibilidad

- **Modularidad**: Cada componente es independiente y reutilizable
- **Tipado**: TypeScript asegura seguridad de tipos en frontend y backend
- **Escalabilidad**: Arquitectura preparada para múltiples fuentes de datos y objetivos de Digital Twin
- **Documentación**: Código comentado y estructura clara para facilitar continuidad
