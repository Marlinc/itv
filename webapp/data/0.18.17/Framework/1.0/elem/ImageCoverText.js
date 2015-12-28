var ImageCoverText = Class.create({
    getObj: function () {
        return this.rectObj
    }, initialize: function (_id, _css) {
        try {
            this.conf = _css;
            this.x = "";
            this.y = "";
            this.id = _id;
            this.type = "ImageCoverText";
            this.rectObj = fw.cssBuilder.createRect(_id, this.conf.styleItemUnSelect.style);
            this.defImgObj = fw.cssBuilder.createRect(_id + "defimg", this.conf.styleItemImg.defaultImgStyle);
            this.defImgObj.setFill(this.conf.styleItemImg.defaultImgFill);
            this.defImgObj.setFillAlpha(this.conf.styleItemImg.defaultImgFillAlpha);
            this.rectObj.appendChild(this.defImgObj);
            this.lockObj = null;
            this.imgObj = cssUtil.addElementToDom(Image, this.id + "img", this.conf.styleItemImg, this.rectObj);
            this.imgObj.setHeight(0);
            this.imgObj.setWidth(this.conf.styleItemImg.width);
            this.imgObj.setY(this.conf.styleItemImg.top);
            this.imgObj.setX(this.conf.styleItemImg.left);
            this.textObj = fw.cssBuilder.createText(_id + "txt", this.conf.styleItemTxt.styleFocusOff);
            this.rectObj.appendChild(this.textObj);
            this.rectObj.obj = this;
            this.isSet = false;
            this.posterLoaded = false
        } catch (ex) {
            ex.errMethod = "Initialize";
            ex.errClass = "ImageCoverText";
            fw.err(ex)
        }
    }, hide: function () {
        this.rectObj.hide()
    }, show: function () {
        this.rectObj.show()
    }, verifyIfLocked: function (appObj, _isLocked, _isPCSafe) {
        try {
            if (_isLocked != undefined && _isLocked)return true; else if (appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_isPCSafe))return true
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ImageCoverText";
            fw.err(ex)
        }
        return false
    }, setTitle: function (_movie) {
        try {
            var title = _movie.title;
            if (_movie == null || _movie.blockId != undefined && _movie.blockId != -1)title = eval("fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.messages." + this.conf.styleItemTxt.defaultTxt); else this.isSet = true;
            this.setTxt(title)
        } catch (ex) {
            ex.errMethod = "setTitle";
            ex.errClass = "ImageCoverText";
            fw.err(ex)
        }
    }, updateLock: function (_movie) {
        try {
            if ((_movie.blockId == -1 || _movie.blockId == undefined) && this.verifyIfLocked(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app, _movie.isLocked, _movie.isPCSafe)) {
                if (this.lockObj == null && this.conf.styleItemLock != undefined) {
                    this.lockObj =
                        cssUtil.addElementToDom(Image, "lock", this.conf.styleItemLock, this.rectObj);
                    this.lockObj.setUrl(this.conf.styleItemLock.url)
                }
                this.setUrl(null);
                return true
            } else if (this.lockObj != null) {
                this.rectObj.removeChild(this.lockObj.getObj());
                this.lockObj = null
            }
        } catch (ex) {
            ex.errMethod = "updateLock";
            ex.errClass = "ImageCoverText";
            fw.err(ex)
        }
        return false
    }, setTxt: function (_txt) {
        this.textObj.setTxt(_txt)
    }, setUrl: function (_movie) {
        try {
            if (_movie != null && ((_movie.blockId == -1 || _movie.blockId == undefined) && !this.verifyIfLocked(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app,
                    _movie.isLocked, _movie.isPCSafe))) {
                if (!this.posterLoaded) {
                    this.imgObj.setUrl(_movie.jpeg);
                    this.imgObj.setHeight(this.conf.styleItemImg.height);
                    this.posterLoaded = true
                }
                return true
            } else if (this.posterLoaded) {
                this.imgObj.setHeight(0);
                this.posterLoaded = false
            }
        } catch (ex) {
            ex.errMethod = "setUrl";
            ex.errClass = "ImageCoverText";
            fw.err(ex)
        }
        return false
    }, getY: function () {
        return this.y
    }, getX: function () {
        return this.x
    }, setX: function (_x) {
        this.rectObj.setX(_x);
        this.x = _x
    }, setY: function (_y) {
        this.rectObj.setY(_y);
        this.y =
            _y
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.rectObj.setStyle(this.conf.styleItemSelect.style);
        this.textObj.setStyle(this.conf.styleItemTxt.styleFocusOn)
    }, focusOff: function () {
        this.rectObj.setStyle(this.conf.styleItemUnSelect.style);
        this.textObj.setStyle(this.conf.styleItemTxt.styleFocusOff)
    }
});
