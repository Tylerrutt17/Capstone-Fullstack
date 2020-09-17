import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import LeaderListView from 'src/views/social/index';
import LeaderDashboard from 'src/views/LeaderDashboard';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import AutomationStepper from 'src/views/automation';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import PortfolioView from 'src/views/PortfolioView'
import FollowerDashboard from './views/FollowerDashboard';

const routes = [
  {
    path: 'leader',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'social', element: <LeaderListView /> },
      { path: 'dashboard', element: <LeaderDashboard /> },
      { path: 'automations', element: <AutomationStepper /> },
      { path: 'settings', element: <SettingsView /> },
      { path:'portfolio', element:<PortfolioView/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/leader/dashboard" /> }, //NEEDS TO BE CHANGED!
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'follower',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'social', element: <LeaderListView /> },
      { path: 'dashboard', element: <FollowerDashboard /> },
      { path: 'automations', element: <AutomationStepper /> },
      { path: 'settings', element: <SettingsView /> },
      { path:'portfolio', element:<PortfolioView/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
