import * as Icon from 'react-feather';

const SidebarDataClient = [
  { caption: 'Servicios adquiridos' },
  {
    title: 'Panel Licencias',
    href: '/servicios/PanelLicencias',
    icon: <Icon.Clipboard />,
    id: 10.1,
    collapisble: true,
    children: [
      {
        title: 'Gestion de licencias',
        href: '/servicios/PanelLicenciasAdmin',
        icon: <Icon.Disc />,
      },
      
      {
        title: 'Gestion de productos',
        href: '/servicios/PanelProductosAdmin',
        icon: <Icon.Disc />,
      },
      {
        title: 'Consulta usuarios',
        href: '/servicios/PanelLicencias/ConsultaUsuario',
        icon: <Icon.Disc />,
      },
    ]
  },
 /* {
    title: 'Licencias Cliente',
    href: '/',
    icon: <Icon.Clipboard />,
    id: 30.1,
    collapisble: true,
    children: [
      {
        title: 'Planes',
        href: '/',
        icon: <Icon.Disc />,
      },
      
      {
        title: 'Compras',
        href: '/',
        icon: <Icon.Disc />,
      },
      {
        title: 'Acerca de las licencias',
        href: '/',
        icon: <Icon.Disc />,
      },
    ]
  },*/
  {
    title: 'Artículos',
    href: '/Articulos',
    icon: <Icon.Package />,
    suffix: '4',
    suffixColor: 'bg-success text-dark-white',
    id: 10.3,
    collapisble: true,
    children: [
      {
        title: 'Colección de artículos',
        href: '/servicios/ColeccionArticulos',
        icon: <Icon.Disc />,
      },
      {
        title: 'Categorías',
        href: '/servicios/Categorias',
        icon: <Icon.Disc />,
      },
      {
        title: 'Unidades',
        href: '/servicios/Unidades',
        icon: <Icon.Disc />,
      }
      
    ],
  },
  { caption: 'Bugcarios' },
  {
    title: 'Soporte',
    href: '/tekiio/freebug/bugcarios',
    icon: <Icon.Tool />,
    id: 20.1,
    collapisble: true,
    children: [
      {
        title: 'Gestion personal',
        href: '/Soporte',
        icon: <Icon.Disc />,
      },
      {
        title: 'Gestion Empresa',
        href: '/servicios/PanelLicenciasAdmin',
        icon: <Icon.Disc />,
      }
    ]
  }
  
];

export default SidebarDataClient;
