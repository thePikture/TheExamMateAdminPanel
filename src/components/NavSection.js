import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  const [geoShow, setGeoShow] = useState(false);
  const [examShow, setExamShow] = useState(false);

  return (
    <Box {...other}>
      {/* <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List> */}
      <List disablePadding sx={{ p: 1 }}>
        <NavItem
          item={{
            title: 'Dashboard',
            path: '/dashboard/app',
            icon: getIcon('eva:pie-chart-2-fill'),
          }}
          active={match}
        />

        <NavItem
          item={{
            title: 'Student',
            path: '/dashboard/student',
            icon: getIcon('eva:people-fill'),
          }}
          active={match}
        />

        <Box onClick={() => setGeoShow(!geoShow)} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <NavItem
            item={{
              title: 'Geo Hierarchical',
              path: '/dashboard/geo-hierarchical-state',
              icon: getIcon('eva:shopping-bag-fill'),
            }}
            active={match}
          />{' '}
          <ArrowDropDownIcon />
        </Box>

        {geoShow && (
          <>
            <NavItem
              item={{
                title: 'State',
                path: '/dashboard/geo-hierarchical-state',
                icon: getIcon('mdi:map-marker'),
              }}
              active={match}
            />

            <NavItem
              item={{
                title: 'District',
                path: '/dashboard/geo-hierarchical-district',
                icon: getIcon('ic:round-zoom-in-map'),
              }}
              active={match}
            />

            <NavItem
              item={{
                title: 'Taluk',
                path: '/dashboard/geo-hierarchical-taluk',
                icon: getIcon('mdi:map-marker-distance'),
              }}
              active={match}
            />
          </>
        )}

        <Box
          onClick={() => setExamShow(!examShow)}
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
        >
          <NavItem
            item={{
              title: 'Exam Hierarchical',
              path: '/dashboard/exam-board',
              icon: getIcon('healthicons:i-exam-multiple-choice'),
            }}
            active={match}
          />{' '}
          <ArrowDropDownIcon />
        </Box>
        {examShow && (
          <>
            <NavItem
              item={{
                title: 'Board',
                path: '/dashboard/exam-board',
                icon: getIcon('iconoir:kanban-board'),
              }}
              active={match}
            />

            <NavItem
              item={{
                title: 'Medium',
                path: '/dashboard/exam-medium',
                icon: getIcon('teenyicons:medium-outline'),
              }}
              active={match}
            />

            <NavItem
              item={{
                title: 'Grade',
                path: '/dashboard/exam-grade',
                icon: getIcon('carbon:intent-request-upgrade'),
              }}
              active={match}
            />

            <NavItem
              item={{
                title: 'SubjectGroup',
                path: '/dashboard/exam-subject-group',
                icon: getIcon('emojione-monotone:books'),
              }}
              active={match}
            />
            <NavItem
              item={{
                title: 'Subject',
                path: '/dashboard/exam-subject',
                icon: getIcon('material-symbols:menu-book'),
              }}
              active={match}
            />
            <NavItem
              item={{
                title: 'Chapter',
                path: '/dashboard/exam-chapter',
                icon: getIcon('grommet-icons:chapter-add'),
              }}
              active={match}
            />
          </>
        )}
        <NavItem
          item={{
            title: 'School',
            path: '/dashboard/school',
            icon: getIcon('teenyicons:school-outline'),
          }}
          active={match}
        />
        <NavItem
          item={{
            title: 'Question Bank',
            path: '/dashboard/question-bank',
            icon: getIcon('mdi:folder-question-outline'),
          }}
          active={match}
        />
      </List>
    </Box>
  );
}
