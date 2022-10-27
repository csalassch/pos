/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/record', 'N/runtime', 'N/search', 'N/file', 'N/sftp', 'N/format','N/log','N/crypto','N/encode'],(record, runtime, search, file, sftp, format,log,crypto,encode) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */
         function getConnectionParams(conexion) {
            var connection_rsi_responseObj = {};
            var search_conection = search.create({
                type: "customrecord_tkio_rsi_sftp_cred",
                filters:
                    [
                        ["internalid", search.Operator.ANYOF, conexion]
                    ],
                columns:
                    [
                        search.createColumn({ name: "custrecord_tkio_url_sftp_rsi", label: "URL" }),
                        search.createColumn({ name: "custrecord_tkio_port_sftp", label: "Puerto" }),
                        search.createColumn({ name: "custrecord_tkio_user_rsi_sftp", label: "Usuario" }),
                        search.createColumn({ name: "custrecord_tkio_pass_rsi_sftp", label: "Contraseña" }),
                        search.createColumn({ name: "custrecord_tkio_key_rsi_sftp", label: "Hostkey" }),
                        search.createColumn({ name: "custrecord_tkio_hostkey_rsi_sftp", label: "Keyid" }),
                        search.createColumn({ name: "custrecord_tkio_folder_rsi_sftp" }),
                    ]
            });
            var ejecutar_search_conection = search_conection.run();
            var resultado_conection = ejecutar_search_conection.getRange(0, 1);
            log.debug("resultado_conection", resultado_conection);
            if (resultado_conection) {
                var url = resultado_conection[0].getValue({ name: 'custrecord_tkio_url_sftp_rsi' });
                var port = resultado_conection[0].getValue({ name: 'custrecord_tkio_port_sftp' });
                var user = resultado_conection[0].getValue({ name: 'custrecord_tkio_user_rsi_sftp' });
                var password = resultado_conection[0].getValue({ name: 'custrecord_tkio_pass_rsi_sftp' });
                //var hostkey = resultado_conection[0].getValue({ name: 'custrecord_tkio_key_rsi_sftp' });
                var keyid = resultado_conection[0].getValue({ name: 'custrecord_tkio_hostkey_rsi_sftp' });
                var folder = resultado_conection[0].getValue({ name: 'custrecord_tkio_folder_rsi_sftp' });
                log.debug('url', url);
                log.debug('port', port);
                log.debug('user', user);
                log.debug('password', password);
                log.debug('hostkey', keyid);
                //log.debug('keyid', keyid);
                log.debug('folder', folder);
            }
            connection_rsi_responseObj.url=url;
            connection_rsi_responseObj.folder = folder;
            connection_rsi_responseObj.myuser = user;
            connection_rsi_responseObj.myPwdGuid = password;
            connection_rsi_responseObj.myHostKey = keyid;
            connection_rsi_responseObj.port=port;
            return connection_rsi_responseObj;
        }
        const getInputData = (inputContext) => {
            try{
                log.debug({
                    title: "GetInputData",
                    details: "GetInputData Initialized"
                });
                var runSearchConfigFunction = savedSearchConfiguration();
                var resultSearch = runSearchConfigFunction.getRange(0, 100);
                log.debug({
                    title: "runSearchConfigFunction",
                    details: runSearchConfigFunction
                });
                log.debug({
                    title: "resultSearch",
                    details: resultSearch
                });
                if (resultSearch) {
                    // var tipo_archivo = resultSearch[0].getText({ name: 'custrecord_efx_gl_set_file_type' });
                    // var id_carpeta = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_folder_id' });
                    // var enviar = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_send' });
                    var conexion = resultSearch[0].getValue({ name: 'custrecord_tkio_rsi_conf_connection' });
                    // var cabecera = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_cabecera' });
                    // var cabecerafija = resultSearch[0].getValue({
                    //     name: "custrecord_efx_gl_static_header",
                    //     label: "Cabecera fija"
                    // });
                    // var nombre_archivo = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_name' });
                    // var busqueda_guardada = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_search' });
                    // var busqueda_guardada_scriptid = resultSearch[0].getValue({
                    //     name: "custrecord_efx_gl_savedsearch_id",
                    //     join: "custrecord_efx_gl_set_search",
                    //     label: "Búsqueda Guardada"
                    // });
                    // var separador = resultSearch[0].getValue({ name: 'custrecord_efx_gl_set_separator' });
                    // var exportado = resultSearch[0].getValue({ name: "custrecord_efx_set_sent" });
                    // if (separador == 'TAB') {
                    //     separador = '\t'
                    // }
                    // if (separador == 'SPACE') {
                    //     separador = '\s';
                    // }
                }
                var connection_response_rsi_obj = getConnectionParams(conexion);
                var folder = connection_response_rsi_obj.folder;
                var myuser = connection_response_rsi_obj.myuser;
                var url=connection_response_rsi_obj.url;
                var port=connection_response_rsi_obj.port;
                var myPwdGuid = connection_response_rsi_obj.myPwdGuid;
                var myHostKey = connection_response_rsi_obj.myHostKey;
                var file_name ='testConnection3.txt';
                var text="Connection Test successful 3";
                var fileObj = file.create({
                        name: file_name,
                        fileType: file.Type.PLAINTEXT,
                        contents: text
                    });
                //Establishing a connection to remote SFTP server

                //var sent = sftp_connection(url,myPwdGuid,port,myuser, myHostKey, file_name, fileObj, folder);
                var xhostkey4_test_other="AAAAB3NzaC1yc2EAAAADAQABAAABAQC/OU5g5V2309b0nnwegTpRBxgMSIOLERScSSb9AoLYk+U0wkdsi+F3GrJu17ohbyEandaNR+pHpLmWoolpkFbXzNDF27r9bwKXPHbblJWm16oYYL9Y5CT6Lc98U3zHXfXEY/OhU5/Ws0qoyITe2J0pUqwOQYwjK7krenTwvxxUXCDo9VaqPraPY6EpJvx9Ci4KFFTCj/SEDu0QVkCs/1oas1tgxvWrfIQVDc4QJR6Z/u45wFkmgPFU7G4KCsBoPODGPB/Jm/ofPClvwxGJezhy9E9RoXOKkEPdnJCrObyKaz/nhRulmz2jO2+Z49e7FmD1qUM649lEMnh5x7FpPlgX";
                var xhostkey6=" AAAAB3NzaC1yc2EAAAADAQABAAABAQDkkQbdj2G6MkbDPh1I8Q5/kfnFBwLon4ICogIDZblufYUcWWodE19ulFXyWBR+bmGkZ0DrikgyiMeHFoBN81ZdfB4q7xFBy2A/4zX2TqLPUlzIl28AEyyunBBXj0RqjsnpL6SIuTDIQVr8G7WqRiVy6sJoABZYw4nluokOV82/rBmanuIGPHUb+r1pH+n7WaqJ1ARtSX3okaLsBZrZEPIXk72OUNSmodHP77aCCcEasOlqf3sLp/S4ZHDttJwLFFeCOM4jCUyGpe7EBOJRXJmo+dpzJhavRHohR2mKI2UWF6GCf/kEW2VYmDg8ySmgs3CT+KVBAzPCUpujnB7pPTSn";
                    var url2_test_other="s-6fc353a03de44f41b.server.transfer.us-east-2.amazonaws.com";
                    var url3="s-96f2a535231940cba.server.transfer.ap-northeast-1.amazonaws.com";
                var connection = sftp.createConnection({
                    username: 'tekiio',
                    keyId:'custkey_tkio_sftp',
                    url: url3,
                    port: 22,
                   // hostKey: xhostkey6,
                    hostKey: xhostkey6,
                    hostKeyType: 'rsa',
                    
                    
                });
                log.debug({
                    title: "SFTP",
                    details: "Successful"
                });
                var sent = false;
                var details = "";
                try {
                    connection.upload({

                        directory: '/',
                    
                        filename: file_name,
                    
                        file: fileObj,
                    
                        replaceExisting: true
                    
                    });
                    sent = true;
                    details = "Se ha enviado correctamente.";
                } catch (e) {
                    log.error("connection", e);
                    sent = false;
                    details = e.message;
                }
                log.debug({
                    title: "Subir archivo",
                    details: details+" - "+sent
                });
                var downloadedFile = connection.download({

                    directory: '/',
                
                    filename: 'testConnection2.txt'
                
                });
                downloadedFile.folder = -15;
                var fileId = downloadedFile.save();
                log.debug({
                    title: "Path of downloaded file",
                    details: downloadedFile.path
                })
                let objConnection = connection.list({

                    path: '/'
                
                });
                log.debug({
                    title: "objConnection list",
                    details: objConnection
                });
            }catch(e){
                log.error({
                    title: "GetInputData",
                    details: e
                });
            }

        }

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (mapContext) => {
            try{
                log.debug({
                    title: "map",
                    details: "Map Initialized"
                })
            }catch(e){
                log.error({
                    title: "map",
                    details: e
                });
            }

        }

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {
            try{
                log.debug({
                    title: "Reduce",
                    details: "Reduce Initialized"
                });
            }catch(e){
                log.error({
                    title: "reduce",
                    details: e
                });
            }

        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
         function savedSearchConfiguration() {
            try {
                var config = runtime.getCurrentScript().getParameter({ name: 'custscript_tkio_rsi_mr_config' });
                log.debug({
                    title: "config",
                    details: config
                });
                    var searchConfig = search.create({
                        type: "customrecord_tkio_rsi_sftp_config",
                        filters: [],
                        columns:
                            [
                                // search.createColumn({ name: "custrecord_efx_gl_set_separator", label: "Separador" }),
                                // search.createColumn({ name: "custrecord_efx_gl_conf_group" }),
                                // search.createColumn({ name: "custrecord_efx_set_include_group" }),
                                // search.createColumn({ name: "custrecord_efx_gl_promotions_customer" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_company", label: "Empresa" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_order", label: "Orden" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_file_type", label: "Tipo de archivo" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_save", label: "Guardar" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_folder_id", label: "ID de carpeta" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_send", label: "Enviar" }),
                                search.createColumn({ name: "custrecord_tkio_rsi_conf_connection", label: "Configuración de conexión" }),
                                // search.createColumn({ name: "custrecord_efx_gl_static_header", label: "g fija" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_cabecera", label: "Incluir cabecera" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_name", label: "Nombre del archivo" }),
                                // search.createColumn({
                                //     name: "custrecord_efx_gl_savedsearch_id",
                                //     join: "custrecord_efx_gl_set_search",
                                //     label: "Búsqueda Guardada"
                                // }),
                                // search.createColumn({ name: "custrecord_efx_set_sent", label: "Exportado" }),
                                // search.createColumn({ name: "custrecord_efx_gl_set_layout_bank", label: "Layout Bancario" }),
                            ]
                    });
                
                var runSearchConfig = searchConfig.run();
                
                return runSearchConfig;
            } catch (e) {
                log.error({
                    title: "savedSearchCOnfiguration",
                    details: e
                });
                return null;
            }
        }
        const summarize = (summaryContext) => {
          
        }
        function sftp_connection(url,passwordGuid,port,myuser, myHostKey, file_name, fileObj, folder) {
            var sent = false;
            var details = "";
            log.debug({
                title: "hostKey",
                details: myHostKey
            })
            var xhostkey2="ssh-rsa 3072 SHA256:lFmo3SxLZSYRIOFL7kutKRmjZWcPpTgiQpxFXRnAOlg";
            var xhostkey3="ssh-ed25519 255 qjejUUUPrlYUYxef7LyEVIEg9w+L9nYl0GuMZz3MriQ";
            var xhostkey4="AAAAC3NzaC1lZDI1NTE5AAAAIIHSev8+GYNRN7lRs+ZqKy2PVm8WrxRCsEn0gTnjsvAp";
            var xhostkey="AAAAB3NzaC1yc2EAAAADAQABAAABgQDf60ZNAFP18d/ZmxPPfZzQk1R/c1oKXIT3euXhPnBtQRFXN0KOUzvmZpxWdfzn0pRBBsb3cUQUpjPcXsgUwcR/smeqja221Fcwv+244vqqItw1GxcqnrW9AT+oemrr+BJ9Yk4Lk3ljTTiv4gsLRu/LPmEUJcykftgNllhELfuYp4Zc2QNNASJW0gYJV9Hxagngpm8IlvEbKrNEyApmfE9KniaQb70fX1Ji/C/XrNBE5xC960gqO9CssZBDF0IqCeCMrn+v3+A6y1yUs26jvmnFgg/9NdsMFbbmZlXUujOh5wD7uqTNMV83WCod4S0XFlrbzWlcYXMtxdkw8/zioCcZnm4PpLiqvW+uupsDzpjhUd7hKnnbphp0aq3p1gYMLl+OPUlii7R/qk99aT7IlmOxjzTTH0ccdwEYi9bqhGIazRvGLSEr3UlTqSD3rR1DIlF3MBxaVdf8xg1kmNPebcB71CvSBfkjIVG2n1Ta0Q9L2YbsrWApAf3IXNE5za/xpzs=";
            try {
                var connection = sftp.createConnection({
                    username: 'tekkio',
                    keyId:'custkeytekio_sftp_rsi',
                    url: "sftp.rightsizedinventory.com",
                    port: 22,
                    hostKey: xhostkey4,
                    directory:'tekkio/'
                    
                });
                log.debug({
                    title: "Inside SFTP_CONNECTION",
                    details: "connection"
                })
                return true;
                try {
                    var connectionparams = {
                        filename: file_name,
                        file: fileObj,
                        replaceExisting: true
                    };
                    if (folder) {
                        connectionparams['directory'] = folder;
                    }
                    connection.upload(connectionparams);
                    sent = true;
                    details = "Se ha enviado correctamente.";
                } catch (e) {
                    log.error("connection", e);
                    sent = false;
                    details = e.message;
                }
                return sent;
            } catch (e) {
                log.error({
                    title: "sftp_connection",
                    details: e
                });
            }
            return sent;
        }

        return {getInputData, map, reduce, summarize}

    });
