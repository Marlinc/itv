var BaseModule = Class.create({
    getModObj: function () {
        return this._modObj
    }, getModCntObj: function () {
        return this._modCntObj
    }, show: function () {
        this._modCntObj.show()
    }, hide: function () {
        fw.log.info("BaseModule : hiding : " + this.id);
        this._modCntObj.hide()
    }, setAlpha: function (_alpha) {
        this._modObj.setAlpha(_alpha)
    }, initialize: function (_parent, _prop) {
        this.id = _prop.id;
        this.parent = _parent.getScenObj();
        this.conf = null;
        this._modCntObj = null;
        this._modObj = null;
        fw.log.info("Creating MODULE " + this.id + " in parent " + this.parent.id)
    },
    gainFocus: function () {
    }, releaseFocus: function () {
    }, enableKeyHandler: function (_evt) {
    }, destroy: function () {
        try {
            fw.log.info("Destroying MODULE " + this.id + " in parent " + this.parent.id);
            fw.util.destroyNode(this._modCntObj);
            this.id = null;
            this.parent = null;
            this.conf = null;
            this._modCntObj = null;
            this._modObj = null
        } catch (ex) {
            fw.log.error("destroy baseModule: " + ex)
        }
    }
});
