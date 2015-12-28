var CssUtil = Class.create({
    loadCssJQuery: function (_path, _prop, _obj, _objCallBack, _timeout) {
        try {
            $j.ajax({
                url: _path, type: "GET", timeout: _timeout, success: function (contents) {
                    fw.log.debug("loadCssJQuery Success");
                    $j('<style type="text/css" id=' + _path + ">" + contents + "</style>").appendTo(document.head);
                    if (_obj != null && _objCallBack != null)_objCallBack.apply(_obj, new Array("loadedcssfile", _prop, "SUCCESS"))
                }, error: function (data) {
                    fw.log.debug("loadCssJQuery Error");
                    _objCallBack.apply(_obj, new Array("loadedcssfile",
                        _prop, "ERROR"))
                }
            })
        } catch (ex) {
            ex.errMethod = "loadCssJQuery";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, loadCss: function (_path, _type) {
        try {
            $j.get(_path, function (contents) {
                $j("<style type= " + _type + " id=" + _path + ">" + contents + "</style>").appendTo(document.head)
            })
        } catch (ex) {
            ex.errMethod = "loadCss";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, changeAttributeDomElement: function (_id, _attributeType, _attributeValue, _noAppend) {
        try {
            document.getElementById(_id).setAttribute(_attributeType, _attributeValue);
            if (_noAppend == undefined)document.head.appendChild(document.getElementById(_id))
        } catch (ex) {
            ex.errMethod =
                "changeAttributeDomElement";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, createjscssfile: function (filename, filetype) {
        try {
            if (filetype == "js") {
                var fileref = document.createElement("script");
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", filename)
            } else if (filetype == "css") {
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename)
            }
            return fileref
        } catch (ex) {
            ex.errMethod = "createjscssfile";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, loadJsFile: function (filename, _obj, _objCallBack) {
        try {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", filename);
            if (_obj != null && _objCallBack != null)script.onreadystatechange = script.onload = function () {
                _objCallBack.apply(_obj, new Array(filename))
            };
            if (typeof script != "undefined")document.getElementsByTagName("head")[0].appendChild(script)
        } catch (ex) {
            ex.errMethod = "loadJsFile";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    },
    loadMultiJsFile: function (ListJs, _prop, _obj, _objCallBack) {
        try {
            this.contFilesLoaded = 0;
            _this = this;
            var dim = ListJs.length;
            for (var i = 0; i < ListJs.length; i++)if (!this.isJsLoaded(ListJs[i])) {
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", ListJs[i]);
                script.onreadystatechange = script.onload = function () {
                    _this.contFilesLoaded++;
                    if (_this.contFilesLoaded == dim) {
                        this.contFilesLoaded = 0;
                        if (_objCallBack != null && _obj != null)_objCallBack.apply(_obj, new Array("loadedMultiJsFile",
                            _prop))
                    }
                };
                if (typeof script != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(script);
                    fw.log.info(script.getAttribute("src") + " Loaded")
                }
            } else dim--
        } catch (ex) {
            ex.errMethod = "loadMultiJsFile";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, loadMultiJsFileForApp: function (ListJs, _prop, _obj, _objCallBack, _timeout) {
        try {
            _this = this;
            if (ListJs.length > 0) {
                var path = ListJs.pop();
                jQuery.ajax({
                    type: "GET",
                    cache: true,
                    url: path,
                    dataType: "script",
                    timeout: _timeout,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        fw.log.debug("loadMultiJsFileForApp - error " +
                            path + " - " + errorThrown);
                        if (_objCallBack != null && _obj != null)_objCallBack.apply(_obj, new Array(false, _prop))
                    },
                    success: function () {
                        fw.log.debug("loadMultiJsFileForApp - success " + path);
                        if (ListJs.length == 0) {
                            if (_objCallBack != null && _obj != null) {
                                fw.log.debug("loadMultiJsFileForApp - CallBack");
                                _objCallBack.apply(_obj, new Array(true, _prop))
                            }
                        } else _this.loadMultiJsFileForApp(ListJs, _prop, _obj, _objCallBack)
                    }
                })
            }
        } catch (ex) {
            ex.errMethod = "loadMultiJsFileForApp";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, loadMultiJsFileForAppAJAX: function (ListJs,
                                            _prop, _obj, _objCallBack) {
        try {
            _this = this;
            if (ListJs.length > 0) {
                var path = ListJs.pop();
                if (!this.isJsLoaded(path))$j.ajax({
                    url: path, type: "HEAD", success: function (contents) {
                        fw.log.debug("loadMultiJsFileForApp - success");
                        var script = document.createElement("script");
                        script.setAttribute("type", "text/javascript");
                        script.setAttribute("src", path);
                        script.onreadystatechange = script.onload = function () {
                            if (ListJs.length == 0) {
                                if (_objCallBack != null && _obj != null) {
                                    fw.log.debug("loadMultiJsFileForApp - CallBack");
                                    _objCallBack.apply(_obj,
                                        new Array("loadedMultiJsFile", _prop))
                                }
                            } else _this.loadMultiJsFileForApp(ListJs, _prop, _obj, _objCallBack)
                        };
                        if (typeof script != "undefined") {
                            document.getElementsByTagName("head")[0].appendChild(script);
                            fw.log.debug(script.getAttribute("src") + " Loaded")
                        }
                    }, error: function (contents) {
                        fw.log.error("loadMultiJsFileForApp - contents")
                    }
                }); else if (ListJs.length == 0) {
                    if (_objCallBack != null && _obj != null) {
                        fw.log.debug("loadMultiJsFileForApp - CallBack");
                        _objCallBack.apply(_obj, new Array("loadedMultiJsFile", _prop))
                    }
                } else this.loadMultiJsFileForApp(ListJs,
                    _prop, _obj, _objCallBack)
            }
        } catch (ex) {
            ex.errMethod = "loadMultiJsFileForApp";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, removejscssfileJQuery: function (filename, filetype) {
        try {
            var targetelement = filetype == "js" ? "script" : filetype == "css" ? "style" : "none";
            var targetattr = filetype == "js" ? "src" : filetype == "css" ? "id" : "none";
            var allsuspects = document.getElementsByTagName(targetelement);
            for (var i = allsuspects.length; i >= 0; i--)if (allsuspects[i] && (allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1))allsuspects[i].parentNode.removeChild(allsuspects[i])
        } catch (ex) {
            ex.errMethod = "removejscssfileJQuery";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, getPropertyStylePx: function (_obj, _property) {
        try {
            var style = window.getComputedStyle(_obj);
            return parseFloat(style.getPropertyValue(_property).split("px")[0])
        } catch (ex) {
            ex.errMethod = "getPropertyStylePx";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, getPropertyStyleChar: function (_obj, _property) {
        try {
            var style = window.getComputedStyle(_obj);
            return style.getPropertyValue(_property)
        } catch (ex) {
            ex.errMethod =
                "getPropertyStyleChar";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, loadjscssfile: function (filename, filetype) {
        try {
            if (filetype == "js") {
                var fileref = document.createElement("script");
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", filename)
            } else if (filetype == "css") {
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename)
            }
            if (typeof fileref != "undefined")document.getElementsByTagName("head")[0].appendChild(fileref)
        } catch (ex) {
            ex.errMethod =
                "loadjscssfile";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, removejscssfile: function (filename, filetype) {
        try {
            var targetelement = filetype == "js" ? "script" : filetype == "css" ? "link" : "none";
            var targetattr = filetype == "js" ? "src" : filetype == "css" ? "href" : "none";
            var allsuspects = document.getElementsByTagName(targetelement);
            for (var i = allsuspects.length; i >= 0; i--)if (allsuspects[i] && (allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1))allsuspects[i].parentNode.removeChild(allsuspects[i])
        } catch (ex) {
            ex.errMethod =
                "removejscssfile";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, isJsLoaded: function (_jsToVerify) {
        try {
            var allsuspects = document.getElementsByTagName("script");
            for (var i = allsuspects.length; i >= 0; i--)if (allsuspects[i] && (allsuspects[i].getAttribute("src") != null && allsuspects[i].getAttribute("src").indexOf(_jsToVerify) != -1))return true;
            return false
        } catch (ex) {
            ex.errMethod = "isJsLoaded";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, replacejscssfile: function (oldfilename, newfilename, filetype) {
        try {
            var targetelement = filetype == "js" ? "script" :
                filetype == "css" ? "link" : "none";
            var targetattr = filetype == "js" ? "src" : filetype == "css" ? "href" : "none";
            var allsuspects = document.getElementsByTagName(targetelement);
            for (var i = allsuspects.length; i >= 0; i--)if (allsuspects[i] && (allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename) != -1)) {
                var newelement = this.createjscssfile(newfilename, filetype);
                allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
            }
        } catch (ex) {
            ex.errMethod = "replacejscssfile";
            ex.errClass =
                "CssUtil";
            fw.err(ex)
        }
    }, addElementToDom: function (_typeElement, _idElement, _confElement, _parentElement) {
        try {
            if (_parentElement != undefined && (_typeElement != undefined && _confElement != undefined)) {
                var elem = new _typeElement(_idElement, _confElement);
                _parentElement.appendChild(elem.getObj());
                return elem
            }
        } catch (ex) {
            ex.errMethod = "addElementToDom";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, addElementRelativeInLineToDom: function (_typeElement, _idElement, _confElement, _parentElement) {
        try {
            var elem = new _typeElement(_idElement,
                _confElement);
            elem.getObj().style.position = "relative";
            elem.getObj().style.display = "inline-block";
            _parentElement.appendChild(elem.getObj());
            return elem
        } catch (ex) {
            ex.errMethod = "addElementRelativeInLineToDom";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, hideRatingElement: function (obj) {
        try {
            if (obj != null) {
                if (obj.fullCanvas != undefined && obj.fullCanvas != null)obj.fullCanvas.style.visibility = "hidden";
                if (obj.hlfCanvas != undefined && obj.hlfCanvas != null)obj.hlfCanvas.style.visibility = "hidden"
            }
        } catch (ex) {
            ex.errMethod = "hideRatingElement";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, showRatingElement: function (obj) {
        try {
            if (obj != null) {
                if (obj.fullCanvas != undefined && obj.fullCanvas != null)obj.fullCanvas.style.visibility = "visible";
                if (obj.hlfCanvas != undefined && obj.hlfCanvas != null)obj.hlfCanvas.style.visibility = "visible"
            }
        } catch (ex) {
            ex.errMethod = "showRatingElement";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, removeRatingElement: function (_parent, obj) {
        try {
            if (obj != null) {
                if (obj.fullCanvas != undefined && obj.fullCanvas != null)_parent.removeChild(obj.fullCanvas);
                if (obj.hlfCanvas !=
                    undefined && obj.hlfCanvas != null)_parent.removeChild(obj.hlfCanvas)
            }
        } catch (ex) {
            ex.errMethod = "removeRatingElement";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, drawRatingElement: function (_parent, _ratValue, _h, _left, _top, _color, _colorHalf, _leftOffset) {
        try {
            var offset = 0;
            if (_leftOffset != undefined)offset = _leftOffset;
            var objReturn = new Object;
            var w = 0;
            if (parseInt(_ratValue) >= 1) {
                var canvas = document.createElement("canvas");
                canvas.id = "canvas_full";
                canvas.height = _h;
                canvas.style.left = _left;
                canvas.style.top = _top;
                canvas.style.textAlign =
                    "left";
                canvas.style.position = "absolute";
                w = (_h / 2 + offset) * parseInt(_ratValue) + _h / 4;
                canvas.width = w;
                if (parseInt(_ratValue) >= 1) {
                    var ctxFull = canvas.getContext("2d");
                    ctxFull.beginPath();
                    for (var i = 0; i < parseInt(_ratValue); i++) {
                        var y = _h / 2;
                        if (i > 0)y = 0;
                        this.drawStar(ctxFull, _h / 2 + offset, y, _h / 4, 5, 0.45)
                    }
                    ctxFull.fillStyle = _color;
                    ctxFull.fill();
                    ctxFull.lineJoin = "miter";
                    ctxFull.stroke();
                    ctxFull.closePath();
                    _parent.appendChild(canvas);
                    objReturn.contextFull = ctxFull;
                    objReturn.fullCanvas = canvas
                }
            }
            if (_ratValue - parseInt(_ratValue) >
                0) {
                var canvas_half = document.createElement("canvas");
                canvas_half.id = "canvas_half";
                canvas_half.height = _h;
                if (w > 0)w = w - _h / 4;
                canvas_half.style.left = _left + w + offset;
                canvas_half.style.top = _top;
                canvas_half.style.position = "absolute";
                var ctxHalf = canvas_half.getContext("2d");
                ctxHalf.beginPath();
                this.drawStar(ctxHalf, _h / 2, _h / 2, _h / 4, 5, 0.45);
                var grd = ctxHalf.createLinearGradient(0, 0, 1, 0);
                grd.addColorStop(0, _color);
                grd.addColorStop(1, _colorHalf);
                ctxHalf.fillStyle = grd;
                ctxHalf.fill();
                ctxHalf.lineJoin = "miter";
                ctxHalf.stroke();
                ctxHalf.closePath();
                _parent.appendChild(canvas_half);
                objReturn.contextHalf = ctxHalf;
                objReturn.hlfCanvas = canvas_half
            }
            return objReturn
        } catch (ex) {
            ex.errMethod = "drawRatingElement";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, drawStar: function (_ctx, _x, _y, _r, _p, _m) {
        try {
            _ctx.translate(_x, _y);
            _ctx.moveTo(0, 0 - _r);
            for (var i = 0; i < _p; i++) {
                _ctx.rotate(Math.PI / _p);
                _ctx.lineTo(0, 0 - _r * _m);
                _ctx.rotate(Math.PI / _p);
                _ctx.lineTo(0, 0 - _r)
            }
        } catch (ex) {
            ex.errMethod = "drawStar";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, changeRatingColor: function (_ctxObj,
                                    _color, _colorHalf) {
        try {
            if (_ctxObj != null) {
                if (_ctxObj.contextFull != undefined) {
                    _ctxObj.contextFull.fillStyle = _color;
                    _ctxObj.contextFull.fill()
                }
                if (_ctxObj.contextHalf != undefined) {
                    var grd = _ctxObj.contextHalf.createLinearGradient(0, 0, 1, 0);
                    grd.addColorStop(0, _color);
                    grd.addColorStop(1, _colorHalf);
                    _ctxObj.contextHalf.fillStyle = grd;
                    _ctxObj.contextHalf.fill()
                }
            }
        } catch (ex) {
            ex.errMethod = "changeRatingColor";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }, drawIconLock: function (_contentId, _left, _top, _width, _height, _heightLock,
                               _fillColor, _lockColor) {
        try {
            var canvas = document.createElement("canvas");
            canvas.id = _contentId;
            canvas.height = _height;
            canvas.width = _width;
            canvas.style.left = _left;
            canvas.style.top = _top;
            canvas.style.position = "absolute";
            var centerX = _height / 2;
            var centerY = _width / 2;
            var radius = parseFloat(_width / 2);
            var wLineArc = 3;
            var yArc = (_height - _heightLock) / 2 + _heightLock / 2;
            var ctx = canvas.getContext("2d");
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.fillStyle = _fillColor;
            ctx.fill();
            ctx.strokeStyle =
                _lockColor;
            ctx.lineWidth = wLineArc;
            ctx.beginPath();
            ctx.arc(centerX, yArc - 3, parseFloat(radius / 3), 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = "transparent";
            ctx.fill();
            ctx.beginPath();
            ctx.rect(centerX - (radius / 3 + wLineArc / 2), yArc - 2, radius / 3 * 2 + wLineArc, 9);
            ctx.lineJoin = "round";
            ctx.closePath();
            ctx.fillStyle = _lockColor;
            ctx.fill();
            return canvas
        } catch (ex) {
            ex.errMethod = "drawIconLock";
            ex.errClass = "CssUtil";
            fw.err(ex)
        }
    }
});
cssUtil = new CssUtil;
