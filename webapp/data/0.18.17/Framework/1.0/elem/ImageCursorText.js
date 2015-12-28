var ImageCursorText = Class.create({
    getObj: function () {
        return this.rectObj
    }, initialize: function (_id, _css) {
        try {
            this.conf = _css;
            this.x = "";
            this.y = "";
            this.id = _id;
            this.type = "ImageCursorText";
            this.rectObj = fw.cssBuilder.createRect(_id, this.conf.styleItemUnSelect.style);
            this.imgObj = fw.cssBuilder.createImg(_id + "img", this.conf.styleItemImg.style, this.conf.styleItemImg);
            this.imgObj.setUrl(this.conf.styleItemImg.defaultImgUrl, this);
            this.rectObj.appendChild(this.imgObj);
            this.textObj = fw.cssBuilder.createTextArea(_id +
                "txt", this.conf.styleItemTxt);
            this.rectObj.appendChild(this.textObj);
            this.rectObj.obj = this;
            this.isSet = false
        } catch (ex) {
            ex.errMethod = "Initialize";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, setDataObj: function (_index, _obj) {
        try {
            if (_obj != null) {
                this.imgObj.setUrl(_obj[_index].url, _this);
                this.textObj.setTxt(_obj[_index].contentTitle)
            }
        } catch (ex) {
            ex.errMethod = "setDataObj";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, hide: function () {
        this.rectObj.hide()
    }, show: function () {
        this.rectObj.show()
    }, setDataFromObj: function (_obj) {
        try {
            var _this =
                this;
            this.imgObj.setUrl(_obj.url, _this);
            $j("#" + this.id + "img").load(function () {
                _this.textObj.setTxt(_obj.contentTitle)
            })
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, verifyIfLocked: function (appObj, _movie) {
        try {
            if (_movie.isLocked != undefined && _movie.isLocked)return true; else if (appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe))return true;
            return false
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, getUrlJpg: function (_obj) {
        try {
            if (_obj ==
                null || _obj.jpeg == undefined)return this.conf.styleItemImg.defaultImgUrl; else if (_obj != null && _obj.jpeg == "")return this.conf.styleItemImg.defaultImgUrl; else if (this.verifyIfLocked(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app, _obj))return this.conf.styleItemImg.lockedUrl;
            return _obj.jpeg
        } catch (ex) {
            ex.errMethod = "getUrlJpg";
            ex.errClass = "ImageCursorText";
            fw.err(ex);
            return ""
        }
    }, getTitle: function (_obj) {
        try {
            if (_obj == null || _obj.title == undefined) {
                this.isSet = false;
                return eval("fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.messages." +
                    this.conf.styleItemTxt.defaultTxt)
            }
            this.isSet = true;
            return _obj.title
        } catch (ex) {
            ex.errMethod = "getTitle";
            ex.errClass = "ImageCursorText";
            fw.err(ex);
            return ""
        }
    }, setItem: function (_obj, _delayTxt, _delayImg) {
        this.setItemInternal(this.getUrlJpg(_obj), this.getTitle(_obj), _delayTxt, _delayImg)
    }, setItemInternal: function (_urlImg, _txt, _delayTxt, _delayImg) {
        try {
            var _this = this;
            if (_urlImg != null)fw.util.setTimeout(function () {
                _this.imgObj.setUrl(_urlImg, _this)
            }, _delayImg);
            if (_txt != null && _delayTxt > 0)fw.util.setTimeout(function () {
                    _this.textObj.setTxt(_txt)
                },
                _delayTxt); else if (_txt != null && _delayTxt == 0)$j("#" + this.id + "img").load(function () {
                _this.textObj.setTxt(_txt)
            })
        } catch (ex) {
            ex.errMethod = "setItem";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, setItemLoadEvent: function (_urlImg, _txt) {
        try {
            var _this = this;
            if (_urlImg != null)_this.imgObj.setUrl(_urlImg, _this);
            $j("#" + this.id + "img").load(function () {
                _this.textObj.setTxt(_txt)
            })
        } catch (ex) {
            ex.errMethod = "setItemLoadEvent";
            ex.errClass = "ImageCursorText";
            fw.err(ex)
        }
    }, getIdImage: function () {
        return "#" + this.id + "img"
    }, setTxt: function (_txt) {
        this.textObj.setTxt(_txt)
    },
    setUrl: function (_url, _this) {
        if (_this == undefined)_this = this;
        _this.imgObj.setUrl(_url)
    }, getY: function () {
        return this.y
    }, getX: function () {
        return this.x
    }, setX: function (_x) {
        this.rectObj.setX(_x);
        this.x = _x
    }, setY: function (_y) {
        this.rectObj.setY(_y);
        this.y = _y
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.rectObj.setStyle(this.conf.styleItemSelect.style)
    }, focusOff: function () {
        this.rectObj.setStyle(this.conf.styleItemUnSelect.style)
    }
});
