var ScenarioVoucherPopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioVoucherPopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "VouchPopupBkgImg", this.conf.VouchPopupBkgImg);
            bg.setUrl(this.conf.VouchPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            this.vouchPopupTitleTxt = new Text(this.getScenObj().id + "VouchPopupTitleTxt", this.conf.VouchPopupTitleTxt);
            this.getScenObj().appendChild(this.vouchPopupTitleTxt.getObj());
            this.vouchPopupLabelTxt = new TextArea(this.getScenObj().id + "VouchPopupLabelTxt", this.conf.VouchPopupLabelTxt);
            this.getScenObj().appendChild(this.vouchPopupLabelTxt.getObj());
            this.popupRentalPINNameIdentifier = eval("fw.conf.popupMapping." + fw.conf.popupRentalPINName);
            this.popupMessageNameIdentifier = eval("fw.conf.popupMapping." + fw.conf.popupMessageName);
            this.vouchPopupPincodeBtn = new PinButton(this.getScenObj().id + "VouchPopupPincodeBtn", this.conf.VouchPopupPincodeBtn);
            this.getScenObj().appendChild(this.vouchPopupPincodeBtn.getObj());
            this.vouchPopupUpperCaseBtn = new Button(this.getScenObj().id + "VouchPopupUpperCaseBtn", this.conf.VouchPopupUpperCaseBtn);
            this.getScenObj().appendChild(this.vouchPopupUpperCaseBtn.getObj());
            this.vouchPopupLowerCaseBtn = new Button(this.getScenObj().id + "VouchPopupLowerCaseBtn", this.conf.VouchPopupLowerCaseBtn);
            this.getScenObj().appendChild(this.vouchPopupLowerCaseBtn.getObj());
            this.vouchPopupCancBtn = new Button(this.getScenObj().id + "VouchPopupCancBtn",
                this.conf.VouchPopupCancBtn);
            this.getScenObj().appendChild(this.vouchPopupCancBtn.getObj());
            this.vouchPopupOKBtn = new Button(this.getScenObj().id + "VouchPopupOKBtn", this.conf.VouchPopupOKBtn);
            this.getScenObj().appendChild(this.vouchPopupOKBtn.getObj());
            this.keyboardUpperCaseButtons = new Array;
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("1"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("2"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("3"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("4"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("5"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("6"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("7"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("8"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("9"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("0"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("A"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("B"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("C"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("D"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("E"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("F"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("G"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("H"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("I"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("J"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("K"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("L"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("M"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("N"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("O"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("P"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("Q"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("R"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("S"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("T"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("U"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("V"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("W"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("X"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("Y"));
            this.keyboardUpperCaseButtons.push(new KeyboardItemBtn("Z"));
            this.keyboardLowerCaseButtons = new Array;
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("1"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("2"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("3"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("4"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("5"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("6"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("7"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("8"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("9"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("0"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("a"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("b"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("c"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("d"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("e"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("f"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("g"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("h"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("i"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("j"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("k"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("l"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("m"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("n"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("o"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("p"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("q"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("r"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("s"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("t"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("u"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("v"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("w"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("x"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("y"));
            this.keyboardLowerCaseButtons.push(new KeyboardItemBtn("z"));
            this.vouchPopupKeyboardGrid = new Grid("VouchPopupKeyboardGrid", this.conf.VouchPopupKeyboardGrid, Button, this.keyboardUpperCaseButtons, null,
                null);
            this.getScenObj().appendChild(this.vouchPopupKeyboardGrid.getObj());
            this.vouchPopupSelectedButton = 0;
            fw.log.info("ScenarioVoucherPopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioVoucherPopup - init START");
            this.enteredPin = "";
            this.selectedUpperCase = true;
            this.vouchPopupLowerCaseBtn.show();
            this.vouchPopupUpperCaseBtn.hide();
            this.vouchPopupCaseBtn = this.vouchPopupLowerCaseBtn;
            this.vouchPopupTitleTxt.setTxt(eval("this.parentObj.messages." +
                this.conf.VouchPopupTitleTxtStaticContent));
            this.vouchPopupLabelTxt.setTxt(eval("this.parentObj.messages." + this.conf.VouchPopupLabelTxtStaticContent));
            this.vouchPopupPincodeBtn.setPin(this.enteredPin);
            this.vouchPopupOKBtn.setTxt(eval("this.parentObj.messages." + this.conf.VouchPopupOKBtnTxtStaticContent));
            this.vouchPopupPincodeBtn.focusOff();
            this.vouchPopupCaseBtn.focusOff();
            this.vouchPopupCancBtn.focusOff();
            this.vouchPopupOKBtn.focusOff();
            this.vouchPopupKeyboardGrid.focusOff();
            this.vouchPopupKeyboardGrid.setFocusInFirstPosition();
            this.vouchPopupKeyboardGrid.focusOn();
            this.vouchPopupSelectedButton = 1;
            _conf.hasLiveVideo == "Y" ? this.hasLiveVideo = true : this.hasLiveVideo = false;
            if (_conf.movie != undefined && _conf.movie != null)this.movie = _conf.movie;
            if (_conf.rentVODCallBack != undefined && _conf.rentVODCallBack != null)this.movie = _conf.rentVODCallBack;
            fw.log.info("ScenarioVoucherPopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.UP:
                    switch (this.vouchPopupSelectedButton) {
                        case 1:
                            this.vouchPopupKeyboardGrid.moveCursorToUp();
                            break;
                        case 2:
                        case 3:
                            this.switchButton(1);
                            break;
                        case 4:
                            this.switchButton(0);
                            break
                    }
                    break;
                case fw.keys.code.DOWN:
                    switch (this.vouchPopupSelectedButton) {
                        case 1:
                            this.checkIfLeaveGridMoveDown();
                            break;
                        case 2:
                        case 3:
                            if (this.enteredPin.length == this.vouchPopupPincodeBtn.getPinLength())this.switchButton(4);
                            break
                    }
                    break;
                case fw.keys.code.OK:
                    switch (this.vouchPopupSelectedButton) {
                        case 1:
                            if (this.enteredPin.length < this.vouchPopupPincodeBtn.getPinLength()) {
                                this.enteredPin += this.vouchPopupKeyboardGrid.getSelectedItemData().contentTitle;
                                this.vouchPopupPincodeBtn.setPin(this.enteredPin)
                            }
                            break;
                        case 2:
                            var fullPosition = this.vouchPopupKeyboardGrid.getFullPositionInGrid();
                            if (this.selectedUpperCase) {
                                this.selectedUpperCase = false;
                                this.vouchPopupLowerCaseBtn.hide();
                                this.vouchPopupUpperCaseBtn.show();
                                this.vouchPopupUpperCaseBtn.focusOn();
                                this.vouchPopupCaseBtn = this.vouchPopupUpperCaseBtn;
                                this.getScenObj().removeChild(this.vouchPopupKeyboardGrid.getObj());
                                this.vouchPopupKeyboardGrid = new Grid("VouchPopupKeyboardGrid", this.conf.VouchPopupKeyboardGrid,
                                    Button, this.keyboardLowerCaseButtons, null, null);
                                this.getScenObj().appendChild(this.vouchPopupKeyboardGrid.getObj())
                            } else {
                                this.selectedUpperCase = true;
                                this.vouchPopupUpperCaseBtn.hide();
                                this.vouchPopupLowerCaseBtn.show();
                                this.vouchPopupLowerCaseBtn.focusOn();
                                this.vouchPopupCaseBtn = this.vouchPopupLowerCaseBtn;
                                this.getScenObj().removeChild(this.vouchPopupKeyboardGrid.getObj());
                                this.vouchPopupKeyboardGrid = new Grid("VouchPopupKeyboardGrid", this.conf.VouchPopupKeyboardGrid, Button, this.keyboardUpperCaseButtons,
                                    null, null);
                                this.getScenObj().appendChild(this.vouchPopupKeyboardGrid.getObj())
                            }
                            this.vouchPopupKeyboardGrid.setFullPositionInGrid(fullPosition);
                            break;
                        case 3:
                            this.deletePinChar();
                            break;
                        case 4:
                            this.checkPinCode();
                            break
                    }
                    break;
                case fw.keys.code.LEFT:
                    switch (this.vouchPopupSelectedButton) {
                        case 0:
                            this.deletePinChar();
                            break;
                        case 1:
                            this.checkIfLeaveGridMoveLeft();
                            break;
                        case 2:
                            this.switchButton(0);
                            break;
                        case 3:
                            this.switchButton(2);
                            break
                    }
                    break;
                case fw.keys.code.RIGHT:
                    switch (this.vouchPopupSelectedButton) {
                        case 0:
                            this.vouchPopupKeyboardGrid.setFocusInFirstPosition();
                            this.switchButton(1);
                            break;
                        case 1:
                            this.vouchPopupKeyboardGrid.moveCursorToRight();
                            break;
                        case 2:
                            this.switchButton(3);
                            break
                    }
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
                    fw.mwManager.openEPG("DEFAULT", "");
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
                    break;
                case fw.keys.code.TELETEXT:
                    this.deletePinChar();
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.vouchPopupSelectedButton = _pos;
            switch (_pos) {
                case 0:
                    this.vouchPopupPincodeBtn.focusOn();
                    this.vouchPopupKeyboardGrid.focusOff();
                    this.vouchPopupCaseBtn.focusOff();
                    this.vouchPopupCancBtn.focusOff();
                    this.vouchPopupOKBtn.focusOff();
                    break;
                case 1:
                    this.vouchPopupPincodeBtn.focusOff();
                    this.vouchPopupKeyboardGrid.focusOn();
                    this.vouchPopupCaseBtn.focusOff();
                    this.vouchPopupCancBtn.focusOff();
                    this.vouchPopupOKBtn.focusOff();
                    break;
                case 2:
                    this.vouchPopupPincodeBtn.focusOff();
                    this.vouchPopupKeyboardGrid.focusOff();
                    this.vouchPopupCaseBtn.focusOn();
                    this.vouchPopupCancBtn.focusOff();
                    this.vouchPopupOKBtn.focusOff();
                    break;
                case 3:
                    this.vouchPopupPincodeBtn.focusOff();
                    this.vouchPopupKeyboardGrid.focusOff();
                    this.vouchPopupCaseBtn.focusOff();
                    this.vouchPopupCancBtn.focusOn();
                    this.vouchPopupOKBtn.focusOff();
                    break;
                case 4:
                    this.vouchPopupPincodeBtn.focusOff();
                    this.vouchPopupKeyboardGrid.focusOff();
                    this.vouchPopupCaseBtn.focusOff();
                    this.vouchPopupCancBtn.focusOff();
                    this.vouchPopupOKBtn.focusOn();
                    break
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            fw.log.debug("ScenarioVoucherPopup - closePopUP - _resultObj => ",
                _resultObj);
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj, this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, checkIfLeaveGridMoveDown: function () {
        try {
            var column = this.vouchPopupKeyboardGrid.getCursorPosition() %
                this.vouchPopupKeyboardGrid.numRows;
            var row = Math.floor(this.vouchPopupKeyboardGrid.getCursorPosition() / this.vouchPopupKeyboardGrid.numRows);
            if (row + 1 == this.vouchPopupKeyboardGrid.numRows)if (column == 0 || column == 1)this.switchButton(2); else this.switchButton(3); else this.vouchPopupKeyboardGrid.moveCursorToDown()
        } catch (ex) {
            ex.errMethod = "checkIfLeaveGridMoveDown";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, checkIfLeaveGridMoveLeft: function () {
        try {
            if (this.vouchPopupKeyboardGrid.isCursorInFirstPosition())this.switchButton(0);
            else this.vouchPopupKeyboardGrid.moveCursorToLeft()
        } catch (ex) {
            ex.errMethod = "checkIfLeaveGridMoveLeft";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, deletePinChar: function () {
        try {
            if (this.enteredPin.length > 0) {
                this.enteredPin = this.enteredPin.substring(0, this.enteredPin.length - 1);
                this.vouchPopupPincodeBtn.setPin(this.enteredPin)
            }
        } catch (ex) {
            ex.errMethod = "deletePinChar";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, checkPinCode: function () {
        try {
            if (this.enteredPin != null)fw.mwManager.getDiscountPrice(this.enteredPin,
                this.movie, this.getDiscountPriceCallBack, this, null); else this.closePopUP()
        } catch (ex) {
            ex.errMethod = "checkPinCode";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, getDiscountPriceCallBack: function (_callerCallbackParams, _isOK, _discountPrice, _errorMessage) {
        try {
            fw.log.debug("getDiscountPriceCallBack - _discountPrice", _discountPrice);
            fw.log.debug("getDiscountPriceCallBack - _errorMessage", _errorMessage);
            fw.log.debug("getDiscountPriceCallBack - _isOK", _isOK);
            var popupRentalPINNameObj = new Object;
            popupRentalPINNameObj.isValidPin =
                _isOK;
            popupRentalPINNameObj.itemTitle = this.movie.title;
            popupRentalPINNameObj.hasLiveVideo = this.hasLiveVideo;
            popupRentalPINNameObj.itemDiscountPrice = _discountPrice;
            popupRentalPINNameObj.voucherPin = this.enteredPin;
            if (_isOK)this.parentObj.switchPopup(this.popupRentalPINNameIdentifier, popupRentalPINNameObj, this.parentObj.inputObj.callerCallbackMethod, this.parentObj.inputObj.callerCallbackObj); else {
                popupRentalPINNameObj.messVoucherIncorrectObj = this.buildInputVoucherIncorrectPopupMessageObjByCode(_discountPrice,
                    _errorMessage);
                this.closePopUP(popupRentalPINNameObj)
            }
        } catch (ex) {
            ex.errMethod = "getDiscountPriceCallBack";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }, buildInputVoucherIncorrectPopupMessageObjByCode: function (_errorCode, _errorMessage) {
        try {
            var popupMessVoucherIncorrectObj = new Object;
            popupMessVoucherIncorrectObj.title = this.parentObj.messages.voucher_incorrect_popup_msg_title;
            popupMessVoucherIncorrectObj.button = this.parentObj.messages.voucher_incorrect_popup_msg_button;
            popupMessVoucherIncorrectObj.message =
                this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0136 + "(-136)";
            switch (_errorCode) {
                case -136:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0136 + "(" + _errorCode + ")";
                    break;
                case -127:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0127 + "(" + _errorCode + ")";
                    break;
                case -128:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0128 + "(" + _errorCode +
                        ")";
                    break;
                case -129:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0129 + "(" + _errorCode + ")";
                    break;
                case -130:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0130 + "(" + _errorCode + ")";
                    break;
                case -131:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0131 + "(" + _errorCode + ")";
                    break;
                case -132:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0132 +
                        "(" + _errorCode + ")";
                    break;
                case -138:
                    popupMessVoucherIncorrectObj.message = this.parentObj.messages.voucher_incorrect_popup_msg_message_CODE0138 + "(" + _errorCode + ")";
                    break
            }
            return popupMessVoucherIncorrectObj
        } catch (ex) {
            ex.errMethod = "buildInputVoucherIncorrectPopupMessageObjByCode";
            ex.errClass = "ScenarioVoucherPopup";
            fw.err(ex)
        }
    }
});
var KeyboardItemBtn = Class.create({
    initialize: function (title) {
        try {
            this.contentTitle = title
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "KeyboardItemBtn";
            fw.err(ex)
        }
    }
});
