import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import ConvertPage from "./pages/ConvertPage";
import CompressorPage from "./pages/CompressorPage";
import HtmlToImagePage from "./pages/HtmlToImagePage";
import RotatePage from "./pages/RotatePage";
import CropPage from "./pages/CropPage";
import WatermarkPage from "./pages/WatermarkPage";
import MemeGeneratorPage from "./pages/MemeGeneratorPage";
import BlurFacePage from "./pages/BlurFacePage"; 
import UpscalePage from "./pages/UpscalePage";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubscriptionPlans from './pages/SubscriptionPlans';
import AdminDashboard from './pages/AdminDashboard';
import PlanManagement from './pages/PlanManagement';
import UserManagement from './pages/UserManagement';
import ForgotPassword from './pages/ForgotPassword';
import ConvertAudioPage from "./pages/ConvertAudio";
import ConvertVideoPage from "./pages/ConvertVideo";
import PreHome from "./pages/preHome";
import ToolsFixed from "./components/ToolsFixed";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-container bg-gray-100">
          <Navbar />
          <ToolsFixed/>
          <main className="route-transition">
            <Routes>
              <Route path="/" element={<PreHome />} />
              <Route path="/image" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/plans" element={<SubscriptionPlans />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/plans" element={
                <AdminRoute>
                  <PlanManagement />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              } />

              <Route path="/convert" element={<ConvertPage />} />
              <Route path="/convertaudio" element={<ConvertAudioPage />} />
              <Route path="/convertvideo" element={<ConvertVideoPage />} />
              <Route path="/compress" element={<CompressorPage />} />
              <Route path="/html-to-image" element={<HtmlToImagePage />} />
              <Route path="/rotate" element={<RotatePage />} />
              <Route path="/crop" element={<CropPage />} />
              <Route path="/watermark" element={<WatermarkPage />} />
              <Route path="/meme-generator" element={<MemeGeneratorPage />}/>
              <Route path="/blur-face" element={<BlurFacePage />} /> 
              <Route path="/upscale" element={<UpscalePage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
