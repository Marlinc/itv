var ScenarioInteractivePopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioInteractivePopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "IntPopupBkgImg", this.conf.IntPopupBkgImg);
            bg.setUrl(this.conf.IntPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.intPopupTitleTxt = new Text(this.getScenObj().id + "IntPopupTitleTxt", this.conf.IntPopupTitleTxt);
            this.getScenObj().appendChild(this.intPopupTitleTxt.getObj());
            this.intPopupMessageTxt = new TextArea(this.getScenObj().id + "IntPopupTitleTxt", this.conf.IntPopupMessageTxt);
            this.getScenObj().appendChild(this.intPopupMessageTxt.getObj());
            this.intPopupOKBtn = new Button(this.getScenObj().id + "IntPopupOKBtn", this.conf.IntPopupOKBtn);
            this.getScenObj().appendChild(this.intPopupOKBtn.getObj());
            this.intPopupKOBtn = new Button(this.getScenObj().id + "IntPopupKOBtn", this.conf.IntPopupKOBtn);
            this.getScenObj().appendChild(this.intPopupKOBtn.getObj());
            this.intButtonOKstatus = this.conf.IntPopupOKBtnDefaultStatus;
            this.intButtonKOstatus = this.conf.IntPopupKOBtnDefaultStatus;
            this.intPopupSelectedButton = 0;
            fw.log.info("ScenarioInteractivePopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioInteractivePopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioInteractivePopup - init START");
            if (_conf.title != null && (_conf.title != undefined && _conf.title != ""))this.intPopupTitleTxt.setTxt(_conf.title.slice(0, this.conf.IntPopupTitleTxtMaxLength));
            else this.intPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.IntPopupDefaultTitleTxt));
            if (_conf.message != null && (_conf.message != undefined && _conf.message != ""))this.intPopupMessageTxt.setTxt(_conf.message.slice(0, this.conf.IntPopupMessageTxtMaxLength)); else this.intPopupMessageTxt.setTxt(eval("this.parentObj.messages." + this.conf.IntPopupDefaultMessageTxt));
            if (_conf.buttonOKlabel != null && (_conf.buttonOKlabel != undefined && _conf.buttonOKlabel != ""))this.intPopupOKBtn.setTxt(_conf.buttonOKlabel.slice(0,
                this.conf.IntPopupOKAndKOBtnTxtMaxLength)); else this.intPopupOKBtn.setTxt(eval("this.parentObj.messages." + this.conf.IntPopupDefaultOKBtnTxt));
            if (_conf.buttonKOlabel != null && (_conf.buttonKOlabel != undefined && _conf.buttonKOlabel != ""))this.intPopupKOBtn.setTxt(_conf.buttonKOlabel.slice(0, this.conf.IntPopupOKAndKOBtnTxtMaxLength)); else this.intPopupKOBtn.setTxt(eval("this.parentObj.messages." + this.conf.IntPopupDefaultKOBtnTxt));
            if (_conf.buttonOKstatus != null && (_conf.buttonOKstatus != undefined && _conf.buttonOKstatus !=
                ""))this.intButtonOKstatus = _conf.buttonOKstatus;
            if (_conf.buttonKOstatus != null && (_conf.buttonKOstatus != undefined && _conf.buttonKOstatus != ""))this.intButtonKOstatus = _conf.buttonKOstatus;
            if (_conf.focusKO != null && (_conf.focusKO != undefined && _conf.focusKO == true)) {
                this.intPopupSelectedButton = 1;
                this.intPopupKOBtn.focusOn();
                this.intPopupOKBtn.focusOff()
            } else {
                this.intPopupSelectedButton = 0;
                this.intPopupOKBtn.focusOn();
                this.intPopupKOBtn.focusOff()
            }
            _conf.hasLiveVideo == "Y" ? this.hasLiveVideo = true : this.hasLiveVideo =
                false;
            fw.log.info("ScenarioInteractivePopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioInteractivePopup";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.UP:
                    this.switchButton(0);
                    break;
                case fw.keys.code.DOWN:
                    this.switchButton(1);
                    break;
                case fw.keys.code.OK:
                    if (this.intPopupSelectedButton == 0)this.closePopUP(this.intButtonOKstatus); else this.closePopUP(this.intButtonKOstatus);
                    break;
                case fw.keys.code.BACK:
                    this.closePopUP();
                    break;
                case fw.keys.code.HELP:
                    break;
                case fw.keys.code.MENU:
                    this.closePopUP("MENU");
                    break;
                case fw.keys.code.EPG:
                    this.closePopUP("EPG");
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (this.hasLiveVideo)if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp();
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (this.hasLiveVideo)if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown();
                    break;
                case fw.keys.code.RADIO:
                    this.closePopUP("RADIO");
                    break;
                case fw.keys.code.TV:
                    this.closePopUP("TV");
                    break
            }
        } catch (ex) {
            ex.errMethod =
                "keyHandler";
            ex.errClass = "ScenarioInteractivePopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.intPopupSelectedButton = _pos;
            if (_pos == 0) {
                this.intPopupOKBtn.focusOn();
                this.intPopupKOBtn.focusOff()
            } else if (_pos == 1) {
                this.intPopupOKBtn.focusOff();
                this.intPopupKOBtn.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioInteractivePopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj,
                new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioInteractivePopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }
});
