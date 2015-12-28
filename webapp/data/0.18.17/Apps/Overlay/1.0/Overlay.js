Overlay = Class.create(Application, {
    initialize: function ($super, _applicationId, _prop, _confHashParameter, _forPrecache) {
        try {
            $super(_applicationId, _prop, _forPrecache);
            this.confHashParameter = _confHashParameter;
            this.inputObj = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Overlay";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.inputObj = _inputObj;
            var scenarioName = this.inputObj.overlayIdentifier;
            this.loadScenario(scenarioName, true, false, this, _inputObj);
            this.getCurrScenObj().init(this.inputObj);
            this.show()
        } catch (ex) {
            ex.errMethod =
                "init";
            ex.errClass = "Overlay";
            fw.err(ex)
        }
    }
});
