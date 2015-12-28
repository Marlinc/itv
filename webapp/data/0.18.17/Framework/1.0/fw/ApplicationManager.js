ApplicationManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting ApplicationManager");
            var _this = this;
            this.pathUrl = "./Apps/";
            this.htmlApps = new Array;
            this.currentApp = null;
            this.toHistory = true;
            this.noAddToFwBackHistory = false;
            this.isHtmlApplicationShown = false;
            this.toPrecache = null;
            this.inPrecacheState = true;
            this.iconLockContent = null;
            this.lockAutomaticPopup = false;
            this.backGroundCont = $(fw.conf.DOM_PLANE_BACKGROUND);
            this.precacheImagesCont = $(fw.conf.DOM_PLANE_PRECACHEIMAGES);
            this.currentBackGround = -1;
            this.cachedBackGrounds = new Array;
            this.precacheBackGrounds();
            this.precacheImages();
            this.loadIconLockContent();
            this.precacheApps()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, onShownManager: function (_state, _applicationType, _params) {
        try {
            fw.log.debug("onShownManager invoked passing _state:", _state);
            fw.log.debug("onShownManager invoked passing _applicationType:" + _applicationType + ", _params", _params);
            fw.log.debug("onShownManager invoked passing _applicationType:",
                _applicationType);
            fw.log.debug("onShownManager arr", fw.conf.IMLTVOYCategoryID);
            fw.log.debug("onShownManager $j.inArray(_params.categoryId", $j.inArray(_params.categoryId, fw.conf.IMLTVOYCategoryID));
            fw.log.debug("onShownManager _params.categoryId!=undefined", _params.categoryId != undefined);
            if (_applicationType == 6 && (_params.categoryId != undefined && $j.inArray(_params.categoryId, fw.conf.IMLTVOYCategoryID) > -1)) {
                _applicationType = 0;
                _params = {
                    "applicationId": "PG", "inputObj": "Catalogue", "categoryId": _params.categoryId,
                    "action": "IML"
                };
                fw.log.debug("onShownManager IML CASE:" + _applicationType + ", _params", _params)
            }
            var skin = fw.mwManager.getSkinPackageVersion();
            if (fw.appManager.historyHaveToBeCleaned(_state, _applicationType, _params)) {
                fw.log.info("internal application history have to be cleaned");
                fw.navigationHistory.clearHistory();
                fw.appManager.clearScenarioHistoryForAllApps()
            }
            if (_applicationType == eval("fw.mwManager.PluginManagerHTMLApplicationType." + fw.conf.linkApplicationType))if (_params != undefined && (_params != null &&
                (_params.inputObj != undefined && _params.inputObj != null))) {
                var inputData = _params.inputObj.split("_");
                var paramsObj = new Array;
                for (i = 0; i < inputData.length; i++)paramsObj.push(inputData[i]);
                fw.appManager.goToHtmlApp(_params.applicationId, skin, paramsObj, false, false)
            } else {
                if (_state != undefined && (_state != null && (_state.applicationId != undefined && _state.applicationId != null)))fw.appManager.goToHtmlApp(_state.applicationId, skin, _state.inputObj, false, false, true)
            } else if (_state != undefined && (_state != null && (_state.applicationId !=
                undefined && _state.applicationId != null)))fw.appManager.goToHtmlApp(_state.applicationId, skin, _state.inputObj, false, false, true); else {
                var paramsObj = new Array;
                var applicationIdString = fw.mwManager.getApplicationStringFromApplicationId(_applicationType);
                var applicationTypeString = fw.autoUpdate.getApplicationIdFromApplicationType(applicationIdString);
                paramsObj.push(applicationIdString);
                paramsObj.push(_params);
                fw.appManager.goToHtmlApp(applicationTypeString, skin, paramsObj, false, false)
            }
        } catch (ex) {
            ex.errMethod =
                "onShownManager";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, loadIconLockContent: function () {
        try {
            this.iconLockContent = new Image("iconLockContent", fw.conf.lockIconLive);
            $(fw.conf.DOM_PLANE_BANNER).appendChild(this.iconLockContent.getObj());
            this.iconLockContent.setUrl(fw.conf.lockIconLive.url);
            this.iconLockContent.setX(fw.conf.lockIconLive.x);
            this.iconLockContent.setY(fw.conf.lockIconLive.y);
            this.hideIconLockContent()
        } catch (ex) {
            ex.errMethod = "loadIconLockContent";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    },
    hideIconLockContent: function () {
        try {
            this.iconLockContent.hide()
        } catch (ex) {
            ex.errMethod = "hideIconLockContent";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, showIconLockContent: function () {
        try {
            this.iconLockContent.show()
        } catch (ex) {
            ex.errMethod = "showIconLockContent";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, historyHaveToBeCleaned: function (_state, _applicationType, _params) {
        try {
            if (_applicationType != fw.conf.applicationTypeForEmptyHistory[1]) {
                var listOfApplicationType = fw.conf.applicationTypeForEmptyHistory;
                if ((_state == null || (_state == undefined || _state.length == 0)) && (_applicationType != null && (_applicationType != undefined && (listOfApplicationType != null && (listOfApplicationType != undefined && listOfApplicationType.length > 0)))))for (var i = 0; i < listOfApplicationType.length; i++)if (listOfApplicationType[i] == _applicationType)return true
            }
            return false
        } catch (ex) {
            ex.errMethod = "historyHaveToBeCleaned";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, clearScenarioHistoryForAllApps: function () {
        try {
            var listOfHtmlApplications = this.htmlApps;
            if (listOfHtmlApplications != null && listOfHtmlApplications != undefined)for (var htmlApplicationId in listOfHtmlApplications) {
                var htmlApplication = listOfHtmlApplications[htmlApplicationId];
                if (htmlApplication != null && (htmlApplication != undefined && (htmlApplication.app != null && htmlApplication.app != undefined)))htmlApplication.app.clearScenarioHistory()
            }
        } catch (ex) {
            ex.errMethod = "clearScenarioHistoryForAllApps";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getBackgroundPropById: function (_id) {
        try {
            for (var i = 0; i < fw.conf.backgrounds.length; i++)if (_id ==
                fw.conf.backgrounds[i].id)return fw.conf.backgrounds[i];
            return null
        } catch (ex) {
            ex.errMethod = "getBackgroundPropById";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, setBackGroundImage: function (_id) {
        try {
            if (_id != undefined && (_id != null && _id != ""))if (this.currentBackGround != _id)if (this.cachedBackGrounds[_id] === undefined || this.cachedBackGrounds[_id] === null) {
                var propBg = this.getBackgroundPropById(_id);
                if (propBg != null)this.createBackGround(propBg); else fw.log.debug("BackGround + " + _id + " not exist");
                var _this = this;
                $j("#" + _id).load(function () {
                    _this.cachedBackGrounds[_id].showBg();
                    fw.log.debug("INIT current bg : " + _this.currentBackGround);
                    if (_this.currentBackGround != -1)_this.cachedBackGrounds[_this.currentBackGround].hideBg();
                    _this.currentBackGround = _id;
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.actualAppSkin.bg = _id
                })
            } else {
                var _this = this;
                this.cachedBackGrounds[_id].showBg();
                if (_this.currentBackGround != -1)_this.cachedBackGrounds[_this.currentBackGround].hideBg();
                _this.currentBackGround = _id;
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.actualAppSkin.bg =
                    _id
            } else this.cachedBackGrounds[_id].showBg(); else if (this.currentBackGround != -1)this.cachedBackGrounds[this.currentBackGround].hideBg()
        } catch (ex) {
            ex.errMethod = "setBackGroundImage";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getBackgroundForCurrentScenario: function () {
        try {
            var currentAppId = fw.appManager.getCurrentApp();
            if (currentAppId != null && currentAppId != undefined) {
                var currentScenario = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.getCurrScenId();
                if (currentScenario != null && currentScenario !=
                    undefined) {
                    var retBkg = eval("fw.appManager.getAppInfo(currentAppId).app.conf.scenarios." + currentScenario + ".background");
                    return retBkg
                }
            }
            return null
        } catch (ex) {
            ex.errMethod = "getBackgroundForCurrentScenario";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, precacheImages: function () {
        try {
            fw.log.debug(" start precacheImages");
            if (fw.conf.precacheImages.length > 0)for (var i = 0; i < fw.conf.precacheImages.length; i++)if (fw.conf.precacheImages[i].isPrecached === "Y") {
                var image = new Image(fw.conf.precacheImages[i].id, fw.conf.precacheImages[i]);
                image.setUrl(fw.conf.precacheImages[i].url);
                this.precacheImagesCont.appendChild(image.getObj())
            }
        } catch (ex) {
            ex.errMethod = "precacheImages";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, precacheBackGrounds: function () {
        try {
            fw.log.debug(" start precacheBackGrounds");
            if (fw.conf.backgrounds.length > 0)for (var i = 0; i < fw.conf.backgrounds.length; i++)if (fw.conf.backgrounds[i].isPrecached === "Y")this.createBackGround(fw.conf.backgrounds[i])
        } catch (ex) {
            ex.errMethod = "precacheBackGrounds";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, createBackGround: function (_prop) {
        try {
            if (_prop != null) {
                var backGroundImage = new Image(_prop.id, _prop);
                backGroundImage.setUrl(_prop.url);
                backGroundImage.hideBg();
                this.backGroundCont.appendChild(backGroundImage.getObj());
                this.cachedBackGrounds[_prop.id] = backGroundImage
            }
        } catch (ex) {
            ex.errMethod = "createBackGround";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, hideBackGround: function () {
        try {
            this.backGroundCont.hide()
        } catch (ex) {
            ex.errMethod = "hideBackGround";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    },
    showBackGround: function () {
        try {
            this.backGroundCont.show()
        } catch (ex) {
            ex.errMethod = "showBackGround";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, onShowFailedManager: function (_error) {
        fw.log.debug("onShowFailedManager invoked passing _error:", _error);
        switch (_error) {
            case fw.UTC.PluginManager.NetflixNotConfirmed:
                fw.log.debug("onShowFailedManager invoked passing _error: NetflixNotConfirmed");
                fw.mwManager.isNetFlixAcceptedVar = false;
                try {
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.getCurrScenObj().openNetflix()
                } catch (ex) {
                }
                break
        }
    },
    onHideManager: function () {
        fw.log.debug("onHideManager invoked")
    }, precacheApps: function () {
        try {
            this.toPrecache = fw.autoUpdate.getPrecachedAppIds();
            this.goToHtmlApp(this.toPrecache[this.toPrecache.length - 1], "", "", true)
        } catch (ex) {
            ex.errMethod = "precacheApps";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getLayerDom: function (_applicationId) {
        try {
            if (fw.popupManager.isPopupApp(_applicationId))return fw.conf.DOM_PLANE_POPUP; else if (fw.overlayManager.isOverlayApp(_applicationId))return fw.conf.DOM_PLANE_OVERLAY;
            else return fw.conf.DOM_PLANE_CANVAS
        } catch (ex) {
            ex.errMethod = "getLayerDom";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, setFocusElem: function (_elemObj) {
        try {
            if (!fw.popupManager.isPopupApp(this.getCurrentApp()) && (!fw.overlayManager.isOverlayApp(this.getCurrentApp()) && (!fw.popupManager.isPopupApp(this.requestAppId) && (!fw.overlayManager.isOverlayApp(this.requestAppId) && (fw.popupManager.getCurrentPopup() == null && fw.overlayManager.getCurrentOverlay() == null)))))fw.appManager.getAppInfo(this.getCurrentApp()).app.currentFocusElem =
                _elemObj
        } catch (ex) {
            ex.errMethod = "setFocusElem";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, checkFocus: function () {
        try {
            if (fw.popupManager.isPopupApp(this.requestAppId) || fw.overlayManager.isOverlayApp(this.requestAppId))if (this.getAppInfo(this.getCurrentApp()).app != null && this.getAppInfo(this.getCurrentApp()).app.currentFocusElem != -1)setTimeout(function () {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.currentFocusElem.focusOff()
            }, 0)
        } catch (ex) {
            ex.errMethod = "checkFocus";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, goToHtmlApp: function (_applicationId, _skinId, _inputObj, _forPrecache, _fromHtml, _fromBack) {
        try {
            fw.log.debug("_applicationId", _applicationId);
            fw.log.debug("_skinId", _skinId);
            fw.log.debug("_inputObj", _inputObj);
            fw.log.debug("_forPrecache", _forPrecache);
            fw.log.debug("_fromHtml", _fromHtml);
            fw.log.debug("_fromBack", _fromBack);
            if (_skinId == null || _skinId == "")_skinId = "DefaultSkin";
            if (_inputObj == null || _inputObj == undefined)_inputObj = new Object;
            if (_fromBack == null || (_fromBack == undefined || !_fromBack))_inputObj["fromNative"] = !(_fromHtml != null && (_fromHtml != undefined && _fromHtml == true));
            _inputObj.fromBack = _fromBack;
            if (_applicationId != null) {
                this.loadedcssfile = undefined;
                this.loadMultiJsFile = undefined;
                this.requestAppId = _applicationId;
                if (!_forPrecache) {
                    fw.popupManager.closePopups();
                    fw.overlayManager.closeOverlays()
                }
                var appInfo = this.getAppInfo(this.requestAppId);
                if (this.getCurrentApp() != null && (this.getCurrentApp() != this.requestAppId && (!fw.popupManager.isPopupApp(this.requestAppId) && !fw.overlayManager.isOverlayApp(this.requestAppId)))) {
                    fw.log.debug("AppManager - goToHtmlApp --\x3e cleaning " +
                        this.getCurrentApp());
                    this.getAppInfo(this.getCurrentApp()).app.hide();
                    this.getAppInfo(this.getCurrentApp()).app.clean()
                }
                if (this.getCurrentApp() != null && (!fw.popupManager.isPopupApp(this.requestAppId) && !fw.overlayManager.isOverlayApp(this.requestAppId))) {
                    this.getAppInfo(this.getCurrentApp()).app.cleanParentalControl();
                    if ((_fromBack == undefined || _fromBack != undefined && !_fromBack) && (this.getAppInfo(this.getCurrentApp()) != undefined && (this.getAppInfo(this.getCurrentApp()).app != undefined && this.getAppInfo(this.getCurrentApp()).app.getCurrScenObj() !=
                        undefined)))fw.navigationHistory.setItemInputObj(this.getAppInfo(this.getCurrentApp()).app.id, this.getAppInfo(this.getCurrentApp()).app.getCurrScenObj().getCurrentInputObj())
                }
                this.checkFocus();
                var latestVersion = this.getLatestVersion(this.requestAppId);
                this.loadDataSkinApp(latestVersion, _skinId, _inputObj, _forPrecache, _fromBack)
            } else fw.log.debug("ApplicationManager: applicationId is null")
        } catch (ex) {
            ex.errMethod = "goToHtmlApp";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, loadDataSkinApp: function (latestVersion,
                                  _skinId, _inputObj, _forPrecache, _fromBack) {
        try {
            if (this.getAppInfo(this.requestAppId).skin === "" || this.getAppInfo(this.requestAppId).skin != _skinId) {
                fw.log.debug("AppManager - goToHtmlApp --\x3e Update Skin " + this.requestAppId);
                var skinId = this.checkSkin(_skinId, this.requestAppId);
                if (this.getAppInfo(this.requestAppId).skin != "") {
                    cssUrl = this.pathUrl + this.requestAppId + "/" + this.getAppInfo(this.requestAppId).version + "/" + this.getAppInfo(this.requestAppId).skin + "/appstyle.css";
                    cssUtil.removejscssfileJQuery(cssUrl,
                        "css")
                }
                this.newCssUrl = this.pathUrl + this.requestAppId + "/" + latestVersion + "/" + skinId + "/appstyle.css";
                this.loadedcssfile = false;
                this.getAppInfo(this.requestAppId).skin = skinId;
                cssUtil.loadCssJQuery(this.newCssUrl, [_inputObj, latestVersion, _forPrecache, _fromBack], this, this.loadDataJsApp, 0)
            } else {
                fw.log.debug("already loaded css");
                this.loadDataJsApp(null, [_inputObj, latestVersion, _forPrecache, _fromBack], "SUCCESS")
            }
        } catch (ex) {
            ex.errMethod = "loadDataSkinApp";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, loadDataJsApp: function (_result,
                                _data, status) {
        try {
            if (status == "SUCCESS") {
                var _inputObj = _data[0];
                var latestVersion = _data[1];
                var _forPrecache = _data[2];
                var _fromBack = _data[3];
                if (this.getAppInfo(this.requestAppId).version === "" || latestVersion > this.getAppInfo(this.requestAppId).version) {
                    fw.log.debug("AppManager - goToHtmlApp --\x3e Update Version " + this.requestAppId);
                    var jsList = this.getAppInfo(this.requestAppId).jslist;
                    for (i = 0; i < jsList.length; i++) {
                        jsUrl = this.pathUrl + this.requestAppId + "/" + this.getAppInfo(this.requestAppId).version + "/" +
                            jsList[i];
                        cssUtil.removejscssfileJQuery(jsUrl, "js")
                    }
                    newJsListUrl = this.pathUrl + this.requestAppId + "/" + latestVersion + "/";
                    this.loadedMultiJsFile = false;
                    this.getAppInfo(this.requestAppId).version = latestVersion;
                    _res = fw.dataManager.doCallSync("GET", newJsListUrl + "jsListFile.json", true, false);
                    if (_res != null) {
                        this.getAppInfo(this.requestAppId).jslist = _res.jsFileList;
                        cssUtil.loadMultiJsFileForApp(_res.jsFileList, [_inputObj, _forPrecache, _fromBack], this, this.buildAppCallBack, 0)
                    } else this.buildAppCallBack(false,
                        [_inputObj, _forPrecache, _fromBack])
                } else {
                    fw.log.debug("already loaded js files");
                    if (this.loadedcssfile === undefined && this.loadedMultiJsFile === undefined) {
                        fw.log.debug("AppManager - goToHtmlApp - PreLoaded--\x3e Init " + this.requestAppId);
                        if (!fw.popupManager.isPopupApp(this.requestAppId) && !fw.overlayManager.isOverlayApp(this.requestAppId))this.currentApp = this.requestAppId;
                        if (this.getCurrentApp() != null && (!fw.popupManager.isPopupApp(this.requestAppId) && (!fw.overlayManager.isOverlayApp(this.requestAppId) &&
                            (_fromBack == undefined || !_fromBack))))this.getAppInfo(this.getCurrentApp()).app.addToHistory();
                        this.getAppInfo(this.requestAppId).app.init(_inputObj, fw.conf.delayResizeVideo);
                        if ($j("body").css("display") == "none")$j("body").css("display", "");
                        this.requestAppId = -1
                    }
                }
            } else {
                fw.log.error("loadDataJsApp - ERROR LOADING APP " + this.requestAppId);
                this.htmlApps[this.requestAppId] = null;
                if (!this.inPrecacheState)fw.mwManager.openMenu();
                this.precacheControl()
            }
        } catch (ex) {
            ex.errMethod = "loadDataJsApp";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, buildAppCallBack: function (_rest, _inputObj) {
        try {
            if (_rest) {
                this.loadedcssfile = undefined;
                this.loadedMultiJsFile = undefined;
                if (this.getAppInfo(this.requestAppId).app != null) {
                    this.getAppInfo(this.requestAppId).app.hide();
                    this.getAppInfo(this.requestAppId).app.clean();
                    this.getAppInfo(this.requestAppId).app.destroy()
                }
                var urlAppConf = this.pathUrl + this.requestAppId + "/" + this.htmlApps[this.requestAppId].version + "/" + this.htmlApps[this.requestAppId].skin + "/" + this.requestAppId + ".json";
                var _this = this;
                _res = fw.dataManager.doCallSync("GET", urlAppConf, true, false);
                if (_res != null) {
                    eval("this.htmlApps['" + this.requestAppId + "'].app = new " + this.requestAppId + "(_res,'" + this.requestAppId + "','" + _inputObj[0] + "','" + _inputObj[1] + "');");
                    if (!_inputObj[1]) {
                        this.currentApp = this.requestAppId;
                        this.getAppInfo(this.requestAppId).app.currentConfScenId = _inputObj[0][0];
                        this.getAppInfo(this.requestAppId).app.init(_inputObj[0], fw.conf.delayResizeVideoFirstTime);
                        fw.log.debug("AppManager - goToHtmlApp - NoPreLoaded --\x3e Init " +
                            this.requestAppId);
                        if ($j("body").css("display") == "none" && !_inputObj[1])$j("body").css("display", "");
                        if (this.getCurrentApp() != null && (!fw.popupManager.isPopupApp(this.requestAppId) && !fw.overlayManager.isOverlayApp(this.requestAppId)))this.getAppInfo(this.getCurrentApp()).app.addToHistory()
                    }
                } else fw.log.info("impossible to buid app")
            } else {
                fw.log.error("buildAppCallBack - ERROR LOADING APP " + this.requestAppId);
                this.htmlApps[this.requestAppId] = null;
                if (!this.inPrecacheState)fw.mwManager.openMenu()
            }
            this.precacheControl()
        } catch (ex) {
            ex.errMethod =
                "buildAppCallBack";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, precacheControl: function () {
        try {
            if (this.inPrecacheState)if (this.toPrecache.length - 1 > 0) {
                this.toPrecache.pop();
                fw.log.debug("precache: " + this.toPrecache[this.toPrecache.length - 1]);
                this.goToHtmlApp(this.toPrecache[this.toPrecache.length - 1], "", "", true)
            } else {
                fw.log.debug("End precaching apps, invoking preloadFinished mw function");
                this.inPrecacheState = false;
                fw.mwManager.preloadFinished();
                this.requestAppId = -1;
                fw.log.debug("READY")
            }
        } catch (ex) {
            ex.errMethod =
                "precacheControl";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getDefaultCssUrl: function () {
        try {
            return this.newCssUrl
        } catch (ex) {
            ex.errMethod = "getDefaultCssUrl";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getCurrentApp: function () {
        try {
            return this.currentApp
        } catch (ex) {
            ex.errMethod = "getCurrentApp";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getAppInfo: function (_applicationId) {
        try {
            if (this.htmlApps[_applicationId] != undefined && this.htmlApps[_applicationId] != null)return this.htmlApps[_applicationId];
            else {
                this.htmlApps[_applicationId] = new AppInfo(null, "", "", null, new Array);
                return this.htmlApps[_applicationId]
            }
        } catch (ex) {
            ex.errMethod = "getAppInfo";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, checkSkin: function (_skinId, _requestAppId) {
        try {
            if (_skinId === null || (_skinId === undefined || _skinId === "")) {
                var skinToRet = fw.mwManager.getSkinPackageVersion();
                if (skinToRet != null && (skinToRet != undefined && skinToRet != ""))return skinToRet; else if (this.getAppInfo(_requestAppId).skin != "")return this.getAppInfo(_requestAppId).skin;
                else return fw.conf.defaultSkin
            } else return _skinId
        } catch (ex) {
            ex.errMethod = "checkSkin";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, getLatestVersion: function (_applicationId) {
        try {
            return fw.autoUpdate.getAppVersion(_applicationId)
        } catch (ex) {
            ex.errMethod = "getLatestVersion";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }, isHtmlAppActive: function () {
        try {
            return fw.appManager.isHtmlApplicationShown
        } catch (ex) {
            ex.errMethod = "isHtmlAppActive";
            ex.errClass = "ApplicationManager";
            fw.err(ex)
        }
    }
});
AppInfo = Class.create({
    initialize: function (_appObj, _version, _skin, _inputObj, _jslist) {
        try {
            this.app = _appObj;
            this.version = _version;
            this.skin = _skin;
            this.inputObj = _inputObj;
            this.jslist = _jslist
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "AppInfo";
            fw.err(ex)
        }
    }
});
