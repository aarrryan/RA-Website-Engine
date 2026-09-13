import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { TimetablePage } from './pages/TimetablePage';
import { CalendarPage } from './pages/CalendarPage';
import { EvaluationsPage } from './pages/EvaluationsPage';
import { LabsPage } from './pages/LabsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/timetable" element={
            <ProtectedRoute>
              <TimetablePage />
            </ProtectedRoute>
          } />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          } />
          <Route path="/evaluations" element={
            <ProtectedRoute>
              <EvaluationsPage />
            </ProtectedRoute>
          } />
          <Route path="/labs" element={
            <ProtectedRoute>
              <LabsPage />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={
            <ProtectedRoute>
              <AnnouncementsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
