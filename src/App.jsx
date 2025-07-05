import { Navigate, Route, Routes } from "react-router";

import PageNotFound from "./page/PageNotFound";
import Product from "./page/Product";
import Pricing from "./page/Pricing";
import Login from "./page/Login";
import AppLayout from "./page/AppLayout";
import HomePage from "./page/HomePage";
import MapLayout from "./page/MapLayout";
import CitiesList from "./components/SitiesList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { FakeAuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./page/ProtectedRoute";

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
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
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
