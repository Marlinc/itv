var ModuleZapbannerMini = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            var _this = this;
            this.lastSettedIcon = null;
            this.zapBannerMiniBg = cssUtil.addElementToDom(Image, "zapBannerMiniBg", this.conf.zapBannerMiniBg, this.getModObj());
            this.zapBannerMiniChannelNumber = cssUtil.addElementToDom(Text, "zapBannerMiniChannelNumber", this.conf.zapBannerMiniChannelNumber, this.getModObj());
            this.zapBannerMiniVodRect = cssUtil.addElementToDom(Rect,
                "zapBannerMiniVodRect", this.conf.zapBannerMiniVodRect, this.getModObj());
            this.zapBannerMiniTime = cssUtil.addElementToDom(Text, "zapBannerMiniTime", this.conf.zapBannerMiniTime, this.getModObj());
            this.zapBannerMiniTitle = cssUtil.addElementToDom(Text, "zapBannerMiniTitle", this.conf.zapBannerMiniTitle, this.getModObj());
            this.zapBannerMiniVodTime = cssUtil.addElementToDom(Text, "zapBannerMiniVodTime", this.conf.zapBannerMiniVodTime, this.getModObj());
            this.zapBannerMiniCurrPos = cssUtil.addElementToDom(Text, "zapBannerMiniCurrPos",
                this.conf.zapBannerMiniCurrPos, this.getModObj());
            this.zapBannerMiniPlaySpeed = cssUtil.addElementToDom(Text, "zapBannerMiniPlaySpeed", this.conf.zapBannerMiniPlaySpeed, this.getModObj());
            this.zapBannerMiniChannelRect = cssUtil.addElementToDom(Rect, "zapBannerMiniChannelRect", this.conf.zapBannerMiniChannelRect, this.getModObj());
            this.zapBannerMiniSkipToTimeRect = cssUtil.addElementToDom(SkipTimeTxt, "zapBannerMiniSkipToTimeRect", this.conf.zapBannerMiniSkipToTimeRect, this.getModObj());
            this.zapBannerMiniTPImage =
                cssUtil.addElementToDom(Image, "zapBannerMiniTPImage", this.conf.zapBannerMiniTPImage, this.getModObj());
            this.zapBannerMiniChannelLogoImage = cssUtil.addElementToDom(Image, "zapBannerMiniChannelLogoImage", this.conf.zapBannerMiniChannelLogoImage, this.getModObj());
            this.zapBannerMiniProgressBar = cssUtil.addElementToDom(ProgressBar, "zapBannerMiniProgressBar", this.conf.pbItemCont, this.getModObj());
            this.loadZapbannerFooter();
            this.timerTimeZapbanner = setTimeout(function () {
                _this.setZapbannerDate(_this)
            }, 1E3)
        } catch (ex) {
            ex.errMethod =
                "initialize";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setVodTitle: function (_ItemInfoTitleTxt) {
        try {
            this.zapBannerMiniTitle.setTxt(_ItemInfoTitleTxt)
        } catch (ex) {
            ex.errMethod = "setVodTitle";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setChannelLogoImageUrl: function (_url) {
        try {
            this.zapBannerMiniChannelLogoImage.setUrl(_url)
        } catch (ex) {
            ex.errMethod = "setChannelLogoImageUrl";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setChannelName: function (_txt) {
        try {
            this.zapBannerMiniChannelName.setTxt(_txt)
        } catch (ex) {
            ex.errMethod =
                "setChannelName";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setChannelNumber: function (_txt) {
        try {
            this.zapBannerMiniChannelNumber.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setChannelNumber";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setVodTime: function (_ItemInfoDescTxt) {
        try {
            this.zapBannerMiniVodTime.setTxt(_ItemInfoDescTxt)
        } catch (ex) {
            ex.errMethod = "setVodTime";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setCurrentPosTime: function (_ItemInfoDescTxt) {
        try {
            this.zapBannerMiniCurrPos.setTxt(_ItemInfoDescTxt)
        } catch (ex) {
            ex.errMethod =
                "setCurrentPosTime";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setZapbannerDate: function (_this) {
        try {
            if (this.timerTimeZapbanner)fw.util.clearTimeout(this.timerTimeZapbanner);
            var sep = "&nbsp;";
            if (_this.separator == undefined || !_this.separator) {
                sep = ":";
                _this.separator = true
            } else {
                sep = "&nbsp;";
                _this.separator = false
            }
            var minutes = (new Date).getMinutes();
            if (minutes < 10)minutes = "0" + minutes;
            _this.zapBannerMiniTime.setTxt((new Date).getHours() + sep + minutes);
            _this.timerTimeZapbanner = fw.util.setTimeout(function () {
                    _this.setZapbannerDate(_this)
                },
                1E3)
        } catch (ex) {
            ex.errMethod = "setZapbannerDate";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, getFormattedVodRuntime: function (_millisecsTime) {
        try {
            var secs = _millisecsTime / 1E3;
            var hours = parseInt(secs / 3600);
            var min = 0;
            if (secs - hours * 3600 > 0)min = parseInt((secs - hours * 3600) / 60); else min = 0;
            return "00:00-" + (hours <= 9 ? "0" + hours : hours) + ":" + (min <= 9 ? "0" + min : min)
        } catch (ex) {
            ex.errMethod = "getFormattedVodRuntime";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, getFormattedVodRuntimeString: function (_millisecsTime) {
        try {
            var secs =
                _millisecsTime / 1E3;
            var hours = parseInt(secs / 3600);
            var min = 0;
            if (secs - hours * 3600 > 0)min = parseInt((secs - hours * 3600) / 60); else min = 0;
            return (hours <= 9 ? "0" + hours : hours) + ":" + (min <= 9 ? "0" + min : min)
        } catch (ex) {
            ex.errMethod = "getFormattedVodRuntimeString";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setSkipToTimeLabel: function (_txt) {
        try {
            this.zapBannerMiniSkipToTimeRect.setText(_txt)
        } catch (ex) {
            ex.errMethod = "setSkipToTimeLabel";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, hideBackgroundImage: function () {
        try {
            this.zapBannerMiniBg.hide()
        } catch (ex) {
            ex.errMethod =
                "hideBackgroundImage";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, showBackgroundImage: function () {
        try {
            this.zapBannerMiniBg.show()
        } catch (ex) {
            ex.errMethod = "showBackgroundImage";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, hideSkipTimeElement: function () {
        try {
            this.zapBannerMiniSkipToTimeRect.hide();
            this.zapBannerMiniSkipToTimeRect.setIndex(6);
            this.zapBannerMiniSkipToTimeRect.setLabel("")
        } catch (ex) {
            ex.errMethod = "hideSkipTimeElement";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, loadZapbannerFooter: function () {
        try {
            this.buttonOkZapbannerMini =
                cssUtil.addElementToDom(Image, "buttonOk", this.conf.zapBannerFooterConf.buttonOkZapbannerMini, this.getModObj());
            this.buttonOkTxtZapbannerMini = cssUtil.addElementToDom(Text, "buttonOkTxt", this.conf.zapBannerFooterConf.buttonOkTxtZapbannerMini, this.getModObj());
            this.buttonYellowZapbannerMini = cssUtil.addElementToDom(Image, "buttonYellow", this.conf.zapBannerFooterConf.buttonYellowZapbannerMini, this.getModObj());
            this.buttonYellowTxtZapbannerMini = cssUtil.addElementToDom(Text, "buttonYellowTxt", this.conf.zapBannerFooterConf.buttonYellowTxtZapbannerMini,
                this.getModObj());
            this.buttonYellowTxtZapbannerMini.setTxt(this.conf.zapBannerFooterConf.buttonYellowTxtZapbannerMini.txt)
        } catch (ex) {
            ex.errMethod = "loadZapbannerFooter";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setZapbannerYellowButtonFooterTxt: function (_txt) {
        try {
            this.buttonYellowTxtZapbannerMini.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setZapbannerYellowButtonFooterTxt";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setZapbannerOkButtonFooterTxt: function (_txt) {
        try {
            this.buttonOkTxtZapbannerMini.setTxt(_txt)
        } catch (ex) {
            ex.errMethod =
                "setZapbannerOkButtonFooterTxt";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, hideOkButtonFooter: function () {
        try {
            this.buttonOkZapbannerMini.hide();
            this.buttonOkTxtZapbannerMini.hide()
        } catch (ex) {
            ex.errMethod = "hideOkButtonFooter";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, showOkButtonFooter: function () {
        try {
            this.buttonOkZapbannerMini.show();
            this.buttonOkTxtZapbannerMini.show()
        } catch (ex) {
            ex.errMethod = "showOkButtonFooter";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setMediaSpeed: function (_string) {
        try {
            this.setMediaSpeedValue(_string);
            var _this = this;
            this.zapBannerSpeed = _string
        } catch (ex) {
            ex.errMethod = "setMediaSpeed";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setMediaSpeedValue: function (_string) {
        try {
            this.zapBannerMiniPlaySpeed.setTxt(_string != undefined && (_string != null && _string != "") ? "x" + _string : "")
        } catch (ex) {
            ex.errMethod = "setMediaSpeedValue";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setTrickPlayIcon: function (_tpAction) {
        try {
            if (_tpAction == "")this.zapBannerMiniTPImage.setUrl("./Apps/Common/Resources/Images/1.0/1pixelclear.png");
            else if (this.lastSettedIcon == null || _tpAction != this.lastSettedIcon) {
                this.zapBannerMiniTPImage.setUrl("./Apps/Common/Resources/Images/1.0/trickPlay/tp_" + _tpAction + ".png");
                this.lastSettedIcon = _tpAction
            }
        } catch (ex) {
            ex.errMethod = "setTrickPlayIcon";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, getSkipValue: function () {
        try {
            var res = [this.zapBannerMiniSkipToTimeRect.getHours(), this.zapBannerMiniSkipToTimeRect.getMins(), this.zapBannerMiniSkipToTimeRect.getSecs()];
            return res
        } catch (ex) {
            ex.errMethod = "getSkipValue";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }, setProgressBarCache: function (_value, _total) {
        try {
            fw.log.info("set progress bar cache : " + _value + " - _total : " + _total);
            this.zapBannerMiniProgressBar.setPercentage(_value, _total)
        } catch (ex) {
            ex.errMethod = "setProgressBarCache";
            ex.errClass = "ModuleZapbannerMini";
            fw.err(ex)
        }
    }
});
