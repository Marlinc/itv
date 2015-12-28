var BaseScenario = Class.create({
    initialize: function (_prop) {
        try {
            this.id = _prop.id;
            this.parent = _prop.parent;
            this._scenCntObj = null;
            this._scenObj = null;
            fw.log.info("Creating SCENARIO " + this.id + " in parent " + this.parent)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, getScenObj: function () {
        try {
            return this._scenObj
        } catch (ex) {
            ex.errMethod = "getScenObj";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, getScenCntObj: function () {
        try {
            return this._scenCntObj
        } catch (ex) {
            ex.errMethod = "getScenCntObj";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this._scenCntObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this._scenCntObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, setAlpha: function (_alpha) {
        try {
            this._scenObj.setAlpha(_alpha)
        } catch (ex) {
            ex.errMethod = "setAlpha";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, setModuleKeyHandler: function (_moduleId, _moduleObj) {
        try {
            fw.log.info("Scenario setModuleKeyHandler : set KeyHandler to " +
                _moduleId);
            fw.keys.setHandler(_moduleObj, _moduleObj.keyHandler);
            _moduleObj.enableKeyHandler();
            fw.log.info("Scenario setModuleKeyHandler : set KeyHandler to " + _moduleId + " ok")
        } catch (ex) {
            ex.errMethod = "setModuleKeyHandler";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, enableKeyHandler: function (_evt) {
        try {
        } catch (ex) {
            ex.errMethod = "enableKeyHandler";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
        try {
            this.show()
        } catch (ex) {
            ex.errMethod = "focusGained";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    },
    focusReleased: function (_nextScenario) {
        try {
            this.hide()
        } catch (ex) {
            ex.errMethod = "focusReleased";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }, destroy: function () {
        try {
            fw.log.info("Destroying SCENARIO " + this.id + " in parent " + this.parent);
            fw.util.destroyNode(this._scenCntObj);
            this.id = null;
            this.parent = null;
            this.conf = null;
            this._scenCntObj = null;
            this._scenObj = null
        } catch (ex) {
            ex.errMethod = "destroy";
            ex.errClass = "BaseScenario";
            fw.err(ex)
        }
    }
});
