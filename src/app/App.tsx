import { AppRoutes } from "../routes/AppRoutes";
import { ConfirmProvider } from "@/providers/ConfirmProvider";



function App() {
  return <ConfirmProvider>
  <AppRoutes />
</ConfirmProvider>;
}

export default App;