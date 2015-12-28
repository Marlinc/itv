OverlayManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting OverlayManager");
            this.currentOverlayId = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, setBackground: function (_overlayUpId) {
        try {
            var bgObj = eval("fw.conf.backgrounds_overlay." + _overlayUpId);
            if (bgObj != undefined && bgObj.isBackGroundShown == "Y")$j("#" + fw.conf.DOM_PLANE_BACKGROUND_OVERLAY).css("display", ""); else $j("#" + fw.conf.DOM_PLANE_BACKGROUND_OVERLAY).css("display", "none")
        } catch (ex) {
            ex.errMethod =
                "setBackground";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, isOverlayApp: function (_appId) {
        try {
            return fw.conf.overlayAppId === _appId
        } catch (ex) {
            ex.errMethod = "isOverlayApp";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, getCurrentOverlay: function () {
        try {
            return this.currentOverlayId
        } catch (ex) {
            ex.errMethod = "getCurrentOverlay";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, showOverlayLayer: function () {
        try {
            $j("#" + fw.conf.DOM_PLANE_OVERLAY).css("display", "")
        } catch (ex) {
            ex.errMethod = "showOverlayLayer";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, hideOverlayLayer: function () {
        try {
            $j("#" + fw.conf.DOM_PLANE_OVERLAY).css("display", "none")
        } catch (ex) {
            ex.errMethod = "hideOverlayLayer";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, closeOverlays: function () {
        try {
            this.hideOverlayLayer();
            this.currentOverlayId = null;
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null)fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setKeyHandler(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.getCurrScenId());
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app !=
                null && fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem != -1)setTimeout(function () {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem.focusOn()
            }, 0)
        } catch (ex) {
            ex.errMethod = "closeOverlays";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, showOverlay: function (_overlayId, _overlayDynamicConf, _callerCallbackMethod, _callerCallbackObj) {
        try {
            this.closeOverlays();
            var overlayIdentifier = eval("fw.conf.overlayMapping." + _overlayId);
            this.setBackground(_overlayId);
            if (overlayIdentifier !=
                undefined) {
                var inputObj = new OverlayObj(overlayIdentifier, _overlayDynamicConf, fw.overlayManager.overlayCallback, fw.overlayManager, _callerCallbackObj, _callerCallbackMethod);
                fw.appManager.goToHtmlApp(fw.conf.overlayAppId, fw.conf.overlaySkinId, inputObj);
                this.currentOverlayId = _overlayId;
                this.showOverlayLayer()
            } else fw.log.info("No overlayId (" + _overlayId + ") find in configuration file")
        } catch (ex) {
            ex.errMethod = "showOverlay";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }, overlayCallback: function (resultObj, callerCallbackObj,
                                  callerCallbackMethod) {
        try {
            this.closeOverlays();
            if (resultObj != null && (resultObj != undefined && resultObj == fw.conf.optMenuHelpStatus))fw.keys._handleDown({keyCode: fw.keys.code.HELP}); else callerCallbackMethod.apply(callerCallbackObj, new Array(resultObj))
        } catch (ex) {
            ex.errMethod = "overlayCallback";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, showOptionMenu: function (_overlayDynamicConf, _callerCallbackMethod, _callerCallbackObj) {
        try {
            var overlayOptionMenuName = fw.conf.overlayOptionMenuName;
            this.showOverlay(overlayOptionMenuName,
                _overlayDynamicConf, _callerCallbackMethod, _callerCallbackObj)
        } catch (ex) {
            ex.errMethod = "showOptionMenu";
            ex.errClass = "OverlayManager";
            fw.err(ex)
        }
    }
});
OverlayObj = Class.create({
    initialize: function (_overlayIdentifier, _overlayDynamicConf, _callbackMethod, _callbackObj, _callerCallbackObj, _callerCallbackMethod) {
        try {
            this.overlayIdentifier = _overlayIdentifier;
            this.callbackMethod = _callbackMethod;
            this.callbackObj = _callbackObj;
            this.callerCallbackObj = _callerCallbackObj;
            this.callerCallbackMethod = _callerCallbackMethod;
            this.overlayDynamicConf = _overlayDynamicConf
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "OverlayObj";
            fw.err(ex)
        }
    }
});
