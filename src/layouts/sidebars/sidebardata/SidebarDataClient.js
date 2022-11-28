import * as Icon from 'react-feather';

const SidebarDataClient = [
  // { caption: 'Servicios' },
  // {
  //   title: 'Licencias',
  //   href: '/servicios/PanelLicencias',
  //   icon: <Icon.Clipboard />,
  //   id: 10.1,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Versiones',
  //       href: '/servicios/PanelLicenciasAdmin',
  //       icon: <Icon.Disc />,
  //     },
      
  //     {
  //       title: 'Productos',
  //       href: '/servicios/PanelProductosAdmin',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Usuarios',
  //       href: '/servicios/PanelLicencias/ConsultaUsuario',
  //       icon: <Icon.Disc />,
  //     },
  //   ]
  // },
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
    
    id: 10.3,
    collapisble: true,
    children: [
      {
        title: 'Colección de artículos',
        href: '/Articulos/ColeccionArticulos',
        icon: <Icon.Disc />,
      },
      {
        title: 'Categorías',
        href: '/Articulos/Categorias',
        icon: <Icon.Disc />,
      },
      {
        title: 'Unidades',
        href: '/Articulos/Unidades',
        icon: <Icon.Disc />,
      }
      
    ],
  },
  // { caption: 'Bugcarios' },
  // {
  //   title: 'Soporte',
  //   href: '/tekiio/freebug/bugcarios',
  //   icon: <Icon.Tool />,
  //   id: 20.1,
  //   collapisble: true,
  //   children: [
  //     {
  //       title: 'Gestion personal',
  //       href: '/Soporte',
  //       icon: <Icon.Disc />,
  //     },
  //     {
  //       title: 'Gestion Empresa',
  //       href: '/servicios/PanelLicenciasAdmin',
  //       icon: <Icon.Disc />,
  //     }
  //   ]
  // }
  
];

export default SidebarDataClient;
