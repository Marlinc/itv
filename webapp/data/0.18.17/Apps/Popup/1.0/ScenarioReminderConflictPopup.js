var ScenarioReminderConflictPopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioReminderConflictPopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "RemConfPopupBkgImg", this.conf.RemConfPopupBkgImg);
            bg.setUrl(this.conf.RemConfPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            var icon = new Image(this.getScenObj().id + "RemConfPopupIcon", this.conf.RemConfPopupIcon);
            icon.setUrl(this.conf.RemConfPopupIcon.url);
            this.getScenObj().appendChild(icon.getObj());
            this.remConfPopupTitleTxt = new Text(this.getScenObj().id + "RemConfPopupTitleTxt", this.conf.RemConfPopupTitleTxt);
            this.getScenObj().appendChild(this.remConfPopupTitleTxt.getObj());
            this.remConfPopupLabel1Txt = new Text(this.getScenObj().id + "RemConfPopupLabel1Txt", this.conf.RemConfPopupLabel1Txt);
            this.getScenObj().appendChild(this.remConfPopupLabel1Txt.getObj());
            this.remConfPopupPrgTimeTxt = new Text(this.getScenObj().id +
                "RemConfPopupPrgTimeTxt", this.conf.RemConfPopupPrgTimeTxt);
            this.getScenObj().appendChild(this.remConfPopupPrgTimeTxt.getObj());
            this.remConfPopupPrgDateTxt = new Text(this.getScenObj().id + "RemConfPopupPrgDateTxt", this.conf.RemConfPopupPrgDateTxt);
            this.getScenObj().appendChild(this.remConfPopupPrgDateTxt.getObj());
            this.remConfPopupPrgTitleTxt = new Text(this.getScenObj().id + "RemConfPopupPrgTitleTxt", this.conf.RemConfPopupPrgTitleTxt);
            this.getScenObj().appendChild(this.remConfPopupPrgTitleTxt.getObj());
            this.remConfPopupPrgChanTxt = new Text(this.getScenObj().id + "RemConfPopupPrgChanTxt", this.conf.RemConfPopupPrgChanTxt);
            this.getScenObj().appendChild(this.remConfPopupPrgChanTxt.getObj());
            this.remConfPopupLabel2Txt = new Text(this.getScenObj().id + "RemConfPopupLabel2Txt", this.conf.RemConfPopupLabel2Txt);
            this.getScenObj().appendChild(this.remConfPopupLabel2Txt.getObj());
            this.remConfPopupOKBtn = new Button(this.getScenObj().id + "RemConfPopupOKBtn", this.conf.RemConfPopupOKBtn);
            this.getScenObj().appendChild(this.remConfPopupOKBtn.getObj());
            this.remConfPopupKOBtn = new Button(this.getScenObj().id + "RemConfPopupKOBtn", this.conf.RemConfPopupKOBtn);
            this.getScenObj().appendChild(this.remConfPopupKOBtn.getObj());
            fw.log.info("ScenarioReminderConflictPopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioReminderConflictPopup - init START");
            this.remConfPopupSelectedButton = 0;
            this.remConfPopupPrgDateTxt.setTxt(eval("this.parentObj.messages." +
                this.conf.RemConfPopupDefaultPrgDateTxt));
            this.remConfPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupTitleTxtStaticContent));
            this.remConfPopupLabel1Txt.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupLabel1TxtStaticContent));
            this.remConfPopupLabel2Txt.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupLabel2TxtStaticContent));
            this.remConfPopupPrgTimeTxt.setTxt(this.formatPrgStartEndTime(_conf.prgStart, _conf.prgEnd));
            if (_conf.prgStart != null && (_conf.prgStart !=
                undefined && _conf.prgStart != ""))this.remConfPopupPrgDateTxt.setTxt(fw.util.getDayNumLit(_conf.prgStart));
            if (_conf.prgTitle != null && (_conf.prgTitle != undefined && _conf.prgTitle != ""))this.remConfPopupPrgTitleTxt.setTxt(_conf.prgTitle); else this.remConfPopupPrgTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupDefaultPrgTitleTxt));
            if (_conf.prgChannel != null && (_conf.prgChannel != undefined && _conf.prgChannel != ""))this.remConfPopupPrgChanTxt.setTxt(_conf.prgChannel); else this.remConfPopupPrgChanTxt.setTxt(eval("this.parentObj.messages." +
                this.conf.RemConfPopupDefaultPrgChanTxt));
            this.remConfPopupOKBtn.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupOKBtnTxtStaticContent));
            this.remConfPopupKOBtn.setTxt(eval("this.parentObj.messages." + this.conf.RemConfPopupKOBtnTxtStaticContent));
            this.remConfPopupSelectedButton = 0;
            this.remConfPopupOKBtn.focusOn();
            this.remConfPopupKOBtn.focusOff();
            fw.log.info("ScenarioReminderConflictPopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    },
    keyHandlerUp: function (_evt) {
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
                    if (this.remConfPopupSelectedButton == 0)this.closePopUP(this.conf.RemConfPopupOKBtnStatus); else this.closePopUP(this.conf.RemConfPopupKOBtnStatus);
                    break;
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    this.closePopUP(null);
                    break;
                case fw.keys.code.MENU:
                    this.closePopUP("MENU");
                    break;
                case fw.keys.code.EPG:
                    this.closePopUP("EPG");
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.remConfPopupSelectedButton = _pos;
            if (_pos == 0) {
                this.remConfPopupOKBtn.focusOn();
                this.remConfPopupKOBtn.focusOff()
            } else if (_pos == 1) {
                this.remConfPopupOKBtn.focusOff();
                this.remConfPopupKOBtn.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, formatPrgStartEndTime: function (_prgStart, _prgEnd) {
        try {
            var prgStart = eval("this.parentObj.messages." + this.conf.RemConfPopupDefaultPrgTimeTxt);
            var prgEnd = prgStart;
            if (_prgStart != undefined && (_prgStart != null && _prgStart != ""))prgStart = fw.util.getHourMinTime(_prgStart);
            if (_prgEnd != undefined && (_prgEnd != null && _prgStart != ""))prgEnd = fw.util.getHourMinTime(_prgEnd);
            return prgStart + " - " + prgEnd
        } catch (ex) {
            ex.errMethod = "formatPrgStartEndTime";
            ex.errClass = "ScenarioReminderConflictPopup";
            fw.err(ex)
        }
    }
});
