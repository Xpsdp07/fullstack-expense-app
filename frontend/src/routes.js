// src/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ExpensePage from './pages/ExpensePage';
import HistoryPage from './pages/HistoryPage';
import DashboardPage from './pages/DashboardPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/expense" replace />} />
      <Route path="/expense" element={<ExpensePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: 100 }}>404 Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;
