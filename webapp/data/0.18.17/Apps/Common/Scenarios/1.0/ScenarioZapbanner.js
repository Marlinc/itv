var ScenarioZapbanner = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        $super(_prop);
        try {
            this.id = _prop.id;
            this.conf = _conf;
            this.appObj = _parentObj;
            this.startVod = false;
            this.activeState = 0;
            this.movieObject = new Object;
            this.isVodDescriptionFocused = false;
            this.vodDescriptionTotalPages = 0;
            this.menuListArray = new Array;
            this.lastFocusedMenuListElement = null;
            this.moduleExtendedZapbanner = new ModuleZapbannerExtended(this, this.conf.ModuleZapBannerExtended, this.conf.ModuleZapBannerExtendedConf);
            this.moduleMiniZapbanner = new ModuleZapbannerMini(this, this.conf.ModuleZapBannerMini, this.conf.ModuleZapBannerMiniConf);
            this.zapBannerExtMenuList = new ModuleMenuList(this, this.conf.ModuleZapBannerExtendedConf.zapBannerExtMenuList, this.conf.ModuleZapBannerExtendedConf.zapBannerExtMenuListConf, Button, null, this, this.zapBannerMenuListModuleCallBack);
            this.zapBannerNotification = new ModuleZapbannerNotification(this, this.conf.ModuleZapBannerNotification, this.conf.ModuleZapBannerNotificationConf);
            this.mediaPlayerVisualSpeeds =
                this.conf.ModuleZapBannerMiniConf.zapBannerMiniPlaySpeedVisualArray;
            this.mediaPlayerSpeeds = this.conf.ModuleZapBannerMiniConf.zapBannerMiniPlaySpeedArray;
            this.mediaPlayerVisualSpeedsIterator = -1;
            this.isForwarding = false;
            this.isRewinding = false;
            this.isPaused = false;
            this.playbackState = -1;
            this.bookmarkChecked = null;
            this.skipToTimeMaskEnabled = false;
            this.moreInfoDescFunctionalityEnabled = false;
            this.STATEFULLSCREEN = 0;
            this.STATEMINIZAPBANNER = 1;
            this.STATEEXTENDEDZAPBANNER = 2;
            this.zapBannerMessagesArrayForBookmarkInteractivePopup =
                this.createZapbannerMessagesArrayForBookmarkInteractivePopup();
            this.zapBannerMessagesArrayForStopVodInteractivePopup = this.createZapbannerMessagesArrayForStopVodInteractivePopup();
            this.zapBannerMessagesArrayForWrongSkiptimePopup = this.createZapbannerMessagesArrayForWrongSkiptimePopup();
            this.optionMenuObject = this.createZapBannerOptionMenuObject();
            this.CLOSEZAPBANNERINTERVALTIMEOUT = fw.mwManager.getMiniGuideTime() * 1E3;
            this.closeZapbannerInterval = null;
            this.PG = "PG";
            this.HELPVODCATALOGUE = "HelpVodCatalogue";
            this.VODCATALOGUE = "VodCatalogue";
            this.RENTEDITEMS = "RentedItems";
            this.inputObj = null;
            this.fromInfoPage = null;
            this.openInfoPageAtEOS = true
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, getCurrentInputObj: function () {
        try {
            var inputObjreturn = new Array;
            if (this.fromInfoPage != undefined && (this.fromInfoPage != null && this.fromInfoPage == "STOP"))inputObjreturn = new Array(fw.conf.backLabel, this.appObj.selectedCategoryContent); else if (fw.appManager.getCurrentApp() == "HelpVodCatalogue") {
                inputObjreturn.push(this.inputObj[0]);
                inputObjreturn.push(this.inputObj[1]);
                inputObjreturn.push(this.inputObj[2])
            } else {
                inputObjreturn.push(this.inputObj[0]);
                inputObjreturn.push({"action": "backHistory"});
                if (this.inputObj[2] != null && this.inputObj[2])inputObjreturn.push(this.inputObj[2]); else inputObjreturn.push(null);
                if (this.movieObject != null && (this.movieObject != undefined && (this.movieObject[0] != undefined && this.movieObject[0] != null)))inputObjreturn.push(fw.util.cloneAllObjectType(this.movieObject[0])); else inputObjreturn.push(null);
                if (this.appObj.positionInCategory !=
                    undefined && this.appObj.positionInCategory != null)inputObjreturn.push(fw.util.cloneAllObjectType(this.appObj.positionInCategory)); else inputObjreturn.push(null);
                if (this.appObj.selectedCategoryContents != undefined && this.appObj.selectedCategoryContents != null)inputObjreturn.push(fw.util.cloneAllObjectType(this.appObj.selectedCategoryContents)); else inputObjreturn.push(null);
                if (this.fromInfoPage != undefined && (this.fromInfoPage != null && this.fromInfoPage == "RED"))inputObjreturn.push("FROM_RED_NO_POPUP")
            }
            this.fromInfoPage =
                null;
            return inputObjreturn
        } catch (ex) {
            ex.errMethod = "getCurrentInputObj";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.startVod = false;
            this.isActiveNotification = false;
            this.inputObj = _inputObj;
            this.fromInfoPage = null;
            this.bookmarkChecked = null;
            this.navigateInAhead = false;
            this.inTrickplay = false;
            fw.mediaManager.setPlaybackParametersFullscreen();
            if (this.reloadVodAfterInfoPage()) {
                this.playerStartedAtLeastOneTime = false;
                if (_inputObj[1] != undefined && _inputObj[1].action == "backHistory")if (_inputObj[3] !=
                    undefined && this.appObj.selectedCategoryContent.id != _inputObj[3].id) {
                    this.appObj.selectedCategoryContent = _inputObj[3];
                    this.appObj.positionInCategory = _inputObj[4];
                    this.appObj.selectedCategoryContents = _inputObj[5]
                } else _inputObj[0] = "Play"; else if (_inputObj.length > 3 && (_inputObj[3] != undefined && _inputObj[3] != null))this.bookmarkChecked = _inputObj[3];
                this.inputObj = _inputObj;
                if (_inputObj[2] != undefined && (_inputObj[2] != null && _inputObj[2] != ""))this.playingTrailer = !!(_inputObj[2] == "Y"); else this.playingTrailer =
                    false;
                this.showChannelImage = this.conf.showChannelImage != null && this.conf.showChannelImage != undefined ? this.conf.showChannelImage : false;
                this.movieObject = new Object;
                this.infoPageTresholdReached = false;
                this.closeZapbannerInterval = null;
                this.moduleMiniZapbanner.setTrickPlayIcon("");
                this.moduleMiniZapbanner.setMediaSpeed("");
                this.isVodDescriptionFocused = false;
                this.vodDescriptionTotalPages = 0;
                this.mediaPlayerVisualSpeedsIterator = -1;
                this.menuListArray = new Array;
                this.skipToTimeMaskEnabled = false;
                this.lastFocusedMenuListElement =
                    null;
                this.moreInfoDescFunctionalityEnabled = false;
                this.setActiveZapBannerState(this.STATEFULLSCREEN);
                this.adjustGraphics(this.getActiveZapBannerState());
                this.checkInputObjZapbanner(_inputObj);
                this.lastFocusedMenuListElement = null;
                this.startGidsTimeout = this.conf.startGidsTimeout != null && this.conf.startGidsTimeout != undefined ? this.conf.startGidsTimeout : 400
            } else {
                this.openInfoPageAtEOS = false;
                this.playerStartedAtLeastOneTime = true;
                this.checkMediaManagerGetPlaybackState()
            }
            fw.mediaManager.registerPlaybackStateChangeCallback(this.zapBannerPlayerStateChangeCallback,
                this);
            fw.mwRequestManager.registerNewMessageCallback(this.onScreenNotification, this, null);
            fw.mwRequestManager.registerStopEventCallback(this.stopCallback, this, null)
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerMenuListModuleCallBack: function (_LeftMenuTotalPosition, _LeftMenuDomElement, _LeftMenuDataElement) {
        try {
            this.lastFocusedMenuListElement = _LeftMenuDataElement;
            this.moduleMiniZapbanner.setZapbannerOkButtonFooterTxt(": " + _LeftMenuDataElement.contentTitle)
        } catch (ex) {
            ex.errMethod =
                "zapBannerMenuListModuleCallBack";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        try {
            if (this.getActiveZapBannerState() === this.STATEMINIZAPBANNER && (_evt.keyCode != fw.keys.code.FORWARD && _evt.keyCode != fw.keys.code.BACKWARD))this.resetTimeout();
            switch (_evt.keyCode) {
                case fw.keys.code.RADIO:
                    this.navigateInAhead = true;
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.TV:
                    if (this.isActiveNotification)this.slideClose(); else switch (this.getActiveZapBannerState()) {
                        case this.STATEEXTENDEDZAPBANNER:
                        case this.STATEMINIZAPBANNER:
                            this.setActiveZapBannerState(this.STATEFULLSCREEN);
                            this.adjustGraphics(this.STATEFULLSCREEN);
                            if (this.zapBannerExtMenuList != null && this.zapBannerExtMenuList != undefined)this.zapBannerExtMenuList.selectedOff();
                            this.isVodDescriptionFocused = false;
                            break;
                        case this.STATEFULLSCREEN:
                            this.navigateInAhead = true;
                            fw.mwManager.watchDTV();
                            break
                    }
                    break;
                case fw.keys.code.MENU:
                    this.showInteractivePopup(_evt, true, this.appObj.messages.stopVod_popup_message_menu);
                    break;
                case fw.keys.code.GIDS:
                    this.showInteractivePopup(_evt, true, this.appObj.messages.stopVod_popup_message_gids);
                    break;
                case fw.keys.code.HELP:
                    this.showInteractivePopup(_evt);
                    break;
                case fw.keys.code.YELLOW:
                    if (this.getActiveZapBannerState() === this.STATEFULLSCREEN) {
                        this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                        var startTimer = !this.isForwarding && !this.isRewinding;
                        this.adjustGraphics(this.STATEMINIZAPBANNER, startTimer)
                    } else if (this.getActiveZapBannerState() === this.STATEMINIZAPBANNER) {
                        this.setActiveZapBannerState(this.STATEEXTENDEDZAPBANNER);
                        this.adjustGraphics(this.STATEEXTENDEDZAPBANNER)
                    } else {
                        this.setActiveZapBannerState(this.STATEFULLSCREEN);
                        this.adjustGraphics(this.STATEFULLSCREEN);
                        this.zapBannerExtMenuList.selectedOff();
                        this.isVodDescriptionFocused = false
                    }
                    break;
                case fw.keys.code.BLUE:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEFULLSCREEN:
                            if (this.isActiveNotification) {
                                this.slideClose();
                                fw.util.clearTimeout(this.timerZapbannerNotification)
                            }
                            fw.overlayManager.showOptionMenu(this.optionMenuObject, this.zapBannerReturnOptionMenu, this);
                            break
                    }
                    break;
                case fw.keys.code.RED:
                    if (this.isActiveNotification) {
                        this.navigateInAhead = true;
                        fw.appManager.goToHtmlApp("Messages",
                            "DefaultSkin", new Array("showMessageDetails", this.message_id), false, true)
                    } else if (!this.playingTrailer)this.openInfoPage(false, false);
                    break;
                case fw.keys.code.DOWN:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEEXTENDEDZAPBANNER:
                            if (this.moreInfoDescFunctionalityEnabled)if (this.isVodDescriptionFocused)this.moduleExtendedZapbanner.scrollTxtAreaDescDown(); else this.zapBannerExtMenuList.moveFocusToDown(); else this.zapBannerExtMenuList.moveFocusToDown();
                            break;
                        case this.STATEFULLSCREEN:
                            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                            this.adjustGraphics(this.getActiveZapBannerState());
                            break
                    }
                    break;
                case fw.keys.code.BACK:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEEXTENDEDZAPBANNER:
                            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                            this.moduleMiniZapbanner.showBackgroundImage();
                            this.adjustGraphics(this.STATEMINIZAPBANNER);
                            break;
                        case this.STATEMINIZAPBANNER:
                            this.setActiveZapBannerState(this.STATEFULLSCREEN);
                            this.adjustGraphics(this.STATEFULLSCREEN);
                            break;
                        case this.STATEFULLSCREEN:
                            if (this.isActiveNotification)this.slideClose();
                            else this.showInteractivePopup(_evt);
                            break
                    }
                    break;
                case fw.keys.code.UP:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEEXTENDEDZAPBANNER:
                            if (this.moreInfoDescFunctionalityEnabled)if (this.isVodDescriptionFocused)this.moduleExtendedZapbanner.scrollTxtAreaDescUp(); else this.zapBannerExtMenuList.moveFocusToUp(); else this.zapBannerExtMenuList.moveFocusToUp();
                            break;
                        case this.STATEFULLSCREEN:
                            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                            this.adjustGraphics(this.getActiveZapBannerState());
                            break
                    }
                    break;
                case fw.keys.code.LEFT:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEFULLSCREEN:
                        case this.STATEMINIZAPBANNER:
                            this.skipToTime("rwd", false, this.conf.leftRightSkipTimeValue);
                            if (this.getActiveZapBannerState() != this.STATEMINIZAPBANNER) {
                                this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                                this.adjustGraphics(this.STATEMINIZAPBANNER)
                            }
                            break;
                        case this.STATEEXTENDEDZAPBANNER:
                            if (this.moreInfoDescFunctionalityEnabled)if (this.isVodDescriptionFocused) {
                                this.zapBannerExtMenuList.selectedOff();
                                this.zapBannerExtMenuList.focusOn();
                                this.moduleExtendedZapbanner.showDescFocus(false);
                                this.isVodDescriptionFocused = false
                            }
                            break
                    }
                    break;
                case fw.keys.code.RIGHT:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEFULLSCREEN:
                        case this.STATEMINIZAPBANNER:
                            this.skipToTime("fwd", false, this.conf.leftRightSkipTimeValue);
                            if (this.getActiveZapBannerState() != this.STATEMINIZAPBANNER) {
                                this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                                this.adjustGraphics(this.STATEMINIZAPBANNER)
                            }
                            break;
                        case this.STATEEXTENDEDZAPBANNER:
                            break
                    }
                    break;
                case fw.keys.code.FORWARD:
                    fw.util.clearTimeout(this.closeZapbannerInterval);
                    var isPreviouslyRewinding = this.isRewinding;
                    this.isRewinding = false;
                    this.isForwarding = true;
                    this.isPaused = false;
                    if (this.skipToTimeMaskEnabled) {
                        this.isForwarding = false;
                        this.skipToTime("fwd", true, null);
                        this.removeSkipTimeElement()
                    } else if (isPreviouslyRewinding || this.mediaPlayerVisualSpeedsIterator < 0) {
                        this.mediaPlayerVisualSpeedsIterator = 0;
                        this.changeSpeedTimer(this.mediaPlayerSpeeds[this.mediaPlayerVisualSpeedsIterator], this.zapBannerPlayerChangeSpeedCallback, this, this.mediaPlayerVisualSpeeds[this.mediaPlayerVisualSpeedsIterator])
                    } else if (parseInt(this.mediaPlayerVisualSpeedsIterator +
                            1) < this.mediaPlayerVisualSpeeds.length) {
                        this.mediaPlayerVisualSpeedsIterator++;
                        this.changeSpeedTimer(this.mediaPlayerSpeeds[this.mediaPlayerVisualSpeedsIterator], this.zapBannerPlayerChangeSpeedCallback, this, this.mediaPlayerVisualSpeeds[this.mediaPlayerVisualSpeedsIterator])
                    }
                    break;
                case fw.keys.code.BACKWARD:
                    fw.util.clearTimeout(this.closeZapbannerInterval);
                    var isPreviouslyForwarding = this.isForwarding;
                    this.isRewinding = true;
                    this.isForwarding = false;
                    this.isPaused = false;
                    if (this.skipToTimeMaskEnabled) {
                        this.skipToTime("rwd",
                            true, null);
                        this.removeSkipTimeElement()
                    } else if (isPreviouslyForwarding || this.mediaPlayerVisualSpeedsIterator < 0) {
                        this.mediaPlayerVisualSpeedsIterator = 0;
                        this.changeSpeedTimer(this.mediaPlayerSpeeds[this.mediaPlayerVisualSpeedsIterator] * -1, this.zapBannerPlayerChangeSpeedCallback, this, this.mediaPlayerVisualSpeeds[this.mediaPlayerVisualSpeedsIterator])
                    } else if (parseInt(this.mediaPlayerVisualSpeedsIterator + 1) < this.mediaPlayerVisualSpeeds.length) {
                        this.mediaPlayerVisualSpeedsIterator++;
                        this.changeSpeedTimer(this.mediaPlayerSpeeds[this.mediaPlayerVisualSpeedsIterator] * -1, this.zapBannerPlayerChangeSpeedCallback, this, this.mediaPlayerVisualSpeeds[this.mediaPlayerVisualSpeedsIterator])
                    }
                    break;
                case fw.keys.code.PLAY_PAUSE:
                    this.isRewinding = false;
                    this.isForwarding = false;
                    this.playPauseVod();
                    break;
                case fw.keys.code.STOP:
                    if (!this.playingTrailer && (this.infoPageEnabled && this.infoPageTresholdReached))this.openInfoPage(true, false); else this.stopVideo();
                    break;
                case fw.keys.code.OK:
                    switch (this.getActiveZapBannerState()) {
                        case this.STATEFULLSCREEN:
                            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                            var startTimer = !this.isForwarding && !this.isRewinding;
                            this.adjustGraphics(this.STATEMINIZAPBANNER, startTimer);
                            break;
                        case this.STATEMINIZAPBANNER:
                            break;
                        case this.STATEEXTENDEDZAPBANNER:
                            if (!this.isVodDescriptionFocused)switch (this.lastFocusedMenuListElement.contentTitle) {
                                case this.appObj.messages.watch_vod:
                                    this.jumpToTimeTimer(0, this.zapBannerJumpToTimeCallback, this, null);
                                    break;
                                case this.appObj.messages.rented_videos:
                                    var currApp = this.appObj.id;
                                    if (currApp.toLowerCase() == "vodcatalogue")this.appObj.init(new Array("Catalogue",
                                        "MijnGehuurde")); else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin", new Array("Catalogue", "MijnGehuurde"), false, true);
                                    this.navigateInAhead = true;
                                    this.stopVideo();
                                    break;
                                case this.appObj.messages.more_info:
                                    if (this.moreInfoDescFunctionalityEnabled) {
                                        this.zapBannerExtMenuList.selectedOn();
                                        this.zapBannerExtMenuList.focusOff();
                                        this.moduleExtendedZapbanner.showDescFocus(true);
                                        this.isVodDescriptionFocused = true
                                    }
                                    break
                            } else {
                                this.zapBannerExtMenuList.selectedOff();
                                this.zapBannerExtMenuList.setFocusOnFirstElement();
                                this.moduleExtendedZapbanner.showDescFocus(false);
                                this.isVodDescriptionFocused = false
                            }
                            break
                    }
                    break
            }
            if (_evt.keyCode >= 48 && _evt.keyCode <= 57) {
                if (this.getActiveZapBannerState() != this.STATEMINIZAPBANNER) {
                    this.addBackgroundToMiniZapBanner();
                    this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                    this.adjustGraphics(this.STATEMINIZAPBANNER)
                }
                this.skipToTimeMaskEnabled = true;
                this.moduleMiniZapbanner.setSkipToTimeLabel(_evt.keyCode - 48)
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    },
    keyHandlerUp: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.DOWN:
                    break;
                    break;
                case fw.keys.code.UP:
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandlerUp";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, checkInputObjZapbanner: function (_obj) {
        try {
            var objToSet;
            if (_obj != null && _obj != undefined)switch (_obj[0].toString().toLowerCase()) {
                case "play":
                    this.directAccess = false;
                    if (this.appObj.selectedCategoryContent != null && (this.appObj.selectedCategoryContent != undefined && this.appObj.selectedCategoryContent.id == _obj[1]))this.getVodCallback(null,
                        new Array(this.appObj.selectedCategoryContent)); else if (_obj[1] != undefined && (_obj[1].action != undefined && _obj[1].action == "backHistory"))if (fw.appManager.getCurrentApp() == this.PG)fw.mwManager.getPGFromContentId(_obj[3].id, this.getVodCallback, this, null); else if (fw.appManager.getCurrentApp() == "VodCatalogue")fw.mwManager.getVodFromContentId(_obj[3].id, this.getVodCallback, this, null); else this.getVodCallback(null, new Array(_obj[3])); else fw.mwManager.getVodFromContentId(_obj[1], this.getVodCallback, this,
                        null);
                    break;
                case "playvodlcdi":
                    this.directAccess = true;
                    fw.mwManager.getVodFromExternalId(_obj[1].externalId, this.getVodCallback, this, null);
                    break;
                case "playvodiml":
                    this.directAccess = true;
                    if (fw.mwManager.getCurrentItem().id == undefined)fw.mwManager.getVodFromAssetUrl(_obj[1].assetUrl, this.getVodCallback, this, null); else this.stopVideo();
                    break;
                case "playvodott":
                    this.directAccess = false;
                    fw.mwManager.getVodFromAssetUrl(_obj[1].assetUrl, this.getVodCallback, this, null);
                    break;
                case "playhelpvideo":
                    this.directAccess =
                        false;
                    fw.mwManager.getVodFromContentId(_obj[1], this.getVodCallback, this, null);
                    break;
                default:
                    this.directAccess = false;
                    objToSet = null;
                    break
            }
        } catch (ex) {
            ex.errMethod = "checkInputObjZapbanner";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, getVodCallback: function (_prop, _obj, __totalMoviesCount) {
        try {
            if (_obj != null && (_obj != undefined && (_obj.length > 0 && (_obj[0] != undefined && _obj[0] != null)))) {
                this.movieObject = _obj;
                if (this.appObj.selectedCategoryContent == undefined || (this.appObj.selectedCategoryContent == null || this.checkIfPlayImlVod()))this.appObj.selectedCategoryContent =
                    _obj[0];
                if (this.verifyIfLocked(_obj[0]))fw.pcmanager.checkPCPin(this.callBackInsertPin, this, this.conf.hasLiveVideo); else this.fillVodZapbannerDetailsData(_obj[0])
            } else {
                var objToPassToMessagePopup = new Object;
                objToPassToMessagePopup.title = this.appObj.messages.zapBanner_fillVodError_PopUp_title;
                objToPassToMessagePopup.message = this.appObj.messages.zapBanner_fillVodError_PopUp_Message;
                objToPassToMessagePopup.button = this.appObj.messages.zapBanner_fillVodError_PopUp_Button;
                fw.popupManager.showPopup(fw.conf.popupMessageName,
                    objToPassToMessagePopup, this.zapBannerMessagePopupMissingVODCallback, this)
            }
        } catch (ex) {
            ex.errMethod = "getVodCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, fillVodZapbannerDetailsData: function (_movie) {
        try {
            if (this.bookmarkChecked != null)this.zapBannerCloseInteractiveBookmarkPopup(this.bookmarkChecked); else if (_movie.bookmarks != null && (_movie.bookmarks != undefined && parseInt(_movie.bookmarks) > 0)) {
                var objToPassToInteractivePopup = new Object;
                objToPassToInteractivePopup.title = this.zapBannerMessagesArrayForBookmarkInteractivePopup[0].contentTitle;
                objToPassToInteractivePopup.message = this.zapBannerMessagesArrayForBookmarkInteractivePopup[1].contentTitle;
                objToPassToInteractivePopup.buttonOKlabel = this.zapBannerMessagesArrayForBookmarkInteractivePopup[2].contentTitle;
                objToPassToInteractivePopup.buttonKOlabel = this.zapBannerMessagesArrayForBookmarkInteractivePopup[3].contentTitle;
                objToPassToInteractivePopup.buttonOKstatus = "Resume";
                objToPassToInteractivePopup.buttonKOstatus = "Restart";
                objToPassToInteractivePopup.focusKO = true;
                if (!this.playingTrailer &&
                    this.inputObj[0] != "playhelpvideo")fw.popupManager.showPopup(fw.conf.popupInteractiveName, objToPassToInteractivePopup, this.zapBannerCloseInteractiveBookmarkPopup, this); else this.zapBannerCloseInteractiveBookmarkPopup("restart")
            } else {
                fw.mediaManager.playVOD(_movie, 0, this.playingTrailer, this.zapBannerPlayerPlayCallback, this, null);
                this.checkIfUpdateZapbannerIntervalTimerHasToBeCalled()
            }
            if (this.showChannelImage) {
                this.channelObject = fw.subscriberDataManager.getChannelByCallLetter(this.movieObject[0].shortDescription);
                if (this.channelObject != null) {
                    this.moduleMiniZapbanner.setChannelLogoImageUrl(fw.mwManager.getChannelLogoCompleteUrl(this.channelObject.logoName));
                    this.moduleMiniZapbanner.setChannelNumber(this.channelObject.displayChannelNumber + "&nbsp;" + this.channelObject.displayChannelName)
                } else {
                    this.moduleMiniZapbanner.setChannelLogoImageUrl(fw.conf.CLEAR_IMAGE);
                    this.moduleMiniZapbanner.setChannelNumber("")
                }
            }
            this.moduleMiniZapbanner.setVodTitle(_movie.title);
            this.moduleExtendedZapbanner.setVodExtendedRatingIcons(_movie);
            this.moduleExtendedZapbanner.setVodTitle(_movie.title);
            if (!this.showChannelImage)this.moduleExtendedZapbanner.setVodLongDescription(_movie.releaseYear + (_movie.actorsList.length > 0 ? ", met " + new String(_movie.actorsList) : "") + (_movie.directorsList.length > 0 ? ", Director:" + new String(_movie.directorsList) : "") + "<br><br>" + _movie.longDescription); else this.moduleExtendedZapbanner.setVodLongDescription(_movie.longDescription);
            var _this = this;
            this.timerTime = fw.util.setTimeout(function () {
                    _this.setMoreInfoMenuListElement(_this)
                },
                2E3)
        } catch (ex) {
            ex.errMethod = "fillVodZapbannerDetailsData";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, onHide: function () {
        try {
            this.cleanAllTimerAndCallback()
        } catch (ex) {
            ex.errMethod = "onHide";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, cleanAllTimerAndCallback: function () {
        try {
            fw.mediaManager.unregisterPlaybackStateChangeCallback();
            fw.mwRequestManager.unregisterStopEventCallback();
            fw.mwRequestManager.unregisterNewMessageCallback();
            fw.popupManager.hidePopupLayer();
            fw.overlayManager.hideOverlayLayer();
            if (this.closeZapbannerInterval != null && this.closeZapbannerInterval != undefined)fw.util.clearTimeout(this.closeZapbannerInterval);
            if (this.timerTime != null && this.timerTime != undefined)fw.util.clearTimeout(this.timerTime);
            if (this.timerTimeZapbanner != null && this.timerTimeZapbanner != undefined)fw.util.clearTimeout(this.timerTimeZapbanner);
            if (this.trickplayTimer != null && this.trickplayTimer != undefined)fw.util.clearTimeout(this.trickplayTimer)
        } catch (ex) {
            ex.errMethod = "cleanAllTimerAndCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, focusReleased: function () {
        try {
            if (this.closeZapbannerInterval != null && this.closeZapbannerInterval != undefined)fw.util.clearTimeout(this.closeZapbannerInterval);
            if (this.timerTime != null && this.timerTime != undefined)fw.util.clearTimeout(this.timerTime);
            if (this.timerTimeZapbanner != null && this.timerTimeZapbanner != undefined)fw.util.clearTimeout(this.timerTimeZapbanner);
            if (this.trickplayTimer != null && this.trickplayTimer != undefined)fw.util.clearTimeout(this.trickplayTimer)
        } catch (ex) {
            ex.errMethod = "focusReleased";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, setActiveZapBannerState: function (_zapbannerState) {
        try {
            this.activeState = _zapbannerState;
            try {
                this.slideClose()
            } catch (ex) {
            }
        } catch (ex) {
            ex.errMethod = "setActiveZapBannerState";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, getActiveZapBannerState: function () {
        try {
            return this.activeState
        } catch (ex) {
            ex.errMethod = "getActiveZapBannerState";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, adjustGraphics: function (_zapbannerState, _startTimer) {
        try {
            if (_startTimer != true && (_startTimer !=
                false && (!this.isPaused && this.activeState != this.STATEEXTENDEDZAPBANNER)))_startTimer = true;
            fw.log.debug("adjustGraphics_HideBar", _startTimer);
            fw.log.debug("adjustGraphics_zapbannerState", _zapbannerState);
            switch (_zapbannerState) {
                case this.STATEFULLSCREEN:
                    this.moduleMiniZapbanner.hideOkButtonFooter();
                    this.moduleExtendedZapbanner.getModObj().setY(800);
                    this.moduleMiniZapbanner.hide();
                    this.removeSkipTimeElement();
                    this.addBackgroundToMiniZapBanner();
                    this.zapBannerExtMenuList.hide();
                    break;
                case this.STATEMINIZAPBANNER:
                    var string =
                        fw.util.returnAppMessageString(this.appObj.messages, this.conf.ModuleZapBannerMiniConf.zapBannerFooterConf.zapbannerFooterYellowButtonOpen.label);
                    this.moduleMiniZapbanner.setZapbannerYellowButtonFooterTxt(": " + string);
                    this.moduleMiniZapbanner.show();
                    this.moduleExtendedZapbanner.getModObj().setY(800);
                    this.zapBannerExtMenuList.hide();
                    if (_startTimer)this.resetTimeout();
                    break;
                case this.STATEEXTENDEDZAPBANNER:
                    if (this.zapBannerExtMenuList.getMenuList() != null)this.zapBannerExtMenuList.setFocusOnFirstElement();
                    if (this.closeZapbannerInterval)fw.util.clearTimeout(this.closeZapbannerInterval);
                    this.moduleExtendedZapbanner.showDescFocus(false);
                    this.moduleMiniZapbanner.showOkButtonFooter();
                    var string = fw.util.returnAppMessageString(this.appObj.messages, this.conf.ModuleZapBannerMiniConf.zapBannerFooterConf.zapbannerFooterYellowButtonClose.label);
                    this.moduleMiniZapbanner.setZapbannerYellowButtonFooterTxt(": " + string);
                    this.zapBannerExtMenuList.focusOn();
                    this.removeSkipTimeElement();
                    this.removeBackgroundFromMiniZapBanner();
                    this.moduleExtendedZapbanner.resetTxtAreaDescPosition();
                    this.moduleExtendedZapbanner.getModObj().setY(0);
                    this.zapBannerExtMenuList.show();
                    break
            }
        } catch (ex) {
            ex.errMethod = "adjustGraphics";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, removeBackgroundFromMiniZapBanner: function () {
        try {
            this.moduleMiniZapbanner.hideBackgroundImage()
        } catch (ex) {
            ex.errMethod = "removeBackgroundFromMiniZapBanner";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, addBackgroundToMiniZapBanner: function () {
        try {
            this.moduleMiniZapbanner.showBackgroundImage()
        } catch (ex) {
            ex.errMethod =
                "addBackgroundToMiniZapBanner";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, removeSkipTimeElement: function () {
        try {
            this.moduleMiniZapbanner.hideSkipTimeElement();
            this.skipToTimeMaskEnabled = false
        } catch (ex) {
            ex.errMethod = "removeSkipTimeElement";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, setMoreInfoMenuListElement: function () {
        try {
            this.vodDescriptionTotalPages = this.moduleExtendedZapbanner.getVodDescPages();
            this.menuListArray = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.ModuleZapBannerExtendedConf.zapBannerExtMenuListConf.menuVoices);
            this.menuListOptArray = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.ModuleZapBannerExtendedConf.zapBannerExtMenuListConf.menuOptionalVoices);
            if (this.vodDescriptionTotalPages > 1) {
                this.moreInfoDescFunctionalityEnabled = true;
                for (a = 0; a < this.menuListOptArray.length; a++)this.menuListArray.push(this.menuListOptArray[a])
            }
            this.zapBannerExtMenuList.setMenuList(this.menuListArray);
            this.zapBannerExtMenuList.setFocusOnFirstElement()
        } catch (ex) {
            ex.errMethod = "setMoreInfoMenuListElement";
            ex.errClass =
                "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerReturnOptionMenu: function (_obj) {
        try {
            if (_obj[0] != null)switch (_obj[0].toLowerCase()) {
                case "moreinfo":
                    this.zapBannerExtMenuList.setFocusOnFirstElement();
                    var string = fw.util.returnAppMessageString(this.appObj.messages, this.conf.ModuleZapBannerMiniConf.zapBannerFooterConf.zapbannerFooterYellowButtonOpen.label);
                    this.moduleMiniZapbanner.setZapbannerYellowButtonFooterTxt(": " + string);
                    this.moduleMiniZapbanner.show();
                    this.setActiveZapBannerState(this.STATEEXTENDEDZAPBANNER);
                    this.adjustGraphics(this.STATEEXTENDEDZAPBANNER);
                    break;
                case "watchvideo":
                    if (this.movieObject[0].bookmarks != null && (this.movieObject[0].bookmarks != undefined && parseInt(this.movieObject[0].bookmarks) > 0)) {
                        var objToPassToInteractivePopup = new Object;
                        objToPassToInteractivePopup.title = this.zapBannerMessagesArrayForBookmarkInteractivePopup[0].contentTitle;
                        objToPassToInteractivePopup.message = this.zapBannerMessagesArrayForBookmarkInteractivePopup[1].contentTitle;
                        objToPassToInteractivePopup.buttonOKlabel = this.zapBannerMessagesArrayForBookmarkInteractivePopup[2].contentTitle;
                        objToPassToInteractivePopup.buttonKOlabel = this.zapBannerMessagesArrayForBookmarkInteractivePopup[3].contentTitle;
                        objToPassToInteractivePopup.buttonOKstatus = "Resume";
                        objToPassToInteractivePopup.buttonKOstatus = "Restart";
                        objToPassToInteractivePopup.focusKO = true;
                        if (!this.playingTrailer)fw.popupManager.showPopup(fw.conf.popupInteractiveName, objToPassToInteractivePopup, this.zapBannerCloseInteractiveBookmarkPopupFromOptionMenu, this); else this.zapBannerCloseInteractiveBookmarkPopupFromOptionMenu("restart")
                    } else this.jumpToTimeTimer(0,
                        this.zapBannerJumpToTimeCallback, this, null);
                    break;
                case "renteditems":
                    var currApp = this.appObj.id;
                    if (currApp.toLowerCase() == "vodcatalogue")this.appObj.init(new Array("Catalogue", "MijnGehuurde")); else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin", new Array("Catalogue", "MijnGehuurde"), false, true);
                    this.navigateInAhead = true;
                    this.stopVideo();
                    break;
                case "watchtv":
                    var obj = new Object;
                    obj.keyCode = fw.keys.code.TV;
                    this.navigateInAhead = true;
                    fw.mwManager.watchDTV();
                    break;
                case "guide":
                    var obj = new Object;
                    obj.keyCode = fw.keys.code.GIDS;
                    this.showInteractivePopup(obj, false, this.appObj.messages.stopVod_popup_message_gids);
                    break;
                case "searchinvideotheek":
                    var obj = new Object;
                    obj.keyCode = "searchInVideotheek";
                    this.interactivePopupCallbackEvent = obj;
                    this.zapBannerCloseInteractiveStopVodPopup("gobackhistory");
                    break;
                case "searchinprogrammagemist":
                    var obj = new Object;
                    obj.keyCode = "searchInProgrammaGemist";
                    this.interactivePopupCallbackEvent = obj;
                    this.zapBannerCloseInteractiveStopVodPopup("gobackhistory");
                    break;
                case "searchinall":
                    var obj =
                        new Object;
                    obj.keyCode = "searchInAll";
                    this.interactivePopupCallbackEvent = obj;
                    this.zapBannerCloseInteractiveStopVodPopup("gobackhistory");
                    break
            }
        } catch (ex) {
            ex.errMethod = "zapBannerReturnOptionMenu";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, skipToTime: function (_direction, _notNeededToUseSkipTimeElem, _skipTimeArray) {
        try {
            this.isPaused = false;
            if (_notNeededToUseSkipTimeElem != null && _notNeededToUseSkipTimeElem != false)var skipArray = this.moduleMiniZapbanner.getSkipValue(); else var skipArray = _skipTimeArray;
            var hours =
                parseInt(skipArray[0], 10);
            var mins = parseInt(skipArray[1], 10);
            var secs = parseInt(skipArray[2], 10);
            var hoursSecs = hours * 3600;
            var minsSecs = mins * 60;
            var totMillis = (hoursSecs + minsSecs + secs) * 1E3;
            var seekTime = _direction == "rwd" ? this.currentPosition - totMillis : this.currentPosition + totMillis;
            if (seekTime < 0)seekTime = 0;
            if (hours <= 59 && (mins <= 59 && secs <= 59)) {
                this.mediaPlayerVisualSpeedsIterator = -1;
                this.jumpToTimeTimer(seekTime, this.zapBannerJumpToTimeCallback, this, null)
            } else {
                var objToPassToMessagePopup = new Object;
                objToPassToMessagePopup.title =
                    this.zapBannerMessagesArrayForWrongSkiptimePopup[0].contentTitle;
                objToPassToMessagePopup.message = this.zapBannerMessagesArrayForWrongSkiptimePopup[1].contentTitle;
                objToPassToMessagePopup.button = this.zapBannerMessagesArrayForWrongSkiptimePopup[2].contentTitle;
                objToPassToMessagePopup.showTime = this.conf.popupInteractiveMessageWrongShowTimer;
                fw.popupManager.showPopup(fw.conf.popupMessageName, objToPassToMessagePopup, null, null)
            }
        } catch (ex) {
            ex.errMethod = "skipToTime";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    },
    createZapbannerMessagesArrayForBookmarkInteractivePopup: function () {
        try {
            var arrayToParse = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.popupInteractiveMessageBookMarkArray);
            return arrayToParse
        } catch (ex) {
            ex.errMethod = "createZapbannerMessagesArrayForBookmarkInteractivePopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, createZapbannerMessagesArrayForStopVodInteractivePopup: function () {
        try {
            var arrayToParse = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.popupInteractiveMessageStopVodArray);
            return arrayToParse
        } catch (ex) {
            ex.errMethod = "createZapbannerMessagesArrayForStopVodInteractivePopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, createZapbannerMessagesArrayForWrongSkiptimePopup: function () {
        try {
            var arrayToParse = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.popupInteractiveMessageWrongSkipTimeArray);
            return arrayToParse
        } catch (ex) {
            ex.errMethod = "createZapbannerMessagesArrayForWrongSkiptimePopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerCloseInteractiveBookmarkPopup: function (_prop) {
        try {
            if (_prop ==
                null || _prop == undefined) {
                fw.mwRequestManager.unregisterStopEventCallback();
                this.appObj.init(new Array(fw.conf.backLabel, this.appObj.selectedCategoryContent))
            } else {
                switch (_prop.toLowerCase()) {
                    case "restart":
                        fw.mediaManager.playVOD(this.movieObject[0], 0, this.playingTrailer, this.zapBannerPlayerPlayCallback, this, null);
                        break;
                    case "resume":
                        fw.mediaManager.playVOD(this.movieObject[0], this.movieObject[0].bookmarks, this.playingTrailer, this.zapBannerPlayerPlayCallback, this, this.movieObject[0].bookmarks);
                        break;
                    case "epg":
                        this.navigateInAhead = true;
                        setTimeout(function () {
                            fw.mwManager.openEPG("DEFAULT", "")
                        }, this.startGidsTimeout);
                        break;
                    case "menu":
                        this.navigateInAhead = true;
                        fw.mwManager.openMenu();
                        break;
                    case "radio":
                        this.navigateInAhead = true;
                        fw.mwManager.listenToRadio();
                        break;
                    case "tv":
                        this.navigateInAhead = true;
                        fw.mwManager.watchDTV();
                        break
                }
                this.checkIfUpdateZapbannerIntervalTimerHasToBeCalled()
            }
        } catch (ex) {
            ex.errMethod = "zapBannerCloseInteractiveBookmarkPopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerCloseInteractiveBookmarkPopupFromOptionMenu: function (_prop) {
        try {
            var zapbannerHaveToBeUpdated =
                true;
            switch (_prop.toLowerCase()) {
                case "restart":
                    this.jumpToTimeTimer(0, this.zapBannerJumpToTimeCallback, this, null);
                    break;
                case "resume":
                    this.jumpToTimeTimer(this.movieObject[0].bookmarks, this.zapBannerJumpToTimeCallback, this, null);
                    break;
                case "epg":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    setTimeout(function () {
                        fw.mwManager.openEPG("DEFAULT", "")
                    }, this.startGidsTimeout);
                    break;
                case "menu":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.openMenu();
                    break;
                case "radio":
                    this.navigateInAhead =
                        true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.listenToRadio();
                    break;
                case "tv":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.watchDTV();
                    break
            }
            if (zapbannerHaveToBeUpdated)this.checkIfUpdateZapbannerIntervalTimerHasToBeCalled()
        } catch (ex) {
            ex.errMethod = "zapBannerCloseInteractiveBookmarkPopupFromOptionMenu";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerCloseInteractiveBookmarkPopupFromExtendZapBanMenu: function (_prop) {
        try {
            var zapbannerHaveToBeUpdated = true;
            switch (_prop.toLowerCase()) {
                case "restart":
                    this.jumpToTimeTimer(0,
                        this.zapBannerJumpToTimeCallback, this, null);
                    break;
                case "resume":
                    this.jumpToTimeTimer(this.movieObject[0].bookmarks, this.zapBannerJumpToTimeCallback, this, null);
                    break;
                case "epg":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    setTimeout(function () {
                        fw.mwManager.openEPG("DEFAULT", "")
                    }, this.startGidsTimeout);
                    break;
                case "menu":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.openMenu();
                    break;
                case "radio":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.listenToRadio();
                    break;
                case "tv":
                    this.navigateInAhead = true;
                    zapbannerHaveToBeUpdated = false;
                    fw.mwManager.watchDTV();
                    break
            }
            if (zapbannerHaveToBeUpdated) {
                this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                this.moduleMiniZapbanner.showBackgroundImage();
                this.adjustGraphics(this.STATEMINIZAPBANNER);
                this.checkIfUpdateZapbannerIntervalTimerHasToBeCalled()
            }
        } catch (ex) {
            ex.errMethod = "zapBannerCloseInteractiveBookmarkPopupFromExtendZapBanMenu";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerCloseInteractiveStopVodPopup: function (_prop) {
        try {
            switch (_prop.toLowerCase()) {
                case "gobackhistory":
                    switch (this.interactivePopupCallbackEvent.keyCode) {
                        case fw.keys.code.BACK:
                            this.stopVideo();
                            break;
                        case fw.keys.code.MENU:
                            this.navigateInAhead = true;
                            fw.mwManager.openMenu();
                            break;
                        case fw.keys.code.GIDS:
                            this.navigateInAhead = true;
                            setTimeout(function () {
                                fw.mwManager.openEPG("DEFAULT", "")
                            }, this.startGidsTimeout);
                            break;
                        case "watchVideo":
                            this.stopVideo();
                            break;
                        case fw.keys.code.TV:
                            this.navigateInAhead = true;
                            fw.mwManager.watchDTV();
                            break;
                        case "searchInVideotheek":
                            this.navigateInAhead = true;
                            fw.mwManager.openSearch("VOD", "VOD", "");
                            break;
                        case "searchInProgrammaGemist":
                            this.navigateInAhead = true;
                            fw.mwManager.openSearch("PG",
                                "PG", "");
                            break;
                        case "searchInAll":
                            this.navigateInAhead = true;
                            fw.mwManager.openSearch("", "", "");
                            break;
                        case fw.keys.code.HELP:
                            this.navigateInAhead = true;
                            this.stopVideo();
                            var _this = this;
                            setTimeout(function () {
                                switch (fw.appManager.getCurrentApp()) {
                                    case _this.PG:
                                        fw.appManager.goToHtmlApp("Help", null, new Array("scenariohelp", "zapBanner", "Live tv pauzeren"), false, true);
                                        break;
                                    case _this.HELPVODCATALOGUE:
                                    case _this.VODCATALOGUE:
                                    case _this.RENTEDITEMS:
                                        fw.appManager.goToHtmlApp("Help", null, new Array("scenariohelp",
                                            "default", "Videotheek"), false, true);
                                        break
                                }
                            }, 100);
                            break
                    }
                    break
            }
        } catch (ex) {
            ex.errMethod = "zapBannerCloseInteractiveStopVodPopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, createZapBannerOptionMenuObject: function () {
        try {
            var optMenuObj = new Object;
            var objToReturn = fw.util.returnAppMessageArrayFromObject(this.appObj.messages, this.conf.ModuleZapBannerExtendedConf.OptionMenuConf.optMenu.menuElement);
            optMenuObj.menuElement = objToReturn;
            optMenuObj.hasLiveVideo = this.conf.ModuleZapBannerExtendedConf.OptionMenuConf.optMenu.hasLiveVideo;
            return optMenuObj
        } catch (ex) {
            ex.errMethod = "createZapBannerOptionMenuObject";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerPlayerPlayCallback: function (_prop, _playResult, _length) {
        try {
            if (_playResult != undefined && (_playResult != null && _playResult == fw.mediaManager.PlayResult.PLAY_SUCCESS)) {
                this.startVod = true;
                this.playerStartedAtLeastOneTime = true;
                if (this.inputObj[0] != "playhelpvideo") {
                    if (this.getActiveZapBannerState() != this.STATEMINIZAPBANNER) {
                        this.moduleMiniZapbanner.showBackgroundImage();
                        this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                        this.adjustGraphics(this.STATEMINIZAPBANNER)
                    }
                    this.moduleMiniZapbanner.setMediaSpeed("");
                    this.mediaPlayerVisualSpeedsIterator = -1;
                    this.moduleMiniZapbanner.setVodTime(this.moduleMiniZapbanner.getFormattedVodRuntime(_length))
                }
                this.movieObject[0].realLength = _length;
                this.appObj.selectedCategoryContent.realLength = _length;
                this.checkInfoPage(this.appObj.selectedCategoryContent)
            } else {
                var playresponseMessagePopupDynamicConfObj = new Object;
                playresponseMessagePopupDynamicConfObj.title = this.appObj.messages.zapbanner_playresponse_message_popup_title;
                playresponseMessagePopupDynamicConfObj.message = this.appObj.messages.zapbanner_playresponse_message_popup_message;
                playresponseMessagePopupDynamicConfObj.button = this.appObj.messages.zapbanner_playresponse_message_popup_button;
                fw.popupManager.showPopup(fw.conf.popupMessageName, playresponseMessagePopupDynamicConfObj, this.zapBannerMessagePopupMissingVODCallback, this)
            }
        } catch (ex) {
            ex.errMethod = "zapBannerPlayerPlayCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerPlayerChangeSpeedCallback: function (_prop,
                                                     _success, _speed) {
        try {
            if (_success == 0) {
                if (_speed < 0)this.moduleMiniZapbanner.setMediaSpeed(_prop); else if (_speed > 100)this.moduleMiniZapbanner.setMediaSpeed(_prop); else if (_speed == 100)this.mediaPlayerVisualSpeedsIterator = -1; else this.mediaPlayerVisualSpeedsIterator = -1;
                if (this.getActiveZapBannerState() == this.STATEFULLSCREEN && (this.isForwarding || (this.isRewinding || this.isPaused))) {
                    this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                    this.adjustGraphics(this.STATEMINIZAPBANNER, false)
                }
            }
        } catch (ex) {
            ex.errMethod =
                "zapBannerPlayerChangeSpeedCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerJumpToTimeCallback: function (_prop, _success) {
        try {
            fw.log.info("zapBannerJumpToTimeCallback _prop : " + _prop + " _success : " + _success);
            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
            this.moduleMiniZapbanner.showBackgroundImage();
            this.adjustGraphics(this.STATEMINIZAPBANNER);
            this.checkIfUpdateZapbannerIntervalTimerHasToBeCalled()
        } catch (ex) {
            ex.errMethod = "zapBannerJumpToTimeCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, stopCallback: function (_prop, _result, _stopReason) {
        try {
            this.playerStartedAtLeastOneTime = false;
            this.cleanAllTimerAndCallback();
            var stopNotByUserRequest = _stopReason != fw.mediaManager.StopReason.STOP_REASON_USER_REQUEST.toString();
            var stopReasonString = this.getStopReasonString(_stopReason);
            fw.log.info("ScenarioZapbanner - stopCallback - stopNotByUserRequest : " + stopNotByUserRequest + "  -   _stopReason : " + stopReasonString);
            var assetUrl = this.checkIfPlayImlVod();
            if (assetUrl != null) {
                fw.log.info("ScenarioZapbanner - stopCallback - assertUrl : " +
                    assertUrl);
                fw.mwManager.getVodFromAssetUrl(assetUrl, this.getVodCallback, this, null)
            } else {
                fw.log.info("ScenarioZapbanner - stopCallback - this.playingTrailer : " + this.playingTrailer);
                if (!this.playingTrailer)if (this.appObj.selectedCategoryContent != undefined && this.appObj.selectedCategoryContent != null)if (stopNotByUserRequest) {
                    fw.log.info("ScenarioZapbanner - stopCallback - Updating bookmark to zero");
                    this.appObj.selectedCategoryContent.bookmarks = 0
                } else {
                    if (this.currentPosition < this.appObj.selectedCategoryContent.realLength)this.appObj.selectedCategoryContent.bookmarks =
                        this.currentPosition; else this.appObj.selectedCategoryContent.bookmarks = 0;
                    fw.log.info("ScenarioZapbanner - stopCallback - Updating bookmark : " + this.appObj.selectedCategoryContent.bookmarks)
                }
                fw.log.info("ScenarioZapbanner - stopCallback - this.infoPageEnabled : " + this.infoPageEnabled + " - this.openInfoPageAtEOS : " + this.openInfoPageAtEOS);
                if (!this.playingTrailer && (this.infoPageEnabled && ((stopReasonString == "STOP_REASON_STOPPED_BY_HAL" || stopReasonString == "STOP_REASON_END_OF_STREAM") && this.openInfoPageAtEOS))) {
                    fw.log.info("ScenarioZapbanner - stopCallback - open Infopage");
                    this.openInfoPage(true, true)
                } else {
                    fw.log.info("ScenarioZapbanner - stopCallback - this.navigateInAhead : " + this.navigateInAhead);
                    if (this.navigateInAhead == null || (this.navigateInAhead == undefined || this.navigateInAhead == false)) {
                        fw.log.info("ScenarioZapbanner - stopCallback - forceGoBack");
                        this.forceGoBack()
                    }
                    this.navigateInAhead = false
                }
            }
        } catch (ex) {
            ex.errMethod = "stopCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, checkIfPlayImlVod: function () {
        try {
            if (this.inputObj[0].toString().toLowerCase() == "playvodiml" &&
                (this.inputObj[1] != null && (this.inputObj[1] != undefined && (this.inputObj[1].assetUrl != null && this.inputObj[1].assetUrl != undefined))))return this.inputObj[1].assetUrl; else return null
        } catch (ex) {
            ex.errMethod = "checkIfPlayImlVod";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, stopVideo: function () {
        try {
            fw.mediaManager.tuneLastDTVChannel()
        } catch (ex) {
            ex.errMethod = "stopVideo";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, forceGoBack: function () {
        try {
            var _this = this;
            if (this.directAccess != null && (this.directAccess != undefined &&
                this.directAccess == true))fw.mwManager.goBackInHistory(); else setTimeout(function () {
                _this.appObj.init(new Array(fw.conf.backLabel, _this.appObj.selectedCategoryContent))
            }, 1)
        } catch (ex) {
            ex.errMethod = "forceGoBack";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerMessagePopupMissingVODCallback: function () {
        try {
            fw.log.debug("zapBannerMessagePopupMissingVODCallback-this.playerStartedAtLeastOneTime:" + this.playerStartedAtLeastOneTime);
            this.stopVideo();
            if (!this.playerStartedAtLeastOneTime) {
                this.cleanAllTimerAndCallback();
                this.forceGoBack()
            }
        } catch (ex) {
            ex.errMethod = "zapBannerMessagePopupMissingVODCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, zapBannerPlayerStateChangeCallback: function (_result, _playbackState) {
        try {
            this.playbackState = _playbackState;
            this.setTrickplayInMiniZapbanner(_playbackState.playbackState, false);
            if (_playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PLAY || (_playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_FFWD || (_playbackState.playbackState ==
                fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_REW || _playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PAUSED))) {
                var position = _playbackState.position;
                if (_playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_FFWD) {
                    if (position > this.currentPosition) {
                        fw.log.debug("FFW : " + position);
                        this.currentPosition = _playbackState.position
                    }
                } else if (_playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_REW) {
                    if (position < this.currentPosition) {
                        fw.log.debug("FRW : " +
                            position);
                        this.currentPosition = _playbackState.position
                    }
                } else this.currentPosition = _playbackState.position;
                if (this.inputObj.length > 5 && (this.inputObj[6] != undefined && (this.inputObj[6] != null && this.inputObj[6] == "FROM_RED_NO_POPUP"))) {
                    this.openInfoPageAtEOS = true;
                    this.inputObj[6] = null
                }
                if (this.currentPosition > 0) {
                    var realLength = this.appObj.selectedCategoryContent.realLength;
                    if (this.movieObject[0].realLength != undefined && this.movieObject[0].realLength != null)realLength = this.movieObject[0].realLength;
                    fw.log.debug("realLength: " +
                        realLength);
                    if (realLength != undefined && this.currentPosition <= realLength) {
                        this.moduleMiniZapbanner.setProgressBarCache(this.currentPosition, realLength);
                        this.moduleMiniZapbanner.setCurrentPosTime(this.moduleMiniZapbanner.getFormattedVodRuntimeString(this.currentPosition));
                        var percCurrPos = this.currentPosition * 100 / realLength;
                        var treshold = fw.conf.IMLPercTreshold;
                        if (percCurrPos > treshold)this.infoPageTresholdReached = true
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "zapBannerPlayerStateChangeCallback";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, setTrickplayInMiniZapbanner: function (_playbackState, _forceUpdate) {
        try {
            if (_forceUpdate || !this.inTrickplay)switch (_playbackState) {
                case fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PLAY:
                    if (this.isRewinding) {
                        this.isRewinding = false;
                        this.isForwarding = false;
                        if (this.getActiveZapBannerState() == this.STATEFULLSCREEN) {
                            this.setActiveZapBannerState(this.STATEMINIZAPBANNER);
                            this.adjustGraphics(this.STATEMINIZAPBANNER, true)
                        } else this.resetTimeout();
                        this.mediaPlayerVisualSpeedsIterator = -1
                    }
                    this.moduleMiniZapbanner.setTrickPlayIcon("play");
                    this.moduleMiniZapbanner.setMediaSpeed("");
                    break;
                case fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_FFWD:
                    this.moduleMiniZapbanner.setTrickPlayIcon("forward");
                    break;
                case fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_REW:
                    this.moduleMiniZapbanner.setTrickPlayIcon("rewind");
                    break;
                case fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PAUSED:
                    this.moduleMiniZapbanner.setTrickPlayIcon("pause");
                    this.moduleMiniZapbanner.setMediaSpeed("");
                    break;
                case fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_STOPPED:
                    this.moduleMiniZapbanner.setMediaSpeed("");
                    break
            }
        } catch (ex) {
            ex.errMethod = "setTrickplayInMiniZapbanner";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, checkIfUpdateZapbannerIntervalTimerHasToBeCalled: function () {
        try {
            this.checkMediaManagerGetPlaybackState()
        } catch (ex) {
            ex.errMethod = "checkIfUpdateZapbannerIntervalTimerHasToBeCalled";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, checkMediaManagerGetPlaybackState: function () {
        try {
            if (this.timerTimeZapbanner)fw.util.clearTimeout(this.timerTimeZapbanner);
            fw.mediaManager.getPlaybackState();
            var _this = this;
            _this.timerTimeZapbanner = fw.util.setTimeout(function () {
                _this.checkMediaManagerGetPlaybackState()
            }, 1E3)
        } catch (ex) {
            ex.errMethod = "checkMediaManagerGetPlaybackState";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, cleanScenario: function () {
        try {
            fw.popupManager.closePopups();
            fw.overlayManager.closeOverlays()
        } catch (ex) {
            ex.errMethod = "cleanScenario";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, showInteractivePopup: function (_evt, _focusKO, _specificMessage) {
        try {
            var objToPassToInteractivePopup = new Object;
            objToPassToInteractivePopup.title =
                this.zapBannerMessagesArrayForStopVodInteractivePopup[0].contentTitle;
            if (_specificMessage == null || (_specificMessage == undefined || _specificMessage == ""))objToPassToInteractivePopup.message = this.zapBannerMessagesArrayForStopVodInteractivePopup[1].contentTitle; else objToPassToInteractivePopup.message = _specificMessage;
            objToPassToInteractivePopup.buttonOKlabel = this.zapBannerMessagesArrayForStopVodInteractivePopup[2].contentTitle;
            objToPassToInteractivePopup.buttonKOlabel = this.zapBannerMessagesArrayForStopVodInteractivePopup[3].contentTitle;
            objToPassToInteractivePopup.buttonOKstatus = "GoBackHistory";
            objToPassToInteractivePopup.buttonKOstatus = "";
            if (_focusKO != null && (_focusKO != undefined && _focusKO == true))objToPassToInteractivePopup.focusKO = true; else objToPassToInteractivePopup.focusKO = false;
            this.interactivePopupCallbackEvent = _evt;
            fw.popupManager.showPopup(fw.conf.popupInteractiveName, objToPassToInteractivePopup, this.zapBannerCloseInteractiveStopVodPopup, this)
        } catch (ex) {
            ex.errMethod = "showInteractivePopup";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    },
    goToRentedItemsCatalogue: function () {
        try {
            var obj = new Array;
            obj[0] = "Catalogue";
            obj[1] = "MijnGehuurde";
            var myRentedItemsBreadcrumbList = new Array(3);
            myRentedItemsBreadcrumbList.push(appObj.messages.myRentedItemsBreadcrumbList_Start);
            myRentedItemsBreadcrumbList.push(appObj.messages.myRentedItemsBreadcrumbList_VideoLibrary);
            myRentedItemsBreadcrumbList.push(appObj.messages.myRentedItemsBreadcrumbList_MyRentedVideos);
            obj[2] = myRentedItemsBreadcrumbList;
            this.navigateInAhead = true;
            this.stopVideo();
            fw.appManager.goToHtmlApp("VodCatalogue",
                "DefaultSkin", obj, false, true)
        } catch (ex) {
            ex.errMethod = "goToRentedItemsCatalogue";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, resetTimeout: function () {
        try {
            var _this = this;
            fw.util.clearTimeout(this.closeZapbannerInterval);
            this.closeZapbannerInterval = fw.util.setTimeout(function () {
                if (!_this.isPaused && _this.activeState != _this.STATEEXTENDEDZAPBANNER) {
                    _this.setActiveZapBannerState(_this.STATEFULLSCREEN);
                    _this.adjustGraphics(_this.STATEFULLSCREEN)
                }
            }, this.CLOSEZAPBANNERINTERVALTIMEOUT)
        } catch (ex) {
            ex.errMethod =
                "resetTimeout";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, checkInfoPage: function (_movieObj) {
        try {
            this.infoPageEnabled = false;
            this.infoPageUrl = null;
            this.infoPageAutoCall = false;
            if (_movieObj != undefined && (_movieObj != null && (_movieObj.infoPage != undefined && _movieObj.infoPage != null))) {
                if (_movieObj.newItemURL != undefined && (_movieObj.newItemURL != null && _movieObj.newItemURL != ""))this.infoPageUrl = _movieObj.newItemURL; else if (_movieObj.itemURL != undefined && (_movieObj.itemURL != null && _movieObj.itemURL != ""))this.infoPageUrl =
                    _movieObj.itemURL;
                if (this.infoPageUrl != null)switch (_movieObj.infoPage.toLowerCase()) {
                    case "forced":
                        this.infoPageEnabled = true;
                        this.infoPageAutoCall = true;
                        break;
                    case "present":
                        this.infoPageEnabled = true;
                        this.infoPageAutoCall = false;
                        break
                }
            }
            if (!this.playingTrailer && this.infoPageAutoCall)this.openInfoPage(false, false)
        } catch (ex) {
            ex.errMethod = "checkInfoPage";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, openInfoPage: function (_stopVod, _fromEndVideo) {
        try {
            if (this.infoPageEnabled)if (this.infoPageUrl != null && (this.infoPageUrl.length >
                0 && this.infoPageUrl.indexOf("://") !== -1)) {
                this.navigateInAhead = true;
                if (_stopVod != undefined && (_stopVod != null && _stopVod)) {
                    this.fromInfoPage = "STOP";
                    this.stopVideo()
                } else {
                    this.fromInfoPage = "RED";
                    this.playPauseVodIML()
                }
                fw.mwManager.openIML(this.infoPageUrl)
            } else {
                var objToPassToInteractivePopup = new Object;
                objToPassToInteractivePopup.title = " ";
                objToPassToInteractivePopup.message = this.appObj.messages.zapBannerErrorInfoPageMessagePopUp;
                objToPassToInteractivePopup.button = this.appObj.messages.zapBannerErrorInfoPageOkButtonPopUp;
                if (_fromEndVideo != null && (_fromEndVideo != undefined && _fromEndVideo == true))fw.popupManager.showPopup(fw.conf.popupMessageName, objToPassToInteractivePopup, this.forceGoBack, this); else fw.popupManager.showPopup(fw.conf.popupMessageName, objToPassToInteractivePopup, null, null)
            }
        } catch (ex) {
            ex.errMethod = "openInfoPage";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, playPauseVodIML: function () {
        try {
            this.mediaPlayerVisualSpeedsIterator = -1;
            this.resetTimeout();
            if (!this.skipToTimeMaskEnabled)this.isPaused = !(this.isPaused ||
            (this.isForwarding || this.isRewinding));
            if (this.fromInfoPage == "RED")this.isPaused = true;
            this.isRewinding = false;
            this.isForwarding = false;
            this.setPauseIML(this.isPaused ? 0 : 100, this.zapBannerPlayerChangeSpeedCallback, this, null)
        } catch (ex) {
            ex.errMethod = "playPauseVodIML";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, setPauseIML: function (_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.zapBannerPlayerChangeSpeedCallback(_callerCallbackParams, 0, _speed);
            var playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PLAY;
            if (this.isRewinding)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_REW; else if (this.isForwarding)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_FFWD; else if (this.isPaused)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PAUSED;
            this.setTrickplayInMiniZapbanner(playbackState, true);
            this.inTrickplay = false;
            fw.mediaManager.changeSpeed(_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "setPauseIML";
            ex.errClass =
                "ScenarioZapbanner";
            fw.err(ex)
        }
    }, playPauseVod: function () {
        try {
            this.mediaPlayerVisualSpeedsIterator = -1;
            this.resetTimeout();
            if (!this.skipToTimeMaskEnabled) {
                this.isPaused = false;
                if (this.playbackState.playbackState == fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PLAY)this.isPaused = true
            }
            if (this.fromInfoPage == "RED")this.isPaused = true;
            this.changeSpeedTimer(this.isPaused ? 0 : 100, this.zapBannerPlayerChangeSpeedCallback, this, null)
        } catch (ex) {
            ex.errMethod = "playPauseVod";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    },
    onScreenNotification: function (_paramsobj, _id) {
        try {
            var _this = this;
            this.slideOpen = function () {
                this.isActiveNotification = true;
                this.message_id = _id;
                fw.effects.slideHoriz(this.zapBannerNotification, this, null, false, true, 600, 0, -5);
                this.timerZapbannerNotification = fw.util.setTimeout(function () {
                    _this.isActiveNotification = false;
                    _this.zapBannerNotification.getModCntObj().setX(-407)
                }, 5E3)
            };
            this.slideClose = function () {
                if (_this.isActiveNotification) {
                    if (_this.timerZapbannerNotification != null && _this.timerZapbannerNotification !=
                        undefined) {
                        clearTimeout(_this.timerZapbannerNotification);
                        _this.timerZapbannerNotification = null
                    }
                    _this.isActiveNotification = false;
                    _this.zapBannerNotification.getModCntObj().setX(-407)
                }
            };
            if ((this.isActiveNotification == false || this.isActiveNotification == undefined) && (this.getActiveZapBannerState() === this.STATEFULLSCREEN && fw.overlayManager.currentOverlayId == null))this.slideOpen()
        } catch (ex) {
            ex.errMethod = "onScreenNotification";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, reloadVodAfterInfoPage: function () {
        try {
            if (this.inputObj.length >
                5 && (this.inputObj[6] != undefined && (this.inputObj[6] != null && this.inputObj[6] == "FROM_RED_NO_POPUP"))) {
                var currentItem = fw.mwManager.getCurrentItem();
                var movieToPlay = this.inputObj[3];
                return currentItem == undefined || (currentItem == null || (currentItem.id == undefined && currentItem.id == null || currentItem.id != movieToPlay.id))
            } else return true
        } catch (ex) {
            ex.errMethod = "reloadVodAfterInfoPage";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, getStopReasonString: function (_stopReason) {
        var strToReturn = "";
        switch (_stopReason) {
            case fw.mediaManager.StopReason.STOP_REASON_USER_REQUEST:
                strToReturn =
                    "STOP_REASON_USER_REQUEST";
                break;
            case fw.mediaManager.StopReason.STOP_REASON_RC_SERVICE_REQUEST:
                strToReturn = "STOP_REASON_RC_SERVICE_REQUEST";
                break;
            case fw.mediaManager.StopReason.STOP_REASON_HD_INTEREST_DISABLED:
                strToReturn = "STOP_REASON_HD_INTEREST_DISABLED";
                break;
            case fw.mediaManager.StopReason.STOP_REASON_END_OF_STREAM:
                strToReturn = "STOP_REASON_END_OF_STREAM";
                break;
            case fw.mediaManager.StopReason.STOP_REASON_POWER_LEVEL_CHANGED:
                strToReturn = "STOP_REASON_POWER_LEVEL_CHANGED";
                break;
            case fw.mediaManager.StopReason.STOP_REASON_STOPPED_BY_HAL:
                strToReturn =
                    "STOP_REASON_STOPPED_BY_HAL";
                break;
            default:
                strToReturn = "DEFAULT UNRECOGNIZED STOP_REASON";
                break
        }
        return strToReturn
    }, verifyIfLocked: function (_movie) {
        try {
            return this.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe)
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, callBackInsertPin: function (_res) {
        try {
            if (_res === "OK")this.fillVodZapbannerDetailsData(this.movieObject[0]); else fw.mwManager.watchDTV()
        } catch (ex) {
            ex.errMethod = "callBackInsertPin";
            ex.errClass =
                "ScenarioZapbanner";
            fw.err(ex)
        }
    }, changeSpeedTimer: function (_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.zapBannerPlayerChangeSpeedCallback(_callerCallbackParams, 0, _speed);
            var playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PLAY;
            if (this.isRewinding)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_REW; else if (this.isForwarding)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_FFWD; else if (this.isPaused)playbackState = fw.mediaManager.PlaybackStateEnum.PLAYBACK_STATE_PAUSED;
            this.setTrickplayInMiniZapbanner(playbackState, true);
            if (this.trickplayTimer != null)fw.util.clearTimeout(this.trickplayTimer);
            var _this = this;
            this.inTrickplay = true;
            if (_speed == 0) {
                this.inTrickplay = false;
                fw.mediaManager.changeSpeed(_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            } else this.trickplayTimer = setTimeout(function () {
                _this.inTrickplay = false;
                fw.mediaManager.changeSpeed(_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }, fw.conf.trickplayTimerInterval)
        } catch (ex) {
            ex.errMethod =
                "changeSpeedTimer";
            ex.errClass = "ScenarioZapbanner";
            fw.err(ex)
        }
    }, jumpToTimeTimer: function (_offset, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            fw.util.clearTimeout(this.trickplayTimer);
            var _this = this;
            this.inTrickplay = true;
            this.trickplayTimer = fw.util.setTimeout(function () {
                _this.inTrickplay = false;
                fw.mediaManager.jumpToTime(_offset, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }, fw.conf.trickplayTimerInterval)
        } catch (ex) {
            ex.errMethod = "jumpToTimeTimer";
            ex.errClass =
                "ScenarioZapbanner";
            fw.err(ex)
        }
    }
});
