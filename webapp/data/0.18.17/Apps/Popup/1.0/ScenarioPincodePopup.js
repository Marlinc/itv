var ScenarioPincodePopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioPincodePopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.dynamicConf = null;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "PinPopupBkgImg", this.conf.PinPopupBkgImg);
            bg.setUrl(this.conf.PinPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.pinPopupTitleTxt = new Text(this.getScenObj().id + "PinPopupTitleTxt", this.conf.PinPopupTitleTxt);
            this.getScenObj().appendChild(this.pinPopupTitleTxt.getObj());
            this.pinPopupLabelTxt = new TextArea(this.getScenObj().id + "PinPopupLabelTxt", this.conf.PinPopupLabelTxt);
            this.getScenObj().appendChild(this.pinPopupLabelTxt.getObj());
            this.pinPopupPincodeBtn = new PinButton(this.getScenObj().id + "PinPopupPincodeBtn", this.conf.PinPopupPincodeBtn);
            this.getScenObj().appendChild(this.pinPopupPincodeBtn.getObj());
            this.pinPopupCancelBtn = new Button(this.getScenObj().id + "PinPopupCancelBtn", this.conf.PinPopupCancelBtn);
            this.getScenObj().appendChild(this.pinPopupCancelBtn.getObj());
            this.helpImg = cssUtil.addElementToDom(Image, "helpImg", this.conf.PinPopupHelpImg, this.getScenObj());
            this.helpTxt = cssUtil.addElementToDom(Text, "helpTxt", this.conf.PinPopupHelpTxt, this.getScenObj());
            this.pinPopupSelectedButton = 0;
            this.numbersMap = new Array;
            this.numbersMap[48] = "0";
            this.numbersMap[49] = "1";
            this.numbersMap[50] = "2";
            this.numbersMap[51] = "3";
            this.numbersMap[52] = "4";
            this.numbersMap[53] = "5";
            this.numbersMap[54] = "6";
            this.numbersMap[55] =
                "7";
            this.numbersMap[56] = "8";
            this.numbersMap[57] = "9";
            fw.log.info("ScenarioPincodePopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioPincodePopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioPincodePopup - init START");
            this.enteredPin = "";
            this.dynamicConf = _conf;
            _conf.forPurchase == "Y" ? this.forPurchase = true : this.forPurchase = false;
            if (this.forPurchase) {
                this.pinPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupTitleTxtPurchaseStaticContent));
                this.pinPopupLabelTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupLabelTxtPurchaseStaticContent));
                this.pinPopupPincodeBtn.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupPincodeBtnTxtPurchaseStaticContent))
            } else {
                this.pinPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupTitleTxtParentalStaticContent));
                this.pinPopupLabelTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupLabelTxtParentalStaticContent));
                this.pinPopupPincodeBtn.setTxt(eval("this.parentObj.messages." +
                    this.conf.PinPopupPincodeBtnTxtParentalStaticContent))
            }
            this.pinPopupPincodeBtn.setPin(this.enteredPin);
            this.pinPopupCancelBtn.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupCancelBtnTxtStaticContent));
            this.pinPopupSelectedButton = 0;
            this.pinPopupPincodeBtn.focusOn();
            this.pinPopupCancelBtn.focusOff();
            _conf.hasLiveVideo == "Y" ? this.hasLiveVideo = true : this.hasLiveVideo = false;
            this.helpTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupHelpTxtStaticContent));
            this.helpImg.setUrl(this.conf.PinPopupHelpImg.url);
            fw.log.info("ScenarioPincodePopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioPincodePopup";
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
                    this.pinPopupPincodeBtn.setPin(this.enteredPin);
                    this.switchButton(1);
                    break;
                case fw.keys.code.OK:
                    if (this.pinPopupSelectedButton == 1)this.closePopUP(null);
                    break;
                case fw.keys.code.BACK:
                case fw.keys.code.HELP:
                    var inputObjToReopenPopupOnBack =
                        null;
                    if (!this.forPurchase || this.forPurchase && !fw.pcmanager.checkPCLevel(this.dynamicConf.isMoviePCSafe))inputObjToReopenPopupOnBack = this.parentObj.inputObj;
                    fw.appManager.goToHtmlApp("Help", "DefaultSkin", new Array("scenariohelp", "Popup", "Pincode", inputObjToReopenPopupOnBack), false, true);
                    break;
                case fw.keys.code.RADIO:
                    this.closePopUP(null);
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.TV:
                    this.closePopUP(null);
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.MENU:
                    this.closePopUP(null);
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.GIDS:
                    this.closePopUP(null);
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.LEFT:
                    if (this.enteredPin.length > 0 && this.enteredPin.length < this.pinPopupPincodeBtn.getPinLength()) {
                        this.enteredPin = this.enteredPin.substring(0, this.enteredPin.length - 1);
                        this.pinPopupPincodeBtn.setPin(this.enteredPin)
                    }
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
                    if (this.pinPopupSelectedButton ==
                        0) {
                        this.enteredPin += this.numbersMap[_evt.keyCode];
                        this.pinPopupPincodeBtn.setPin(this.enteredPin);
                        if (this.enteredPin.length == this.pinPopupPincodeBtn.getPinLength())if (this.forPurchase)if (fw.mwManager.verifyPurchasePIN(this.enteredPin))this.closePopUP(true); else {
                            this.pinPopupLabelTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupLabelTxtPurchasePinIncorrectStaticContent));
                            this.emptyPinBtn()
                        } else if (fw.pcmanager.checkPCPinFunction(this.enteredPin))this.closePopUP(true); else {
                            this.pinPopupTitleTxt.setTxt(eval("this.parentObj.messages." +
                                this.conf.PinPopupTitleTxtParentalPinIncorrectStaticContent));
                            this.pinPopupLabelTxt.setTxt(eval("this.parentObj.messages." + this.conf.PinPopupLabelTxtParentalPinIncorrectStaticContent));
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
            ex.errClass =
                "ScenarioPincodePopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.pinPopupSelectedButton = _pos;
            if (_pos == 0) {
                this.pinPopupPincodeBtn.focusOn();
                this.pinPopupCancelBtn.focusOff()
            } else if (_pos == 1) {
                this.pinPopupPincodeBtn.focusOff();
                this.pinPopupCancelBtn.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioPincodePopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            var _this = this;
            fw.util.setTimeout(function () {
                var inputObj = _this.parentObj.inputObj;
                _this.parentObj.inputObj.callbackMethod.apply(_this.parentObj.inputObj.callbackObj,
                    new Array(_resultObj, _this.parentObj.inputObj.callerCallbackObj, _this.parentObj.inputObj.callerCallbackMethod));
                fw.util.setTimeout(function () {
                    _this.emptyPinBtn()
                }, 500)
            }, 500)
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioPincodePopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, emptyPinBtn: function () {
        try {
            var _this = this;
            fw.util.setTimeout(function () {
                _this.enteredPin = "";
                _this.pinPopupPincodeBtn.setPin(_this.enteredPin)
            }, 400)
        } catch (ex) {
            ex.errMethod =
                "emptyPinBtn";
            ex.errClass = "ScenarioPincodePopup";
            fw.err(ex)
        }
    }
});
