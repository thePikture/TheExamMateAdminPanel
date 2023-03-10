import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Student from './pages/Student';
import GeoHierarchicalState from './pages/GeoHierarchicalState';
import GeoHierarchicalDistrict from './pages/GeoHierarchicalDistrict';
import GeoHierarchicalTaluk from './pages/GeoHierarchicalTaluk';
import ExamBoard from './pages/ExamBoard';
import ExamMedium from './pages/ExamMedium';
import ExamSubjectGroup from './pages/ExamSubjectGroup';
import ExamSubject from './pages/ExamSubject';
import ExamGrade from './pages/ExamGrade';
import School from './pages/School';
import AddSchool from './pages/AddSchool';
import QuestionsBank from './pages/QuestionsBank';
import AddQuestion from './pages/AddQuestion';
import ExamChapter from './pages/ExamChapter';

// ----------------------------------------------------------------------

export default function Router({ loggedIn }) {
  return useRoutes([
    {
      path: '/dashboard',
      element: loggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'student', element: <Student /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'geo-hierarchical-state', element: <GeoHierarchicalState /> },
        { path: 'geo-hierarchical-district', element: <GeoHierarchicalDistrict /> },
        { path: 'geo-hierarchical-taluk', element: <GeoHierarchicalTaluk /> },
        { path: 'exam-board', element: <ExamBoard /> },
        { path: 'exam-medium', element: <ExamMedium /> },
        { path: 'exam-grade', element: <ExamGrade /> },
        { path: 'exam-subject-group', element: <ExamSubjectGroup /> },
        { path: 'exam-subject', element: <ExamSubject /> },
        { path: 'school', element: <School /> },
        { path: 'add-school', element: <AddSchool /> },
        { path: 'question-bank', element: <QuestionsBank /> },
        { path: 'add-question', element: <AddQuestion /> },
        { path: 'exam-chapter', element: <ExamChapter /> },
      ],
    },
    {
      path: '/',
      element: !loggedIn ? <LogoOnlyLayout /> : <Navigate to="/dashboard/app " />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
