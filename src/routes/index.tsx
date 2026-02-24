
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import LodgeLayout from '../layouts/LodgeLayout';
import Home from '../pages/Home';
import AdminDashboard from '../pages/AdminDashboard';
import LodgeDashboard from '../pages/LodgeDashboard';
import LodgePublic from '../pages/LodgePublic';
import LodgeFinance from '../pages/LodgeFinance';
import ApprovalWorkflow from '../pages/ApprovalWorkflow';
import LodgeCMS from '../pages/LodgeCMS';
import AdminDocuments from '../pages/AdminDocuments';
import AdminLojas from '../pages/AdminLojas';
import AdminObreiros from '../pages/AdminObreiros';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Governanca from '../pages/Governanca';
import Capitacao from '../pages/Capitacao';
import CmsLojas from '../pages/CmsLojas';
import Seguranca from '../pages/Seguranca';
import Documentacao from '../pages/Documentacao';
import Suporte from '../pages/Suporte';
import Termos from '../pages/Termos';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import ScrollToTop from '../components/ScrollToTop';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
                <Routes>
                    {/* Public Site */}
                    <Route element={<RootLayout />}>
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/governanca" element={<Governanca />} />
                            <Route path="/capitacao" element={<Capitacao />} />
                            <Route path="/cms-lojas" element={<CmsLojas />} />
                            <Route path="/seguranca" element={<Seguranca />} />
                            <Route path="/documentacao" element={<Documentacao />} />
                            <Route path="/suporte" element={<Suporte />} />
                            <Route path="/termos" element={<Termos />} />
                        </Route>

                        {/* Authentication (Isolated from Site UI) */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />

                        {/* Admin Master (Potência) */}
                        <Route path="/admin" element={
                            <ProtectedRoute requirePotencia>
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<AdminDashboard />} />
                            <Route path="lojas" element={<AdminLojas />} />
                            <Route path="processos" element={<AdminDocuments />} />
                            <Route path="obreiros" element={<AdminObreiros />} />
                        </Route>

                        {/* Lodge Restricted Dashboard */}
                        <Route path="/:lodgeSlug/dashboard" element={
                            <ProtectedRoute>
                                <LodgeLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<LodgeDashboard />} />
                            <Route path="membros" element={<div>Membros da Loja</div>} />
                            <Route path="financeiro" element={<LodgeFinance />} />
                            <Route path="processos" element={<ApprovalWorkflow />} />
                            <Route path="cms" element={<LodgeCMS />} />
                            <Route path="config" element={<div>Configurações</div>} />
                        </Route>

                        {/* Lodge Public Landing Page */}
                        <Route path="/:lodgeSlug" element={<LodgePublic />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
