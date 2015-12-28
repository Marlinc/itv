DataManager = Class.create({
    doCallAsync: function (_method, _url, _prop, _callbackObj, _callback, _isJSON, _isXML) {
        if (_method === null || _url === null) {
            console.warn("DataManagerAsync parameter ERROR");
            return
        }
        var _this = this;
        var req = new XMLHttpRequest;
        req.onreadystatechange = function () {
            console.warn("DataManagerAsync " + _url + " : onreadystatechange (" + req.readyState + ")");
            try {
                if (req.readyState == 4) {
                    console.warn("DataManagerAsync " + _url + " : req.readyState == 4");
                    if (req.status == 200) {
                        console.warn("DataManagerAsync " + _url +
                            " : req.status == 200");
                        console.warn("DataManagerAsync OK : " + _url);
                        var res = null;
                        if (_isJSON === false)if (_isXML === true)res = req.responseXML; else res = req.responseText; else eval("res = " + req.responseText);
                        try {
                            if (_callback != null && _callbackObj != null)_callback.apply(_callbackObj, new Array(res, _prop))
                        } catch (ex) {
                        }
                    } else {
                        console.warn("DataManagerAsync " + _url + " : other req.status");
                        console.warn("DataManagerAsync KO : " + _url);
                        try {
                            if (_callback != null && _callbackObj != null)_callback.apply(_callbackObj, new Array(null,
                                _prop))
                        } catch (ex) {
                        }
                    }
                }
            } catch (ex) {
                console.warn("DataManagerAsync ERROR : " + _url + " : " + ex);
                try {
                    if (_callback != null && _callbackObj != null)_callback.apply(_callbackObj, [null, _prop])
                } catch (ex) {
                    console.warn(ex)
                }
            }
        };
        console.warn("DataManagerAsync " + _method + " request : " + _url);
        var _callUrl = _url;
        if (_isJSON === false && req.overrideMimeType !== undefined)req.overrideMimeType("text/xml");
        req.open(_method, _callUrl, true);
        req.send(null)
    }, doCallSyncCallBack: function (_method, _url, _prop, _callbackObj, _callback, _isJSON, _isXML) {
        if (_method ===
            null || _url === null) {
            console.warn("DataManagerSyncCB parameter ERROR");
            return
        }
        var req = new XMLHttpRequest;
        console.warn("DataManagerSync " + _method + " request : " + _url);
        var _callUrl = _url;
        if (_isJSON === false && req.overrideMimeType !== undefined)req.overrideMimeType("text/xml");
        req.open(_method, _callUrl, false);
        req.send(null);
        if (req.status == 200) {
            console.warn("DataManagerSyncCB " + _url + " : req.status == 200");
            console.warn("DataManagerSyncCB OK : " + _url);
            var res = null;
            if (_isJSON === false)if (_isXML === true)res = req.responseXML;
            else res = req.responseText; else eval("res = " + req.responseText);
            try {
                _callback.apply(_callbackObj, new Array(res, _prop))
            } catch (ex) {
                console.warn("DataManagerSyncCB: " + ex)
            }
        } else if (req.status == 404)console.warn("DataManagerSyncCB: 404 - Path Error"); else {
            console.warn("DataManagerSyncCB " + _url + " : other req.status");
            console.warn("DataManagerSyncCB KO : " + _url);
            try {
                _callback.apply(_callbackObj, [null, _prop])
            } catch (ex) {
                console.warn("DataManagerSyncCB " + ex)
            }
        }
    }, doCallVersionData: function (_method, _url, _defaultUrl,
                                    _isJSON, _isXML) {
        if (_method === null || _url === null) {
            console.warn("DataManagerSync parameter ERROR");
            return 0
        }
        var req = new XMLHttpRequest;
        console.warn("DataManagerSync " + _method + " request : " + _url);
        var _callUrl = _url;
        if (_isJSON === false && req.overrideMimeType !== undefined)req.overrideMimeType("text/xml");
        req.open(_method, _callUrl, false);
        req.setRequestHeader("Access-Control-Max-Age", "0");
        req.send(null);
        if (req.status == 200) {
            console.warn("DataManagerSync " + _url + " : req.status == 200");
            console.warn("DataManagerSync OK : " +
                _url);
            var res = null;
            if (_isJSON === false)if (_isXML === true)res = req.responseXML; else res = req.responseText; else eval("res = " + req.responseText);
            try {
                return res
            } catch (ex) {
                console.warn("DataManagerSync: " + ex)
            }
        } else if (req.status == 404) {
            console.warn("DataManagerSync: 404 - Path Error");
            if (_defaultUrl != undefined && fw.dataManager.countReTry < 3) {
                fw.dataManager.countReTry++;
                return fw.dataManager.doCallVersionData("GET", _defaultUrl, _defaultUrl, true, false)
            }
        } else {
            console.warn("DataManagerSync " + _url + " : other req.status");
            console.warn("DataManagerSync KO : " + _url);
            try {
                return null
            } catch (ex) {
                console.warn("DataManagerSync " + ex)
            }
        }
    }, doCallSync: function (_method, _url, _isJSON, _isXML) {
        try {
            if (_method === null || _url === null) {
                console.warn("DataManagerSync parameter ERROR");
                return
            }
            var req = new XMLHttpRequest;
            console.warn("DataManagerSync " + _method + " request : " + _url);
            var _callUrl = _url;
            if (_isJSON === false && req.overrideMimeType !== undefined)req.overrideMimeType("text/xml");
            req.open(_method, _callUrl, false);
            req.send(null);
            if (req.status ==
                200) {
                console.warn("DataManagerSync " + _url + " : req.status == 200");
                console.warn("DataManagerSync OK : " + _url);
                var res = null;
                if (_isJSON === false)if (_isXML === true)res = req.responseXML; else res = req.responseText; else eval("res = " + req.responseText);
                try {
                    return res
                } catch (ex) {
                    console.warn("DataManagerSync: " + ex)
                }
            } else if (req.status == 404)console.warn("DataManagerSync: 404 - Path Error"); else {
                console.warn("DataManagerSync " + _url + " : other req.status");
                console.warn("DataManagerSync KO : " + _url);
                try {
                    return null
                } catch (ex) {
                    console.warn("DataManagerSync " +
                        ex)
                }
            }
        } catch (ex) {
            console.warn("DataManagerSync " + ex)
        }
    }, doCallPost: function (_url, params, _prop, _callbackObj, _callback) {
        var params = params;
        var http = new XMLHttpRequest;
        http.open("POST", _url, false);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                eval("var res = " + http.responseText);
                _callback.apply(_callbackObj,
                    new Array(res, _prop))
            } else _callback.apply(_callbackObj, new Array(null, _prop))
        };
        http.send(params)
    }, doCallAsyncImage: function (_method, _url, _prop) {
        try {
            var url = _url;
            var xhr = getXMLHttpRequest();
            xhr.onreadystatechange = ProcessResponse;
            xhr.open(_method, url, true);
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
            xhr.send(null);
            function getXMLHttpRequest() {
                try {
                    var xhr = null;
                    if (window.XMLHttpRequest || window.ActiveXObject)if (window.ActiveXObject)try {
                        xhr = new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (e) {
                        xhr =
                            new ActiveXObject("Microsoft.XMLHTTP")
                    } else xhr = new XMLHttpRequest; else return null;
                    return xhr
                } catch (ex) {
                    ex.errMethod = "doCallAsyncImg - getXMLHttpRequest()";
                    ex.errClass = "DataManager";
                    fw.err(ex)
                }
            }

            function ProcessResponse() {
                try {
                    if (xhr.readyState == 4)if (xhr.status == 200) {
                        var img = document.getElementById(_prop);
                        if (img)img.src = "data:image/jpeg;base64," + encode64(xhr.responseText)
                    } else {
                        var img = document.getElementById(_prop);
                        if (img)img.src = "./Apps/Common/Resources/Images/1.0/1pixelclear.png"
                    }
                } catch (ex) {
                    ex.errMethod =
                        "doCallAsyncImg - ProcessResponse()";
                    ex.errClass = "DataManager";
                    fw.err(ex)
                }
            }

            function encode64(inputStr) {
                try {
                    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                    var outputStr = "";
                    var i = 0;
                    while (i < inputStr.length) {
                        var byte1 = inputStr.charCodeAt(i++) & 255;
                        var byte2 = inputStr.charCodeAt(i++) & 255;
                        var byte3 = inputStr.charCodeAt(i++) & 255;
                        var enc1 = byte1 >> 2;
                        var enc2 = (byte1 & 3) << 4 | byte2 >> 4;
                        var enc3, enc4;
                        if (isNaN(byte2))enc3 = enc4 = 64; else {
                            enc3 = (byte2 & 15) << 2 | byte3 >> 6;
                            if (isNaN(byte3))enc4 = 64; else enc4 =
                                byte3 & 63
                        }
                        outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4)
                    }
                    return outputStr
                } catch (ex) {
                    ex.errMethod = "doCallAsyncImg - encode64()";
                    ex.errClass = "DataManager";
                    fw.err(ex)
                }
            }
        } catch (ex) {
            ex.errMethod = "doCallAsyncImg - encode64()";
            ex.errClass = "DataManager";
            fw.err(ex)
        }
    }
});
