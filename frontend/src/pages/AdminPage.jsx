import React from 'react';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
