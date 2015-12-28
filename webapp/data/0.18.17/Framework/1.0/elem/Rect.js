var Rect = Class.create({
    id: null, css: null, rectObj: null, getObj: function () {
        return this.rectObj
    }, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.rectObj = fw.cssBuilder.createRect(_id + "_Curs", this.css.style)
        } catch (ex) {
        }
    }, hide: function () {
        this.rectObj.hide()
    }, show: function () {
        this.rectObj.show()
    }, setX: function (_x) {
        this.rectObj.setX(_x)
    }, setY: function (_y) {
        this.rectObj.setY(_y)
    }, setHeight: function (_h) {
        this.rectObj.setH(_h)
    }, setWidth: function (_w) {
        this.rectObj.setW(_w)
    }
});
