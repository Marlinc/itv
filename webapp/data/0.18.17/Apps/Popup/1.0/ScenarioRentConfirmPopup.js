var ScenarioRentConfirmPopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioRentConfirmPopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "RentConfPopupBkgImg", this.conf.RentConfPopupBkgImg);
            bg.setUrl(this.conf.RentConfPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.rentConfPopupTitleTxt = new Text(this.getScenObj().id + "RentConfPopupTitleTxt", this.conf.RentConfPopupTitleTxt);
            this.getScenObj().appendChild(this.rentConfPopupTitleTxt.getObj());
            this.rentConfPopupItemTitleTxt = new Text(this.getScenObj().id + "RentConfPopupItemTitleTxt", this.conf.RentConfPopupItemTitleTxt);
            this.getScenObj().appendChild(this.rentConfPopupItemTitleTxt.getObj());
            this.rentConfPopupLabel1Txt = new TextArea(this.getScenObj().id + "RentConfPopupLabel1Txt", this.conf.RentConfPopupLabel1Txt);
            this.getScenObj().appendChild(this.rentConfPopupLabel1Txt.getObj());
            this.rentConfPopupLabel2Txt = new TextArea(this.getScenObj().id +
                "RentConfPopupLabel2Txt", this.conf.RentConfPopupLabel2Txt);
            this.getScenObj().appendChild(this.rentConfPopupLabel2Txt.getObj());
            this.rentConfPopupNowBtn = new Button(this.getScenObj().id + "RentConfPopupNowBtn", this.conf.RentConfPopupNowBtn);
            this.getScenObj().appendChild(this.rentConfPopupNowBtn.getObj());
            this.rentConfPopupLaterBtn = new Button(this.getScenObj().id + "RentConfPopupLaterBtn", this.conf.RentConfPopupLaterBtn);
            this.getScenObj().appendChild(this.rentConfPopupLaterBtn.getObj());
            this.rentConfPopupNowBtnStatus =
                this.conf.RentConfPopupNowBtnDefaultStatus;
            this.rentConfPopupLaterBtnStatus = this.conf.RentConfPopupLaterBtnDefaultStatus;
            this.rentConfPopupSelectedButton = 0;
            fw.log.info("ScenarioRentConfirmPopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioRentConfirmPopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            this.rentConfPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RentConfPopupTitleTxtStaticContent));
            this.rentConfPopupLabel1Txt.setTxt(eval("this.parentObj.messages." +
                this.conf.RentConfPopupLabel1TxtStaticContent));
            this.rentConfPopupLabel2Txt.setTxt(eval("this.parentObj.messages." + this.conf.RentConfPopupLabel2TxtStaticContent));
            if (_conf.itemTitle != null && (_conf.itemTitle != undefined && _conf.itemTitle != ""))this.rentConfPopupItemTitleTxt.setTxt(_conf.itemTitle); else this.rentConfPopupItemTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RentConfPopupDefaulItemTitleTxt));
            _conf.hasLiveVideo == "Y" ? this.hasLiveVideo = true : this.hasLiveVideo = false;
            this.rentConfPopupNowBtn.setTxt(eval("this.parentObj.messages." +
                this.conf.RentConfPopupNowBtnTxtStaticContent));
            this.rentConfPopupLaterBtn.setTxt(eval("this.parentObj.messages." + this.conf.RentConfPopupLaterBtnTxtStaticContent));
            this.rentConfPopupSelectedButton = 0;
            this.rentConfPopupNowBtn.focusOn();
            this.rentConfPopupLaterBtn.focusOff();
            setTimeout(function () {
                fw.keys.unlock()
            }, 500)
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioRentConfirmPopup";
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
                    if (this.rentConfPopupSelectedButton == 0)this.closePopUP(this.rentConfPopupNowBtnStatus); else this.closePopUP(this.rentConfPopupLaterBtnStatus);
                    break;
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    this.closePopUP(null);
                    break;
                case fw.keys.code.RADIO:
                    this.closePopUP(null);
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.MENU:
                    this.closePopUP(null);
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.GIDS:
                    this.closePopUP(null);
                    fw.mwManager.openEPG("DEFAULT",
                        "");
                    break;
                case fw.keys.code.TV:
                    this.closePopUP(null);
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (this.hasLiveVideo && fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp();
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (this.hasLiveVideo && fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown();
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioRentConfirmPopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.rentConfPopupSelectedButton = _pos;
            if (_pos == 0) {
                this.rentConfPopupNowBtn.focusOn();
                this.rentConfPopupLaterBtn.focusOff()
            } else if (_pos == 1) {
                this.rentConfPopupNowBtn.focusOff();
                this.rentConfPopupLaterBtn.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioRentConfirmPopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod =
                "closePopUP";
            ex.errClass = "ScenarioRentConfirmPopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }
});
