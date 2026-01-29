import type { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MainLayout } from "@/layouts/MainLayout";
import {
  HomePage,
  AboutPage,
  GalleryPage,
  CalendarPage,
  NewsPage,
  PerformancePage,
  FeesPage,
  AdmissionsPage,
  ContactPage,
  NotFoundPage,
} from "@/pages";
import { ScrollToTop } from "@/components";
import "./styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

export const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <MainLayout>
                <GalleryPage />
              </MainLayout>
            }
          />
          <Route
            path="/calendar"
            element={
              <MainLayout>
                <CalendarPage />
              </MainLayout>
            }
          />
          <Route
            path="/news"
            element={
              <MainLayout>
                <NewsPage />
              </MainLayout>
            }
          />
          <Route
            path="/performance"
            element={
              <MainLayout>
                <PerformancePage />
              </MainLayout>
            }
          />
          <Route
            path="/fees"
            element={
              <MainLayout>
                <FeesPage />
              </MainLayout>
            }
          />
          <Route
            path="/admissions"
            element={
              <MainLayout>
                <AdmissionsPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFoundPage />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
