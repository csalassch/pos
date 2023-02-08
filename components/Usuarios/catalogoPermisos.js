import useTranslation from '@/hooks/useTranslation';

function CatalogoPermisos(router){
    const { t } = useTranslation(router);
    const catalogoPermits=[
        {
            permiso: t('txt_043'),
            tipo: "Artículos",
            id:1
        },
        {
            permiso: t('txt_045'),
            tipo: "Ventas",
            id:2
        },
        { permiso: t('txt_051'), tipo: "Proveedores",id:3 },
        { permiso: t('txt_052'), tipo: "Proveedores",id:4 },
        { permiso: t('txt_053'), tipo: "Ventas" ,id:5},
        { permiso: t('txt_046'), tipo: "Ventas" ,id:6},
        { permiso: t('txt_054'), tipo: "Proveedores" ,id:7},
        { permiso: t('txt_047'),tipo:"Ventas",id:8 },
        { permiso: t('txt_055'),tipo:"Proveedores" ,id:9},
        { permiso:t('txt_056'),tipo:"Administrativo",id:10 },
        { permiso: t('txt_005'),tipo:"Compras",id:11 },
        { permiso: t('txt_057'),tipo:"Administrativo",id:12 },
        { permiso: t('txt_050'),tipo:"Compras",id:13 },
        { permiso: t('txt_048'),tipo:"Ventas",id:14 },
        { permiso: t('txt_044'),tipo:"Artículos",id:15 },
        { permiso: t('txt_058'),tipo:"Administrativo",id:16 },
        { permiso: t('txt_059'),tipo:"Administrativo",id:17 },
        { permiso: t('txt_049'),tipo:"Ventas",id:18 }
    ];
    return catalogoPermits;
} 

export default CatalogoPermisos;


