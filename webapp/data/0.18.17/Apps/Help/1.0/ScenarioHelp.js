var ScenarioHelp = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        fw.log.info("inizialize scenarioHelp");
        try {
            $super(_prop);
            this.id = _prop.id;
            this.conf = _conf;
            this.parentObj = _parentObj;
            var _this = this;
            this.banner = null;
            this.FOCUS_MENU = 0;
            this.FOCUS_HTML_AREA = 1;
            this.FOCUS_PLAY_VIDEO_AREA = 2;
            this.loadHeader();
            this.ItemDetChanNumTxt = cssUtil.addElementToDom(ChanNumTxt, "ItemDetChanNumTxt", this.conf.ItemDetChanNumTxt, this.getScenObj());
            this.ItemDetChanNumTxt.setCallBack(this, this.vodCatChanNumTxtCallBack);
            this.breadcrumb = new Breadcrumb(this.id + "_breadcrumb", this.conf.breadcrumb);
            this.getScenObj().appendChild(this.breadcrumb.getObj());
            this.loadFooter();
            this.show()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, getCurrentInputObj: function () {
        try {
            if (this.inputObj[2] != undefined)return new Array(this.inputObj[0], this.inputObj[1], this.inputObj[2], "back"); else return this.inputObj
        } catch (ex) {
            ex.errMethod = "getCurrentInputObj";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            fw.util.setHourDataTimer(this.hourMessages,
                this.dateMessages);
            this.inputObj = _inputObj;
            this.currentFocus = this.FOCUS_MENU;
            this.showLeftFooter();
            var backFromVideoHelp = false;
            fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null);
            if (_inputObj[0].toLowerCase() == "help") {
                this.helpDirectory = _inputObj[1].helpDirectory;
                this.helpContextItem = _inputObj[1].helpDefaultItem;
                if ((this.helpDirectory == "default" || this.helpDirectory == "zapBanner") && this.helpContextItem == "PpvPurchaseConditions") {
                    this.helpDirectory = "Popup";
                    this.helpContextItem = "Voorwaarden"
                }
                this.inputObjToReopenPopupOnBack =
                    null
            } else if (_inputObj[0].toLowerCase() == "scenariohelp") {
                this.helpDirectory = _inputObj[1];
                this.helpContextItem = _inputObj[2];
                if (_inputObj[3] != null && (_inputObj[3] != undefined && _inputObj[3] != "back"))this.inputObjToReopenPopupOnBack = _inputObj[3]; else if (_inputObj[3] == null || _inputObj[3] == undefined)this.inputObjToReopenPopupOnBack = null
            } else if (_inputObj[0].toLowerCase() == "back")backFromVideoHelp = true;
            fw.log.debug("ScenarioHelp -> helpDirectory: ", this.helpDirectory);
            fw.log.debug("ScenarioHelp -> helpContextItem: ",
                this.helpContextItem);
            if (this.helpList != null && (this.helpList != undefined && (this.helpVideoPlayButton != null && this.helpVideoPlayButton != undefined))) {
                this.helpList.focusOn();
                this.helpVideoPlayButton.setUrl(this.conf.htmlAreaVideoHelp.videoHelpUnfocusedPlayUrl)
            }
            if (!backFromVideoHelp) {
                this.breadcrumb.clear();
                this.breadcrumb.push("Help");
                if (this.helpDirectory == null || this.helpDirectory == undefined) {
                    fw.log.debug("ScenarioHelp -> HelpDirectory is not defined, get default from Json");
                    this.helpContext = this.conf.helpContextConf["default"]
                } else {
                    fw.log.debug("ScenarioHelp -> HelpDirectory passed to init function is OK");
                    this.helpContext = eval("this.conf.helpContextConf." + this.helpDirectory);
                    if (this.helpContext == null || this.helpContext == undefined) {
                        fw.log.debug("Cannot find the helpContext passed, getting default from Json");
                        this.helpContext = this.conf.helpContextConf["default"]
                    }
                }
                this.menuLabel = new Array;
                this.menuLabel.length = 0;
                this.htmlPageList = new Array;
                this.htmlPageList.length = 0;
                this.defaultPageIndx = 0;
                var pageIndx = -1;
                this.movieIdArr = new Array;
                this.movieIdArr.length = 0;
                for (var i = 0; i < this.helpContext.length; i++) {
                    var object =
                        this.helpContext[i];
                    var subscriptionCheck = false;
                    var itemLeftMenu = undefined;
                    var url = undefined;
                    var defaultPageIndx = undefined;
                    var toContinue = true;
                    if (object.check != undefined)if (object.check == "routed")if (!fw.subscriberDataManager.userEnabledOTT())toContinue = false;
                    if (toContinue) {
                        itemLeftMenu = new ItemLeftMenu(object.label);
                        url = object.url;
                        if (object.pkType == undefined || fw.subscriberDataManager.checkUserPackage(object.pkType, object.pkSubtype)) {
                            fw.log.info("ScenarioHelp -> SubscriptionCheck (" + object.pkType +
                                " - " + object.pkSubtype + ") PASSED");
                            subscriptionCheck = true;
                            pageIndx++
                        } else fw.log.info("ScenarioHelp -> SubscriptionCheck (" + object.pkType + " - " + object.pkSubtype + ") NOT PASSED");
                        this.movieIdArr[i] = object.movieId;
                        if (this.helpContextItem != undefined && (this.helpContextItem != null && this.helpContextItem.length > 0)) {
                            if (object.label == this.helpContextItem)this.defaultPageIndx = pageIndx
                        } else if (object["default"] == true)if (this.defaultPageIndx == 0)this.defaultPageIndx = pageIndx;
                        if (subscriptionCheck) {
                            this.menuLabel.push(itemLeftMenu);
                            this.htmlPageList.push(url);
                            if (defaultPageIndx != undefined)this.defaultPageIndx = defaultPageIndx
                        }
                    }
                }
                if (this.defaultPageIndx == -1)this.defaultPageIndx = 0;
                if (this.helpList != undefined) {
                    this.helpList.clean();
                    this.movieId = null;
                    this.getScenObj().removeChild(this.rectHtmlArea.getObj());
                    this.getScenObj().removeChild(this.leftArrowHtmlArea.getObj());
                    this.getScenObj().removeChild(this.arrowUpHtmlArea.getObj());
                    this.getScenObj().removeChild(this.arrowDownHtmlArea.getObj())
                }
                this.helpList = new ModuleMenuList(this, this.conf.helpMenuList.cont,
                    this.conf.helpMenuList, Button, this.menuLabel, this, this.menuListCallBack, true);
                this.helpList.setMenuList(this.menuLabel);
                this.helpList.focusOn();
                this.helpList.grid.selectElementByPosition(this.defaultPageIndx);
                this.helpList.setItemSelected();
                this.breadcrumb.push(this.menuLabel[this.defaultPageIndx].contentTitle);
                this.htmlAreaStyle = this.conf.htmlArea;
                this.setHelpVideoStyleOrNot(this.defaultPageIndx);
                this.rectHtmlArea = cssUtil.addElementToDom(Rect, this.getScenObj().id + "_rectHtmlArea", this.htmlAreaStyle.rectHtmlAreaUnselected,
                    this.getScenObj());
                this.htmlArea = cssUtil.addElementToDom(HtmlArea, this.getScenObj().id + "_htmlArea", this.htmlAreaStyle, this.rectHtmlArea.getObj());
                this.htmlArea.setHtmlContent(this.htmlPageList[this.defaultPageIndx]);
                this.leftArrowHtmlArea = cssUtil.addElementToDom(Image, this.getScenObj().id + "_leftArrowHtmlArea", this.htmlAreaStyle.leftArrowHtmlArea, this.getScenObj());
                this.leftArrowHtmlArea.hide();
                this.arrowDownHtmlArea = new Image("_arrowDownHtmlArea", this.conf.arrowDownHtmlArea);
                this.arrowDownHtmlArea.setUrl(this.conf.arrowDownHtmlArea.url);
                this.getScenObj().appendChild(this.arrowDownHtmlArea.getObj());
                this.arrowUpHtmlArea = new Image("_arrowUpHtmlArea", this.conf.arrowUpHtmlArea);
                this.arrowUpHtmlArea.setUrl(this.conf.arrowUpHtmlArea.url);
                this.getScenObj().appendChild(this.arrowUpHtmlArea.getObj());
                this.arrowUpHtmlArea.getObj().hide();
                this.arrowDownHtmlArea.getObj().hide();
                this.showHideArrowDown()
            }
            fw.log.info("ScenarioHelp init END")
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, menuListCallBack: function (_TotalPosition,
                                   _domElement, _dataElement) {
        try {
            if (_dataElement.contentTitle != undefined && this.footerElem[2] != undefined)this.footerElem[1].setText(" : " + _dataElement.contentTitle)
        } catch (ex) {
            ex.errMethod = "menuListCallBack";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, callBackShowBanner: function (_callerCallbackParams, _banner) {
        try {
            this.banner = _banner
        } catch (ex) {
            ex.errMethod = "callBackShowBanner";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, setHelpVideoStyleOrNot: function (_helpItemIndex) {
        try {
            var firstTime = true;
            if (this.helpVideoBckgrnd !=
                undefined && this.helpVideoBckgrnd.getObj().parentNode != null)firstTime = false;
            this.isHelpVideoContent = this.movieIdArr[_helpItemIndex] != undefined && (this.movieIdArr[_helpItemIndex] != null && this.movieIdArr[_helpItemIndex] != "");
            if (this.isHelpVideoContent) {
                this.htmlAreaStyle = this.conf.htmlAreaVideoHelp;
                if (firstTime) {
                    this.helpVideoBckgrnd = cssUtil.addElementToDom(Image, "HelpVideoBackgroundImg", this.htmlAreaStyle.imageVideoHelp, this.getScenObj());
                    this.helpVideoBckgrnd.setUrl(this.conf.htmlAreaVideoHelp.videoHelpBckGrndUrl);
                    this.helpVideoTxt = cssUtil.addElementToDom(Text, "HelpVideoTxt", this.conf.htmlAreaVideoHelp.txtVideoHelp, this.getScenObj());
                    this.helpVideoTxt.setTxt(eval("this.parentObj.messages.videoHelpImgText"));
                    this.helpVideoPlayButton = cssUtil.addElementToDom(Image, "HelpVideoPlayImg", this.conf.htmlAreaVideoHelp.playVideoHelp, this.getScenObj());
                    this.helpVideoPlayButton.setUrl(this.conf.htmlAreaVideoHelp.videoHelpUnfocusedPlayUrl)
                } else {
                    this.helpVideoBckgrnd.getObj().show();
                    this.helpVideoTxt.getObj().show();
                    this.helpVideoPlayButton.getObj().show()
                }
            } else {
                this.htmlAreaStyle =
                    this.conf.htmlArea;
                if (!firstTime) {
                    this.helpVideoBckgrnd.getObj().hide();
                    this.helpVideoTxt.getObj().hide();
                    this.helpVideoPlayButton.getObj().hide()
                }
            }
            if (this.htmlArea != undefined) {
                this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaUnselected.style);
                this.htmlArea.getObj().setStyle(this.htmlAreaStyle.htmlAreaSelected.style)
            }
        } catch (ex) {
            ex.errMethod = "setHelpVideoStyleOrNot";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, loadHeader: function () {
        try {
            this.hourMessages = new Text(this.id + "hourMessages",
                this.conf.hour);
            this.dateMessages = new Text(this.id + "dateMessages", this.conf.date);
            this.getScenObj().appendChild(this.hourMessages.getObj());
            this.getScenObj().appendChild(this.dateMessages.getObj())
        } catch (ex) {
            ex.errMethod = "loadHeader";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, loadFooter: function () {
        try {
            this.footerList = this.conf.footer.footerElements;
            this.footerElem = new Array;
            for (i = 0; i < this.footerList.length; i++) {
                this.footerElem[i] = cssUtil.addElementToDom(FooterElement, this.getScenObj().id + "_footer" + i,
                    this.footerList[i], this.getScenObj());
                if (this.footerList[i].txtCont.text != "")this.footerElem[i].setText(eval("this.parentObj.messages." + this.footerList[i].txtCont.text))
            }
            this.showLeftFooter();
            logoKpn = new Image(this.id + "logoKpn", this.conf.logoKpn);
            logoKpn.setUrl(fw.subscriberDataManager.getRetailerLogo());
            this.getScenObj().appendChild(logoKpn.getObj())
        } catch (ex) {
            ex.errMethod = "loadFooter";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, showLeftFooter: function () {
        try {
            if (this.footerElem != undefined && (this.footerElem[2] !=
                undefined && this.footerElem[1] != undefined)) {
                this.footerElem[1].show();
                this.footerElem[2].hide()
            }
        } catch (ex) {
            ex.errMethod = "showLeftFooter";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, showRightFooter: function () {
        try {
            if (this.footerElem != undefined && (this.footerElem[2] != undefined && this.footerElem[1] != undefined)) {
                this.footerElem[2].show();
                this.footerElem[1].hide()
            }
        } catch (ex) {
            ex.errMethod = "showLeftFooter";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, onHide: function () {
        try {
            this.parentObj.clean()
        } catch (ex) {
            ex.errMethod =
                "onHide";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        try {
            if (!fw.bannerUiManager.performsBannerAction(this.banner, _evt.keyCode)) {
                switch (_evt.keyCode) {
                    case fw.keys.code.UP:
                        switch (this.currentFocus) {
                            case this.FOCUS_MENU:
                                this.helpList.moveFocusToUp();
                                break;
                            case this.FOCUS_HTML_AREA:
                                if (!this.htmlArea.scrollRowUp())this.arrowUpHtmlArea.getObj().hide(); else this.arrowDownHtmlArea.getObj().show();
                                break
                        }
                        break;
                    case fw.keys.code.DOWN:
                        switch (this.currentFocus) {
                            case this.FOCUS_MENU:
                                this.helpList.moveFocusToDown();
                                break;
                            case this.FOCUS_HTML_AREA:
                                if (!this.htmlArea.scrollRowDown())this.arrowDownHtmlArea.getObj().hide(); else this.arrowUpHtmlArea.getObj().show();
                                break
                        }
                        break;
                    case fw.keys.code.RIGHT:
                        if (this.currentFocus == this.FOCUS_MENU) {
                            this.showRightFooter();
                            this.currentFocus = this.FOCUS_HTML_AREA;
                            this.helpList.focusOff();
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaSelected.style);
                            this.leftArrowHtmlArea.show();
                            this.showHideArrowDown()
                        } else if (this.currentFocus == this.FOCUS_HTML_AREA && this.isHelpVideoContent) {
                            this.currentFocus =
                                this.FOCUS_PLAY_VIDEO_AREA;
                            this.leftArrowHtmlArea.hide();
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaUnselected.style);
                            this.helpVideoPlayButton.setUrl(this.conf.htmlAreaVideoHelp.videoHelpFocusedPlayUrl)
                        }
                        break;
                    case fw.keys.code.LEFT:
                        if (this.currentFocus == this.FOCUS_HTML_AREA) {
                            this.showLeftFooter();
                            this.currentFocus = this.FOCUS_MENU;
                            this.helpList.focusOn();
                            this.leftArrowHtmlArea.hide();
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaUnselected.style)
                        } else if (this.currentFocus ==
                            this.FOCUS_PLAY_VIDEO_AREA) {
                            this.currentFocus = this.FOCUS_HTML_AREA;
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaSelected.style);
                            this.leftArrowHtmlArea.show();
                            this.showHideArrowDown();
                            this.helpVideoPlayButton.setUrl(this.conf.htmlAreaVideoHelp.videoHelpUnfocusedPlayUrl)
                        }
                        break;
                    case fw.keys.code.OK:
                        this.htmlPageIndx = this.menuLabel.indexOf(this.helpList.getSelectItem().cont);
                        if (this.currentFocus == this.FOCUS_MENU) {
                            this.showRightFooter();
                            this.helpList.setItemSelected();
                            this.helpList.focusOff();
                            this.currentFocus = this.FOCUS_HTML_AREA;
                            this.htmlArea.resetPositionPage();
                            this.setHelpVideoStyleOrNot(this.htmlPageIndx);
                            this.htmlArea.setHtmlContent(this.htmlPageList[this.htmlPageIndx]);
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaSelected.style);
                            this.breadcrumb.replaceTop(this.helpList.getSelectItem().cont.contentTitle);
                            this.leftArrowHtmlArea.show();
                            this.arrowUpHtmlArea.getObj().hide();
                            this.arrowDownHtmlArea.getObj().hide();
                            this.showHideArrowDown()
                        } else if (this.currentFocus ==
                            this.FOCUS_HTML_AREA) {
                            this.showLeftFooter();
                            this.helpList.focusOn();
                            this.currentFocus = this.FOCUS_MENU;
                            this.leftArrowHtmlArea.hide();
                            this.arrowUpHtmlArea.getObj().hide();
                            this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaUnselected.style);
                            this.htmlArea.resetPositionPage()
                        } else if (this.currentFocus == this.FOCUS_PLAY_VIDEO_AREA) {
                            this.movieId = this.movieIdArr[this.htmlPageIndx];
                            if (this.movieId != undefined && (this.movieId != null && this.movieId != "")) {
                                fw.log.info("Calling ZapBanner with MovieId:" +
                                    this.movieId);
                                fw.mwManager.getVodFromContentId(this.movieId, this.callBackDoContentShow, this, null)
                            }
                        }
                        break;
                    case fw.keys.code.RADIO:
                        fw.mwManager.listenToRadio();
                        break;
                    case fw.keys.code.TV:
                        fw.mwManager.watchDTV();
                        break;
                    case fw.keys.code.PLAY_PAUSE:
                        break;
                    case fw.keys.code.CHANNEL_UP:
                        if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp();
                        break;
                    case fw.keys.code.CHANNEL_DOWN:
                        if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown();
                        break;
                    case fw.keys.code.BACK:
                        if (this.inputObj.fromNative !=
                            null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true))fw.mwManager.goBackInHistory(); else {
                            fw.navigationHistory.back();
                            if (this.inputObjToReopenPopupOnBack != null && (this.inputObjToReopenPopupOnBack != undefined && fw.appManager.lockAutomaticPopup == false)) {
                                fw.popupManager.showPopupFromInputObj(this.inputObjToReopenPopupOnBack);
                                this.inputObjToReopenPopupOnBack = null
                            }
                            if (fw.appManager.lockAutomaticPopup != false)fw.appManager.lockAutomaticPopup = false
                        }
                        break;
                    case fw.keys.code.MENU:
                        fw.mwManager.openMenu();
                        break;
                    case fw.keys.code.EPG:
                        fw.mwManager.openEPG("DEFAULT", "");
                        break;
                    case fw.keys.code.BLUE:
                        this.showLeftFooter();
                        this.currentFocus = this.FOCUS_MENU;
                        this.helpList.focusOn();
                        this.leftArrowHtmlArea.hide();
                        this.rectHtmlArea.getObj().setStyle(this.htmlAreaStyle.rectHtmlAreaUnselected.style);
                        var optMenuConfObj = this.conf.optionMenuConf;
                        var optMenuElemsObj = new Array;
                        for (var j = 0; j < optMenuConfObj.length; j++) {
                            var menuElem = new Object;
                            menuElem.label = eval("this.parentObj.messages." + optMenuConfObj[j]);
                            menuElem.status =
                                optMenuConfObj[j];
                            optMenuElemsObj.push(menuElem)
                        }
                        var optMenuObj = new Object;
                        optMenuObj.menuElement = optMenuElemsObj;
                        optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
                        fw.overlayManager.showOptionMenu(optMenuObj, this.returnOptionMenu, this);
                        break;
                    default:
                        break
                }
                if (fw.keys.keyCodeAsString(_evt.keyCode) != null)this.ItemDetChanNumTxt.setTxt(fw.keys.keyCodeAsString(_evt.keyCode))
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, callBackDoContentShow: function (_callerCallbackParams, _movies,
                                        _totalMoviesCount, _parentCategory) {
        try {
            var type = "N";
            this.parentObj.selectedCategoryContent = _movies[0];
            this.parentObj.init(new Array("Play", this.movieId, type))
        } catch (ex) {
            ex.errMethod = "doContentShow";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, doContentShow: function (_type, _movieId) {
        try {
            var type = _type == "OKOnPlayVideo" ? "N" : "Y";
            this.parentObj.init(new Array("Play", _movieId, type))
        } catch (ex) {
            ex.errMethod = "doContentShow";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, returnOptionMenu: function (_resultObj) {
        try {
            if (_resultObj !=
                null && _resultObj != undefined)switch (_resultObj[0]) {
                case "WatchTV":
                    fw.mwManager.watchDTV();
                    break;
                case "SearchInAll":
                    fw.mwManager.openSearch("", "", "");
                    break
            }
        } catch (ex) {
            ex.errMethod = "returnOptionMenu";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, showHideArrowDown: function () {
        try {
            var _this = this;
            setTimeout(function () {
                if (_this.htmlArea.getNumPage() <= 1)_this.arrowDownHtmlArea.getObj().hide(); else _this.arrowDownHtmlArea.getObj().show()
            }, 2E3)
        } catch (ex) {
            ex.errMethod = "showHideArrowDown";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, vodCatChanNumTxtCallBack: function (_res) {
        try {
            fw.mediaManager.tuneToChannel(_res)
        } catch (ex) {
            ex.errMethod = "vodCatChanNumTxtCallBack";
            ex.errClass = "ScenarioHelp";
            fw.err(ex)
        }
    }
});
