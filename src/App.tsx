import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import routes from "./routes/routes";
import Header from "./components/Layout/Header";
import MobileNavbar from "./components/Layout/MobileNavbar";

const isSmallDevice = window.matchMedia("(max-width: 600px)").matches;
// Finalize
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {routes.map((route: RouteProps) => (
            <Route key={`routes-${route.path}`} {...route} />
          ))}
        </Routes>
        {isSmallDevice && <MobileNavbar />}
      </Router>
    </div>
  );
}

export default App;
