var ScenarioOptionMenu = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        fw.log.info("inizialize scenarioOptMenu");
        try {
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "bgImage", this.conf.bgImage);
            bg.setUrl(this.conf.bgImage.url);
            this.getScenObj().appendChild(bg.getObj());
            this.optMenu = null;
            this.optMenuElements = this.conf.menuElement;
            this.arrowDown = new Image("_arrowDown", this.conf.arrowDown);
            this.arrowDown.setUrl(this.conf.arrowDown.url);
            this.getScenObj().appendChild(this.arrowDown.getObj());
            this.arrowUp = new Image("_arrowUp", this.conf.arrowUp);
            this.arrowUp.setUrl(this.conf.arrowUp.url);
            this.getScenObj().appendChild(this.arrowUp.getObj());
            this.toonOpties = new Image("_toonOpties", this.conf.toonOpties);
            this.toonOpties.setUrl(this.conf.toonOpties.url);
            this.getScenObj().appendChild(this.toonOpties.getObj());
            this.toonOptiesTxt = new Text(this.id + "_toonOptiesTxt", this.conf.toonOptiesTxt);
            this.toonOptiesTxt.setTxt(eval("this.parentObj.messages." +
                this.conf.toonOptiesTxtText));
            this.getScenObj().appendChild(this.toonOptiesTxt.getObj())
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, init: function (inputObj) {
        fw.log.info("init scenarioOptMenu");
        try {
            this.optMenuDynamicConf = inputObj.overlayDynamicConf;
            this.hasLiveVideo = this.optMenuDynamicConf.hasLiveVideo;
            if (this.optMenuDynamicConf == null || this.optMenuDynamicConf == undefined) {
                fw.log.debug("OptionMenuDynamicConf is null or undefined, get default from Json");
                this.optMenuDynamicConf =
                    this.conf.optMenuDefaultMenu
            }
            var elementLst = this.optMenuDynamicConf.menuElement;
            this.optMenuLabel = new Array;
            this.optMenuStatus = new Array;
            for (var i = 0; i < elementLst.length; i++) {
                var object = elementLst[i];
                for (var property in object) {
                    if (property == "label")this.optMenuLabel.push(new ItemLeftMenu(object[property]));
                    if (property == "status")this.optMenuStatus.push(object[property])
                }
            }
            var currApp = fw.appManager.getCurrentApp();
            if (this.conf.autoAddHelpButton != null && (this.conf.autoAddHelpButton != undefined && (this.conf.autoAddHelpButton ==
                true && (currApp != null && (currApp != undefined && currApp != fw.conf.helpAppId))))) {
                this.optMenuLabel.push({contentTitle: this.parentObj.messages.help_txt});
                this.optMenuStatus.push(fw.conf.optMenuHelpStatus)
            }
            this.optMenu = new GridPage("OptMenuList", this.conf.OptMenuList, Button, this.optMenuLabel, null, null);
            this.getScenObj().appendChild(this.optMenu.getObj());
            this.optMenu.focusOn();
            this.selectedItemOnOptMenu = this.optMenu.getSelectedItem();
            if (this.optMenu.getNumPage() == 1) {
                this.arrowUp.getObj().hide();
                this.arrowDown.getObj().hide()
            }
            this.showMenu();
            fw.log.info("Menu shown")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.MENU:
                    this.getScenObj().removeChild(this.optMenu.getObj());
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.GIDS:
                    this.getScenObj().removeChild(this.optMenu.getObj());
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.EPG:
                    this.getScenObj().removeChild(this.optMenu.getObj());
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.HELP:
                    this.close(null);
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (this.hasLiveVideo == "Y" && fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp(); else if (this.optMenuLabel > this.optMenu.numVisibleRows)this.optMenu.changePageUp();
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (this.hasLiveVideo == "Y" && fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown(); else if (this.optMenuLabel > this.optMenu.numVisibleRows)this.optMenu.changePageDown();
                    break;
                case fw.keys.code.UP:
                    this.optMenu.moveCursorToUp();
                    break;
                case fw.keys.code.DOWN:
                    this.optMenu.moveCursorToDown();
                    break;
                case fw.keys.code.RADIO:
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.KEY_HOME:
                case fw.keys.code.TV:
                    this.getScenObj().removeChild(this.optMenu.getObj());
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.OK:
                    var retObj = new Array(this.optMenuStatus[this.optMenu.getCursorPosition()]);
                    this.close(retObj);
                    break;
                case fw.keys.code.BACK:
                case fw.keys.code.BLUE:
                    this.close(null);
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, menuArrowHandler: function () {
        try {
            if (this.optMenu.visibleIndexPage ==
                0)this.arrowUp.getObj().hide(); else this.arrowUp.getObj().show();
            if (this.optMenu.visibleIndexPage + 1 < this.optMenu.getNumPage())this.arrowDown.getObj().show(); else this.arrowDown.getObj().hide()
        } catch (ex) {
            ex.errMethod = "menuArrowHandler";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, showMenu: function () {
        try {
            var _this = this;
            setTimeout(function () {
                fw.effects.slideHoriz(_this.getScenObj(), null, null, true, _this.conf.slideTime, _this.conf.menuW, 0)
            }, 1)
        } catch (ex) {
            ex.errMethod = "showMenu";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, hideMenu: function () {
        try {
            var _this = this;
            setTimeout(function () {
                fw.effects.slideHoriz(_this.getScenObj(), _this, _this.removeChild, true, 0, 0, _this.conf.menuW + 20)
            }, 1)
        } catch (ex) {
            ex.errMethod = "hideMenu";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, close: function (_resultObj) {
        try {
            this.selectedItemOnOptMenu = _resultObj;
            this.hideMenu()
        } catch (ex) {
            ex.errMethod = "close";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, removeChild: function () {
        try {
            var _this = this;
            setTimeout(function () {
                _this.getScenObj().removeChild(_this.optMenu.getObj());
                _this.parentObj.inputObj.callbackMethod.apply(_this.parentObj.inputObj.callbackObj, new Array(_this.selectedItemOnOptMenu, _this.parentObj.inputObj.callerCallbackObj, _this.parentObj.inputObj.callerCallbackMethod))
            }, 5)
        } catch (ex) {
            ex.errMethod = "removeChild";
            ex.errClass = "ScenarioOptionMenu";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }
});
var ItemLeftMenu = Class.create({
    initialize: function (title) {
        this.contentTitle = title
    }
});
