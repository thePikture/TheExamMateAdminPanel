// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Student',
    path: '/dashboard/student',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Geo Hierarchical',
    path: '/dashboard/geo-hierarchical',
    icon: getIcon('eva:shopping-bag-fill'),
    items: [{
      title: 'State',
      path: '/dashboard/student',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'District',
      path: '/dashboard/geo-hierarchical',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'Taluk',
      path: '/dashboard/geo-hierarchical',
      icon: getIcon('eva:shopping-bag-fill'),
    },]

  },
  {
    title: 'Exam Hierarchical',
    path: '/dashboard/exam-hierarchical',
    icon: getIcon('eva:file-text-fill'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
