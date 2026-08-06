import React from 'react';
import { useApp } from '../context/AppContext';
import { AdminDashboard } from './dashboard/AdminDashboard';
import { CoordinatorDashboard } from './dashboard/CoordinatorDashboard';
import { MemberDashboard } from './dashboard/MemberDashboard';

export const Dashboard: React.FC = () => {
  const { currentUser } = useApp();

  const isAdminOrHead = ['Admin', 'Club Head', 'Faculty Advisor'].includes(currentUser.role);
  const isCoordinator = ['Coordinator', 'Team Lead'].includes(currentUser.role);
  
  if (isAdminOrHead) {
    return <AdminDashboard />;
  }

  if (isCoordinator) {
    return <CoordinatorDashboard />;
  }

  return <MemberDashboard />;
};
