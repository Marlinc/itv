var Image = Class.create({
    id: null, imgObj: null, x: 0, getObj: function () {
        return this.imgObj
    }, initialize: function (_id, _css) {
        this.id = _id;
        this.x = null;
        this.css = _css;
        this.tmpImage = null;
        this.objCaller = null;
        this.isShown = true;
        this.functionCaller = null;
        if (this.css.safeSetUrl != undefined && this.css.safeSetUrl) {
            var _this = this;
            this.tmpImage = fw.cssBuilder.createImg(this.id + "tmp", null);
            this.tmpImage.onload = function () {
                _this.imgObj.setUrl(_this.tmpImage.src);
                if (_this.objCaller != null && _this.functionCaller != null)_this.functionCaller.apply(_this.objCaller,
                    new Array(_this.id, "ok"))
            };
            this.tmpImage.onerror = function () {
                if (_this.css != null && (_this.css != undefined && _this.css.defaultImgUrl != undefined))_this.imgObj.setUrl(_this.css.defaultImgUrl); else _this.imgObj.setUrl("");
                if (_this.objCaller != null && _this.functionCaller != null)_this.functionCaller.apply(_this.objCaller, new Array(_this.id, "error"))
            }
        }
        this.imgObj = fw.cssBuilder.createImg(this.id, _css.style, _css);
        this.imgObj.setUrl("")
    }, setCallBackOnLoad: function (_objCaller, _functionCaller) {
        this.objCaller = _objCaller;
        this.functionCaller = _functionCaller
    }, hideBg: function () {
        this.setHeight(0)
    }, showBg: function () {
        this.setHeight(720)
    }, isImageShown: function () {
        return this.isShown
    }, hide: function () {
        this.isShown = false;
        this.imgObj.hide()
    }, show: function () {
        this.isShown = true;
        this.imgObj.show()
    }, getX: function () {
        return this.x
    }, setX: function (_x) {
        this.imgObj.setX(_x);
        this.x = _x
    }, setY: function (_y) {
        this.imgObj.setY(_y)
    }, setWidth: function (_w) {
        this.imgObj.setW(_w)
    }, setHeight: function (_h) {
        this.imgObj.setH(_h)
    }, setUrl: function (_url) {
        try {
            if (_url !=
                null && (_url != undefined && _url != ""))if (this.tmpImage != null)this.tmpImage.src = _url; else this.imgObj.setUrl(_url); else this.imgObj.setUrl("")
        } catch (ex) {
            ex.errMethod = "setUrl";
            ex.errClass = "Image";
            fw.err(ex)
        }
    }, setStyle: function (_conf) {
        this.imgObj.setStyle(_conf.style)
    }
});
