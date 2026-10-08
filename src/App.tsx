import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { QuranPage } from './pages/QuranPage';
import { HadithPage } from './pages/HadithPage';
import { FiqhPage } from './pages/FiqhPage';
import { TeachersPage } from './pages/TeachersPage';
import { ResearchPage } from './pages/ResearchPage';
import { CommunityPage } from './pages/CommunityPage';
import { DashboardPage } from './pages/DashboardPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AdminPanel } from './pages/AdminPanel';
import { VerificationPage } from './pages/VerificationPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/quran" element={<QuranPage />} />
              <Route path="/hadith" element={<HadithPage />} />
              <Route path="/fiqh" element={<FiqhPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/verify" element={<VerificationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
