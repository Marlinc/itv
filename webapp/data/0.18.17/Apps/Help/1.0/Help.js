Help = Class.create(Application, {
    initialize: function ($super, _applicationId, _prop, _confHashParameter, _forPrecache) {
        try {
            $super(_applicationId, _prop, _forPrecache);
            this.confHashParameter = _confHashParameter;
            this.selectedCategoryContent = null;
            this.inputObj = null
        } catch (ex) {
            ex.errClass = "Help";
            ex.errMethod = "initialize";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.inputObj = _inputObj;
            if (this.inputObj[0] == fw.conf.backLabel) {
                var scenObj = this.navBackScen();
                var scenarioName = scenObj.scenarioId
            } else if (this.inputObj[0] !=
                undefined)var scenarioName = eval("this.conf.HelpScenarioList." + this.inputObj[0].toLowerCase());
            var scenarioConf = eval("this.conf." + scenarioName + "Conf");
            fw.mediaManager.resizeVideoLive(scenarioConf);
            this.loadScenario(scenarioName, false, false, this, _inputObj);
            this.getCurrScenObj().init(this.inputObj);
            this.show()
        } catch (ex) {
            ex.errClass = "Help";
            ex.errMethod = "init";
            fw.err(ex)
        }
    }, onHide: function () {
        try {
            this.getCurrScenObj().onHide()
        } catch (ex) {
            ex.errClass = "Help";
            ex.errMethod = "onHide";
            fw.err(ex)
        }
    }
});
