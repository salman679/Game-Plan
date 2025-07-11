import { Provider } from "react-redux";
import { store } from "./store/store";
import Dashboard from "./Layouts/DashboardLayout";
import AuthFlow from "./components/auth/AuthFlow";

const AppContent = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="App">
      {/* {isAuthenticated ? <Dashboard /> : <AuthFlow />} */}
      <AuthFlow />
      {/* <Dashboard /> */}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
