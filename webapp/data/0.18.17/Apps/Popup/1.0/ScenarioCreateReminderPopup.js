var ScenarioCreateReminderPopup = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        try {
            fw.log.info("ScenarioCreateReminderPopup - initialize START");
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var bg = new Image(this.getScenObj().id + "RemPopupBkgImg", this.conf.RemPopupBkgImg);
            bg.setUrl(this.conf.RemPopupBkgImg.url);
            this.getScenObj().appendChild(bg.getObj());
            var icon = new Image(this.getScenObj().id + "RemPopupIcon", this.conf.RemPopupIcon);
            icon.setUrl(this.conf.RemPopupIcon.url);
            this.getScenObj().appendChild(icon.getObj());
            this.remPopupTitleTxt = new Text(this.getScenObj().id + "RemPopupTitleTxt", this.conf.RemPopupTitleTxt);
            this.getScenObj().appendChild(this.remPopupTitleTxt.getObj());
            this.remPopupPrgTitleTxt = new Text(this.getScenObj().id + "RemPopupPrgTitleTxt", this.conf.RemPopupPrgTitleTxt);
            this.getScenObj().appendChild(this.remPopupPrgTitleTxt.getObj());
            this.remPopupPrgTimeTxt = new Text(this.getScenObj().id + "RemPopupPrgTimeTxt", this.conf.RemPopupPrgTimeTxt);
            this.getScenObj().appendChild(this.remPopupPrgTimeTxt.getObj());
            this.remPopupPrgDateTxt = new Text(this.getScenObj().id + "RemPopupPrgDateTxt", this.conf.RemPopupPrgDateTxt);
            this.getScenObj().appendChild(this.remPopupPrgDateTxt.getObj());
            this.remPopupPrgChanTxt = new Text(this.getScenObj().id + "RemPopupPrgChanTxt", this.conf.RemPopupPrgChanTxt);
            this.getScenObj().appendChild(this.remPopupPrgChanTxt.getObj());
            this.remPopupSwitchImmLblTxt = new Text(this.getScenObj().id + "RemPopupSwitchImmLblTxt", this.conf.RemPopupSwitchImmLblTxt);
            this.getScenObj().appendChild(this.remPopupSwitchImmLblTxt.getObj());
            this.remPopupSwitchImmTxt = new Text(this.getScenObj().id + "RemPopupSwitchImmTxt", this.conf.RemPopupSwitchImmTxt);
            this.getScenObj().appendChild(this.remPopupSwitchImmTxt.getObj());
            this.remPopupTimeStartLblTxt = new Text(this.getScenObj().id + "RemPopupTimeStartLblTxt", this.conf.RemPopupTimeStartLblTxt);
            this.getScenObj().appendChild(this.remPopupTimeStartLblTxt.getObj());
            this.remPopupTimeStartMinTxt = new Text(this.getScenObj().id + "RemPopupTimeStartMinTxt", this.conf.RemPopupTimeStartMinTxt);
            this.getScenObj().appendChild(this.remPopupTimeStartMinTxt.getObj());
            this.remPopupSwitchImmLeftBtn = new Button(this.getScenObj().id + "RemPopupSwitchImmLeftBtn", this.conf.RemPopupSwitchImmLeftBtn);
            this.getScenObj().appendChild(this.remPopupSwitchImmLeftBtn.getObj());
            this.remPopupSwitchImmRightBtn = new Button(this.getScenObj().id + "RemPopupSwitchImmRightBtn", this.conf.RemPopupSwitchImmRightBtn);
            this.getScenObj().appendChild(this.remPopupSwitchImmRightBtn.getObj());
            this.remPopupTimeStartBtn = new ButtonHighlighted(this.getScenObj().id + "RemPopupTimeStartBtn", this.conf.RemPopupTimeStartBtn);
            this.getScenObj().appendChild(this.remPopupTimeStartBtn.getObj());
            this.remPopupOKBtn = new Button(this.getScenObj().id + "RemPopupOKBtn", this.conf.RemPopupOKBtn);
            this.getScenObj().appendChild(this.remPopupOKBtn.getObj());
            this.remPopupKOBtn = new Button(this.getScenObj().id + "RemPopupKOBtn", this.conf.RemPopupKOBtn);
            this.getScenObj().appendChild(this.remPopupKOBtn.getObj());
            fw.log.info("ScenarioCreateReminderPopup - initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, init: function (_conf) {
        try {
            fw.log.info("ScenarioCreateReminderPopup - init START");
            this.switchImmediatelyVal = false;
            this.timeToStartMinsVal = this.conf.RemPopupTimeStartMinsDefaultValue;
            this.firstTypingOnTimeStartBtnFocusOn = true;
            this.remPopupPrgDateTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupDefaultPrgDateTxt));
            this.currentSelectedPos = 0;
            this.remPopupSelectedButton = 0;
            this.remPopupTimeStartBtn.hideHighlighted();
            this.remPopupTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupTitleTxtStaticContent));
            this.remPopupSwitchImmLblTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupSwitchImmLblTxtStaticContent));
            this.remPopupTimeStartLblTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupTimeStartLblTxtStaticContent));
            this.remPopupTimeStartMinTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupTimeStartMinTxtStaticContent));
            if (_conf.prgTitle != null && (_conf.prgTitle != undefined && _conf.prgTitle != ""))this.remPopupPrgTitleTxt.setTxt(_conf.prgTitle.slice(0, this.conf.RemPopupPrgTitleTxtMaxLength));
            else this.remPopupPrgTitleTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupDefaultPrgTitleTxt).slice(0, this.conf.RemPopupPrgTitleTxtMaxLength));
            this.remPopupPrgTimeTxt.setTxt(this.formatPrgStartEndTime(_conf.prgStart, _conf.prgEnd));
            if (_conf.prgStart != null && (_conf.prgStart != undefined && _conf.prgStart != ""))this.remPopupPrgDateTxt.setTxt(fw.util.getDayNumLit(_conf.prgStart));
            if (_conf.prgChannel != null && (_conf.prgChannel != undefined && _conf.prgChannel != ""))this.remPopupPrgChanTxt.setTxt(_conf.prgChannel.slice(0,
                this.conf.RemPopupPrgChanTxtMaxLength)); else this.remPopupPrgChanTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupDefaultPrgChanTxt).slice(0, this.conf.RemPopupPrgChanTxtMaxLength));
            if (_conf.switchImmediatelyFlag) {
                this.switchImmediatelyVal = _conf.switchImmediatelyFlag;
                this.remPopupSwitchImmTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupSwitchImmTxtStaticContentTrue))
            } else this.remPopupSwitchImmTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupSwitchImmTxtStaticContentFalse));
            if (_conf.timeToStartMins != null && (_conf.timeToStartMins != undefined && _conf.timeToStartMins != ""))this.timeToStartMinsVal = "" + _conf.timeToStartMins;
            this.remPopupTimeStartBtn.setTxt(this.timeToStartMinsVal);
            this.remPopupSwitchImmLeftBtn.setTxt("&lt");
            this.remPopupSwitchImmRightBtn.setTxt("&gt");
            this.remPopupOKBtn.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupOKBtnStaticContent));
            this.remPopupKOBtn.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupKOBtnStaticContent));
            this.remPopupSelectedButton =
                0;
            this.remPopupOKBtn.focusOn();
            this.remPopupKOBtn.focusOff();
            this.remPopupTimeStartBtn.focusOff();
            this.remPopupSwitchImmLeftBtn.focusOff();
            this.remPopupSwitchImmRightBtn.focusOff();
            fw.log.info("ScenarioCreateReminderPopup - init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.UP:
                    switch (this.remPopupSelectedButton) {
                        case 0:
                            this.switchButton(2);
                            break;
                        case 1:
                            this.switchButton(0);
                            break;
                        case 2:
                            this.switchButton(3);
                            break;
                        case 3:
                            this.switchButton(3);
                            break;
                        case 4:
                            this.switchButton(4);
                            break
                    }
                    break;
                case fw.keys.code.DOWN:
                    switch (this.remPopupSelectedButton) {
                        case 0:
                            this.switchButton(1);
                            break;
                        case 1:
                            this.switchButton(1);
                            break;
                        case 2:
                            this.switchButton(0);
                            break;
                        case 3:
                            this.switchButton(2);
                            break;
                        case 4:
                            this.switchButton(2);
                            break
                    }
                    break;
                case fw.keys.code.LEFT:
                    switch (this.remPopupSelectedButton) {
                        case 0:
                            this.switchButton(0);
                            break;
                        case 1:
                            this.switchButton(1);
                            break;
                        case 2:
                            switch (this.timeToStartMinsVal.length) {
                                case 0:
                                    break;
                                case 1:
                                    this.doHighlightButton(1, this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break;
                                case 2:
                                    this.doHighlightButton(0.5, this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break;
                                case 3:
                                    this.doHighlightButton(0, this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break
                            }
                            break;
                        case 3:
                            this.switchButton(3);
                            break;
                        case 4:
                            this.switchButton(3);
                            break
                    }
                    break;
                case fw.keys.code.RIGHT:
                    switch (this.remPopupSelectedButton) {
                        case 0:
                            this.switchButton(0);
                            break;
                        case 1:
                            this.switchButton(1);
                            break;
                        case 2:
                            switch (this.timeToStartMinsVal.length) {
                                case 0:
                                    break;
                                case 1:
                                    this.doHighlightButton(1, this.currentSelectedPos, this.timeToStartMinsVal.length, true);
                                    break;
                                case 2:
                                    this.doHighlightButton(0.5, this.currentSelectedPos, this.timeToStartMinsVal.length, true);
                                    break;
                                case 3:
                                    this.doHighlightButton(0, this.currentSelectedPos, this.timeToStartMinsVal.length, true);
                                    break
                            }
                            break;
                        case 3:
                            this.switchButton(4);
                            break;
                        case 4:
                            this.switchButton(4);
                            break
                    }
                    break;
                case fw.keys.code.OK:
                    switch (this.remPopupSelectedButton) {
                        case 0:
                            this.closePopUP({
                                "switchImmediate": this.switchImmediatelyVal,
                                "timeToStartMins": parseInt(this.timeToStartMinsVal)
                            });
                            break;
                        case 1:
                            this.closePopUP(null);
                            break;
                        case 3:
                        case 4:
                            this.changeSwitchImmediatelyVal();
                            break
                    }
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
                    if (this.remPopupSelectedButton ==
                        2) {
                        var numbersMap = new Array;
                        numbersMap[48] = "0";
                        numbersMap[49] = "1";
                        numbersMap[50] = "2";
                        numbersMap[51] = "3";
                        numbersMap[52] = "4";
                        numbersMap[53] = "5";
                        numbersMap[54] = "6";
                        numbersMap[55] = "7";
                        numbersMap[56] = "8";
                        numbersMap[57] = "9";
                        if (this.firstTypingOnTimeStartBtnFocusOn) {
                            this.timeToStartMinsVal = numbersMap[_evt.keyCode];
                            this.remPopupTimeStartBtn.setTxt(this.timeToStartMinsVal);
                            this.firstTypingOnTimeStartBtnFocusOn = false;
                            this.currentSelectedPos = 0;
                            this.remPopupTimeStartBtn.hideHighlighted()
                        } else if (this.timeToStartMinsVal.length <
                            this.conf.RemPopupTimeStartBtn.maxSizeHighlight) {
                            this.timeToStartMinsVal = this.insertNumber(this.currentSelectedPos, numbersMap[_evt.keyCode], this.timeToStartMinsVal);
                            this.remPopupTimeStartBtn.setTxt(this.timeToStartMinsVal);
                            if (this.currentSelectedPos > 0)switch (this.timeToStartMinsVal.length) {
                                case 1:
                                    this.doHighlightButton(1, this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break;
                                case 2:
                                    this.doHighlightButton(0.5, this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break;
                                case 3:
                                    this.doHighlightButton(0,
                                        this.currentSelectedPos, this.timeToStartMinsVal.length, false);
                                    break
                            }
                            break
                        }
                    }
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, switchButton: function (_pos) {
        try {
            this.remPopupSelectedButton = _pos;
            switch (_pos) {
                case 0:
                    this.remPopupOKBtn.focusOn();
                    this.remPopupKOBtn.focusOff();
                    this.remPopupTimeStartBtn.focusOff();
                    this.remPopupSwitchImmLeftBtn.focusOff();
                    this.remPopupSwitchImmRightBtn.focusOff();
                    break;
                case 1:
                    this.remPopupOKBtn.focusOff();
                    this.remPopupKOBtn.focusOn();
                    this.remPopupTimeStartBtn.focusOff();
                    this.remPopupSwitchImmLeftBtn.focusOff();
                    this.remPopupSwitchImmRightBtn.focusOff();
                    break;
                case 2:
                    this.remPopupOKBtn.focusOff();
                    this.remPopupKOBtn.focusOff();
                    this.remPopupTimeStartBtn.focusOn();
                    this.remPopupSwitchImmLeftBtn.focusOff();
                    this.remPopupSwitchImmRightBtn.focusOff();
                    this.firstTypingOnTimeStartBtnFocusOn = true;
                    break;
                case 3:
                    this.remPopupOKBtn.focusOff();
                    this.remPopupKOBtn.focusOff();
                    this.remPopupTimeStartBtn.focusOff();
                    this.remPopupSwitchImmLeftBtn.focusOn();
                    this.remPopupSwitchImmRightBtn.focusOff();
                    break;
                case 4:
                    this.remPopupOKBtn.focusOff();
                    this.remPopupKOBtn.focusOff();
                    this.remPopupTimeStartBtn.focusOff();
                    this.remPopupSwitchImmLeftBtn.focusOff();
                    this.remPopupSwitchImmRightBtn.focusOn();
                    break
            }
        } catch (ex) {
            ex.errMethod = "switchButton";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, closePopUP: function (_resultObj) {
        try {
            var inputObj = this.parentObj.inputObj;
            this.parentObj.inputObj.callbackMethod.apply(this.parentObj.inputObj.callbackObj, new Array(_resultObj,
                this.parentObj.inputObj.callerCallbackObj, this.parentObj.inputObj.callerCallbackMethod))
        } catch (ex) {
            ex.errMethod = "closePopUP";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, formatPrgStartEndTime: function (_prgStart, _prgEnd) {
        try {
            var prgStart = eval("this.parentObj.messages." + this.conf.RemPopupDefaultPrgTimeTxt);
            var prgEnd = prgStart;
            if (_prgStart != null && (_prgStart != undefined && _prgStart != ""))prgStart = fw.util.getHourMinTime(_prgStart);
            if (_prgEnd != null && (_prgEnd != undefined && _prgEnd != ""))prgEnd = fw.util.getHourMinTime(_prgEnd);
            return prgStart + " - " + prgEnd
        } catch (ex) {
            ex.errMethod = "formatPrgStartEndTime";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, changeSwitchImmediatelyVal: function () {
        try {
            if (this.switchImmediatelyVal) {
                this.switchImmediatelyVal = false;
                this.remPopupSwitchImmTxt.setTxt(eval("this.parentObj.messages." + this.conf.RemPopupSwitchImmTxtStaticContentFalse))
            } else {
                this.switchImmediatelyVal = true;
                this.remPopupSwitchImmTxt.setTxt(eval("this.parentObj.messages." +
                    this.conf.RemPopupSwitchImmTxtStaticContentTrue))
            }
        } catch (ex) {
            ex.errMethod = "changeSwitchImmediatelyVal";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, doHighlightButton: function (_offsetStartPos, _curSelPos, _numLength, _deSelect) {
        try {
            if (_deSelect)if (_curSelPos > 0)_curSelPos--; else; else if (_curSelPos < _numLength)_curSelPos++;
            if (_curSelPos == 0)this.remPopupTimeStartBtn.hideHighlighted(); else {
                this.remPopupTimeStartBtn.posHighlight(_offsetStartPos, _curSelPos, _numLength);
                this.remPopupTimeStartBtn.showHighlighted()
            }
            this.currentSelectedPos =
                _curSelPos
        } catch (ex) {
            ex.errMethod = "doHighlightButton";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }, insertNumber: function (_pos, _enteredNum, _oldStringNumber) {
        try {
            var newStringNumber = "";
            if (_pos == 1 && _oldStringNumber.length > 1)newStringNumber = _oldStringNumber.substring(0, _pos) + _enteredNum + _oldStringNumber.substring(_pos); else newStringNumber = _oldStringNumber.substr(_pos) + _enteredNum + _oldStringNumber.substring(0, _pos);
            return newStringNumber
        } catch (ex) {
            ex.errMethod = "insertNumber";
            ex.errClass = "ScenarioCreateReminderPopup";
            fw.err(ex)
        }
    }
});
