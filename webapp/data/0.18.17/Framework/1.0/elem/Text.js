var Text = Class.create({
    id: null, css: null, textObj: null, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.textObj = fw.cssBuilder.createText(_id, this.css.style)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, setStyle: function (_style) {
        try {
            this.textObj.setStyle(_style)
        } catch (ex) {
            ex.errMethod = "setStyle";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.textObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod =
                "setTxt";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.textObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.textObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.textObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.textObj.setY(_y)
        } catch (ex) {
            ex.errMethod = "setY";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }, setW: function (_w) {
        try {
            this.textObj.setW(_w)
        } catch (ex) {
            ex.errMethod =
                "setW";
            ex.errClass = "Text";
            fw.err(ex)
        }
    }
});
