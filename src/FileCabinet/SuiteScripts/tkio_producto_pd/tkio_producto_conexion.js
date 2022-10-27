var HOST_KEY_TOOL_URL = 'https://ursuscode.com/tools/sshkeyscan.php?url=';

/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search', 'N/https', 'N/sftp', 'N/file'],
    /**
 * @param{serverWidget} serverWidget
 */

    (serverWidget, search, https, sftp, file) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */




        function onRequest(scriptContext) {
            try {
                
                let request = scriptContext.request, response = scriptContext.response, params = request.parameters;
                let form = serverWidget.createForm({
                    title: "VUE UI",
                    hideNavBar: true
                });
                log.debug({
                    title: "Suitelet",
                    details: params.content
                });
                
                let html_fld = form.addField({
                    id: 'custpage_html_content',
                    label: 'HTML',
                    type: serverWidget.FieldType.INLINEHTML
                });
                form.addButton({
                    id: "cust_tkio_refresh",
                    label: "Refresh Charts",
                    functionName: 'btn_RefreshData'
                });
                form.clientScriptModulePath = './tkio_producto_cl.js';
                
                let html_content = getHTMLTemplate();
                //html_fld.defaultValue= html_content;
                html_fld.defaultValue = "<script src='https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'></script>";
                html_fld.defaultValue += "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet'"
                    + "integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'>"
                    + "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>"

                    + "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'"
                    + "integrity='sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM'"
                    + "crossorigin='anonymous'></script>"
                    + "  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>"
                    //Fonts
                    +"<link rel='preconnect' href='https://fonts.googleapis.com'>"
                    +"<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>"
                    +"<link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap' rel='stylesheet'>";
                //Begins Container
               

                html_fld.defaultValue += "<div class='container-fluid vh-100' style='margin: 0; padding:0;overflow-x: hidden;'><div class='row vh-100' style='height:100%;overflow-x:hidden' id='firstload' onload:'menu(this)' >"
                    + "<div class='col-md-2 m-0' style='overflow:none;margin:0;'>"
                    + "<div class='weby' style='height: 100%;width:100%;position:relative;left:0px'>"
                    + "<div class='d-flex flex-column flex-shrink-0 p-3 mb-0 mr-0' style='height: 100%;background-color:transparent;'>"
                    + "<div style='text-align: center;'>"
                    + "<a href='/' class='mb-3 mb-md-0 me-md-auto text-decoration-none' style='margin-left: auto;color:#435157;"
                    + "margin-right: auto;display: block;'>"
                    + "<img src='https://2955728.fs1.hubspotusercontent-na1.net/hubfs/2955728/logo-tekiio-2.png' style='margin-right:7px;max-width: 155;max-height: 55;' width='155'"
                    + " height='55' class='d-inline-block align-top' alt=''>"
                    + " </a>"
                    + "<span style='font-size:1.2rem;'>RSI Calculator</span>"
                    + "</div>"

                    + "<hr>"
                    + "<ul style='list-style: none;' class='nav nav-pills flex-column mb-auto'>"
                    + "<li class='nav-item'>"
                    + "<a href='#' style='font-size:1.1rem;color:#435157' id='dashboard' onclick='menu(this)' class='nav-link' aria-current='page'>"
                    + " <i class='fa fa-tachometer' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Dashboard"
                    + "</a>"
                    + "<script>"
                    +"$('#estudiantes_contenido').css('display', 'none');"
                    +"$('#dashboard_contenido').css('display', 'none');"
                    +"document.getElementById('dashboard').click();"
                    +"function menu(e) {"
                    +"var id = e.id;"
                     
                      +"if (id === 'dashboard' || !id || e==2) {"
                        +"$('#dashboard_contenido').css('display', 'block');"
                        +"$('#estudiantes_contenido').css('display', 'none');"
                        
                        //Menu active color change
                        +"$('#dashboard').css('background-color', '#d6d6d6');"
                        +"$('#estudiantes').css('background-color', 'transparent');"
                        
                  
                      +"}"
                      +"if (id === 'estudiantes') {"
                        +"$('#dashboard_contenido').css('display', 'none');"
                        +"$('#estudiantes_contenido').css('display', 'block');"
                        +" $('#estudiantes_contenido').removeAttr('hidden');"
                       
                        //Menu active color change
                        +"$('#dashboard').css('background-color', 'transparent');"
                        +"$('#estudiantes').css('background-color', '#d6d6d6');"
                        
                      +"}"
                   +" }"
                   //Script ends
                   +" </script>"
                    + " </li>"
                    + " <li>"
                    + "<a href='#estudiantes' style='font-size:1.1rem;color:#435157;' id='estudiantes' onclick='menu(this)' class='nav-link'>"
                    + " <i class='fa fa-calculator' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Calcular"
                    + " </a>"
                    + "</li>"
                    
                    + " </ul>"


                    + " </div>"
                    + "</div>"
                    + "<div class='topnav'>"
                    + "<a href='/' class='active'><img src='https://f.hubspotusercontent20.net/hubfs/2955728/logo-tekiio-w-1.png' style='margin-right:7px;' width='50'"
                    + " height='50' class='d-inline-block align-top' alt=''>"
                    + "<span style='font-size:3vw;'>Administración Académica</span></a>"
                    + "<!-- Navigation links (hidden by default) -->"
                    + "<div id='myLinks'>"
                    + " <a href='#' id='dashboard' onclick='menu(this)' class='nav-link text-white' aria-current='page'>"
                    + "<i class='fa fa-tachometer' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + "Dashboard"
                    + " </a>"
                    + "<a href='#estudiantes' id='estudiantes' onclick='menu(this)' class='nav-link text-white'>"
                    + " <i class='fa fa-graduation-cap' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Estudiantes"
                    + "</a>"
                    + "<a href='#materias' id='materias' onclick='menu(this)' class='nav-link text-white'>"
                    + " <i class='fa fa-book' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Materias"
                    + " </a>"
                    + " <a href='#reportes' id='reportes' onclick='menu(this)' class='nav-link text-white'>"
                    + " <i class='fa fa-file-pdf-o' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Reportes"
                    + "</a>"
                    + " <a href='#' id='usuarios_admin' onclick='menu(this)' class='nav-link text-white'>"
                    + " <i class='fa fa-users' aria-hidden='true' style='margin-right: 7px;'></i>"
                    + " Usuarios Admin"
                    + " </a>"
                    + "</div>"
                    + " <!-- 'Hamburger menu' / 'Bar icon' to toggle the navigation links -->"
                    + "<a href='javascript:void(0);' class='icon' onclick='hamburguesa()'"
                    + " style='margin-right: 20px;margin-top:10px;color: #00a094;border-radius: 10px;'>"
                    + " <i class='fa fa-bars'></i>"
                    + " </a>"
                    + " </div>"
                    + " </div>"
                    + "<div class='col-md-10 m-0 p-0' style='border-radius:20px;background-color:#f4f4f4'>"
                    + "<div class='container-fluid text-center' style='position: relative;top:0;max-width: 100%;overflow:none'>"
                    + " <div id='dashboard_contenido' >"
                    +"<div class='row'>"
                    
                    + "<canvas id='myChart'></canvas>"
                   
                    +"</div>"
                    +"<div class='row'>"
                    
                    + "<canvas id='myChart2'></canvas>"
                
                    
                    
                    +"</div>"
                    
                    + " </div>"
                    + "<div class='container-fluid' id='estudiantes_contenido' style='overflow:none' hidden>"
                    + " <div class='row'"
                    + " style='background-color:#F8F8FF; border-radius: 20px;padding: 2px;margin-top: 5px;max-height: 200px;margin-bottom: 7px;'>"
                    + " <h5>Registrar Alumno</h5>"
                    + " <div class='col-md-3 col-sm-2 m-auto'>"
                    + " <input type='hidden' id='claveEstudiante' name='claveEstudiante' required>"
                    + " <label>Matrícula: </label>"
                    + " <input type='text' class='form-control' aria-label='Matricula' name='matricula' id='matricula' required>"

                    + " </div>"
                    + "<div class='col-md-3 col-sm-2 m-auto'>"
                    + " <label>Nombre Completo: </label>"
                    + "<input type='text' class='form-control' aria-label='nombreCompleto' name='nombreCompleto'"
                    + " id='nombreCompleto' required>"
                    + " </div>"
                    + "  <div class='col-md-3 col-sm-2 m-auto'>"
                    + " <label>Correo Electrónico: </label>"
                    + " <input type='email' class='form-control' aria-label='correo' name='correo' id='correo' required>"
                    + " </div>"
                    + "<div class='col-md-3 col-sm-2 m-auto'>"
                    + " <button type='button' id='registra_alumno' class='btn btn-primary hidden'"
                    + "style='margin-top: 10px;'>Añadir</button>"
                    + " </div>"
                    + "</div>"
                    + " <div class='row mt-2'>"
                    + " <div class='table-responsive'>"
                    + " <table class='table table-hover' id='tablaEstudiantes'>"
                    + " <thead>"
                    + "<th>#</th>"
                    + "<th>Matrícula</th>"
                    + " <th>Nombre</th>"
                    + "<th>Correo Electrónico</th>"
                    + "<th>Registró Horario</th>"
                    + "<th>Ver Horario</th>"
                    + "<th>Opciones</th>"
                    + "</thead>"
                    + " <tbody id='tabla_estudiantes'>"
                    + " </tbody>"
                    + "</table>"
                    + " </div>"
                    + " </div>"
                    + " </div>"
                    + " <div id='materias_contenido'>"
                    + " <div id='nombreEstudiante'>"
                    + "</div>"
                    + " <div id='registro'>"
                    + " </div>"
                    
                    

                    + "</div></div>"
                    + "<style>html {"
                    + "height: 100%;"
                    + " }"
                    + " body {"
                    + " min-height: 100%;font-family: 'Poppins', sans-serif;overflow-x: hidden;"
                    + "}"
                    +"body .ext-element-1{overflow:none;}"
                    + " @media (max-width: 780px) {"
                    + ".topnav {"
                    + " display: block;"
                    + " }"
                    + ".weby {"
                    + " display: none;"
                    + " }"

                    + " }"

                    + " @media (min-width: 781px) {"
                    + ".weby {"
                    + "  display: block;"
                    + " }"
                    + " .topnav {"
                    + " display: none;"
                    + "}"
                    +".uir-field-wrapper{margin:0;postion:relative;top:0}"
                    + "}"
                    /* Style the navigation menu */
                    + ".topnav {"
                    + " overflow: hidden;"
                    + " background-color: #333;"
                    + " position: relative;"

                    + "}"

                    /* Hide the links inside the navigation menu (except for logo/home) */
                    + ".topnav #myLinks {"
                    + "display: none;"
                    + "}"

                    /* Style navigation menu links */
                    + ".topnav a {"
                    + " color: white;"
                    + " padding: 14px 16px;"
                    + "text-decoration: none;"
                    + "font-size: 17px;"
                    + " display: block;"
                    + "}"

                    /* Style the hamburger menu */
                    + " .topnav a.icon {"
                    + " background: #4d4f53;"
                    + "display: block;"
                    + "position: absolute;"
                    + "right: 0;"
                    + " top: 0;"
                    + "}"

                    /* Add a grey background color on mouse-over */
                    + " .topnav a:hover {"
                    + " background-color: #ddd;"
                    + "color: black;"
                    + "}"

                    /* Style the active link (or home/logo) */
                    + ".active {"
                    + "background-color: #212428;"
                    + "color: #00a094;"
                    + "}</style>";
                    //Script for showing menu content
                    




                    //-----ends
                    var datan=[8,2,3,4,5,6];
                    
                    if(params.content=="btn"){
                        var data_new=[2,4,3,8,6,9];
                        html_fld.defaultValue+=canvasRender("myChart","600px","300px","line",data_new.toString());
                    }else{
                        html_fld.defaultValue+=canvasRender("myChart","600px","300px","doughnut",datan.toString());
                        html_fld.defaultValue+=canvasRender("myChart2","600px","300px","line",datan.toString());
                    }

                    
                

                response.writePage(form);

            } catch (e) {
                log.error({
                    title: "onRequest",
                    details: e
                });
            }

        }
        const getFileURL = (name) => {
            try {
                let objSearch = search.create({
                    type: 'file',
                    filters: [
                        ['name', search.Operator.IS, name]
                    ],
                    columns: [
                        { name: 'internalid' },
                        { name: 'url' }
                    ]
                });
                let numResults = objSearch.runPaged().count;
                let url_file = '';
                if (numResults) {
                    objSearch.run().each((result) => {
                        url_file = result.getValue({ name: 'url' });
                        return true;
                    });
                }
                return url_file;
            } catch (e) {
                log.error({
                    title: "getFileURL",
                    details: e
                })
            }
        }
        function canvasRender(idCanvas,width,height,type,data){
            
            
            
           var str_response_canvas="<style>"
                    + "canvas{"
                    +"margin: 0 auto;"
                    + "width:"+width+" !important;"
                    + "height:"+height+"!important;"

                    + "}"
                    + ".uir-page-title{display:none;}"
                    + "</style>"
                    + "<script>console.log('data: '+'"+data+"');"
                    + "var ctx = document.getElementById('"+idCanvas+"').getContext('2d');"

                    + "var myChart = new Chart(ctx, {"
                    + "type: '"+type+"',"
                    + "data: {"
                    + "labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],"
                    + " datasets: [{"
                    + " label: '# of Votes',"
                    + "data: ["+data+"],"
                    + "backgroundColor: ["
                    + "'rgba(255, 99, 132, 0.8)',"
                    + "'rgba(54, 162, 235, 0.8)',"
                    + "'rgba(255, 206, 86, 0.8)',"
                    + "'rgba(75, 192, 192, 0.8)',"
                    + "'rgba(153, 102, 255, 0.8)',"
                    + "'rgba(255, 159, 64, 0.8)'"
                    + "],"
                    + "borderColor: ["
                    + "'rgba(255, 99, 132, 1)',"
                    + "'rgba(54, 162, 235, 1)',"
                    + "'rgba(255, 206, 86, 1)',"
                    + "'rgba(75, 192, 192, 1)',"
                    + "'rgba(153, 102, 255, 1)',"
                    + "'rgba(255, 159, 64, 1)'"
                    + "],"
                    + " borderWidth: 2"
                    + "}]"
                    + "},"
                    + "options: {"
                    + "responsive: true,"
                    + "maintainAspectRatio: false,"
                    +"plugins: {"
                        +"legend: {"
                            +"labels: {"
                                // This more specific font property overrides the global property
                                +"font: {"
                                    +"size: 18"
                                +"}"
                            +"}"
                        +"}"
                    +"},"
                    + "scales: {"
                    + " y: {"
                    + "beginAtZero: true"
                    + "}"
                    + "}"
                    + "}"
                    + "});"
                    + "</script>";
                    return str_response_canvas;

        }
        const getHTMLTemplate = () => {
            try {
                let content = '';
                let cssFile = getFileURL('app.2cf79ad6.css');
                let appJSFile = getFileURL('app.8c0bfdbe.js');
                let chunkFile = getFileURL('chunk-vendors.7c049d87.js');

                content += '<!doctype html>'
                    + '<html lang="">'
                    + '<head>'
                    + '<meta charset="utf-8">'
                    + '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
                    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
                    + '<link rel="icon" href="/favicon.ico">'
                    + '<title>vue_rsi</title>'
                    + '<script defer="defer" src="' + chunkFile + '"></script>'
                    + '<script defer="defer" src="' + appJSFile + '"></script>'
                    + ' <link href="' + cssFile + '" rel="stylesheet">'
                    + '</head>'

                    + '<body><noscript><strong>We are sorry but vue_rsi does not work properly without JavaScript enabled. Please enable it to'
                    + 'continue.</strong></noscript>'
                    + '<div id="app"></div>'
                    + '</body>'

                    + '</html>'
                return content;
            } catch (e) {

            }
        }
        return { onRequest }

    });
