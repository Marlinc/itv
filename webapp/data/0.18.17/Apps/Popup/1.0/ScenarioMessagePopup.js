var ScenarioMessagePopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioMessagePopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "MsgPopupBkgImg", this.conf.MsgPopupBkgImg);
            bg.setUrl(this.conf.MsgPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.msgPopupTitleTxt = new Text(this.getScenObj().id + "MsgPopupTitleTxt", this.conf.MsgPopupTitleTxt);
            this.getScenObj().appendChild(this.msgPopupTitleTxt.getObj());
            this.msgPopupMessageTxt = new TextArea(this.getScenObj().id + "MsgPopupTitleTxt", this.conf.MsgPopupMessageTxt);
            this.getScenObj().appendChild(this.msgPopupMessageTxt.getObj());
            this.msgPopupCloseBtn = new Button(this.getScenObj().id + "MsgPopupCloseBtn", this.conf.MsgPopupCloseBtn);
            this.getScenObj().appendChild(this.msgPopupCloseBtn.getObj());
            fw.log.info("ScenarioMessagePopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioMessagePopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioMessagePopup - init START");
            if (_conf.title != null && (_conf.title != undefined && _conf.title != ""))this.msgPopupTitleTxt.setTxt(_conf.title.slice(0, this.conf.MsgPopupTitleTxtMaxLength)); else this.msgPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.MsgPopupDefaultTitleTxt));
            if (_conf.message != null && (_conf.message != undefined && _conf.message != "")) {
                var txt = _conf.message;
                if (txt.indexOf("<br><br><br>") != -1)txt = txt.replace("<br><br><br>", "<br><br>");
                this.msgPopupMessageTxt.setTxt(txt.slice(0, this.conf.MsgPopupMessageTxtMaxLength))
            } else this.msgPopupMessageTxt.setTxt(eval("this.parentObj.messages." +
                this.conf.MsgPopupDefaultMessageTxt));
            if (_conf.button != null && (_conf.button != undefined && _conf.button != "")) {
                this.msgPopupCloseBtn.setTxt(_conf.button.slice(0, this.conf.MsgPopupCloseBtnTxtMaxLength));
                this.msgPopupCloseBtn.focusOn()
            } else this.msgPopupCloseBtn.getObj().hide();
            if (_conf.showTime != null && (_conf.showTime != undefined && _conf.showTime > 0)) {
                var _this = this;
                this.timeoutShowTime = fw.util.setTimeout(function () {
                    _this.closePopUP(null)
                }, _conf.showTime)
            }
            fw.log.info("ScenarioMessagePopup - init END")
        } catch (ex) {
            ex.errMethod =
                "init";
            ex.errClass = "ScenarioMessagePopup";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.MENU:
                    fw.mwManager.openMenu();
                    this.closePopUP(null);
                    break;
                case fw.keys.code.EPG:
                    var startGidsTimeout = fw.conf.startGidsTimeout != null && fw.conf.startGidsTimeout != undefined ? fw.conf.startGidsTimeout : 400;
                    setTimeout(function () {
                        fw.mwManager.openEPG("DEFAULT", "")
                    }, startGidsTimeout);
                    this.closePopUP(null);
                    break;
                case fw.keys.code.TV:
                    fw.mwManager.watchDTV();
                    this.closePopUP(null);
                    break;
                case fw.keys.code.OK:
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    this.closePopUP(null);
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioMessagePopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
    }, closePopUP: function (_resultObj) {
        try {
            fw.util.clearTimeout(this.timeoutShowTime);
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod =
                "closePopUP";
            ex.errClass = "ScenarioMessagePopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }
});
