NavigationHistory = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting NavigationHistory Manager");
            this.navigationObjectList = new Array
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, addItem: function (_appId, _inputObj) {
        try {
            _inputObj = {};
            fw.log.debug("Add App to history ----\x3e " + _appId + " - _inputObj --\x3e ", _inputObj);
            var obj = new NavigationHistoryObj(_appId, _inputObj);
            fw.navigationHistory.navigationObjectList.push(obj)
        } catch (ex) {
            ex.errMethod = "addItem";
            ex.errClass =
                "NavigationHistory";
            fw.err(ex)
        }
    }, setItemInputObj: function (_appId, _inputObj) {
        try {
            var item = fw.navigationHistory.navigationObjectList[fw.navigationHistory.navigationObjectList.length - 1];
            if (item != undefined && item.applicationId == _appId)item.inputObj = _inputObj
        } catch (ex) {
            ex.errMethod = "setItemInputObj";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, push: function (_navigationObject) {
        try {
            fw.navigationHistory.navigationObjectList.push(_navigationObject)
        } catch (ex) {
            ex.errMethod = "push";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, pop: function () {
        try {
            return fw.navigationHistory.navigationObjectList.pop()
        } catch (ex) {
            ex.errMethod = "pop";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, replaceTop: function (_navigationObject) {
        try {
            this.pop();
            this.push(_navigationObject)
        } catch (ex) {
            ex.errMethod = "replaceTop";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, clearHistory: function () {
        try {
            fw.log.debug("clearHistory APP");
            fw.navigationHistory.navigationObjectList = null;
            fw.navigationHistory.navigationObjectList = new Array
        } catch (ex) {
            ex.errMethod =
                "clear";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }, back: function () {
        try {
            fw.navigationHistory.navigationObjectList.pop();
            if (fw.navigationHistory.navigationObjectList.length > 0) {
                var navigationObject = fw.navigationHistory.navigationObjectList[fw.navigationHistory.navigationObjectList.length - 1];
                if (fw.appManager.getCurrentApp() != navigationObject.applicationId) {
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.scenariosHistoryPop();
                    fw.appManager.goToHtmlApp(navigationObject.applicationId, "", navigationObject.inputObj,
                        false, true, true)
                } else fw.log.debug("BACK HISTORY STESSA APP")
            } else {
                this.clearHistory();
                fw.appManager.noAddToFwBackHistory = true;
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setForceDestroy();
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.clearScenarioHistory();
                fw.mwManager.goBackInHistory()
            }
        } catch (ex) {
            ex.errMethod = "back";
            ex.errClass = "NavigationHistory";
            fw.err(ex)
        }
    }
});
NavigationHistoryObj = Class.create({
    initialize: function (_appId, _inputObj) {
        try {
            this.applicationId = _appId;
            this.inputObj = _inputObj
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "NavigationHistoryObj";
            fw.err(ex)
        }
    }
});
