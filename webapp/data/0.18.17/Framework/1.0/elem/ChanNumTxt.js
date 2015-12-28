var ChanNumTxt = Class.create({
    id: null, css: null, textObj: null, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.textObj = fw.cssBuilder.createText(_id, this.css.style);
            this.textObj.hide();
            this.text = "";
            this.index = 3;
            this.obj = null;
            this.objCallBack = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.textObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, setCallBack: function (_obj, _objCallBack) {
        try {
            this.obj = _obj;
            this.objCallBack = _objCallBack
        } catch (ex) {
            ex.errMethod = "setCallBack";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            if (this.index > 0) {
                var _this = this;
                this.show();
                this.text = this.text + _txt;
                var txt = "";
                this.index--;
                for (var i = 0; i < this.index; i++)txt = txt + "-";
                txt = txt + this.text;
                this.writeTxt(txt);
                if (this.time != null || this.time != undefined) {
                    clearTimeout(this.time);
                    this.time = null
                }
                this.time = setTimeout(function () {
                    _this.index = 3;
                    _this.hide();
                    if (_this.objCallBack != undefined && (_this.obj != undefined && (_this.objCallBack !=
                        null && _this.obj != null)))_this.objCallBack.apply(_this.obj, new Array(_this.text));
                    _this.text = ""
                }, 3E3)
            } else {
                this.index = 3;
                this.hide();
                this.text = "";
                clearTimeout(this.time);
                this.time = null
            }
        } catch (ex) {
            ex.errMethod = "setTxt";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, writeTxt: function (_txt) {
        try {
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "writeTxt";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.textObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.textObj.show()
        } catch (ex) {
            ex.errMethod =
                "show";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.textObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.textObj.setY(_y)
        } catch (ex) {
            ex.errMethod = "setY";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }, setW: function (_w) {
        try {
            this.textObj.setW(_w)
        } catch (ex) {
            ex.errMethod = "setW";
            ex.errClass = "ChanNumTxt";
            fw.err(ex)
        }
    }
});
