var RectFocusable = Class.create({
    id: null, css: null, rectObj: null, getObj: function () {
        return this.rectObj
    }, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.rectObj = fw.cssBuilder.createRect(_id + "_Curs", this.css.style);
            this.focusObj = fw.cssBuilder.createRect(_id + "_Focus", this.css.styleFocusOff);
            this.rectObj.appendChild(this.focusObj)
        } catch (ex) {
        }
    }, focusOn: function () {
        try {
            this.focusObj.setStyle(this.css.styleFocusOn)
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            this.focusObj.setStyle(this.css.styleFocusOff)
        } catch (ex) {
            ex.errMethod =
                "focusOff";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.rectObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.rectObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.rectObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.rectObj.setY(_y)
        } catch (ex) {
            ex.errMethod = "setY";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    },
    setHeight: function (_h) {
        try {
            this.rectObj.setH(_h)
        } catch (ex) {
            ex.errMethod = "setHeight";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }, setWidth: function (_w) {
        try {
            this.rectObj.setW(_w)
        } catch (ex) {
            ex.errMethod = "setWidth";
            ex.errClass = "RectFocusable";
            fw.err(ex)
        }
    }
});
