import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import IntegrationsPolimetal from "./pages/IntegrationsPolimetal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Rutas para Polimetal y Onboarding */}
      <Route path="/polimetal*" component={IntegrationsPolimetal} />
      <Route path="/onboarding*" component={IntegrationsPolimetal} />
      <Route path="/integrations/polimetal*" component={IntegrationsPolimetal} />

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