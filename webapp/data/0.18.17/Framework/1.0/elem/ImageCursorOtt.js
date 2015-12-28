var ImageCursorOtt = Class.create({
    id: null, imgObj: null, x: 0, getObj: function () {
        return this.itemObj
    }, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.itemObj = fw.cssBuilder.createRect(_id, this.css.styleItemCont.style);
            this.itemObj.show();
            if (this.css.styleItemTxt != undefined && (this.css.styleItemTxt.isPresent != undefined && this.css.styleItemTxt.isPresent)) {
                this.txt_wrapper = fw.cssBuilder.createDiv("", this.css.styleItemTxtWrapper.style);
                this.txt_wrapper.style.overflow = "visible";
                this.txt_wrapper.style.position =
                    "relative";
                this.itemObj.appendChild(this.txt_wrapper);
                this.txt = fw.cssBuilder.createText(_id + "_Text", this.css.styleItemTxt.style);
                this.txt.style.position = "inherit";
                this.txt_wrapper.appendChild(this.txt)
            }
            this.cursor = fw.cssBuilder.createRect(_id + "_Curs", this.css.styleItemSelect.style);
            this.itemObj.appendChild(this.cursor);
            this.cursor.hide();
            this.contImg = fw.cssBuilder.createDivImgCont(_id, this.css.styleItemContImg.style);
            this.imgObj = cssUtil.addElementToDom(Image, _id + "_img", this.css.styleItemImg, this.contImg);
            if (this.css.styleItemImg.defaultImgUrl != null && (this.css.styleItemImg.defaultImgUrl != undefined && this.css.styleItemImg.defaultImgUrl != ""))this.imgObj.setUrl(this.css.styleItemImg.defaultImgUrl);
            this.itemObj.appendChild(this.contImg);
            this.itemObj.obj = this;
            this.obj = null
        } catch (ex) {
            ex.errMethod = "Initialize";
            ex.errClass = "ImageCursor";
            fw.err(ex)
        }
    }, hide: function () {
        this.itemObj.hide()
    }, show: function () {
        this.itemObj.show()
    }, setItem: function (_obj, _val1, _val2) {
        this.setDataFromObj(_obj)
    }, setTitle: function (_var) {
    },
    updateLock: function (_obj) {
        try {
            var url = "";
            this.obj = _obj;
            if (this.css.styleItemImg.label == "aanbienders") {
                if (_obj.iconURL != undefined) {
                    this.contImg.className = this.css.styleItemContImg.styleOTT;
                    this.imgObj.getObj().setStyle(this.css.styleItemImg.styleOTT);
                    if (_obj.iconURL != "")url = _obj.iconURL
                }
            } else if (this.css.styleItemImg.label == "tvoyName") {
                if (_obj.iconURL != undefined) {
                    this.contImg.className = this.css.styleItemContImg.styleOTT;
                    this.imgObj.getObj().setStyle(this.css.styleItemImg.styleOTT)
                }
                if (this.css.styleItemTxt !=
                    undefined && (this.css.styleItemTxt.isPresent != undefined && this.css.styleItemTxt.isPresent)) {
                    var txt = "";
                    if (eval("_obj." + this.css.styleItemTxt.label) != undefined && (eval("_obj." + this.css.styleItemTxt.label) != null && eval("_obj." + this.css.styleItemTxt.label) != "")) {
                        fw.log.debug("imageCursor label setting value: label : " + eval("_obj." + this.css.styleItemTxt.label));
                        txt = eval("_obj." + this.css.styleItemTxt.label)
                    } else if (eval("_obj." + this.css.styleItemTxt.label2) != undefined && (eval("_obj." + this.css.styleItemTxt.label2) !=
                        null && eval("_obj." + this.css.styleItemTxt.label2) != "")) {
                        fw.log.debug("imageCursor label setting value: label2 : " + eval("_obj." + this.css.styleItemTxt.label2));
                        txt = eval("_obj." + this.css.styleItemTxt.label2)
                    } else fw.log.debug("imageCursor label setting defaultValue: empty string");
                    this.setTxt(txt)
                }
                if (_obj.iconURL)url = _obj.iconURL; else try {
                    if (eval("this.css.CoverChannelMap._" + _obj.name.toLowerCase().replace(/ /g, "_")) != undefined)url = this.css.styleItemImg.ottGridImgPrefPath + eval("this.css.CoverChannelMap._" +
                            _obj.name.toLowerCase().replace(/ /g, "_")) + this.css.styleItemImg.ottGridImgExt; else url = this.css.styleItemImg.ottGridImgPrefPath + _obj.name.toLowerCase() + this.css.styleItemImg.ottGridImgExt
                } catch (ex) {
                    url = this.css.styleItemImg.ottGridImgPrefPath + _obj.name.toLowerCase() + this.css.styleItemImg.ottGridImgExt
                }
            } else if (eval("_obj." + this.css.styleItemImg.label) != undefined)url = eval("_obj." + this.css.styleItemImg.label);
            this.itemObj.setFillAlpha(0);
            if (url == "" && (this.css.styleItemImg.defaultImgUrl != null && (this.css.styleItemImg.defaultImgUrl !=
                undefined && this.css.styleItemImg.defaultImgUrl != "")))url = this.css.styleItemImg.defaultImgUrl;
            this.imgObj.setUrl(url)
        } catch (ex) {
            ex.errMethod = "updateLock";
            ex.errClass = "ImageCursor";
            fw.err(ex)
        }
    }, setDataObj: function (_index, _obj) {
    }, setDataFromObj: function (_obj) {
        try {
            this.updateLock(_obj)
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "ImageCursor";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        this.txt.setTxt(_txt)
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        if (this.obj != null && this.obj.iconURL)this.cursor.setStyle(this.css.styleItemSelect.styleOTT);
        else this.cursor.setStyle(this.css.styleItemSelect.style);
        this.cursor.show()
    }, focusOff: function () {
        this.cursor.hide()
    }, getX: function () {
        return this.x
    }, getY: function () {
        return this.y
    }, setX: function (_x) {
        this.itemObj.setX(_x);
        this.x = _x
    }, setY: function (_y) {
        this.itemObj.setY(_y);
        this.y = _y
    }, setWidth: function (_w) {
        this.itemObj.setW(_w)
    }, setHeight: function (_h) {
        this.itemObj.setH(_h)
    }, setImageCursorUrl: function (_url) {
        this.imgObj.setUrl(_url)
    }, setUrl: function (_tmp) {
    }
});
