import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IntegrationsPolimetal() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Integración Polimetal</CardTitle>
          <CardDescription>
            Panel de configuración y monitoreo de integraciones para Polimetal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-card/50">
            <h3 className="text-lg font-semibold mb-2">Estado del Sistema</h3>
            <p className="text-sm text-muted-foreground">
              Conexión activa y sincronizada correctamente con los servicios de Nexergy AI.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="default">Iniciar Onboarding</Button>
            <Button variant="outline">Ver Documentación</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}