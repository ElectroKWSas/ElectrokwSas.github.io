import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Loader from "@/components/common/Loader";

const About = lazy(() => import("@/pages/About"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const InteractivePlan = lazy(() => import("@/pages/InteractivePlan"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/nosotros"
            element={
              <Suspense fallback={<RouteFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/servicios"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Catalog />
              </Suspense>
            }
          />
          <Route
            path="/servicios/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServiceDetail />
              </Suspense>
            }
          />
          <Route
            path="/contacto"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/plano-interactivo"
            element={
              <Suspense fallback={<RouteFallback />}>
                <InteractivePlan />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
