Popup = Class.create(Application, {
    initialize: function ($super, _applicationId, _prop, _confHashParameter, _forPrecache) {
        try {
            $super(_applicationId, _prop, _forPrecache);
            this.confHashParameter = _confHashParameter;
            this.inputObj = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Popup";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.inputObj = _inputObj;
            var scenarioName = eval("this.conf.applicationProp.popupScenarioList." + this.inputObj.popupIdentifier);
            fw.log.info("Popup - init : loading Scenario : " + scenarioName);
            this.loadScenario(scenarioName, true, false, this, _inputObj);
            this.getCurrScenObj().init(_inputObj.popupDynamicConf);
            this.show()
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "Popup";
            fw.err(ex)
        }
    }, switchPopup: function (_popupIdentifier, _popupDynamicConf, _callerCallbackMethod, _callerCallbackObj) {
        try {
            var inputObj = fw.popupManager.buildPopupObj(_popupIdentifier, _popupDynamicConf, fw.popupManager.popupCallback, fw.popupManager, _callerCallbackObj, _callerCallbackMethod);
            this.init(inputObj);
            fw.popupManager.setCurrentPopup(_popupIdentifier)
        } catch (ex) {
            ex.errMethod =
                "switchPopup";
            ex.errClass = "Popup";
            fw.err(ex)
        }
    }
});
