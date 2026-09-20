import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Componente provisional para validar la ruta sin depender de archivos externos no existentes
function PolimetalView() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Integración Polimetal / Onboarding</h1>
        <p className="mt-2 text-muted-foreground">Página cargada correctamente desde la SPA.</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Rutas con captura directa y comodín para Polimetal y Onboarding */}
      <Route path="/polimetal*" component={PolimetalView} />
      <Route path="/onboarding*" component={PolimetalView} />
      <Route path="/integrations/polimetal*" component={PolimetalView} />

      <Route path="/404" component={NotFound} />
      {/* Ruta fallback final */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;