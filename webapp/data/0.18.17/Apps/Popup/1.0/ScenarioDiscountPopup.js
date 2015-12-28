var ScenarioDiscountPopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioDiscountPopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "DiscPopupBkgImg", this.conf.DiscPopupBkgImg);
            bg.setUrl(this.conf.DiscPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.discPopupTitleTxt = new Text(this.getScenObj().id + "DiscPopupTitleTxt", this.conf.DiscPopupTitleTxt);
            this.getScenObj().appendChild(this.discPopupTitleTxt.getObj());
            this.discPopupLabel1Txt = new TextArea(this.getScenObj().id + "DiscPopupLabel1Txt", this.conf.DiscPopupLabel1Txt);
            this.getScenObj().appendChild(this.discPopupLabel1Txt.getObj());
            this.discPopupLabel2Txt = new TextArea(this.getScenObj().id + "DiscPopupLabel2Txt", this.conf.DiscPopupLabel2Txt);
            this.getScenObj().appendChild(this.discPopupLabel2Txt.getObj());
            this.discPopupItemTitleTxt = new TextArea(this.getScenObj().id + "DiscPopupItemTitleTxt", this.conf.DiscPopupItemTitleTxt);
            this.getScenObj().appendChild(this.discPopupItemTitleTxt.getObj());
            this.discPopupPriceTxt = new TextArea(this.getScenObj().id + "DiscPopupPriceTxt", this.conf.DiscPopupPriceTxt);
            this.getScenObj().appendChild(this.discPopupPriceTxt.getObj());
            this.discPopupPriceLblTxt = new TextArea(this.getScenObj().id + "DiscPopupPriceLblTxt", this.conf.DiscPopupPriceLblTxt);
            this.getScenObj().appendChild(this.discPopupPriceLblTxt.getObj());
            this.discPopupPincodeBtn = new PinButton(this.getScenObj().id + "DiscPopupPincodeBtn", this.conf.DiscPopupPincodeBtn);
            this.getScenObj().appendChild(this.discPopupPincodeBtn.getObj());
            if (fw.mwManager.isPurchasePINEnabled() == false)this.discPopupPincodeBtn.hidePinStructure();
            this.discPopupCancelBtn = new Button(this.getScenObj().id + "DiscPopupCancelBtn", this.conf.DiscPopupCancelBtn);
            this.getScenObj().appendChild(this.discPopupCancelBtn.getObj());
            this.discPopupSelectedButton = 0;
            this.numbersMap = new Array;
            this.numbersMap[48] = "0";
            this.numbersMap[49] = "1";
            this.numbersMap[50] = "2";
            this.numbersMap[51] = "3";
            this.numbersMap[52] = "4";
            this.numbersMap[53] = "5";
            this.numbersMap[54] = "6";
            this.numbersMap[55] = "7";
            this.numbersMap[56] = "8";
            this.numbersMap[57] = "9";
            fw.log.info("ScenarioDiscountPopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioDiscountPopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioDiscountPopup - init START");
            this.enteredPin = "";
            this.voucherPin = "";
            this.itemDiscountPrice = 0;
            this.discPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupTitleTxtStaticContent));
            this.discPopupLabel1Txt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupLabel1TxtStaticContent));
            this.discPopupLabel2Txt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupLabel2TxtStaticContent));
            this.discPopupPriceLblTxt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupPriceLblTxtStaticContent));
            if (_conf.itemTitle != null && (_conf.itemTitle != undefined && _conf.itemTitle != ""))this.discPopupItemTitleTxt.setTxt(_conf.itemTitle.slice(0, this.conf.DiscPopupItemTitleTxtMaxLength));
            else this.discPopupItemTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupItemTitleTxtDefault));
            if (_conf.itemDiscountPrice != null && (_conf.itemDiscountPrice != undefined && _conf.itemDiscountPrice != ""))this.discPopupPriceTxt.setTxt(fw.util.formatPrice(_conf.itemDiscountPrice)); else this.discPopupPriceTxt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupPriceTxtDefault));
            this.discPopupPincodeBtn.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupPincodeBtnTxtStaticContent));
            this.discPopupPincodeBtn.setPin(this.enteredPin);
            this.discPopupCancelBtn.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupCancelBtnTxtStaticContent));
            this.discPopupSelectedButton = 0;
            this.discPopupPincodeBtn.focusOn();
            this.discPopupCancelBtn.focusOff();
            _conf.hasLiveVideo == "Y" ? this.hasLiveVideo = true : this.hasLiveVideo = false;
            if (_conf.itemDiscountPrice != undefined && _conf.itemDiscountPrice != null)this.itemDiscountPrice = _conf.itemDiscountPrice;
            if (_conf.voucherPin != undefined && _conf.voucherPin != null)this.voucherPin =
                _conf.voucherPin;
            fw.log.info("ScenarioDiscountPopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioDiscountPopup";
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
                    this.enteredPin = "";
                    this.discPopupPincodeBtn.setPin(this.enteredPin);
                    this.switchButton(1);
                    break;
                case fw.keys.code.OK:
                    switch (this.discPopupSelectedButton) {
                        case 0:
                            if (fw.mwManager.isPurchasePINEnabled() == false) {
                                fw.keys.lock();
                                this.closePopUP(true)
                            }
                            break;
                        case 1:
                            this.closePopUP(null);
                            break
                    }
                    break;
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    this.closePopUP(null);
                    fw.appManager.goToHtmlApp("Help", "DefaultSkin", new Array("scenariohelp", "Popup", "Pincode", this.parentObj.inputObj), false, true);
                    break;
                case fw.keys.code.MENU:
                    this.closePopUP(null);
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.EPG:
                    this.closePopUP(null);
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.LEFT:
                    if (this.enteredPin.length > 0 && this.enteredPin.length <
                        this.discPopupPincodeBtn.getPinLength()) {
                        this.enteredPin = this.enteredPin.substring(0, this.enteredPin.length - 1);
                        this.discPopupPincodeBtn.setPin(this.enteredPin)
                    }
                    break;
                case fw.keys.code.RADIO:
                    this.closePopUP(null);
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.TV:
                    this.closePopUP(null);
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.NUM_0:
                case fw.keys.code.NUM_1:
                case fw.keys.code.NUM_2:
                case fw.keys.code.NUM_3:
                case fw.keys.code.NUM_4:
                case fw.keys.code.NUM_5:
                case fw.keys.code.NUM_6:
                case fw.keys.code.NUM_7:
                case fw.keys.code.NUM_8:
                case fw.keys.code.NUM_9:
                    if (fw.mwManager.isPurchasePINEnabled())if (this.discPopupSelectedButton ==
                        0) {
                        this.enteredPin += this.numbersMap[_evt.keyCode];
                        this.discPopupPincodeBtn.setPin(this.enteredPin);
                        if (this.enteredPin.length == this.discPopupPincodeBtn.getPinLength())if (fw.mwManager.verifyPurchasePIN(this.enteredPin))this.closePopUP(true); else {
                            this.discPopupLabel2Txt.setTxt(eval("this.parentObj.messages." + this.conf.DiscPopupLabel2TxtPinIncorrectStaticContent));
                            this.emptyPinBtn()
                        }
                    }
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (this.hasLiveVideo)if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp();
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (this.hasLiveVideo)if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown();
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioDiscountPopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.discPopupSelectedButton = _pos;
            if (_pos == 0) {
                this.discPopupPincodeBtn.focusOn();
                this.discPopupCancelBtn.focusOff()
            } else if (_pos == 1) {
                this.discPopupPincodeBtn.focusOff();
                this.discPopupCancelBtn.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass =
                "ScenarioDiscountPopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            this.emptyPinBtn();
            var _this = this;
            var resultObj = _resultObj;
            if (_resultObj) {
                resultObj = new Object;
                resultObj.itemDiscountPrice = this.itemDiscountPrice;
                resultObj.voucherPin = this.voucherPin
            }
            fw.util.setTimeout(function () {
                    var inputObj = _this.parentObj.inputObj;
                    _this.parentObj.inputObj.callbackMethod.apply(_this.parentObj.inputObj.callbackObj, new Array(resultObj, _this.parentObj.inputObj.callerCallbackObj, _this.parentObj.inputObj.callerCallbackMethod))
                },
                400)
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioDiscountPopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, emptyPinBtn: function () {
        try {
            var _this = this;
            fw.util.setTimeout(function () {
                _this.enteredPin = "";
                _this.discPopupPincodeBtn.setPin(_this.enteredPin)
            }, 400)
        } catch (ex) {
            ex.errMethod = "emptyPinBtn";
            ex.errClass = "ScenarioDiscountPopup";
            fw.err(ex)
        }
    }
});
