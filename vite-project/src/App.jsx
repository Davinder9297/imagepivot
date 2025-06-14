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
import BorderWrapper from "./components/BorderWrapper";
import SubscribePage from "./pages/SubscribePage";
import CompressAudioPage from "./pages/CompressAudio";
import VideoCompressionPage from "./pages/CompressVideo";
import PaymentSuccessPage from "./pages/PaymentSuccess";
import PaymentFailedPage from "./pages/PaymentFailed";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-container bg-gray-100">
          <Navbar />
          <main className="route-transition">
            <Routes>
              {/* <Route path="/" element={<PreHome />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/plans" element={<SubscriptionPlans />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/success" element={<PaymentSuccessPage />} />
              <Route path="/cancel" element={<PaymentFailedPage />}/>
              
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

              <Route path="/convert" element={<BorderWrapper><ConvertPage /></BorderWrapper>} />
              <Route path="/convertaudio" element={<BorderWrapper><ConvertAudioPage /></BorderWrapper>} />
              <Route path="/convertvideo" element={<BorderWrapper><ConvertVideoPage /></BorderWrapper>} />
              <Route path="/compress" element={<BorderWrapper><CompressorPage /></BorderWrapper>} />
              <Route path="/html-to-image" element={<BorderWrapper><HtmlToImagePage /></BorderWrapper>} />
              <Route path="/rotate" element={<BorderWrapper><RotatePage /></BorderWrapper>} />
              <Route path="/crop" element={<BorderWrapper><CropPage /></BorderWrapper>} />
              <Route path="/watermark" element={<BorderWrapper><WatermarkPage /></BorderWrapper>} />
              <Route path="/meme-generator" element={<MemeGeneratorPage />}/>
              <Route path="/blur-face" element={<BorderWrapper><BlurFacePage /></BorderWrapper>} /> 
              <Route path="/upscale" element={<BorderWrapper><UpscalePage /></BorderWrapper>} />
              <Route path="/forgot-password" element={<BorderWrapper><ForgotPassword /></BorderWrapper>} />
              <Route path="/compress-audio" element={<BorderWrapper><CompressAudioPage /></BorderWrapper>} />
              <Route path="/compress-video" element={<BorderWrapper><VideoCompressionPage /></BorderWrapper>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
