var CssBuilder = Class.create({
    createDiv: function (_id, _style) {
        try {
            var tempObj = document.createElement("div");
            tempObj.setAttribute("id", _id);
            if (_style != null)tempObj.className = _style;
            tempObj.style.overflow = "hidden";
            tempObj.style.textOverflow = "ellipsis";
            tempObj.style.position = "absolute";
            tempObj.setX = function (_x) {
                this.style.left = _x + "px"
            };
            tempObj.setY = function (_y) {
                this.style.top = _y + "px"
            };
            tempObj.setW = function (_w) {
                this.style.width = _w + "px"
            };
            tempObj.setH = function (_h) {
                this.style.height = _h + "px"
            };
            tempObj.setStyle =
                function (_style) {
                    this.className = _style
                };
            tempObj.setAlpha = function (_alpha) {
                this.style.opacity = _alpha
            };
            tempObj.show = function () {
                this.style.display = "inline"
            };
            tempObj.hide = function () {
                this.style.display = "none"
            };
            return tempObj
        } catch (ex) {
            ex.errMethod = "createDiv";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createDivImgCont: function (_id, _style) {
        try {
            var tempObj = document.createElement("div");
            tempObj.setAttribute("id", _id);
            tempObj.className = _style;
            return tempObj
        } catch (ex) {
            ex.errMethod = "createDivRel";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createDivRel: function (_id, _style) {
        try {
            var tempObj = document.createElement("div");
            tempObj.setAttribute("id", _id);
            tempObj.className = _style;
            tempObj.style.textOverflow = "ellipsis";
            tempObj.style.position = "absolute";
            return tempObj
        } catch (ex) {
            ex.errMethod = "createDivRel";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createLayer: function (_type, _style) {
        try {
            return this.createDiv(null, _style)
        } catch (ex) {
            ex.errMethod = "createLayer";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createScrollableGroup: function (_id, _style) {
        try {
            var tempObj =
                this.createDiv(_id, _style);
            tempObj.id = _id;
            tempObj.style.overflow = "visible";
            return tempObj
        } catch (ex) {
            ex.errMethod = "createScrollableGroup";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createImg: function (_id, _style, _css) {
        try {
            var tempObj = document.createElement("img");
            tempObj.setAttribute("id", _id);
            if (_style != null)tempObj.className = _style;
            tempObj.style.position = "absolute";
            tempObj.callBackFunction = null;
            tempObj.callBackCaller = null;
            tempObj.onerror = function (evt) {
                this.setUrl(fw.conf.CLEAR_IMAGE)
            };
            tempObj.setStyle =
                function (_style) {
                    this.className = _style
                };
            tempObj.getH = function () {
                return $j("#" + tempObj.id).height()
            };
            tempObj.setUrl = function (_url) {
                this.src = _url != "" ? _url : fw.conf.CLEAR_IMAGE
            };
            tempObj.setX = function (_x) {
                this.style.left = _x + "px"
            };
            tempObj.setY = function (_y) {
                this.style.top = _y + "px"
            };
            tempObj.setW = function (_w) {
                this.style.width = _w + "px"
            };
            tempObj.setH = function (_h) {
                this.style.height = _h + "px"
            };
            return tempObj
        } catch (ex) {
            ex.errMethod = "createImg";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createText: function (_id, _style) {
        try {
            var tempObj =
                this.createDiv(_id, _style);
            tempObj.style.wordWrap = "break-word";
            tempObj.setTxt = function (_txt) {
                this.innerHTML = _txt
            };
            tempObj.setTextAlign = function (_align) {
                this.style.textAlign = _align == "middle" ? "center" : "left";
                if (_align == "middle")this.style.marginTop = (parseInt(this.style.height) - parseInt(this.style.fontSize) * 1.5) / 2 + "px"
            };
            return tempObj
        } catch (ex) {
            ex.errMethod = "createText";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createTextArea: function (_id, _style) {
        try {
            var tempObj = this.createDiv(_id, _style.style);
            var contObj =
                this.createScrollableGroup(_id + "ContTxt", _style.style);
            contObj.style.top = _style.startPositionTxt;
            contObj.style.left = 0;
            contObj.style.height = "auto";
            contObj.style.wordWrap = "break-word";
            tempObj.appendChild(contObj);
            if (_style.styleDecor != undefined) {
                var decorBg = this.createDiv(_id + "decor", _style.styleDecor);
                decorBg.style.top = 0;
                decorBg.style.left = 0;
                tempObj.appendChild(decorBg)
            }
            tempObj.setHtmlContent = function (_pageUri) {
                $j("#" + contObj.id).load(_pageUri)
            };
            tempObj.setTxt = function (_txt) {
                contObj.innerHTML = _txt
            };
            tempObj.getDisplayH = function () {
                return tempObj.offsetHeight - _style.startPositionTxt * 2
            };
            tempObj.getContH = function () {
                return contObj.offsetHeight
            };
            tempObj.getNumPag = function () {
                this.totalPage = Math.floor(contObj.offsetHeight / tempObj.offsetHeight);
                if (contObj.offsetHeight % tempObj.offsetHeight > 0)this.totalPage++;
                return this.totalPage
            };
            tempObj.scroll = function (_to, _timeToAnim) {
                contObj.setY(_to)
            };
            return tempObj
        } catch (ex) {
            ex.errMethod = "createTextArea";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }, createRect: function (_id,
                             _style) {
        try {
            var tempObj = this.createDiv(_id, _style);
            tempObj.storedFill = "none";
            tempObj.storedFillAlpha = 1;
            tempObj.setFill = function (_col) {
                this.storedFill = _col;
                this.style.backgroundColor = fw.util.hex2rgb(this.storedFill, this.storedFillAlpha)
            };
            tempObj.setFillGradient = function (_colGradient) {
                this.style.backgroundImage = _colGradient
            };
            tempObj.setFillAlpha = function (_colAlpha) {
                this.storedFillAlpha = _colAlpha;
                this.style.backgroundColor = fw.util.hex2rgb(this.storedFill, this.storedFillAlpha)
            };
            return tempObj
        } catch (ex) {
            ex.errMethod =
                "createRect";
            ex.errClass = "CssBuilder";
            fw.err(ex)
        }
    }
});
