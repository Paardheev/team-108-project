import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProfilePage } from './pages/auth/ProfilePage';
import { RolesManagementPage } from './pages/auth/RolesManagementPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

import { SettingsPage } from './pages/auth/SettingsPage';
import { ProfileEditPage } from './pages/auth/ProfileEditPage';

import { AnnouncementsPage } from './pages/announcements/AnnouncementsPage';
import { CreateAnnouncementPage } from './pages/announcements/CreateAnnouncementPage';
import { EditAnnouncementPage } from './pages/announcements/EditAnnouncementPage';
import { ReadStatusPage } from './pages/announcements/ReadStatusPage';
import { ChannelsPage } from './pages/announcements/ChannelsPage';

import { EventsPage } from './pages/events/EventsPage';
import { EventDetailPage } from './pages/events/EventDetailPage';
import { CreateEventPage } from './pages/events/CreateEventPage';
import { EventRegistrationPage } from './pages/events/EventRegistrationPage';

import { TasksPage } from './pages/tasks/TasksPage';
import { CreateTaskPage } from './pages/tasks/CreateTaskPage';
import { TaskDetailPage } from './pages/tasks/TaskDetailPage';
import { ProgressTrackerPage } from './pages/tasks/ProgressTrackerPage';

import { ResourcesPage } from './pages/resources/ResourcesPage';
import { UploadResourcePage } from './pages/resources/UploadResourcePage';
import { ResourceDetailsPage } from './pages/resources/ResourceDetailsPage';

import { AttendancePage } from './pages/attendance/AttendancePage';
import { AttendanceSheetPage } from './pages/attendance/AttendanceSheetPage';
import { QRScannerPage } from './pages/attendance/QRScannerPage';
import { AttendanceReportsPage } from './pages/attendance/AttendanceReportsPage';

import { DiscussionsPage } from './pages/discussions/DiscussionsPage';
import { DiscussionDetailPage } from './pages/discussions/DiscussionDetailPage';
import { CreateDiscussionPage } from './pages/discussions/CreateDiscussionPage';

import { CompetitionsPage } from './pages/competitions/CompetitionsPage';
import { CompetitionDetailPage } from './pages/competitions/CompetitionDetailPage';
import { RegisterTeamPage } from './pages/competitions/RegisterTeamPage';

import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { MembersPage } from './pages/members/MembersPage';
import { AvailabilityPage } from './pages/members/AvailabilityPage';
import { AIAssistantPage } from './pages/ai/AIAssistantPage';
import { AuditLogPage } from './pages/system/AuditLogPage';
import { GlobalSearchPage } from './pages/system/GlobalSearchPage';
import { AdminPage } from './pages/system/AdminPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const RoleProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { isAuthenticated, currentUser } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Protected Routes inside MainLayout */}
          <Route 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/roles" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head']}>
                <RolesManagementPage />
              </RoleProtectedRoute>
            } />
            <Route path="/admin" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head']}>
                <AdminPage />
              </RoleProtectedRoute>
            } />

            {/* Announcements */}
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/announcements/create" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead']}>
                <CreateAnnouncementPage />
              </RoleProtectedRoute>
            } />
            <Route path="/announcements/:id/edit" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead']}>
                <EditAnnouncementPage />
              </RoleProtectedRoute>
            } />
            <Route path="/announcements/:id/read-status" element={<ReadStatusPage />} />
            <Route path="/announcements/channels" element={<ChannelsPage />} />
            <Route path="/channels" element={<ChannelsPage />} />

            {/* Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead']}>
                <CreateEventPage />
              </RoleProtectedRoute>
            } />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/events/:id/register" element={<EventRegistrationPage />} />

            {/* Tasks */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/create" element={
              <RoleProtectedRoute allowedRoles={['Admin', 'Faculty Advisor', 'Club Head', 'Coordinator', 'Team Lead']}>
                <CreateTaskPage />
              </RoleProtectedRoute>
            } />
            <Route path="/tasks/progress" element={<ProgressTrackerPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />

            {/* Resources */}
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/upload" element={<UploadResourcePage />} />
            <Route path="/resources/:id" element={<ResourceDetailsPage />} />

            {/* Attendance */}
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/attendance/qr-scanner" element={<QRScannerPage />} />
            <Route path="/attendance/reports" element={<AttendanceReportsPage />} />
            <Route path="/attendance/:id/sheet" element={<AttendanceSheetPage />} />

            {/* Discussions */}
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/discussions/create" element={<CreateDiscussionPage />} />
            <Route path="/discussions/:id" element={<DiscussionDetailPage />} />

            {/* Competitions */}
            <Route path="/competitions" element={<CompetitionsPage />} />
            <Route path="/competitions/:id" element={<CompetitionDetailPage />} />
            <Route path="/competitions/:id/register" element={<RegisterTeamPage />} />

            {/* System & Operations */}
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/availability" element={<AvailabilityPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/audit-log" element={<AuditLogPage />} />
            <Route path="/search" element={<GlobalSearchPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
