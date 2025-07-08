import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import PageNotFound from "./page/PageNotFound";
import Login from "./page/Login";
import { CitiesProvider } from "./context/CitiesContext";
import { FakeAuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./page/ProtectedRoute";
import Spinner from "./components/Spinner";

const HomePage = lazy(() => import("./page/HomePage"));
const Product = lazy(() => import("./page/Product"));
const Pricing = lazy(() => import("./page/Pricing"));
const AppLayout = lazy(() => import("./page/AppLayout"));
const MapLayout = lazy(() => import("./page/MapLayout"));
const CitiesList = lazy(() => import("./components/CitiesList"));
const CountryList = lazy(() => import("./components/CountryList"));
const City = lazy(() => import("./components/City"));
const Form = lazy(() => import("./components/Form"));

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MapLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace={true} />} />
              <Route path="cities" element={<CitiesList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}
export default App;
