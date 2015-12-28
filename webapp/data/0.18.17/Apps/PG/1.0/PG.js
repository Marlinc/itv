var PG = Class.create(Application, {
    init: function (_inputObj) {
        try {
            this.restoreSkin(_inputObj);
            this.show();
            if (_inputObj[0] == fw.conf.backLabel) {
                var scenObj = this.navBackScen();
                var scenarioName = scenObj.scenarioId;
                if (scenObj.scenarioInputObj != null)_inputObj = scenObj.scenarioInputObj
            } else var scenarioName = eval("this.conf.catalogScenarioList." + _inputObj[0]);
            var scenarioConf = eval("this.conf." + scenarioName + "Conf");
            fw.mediaManager.resizeVideoLive(scenarioConf);
            this.loadScenario(scenarioName, false, false, this, _inputObj);
            this.getCurrScenObj().init(_inputObj);
            this.forceUpdateParentalControl = false
        } catch (ex) {
            ex.errClass = "PG";
            ex.errMethod = "init";
            fw.err(ex)
        }
    }, onShow: function () {
        this.getCurrScenObj().onShow()
    }, onHide: function () {
        this.getCurrScenObj().onHide()
    }, cleanParentalControl: function () {
        try {
            if (this.PCCatChecked == "Y") {
                this.PCCatChecked = "N";
                this.forceUpdateParentalControl = true
            } else this.forceUpdateParentalControl = false
        } catch (ex) {
            ex.errMethod = "cleanParentalControl";
            ex.errClass = "VodCatalogue";
            fw.err(ex)
        }
    }
});
