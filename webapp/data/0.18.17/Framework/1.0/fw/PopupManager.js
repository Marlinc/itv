PopupManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting PopupManager");
            this.currentPopupId = null;
            this.isPopUpShown = false
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    setBackground: function (_popUpId) {
        try {
            var bgObj = eval("fw.conf.backgrounds_popup." + _popUpId);
            if (bgObj != undefined && bgObj.isBackGroundShown == "Y")setTimeout(function () {
                $j("#" + fw.conf.DOM_PLANE_BACKGROUND_POPUP).css("display", "")
            }, 0); else setTimeout(function () {
                $j("#" + fw.conf.DOM_PLANE_BACKGROUND_POPUP).css("display",
                    "none")
            }, 0)
        } catch (ex) {
            ex.errMethod = "setBackground";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    onPopupPluginShowManager: function () {
        try {
            fw.popupManager.hidePopupLayer();
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null && (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem != -1 && (!fw.popupManager.isPopupApp(fw.appManager.getCurrentApp()) && !fw.overlayManager.isOverlayApp(fw.appManager.getCurrentApp()))))setTimeout(function () {
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem.focusOff()
                },
                0)
        } catch (ex) {
            ex.errMethod = "onPopupPluginShowManager";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    onPopupPluginHideManager: function () {
        try {
            if (fw.popupManager.currentPopupId != null)fw.popupManager.showPopupLayer();
            fw.keys.schedUnlock(1);
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null && (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem != -1 && (!fw.popupManager.isPopupApp(fw.appManager.getCurrentApp()) && (!fw.overlayManager.isOverlayApp(fw.appManager.getCurrentApp()) &&
                fw.popupManager.currentPopupId == null))))setTimeout(function () {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem.focusOn()
            }, 0)
        } catch (ex) {
            ex.errMethod = "onPopupPluginHideManager";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    isPopupApp: function (_appId) {
        try {
            return fw.conf.popupAppId === _appId
        } catch (ex) {
            ex.errMethod = "isPopupApp";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    getCurrentPopup: function () {
        try {
            return fw.popupManager.currentPopupId
        } catch (ex) {
            ex.errMethod = "getCurrentPopup";
            ex.errClass =
                "PopupManager";
            fw.err(ex)
        }
    },
    setCurrentPopup: function (_popupId) {
        try {
            fw.popupManager.currentPopupId = _popupId
        } catch (ex) {
            ex.errMethod = "setCurrentPopup";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    showPopupLayer: function () {
        try {
            var _this = this;
            setTimeout(function () {
                $j("#" + fw.conf.DOM_PLANE_POPUP).css("display", "");
                _this.isPopUpShown = true
            }, 0)
        } catch (ex) {
            ex.errMethod = "showPopupLayer";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    isPopUpShownFunc: function () {
        try {
            return this.isPopUpShown
        } catch (ex) {
            ex.errMethod = "isPopUpShown";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    hidePopupLayer: function () {
        try {
            $j("#" + fw.conf.DOM_PLANE_POPUP).css("display", "none");
            this.isPopUpShown = false
        } catch (ex) {
            ex.errMethod = "hidePopupLayer";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    closePopups: function () {
        try {
            this.hidePopupLayer();
            fw.popupManager.currentPopupId = null;
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null)fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setKeyHandler(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.getCurrScenId());
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null && fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem != -1)setTimeout(function () {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem.focusOn()
            }, 0)
        } catch (ex) {
            ex.errMethod = "closePopups";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    showPopup: function (_popupId, _popupDynamicConf, _callerCallbackMethod, _callerCallbackObj) {
        try {
            fw.popupManager.currentPopupId = null;
            fw.popupManager.setBackground(_popupId);
            $j("#" + fw.conf.DOM_PLANE_POPUP).css("display", "none");
            if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null)fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setKeyHandler(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.getCurrScenId());
            var popupIdentifier = eval("fw.conf.popupMapping." + _popupId);
            if (popupIdentifier != undefined) {
                var inputObj = new popupObj(popupIdentifier, _popupDynamicConf, fw.popupManager.popupCallback, fw.popupManager, _callerCallbackObj, _callerCallbackMethod);
                fw.appManager.goToHtmlApp(fw.conf.popupAppId, fw.conf.popupSkinId, inputObj);
                fw.popupManager.currentPopupId = _popupId;
                fw.util.setTimeout(function () {
                    $j("#" + fw.conf.DOM_PLANE_POPUP).css("display", "")
                }, fw.conf.showPopupDelayTimer)
            } else fw.log.info("No popupId (" + _popupId + ") find in configuration file")
        } catch (ex) {
            ex.errMethod = "showPopup";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    showPopupFromInputObj: function (_inputObj) {
        try {
            fw.popupManager.currentPopupId = null;
            setTimeout(function () {
                $j("#" + fw.conf.DOM_PLANE_POPUP).css("display",
                    "none");
                fw.appManager.goToHtmlApp(fw.conf.popupAppId, fw.conf.popupSkinId, _inputObj);
                fw.popupManager.currentPopupId = _inputObj.popupIdentifier;
                fw.util.setTimeout(function () {
                    $j("#" + fw.conf.DOM_PLANE_POPUP).css("display", "")
                }, fw.conf.showPopupDelayTimer)
            }, 1)
        } catch (ex) {
            ex.errMethod = "showPopup";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    popupCallback: function (resultObj, callerCallbackObj, callerCallbackMethod) {
        try {
            this.closePopups();
            if (callerCallbackObj != null && callerCallbackMethod != null)callerCallbackMethod.apply(callerCallbackObj,
                new Array(resultObj))
        } catch (ex) {
            ex.errMethod = "popupCallback";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    },
    buildPopupObj: function (_popupIdentifier, _popupDynamicConf, _popupCallback, _popupManager, _callerCallbackObj, _callerCallbackMethod) {
        try {
            return new popupObj(_popupIdentifier, _popupDynamicConf, _popupCallback, _popupManager, _callerCallbackObj, _callerCallbackMethod)
        } catch (ex) {
            ex.errMethod = "buildPopupObj";
            ex.errClass = "PopupManager";
            fw.err(ex)
        }
    }
});
popupObj = Class.create({
    initialize: function (_popupIdentifier, _popupDynamicConf, _callbackMethod, _callbackObj, _callerCallbackObj, _callerCallbackMethod) {
        try {
            this.popupIdentifier = _popupIdentifier;
            this.callbackMethod = _callbackMethod;
            this.callbackObj = _callbackObj;
            this.callerCallbackObj = _callerCallbackObj;
            this.callerCallbackMethod = _callerCallbackMethod;
            this.popupDynamicConf = _popupDynamicConf
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "popupObj";
            fw.err(ex)
        }
    }
});
