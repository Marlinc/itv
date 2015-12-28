VodCatalogue = Class.create(Application, {
    initialize: function ($super, _applicationId, _prop, _confHashParameter, _forPrecache) {
        $super(_applicationId, _prop, _forPrecache);
        this.PCCatChecked = "N";
        this.allLocked = false;
        this.showOnlyTitles = false;
        this.positionInCategory = 0;
        this.selectedCategoryContent = null;
        this.selectedCategoryContents = null;
        this.selectCategory = 0;
        this.isFocusOnLeftMenu = true;
        this.forceUpdateParentalControl = false
    }, init: function (_inputObj) {
        try {
            if (_inputObj != undefined) {
                this.restoreSkin(_inputObj);
                if (_inputObj[0] !=
                    undefined && _inputObj[0] == fw.conf.backLabel) {
                    var scenObj = this.navBackScen();
                    if (scenObj != null) {
                        var scenarioName = scenObj.scenarioId;
                        if (scenObj.scenarioInputObj != null)_inputObj = scenObj.scenarioInputObj
                    }
                } else if (_inputObj[0] != undefined)var scenarioName = eval("this.conf.catalogScenarioList." + _inputObj[0]);
                if (scenarioName != undefined && scenarioName != null) {
                    var scenarioConf = eval("this.conf." + scenarioName + "Conf");
                    fw.mediaManager.resizeVideoLive(scenarioConf);
                    this.loadScenario(scenarioName, false, false, this, _inputObj);
                    this.getCurrScenObj().init(_inputObj);
                    this.show()
                }
                this.forceUpdateParentalControl = false
            }
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "VodCatalogue";
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
