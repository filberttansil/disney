// IMPORT PROVIDER AGAR DAPAT MENGGUNAKAN STORE DI REACT
import { Provider } from "react-redux";
// IMPORT ROUTER PROVIDER UNTUK MENGGUNAKAN REACT ROUTER
import { RouterProvider } from "react-router-dom";
// IMPORT ROUTER UTK ATTRIBUTE ROUTER PROVIDER
import router from "./router/router";
// IMPORT STORE UTK ATTRIBUTE PROVIDER
import store from "./stores/index";
// IMPORT INDEX.CSS UTK STYLING TAILWIND
import "./index.css";

// FUNCTION COMPONENT APP YG DI EXPORT KE MAIN
function App() {
  return (
    // COMPONENT PROVIDER DIATAS ROUTER PROVIDER
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
