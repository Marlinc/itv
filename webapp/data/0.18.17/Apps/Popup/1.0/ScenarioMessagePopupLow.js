var ScenarioMessagePopupLow = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioMessagePopupLow - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "MsgLPopupBkgImg", this.conf.MsgLPopupBkgImg);
            bg.setUrl(this.conf.MsgLPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.msgLPopupTitleTxt = new Text(this.getScenObj().id + "MsgLPopupTitleTxt", this.conf.MsgLPopupTitleTxt);
            this.getScenObj().appendChild(this.msgLPopupTitleTxt.getObj());
            this.msgLPopupMessageTxt = new TextArea(this.getScenObj().id + "MsgLPopupTitleTxt", this.conf.MsgLPopupMessageTxt);
            this.getScenObj().appendChild(this.msgLPopupMessageTxt.getObj());
            this.msgLPopupCloseBtn = new Button(this.getScenObj().id + "MsgLPopupCloseBtn", this.conf.MsgLPopupCloseBtn);
            this.getScenObj().appendChild(this.msgLPopupCloseBtn.getObj());
            fw.log.info("ScenarioMessagePopupLow - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass =
                "ScenarioMessagePopupLow";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioMessagePopupLow - init START");
            if (_conf.title != null && (_conf.title != undefined && _conf.title != ""))this.msgLPopupTitleTxt.setTxt(_conf.title.slice(0, this.conf.MsgLPopupTitleTxtMaxLength)); else this.msgLPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.MsgLPopupDefaultTitleTxt));
            if (_conf.message != null && (_conf.message != undefined && _conf.message != ""))this.msgLPopupMessageTxt.setTxt(_conf.message.slice(0, this.conf.MsgLPopupMessageTxtMaxLength));
            else this.msgLPopupMessageTxt.setTxt(eval("this.parentObj.messages." + this.conf.MsgLPopupDefaultMessageTxt));
            if (_conf.button != null && (_conf.button != undefined && _conf.button != "")) {
                this.msgLPopupCloseBtn.setTxt(_conf.button.slice(0, this.conf.MsgLPopupCloseBtnTxtMaxLength));
                this.msgLPopupCloseBtn.focusOn()
            } else this.msgLPopupCloseBtn.getObj().hide();
            if (_conf.showTime != null && (_conf.showTime != undefined && _conf.showTime > 0)) {
                var _this = this;
                this.lowTimeoutShowTime = fw.util.setTimeout(function () {
                        _this.closePopUP(null)
                    },
                    _conf.showTime)
            }
            fw.log.info("ScenarioMessagePopupLow - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioMessagePopupLow";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.MENU:
                    this.closePopUP("MENU");
                    break;
                case fw.keys.code.EPG:
                    this.closePopUP("EPG");
                    break;
                case fw.keys.code.OK:
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    this.closePopUP(null);
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioMessagePopupLow";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
    }, closePopUP: function (_resultObj) {
        try {
            fw.util.clearTimeout(this.lowTimeoutShowTime);
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioMessagePopupLow";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }
});
