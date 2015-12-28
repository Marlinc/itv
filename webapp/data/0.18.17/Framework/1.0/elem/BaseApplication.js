var BaseApplication = Class.create({
    initialize: function (_prop, _applicationId) {
        try {
            this.conf = _prop;
            this.id = _applicationId;
            this.parent = fw.appManager.getLayerDom(this.id);
            this._appObj = null;
            this.cachedScenarios = new Array;
            this.scenariosHistory = new Array;
            this.currentFocusElem = -1;
            this.actualAppSkin = {id: "", bg: ""};
            this.currentScenario = -1;
            this.messages = this.loadMessages();
            this.forceDestroy = false;
            this.currentConfScenId = "";
            fw.log.debug("Creating Application " + this.id + " in parent " + this.parent)
        } catch (ex) {
            ex.errMethod =
                "initialize";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setForceDestroy: function () {
        try {
            this.forceDestroy = true
        } catch (ex) {
            ex.errMethod = "setForceDestroy";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getAppObj: function () {
        try {
            return this._appObj
        } catch (ex) {
            ex.errMethod = "getAppObj";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setAlpha: function (_alpha) {
        try {
            this._appObj.setAlpha(_alpha)
        } catch (ex) {
            ex.errMethod = "setAlpha";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, loadMessages: function () {
        try {
            var userDefinedLanguage =
                fw.mwManager.getUserLanguage();
            var urlAppMessages = "./Apps/" + this.id + "/" + fw.appManager.getAppInfo(this.id).version + "/messages_" + userDefinedLanguage + ".json";
            var res = fw.dataManager.doCallSync("GET", urlAppMessages, true, false);
            if (res != null)return res.messages;
            return new Object
        } catch (ex) {
            ex.errMethod = "loadMessages";
            ex.errClass = "BaseApplication";
            fw.err(ex);
            return new Object
        }
    }, getPosScenInListHistory: function (_scenarioId) {
        var pos = -1;
        for (var i = this.scenariosHistory.length - 1; i >= 0; i--)if (this.scenariosHistory[i].scenarioId ==
            _scenarioId)pos = i;
        return pos
    }, createScenario: function (_targetScenario, _parentObj, _uniqueKeyId) {
        try {
            if (this.cachedScenarios[_targetScenario] === undefined || this.cachedScenarios[_targetScenario] === null) {
                fw.log.debug("INIT CREATE SCENARIO " + _targetScenario);
                fw.log.debug("Application createScenario : creating scenario " + eval("this.conf.scenarios." + _targetScenario + ".id"));
                var scenObj = eval("this.conf.scenarios." + _targetScenario + ".id");
                conf = "this.conf." + _targetScenario + "Conf";
                eval("this.cachedScenarios[_targetScenario] = new " +
                    scenObj + "(this.conf.scenarios." + _targetScenario + "," + conf + ",_parentObj);");
                fw.log.debug("Application createScenario : scenario " + eval("this.conf.scenarios." + _targetScenario + ".id") + " created")
            }
            if (this.id != fw.conf.popupAppId && this.id != fw.conf.overlayAppId) {
                var preventSubSkin = eval("this.conf.scenarios." + _targetScenario + ".preventSubSkin");
                if (preventSubSkin != undefined && (preventSubSkin && (fw.appManager.currentBackGround != -1 && (this.actualAppSkin.id != undefined && this.actualAppSkin.id != ""))))this.setBackGroundImage(fw.appManager.currentBackGround);
                else this.setBackGroundImage(eval("this.conf.scenarios." + _targetScenario + ".background"))
            }
            this.cachedScenarios[_targetScenario].getScenCntObj().show();
            this.currentScenario = _targetScenario
        } catch (ex) {
            ex.errMethod = "createScenario";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getLastScenarioDataInHistory: function () {
        try {
            if (this.scenariosHistory[this.scenariosHistory.length - 2] != undefined) {
                fw.log.debug("GET SCEN HISTORY OF: " + this.scenariosHistory[this.scenariosHistory.length - 2].scenarioId);
                return this.scenariosHistory[this.scenariosHistory.length -
                2]
            }
        } catch (ex) {
            ex.errMethod = "getLastScenarioDataInHistory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setLastScenarioInputObjHistory: function (_inputObj, _scenarioKeyId, _scenarioId) {
        try {
            if (this.scenariosHistory[this.scenariosHistory.length - 1] != undefined && this.scenariosHistory[this.scenariosHistory.length - 1].scenarioId == _scenarioId) {
                fw.log.debug("Set inputObj in ScenarioHistory @ Scenario:" + this.scenariosHistory[this.scenariosHistory.length - 1].scenarioId);
                this.scenariosHistory[this.scenariosHistory.length -
                1].scenarioInputObj = fw.util.cloneAllObjectType(_inputObj)
            }
        } catch (ex) {
            ex.errMethod = "setLastScenarioInputObjHistory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, addScenarioToHistory: function (_scenarioId, _uniqueKeyId, _scenarioInputObj) {
        try {
            fw.log.debug("Add in ScenarioHistory :" + _scenarioId);
            var obj = new Object;
            obj.scenarioKeyId = _uniqueKeyId;
            obj.scenarioId = _scenarioId;
            obj.scenarioInputObj = _scenarioInputObj;
            this.scenariosHistory.push(obj);
            fw.log.debug("ACTUAL - scenariosHistoryLength: " + this.id + " -> ",
                this.scenariosHistory.length)
        } catch (ex) {
            ex.errMethod = "addScenarioToHistory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, scenariosHistoryPop: function () {
        try {
            if (this.scenariosHistory != null && this.scenariosHistory.length > 0)this.scenariosHistory.pop(); else this.scenariosHistory = new Array
        } catch (ex) {
            ex.errMethod = "scenariosHistoryPop";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, navBackScen: function () {
        try {
            if (this.scenariosHistory != null && this.scenariosHistory.length > 0) {
                this.scenariosHistoryPop();
                if (this.scenariosHistory.length >
                    0) {
                    var scen = this.scenariosHistory[this.scenariosHistory.length - 1];
                    fw.log.debug("Nav back to Scenario: " + scen.scenarioId);
                    return scen
                } else {
                    fw.log.debug("Nav back to prev App");
                    fw.navigationHistory.back();
                    return null
                }
            }
        } catch (ex) {
            ex.errMethod = "navBackScen";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, clearScenarioHistory: function (_info) {
        try {
            fw.log.debug("clearScenarioHistory - " + _info);
            this.scenariosHistory = new Array
        } catch (ex) {
            ex.errMethod = "clearScenarioHistory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    },
    loadScenario: function (_targetScenario, _skipHistoryStore, _keepHandler, _parentObj, _inputObj) {
        try {
            if (this.id != fw.conf.popupAppId && this.id != fw.conf.overlayAppId)fw.bannerUiManager.hideBanner();
            var uniqueKeyId = (new Date).getTime();
            if (_targetScenario != undefined && _targetScenario != null) {
                if (eval("this.conf.scenarios." + _targetScenario + ".parent") != this.conf.applicationProp.id) {
                    fw.log.debug("Application loadScenario : not a main _targetScenario (" + _targetScenario + ") - aborting");
                    return
                }
                var _oldScenario = this.currentScenario;
                var isSameScenario = _oldScenario === _targetScenario;
                this.createScenario(_targetScenario, _parentObj, uniqueKeyId);
                var action = "";
                if (_inputObj[1] != undefined && _inputObj[1].action != undefined)action = _inputObj[1].action.toLowerCase();
                if (_oldScenario != -1 && this.cachedScenarios[_oldScenario] != null) {
                    fw.log.debug("Application loadScenario : unloading scenario " + eval("this.conf.scenarios." + _oldScenario + ".id"));
                    this.cachedScenarios[_oldScenario].focusReleased(_targetScenario)
                }
                if (_oldScenario != -1 && (this.cachedScenarios[_oldScenario] !=
                    null && (this.id != fw.conf.popupAppId && (this.id != fw.conf.overlayAppId && action != "backhistory"))))try {
                    this.setLastScenarioInputObjHistory(this.cachedScenarios[_oldScenario].getCurrentInputObj(), this.cachedScenarios[_oldScenario].uniqueKeyId, _oldScenario)
                } catch (ex) {
                    this.setLastScenarioInputObjHistory({}, this.cachedScenarios[_oldScenario].uniqueKeyId, _oldScenario);
                    fw.log.error("BaseApplication getCurrentInputObj method for back functionalities is not implemented in Scenario " + _oldScenario)
                }
                fw.log.debug("Application loadScenario : loading scenario " +
                    eval("this.conf.scenarios." + _targetScenario + ".id"));
                this.cachedScenarios[this.currentScenario].focusGained(_oldScenario);
                if (!_skipHistoryStore && (this.id != fw.conf.popupAppId && this.id != fw.conf.overlayAppId))if ((_inputObj.fromBack == undefined || _inputObj.fromBack != undefined && _inputObj.fromBack == false) && action != "backhistory")this.addScenarioToHistory(this.currentScenario, uniqueKeyId, null);
                fw.log.debug("Application loadScenario : scenario " + eval("this.conf.scenarios." + this.currentScenario + ".id") + " loaded");
                if (!_keepHandler)this.setKeyHandler(this.currentScenario);
                fw.log.debug("Application loadScenario OK");
                var bgOldId = null;
                if (_oldScenario != -1)eval("var bgOldId = this.conf.scenarios." + _oldScenario + ".background");
                eval("var bgCurrentId = this.conf.scenarios." + this.currentScenario + ".background");
                if (!isSameScenario && (_oldScenario != -1 && !eval("this.conf.scenarios." + _oldScenario + ".preventDestroy")))this.destroyScenario(_oldScenario); else if (!isSameScenario && (_oldScenario != -1 && eval("this.conf.scenarios." + _oldScenario +
                        ".preventDestroy"))) {
                    if (bgOldId != null && (fw.appManager.cachedBackGrounds[bgOldId] != undefined && bgOldId != bgCurrentId))fw.appManager.cachedBackGrounds[bgOldId].hideBg();
                    this.cachedScenarios[_oldScenario].getScenCntObj().hide()
                }
            } else fw.log.debug("LoadScenario error : null or undefined " + _targetScenario)
        } catch (ex) {
            ex.errMethod = "LoadScenario";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setKeyHandler: function (_scenarioId) {
        try {
            if (this.cachedScenarios[_scenarioId] != null) {
                fw.log.debug("Application setKeyHandler : set KeyHandler to " +
                    _scenarioId);
                fw.keys.setHandler(this.cachedScenarios[_scenarioId], this.cachedScenarios[_scenarioId].keyHandler);
                this.cachedScenarios[_scenarioId].enableKeyHandler();
                fw.log.debug("Application setKeyHandler : set KeyHandler to " + _scenarioId + " ok")
            }
        } catch (ex) {
            ex.errMethod = "setKeyHandler";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getScen: function (_scenId) {
        try {
            if (_scenId != null) {
                if (this.cachedScenarios[_scenId] !== undefined)return this.cachedScenarios[_scenId]
            } else if (this.cachedScenarios[this.currentScenario] !==
                undefined)return this.cachedScenarios[this.currentScenario]
        } catch (ex) {
            ex.errMethod = "getScen";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
        return null
    }, destroyScenario: function (_scenId) {
        try {
            if (this.cachedScenarios[_scenId]) {
                this.cachedScenarios[_scenId].destroy();
                this.cachedScenarios[_scenId] = null
            }
        } catch (ex) {
            ex.errMethod = "destroyScenario";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, precacheScenarios: function () {
        try {
            for (var i = 0; i < this.conf.precachedScenarios.length; i++)if (this.cachedScenarios[this.conf.precachedScenarios[i]] ===
                undefined) {
                fw.log.debug("Application init : precaching scenario " + eval("this.conf.scenarios." + this.conf.precachedScenarios[i] + ".id"));
                var scenObj = eval("this.conf.scenarios." + this.conf.precachedScenarios[i] + ".id");
                eval("this.cachedScenarios[this.conf.precachedScenarios[i]] = new " + scenObj + "(this.conf.scenarios." + this.conf.precachedScenarios[i] + ",this.conf." + this.conf.precachedScenarios[i] + "Conf,this);");
                var scenCached = eval("this.cachedScenarios[this.conf.precachedScenarios[i]]");
                scenCached.getScenCntObj().hide();
                fw.log.debug("Application init : scenario " + scenCached.id + " precached")
            }
        } catch (ex) {
            ex.errMethod = "precacheScenarios";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getCurrScenId: function () {
        try {
            return this.currentScenario
        } catch (ex) {
            ex.errMethod = "getCurrScenId";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, getCurrScenObj: function () {
        try {
            return this.cachedScenarios[this.getCurrScenId()]
        } catch (ex) {
            ex.errMethod = "getCurrScenObj";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this._appObj.style.visibility =
                "visible"
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            if (this.id != null && (this.id != fw.conf.popupAppId && (this.id != fw.conf.overlayAppId && (!fw.appManager.inPrecacheState && !fw.appManager.noAddToFwBackHistory))))try {
                fw.bannerUiManager.hideBanner()
            } catch (ex) {
            }
            this._appObj.style.visibility = "hidden"
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, addToHistory: function () {
        try {
            if (this.id != fw.conf.popupAppId && (this.id != fw.conf.overlayAppId &&
                (!fw.appManager.inPrecacheState && !fw.appManager.noAddToFwBackHistory)))try {
                fw.navigationHistory.addItem(this.id, fw.util.cloneAllObjectType(this.getCurrScenObj().getCurrentInputObj()))
            } catch (ex) {
                fw.navigationHistory.addItem(this.id, fw.util.cloneAllObjectType(new Array(this.currentConfScenId)))
            }
        } catch (ex) {
            ex.errMethod = "addToHistory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, destroy: function () {
        try {
            fw.log.debug("Destroying Application " + this.conf.applicationProp.id + " in parent " + this.parent);
            fw.util.destroyNode(this._appObj);
            this.parent = null;
            this.conf = null;
            this._appObj = null
        } catch (ex) {
            ex.errMethod = "destroy";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, clean: function () {
        try {
            fw.log.debug("Cleaning Application " + this.conf.applicationProp.id);
            if (fw.appManager.cachedBackGrounds[fw.appManager.currentBackGround] != undefined)fw.appManager.cachedBackGrounds[fw.appManager.currentBackGround].hideBg();
            var scenariosKey = Object.keys(this.cachedScenarios);
            for (var j = 0; j < scenariosKey.length; j++)if (this.forceDestroy)this.destroyScenario(scenariosKey[j]);
            else if (!fw.util.isPresentInArray(this.conf.precachedScenarios, scenariosKey[j]) && eval("this.conf.scenarios." + scenariosKey[j] + ".preventDestroy") == false) {
                this.destroyScenario(scenariosKey[j]);
                this.clearScenarioHistory("_1");
                this.resetCssSubSkin()
            }
            if (this.forceDestroy) {
                fw.log.debug("Cleaning FULL Application" + this.conf.applicationProp.id);
                this.currentScenario = -1;
                this.forceDestroy = false;
                this.clearScenarioHistory("_2");
                this.resetCssSubSkin()
            }
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setBackGroundImage: function (_id) {
        try {
            fw.appManager.setBackGroundImage(_id)
        } catch (ex) {
            ex.errMethod = "setBackGroundImage";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, restoreSkin: function (_param) {
        try {
            if (_param[1] != undefined && (_param[1].action != undefined && _param[1].action.toLowerCase() == "backhistory") || _param[0] == fw.conf.backLabel)if (this.actualAppSkin.id != undefined && (this.actualAppSkin.id != "" && this.actualAppSkin.bg != undefined))fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(this.actualAppSkin.bg);
            else this.setSubSkin("/")
        } catch (ex) {
            ex.errMethod = "restoreSkin";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, checkChangeSkinCategory: function (_categoryPath) {
        try {
            var sString = _categoryPath;
            var newSubSkin = false;
            while (sString.length > 0) {
                if (this.conf.subskinCategoryConf != undefined && this.conf.subskinCategoryConf[sString] != undefined) {
                    newSubSkin = true;
                    _categoryPath = sString;
                    break
                }
                var sString = sString.substring(0, sString.lastIndexOf("/"))
            }
            return [newSubSkin, _categoryPath]
        } catch (ex) {
            ex.errMethod = "checkChangeSkinCategory";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, checkSubSkinChange: function (_categoryPath) {
        try {
            var toChange = this.checkChangeSkinCategory(_categoryPath);
            if (toChange[0])if (this.actualAppSkin.id != toChange[1])return true; else {
                if (this.actualAppSkin.id == toChange[1]) {
                    var bgToApply = this.conf.subskinCategoryConf[toChange[1]].bkgImgId;
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(bgToApply)
                }
            } else if (this.actualAppSkin.id != undefined && this.actualAppSkin.id != "")return true;
            return false
        } catch (ex) {
            ex.errMethod =
                "checkSubSkinChange";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, setSubSkin: function (_categoryPath, _callerObj, _callerObjFunction) {
        try {
            var cssToApply = "";
            var bgToApply = "";
            var actualSkin = this.actualAppSkin;
            var toChange = this.checkChangeSkinCategory(_categoryPath);
            if (toChange[0]) {
                _categoryPath = toChange[1];
                cssToApply = this.conf.subskinCategoryConf[_categoryPath].cssFileToApply;
                bgToApply = this.conf.subskinCategoryConf[_categoryPath].bkgImgId;
                if (this.actualAppSkin.id != _categoryPath) {
                    this.actualAppSkin.id = _categoryPath;
                    var cssToRemove = -1;
                    if (this.actualAppSkin.css != undefined)cssToRemove = this.actualAppSkin.css;
                    this.changeSubSkin(cssToRemove, cssToApply, bgToApply, _callerObj, _callerObjFunction)
                } else if (this.actualAppSkin.id == _categoryPath) {
                    bgToApply = this.conf.subskinCategoryConf[_categoryPath].bkgImgId;
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(bgToApply)
                }
            } else {
                if (this.actualAppSkin.id != "") {
                    this.actualAppSkin.id = "";
                    bgToApply = eval("this.conf.scenarios." + this.getCurrScenObj().id + ".background");
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(bgToApply);
                    this.actualAppSkin.bg = bgToApply;
                    if (this.actualAppSkin.css != -1) {
                        fw.log.debug("CSS TO REMOVE: " + this.actualAppSkin.css);
                        cssUtil.removejscssfileJQuery(this.actualAppSkin.css, "css")
                    }
                    this.actualAppSkin.css = -1
                }
                if (_callerObjFunction != null && _callerObj != null)_callerObjFunction.apply(_callerObj, new Array(true))
            }
        } catch (ex) {
            ex.errMethod = "setSubSkin";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, resetBbSkin: function () {
        try {
            bgToApply =
                eval("this.conf.scenarios." + this.getCurrScenObj().id + ".background");
            if (bgToApply != undefined && bgToApply != null) {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(bgToApply);
                this.actualAppSkin.bg = bgToApply
            }
        } catch (ex) {
            ex.errMethod = "resetBbSkin";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, resetCssSubSkin: function () {
        try {
            if (this.actualAppSkin.id != "") {
                this.actualAppSkin.id = "";
                var _this = this;
                fw.util.setTimeout(function () {
                    if (_this.actualAppSkin.css != -1) {
                        fw.log.debug("CSS TO REMOVE: " +
                            _this.actualAppSkin.css);
                        cssUtil.removejscssfileJQuery(_this.actualAppSkin.css, "css")
                    }
                    _this.actualAppSkin.css = -1;
                    _this.actualAppSkin.bg = ""
                }, 0)
            }
        } catch (ex) {
            ex.errMethod = "resetSubSkin";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, changeSubSkin: function (_cssToRemove, _cssToApply, _bgToApply, _callerObj, _callerObjFunction) {
        try {
            if (_cssToRemove != _cssToApply) {
                fw.log.debug("CSS TO LOAD: " + _cssToApply);
                var timeout = 0;
                if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.conf.subskinCategoryConf.timeoutCall !=
                    undefined)timeout = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.conf.subskinCategoryConf.timeoutCall;
                cssUtil.loadCssJQuery(_cssToApply, [_cssToRemove, _bgToApply, _callerObj, _callerObjFunction, _cssToApply], this, this.loadCssCallBack, timeout)
            } else if (_callerObjFunction != null && _callerObj != null)setTimeout(function () {
                _callerObjFunction.apply(_callerObj, new Array(true))
            }, 10)
        } catch (ex) {
            ex.errMethod = "changeSubSkin";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, loadCssCallBack: function (_name, _data,
                                  status) {
        try {
            if (status == "ERROR") {
                this.resetCssSubSkin();
                this.resetBbSkin()
            } else {
                setTimeout(function () {
                    if (_data[0] != -1) {
                        fw.log.debug("CSS TO REMOVE: " + _data[0]);
                        cssUtil.removejscssfileJQuery(_data[0], "css")
                    }
                }, 0);
                setTimeout(function () {
                    fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setBackGroundImage(_data[1])
                }, 2);
                this.actualAppSkin.css = _data[4];
                this.actualAppSkin.bg = _data[1]
            }
            if (_data[3] != null && _data[2] != null)setTimeout(function () {
                _data[3].apply(_data[2], new Array(true))
            }, 0)
        } catch (ex) {
            ex.errMethod =
                "loadCssCallBack";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, onBrowserHide: function () {
        try {
            if (fw.appManager.getCurrentApp() != undefined && (fw.appManager.getCurrentApp() != null && (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != undefined && fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app))) {
                fw.log.debug("onBrowserHide: " + fw.appManager.getCurrentApp());
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.onHide();
                this.clean()
            }
        } catch (ex) {
            ex.errMethod = "onBrowserHide";
            ex.errClass =
                "BaseApplication";
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
    }, showBackGround: function () {
        try {
            this.backGroundCont.show()
        } catch (ex) {
            ex.errMethod = "showBackGround";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }, cleanParentalControl: function () {
        try {
            return true
        } catch (ex) {
            ex.errMethod = "cleanParentalControl";
            ex.errClass = "BaseApplication";
            fw.err(ex)
        }
    }
});
