import * as Icon from 'react-feather';
import useTranslation from '@/hooks/useTranslation';

function SidebarDataClient() {
  const { t } = useTranslation();

  const sidebarMenu = [{
    title: t('txt_108'),
    href: '/views/dashboard',
    id: 1,
    icon: <Icon.Home />,
    collapisble: true,

  },
  {
    title: t('txt_076'),
    href: '/Articulos',
    icon: <Icon.Package />,

    id: 10.3,
    collapisble: true,
    children: [
      {
        title: t('txt_013'),
        href: '/views/Articulos/ColeccionArticulos',
        icon: <Icon.Disc />,
      },
      {
        title: t('txt_025'),
        href: '/views/Articulos/Categorias',
        icon: <Icon.Disc />,
      },
      {
        title: t('txt_104'),
        href: '/views/Articulos/Unidades',
        icon: <Icon.Disc />,
      },

    ],
  },
  {
    title: "Empresas y ubicaciones",
    href: '/views/Ubicaciones/subsidiarias',
    id: 2,
    icon: <Icon.MapPin />,
    collapisble: true,

  },
  {
    title: t('txt_036'),
    href: '/views/Usuarios/usuarios',
    id: 3,
    icon: <Icon.Users />,
    collapisble: true,
    children: [
      {
        title: t('txt_113'),
        href: '/views/Usuarios/usuarios',
        icon: <Icon.User />,
      },
      {
        title: t('txt_040'),
        href: '/views/Usuarios/roles',
        icon: <Icon.Tag />,
      },
      {
        title: t('txt_042'),
        href: '/views/Usuarios/permisos',
        icon: <Icon.Tag />,
      }
    ],

  }];

  return sidebarMenu;
};

export default SidebarDataClient;
