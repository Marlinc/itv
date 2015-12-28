var ScenarioTVOY = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        $super(_prop);
        try {
            this.id = _prop.id;
            this.conf = _conf;
            this.appObj = _parentObj;
            this.requestId = 0;
            this.currentShownCategoryName = "root";
            this.currentLeftMenuParent = "root";
            this.lastParentBreadcrumbElement = "root";
            this.fromChangeSkinElement = false;
            this.isTopButtonShown = false;
            this.banner = null;
            this.timerOtt = null;
            this.timerOtt_value = 5E3;
            this.navigationTree = new Array;
            this.currentMenuArray = null;
            this.currentDataArray = null;
            this.rightPanelElementsString =
                null;
            this.currentBreacrumbList = "";
            this.currPath = "default";
            this.lastShownCategoryIdElements = null;
            this.messagesArrayForBookmarkInteractivePopup = this.createMessagesArrayForBookmarkInteractivePopup();
            this.tvoyCatBreadcrumb = cssUtil.addElementToDom(Breadcrumb, "TVOYCatBreadcrumb", this.conf.tvoyCatBreadcrumb, this.getScenObj());
            this.tvoyCatHourTxt = cssUtil.addElementToDom(Text, "TVOYCatHourTxt", this.conf.tvoyCatHourTxt, this.getScenObj());
            this.tvoyCatDataTxt = cssUtil.addElementToDom(Text, "TVOYCatDataTxt", this.conf.tvoyCatDataTxt,
                this.getScenObj());
            this.tvoyCatLogoImg = cssUtil.addElementToDom(Image, "TVOYCatLogoImg", this.conf.tvoyCatLogoImg, this.getScenObj());
            this.tvoyCatBannerImg = cssUtil.addElementToDom(Image, "TVOYCatBannerImg", this.conf.tvoyCatBannerImg, this.getScenObj());
            this.tvoyListingHeaderText = cssUtil.addElementToDom(Text, "TVOYCatListingHeaderTxt", this.conf.loading, this.getScenObj());
            this.rentItmChanNumTxt = cssUtil.addElementToDom(ChanNumTxt, "RentItmChanNumTxt", this.conf.tvoyItemChanNumTxt, this.getScenObj());
            this.rentItmChanNumTxt.setCallBack(this,
                this.tvoyKeyboardPressedCallBack);
            this.tvoyCatModuleMenuList = new ModuleMenuList(this, this.conf.tvoyCatModuleMenuList, this.conf.tvoyCatModuleMenuListConf, Button, null, this, this.tvoyMenuModuleListCallback, true);
            this.tvoyCatGrid = new ModulePerZender(this, this.conf.ModuleRight, this.conf.ModulePerZenderConf, null, this, this, this.tvoyModuleGridListCallback);
            this.tvoyCatModuleList = new ModuleList(this, this.conf.ModuleRightPrograms, this.conf.ModuleProgramsConf, null, TvoyItemList);
            this.tvoyCatModuleEpisodesList =
                new ModuleEpisodesList(this, this.conf.ModuleRightEpisodes, this.conf.ModuleEpisodesListConf, null, TvoyItemEpisodeList, this, this.tvoyModuleEpisodeListCallback, this.appObj);
            this.tvoyCatModuleInfo = new ModuleItemInfo(this, this.conf.tvoyCatModuleInfo, this.conf.tvoyCatModuleInfoConf);
            this.tvoyCatModuleInfo.hide();
            this.tvoyCatModuleMenuList.setTopButton(eval("this.appObj.messages.ProgrammaGemistMainMenu"));
            this.tvoyCatModuleMenuList.hideTopButton();
            this.drawPGFooter();
            this.currentShownElem = null;
            this.currentFocusedElem =
                null;
            this.startingPhase = true;
            this.tvoyCatOptionMenuRootLeftPanel = null;
            this.tvoyCatOptionMenuRootRightPanel = null;
            this.tvoyCatOptionMenuSubcategoriesRightPanel = null;
            this.tvoyCatOptionMenuSubcategoriesLeftPanel = null;
            this.optionMenuConfPGListViewEpisodesSortByTimeLeftMenu = null;
            this.optionMenuConfPGListViewEpisodesSortByTimeRightMenu = null;
            this.optionMenuConfPGListViewEpisodesSortByAZLeftMenu = null;
            this.optionMenuConfPGListViewEpisodesSortByAZRightMenu = null;
            this.tvoyCreateOptionMenuObjects();
            this.tvoyIsGridShown =
                true;
            this.orderInList = fw.conf.getMovieFilterByDateTime;
            this.FOCUS_LEFT = 0;
            this.FOCUS_RIGHT = 1;
            this.currentFocus = this.FOCUS_LEFT;
            this.listingElements = null;
            this.subcategoriesArray = new Array;
            this.actualPagingIndex = 0;
            this.categoryIdToPassToDetailsPage = null;
            this.movie = null;
            this.inputObj = new Array;
            this.pcCheckSkipped = false;
            this.totalMoviesCountCallbackValue = 0;
            this.currentListingHeaderString = ""
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, drawPGFooter: function () {
        try {
            this.footerOpties =
                cssUtil.addElementToDom(FooterElement, "tvoyCatFooterOpties", this.conf.footerConfiguration.FooterElementOpties, this.getScenObj());
            this.footerOpties.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementOpties.txtCont.txt));
            this.footerElementPlayLeftFirstElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementPlayLeftFirstElement", this.conf.footerConfiguration.FooterElementPlayLeft1stElement, this.getScenObj());
            this.footerElementPlayRightFirstElement = cssUtil.addElementToDom(FooterElement,
                "tvoyCatFooterElementPlayRightFirstElement", this.conf.footerConfiguration.FooterElementPlayRight1stElement, this.getScenObj());
            this.footerElementPlayRightFirstElement.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementPlayRight1stElement.txtCont.txt));
            this.footerElementNavAllFirstElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementNavAllFirstElement", this.conf.footerConfiguration.FooterElementNavAll1stElement, this.getScenObj());
            this.footerElementNavAllFirstElement.setText(eval("this.appObj.messages." +
                this.conf.footerConfiguration.FooterElementNavAll1stElement.txtCont.txt));
            this.footerElementNavUpDownFirstElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementNavUpDownFirstElement", this.conf.footerConfiguration.FooterElementNavUpDown1stElement, this.getScenObj());
            this.footerElementNavUpDownFirstElement.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementNavUpDown1stElement.txtCont.txt));
            this.footerElementOKLeftSecondElement = cssUtil.addElementToDom(FooterElement,
                "tvoyCatFooterElementOKLeftSecondElement", this.conf.footerConfiguration.FooterElementOKLeft2ndElement, this.getScenObj());
            this.footerElementOKRightSecondElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementOKRightSecondElement", this.conf.footerConfiguration.FooterElementOKRight2ndElement, this.getScenObj());
            this.footerElementOKRightSecondElement.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementOKRight2ndElement.txtCont.txt));
            this.footerElementNavUpDownSecondElement =
                cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementNavUpDownSecondElement", this.conf.footerConfiguration.FooterElementNavUpDown2ndElement, this.getScenObj());
            this.footerElementNavUpDownSecondElement.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementNavUpDown2ndElement.txtCont.txt));
            this.footerElementOKLeftThirdElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementOKLeft", this.conf.footerConfiguration.FooterElementOKLeft3rdElement, this.getScenObj());
            this.footerElementOKRightThirdElement = cssUtil.addElementToDom(FooterElement, "tvoyCatFooterElementOKRight", this.conf.footerConfiguration.FooterElementOKRight3rdElement, this.getScenObj());
            this.footerElementOKRightThirdElement.setText(eval("this.appObj.messages." + this.conf.footerConfiguration.FooterElementOKRight3rdElement.txtCont.txt));
            this.fromBack = false;
            fw.log.debug("---- OTT : ottFooterElement.CREATING ELEMENT ON CSS");
            this.updateFooter()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, callBackShowBanner: function (_callerCallbackParams, _banner) {
        try {
            this.banner = _banner
        } catch (ex) {
            ex.errMethod = "callBackShowBanner";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, onHide: function () {
    }, onShow: function () {
    }, lockKeyBoard: function () {
        try {
            fw.keys.lock()
        } catch (ex) {
            ex.errMethod = "lockKeyBoard";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, unLockKeyBoard: function () {
        try {
            fw.keys.unlock()
        } catch (ex) {
            ex.errMethod = "unLockKeyBoard";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getCurrentInputObj: function () {
        try {
            var obj =
                new Object;
            obj.action = "backHistory";
            obj.currentFocusedElem = this.currentFocusedElem;
            obj.currentShownElem = this.currentShownElem;
            obj.currentPath = this.currPath;
            return new Array("Catalogue", obj)
        } catch (ex) {
            ex.errMethod = "getCurrentInputObj";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.tvoyCatLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo());
            fw.util.setHourDataTimer(this.tvoyCatHourTxt, this.tvoyCatDataTxt);
            this.inputObj = _inputObj;
            this.needToChangeSkin = false;
            if (_inputObj[1] !=
                undefined && (_inputObj[1] != null && _inputObj[1].action == "backHistory")) {
                this.currPath = _inputObj[1].currentPath;
                if (this.appObj.checkSubSkinChange(this.currPath)) {
                    var _this = this;
                    setTimeout(function () {
                        _this.appObj.setSubSkin(_this.currPath, null, null)
                    }, 1)
                }
                this.currentShownElem = _inputObj[1].currentShownElem;
                this.currentFocusedElem = _inputObj[1].currentFocusedElem;
                var breadCrumbArray = new Array;
                var breadcrumbContainsProgrammaLabel = false;
                breadCrumbArray = fw.util.cloneAllObjectType(this.tvoyCatBreadcrumb.getBreadCrumbList());
                for (a = 0; a < breadCrumbArray.length; a++)if (breadCrumbArray[a] == this.appObj.messages.programma_label)breadcrumbContainsProgrammaLabel = true;
                if (breadcrumbContainsProgrammaLabel && !this.isShowingEpisodes) {
                    breadCrumbArray.pop();
                    this.tvoyCatBreadcrumb.clear();
                    this.tvoyCatBreadcrumb.pushList(breadCrumbArray, true)
                }
                if (this.currentFocus == this.FOCUS_LEFT)fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null);
                if (this.currentFocus == this.FOCUS_RIGHT) {
                    var itemIdToShow = _inputObj[2] != null && _inputObj[2] != undefined ?
                        _inputObj[2].id : this.currentFocusedElem.id;
                    if (this.tvoyIsGridShown)this.tvoyCatGrid.setFocusOnElementByName("name", this.currentFocusedElem.name, this.currentFocus == this.FOCUS_RIGHT); else if (this.isShowingEpisodes) {
                        fw.log.debug("Programma Gemist : init: setting episodes focused element");
                        this.tvoyCatModuleEpisodesList.setFocusOnElementByName("id", itemIdToShow, this.currentFocus == this.FOCUS_RIGHT)
                    } else {
                        this.tvoyCatModuleList.setFocusOnElementByName("path", this.currentFocusedElem.path, this.currentFocus ==
                            this.FOCUS_RIGHT);
                        this.tvoyCatModuleInfo.setInfoByMoviePG(this.currentFocusedElem, false)
                    }
                    this.tvoyCatModuleInfo.show();
                    this.tvoyCatModuleMenuList.focusOff()
                } else if (!this.isShowingEpisodes && !this.tvoyIsGridShown) {
                    fw.log.debug("back : menu : ", this.tvoyCatModuleList.getMenuList());
                    var suffix = this.currentLeftMenuParent == this.appObj.messages["AllDays"] ? eval("this.appObj.messages.Programs") + " " : eval("this.appObj.messages.Programs");
                    var string = eval("this.appObj.messages.FoundItems") + " " + this.tvoyCatModuleList.getMenuList().length +
                        " " + suffix;
                    this.tvoyCatModuleList.setMenuList(this.tvoyCatModuleList.getMenuList());
                    this.tvoyCatModuleMenuList.focusOn()
                }
            } else {
                this.fromBack = false;
                this.clearModules();
                this.appObj.showOnlyTitles = fw.pcmanager.showOnlyTitles();
                this.setUserRetailLogo();
                var rootObject = this.conf.rootCategoryObject;
                this.isTopButtonShown = false;
                this.currentFocusedElem = rootObject;
                this.lastCheckedElement = this.currentFocusedElem;
                this.navigationTree = new Array;
                this.currentMenuArray = null;
                this.currentDataArray = null;
                this.rightPanelElementsString =
                    null;
                this.currentFocus = this.FOCUS_LEFT;
                this.tvoyCatBreadcrumb.clear();
                this.startingBreadcrumbStringArray = new Array;
                this.startingBreadcrumbStringArray.push(this.appObj.messages.Start);
                this.startingBreadcrumbStringArray.push(this.appObj.messages.ProgrammaGemist);
                this.tvoyCatBreadcrumb.pushList(this.startingBreadcrumbStringArray, true);
                this.currentShownCategoryName = "root";
                this.currentLeftMenuParent = "root";
                this.showCategoryInApp()
            }
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    },
    clearModules: function () {
        this.tvoyCatModuleMenuList.setItemUnSelected();
        this.tvoyCatModuleMenuList.hideTopButton();
        this.tvoyCatModuleMenuList.clean();
        this.tvoyCatModuleMenuList.hide();
        this.tvoyCatModuleEpisodesList.hide();
        this.tvoyCatModuleList.hide();
        this.tvoyCatGrid.hide();
        this.tvoyCatModuleInfo.hide();
        this.updateListingHeaderString("");
        this.tvoyCatBreadcrumb.clear()
    }, setUserRetailLogo: function () {
        try {
            this.tvoyCatLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo())
        } catch (ex) {
            ex.errMethod = "setUserRetailLogo";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyParseMenuListObject: function (_menuArray, _forceFocusToFirstItem) {
        try {
            this.currentMenuArray = new Array;
            fw.log.debug("tvoyParseMenuListObject - _menuArray : ", _menuArray);
            fw.log.debug("tvoyParseMenuListObject - FOCUSED ELE : ", this.currentFocusedElem);
            var _this = this;
            setTimeout(function () {
                if (_this.currentFocusedElem != null && _this.currentFocusedElem.name == eval("_this.appObj.messages.AllDays")) {
                    _this.currentLeftMenuParent = _this.currentFocusedElem.name;
                    _this.lastParentBreadcrumbElement =
                        _this.currentFocusedElem.name
                }
                var menu = new Array;
                for (a = 0; a < _menuArray.length; a++) {
                    var menuItem = fw.util.cloneAllObjectType(_menuArray[a]);
                    if (menuItem.elem != null && (menuItem.elem != undefined && menuItem.elem === eval("_this.conf.replace_subcategories_string")))for (var b = 0; b < _this.subcategoriesArray.length; b++) {
                        fw.log.debug("setting subcategory : " + _this.subcategoriesArray[b].name);
                        menu.push(_this.subcategoriesArray[b])
                    } else {
                        if (menuItem.action == "setDayName" && (menuItem.isPreviouslyParsed == null && menuItem.isPreviouslyParsed ==
                            undefined)) {
                            var filterName = (new Date).getDayNameForTM(0);
                            menuItem.path = menuItem.path + filterName;
                            menuItem.isPreviouslyParsed = true
                        } else if (menuItem.action == "setPrevDayName" && (menuItem.isPreviouslyParsed == null && menuItem.isPreviouslyParsed == undefined)) {
                            var filterName = (new Date).getDayNameForTM(-1);
                            menuItem.path = menuItem.path + filterName;
                            menuItem.isPreviouslyParsed = true
                        }
                        if (menuItem.elem != null && menuItem.elem != undefined)var name = eval("_this.appObj.messages." + menuItem.elem); else var name = menuItem.name;
                        if (menuItem.path !=
                            null && (menuItem.path != undefined && menuItem.path.indexOf(eval("_this.conf.replace_currentCategoryName_string")) != -1)) {
                            if (_this.currentFocusedElem != null) {
                                fw.log.debug("tvoyParseMenuListObject : need to replace " + eval("_this.conf.replace_currentCategoryName_string") + " with " + _this.currentFocusedElem.name);
                                var path = menuItem.path.replace(eval("_this.conf.replace_currentCategoryName_string"), _this.currentFocusedElem.name);
                                menuItem.path = path
                            }
                        } else if (menuItem.path != null && (menuItem.path != undefined && menuItem.path.indexOf(_this.conf.buildCompleteTimePath) != -1)) {
                            var path = _this.buildTimePath(menuItem, _this.currentFocusedElem.name);
                            menuItem.path = path
                        }
                        var array = menuItem;
                        array.displayName = name;
                        array.name = name;
                        array.isSelected = false;
                        if (array.path != null && (array.path != undefined && array.path.toLowerCase() != _this.conf.fakePathString))menu.push(array); else fw.log.debug("tvoyParseMenuListObject : not inserting submenu element : ", array)
                    }
                }
                _this.currentMenuArray = menu;
                fw.log.debug("tvoyParseMenuListObject : setting submenu : ", _this.currentMenuArray);
                _this.tvoyCatModuleMenuList.setMenuList(menu);
                _this.tvoyCatModuleMenuList.show();
                _this.fromInit = false;
                _this.currentFocus = _this.FOCUS_LEFT;
                _this.tvoyCatModuleInfo.hide();
                fw.bannerUiManager.showBanner(_this.callBackShowBanner, _this, null);
                if (_forceFocusToFirstItem != null && (_forceFocusToFirstItem != undefined && _forceFocusToFirstItem == true)) {
                    _this.tvoyCatModuleMenuList.setFocusOnFirstElement();
                    _this.tvoyCatModuleMenuList.setItemSelected()
                } else {
                    _this.tvoyCatModuleMenuList.focusOn();
                    _this.tvoyCatModuleMenuList.setItemSelected()
                }
                _this.updateOkFooterElement();
                fw.log.debug("tvoyParseMenuListObject : checking if need to show Menu Top Element : _this.currentLeftMenuParent " + _this.currentLeftMenuParent + " - _this.currentLeftMenuParent : " + _this.currentLeftMenuParent);
                if (_this.currentLeftMenuParent != "root") {
                    _this.isTopButtonShown = true;
                    _this.tvoyCatModuleMenuList.showTopButton()
                } else {
                    _this.isTopButtonShown = false;
                    _this.tvoyCatModuleMenuList.hideTopButton()
                }
                _this.tvoySetListingTypeToShow(_this.tvoyCatModuleMenuList.getSelectItem().cont);
                _this.currentShownMenuListObject =
                    menu
            }, 0)
        } catch (ex) {
            ex.errMethod = "tvoyParseMenuListObject";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, updateOkFooterElement: function (_forceToSelected) {
        try {
            if (this.currentFocusedElem != null && this.currentFocusedElem != undefined)if (this.currentFocus == this.FOCUS_LEFT)if (this.currentFocusedElem.elem != null && this.currentFocusedElem.elem != undefined)switch (this.currentFocusedElem.elem) {
                case "ChannelsFilter":
                    if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToChannels"));
                    else this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToChannels"));
                    break;
                case "BroadcastersFilter":
                    if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToBroadcasters")); else this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToBroadcasters"));
                    break;
                default:
                    if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToSection")); else this.footerElementOKRightSecondElement.setText(": " +
                        eval("this.appObj.messages.goToSection"));
                    break
            } else this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToSection")); else if (this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem != null && this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem != undefined) {
                switch (this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem) {
                    case "ChannelsFilter":
                        if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToChannels")); else this.footerElementOKRightSecondElement.setText(": " +
                            eval("this.appObj.messages.goToChannels"));
                        break;
                    case "BroadcastersFilter":
                        if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToBroadcasters")); else this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToBroadcasters"));
                        break;
                    default:
                        if (this.tvoyIsGridShown)this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.goToSection")); else this.footerElementOKRightSecondElement.setText(": " + eval("this.appObj.messages.info"));
                        break
                }
                if (this.tvoyIsGridShown) {
                    this.footerElementOKRightSecondElement.show();
                    this.footerElementOKLeftSecondElement.show()
                }
            } else if (this.tvoyIsGridShown) {
                this.footerElementOKRightSecondElement.setText(eval("this.appObj.messages.info"));
                this.footerElementOKLeftSecondElement.show()
            }
        } catch (ex) {
            ex.errMethod = "updateOkFooterElement";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, updateFooter: function () {
        try {
            if (this.currentFocus === this.FOCUS_LEFT) {
                this.tvoyUnsetTranslatedStyle(this.footerElementOKLeftThirdElement);
                this.tvoyUnsetTranslatedStyle(this.footerElementOKRightThirdElement);
                this.tvoyUnsetTranslatedStyle(this.footerElementNavUpDownSecondElement);
                this.tvoyUnsetTranslatedStyle(this.footerElementPlayRightFirstElement);
                this.tvoyUnsetTranslatedStyle(this.footerElementOKRightSecondElement);
                this.footerElementOKLeftThirdElement.hide();
                this.footerElementOKRightThirdElement.hide();
                this.footerElementNavUpDownSecondElement.hide();
                this.footerElementOKLeftSecondElement.show();
                this.footerElementOKRightSecondElement.show();
                fw.log.debug("---- OTT : ottFooterElement.hide()");
                this.footerElementNavUpDownFirstElement.show();
                this.footerElementNavAllFirstElement.hide();
                this.footerElementPlayLeftFirstElement.hide();
                this.footerElementPlayRightFirstElement.hide()
            } else {
                this.footerElementNavUpDownFirstElement.hide();
                if (this.tvoyIsGridShown) {
                    this.footerElementNavAllFirstElement.show();
                    this.footerElementNavUpDownFirstElement.hide();
                    this.footerElementPlayLeftFirstElement.hide();
                    this.footerElementPlayRightFirstElement.hide();
                    this.footerElementNavUpDownSecondElement.hide();
                    this.updateOkFooterElement();
                    this.footerElementOKLeftThirdElement.hide();
                    this.footerElementOKRightThirdElement.hide()
                } else {
                    this.footerElementNavAllFirstElement.hide();
                    this.footerElementOKLeftSecondElement.hide();
                    this.footerElementOKRightSecondElement.hide();
                    if (fw.subscriberDataManager.userEnabledOTT() && this.isShowingEpisodes) {
                        this.tvoySetTranslatedStyle(this.footerElementPlayRightFirstElement);
                        this.tvoySetTranslatedStyle(this.footerElementNavUpDownSecondElement);
                        this.tvoySetTranslatedStyle(this.footerElementOKLeftThirdElement);
                        this.tvoySetTranslatedStyle(this.footerElementOKRightThirdElement);
                        this.tvoySetTranslatedStyle(this.footerElementOKRightSecondElement)
                    } else {
                        this.tvoyUnsetTranslatedStyle(this.footerElementOKLeftThirdElement);
                        this.tvoyUnsetTranslatedStyle(this.footerElementOKRightThirdElement);
                        this.tvoyUnsetTranslatedStyle(this.footerElementNavUpDownSecondElement);
                        this.tvoyUnsetTranslatedStyle(this.footerElementPlayRightFirstElement)
                    }
                    if (this.isShowingEpisodes) {
                        fw.log.debug("update footer !episodes");
                        this.footerElementPlayRightFirstElement.setText(eval("this.appObj.messages.vodCatLabelFooterElementPlayRight"))
                    } else {
                        fw.log.debug("update footer episodes right");
                        this.footerElementPlayRightFirstElement.setText(eval("this.appObj.messages.vodCatLabelFooterElementPlayEpisodeRight"))
                    }
                    if (this.isShowingEpisodes) {
                        this.footerElementOKLeftThirdElement.hide();
                        this.footerElementOKRightThirdElement.show();
                        this.footerElementNavUpDownSecondElement.show();
                        this.footerElementPlayLeftFirstElement.show();
                        this.footerElementPlayLeftFirstElement.setText(eval("this.appObj.messages.vodCatLabelFooterElementPlayRight"))
                    } else {
                        this.footerElementOKLeftThirdElement.show();
                        this.footerElementOKRightThirdElement.show();
                        this.footerElementNavUpDownSecondElement.show();
                        this.footerElementPlayLeftFirstElement.show();
                        this.footerElementPlayRightFirstElement.show();
                        this.footerElementPlayLeftFirstElement.setText("")
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "updateFooter";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoySetTranslatedStyle: function (_elem) {
        try {
            var actualStyle = _elem.getActualCssStyle();
            if (actualStyle.indexOf("Translated") == -1) {
                _elem.setActualCssStyle(actualStyle + "Translated");
                _elem.getObj().setStyle(actualStyle + "Translated")
            }
        } catch (ex) {
            ex.errMethod =
                "tvoySetTranslatedStyle";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyUnsetTranslatedStyle: function (_elem) {
        try {
            var actualStyle = _elem.getActualCssStyle();
            if (actualStyle.indexOf("Translated") != -1) {
                var newStyle = actualStyle.substring(0, actualStyle.indexOf("Translated"));
                _elem.getObj().setStyle(newStyle);
                _elem.setActualCssStyle(newStyle)
            }
        } catch (ex) {
            ex.errMethod = "tvoyUnsetTranslatedStyle";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoySetListingTypeToShow: function (_category) {
        try {
            if (!this.startingPhase) {
                this.tvoyCatModuleMenuList.setItemSelected();
                if (this.currentFocus == this.FOCUS_LEFT)this.tvoyCatModuleMenuList.focusOn()
            }
            this.startingPhase = false;
            this.currentShownElem = this.currentFocusedElem;
            fw.log.debug("tvoySetListingTypeToShow1 : currentShown ELEMENT : ", this.currentShownElem);
            if (_category.elem != null && _category.elem != undefined) {
                fw.log.debug("tvoySetListingTypeToShow : Setting Listing for : " + _category.name);
                if (this.currentShownElem.name == null || this.currentShownElem.name == undefined)this.currentShownElem.name = _category.elem
            }
            try {
                var tmpName =
                    "";
                if (this.currentShownElem.elem != null && this.currentShownElem.elem != undefined)tmpName = this.currentShownElem.elem; else tmpName = this.currentShownElem.name;
                var catName = tmpName.toLowerCase().replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "");
                if (eval("this.conf.gridElementsCategories." + catName)) {
                    fw.log.debug("listing type is grid for  - " + this.currentShownElem.name);
                    this.tvoyIsGridShown = true
                } else {
                    fw.log.debug("listing type is list for  - " + this.currentShownElem.name);
                    this.tvoyIsGridShown = false
                }
            } catch (ex) {
                fw.log.error("ERROR catching eval(this.conf.gridElementsCategories. + catName)");
                this.tvoyIsGridShown = false;
                fw.log.debug("listing type is list for  - " + this.currentShownElem.name)
            }
            this.updateListingHeaderString(eval("this.appObj.messages.RetrievingElements"));
            this.movies = null;
            this.totalMovies = 0;
            this.currentShownCategoryName = this.currentShownElem.name;
            fw.log.debug("tvoySetListingTypeToShow : current shown category : " + this.currentShownCategoryName);
            if (this.currentShownElem.isLeaf) {
                fw.log.debug("tvoySetListingTypeToShow : current shown category : " + this.currentShownCategoryName +
                    " is leaf : retrieving contents");
                if (this.currentShownElem.path != null && (this.currentShownElem.path != undefined && this.currentShownElem.path != ""))fw.mwManager.getPGFromCategoryPath(this.currentShownElem.path, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.currentShownElem.categoryId); else fw.mwManager.getPGFromCategoryId(this.currentShownElem.categoryId, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.currentShownElem.categoryId)
            } else {
                fw.log.debug("tvoySetListingTypeToShow : current shown category : " +
                    this.currentShownCategoryName + " is not leaf : retrieving subcategories");
                if (this.currentShownElem.path != null && (this.currentShownElem.path != undefined && this.currentShownElem.path != ""))fw.mwManager.getSubCategoriesFromCategoryPath(this.currentShownElem.path, this.getTVOYSubcategoriesCallBack, this, this.currentShownElem.elem != null && this.currentShownElem.elem != undefined ? eval("this.appObj.messages." + this.currentShownElem.elem) : this.currentShownElem.name); else fw.mwManager.getSubCategoriesFromCategoryId(this.currentShownElem.categoryId,
                    this.getTVOYSubcategoriesCallBack, this, this.currentShownElem.elem != null && this.currentShownElem.elem != undefined ? eval("this.appObj.messages." + this.currentShownElem.elem) : this.currentShownElem.name)
            }
        } catch (ex) {
            ex.errMethod = "tvoySetListingTypeToShow";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getTVOYSubcategoriesCallBack: function (_params, _obj) {
        try {
            this.unLockKeyBoard();
            if (_obj != null) {
                fw.log.debug("getTVOYSubcategoriesCallBack : total subcategories: " + _obj.length + " passed parameter : " + _params);
                this.movies =
                    _obj;
                this.totalMovies = this.movies.length;
                this.buildList(this.movies, _params)
            }
        } catch (ex) {
            ex.errMethod = "getTVOYSubcategoriesCallBack";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, checkToAddOTTApplications: function (_params) {
        try {
            fw.log.debug("checkToAddOTTApplications : _params " + _params + " ---\x3e ", this.tvoyCatModuleMenuList.getFocusItem().dataElement);
            if (this.tvoyCatModuleMenuList.getFocusItem().dataElement.path != null) {
                fw.log.debug("checkToAddOTTApplications : 1");
                var path = this.tvoyCatModuleMenuList.getFocusItem().dataElement.path;
                if (this.appObj.conf.isOttEnabled != null && this.appObj.conf.isOttEnabled) {
                    fw.log.debug("--------- OTT - this.conf.ottElementsCategories => ", this.conf.ottElementsCategories);
                    if (this.conf.ottElementsCategories && (this.conf.ottElementsCategories[path] != undefined && fw.subscriberDataManager.userEnabledOTT())) {
                        var _this = this;
                        switch (this.conf.ottElementsCategories[path].ottListToRetrieve.toLowerCase()) {
                            case "channels":
                                this.timerOtt = setTimeout(function () {
                                    fw.mwRequestManager.deleteCallBack(this.requestId);
                                    _this.buildList(_this.movies,
                                        _params)
                                }, this.timerOtt_value);
                                this.requestId = fw.mwManager.getContextApplicationsForZender(this.retrievedOTTElementsCallback, this, _params);
                                break;
                            case "broadcasters":
                                this.timerOtt = setTimeout(function () {
                                    fw.mwRequestManager.deleteCallBack(this.requestId);
                                    _this.buildList(_this.movies, _params)
                                }, this.timerOtt_value);
                                this.requestId = fw.mwManager.getContextApplicationsForOmroep(this.retrievedOTTElementsCallback, this, _params);
                                break;
                            default:
                                break
                        }
                    } else this.buildList(this.movies, _params)
                } else this.buildList(this.movies,
                    _params)
            } else this.buildList(this.movies, _params)
        } catch (ex) {
            ex.errMethod = "checkToAddOTTApplications";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, retrievedOTTElementsCallback: function (_prop, _ottElemsArray) {
        try {
            clearTimeout(this.timerOtt);
            this.timerOtt = null;
            fw.log.debug("retrievedOTTElementsCallback : _prop ", _prop);
            var _this = this;
            setTimeout(function () {
                var array = new Array;
                if (_ottElemsArray != null && _ottElemsArray.length > 0) {
                    fw.log.debug("retrievedOTTElementsCallback : retrieved : " + _ottElemsArray.length + " elements ---\x3e to addo to : " +
                        _this.movies.length);
                    for (a = 0; a < _ottElemsArray.length; a++) {
                        var elem = _ottElemsArray[a];
                        elem.name = elem.title;
                        elem.displayName = elem.title;
                        elem.shortDescription = elem.description;
                        elem.isPCSafe = true;
                        fw.log.debug("retrievedOTTElementsCallback - adding element : " + elem.displayName);
                        array.push(elem)
                    }
                    fw.log.debug("STRINGIFY  : ", _this.movies)
                } else fw.log.debug("retrievedOTTElementsCallback : _ottElemsArray is null or length is minor or euqual to 0");
                var swap = _this.movies;
                _this.movies = new Array(parseInt(swap.length +
                    array.length));
                for (b = 0; b < swap.length; b++)_this.movies[b] = swap[b];
                for (c = 0; c < array.length; c++)_this.movies[swap.length + c] = array[c];
                _this.buildList(_this.movies, _prop)
            }, 0)
        } catch (ex) {
            ex.errMethod = "retrievedOTTElementsCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, buildList: function (_data, _prop) {
        try {
            var _this = this;
            _this.totalMovies = _data.length;
            fw.log.debug("retrievedOTTElementsCallback : retrieved  : " + _this.totalMovies + " items");
            var endString = "";
            fw.log.debug("retrievedOTTElementsCallback : passed parameter " +
                _prop);
            if (_prop === _this.appObj.messages.ChannelsFilter)endString = _this.totalMovies == 1 ? _this.appObj.messages.Channel : _this.appObj.messages.Channels; else if (_prop === _this.appObj.messages.BroadcastersFilter)endString = _this.totalMovies == 1 ? _this.appObj.messages.Broadcaster : _this.appObj.messages.Broadcasters; else endString = _this.currentLeftMenuParent == _this.appObj.messages["AllDays"] ? eval("_this.appObj.messages.Programs") + " " + eval("_this.appObj.messages.listing_suffix") + " " + _this.currentFocusedElem.name :
                _this.totalMovies == 1 ? eval("_this.appObj.messages.Program") : eval("_this.appObj.messages.Programs");
            _this.rightPanelElementsString = endString;
            var string = (_this.totalMovies == 1 ? eval("_this.appObj.messages.FoundItem") : eval("_this.appObj.messages.FoundItems")) + " " + _this.totalMovies + " " + endString;
            _this.updateListingHeaderString(string);
            if (_this.tvoyIsGridShown)_this.showGridContentList(_data); else _this.showListContentList(_data);
            _this.isStarting = false;
            _this.updateFooter()
        } catch (ex) {
            ex.errMethod = "buildList";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getEpisodesListCallback: function (_params, _obj) {
        try {
            this.currentFocus = this.FOCUS_LEFT;
            this.tvoyCatModuleMenuList.setFocusOnElementByName("name", this.tvoyCatModuleMenuList.getSelectItem().cont.name);
            if (_obj != null) {
                this.movies = _obj;
                this.totalMovies = _obj.length;
                var endString = "";
                fw.log.debug("_params : " + _params);
                if (_params === this.appObj.messages.ChannelsFilter)endString = this.totalMovies == 1 ? this.appObj.messages.Channel : this.appObj.messages.Channels; else if (_params ===
                    this.appObj.messages.BroadcastersFilter)endString = this.totalMovies == 1 ? this.appObj.messages.Broadcaster : this.appObj.messages.Broadcasters; else endString = this.totalMovies == 1 ? this.appObj.messages.Program : this.appObj.messages.Programs;
                var string = (this.totalMovies == 1 ? eval("this.appObj.messages.FoundItem") : eval("this.appObj.messages.FoundItems")) + " " + this.totalMovies + " " + endString;
                this.updateListingHeaderString(string);
                this.rightPanelElementsString = endString;
                if (this.tvoyIsGridShown)this.showGridContentList(this.movies);
                else this.showListContentList(this.movies)
            }
        } catch (ex) {
            ex.errMethod = "getEpisodesListCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, showGridContentList: function (_elems) {
        try {
            this.tvoyCatBreadcrumb.clear();
            this.tvoyCatBreadcrumb.pushList(this.buildBreadcrumbPath(this.currentFocusedElem), true);
            fw.log.debug("showGridContentList - elements : ", _elems);
            this.isGridMode = true;
            this.isShowingEpisodes = false;
            this.tvoyCatModuleList.hide();
            this.tvoyCatModuleEpisodesList.hide();
            this.tvoyCatGrid.setMenuList(_elems);
            this.tvoyCatGrid.show();
            this.currentDataArray = fw.util.cloneAllObjectType(_elems);
            this.listingElements = this.currentFocusedElem;
            fw.log.debug("showGridContentList - selected item path : " + this.currentFocusedElem.path);
            fw.log.debug("actual breadcrumb is : " + this.tvoyCatBreadcrumb.getBreadCrumbList())
        } catch (ex) {
            ex.errMethod = "showGridContentList";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, showListContentList: function (_elems) {
        try {
            fw.log.debug("this.currentLeftMenuParent : " + this.currentLeftMenuParent);
            this.tvoyCatBreadcrumb.clear();
            this.tvoyCatBreadcrumb.pushList(this.buildBreadcrumbPath(this.currentFocusedElem), true);
            fw.log.debug("ShowListContentList - elements : ", _elems);
            this.isGridMode = false;
            this.isShowingEpisodes = false;
            this.tvoyCatGrid.hide();
            this.tvoyCatModuleEpisodesList.hide();
            this.tvoyCatModuleList.setMenuList(_elems, this.orderInList, true);
            this.tvoyCatModuleList.show();
            this.currentDataArray = fw.util.cloneAllObjectType(_elems);
            fw.log.debug("MAX : aggiorno currentDataArray element");
            this.listingElements = this.currentFocusedElem;
            fw.log.debug("showListContentList - selected item path : " + this.currentFocusedElem.path);
            fw.log.debug("actual breadcrumb is : " + this.tvoyCatBreadcrumb.getBreadCrumbList())
        } catch (ex) {
            ex.errMethod = "showListContentList";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, checkToForceBreadcrumb: function (_path) {
        try {
            var returnedCheck = false;
            fw.log.debug("checkToForceBreadcrumb - path : " + _path.substring(parseInt(_path.lastIndexOf("/") + 1)) + " this.currentLeftMenuParent - " + this.currentLeftMenuParent + "  ---\x3e " + this.conf.forceShowBreadcrumbSections[this.currentLeftMenuParent]);
            if (this.conf.forceShowBreadcrumbSections[this.currentLeftMenuParent] != null && this.conf.forceShowBreadcrumbSections[this.currentLeftMenuParent] != undefined) {
                fw.log.debug("checkToForceBreadcrumb - entered");
                if (this.conf.forceShowBreadcrumb[_path.substring(parseInt(_path.lastIndexOf("/") + 1))])returnedCheck = true
            } else if (this.conf.forceShowBreadcrumb[_path.substring(parseInt(_path.lastIndexOf("/") + 1))])returnedCheck = true;
            return returnedCheck
        } catch (ex) {
            ex.errMethod = "checkToForceBreadcrumb";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex);
            return false
        }
    }, parseResults: function () {
        try {
            fw.log.debug("PARSE RESULTS : " + this.currentFocusedElem.name + "  IS LEAF : " + this.currentFocusedElem.isLeaf)
        } catch (ex) {
            ex.errMethod = "parseResults";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, isHardcodedObject: function (_string) {
        try {
            var boolToReturn = false;
            fw.log.debug("isHardcoded : string : " + _string);
            if (this.conf.hardcodedMenuItems[_string])boolToReturn = true;
            fw.log.debug("isHardcoded : " + _string + " : " + boolToReturn);
            return boolToReturn
        } catch (ex) {
            ex.errMethod =
                "isHardcodedObject";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, removeCharsFromString: function (_string, _charToRemove, _toLowerCase) {
        try {
            var string = _string.replace(new RegExp(_charToRemove, "g"), "");
            return _toLowerCase != null && (_toLowerCase != undefined && _toLowerCase == true) ? string.toLowerCase() : string
        } catch (ex) {
            ex.errMethod = "removeCharsFromString";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        try {
            this.appObj.needToCleanHomePage = false;
            this.fromOptionMenu = false;
            if (!fw.bannerUiManager.performsBannerAction(this.banner,
                    _evt.keyCode))switch (_evt.keyCode) {
                case fw.keys.code.BACK:
                    if (this.navigationTree.length > 0) {
                        fw.log.debug("invoking go back navigation");
                        this.appObj.PCCatChecked = "N";
                        this.goBackNavigation()
                    } else {
                        fw.log.debug("exit from app");
                        if (this.inputObj.fromNative != null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true)) {
                            fw.log.debug("back to NATIVE App");
                            fw.mwManager.goBackInHistory()
                        } else fw.navigationHistory.back()
                    }
                    break;
                case fw.keys.code.PLAY_PAUSE:
                    if (!this.tvoyIsGridShown && this.currentFocus ==
                        this.FOCUS_RIGHT)if (this.currentFocusedElem.isLeaf != null && this.currentFocusedElem.isLeaf != undefined)fw.mwManager.getPGFromCategoryPath(this.currentFocusedElem.path, this.actualPagingIndex, fw.conf.getMovieFilterByDateTime, this.parseTVOYVodsFromCategoryCallBack, this, this.currentFocusedElem.categoryId); else if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.currentFocusedElem.isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContentPlayEvent, this, this.conf.hasLiveVideo); else if (this.isItemRented(this.currentFocusedElem))this.loadFullscreenPage(this.currentFocusedElem);
                    else this.loadDetailsPage(this.currentFocusedElem);
                    break;
                case fw.keys.code.UP:
                    if (this.currentFocus == this.FOCUS_LEFT)this.tvoyCatModuleMenuList.moveFocusToUp(); else if (this.tvoyIsGridShown) {
                        this.tvoyCatGrid.moveFocusToUp();
                        this.currentFocusedElem = this.tvoyCatGrid.getGrid().getDataElementItemSelect()
                    } else if (this.isShowingEpisodes) {
                        this.tvoyCatModuleEpisodesList.moveFocusToUp();
                        this.currentFocusedElem = this.tvoyCatModuleEpisodesList.getGrid().getDataElementItemSelect()
                    } else {
                        this.tvoyCatModuleList.moveFocusToUp();
                        this.currentFocusedElem = this.tvoyCatModuleList.getGrid().getDataElementItemSelect();
                        this.updateCatModuleInfo()
                    }
                    break;
                case fw.keys.code.DOWN:
                    if (this.currentFocus == this.FOCUS_LEFT)this.tvoyCatModuleMenuList.moveFocusToDown(); else if (this.tvoyIsGridShown) {
                        this.tvoyCatGrid.moveFocusToDown();
                        this.currentFocusedElem = this.tvoyCatGrid.getGrid().getDataElementItemSelect()
                    } else if (this.isShowingEpisodes) {
                        this.tvoyCatModuleEpisodesList.moveFocusToDown();
                        this.currentFocusedElem = this.tvoyCatModuleEpisodesList.getGrid().getDataElementItemSelect()
                    } else {
                        this.tvoyCatModuleList.moveFocusToDown();
                        this.currentFocusedElem = this.tvoyCatModuleList.getGrid().getDataElementItemSelect();
                        this.updateCatModuleInfo()
                    }
                    break;
                case fw.keys.code.OK:
                    if (this.currentFocusedElem.id == "topElement" || (!this.tvoyCatModuleMenuList.isSelectSelected() && this.currentFocus == this.FOCUS_LEFT || this.currentFocus != this.FOCUS_LEFT)) {
                        this.lockKeyBoard();
                        this.currentBreacrumbList = this.tvoyCatBreadcrumb.getBreadCrumbList().slice(0);
                        this.checkToAddScreenToNavigationArray()
                    }
                    break;
                case fw.keys.code.RIGHT:
                    if (this.currentFocus == this.FOCUS_LEFT) {
                        if (this.totalMovies >
                            0) {
                            this.currentFocus = this.FOCUS_RIGHT;
                            this.tvoyCatModuleMenuList.focusOff();
                            if (this.tvoyIsGridShown) {
                                this.tvoyCatGrid.focusToGrid();
                                this.currentFocusedElem = this.tvoyCatGrid.getGrid().getDataElementItemSelect()
                            } else if (this.isShowingEpisodes) {
                                this.tvoyCatModuleEpisodesList.focusToGrid();
                                this.currentFocusedElem = this.tvoyCatModuleEpisodesList.getGrid().getDataElementItemSelect()
                            } else {
                                this.tvoyCatModuleList.focusToGrid();
                                this.currentFocusedElem = this.tvoyCatModuleList.getGrid().getDataElementItemSelect()
                            }
                            this.updateCatModuleInfo(true);
                            fw.bannerUiManager.hideBanner();
                            this.tvoyCatModuleInfo.show()
                        }
                        this.updateFooter();
                        this.updateOkFooterElement(true)
                    } else {
                        if (this.tvoyIsGridShown) {
                            this.tvoyCatGrid.moveFocusToRight();
                            this.currentFocusedElem = this.tvoyCatGrid.getGrid().getDataElementItemSelect();
                            this.updateCatModuleInfo()
                        }
                        this.updateOkFooterElement()
                    }
                    break;
                case fw.keys.code.YELLOW:
                    break;
                case fw.keys.code.BLUE:
                    if (!this.needToChangeSkin)if (!this.tvoyIsGridShown)if (this.currentFocus == this.FOCUS_RIGHT)if (!this.isShowingEpisodes)fw.overlayManager.showOptionMenu(this.tvoyCatOptionMenuSubcategoriesRightPanel,
                        this.tvoyCatalogueOptionMenuCallback, this); else if (this.orderInList == fw.conf.getMovieFilterByDateTime)fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByTimeRightMenu, this.tvoyCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByAZRightMenu, this.tvoyCatalogueOptionMenuCallback, this); else if (!this.isShowingEpisodes)fw.overlayManager.showOptionMenu(this.tvoyCatOptionMenuSubcategoriesLeftPanel, this.tvoyCatalogueOptionMenuCallback,
                        this); else if (this.orderInList == fw.conf.getMovieFilterByDateTime)fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByTimeLeftMenu, this.tvoyCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByAZLeftMenu, this.tvoyCatalogueOptionMenuCallback, this); else if (this.currentFocus == this.FOCUS_LEFT)if (this.currentLeftMenuParent == "root")fw.overlayManager.showOptionMenu(this.tvoyCatOptionMenuRootLeftPanel, this.tvoyCatalogueOptionMenuCallback,
                        this); else if (this.orderInList == fw.conf.getMovieFilterByDateTime)fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByAZLeftMenu, this.tvoyCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.optionMenuConfPGListViewEpisodesSortByTimeLeftMenu, this.tvoyCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.tvoyCatOptionMenuRootRightPanel, this.tvoyCatalogueOptionMenuCallback, this);
                    break;
                case fw.keys.code.LEFT:
                    if (this.currentFocus ==
                        this.FOCUS_RIGHT) {
                        if (this.tvoyIsGridShown)if (this.tvoyCatGrid.isCursorInFirstPosition()) {
                            this.tvoyCatGrid.focusOff();
                            this.currentFocus = this.FOCUS_LEFT;
                            this.tvoyCatModuleInfo.hide();
                            fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null);
                            this.currentFocusedElem = this.tvoyCatModuleMenuList.getFocusItem().dataElement;
                            fw.log.debug("this.currentLeftMenuParent : " + this.currentLeftMenuParent + "  --\x3e ", this.currentFocusedElem);
                            this.currentShownElem = this.currentFocusedElem;
                            fw.log.debug("this.currentShownElem : ",
                                this.currentShownElem);
                            this.tvoyCatModuleMenuList.focusOn()
                        } else {
                            this.tvoyCatGrid.moveFocusToLeft();
                            this.currentFocusedElem = this.tvoyCatGrid.getGrid().getDataElementItemSelect();
                            this.updateCatModuleInfo()
                        } else {
                            if (this.isShowingEpisodes)this.tvoyCatModuleEpisodesList.focusOff(); else this.tvoyCatModuleList.focusOff();
                            this.currentFocusedElem = this.tvoyCatModuleMenuList.getFocusItem().dataElement;
                            this.currentShownElem = this.currentFocusedElem;
                            this.pcCheckSkipped = false;
                            this.tvoyCatModuleMenuList.focusOn();
                            this.currentFocus = this.FOCUS_LEFT;
                            this.tvoyCatModuleInfo.hide();
                            fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null)
                        }
                        this.updateFooter();
                        this.updateOkFooterElement()
                    }
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp(); else switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.tvoyCatModuleMenuList.getMenuList().goPreviusPage();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isGridMode)this.tvoyCatGrid.getGrid().goPreviusPage(); else {
                                if (this.isShowingEpisodes) {
                                    this.tvoyCatModuleEpisodesList.getGrid().goPreviusPage();
                                    this.currentFocusedElem = this.tvoyCatModuleEpisodesList.getGrid().getDataElementItemSelect()
                                } else {
                                    this.tvoyCatModuleList.getGrid().goPreviusPage();
                                    this.currentFocusedElem = this.tvoyCatModuleList.getGrid().getDataElementItemSelect()
                                }
                                this.updateCatModuleInfo()
                            }
                            break;
                        default:
                            break
                    }
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown(); else switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.tvoyCatModuleMenuList.getMenuList().goNextPage();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isGridMode)this.tvoyCatGrid.getGrid().goNextPage();
                            else {
                                if (this.isShowingEpisodes) {
                                    this.tvoyCatModuleEpisodesList.getGrid().goNextPage();
                                    this.currentFocusedElem = this.tvoyCatModuleEpisodesList.getGrid().getDataElementItemSelect()
                                } else {
                                    this.tvoyCatModuleList.getGrid().goNextPage();
                                    this.currentFocusedElem = this.tvoyCatModuleList.getGrid().getDataElementItemSelect()
                                }
                                this.updateCatModuleInfo()
                            }
                            break;
                        default:
                            break
                    }
                    break;
                case fw.keys.code.RADIO:
                    this.appObj.needToCleanHomePage = true;
                    this.tvoyCatModuleMenuList.hideTopButton();
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.KEY_HOME:
                case fw.keys.code.TV:
                    this.appObj.needToCleanHomePage = true;
                    this.tvoyCatModuleMenuList.hideTopButton();
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.MENU:
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.GIDS:
                    this.appObj.needToCleanHomePage = true;
                    this.tvoyCatModuleMenuList.hideTopButton();
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.HELP:
                    fw.appManager.goToHtmlApp("Help", null, new Array("scenariohelp", "PG", "Programma Gemist"), false, true);
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
                    this.rentItmChanNumTxt.setTxt(_evt.keyCode -
                        fw.keys.code.NUM_0);
                    break;
                default:
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, checkToAddScreenToNavigationArray: function () {
        try {
            if (this.currentFocus == this.FOCUS_RIGHT)if (this.currentFocusedElem != undefined && this.currentFocusedElem.isLeaf != null) {
                fw.log.debug("ADDING SCREEN TO NAVIGATION ARRAY : ", this.currentDataArray[0]);
                this.addScreenToNavigationArray()
            } else this.checkSelectedMenuItem(); else if (this.currentFocusedElem.elem == this.conf.AllDaysElementCompareString ||
                this.currentFocusedElem.action == "changeElem")if (this.tvoyIsGridShown)this.addScreenToNavigationArray(); else if (this.currentFocus == this.FOCUS_LEFT) {
                fw.log.debug("adding screen to navigation array");
                this.addScreenToNavigationArray()
            } else if (this.movies != this.navigationTree[this.navigationTree.length - 1].rightPanel.menu && !this.isShowingEpisodes) {
                fw.log.debug("adding screen to navigation array");
                this.addScreenToNavigationArray()
            } else {
                fw.log.debug("updating screen to navigation array");
                this.updateLastNavigationObject()
            } else this.checkSelectedMenuItem()
        } catch (ex) {
            ex.errMethod =
                "checkToAddScreenToNavigationArray";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, updateLastNavigationObject: function () {
        try {
            var obj = new Object;
            obj = fw.util.cloneAllObjectType(this.navigationTree[this.navigationTree.length - 1]);
            this.navigationTree.pop();
            obj.currentFocus = this.currentFocus;
            var breadcrumbContainsProgrammaLabel = false;
            for (a = 0; a < obj.currentBreadcrumb.length; a++)if (obj.currentBreadcrumb[a] == this.appObj.messages.programma_label)breadcrumbContainsProgrammaLabel = true;
            if (breadcrumbContainsProgrammaLabel)obj.currentBreadcrumb.pop();
            this.navigationTree.push(obj);
            fw.log.debug("Added element to history stack : current stack length : " + this.navigationTree.length);
            this.checkSelectedMenuItem()
        } catch (ex) {
            ex.errMethod = "updateLastNavigationObject";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, parseTVOYVodsFromCategoryCallBack: function (_prop, _obj, _totalMoviesCount) {
        fw.log.debug("parseTVOYVodsFromCategoryCallBack : ", _obj);
        this.lastShownCategoryIdElements = this.currentFocusedElem.categoryId;
        this.totalMovies = _totalMoviesCount;
        this.movies = _obj;
        if (this.totalMovies == 1)if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContentPlayEvent, this, this.conf.hasLiveVideo); else if (this.isItemRented(this.movies[0]))this.loadFullscreenPage(this.movies[0]); else this.loadDetailsPage(this.movies[0]); else if (this.totalMovies == 0); else if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContentPlayEvent,
            this, this.conf.hasLiveVideo); else if (this.isItemRented(this.movies[0]))this.loadFullscreenPage(this.movies[0]); else this.loadDetailsPage(this.movies[0])
    }, focusGained: function (_lastScenario) {
    }, focusReleased: function (_nextScenario) {
    }, checkSelectedMenuItem: function () {
        try {
            fw.log.debug("checkSelectedMenuItem");
            this.lastCheckedElement = this.currentFocusedElem;
            if (this.currentFocusedElem.name != null && this.currentFocusedElem.name != undefined) {
                this.appObj.PCCatChecked = "N";
                if (this.currentFocusedElem.name.indexOf(this.conf.changeElemMenuIdentifier) != -1 && (this.currentFocusedElem.action != null && (this.currentFocusedElem.action != undefined && this.currentFocusedElem.action == "changeElem")))this.currentFocusedElem.name = this.currentFocusedElem.name.split(" ")[0]
            }
            this.fromChangeSkinElement = false;
            if (this.timerOtt != null) {
                clearTimeout(this.timerOtt);
                this.timerOtt = null
            }
            var action = null;
            try {
                action = this.currentFocusedElem.action;
                if (action == undefined || action == null)action = this.currentFocusedElem.cont.action
            } catch (ex) {
                action = null
            }
            if (action != null && action != undefined)switch (action) {
                case "":
                    if (this.currentFocusedElem.updateMenuList !=
                        null && this.currentFocusedElem.updateMenuList != undefined)if (this.currentFocusedElem.updateMenuList == true) {
                        if (this.currentFocusedElem.elem == this.conf.AllDaysElementCompareString) {
                            this.fromBack = false;
                            fw.log.debug("creating days submenu with " + this.currentLeftMenuParent);
                            var array = this.createAllDaysMenuList(this.currentLeftMenuParent);
                            this.tvoyParseMenuListObject(array)
                        }
                    } else {
                        this.tvoyCatModuleMenuList.setItemUnSelected();
                        this.tvoySetListingTypeToShow(this.tvoyCatModuleMenuList.getSelectItem().cont)
                    } else fw.log.debug("devo getMovies argomento il path : " +
                        this.currentFocusedElem.path);
                    break;
                case "setDayName":
                    this.tvoyIsGridShown = eval("this.conf.gridElementsCategories." + this.currentFocusedElem.name.replace(new RegExp(" ", "g"), ""));
                    fw.log.debug("AGGIUNTO UN ELEMENTO DAL BREADCRUMB - PRE : " + this.tvoyCatBreadcrumb.getBreadCrumbList());
                    if (this.currentFocusedElem.isLeaf != null && this.currentFocusedElem.isLeaf != undefined)this.PcCheckOnCategory();
                    break;
                case "setPrevDayName":
                    this.tvoyIsGridShown = eval("this.conf.gridElementsCategories." + this.currentFocusedElem.name.replace(new RegExp(" ",
                            "g"), ""));
                    fw.log.debug("AGGIUNTO UN ELEMENTO DAL BREADCRUMB - PRE : " + this.tvoyCatBreadcrumb.getBreadCrumbList());
                    if (this.currentFocusedElem.isLeaf != null && this.currentFocusedElem.isLeaf != undefined)this.PcCheckOnCategory();
                    break;
                case "top_button":
                    this.updateListingHeaderString(this.appObj.messages.RetrievingElements);
                    this.tvoyCatModuleMenuList.hideTopButton();
                    this.tvoyCatModuleMenuList.clean();
                    this.tvoyCatModuleList.clean();
                    this.tvoyCatModuleEpisodesList.clean();
                    this.tvoyCatGrid.fullClean();
                    this.tvoyCatModuleInfo.hide();
                    fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null);
                    this.needToChangeSkin = true;
                    this.init(true);
                    break;
                case "changeElem":
                    this.fromChangeSkinElement = true;
                    fw.log.debug("checkSelectedMenuItem : changing element from menu link");
                    fw.mwManager.getCategoryFromCategoryPath(this.currentFocusedElem.path, this.getCategoryIdFromCategoryPathCallback, this, "A");
                    break;
                case "programma_search":
                    this.unLockKeyBoard();
                    var criteria = this.tvoyCatalogueGetDisplayNameCriteria();
                    fw.log.debug("criteria _ " + criteria);
                    switch (criteria) {
                        case this.appObj.messages.ChannelsFilter:
                        case this.appObj.messages.BroadcastersFilter:
                            fw.mwManager.openSearch("PG", "PG", this.navigationTree[0].rightPanel.selectedItem.path);
                            break;
                        default:
                            fw.mwManager.openSearch("PG", "PG", "");
                            break
                    }
                    break
            } else if (this.currentFocusedElem.isLeaf != null && this.currentFocusedElem.isLeaf != undefined) {
                fw.log.debug("checkSelectedMenuItem : focusedElem!= shownElem : checking Parental Control for current category : " + this.currentFocusedElem.name);
                this.PcCheckOnCategory()
            } else if (this.currentFocusedElem.appURL !=
                null && (this.currentFocusedElem.appURL != undefined && this.currentFocusedElem.appURL != "")) {
                fw.log.debug("launching OTT App : " + this.currentFocusedElem.appURL);
                fw.mwManager.openOTT(this.currentFocusedElem.appURL)
            } else if (this.currentFocusedElem.applicationURL != null && (this.currentFocusedElem.applicationURL != undefined && this.currentFocusedElem.applicationURL != ""))fw.mwManager.openOTT(this.currentFocusedElem.applicationURL); else if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.currentFocusedElem.isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContent,
                this, this.conf.hasLiveVideo); else this.loadDetailsPage(this.currentFocusedElem);
            this.currentShownElem = this.currentFocusedElem
        } catch (ex) {
            ex.errMethod = "checkSelectedMenuItem";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyMenuModuleListCallback: function (_LeftMenuTotalPosition, _LeftMenuDomElement, _LeftMenuDataElement) {
        try {
            if (this.currentFocus == this.FOCUS_LEFT) {
                this.currentFocusedElem = _LeftMenuDataElement;
                this.updateOkFooterElement()
            }
        } catch (ex) {
            ex.errMethod = "tvoyMenuModuleListCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
    }, tvoyCreateOptionMenuObjects: function () {
        try {
            var optMenuConfObj = this.conf.optionMenuConfStartViewFocusLeft;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.tvoyCatOptionMenuRootLeftPanel =
                optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfStartViewFocusRight;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.tvoyCatOptionMenuRootRightPanel = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewCategoriesListRightPanel;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.tvoyCatOptionMenuSubcategoriesRightPanel = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewCategoriesListLeftPanel;
            var optMenuElemsObj = new Array;
            for (var j =
                0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.tvoyCatOptionMenuSubcategoriesLeftPanel = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewEpisodesSortByTimeLeftMenu;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem =
                    new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.optionMenuConfPGListViewEpisodesSortByTimeLeftMenu = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewEpisodesSortByTimeRightMenu;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label =
                    eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.optionMenuConfPGListViewEpisodesSortByTimeRightMenu = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewEpisodesSortByAZLeftMenu;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." +
                    optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.optionMenuConfPGListViewEpisodesSortByAZLeftMenu = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfPGListViewEpisodesSortByAZRightMenu;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status =
                    optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.optionMenuConfPGListViewEpisodesSortByAZRightMenu = optMenuObj
        } catch (ex) {
            ex.errMethod = "tvoyCreateOptionMenuObjects";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyCatalogueOptionMenuCallback: function (_obj) {
        try {
            if (_obj != null) {
                fw.log.debug("tvoyCatalogueOptionMenuCallback --\x3e ", _obj);
                switch (_obj[0].toLowerCase()) {
                    case "option_menu_more_info":
                        if (this.currentFocus ==
                            this.FOCUS_RIGHT)if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContent, this, this.conf.hasLiveVideo); else this.loadDetailsPage(this.movies[0]);
                        break;
                    case "toonafleveringen":
                        if (this.currentFocus == this.FOCUS_RIGHT) {
                            var obj = new Object;
                            obj.keyCode = fw.keys.code.OK;
                            this.keyHandler(obj)
                        }
                        break;
                    case "watchtv":
                        fw.mwManager.watchDTV();
                        break;
                    case "ordertime":
                        if (this.isShowingEpisodes) {
                            this.fromOptionMenu = true;
                            this.orderInList =
                                fw.conf.getMovieFilterByDateTime;
                            fw.mwManager.getPGFromCategoryId(this.lastShownCategoryIdElements, 0, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.lastShownCategoryIdElements)
                        } else;
                        break;
                    case "orderaz":
                        if (this.isShowingEpisodes) {
                            this.fromOptionMenu = true;
                            this.orderInList = fw.conf.getMovieFilterByName;
                            fw.mwManager.getPGFromCategoryId(this.lastShownCategoryIdElements, 0, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.lastShownCategoryIdElements)
                        } else;
                        break;
                    case "searchinall":
                        fw.mwManager.openSearch("",
                            "", "");
                        break;
                    case "programmasearch":
                        var criteria = this.tvoyCatalogueGetDisplayNameCriteria();
                        fw.log.debug("criteria _ " + criteria);
                        switch (criteria) {
                            case this.appObj.messages.ChannelsFilter:
                            case this.appObj.messages.BroadcastersFilter:
                                fw.mwManager.openSearch("PG", "PG", this.navigationTree[0].rightPanel.selectedItem.path);
                                break;
                            default:
                                fw.mwManager.openSearch("PG", "PG", "");
                                break
                        }
                        break;
                    case "mypackages":
                        fw.mwManager.openMyPackages();
                        break
                }
            }
        } catch (ex) {
            ex.errMethod = "tvoyCatalogueOptionMenuCallback";
            ex.errClass =
                "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyCatalogueGetDisplayNameCriteria: function () {
        try {
            if (this.navigationTree != null && (this.navigationTree != undefined && (this.navigationTree.length > 0 && (this.navigationTree[0] != null && (this.navigationTree[0].leftPanel != null && (this.navigationTree[0].leftPanel != undefined && (this.navigationTree[0].leftPanel.selectedItem != null && this.navigationTree[0].leftPanel.selectedItem != undefined))))))) {
                var displayName = this.navigationTree[0].leftPanel.selectedItem.displayName;
                return displayName !=
                null && (displayName != undefined && displayName != "") ? displayName : this.navigationTree[0].leftPanel.selectedItem.name
            }
            return ""
        } catch (ex) {
            ex.errMethod = "tvoyCatalogueGetDisplayNameCriteria";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, createAllDaysMenuList: function (_shownCategory) {
        try {
            var array = new Array;
            for (var a = 0; a < 7; a++) {
                var obj = new Object;
                obj.elem = eval("new Date().getDayNameForTM(" + a * -1 + ")");
                var dayName = obj.elem;
                obj.name = eval("this.appObj.messages." + dayName);
                fw.log.debug("createAllDaysMenuList : create subdays array :  " +
                    this.currentLeftMenuParent + " - navigation stack length : " + this.navigationTree.length);
                if (this.navigationTree.length <= 0) {
                    fw.log.debug("createAllDaysMenuList  : navigation tree length is minor or equal to 0");
                    obj.path = "/TVoY_UTC/TVoY_NMC_RULE/" + (_shownCategory != "root" ? _shownCategory + "/" : "") + obj.elem
                } else {
                    var criteria = this.tvoyCatalogueGetDisplayNameCriteria();
                    switch (criteria) {
                        case this.appObj.messages.ChannelsFilter:
                            obj.path = "/TVoY_UTC/TVoY_SENDER_NMC_RULE/" + (_shownCategory != "root" ? _shownCategory +
                                "/" : "") + obj.elem;
                            break;
                        case this.appObj.messages.BroadcastersFilter:
                            obj.path = "/TVoY_UTC/TVoY_BROADCASTER_NMC_RULE/" + (_shownCategory != "root" ? _shownCategory + "/" : "") + obj.elem;
                            break;
                        default:
                            obj.path = "/TVoY_UTC/TVoY_NMC_RULE/" + (_shownCategory != "root" ? _shownCategory + "/" : "") + obj.elem;
                            break
                    }
                }
                obj.updateMenuList = false;
                obj.isDay = true;
                obj.action = "";
                array.push(obj)
            }
            array.push(this.conf.searchElement);
            fw.log.debug("current dayArray : ", array);
            return array
        } catch (ex) {
            ex.errMethod = "createAllDaysMenuList";
            ex.errClass =
                "ScenarioTVOY";
            fw.err(ex)
        }
    }, buildTimePath: function (_obj, _name) {
        try {
            var path = "";
            var day = "";
            if (_obj.action != null && _obj.action != undefined) {
                fw.log.debug("buildTimePath - passed obj action : " + _obj.action);
                switch (_obj.action.toLowerCase()) {
                    case "setdayname":
                        day = eval("new Date().getDayNameForTM(0)");
                        break;
                    case "setprevdayname":
                        day = eval("new Date().getDayNameForTM(-1)");
                        break
                }
            }
            fw.log.debug("buildTimePath : day : " + day);
            if (this.navigationTree.length <= 0)fw.log.debug("buildTimePath : navigationTree is not built : length is 0");
            else if (day != "") {
                var criteria = this.tvoyCatalogueGetDisplayNameCriteria();
                switch (criteria) {
                    case this.appObj.messages.ChannelsFilter:
                        path = "/TVoY_UTC/TVoY_SENDER_NMC_RULE/" + _name + "/" + day;
                        break;
                    case this.appObj.messages.BroadcastersFilter:
                        path = "/TVoY_UTC/TVoY_BROADCASTER_NMC_RULE/" + _name + "/" + day;
                        break
                }
            }
            if (path != "" && day != "")return path; else {
                fw.log.debug("buildTimePath : error in checking path : " + path + " - checking day : " + day);
                return this.conf.fakePathString
            }
        } catch (ex) {
            ex.errMethod = "buildTimePath";
            ex.errClass =
                "ScenarioTVOY";
            fw.err(ex)
        }
    }, getTVOYSubcategoriesFromCategoryIdCallBack: function (_prop, _obj) {
        try {
            this.subcategoriesArray = new Array;
            if (_obj != null) {
                this.subcategoriesArray = fw.util.cloneAllObjectType(_obj);
                fw.log.debug("getTVOYSubcategoriesFromCategoryIdCallBack : Dinamically retrieved subcategories : ", _obj)
            }
            fw.log.debug("getTVOYSubcategoriesFromCategoryIdCallBack : passed parameter : ", _prop);
            if (_prop.hardcodedSubItems != null && _prop.hardcodedSubItems != undefined) {
                var menu = fw.util.cloneAllObjectType(_prop.hardcodedSubItems);
                this.tvoyParseMenuListObject(menu, true)
            } else {
                fw.log.debug("getTVOYSubcategoriesFromCategoryIdCallBack : tvoySetListingTypeToShow : ", _prop);
                var menu = fw.util.cloneAllObjectType(_prop);
                this.tvoySetListingTypeToShow(menu)
            }
        } catch (ex) {
            ex.errMethod = "getTVOYSubcategoriesFromCategoryIdCallBack";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getTVOYVodsFromCategoryIdCallBack: function (_prop, _obj, _totalMoviesCount) {
        try {
            this.unLockKeyBoard();
            var _this = this;
            setTimeout(function () {
                _this.lastShownCategoryIdElements = _prop;
                _this.totalMovies = _totalMoviesCount;
                _this.movies = _obj;
                fw.log.debug("getTVOYVodsFromCategoryIdCallBack : " + _this.totalMovies);
                if (_this.totalMovies == 1) {
                    _this.navigationTree.pop();
                    if (_this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(_this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(_this.callBackcheckPCLevelContent, _this, _this.conf.hasLiveVideo); else _this.loadDetailsPage(_this.movies[0])
                } else {
                    if (!_this.isShowingEpisodes)_this.tvoyCatBreadcrumb.push(_this.appObj.messages["programma_label"], true);
                    _this.isShowingEpisodes = true;
                    endString = _this.appObj.messages.Episodes;
                    var string = eval("_this.appObj.messages.FoundItems") + " " + _this.totalMovies + " " + (_this.currentLeftMenuParent == _this.appObj.messages["AllDays"] ? endString : endString);
                    _this.updateListingHeaderString(string);
                    if (_this.totalMovies == 0)_this.navigationTree.pop(); else {
                        var episodesList = _this.movies;
                        episodesList = _this.parseEpisodesList(episodesList);
                        _this.tvoyCatGrid.hide();
                        fw.bannerUiManager.showBanner(_this.callBackShowBanner, _this, null);
                        _this.tvoyCatModuleEpisodesList.setMenuList(episodesList, _this.orderInList, false);
                        _this.currentDataArray = fw.util.cloneAllObjectType(episodesList);
                        _this.tvoyCatModuleEpisodesList.show();
                        _this.tvoyCatModuleList.hide();
                        if (!_this.fromOptionMenu) {
                            _this.currentFocus = _this.FOCUS_LEFT;
                            _this.updateFooter();
                            _this.tvoyCatModuleMenuList.setFocusOnElementByName("name", _this.tvoyCatModuleMenuList.getSelectItem().cont.name)
                        } else if (_this.currentFocus == _this.FOCUS_LEFT) {
                            _this.updateFooter();
                            _this.tvoyCatModuleMenuList.setFocusOnElementByName("name",
                                _this.tvoyCatModuleMenuList.getSelectItem().cont.name)
                        } else _this.tvoyCatModuleEpisodesList.focusToGrid();
                        if (_this.currentFocus != _this.FOCUS_RIGHT)_this.tvoyCatModuleInfo.hide()
                    }
                }
            }, 0)
        } catch (ex) {
            ex.errMethod = "getTVOYVodsFromCategoryIdCallBack";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, parseEpisodesList: function (_list) {
        try {
            return _list
        } catch (ex) {
            ex.errMethod = "parseEpisodesList";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, updateCatModuleInfo: function (_force) {
        try {
            if (_force)if (this.currentFocusedElem.isLeaf !=
                null && this.currentFocusedElem.isLeaf != undefined) {
                var focusedElem = this.currentFocusedElem;
                var needToSetFakeDesc = false;
                if (this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem != null)var cleanedSt = this.removeCharsFromString(this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem, " ", true); else var cleanedSt = this.removeCharsFromString(this.tvoyCatModuleMenuList.getFocusItem().dataElement.name, " ", true);
                cleanedSt = this.returnCleanedString(cleanedSt);
                fw.log.debug("cleanedSt : " + cleanedSt);
                if (this.currentLeftMenuParent ==
                    "root" && eval("this.conf.gridElementsCategories." + cleanedSt)) {
                    if (this.tvoyIsGridShown)focusedElem.shortDescription = eval("this.appObj.messages.FakeShortDescription") + " " + (focusedElem.displayName != null && (focusedElem.displayName != undefined && focusedElem.displayName != "") ? focusedElem.displayName : focusedElem.name);
                    focusedElem.hasFakeDesc = true;
                    focusedElem.artistList = null;
                    focusedElem.runtime = null;
                    focusedElem.rentalItems = null;
                    focusedElem.releaseYear = null;
                    focusedElem.licenceEndDate = null;
                    focusedElem.releaseYear =
                        null;
                    focusedElem.directorsList = null;
                    focusedElem.ratingCode = null
                } else {
                    focusedElem.artistList = null;
                    focusedElem.runtime = null;
                    focusedElem.rentalItems = null;
                    focusedElem.releaseYear = null;
                    focusedElem.licenceEndDate = null;
                    focusedElem.releaseYear = null;
                    focusedElem.directorsList = null
                }
                fw.log.debug("updateCatModuleInfo : ", focusedElem);
                this.tvoyCatModuleInfo.setInfoByMoviePG(focusedElem, false);
                this.detailedInfos = focusedElem
            } else {
                this.detailedInfos = this.currentFocusedElem;
                var detailedItem = this.currentFocusedElem;
                if (detailedItem.title.indexOf(this.appObj.messages.afleveringEpisodeSuffix) != -1) {
                    fw.log.debug(detailedItem.title + " : lastIndexOf( - aflevering) : " + detailedItem.title.lastIndexOf(" - aflevering"));
                    detailedItem.title = detailedItem.title.substring(0, detailedItem.title.lastIndexOf(this.appObj.messages.afleveringEpisodeSuffix))
                }
                fw.log.debug("updateCatModuleInfo : ", detailedItem);
                this.tvoyCatModuleInfo.setInfoByMoviePG(detailedItem, false)
            } else {
                var _this = this;
                if (this.reloadDetailsDataTimer != null)fw.util.clearTimeout(this.reloadDetailsDataTimer);
                this.reloadDetailsDataTimer = fw.util.setTimeout(function () {
                    _this.fillDetailsArea()
                }, _this.conf.reloadDetailedInfoAreaInterval)
            }
        } catch (ex) {
            ex.errMethod = "updateCatModuleInfo";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, fillDetailsArea: function () {
        if (this.currentFocusedElem.isLeaf != null && this.currentFocusedElem.isLeaf != undefined) {
            var focusedElem = this.currentFocusedElem;
            if (this.tvoyCatModuleMenuList.getFocusItem().dataElement == this.listingElements)if (this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem !=
                null)var cleanedSt = this.removeCharsFromString(this.tvoyCatModuleMenuList.getFocusItem().dataElement.elem, " ", true); else var cleanedSt = this.removeCharsFromString(this.tvoyCatModuleMenuList.getFocusItem().dataElement.name, " ", true); else if (this.listingElements.elem != null)var cleanedSt = this.removeCharsFromString(this.listingElements.elem, " ", true); else var cleanedSt = this.removeCharsFromString(this.listingElements.name, " ", true);
            cleanedSt = this.returnCleanedString(cleanedSt);
            fw.log.debug("fillDetailsArea - this.currentLeftMenuParent : " +
                this.currentLeftMenuParent);
            fw.log.debug("fillDetailsArea - cleanedSt : " + cleanedSt);
            if (this.currentLeftMenuParent == "root" && eval("this.conf.gridElementsCategories." + cleanedSt)) {
                focusedElem.shortDescription = eval("this.appObj.messages.FakeShortDescription") + " " + (focusedElem.displayName != null && (focusedElem.displayName != undefined && focusedElem.displayName != "") ? focusedElem.displayName : focusedElem.name);
                focusedElem.artistList = null;
                focusedElem.runtime = null;
                focusedElem.rentalItems = null;
                focusedElem.releaseYear =
                    null;
                focusedElem.licenceEndDate = null;
                focusedElem.releaseYear = null;
                focusedElem.directorsList = null;
                focusedElem.hasFakeDesc = true;
                focusedElem.ratingCode = null
            } else {
                focusedElem.artistList = null;
                focusedElem.runtime = null;
                focusedElem.rentalItems = null;
                focusedElem.releaseYear = null;
                focusedElem.licenceEndDate = null;
                focusedElem.releaseYear = null;
                focusedElem.directorsList = null
            }
            fw.log.debug("fillDetailsArea : ", focusedElem);
            this.tvoyCatModuleInfo.setInfoByMoviePG(focusedElem, false);
            this.detailedInfos = focusedElem
        } else {
            this.detailedInfos =
                this.currentFocusedElem;
            var detailedItem = this.currentFocusedElem;
            if (detailedItem.title.indexOf(this.appObj.messages.afleveringEpisodeSuffix) != -1) {
                fw.log.debug(detailedItem.title + " : lastIndexOf( - aflevering) : " + detailedItem.title.lastIndexOf(" - aflevering"));
                detailedItem.title = detailedItem.title.substring(0, detailedItem.title.lastIndexOf(this.appObj.messages.afleveringEpisodeSuffix))
            }
            fw.log.debug("fillDetailsArea : ", detailedItem);
            this.tvoyCatModuleInfo.setInfoByMoviePG(detailedItem, false)
        }
    }, retrievedInfoPgCallback: function (_movie) {
        try {
            fw.log.debug("retrievedInfoPgCallback  : ",
                _movie);
            this.detailedInfos = _movie;
            this.tvoyCatModuleInfo.setInfoByMoviePG(_movie, false)
        } catch (ex) {
            ex.errMethod = "retrievedInfoPgCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyModuleEpisodeListCallback: function (_domElement, _dataElement) {
        try {
            this.currentFocusedElem = _dataElement;
            this.updateCatModuleInfo()
        } catch (ex) {
            ex.errMethod = "tvoyModuleEpisodeListCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyModuleGridListCallback: function (_domElement, _dataElement) {
        try {
            this.currentFocusedElem = _dataElement;
            fw.log.debug("this.currentFocusedElem : ", this.currentFocusedElem);
            this.updateCatModuleInfo()
        } catch (ex) {
            ex.errMethod = "tvoyModuleGridListCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, PcCheckOnCategory: function () {
        try {
            this.categoryIdToPassToDetailsPage = this.currentFocusedElem.categoryId;
            fw.log.debug("PcCheckOnCategory _ storing current category ID : " + this.categoryIdToPassToDetailsPage);
            if (this.currentFocusedElem.isPCSafe != null && this.currentFocusedElem.isPCSafe != undefined) {
                fw.log.debug("PcCheckOnCategory - checking category PC Safe : " +
                    this.currentFocusedElem.isPCSafe);
                if (fw.pcmanager.checkPCLevel(this.currentFocusedElem.isPCSafe)) {
                    this.unLockKeyBoard();
                    fw.log.debug("PcCheckOnCategory - checkPCPin");
                    fw.pcmanager.checkPCPin(this.callBackCheckPCLevel, this, this.conf.hasLiveVideo)
                } else {
                    fw.log.debug("PcCheckOnCategory - showCategoryInApp");
                    this.showCategoryInApp()
                }
            } else if (!this.tvoyIsGridShown) {
                fw.log.debug("this.currentFocusedElem.isPCSafe is not defined");
                if (fw.pcmanager.checkPCLevel(false))fw.pcmanager.checkPCPin(this.callBackCheckPCLevel,
                    this, this.conf.hasLiveVideo); else this.showCategoryInApp()
            }
        } catch (ex) {
            ex.errMethod = "PcCheckOnCategory";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, callBackCheckPCLevel: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                this.showCategoryInApp();
                this.pcCheckSkipped = false
            } else this.pcCheckSkipped = true
        } catch (ex) {
            ex.errMethod = "callBackCheckPCLevel";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, showCategoryInApp: function () {
        try {
            if (this.currentFocusedElem.categoryId != null && this.currentFocusedElem.categoryId !=
                undefined) {
                fw.log.debug("show category in app - navigation stack length: " + this.navigationTree.length);
                if (this.reloadDetailsDataTimer != null) {
                    fw.util.clearTimeout(this.reloadDetailsDataTimer);
                    this.reloadDetailsDataTimer = null
                }
                fw.log.debug("showCategoryInApp - checking category id : " + this.currentFocusedElem.categoryId);
                if (this.currentFocus == this.FOCUS_LEFT)this.tvoyCatModuleMenuList.setItemSelected();
                if (this.currentFocusedElem.path != null && this.currentFocusedElem.path != undefined) {
                    this.currPath = this.currentFocusedElem.path;
                    this.needToChangeSkin = this.appObj.checkSubSkinChange(this.currPath);
                    if (this.needToChangeSkin) {
                        this.tvoyListingHeaderText.setTxt(eval("this.appObj.messages.RetrievingElements"));
                        this.tvoyCatModuleInfo.hide();
                        var _this = this;
                        setTimeout(function () {
                            fw.log.debug("CALLING setSubSkin ---\x3e" + _this.currPath);
                            _this.appObj.setSubSkin(_this.currPath, _this, _this.callbackChangedSkin)
                        }, 1);
                        fw.log.debug("showCategoryInApp - Changing skin : " + this.appObj.actualAppSkin.id);
                        this.tvoyCatGrid.fullClean();
                        if (this.currentFocusedElem.isLeaf !=
                            null && this.currentFocusedElem.isLeaf != true) {
                            if (this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != null && this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != undefined) {
                                fw.log.debug("this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] : ", this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path]);
                                fw.log.debug("this.appObj.actualAppSkin : ", this.appObj.actualAppSkin)
                            } else fw.log.debug("this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] \u00e8 null o undefined");
                            if (this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != null && (this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != undefined && this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path].css != this.appObj.actualAppSkin.css)) {
                                this.tvoyCatModuleList.clean();
                                this.tvoyCatModuleMenuList.clean()
                            } else;
                        } else if (this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != null && (this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path] != undefined && this.appObj.conf.subskinCategoryConf[this.currentFocusedElem.path].css !=
                            this.appObj.actualAppSkin.css)) {
                            this.tvoyCatModuleMenuList.clean();
                            this.tvoyCatModuleList.clean()
                        } else;
                    } else if (this.currentFocusedElem.isLeaf) {
                        fw.log.debug("showCategoryInApp -ChangeSkin not needed : Leaf Element");
                        if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != ""))fw.mwManager.getPGFromCategoryPath(this.currentFocusedElem.path, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.currentFocusedElem.categoryId);
                        else fw.mwManager.getPGFromCategoryId(this.currentFocusedElem.categoryId, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, this.currentFocusedElem.categoryId)
                    } else if (this.isHardcodedObject(this.currentFocusedElem.path)) {
                        fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : hardcoded element in configuration file");
                        this.currentLeftMenuParent = this.currentFocusedElem.name;
                        this.lastParentBreadcrumbElement = this.currentLeftMenuParent;
                        fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : hardcoded element in configuration file : parent is : " +
                            this.currentFocusedElem.name);
                        var path = this.currentFocusedElem.path;
                        var menuToRetrieve = this.conf.hardcodedMenuItems[path].hardcodedMenuToRetrieve;
                        var currObjToPassToMenuListCreator = new Object;
                        currObjToPassToMenuListCreator = eval("this.conf." + menuToRetrieve);
                        if (currObjToPassToMenuListCreator == null || currObjToPassToMenuListCreator == undefined)currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(this.conf.defaultitem);
                        fw.log.debug("showCategorInApp -  hardcoded menu - ", currObjToPassToMenuListCreator);
                        fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : hardcoded element in configuration file : retrieving subcategories");
                        if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != ""))fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator); else fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId,
                            this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator);
                        currObjToPassToMenuListCreator = null
                    } else {
                        fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded -> ", this.currentFocusedElem);
                        if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != "")) {
                            fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded -> this.currentLeftMenuParent : " +
                                this.currentLeftMenuParent);
                            if (this.currentLeftMenuParent === "root" && this.checkIfNeedToSetLeftMenuPanel(this.tvoyCatModuleMenuList.getSelectedItem().dataElement.path)) {
                                fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : setting default menu");
                                var currObjToPassToMenuListCreator = new Object;
                                currObjToPassToMenuListCreator.hardcodedSubItems = new Array;
                                for (a = 0; a < this.conf.defaultitem.hardcodedSubItems.length; a++) {
                                    var menuItem = this.conf.defaultitem.hardcodedSubItems[a];
                                    currObjToPassToMenuListCreator.hardcodedSubItems.push(menuItem);
                                    menuItem = null
                                }
                                this.currentLeftMenuParent = this.currentFocusedElem.name;
                                fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                            } else if (this.currentLeftMenuParent === "root") {
                                fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : checking if need to force left menu : " + this.tvoyCatModuleMenuList.getSelectedItem().dataElement.path);
                                if (this.currentFocus == this.FOCUS_LEFT)if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.checkIfNeedToSetLeftMenuPanel(this.currentFocusedElem.path))) {
                                    fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : checking if need to force left menu : forcing default menu on left panel");
                                    var currObjToPassToMenuListCreator = new Object;
                                    currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(this.conf.defaultitem);
                                    this.currentLeftMenuParent =
                                        this.currentFocusedElem.name;
                                    fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                                } else {
                                    fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : checking if need to force left menu : menu not changing");
                                    fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem)
                                } else if (this.tvoyCatModuleMenuList().cont.path !=
                                    null && (this.tvoyCatModuleMenuList.getSelectItem().cont.path != undefined && this.checkIfNeedToSetLeftMenuPanel(this.tvoyCatModuleMenuList.getSelectedItem().dataElement.path))) {
                                    fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : checking if need to force left menu : forcing default menu on left panel");
                                    var currObjToPassToMenuListCreator = new Object;
                                    currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(this.conf.defaultitem);
                                    this.currentLeftMenuParent =
                                        this.currentFocusedElem.name;
                                    fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                                } else {
                                    fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded : checking if need to force left menu : menu not changing");
                                    fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem)
                                }
                            } else fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path,
                                this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem)
                        } else {
                            fw.log.debug("showCategoryInApp - ChangeSkin not needed : Not Leaf Element : element not hardcoded -> else ---\x3e " + this.tvoyCatModuleMenuList.getSelectedItem().dataElement.path);
                            if (this.currentLeftMenuParent === "root" && (this.currentFocusedElem.elem != null && (this.currentFocusedElem.elem != undefined && this.checkIfNeedToSetLeftMenuPanel(this.tvoyCatModuleMenuList.getSelectedItem().cont.path)))) {
                                var currObjToPassToMenuListCreator =
                                    new Object;
                                currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(this.conf.defaultitem);
                                this.currentLeftMenuParent = this.currentFocusedElem.name;
                                fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                            } else if (this.currentLeftMenuParent === "root" && (this.currentFocusedElem.name != null && (this.currentFocusedElem.name != undefined && this.checkIfNeedToSetLeftMenuPanel(this.tvoyCatModuleMenuList.getSelectedItem().dataElement.path)))) {
                                this.currentLeftMenuParent =
                                    this.currentFocusedElem.name;
                                fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem)
                            } else fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem)
                        }
                    }
                }
            } else {
                fw.log.debug("categoryId is null for selected item : skin change is disabled");
                if (this.currentFocusedElem.isLeaf) {
                    fw.log.debug("categoryId is null for selected item : skin change is disabled : is Leaf");
                    if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != ""))fw.mwManager.getPGFromCategoryPath(this.currentFocusedElem.path, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, "a"); else fw.mwManager.getPGFromCategoryId(this.currentFocusedElem.categoryId, this.actualPagingIndex, this.orderInList, this.getTVOYVodsFromCategoryIdCallBack, this, "a")
                } else {
                    fw.log.debug("categoryId is null for selected item : skin change is disabled : is not a Leaf");
                    if (this.isHardcodedObject(this.currentFocusedElem.path)) {
                        fw.log.debug("categoryId is null for selected item : skin change is disabled : is not a Leaf: hardcoded item");
                        this.currentLeftMenuParent = this.currentFocusedElem.name;
                        this.lastParentBreadcrumbElement = this.currentLeftMenuParent;
                        var path = this.currentFocusedElem.path;
                        var menuToRetrieve = this.conf.hardcodedMenuItems[path].hardcodedMenuToRetrieve;
                        var currObjToPassToMenuListCreator = new Object;
                        currObjToPassToMenuListCreator = eval("this.conf." + menuToRetrieve);
                        if (currObjToPassToMenuListCreator == null || currObjToPassToMenuListCreator == undefined)currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(this.conf.defaultitem);
                        if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != ""))fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator); else fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId,
                            this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                    } else {
                        fw.log.debug("categoryId is null for selected item : skin change is disabled : is not a Leaf: not hardcoded item");
                        if (this.currentFocusedElem.path != null && (this.currentFocusedElem.path != undefined && this.currentFocusedElem.path != ""))if (this.currentLeftMenuParent === "root" && this.checkIfNeedToSetLeftMenuPanel(this.currentFocusedElem.path)) {
                            var currObjToPassToMenuListCreator = new Object;
                            currObjToPassToMenuListCreator =
                                fw.util.cloneAllObjectType(this.conf.defaultitem);
                            fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, currObjToPassToMenuListCreator)
                        } else fw.mwManager.getSubCategoriesFromCategoryPath(this.currentFocusedElem.path, this.getTVOYSubcategoriesFromCategoryIdCallBack, this, this.currentFocusedElem); else fw.mwManager.getSubCategoriesFromCategoryId(this.currentFocusedElem.categoryId, this.getTVOYSubcategoriesFromCategoryIdCallBack, this,
                            currObjToPassToMenuListCreator)
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "showCategoryInApp";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, checkIfNeedToSetLeftMenuPanel: function (_path) {
        try {
            fw.log.debug("checkIfNeedToSetLeftMenuPanel : passed parameter : " + _path);
            var variableToReturn = false;
            for (var a = 0; a < this.conf.showMenuInLeftPanel.length; a++) {
                fw.log.debug("checkIfNeedToSetLeftMenuPanel : passed parameter cycling forceSetLeftMenuPanelElement : " + this.conf.showMenuInLeftPanel[a] + " - " + _path);
                if (_path == this.conf.showMenuInLeftPanel[a]) {
                    fw.log.debug("checkIfNeedToSetLeftMenuPanel : passed parameter cycling found in forceSetLeftMenuPanelElement");
                    variableToReturn = true;
                    break
                }
            }
            fw.log.debug("checkIfNeedToSetLeftMenuPanel : returning parameter : " + variableToReturn);
            return variableToReturn
        } catch (ex) {
            ex.errMethod = "checkIfNeedToSetLeftMenuPanel";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, returnCleanedString: function (_str) {
        return _str.replace(/\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g, "")
    }, writeInfoContent: function (_obj) {
        this.titleTvoy.setTxt(_obj.contentTitle);
        this.subtitleTvoy.setTxt(_obj.description);
        this.logoChannel.setUrl(_obj.urlLogo)
    }, callBackcheckPCLevelContent: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                this.pcCheckSkipped = false;
                if (!this.isShowingEpisodes)this.loadDetailsPage(this.movies[0]); else this.loadDetailsPage(this.currentFocusedElem)
            } else {
                this.pcCheckSkipped = true;
                fw.log.debug("callBackcheckPCLevelContent - pre : Actual Navigation array size : " + this.navigationTree.length);
                fw.log.debug("callBackcheckPCLevelContent - post : Actual Navigation array size : " + this.navigationTree.length);
                fw.bannerUiManager.hideBanner();
                this.tvoyCatModuleInfo.show();
                this.tvoyListingHeaderText.setTxt(this.getListingHeaderString())
            }
        } catch (ex) {
            ex.errMethod = "callBackcheckPCLevelContent";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, callBackcheckPCLevelContentPlayEvent: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                if (this.isItemRented(this.movies[0]))this.loadFullscreenPage(this.movies[0]); else this.loadDetailsPage(this.movies[0])
            } else;
        } catch (ex) {
            ex.errMethod = "callBackcheckPCLevelContent";
            ex.errClass =
                "ScenarioTVOY";
            fw.err(ex)
        }
    }, isItemRented: function (_movie) {
        return fw.mwManager.isItemRented(_movie)
    }, loadDetailsPage: function (_movie) {
        try {
            this.unLockKeyBoard();
            if (this.totalMovies == 1) {
                this.tvoyCatBreadcrumb.clear();
                this.tvoyCatBreadcrumb.pushList(this.buildBreadcrumbPath(this.currentFocusedElem), true);
                this.tvoyCatBreadcrumb.push(this.appObj.messages.programma_label, true)
            }
            if (this.lastShownCategoryIdElements == null)fw.log.debug("this.lastShownCategoryIdElements is null"); else {
                this.appObj.selectedCategoryContent =
                    _movie != null && _movie != undefined ? _movie : this.movies[0];
                this.appObj.selectedCategoryContents = this.movies;
                if (this.isShowingEpisodes)this.appObj.positionInCategory = this.tvoyCatModuleEpisodesList.getList().getItemSelectPosition(); else this.appObj.positionInCategory = 0;
                this.movie = this.appObj.selectedCategoryContent;
                var breadcrumbDetail = fw.util.cloneAllObjectType(this.tvoyCatBreadcrumb.getBreadCrumbList());
                if (this.tvoyCatBreadcrumb.getTopElement() != this.appObj.messages.detailPageGeneralVodTitle)breadcrumbDetail.push(this.appObj.messages.detailPageGeneralVodTitle);
                var objParam = new Object;
                objParam.contentId = _movie.id != null && _movie.id != undefined ? _movie.id : this.movies[0].id;
                objParam.category = this.currentFocusedElem;
                objParam.breadCrumbList = breadcrumbDetail;
                objParam.isOttPresent = this.appObj.conf.isOttEnabled;
                if (this.totalMovies == 1)objParam.categoryPathSkin = this.currentFocusedElem.path; else objParam.categoryPathSkin = this.currPath;
                objParam.isMoviePg = true;
                var inputObj = new Array("Detail", objParam);
                fw.log.debug("Input obj passed to details page : ", objParam);
                fw.log.debug("Scenario TVOY - requesting details page for content  : " +
                    objParam.contentId + "  - " + this.appObj.selectedCategoryContent.id);
                this.appObj.init(inputObj)
            }
        } catch (ex) {
            ex.errMethod = "loadDetailsPage";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, loadFullscreenPage: function (_movie) {
        try {
            fw.log.debug("loading fullscreen page for : ", _movie);
            this.appObj.selectedCategoryContent = _movie != null && _movie != undefined ? _movie : this.movies[0];
            this.appObj.selectedCategoryContents = this.movies;
            this.appObj.positionInCategory = 0;
            var type = "N";
            if (this.appObj.selectedCategoryContent.bookmarks !=
                null && (this.appObj.selectedCategoryContent.bookmarks != undefined && parseInt(this.appObj.selectedCategoryContent.bookmarks) > 0))this.showInteractivePopup(); else this.appObj.init(new Array("Play", this.appObj.selectedCategoryContent.id, type))
        } catch (ex) {
            ex.errMethod = "loadFullscreenPage";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getCategoryIdFromCategoryPathCallback: function (_prop, _obj) {
        try {
            if (_obj != null && _obj != undefined) {
                this.currentFocusedElem = _obj;
                this.showCategoryInApp()
            }
        } catch (ex) {
            ex.errMethod = "getCategoryIdFromCategoryPathCallback";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, returnTMDaysConf: function () {
        try {
            return this.conf.TMDaysConf
        } catch (ex) {
            ex.errMethod = "returnTMDaysConf";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, addScreenToNavigationArray: function (_scenarioToReach) {
        try {
            fw.log.debug("ADD SCREEN TO NAVIGATION ARRAY ");
            if (this.navigationTree[this.navigationTree.length - 2] != null && (this.navigationTree[this.navigationTree.length - 2] != undefined && (this.navigationTree[this.navigationTree.length - 1] != null && this.navigationTree[this.navigationTree.length -
                1] != undefined)))if (this.navigationTree[this.navigationTree.length - 2].rightPanel.menu == this.navigationTree[this.navigationTree.length - 1].rightPanel.menu)this.navigationTree.pop();
            var navObject = new Object;
            navObject.currentFocus = this.currentFocus;
            navObject.actualSkinConf = this.currPath;
            navObject.currentBreadcrumb = fw.util.cloneAllObjectType(this.currentBreacrumbList);
            navObject.leftPanel = new Object;
            navObject.leftPanel.needToShowTopButton = this.isTopButtonShown;
            navObject.leftPanel.menu = this.currentMenuArray;
            navObject.leftPanel.menuParent = this.currentLeftMenuParent;
            navObject.leftPanel.breadcrumbParent = this.lastParentBreadcrumbElement;
            navObject.rightPanel = new Object;
            navObject.rightPanel.selectedItem = this.currentFocus == this.FOCUS_RIGHT ? this.tvoyIsGridShown ? this.tvoyCatGrid.getGrid().getDataElementItemSelect() : this.tvoyCatModuleList.getGrid().getDataElementItemSelect() : null;
            navObject.rightPanel.menu = fw.util.cloneAllObjectType(this.currentDataArray);
            navObject.rightPanel.leftPanelSelectedMenu = this.listingElements;
            if (this.currentFocus == this.FOCUS_LEFT) {
                fw.log.debug("addScreenToNavigationArray : focus left : selected menu item from default situation : ", this.currentFocusedElem);
                navObject.leftPanel.selectedItem = this.currentFocusedElem
            } else {
                fw.log.info("DATA ELEM : ", this.tvoyCatModuleMenuList.getSelectedItem().dataElement);
                fw.log.debug("addScreenToNavigationArray : selected menu item from default situation : ", this.tvoyCatModuleMenuList.getSelectedItem().dataElement);
                navObject.leftPanel.selectedItem = this.tvoyCatModuleMenuList.getSelectedItem().dataElement
            }
            navObject.leftPanel.shownElem =
                fw.util.cloneAllObjectType(this.listingElements);
            navObject.rightPanel.tvoyIsGridShown = this.tvoyIsGridShown;
            navObject.rightPanel.isShowingEpisodes = this.isShowingEpisodes;
            navObject.rightPanel.endLabelString = this.rightPanelElementsString;
            navObject.rightPanel.totalElements = this.totalMovies;
            navObject.rightPanel.listingHeaderString = this.getListingHeaderString();
            navObject.detailedInfos = this.detailedInfos;
            this.navigationTree.push(navObject);
            navObject = null;
            fw.log.debug("Added element to history stack : current stack length : " +
                this.navigationTree.length);
            fw.log.debug("invoking checkSelectedMenuItem");
            this.checkSelectedMenuItem()
        } catch (ex) {
            ex.errMethod = "addScreenToNavigationArray";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, goBackNavigation: function () {
        try {
            this.updateListingHeaderString(eval("this.appObj.messages.RetrievingElements"));
            if (this.navigationTree[this.navigationTree.length - 1].actualSkinConf) {
                this.currPath = this.navigationTree[this.navigationTree.length - 1].actualSkinConf;
                fw.log.debug("goBackNavigation: " + this.currPath);
                this.needToChangeSkin = this.appObj.checkSubSkinChange(this.currPath);
                fw.log.debug("goBackNavigation : needToChangeSkin : " + this.needToChangeSkin);
                if (this.needToChangeSkin) {
                    var _this = this;
                    setTimeout(function () {
                        fw.log.debug("GOBACK NAVIGATIOn : CALLING setSubSkin ---\x3e" + _this.currPath);
                        _this.appObj.setSubSkin(_this.currPath, _this, _this.callbackChangedSkinBack)
                    }, 1);
                    if (!this.navigationTree[this.navigationTree.length - 1].leftPanel.needToShowTopButton)this.tvoyCatModuleMenuList.hideTopButton();
                    fw.log.debug("goBackNavigation : Changing skin");
                    this.tvoyCatModuleList.clean();
                    this.tvoyCatModuleMenuList.clean();
                    this.tvoyCatModuleEpisodesList.clean();
                    this.tvoyCatModuleInfo.hide()
                } else {
                    this.fromBack = true;
                    this.listingElements = this.navigationTree[this.navigationTree.length - 1].rightPanel.leftPanelSelectedMenu;
                    this.isTopButtonShown = this.navigationTree[this.navigationTree.length - 1].leftPanel.needToShowTopButton;
                    if (this.navigationTree[this.navigationTree.length - 1].currentFocus == this.FOCUS_LEFT) {
                        this.currentFocus = this.FOCUS_LEFT;
                        this.tvoyCatModuleInfo.hide();
                        fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null);
                        this.currentLeftMenuParent = this.navigationTree[this.navigationTree.length - 1].leftPanel.menuParent;
                        this.lastParentBreadcrumbElement = this.navigationTree[this.navigationTree.length - 1].leftPanel.breadcrumbParent;
                        if (this.navigationTree[this.navigationTree.length - 1].leftPanel.needToShowTopButton)this.tvoyCatModuleMenuList.showTopButton(); else this.tvoyCatModuleMenuList.hideTopButton();
                        this.needToShowTopButton = this.navigationTree[this.navigationTree.length -
                        1].leftPanel.needToShowTopButton;
                        this.tvoyCatModuleMenuList.setMenuList(this.navigationTree[this.navigationTree.length - 1].leftPanel.menu);
                        this.currentMenuArray = this.navigationTree[this.navigationTree.length - 1].leftPanel.menu;
                        if (this.navigationTree[this.navigationTree.length - 1].leftPanel.shownElem != null && this.navigationTree[this.navigationTree.length - 1].leftPanel.shownElem.path != null) {
                            this.tvoyCatModuleMenuList.setFocusOnElementByName("path", this.navigationTree[this.navigationTree.length - 1].leftPanel.shownElem.path);
                            this.tvoyCatModuleMenuList.setItemSelected(true)
                        }
                        this.tvoyCatModuleMenuList.setFocusOnElementByName("name", this.navigationTree[this.navigationTree.length - 1].leftPanel.selectedItem.name);
                        var string = this.navigationTree[this.navigationTree.length - 1].rightPanel.listingHeaderString;
                        this.updateListingHeaderString(string);
                        this.tvoyCatBreadcrumb.clear();
                        this.tvoyCatBreadcrumb.pushList(this.navigationTree[this.navigationTree.length - 1].currentBreadcrumb, true);
                        if (this.navigationTree[this.navigationTree.length -
                            1].rightPanel.tvoyIsGridShown) {
                            if (!this.tvoyIsGridShown) {
                                this.tvoyCatModuleList.hide();
                                this.tvoyCatModuleEpisodesList.hide()
                            }
                            this.tvoyCatGrid.setMenuList(this.navigationTree[this.navigationTree.length - 1].rightPanel.menu);
                            this.currentDataArray = this.navigationTree[this.navigationTree.length - 1].rightPanel.menu;
                            if (!this.tvoyIsGridShown)this.tvoyCatGrid.show()
                        } else if (this.navigationTree[this.navigationTree.length - 1].rightPanel.isShowingEpisodes) {
                            this.tvoyCatModuleList.hide();
                            this.tvoyCatModuleEpisodesList.setMenuList(this.navigationTree[this.navigationTree.length -
                            1].rightPanel.menu);
                            if (!this.isShowingEpisodes)this.tvoyCatModuleEpisodesList.show()
                        } else this.tvoyCatModuleList.setMenuList(this.navigationTree[this.navigationTree.length - 1].rightPanel.menu);
                        this.currentDataArray = this.navigationTree[this.navigationTree.length - 1].rightPanel.menu;
                        this.totalMovies = this.navigationTree[this.navigationTree.length - 1].rightPanel.totalElements;
                        this.rightPanelElementsString = this.navigationTree[this.navigationTree.length - 1].rightPanel.endLabelString;
                        this.tvoyIsGridShown = this.navigationTree[this.navigationTree.length -
                        1].rightPanel.tvoyIsGridShown;
                        this.isShowingEpisodes = this.navigationTree[this.navigationTree.length - 1].rightPanel.isShowingEpisodes
                    } else {
                        this.currentFocus = this.FOCUS_RIGHT;
                        this.currentLeftMenuParent = this.navigationTree[this.navigationTree.length - 1].leftPanel.menuParent;
                        this.lastParentBreadcrumbElement = this.navigationTree[this.navigationTree.length - 1].leftPanel.breadcrumbParent;
                        fw.log.debug("this.currentLeftMenuParent is : " + this.currentLeftMenuParent);
                        if (this.navigationTree[this.navigationTree.length -
                            1].leftPanel.needToShowTopButton) {
                            fw.log.debug("Showing top menu element");
                            this.tvoyCatModuleMenuList.showTopButton()
                        } else {
                            fw.log.debug("Hiding top menu element");
                            this.tvoyCatModuleMenuList.hideTopButton()
                        }
                        this.isTopButtonShown = this.navigationTree[this.navigationTree.length - 1].leftPanel.needToShowTopButton;
                        this.tvoyCatModuleMenuList.setMenuList(this.navigationTree[this.navigationTree.length - 1].leftPanel.menu);
                        this.tvoyCatModuleMenuList.setFocusOnElementByName("path", this.navigationTree[this.navigationTree.length -
                        1].leftPanel.selectedItem.path);
                        this.tvoyCatModuleMenuList.setItemSelected(true);
                        this.tvoyCatModuleMenuList.focusOff();
                        this.currentFocus = this.FOCUS_RIGHT;
                        this.currentMenuArray = this.navigationTree[this.navigationTree.length - 1].leftPanel.menu;
                        var string = this.navigationTree[this.navigationTree.length - 1].rightPanel.listingHeaderString;
                        this.updateListingHeaderString(string);
                        this.tvoyCatBreadcrumb.clear();
                        this.tvoyCatBreadcrumb.pushList(this.navigationTree[this.navigationTree.length - 1].currentBreadcrumb,
                            true);
                        if (this.navigationTree[this.navigationTree.length - 1].rightPanel.tvoyIsGridShown) {
                            if (!this.tvoyIsGridShown) {
                                this.tvoyCatModuleList.hide();
                                this.tvoyCatModuleEpisodesList.hide()
                            }
                            fw.log.debug("Setting elements to grid");
                            this.tvoyCatGrid.setMenuList(this.navigationTree[this.navigationTree.length - 1].rightPanel.menu);
                            this.currentDataArray = this.navigationTree[this.navigationTree.length - 1].rightPanel.menu;
                            if (!this.tvoyIsGridShown)this.tvoyCatGrid.show();
                            this.currentFocusedElem = this.navigationTree[this.navigationTree.length -
                            1].rightPanel.selectedItem;
                            this.tvoyCatGrid.setFocusOnElementByName("name", this.currentFocusedElem.name)
                        } else {
                            fw.log.debug("Setting elements to list");
                            if (this.navigationTree[this.navigationTree.length - 1].rightPanel.isShowingEpisodes) {
                                this.tvoyCatModuleEpisodesList.setMenuList(this.navigationTree[this.navigationTree.length - 1].rightPanel.menu);
                                this.currentFocusedElem = this.navigationTree[this.navigationTree.length - 1].rightPanel.selectedItem;
                                this.tvoyCatModuleEpisodesList.setFocusOnElementByName("name",
                                    this.currentFocusedElem.name);
                                this.tvoyCatModuleEpisodesList.show()
                            } else {
                                this.tvoyCatModuleEpisodesList.hide();
                                this.tvoyCatModuleList.setMenuList(this.navigationTree[this.navigationTree.length - 1].rightPanel.menu);
                                this.currentFocusedElem = this.navigationTree[this.navigationTree.length - 1].rightPanel.selectedItem;
                                this.tvoyCatModuleList.setFocusOnElementByName("name", this.currentFocusedElem.name);
                                this.tvoyCatModuleList.show()
                            }
                            this.currentDataArray = this.navigationTree[this.navigationTree.length - 1].rightPanel.menu;
                            this.isShowingEpisodes = this.navigationTree[this.navigationTree.length - 1].rightPanel.isShowingEpisodes
                        }
                        this.rightPanelElementsString = this.navigationTree[this.navigationTree.length - 1].rightPanel.endLabelString;
                        this.totalMovies = this.navigationTree[this.navigationTree.length - 1].rightPanel.totalElements;
                        fw.log.debug("this.currentFocusedElem : ", this.currentFocusedElem);
                        this.tvoyCatModuleInfo.setInfoByMoviePG(this.navigationTree[this.navigationTree.length - 1].detailedInfos, true);
                        fw.bannerUiManager.hideBanner();
                        this.tvoyCatModuleInfo.show();
                        this.tvoyIsGridShown = this.navigationTree[this.navigationTree.length - 1].rightPanel.tvoyIsGridShown
                    }
                    this.updateFooter();
                    this.updateOkFooterElement();
                    fw.log.debug("Removing last element from navigation stack");
                    this.navigationTree.pop()
                }
            }
        } catch (ex) {
            ex.errMethod = "goBackNavigation";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, setFooterElements: function (_obj) {
        try {
            fw.log.debug("setFooterElements : ", _obj);
            if (_obj.navigationFooterElement != null) {
                this.footerElementNav.setImage(_obj.navigationFooterElement.imgUrl);
                this.footerElementNav.setText(_obj.navigationFooterElement.txtLabel)
            } else this.footerElementNav.hide();
            if (_obj.okFooterElement)if (_obj.okFooterElement.imgUrl != null) {
                this.footerElementOKLeft.setImage(_obj.okFooterElement.imgUrl);
                this.footerElementOKRight.setText(_obj.okFooterElement.txtLabel)
            } else {
                this.footerElementOKLeft.hide();
                this.footerElementOKRight.hide()
            } else {
                this.footerElementOKLeft.hide();
                this.footerElementOKRight.hide()
            }
            if (_obj.playFooterElement)if (_obj.playFooterElement.imgUrl != null) {
                this.footerElementPlayRight.setImage(_obj.playFooterElement.imgUrl);
                this.footerElementPlayRight.setText(_obj.playFooterElement.txtLabel)
            } else this.footerElementPlayRight.hide(); else this.footerElementPlayRight.hide()
        } catch (ex) {
            ex.errMethod = "setFooterElements";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, tvoyKeyboardPressedCallBack: function (_res) {
        try {
            fw.mediaManager.tuneToChannel(_res)
        } catch (ex) {
            ex.errMethod = "tvoyKeyboardPressedCallBack";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getFormattedDate: function (_daysArray, _unixTimestamp) {
        try {
            var day = (new Date(_unixTimestamp)).getDate();
            if (day <= 9)day = "0" + day;
            var month = parseInt((new Date(_unixTimestamp)).getMonth() + 1);
            if (month <= 9)month = "0" + month;
            var dayOfWeek = (new Date(_unixTimestamp)).getDay();
            var dayTranslation = eval("this.appObj.messages." + _daysArray[dayOfWeek]);
            return dayTranslation.substring(0, 2).toLowerCase() + " " + day + "-" + month
        } catch (ex) {
            ex.errMethod = "getFormattedDate";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, callbackChangedSkin: function () {
        try {
            this.needToChangeSkin = false;
            var _this = this;
            fw.log.debug("callbackChangedSkin - actual css : " +
                this.appObj.actualAppSkin.css);
            setTimeout(function () {
                if (_this.currentFocusedElem.isLeaf) {
                    fw.log.debug("ChangeSkin : Leaf Element");
                    if (_this.currentFocusedElem.path != null && (_this.currentFocusedElem.path != undefined && _this.currentFocusedElem.path != "")) {
                        fw.log.debug("ChangeSkin : Leaf Element : requesting subcategories from category Path");
                        _this.categoryPathToPassToDetailsPage = _this.currentShownElem.path;
                        fw.mwManager.getPGFromCategoryPath(_this.currentFocusedElem.path, _this.actualPagingIndex, _this.orderInList,
                            _this.getTVOYVodsFromCategoryIdCallBack, _this, _this.currentFocusedElem.categoryId)
                    } else {
                        fw.log.debug("ChangeSkin : Leaf Element : requesting subcategories from category id");
                        fw.mwManager.getPGFromCategoryId(_this.currentFocusedElem.categoryId, _this.actualPagingIndex, _this.orderInList, _this.getTVOYVodsFromCategoryIdCallBack, _this, _this.currentFocusedElem.categoryId)
                    }
                } else {
                    fw.log.debug("ChangeSkin : Element is not leaf");
                    if (_this.isHardcodedObject(_this.currentFocusedElem.path)) {
                        fw.log.debug("ChangeSkin : Element is not leaf : hardcoded element");
                        _this.currentLeftMenuParent = _this.currentFocusedElem.name;
                        _this.lastParentBreadcrumbElement = _this.currentLeftMenuParent;
                        fw.log.debug("ChangeSkin : Element is not leaf : hardcoded element : parent menu element is : " + _this.currentLeftMenuParent);
                        var name = _this.returnCleanedString(_this.currentFocusedElem.name);
                        var path = _this.currentFocusedElem.path;
                        var menuToRetrieve = _this.conf.hardcodedMenuItems[path].hardcodedMenuToRetrieve;
                        var currObjToPassToMenuListCreator = eval("_this.conf." + menuToRetrieve);
                        if (currObjToPassToMenuListCreator ==
                            null || currObjToPassToMenuListCreator == undefined)currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(_this.conf.defaultitem);
                        fw.log.debug("ChangeSkin : Element is not leaf : hardcoded element : retrieving subcategories");
                        if (_this.currentFocusedElem.path != null && (_this.currentFocusedElem.path != undefined && _this.currentFocusedElem.path != ""))fw.mwManager.getSubCategoriesFromCategoryPath(_this.currentFocusedElem.path, _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, currObjToPassToMenuListCreator);
                        else fw.mwManager.getSubCategoriesFromCategoryId(_this.currentFocusedElem.categoryId, _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, currObjToPassToMenuListCreator)
                    } else {
                        fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element");
                        fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories");
                        if (_this.currentFocusedElem.path != null && (_this.currentFocusedElem.path != undefined && _this.currentFocusedElem.path != "")) {
                            fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories : path is not null and valid");
                            if (_this.currentLeftMenuParent === "root") {
                                fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories :_this.currentLeftMenuParent = root");
                                var name = _this.returnCleanedString(_this.currentFocusedElem.name);
                                fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories : name = " + name);
                                var currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(_this.conf.defaultitem);
                                fw.mwManager.getSubCategoriesFromCategoryPath(_this.currentFocusedElem.path,
                                    _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, currObjToPassToMenuListCreator)
                            } else {
                                fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories : _this.currentLeftMenuParent != root : " + _this.currentLeftMenuParent);
                                fw.mwManager.getSubCategoriesFromCategoryPath(_this.currentFocusedElem.path, _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, _this.currentFocusedElem)
                            }
                        } else {
                            fw.log.debug("ChangeSkin : Element is not leaf : not hardcoded element: retrieving subcategories : path is null or not valid");
                            if (_this.currentLeftMenuParent === "root") {
                                var currObjToPassToMenuListCreator = fw.util.cloneAllObjectType(_this.conf.defaultitem);
                                fw.mwManager.getSubCategoriesFromCategoryId(_this.currentFocusedElem.categoryId, _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, currObjToPassToMenuListCreator)
                            } else {
                                var name = _this.returnCleanedString(_this.currentFocusedElem.name);
                                fw.mwManager.getSubCategoriesFromCategoryId(_this.currentFocusedElem.categoryId, _this.getTVOYSubcategoriesFromCategoryIdCallBack, _this, _this.currentFocusedElem)
                            }
                        }
                        _this.currentLeftMenuParent =
                            _this.currentFocusedElem.name;
                        _this.lastParentBreadcrumbElement = _this.currentLeftMenuParent
                    }
                }
            }, 0)
        } catch (ex) {
            ex.errMethod = "callbackChangedSkin";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, callbackChangedSkinBack: function () {
        try {
            fw.log.debug("callbackChangedSkinBack");
            var _this = this;
            this.needToChangeSkin = false;
            _this.fromBack = true;
            _this.listingElements = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.leftPanelSelectedMenu;
            _this.isTopButtonShown = _this.navigationTree[_this.navigationTree.length -
            1].leftPanel.needToShowTopButton;
            setTimeout(function () {
                if (_this.navigationTree[_this.navigationTree.length - 1].currentFocus == _this.FOCUS_LEFT) {
                    _this.currentFocus = _this.FOCUS_LEFT;
                    _this.tvoyCatModuleInfo.hide();
                    fw.bannerUiManager.showBanner(_this.callBackShowBanner, _this, null);
                    _this.currentLeftMenuParent = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.menuParent;
                    _this.lastParentBreadcrumbElement = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.breadcrumbParent;
                    if (_this.navigationTree[_this.navigationTree.length -
                        1].leftPanel.needToShowTopButton)_this.tvoyCatModuleMenuList.showTopButton(); else _this.tvoyCatModuleMenuList.hideTopButton();
                    _this.needToShowTopButton = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.needToShowTopButton;
                    _this.tvoyCatModuleMenuList.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].leftPanel.menu);
                    _this.currentMenuArray = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.menu;
                    _this.tvoyCatModuleMenuList.setFocusOnElementByName("name", _this.navigationTree[_this.navigationTree.length -
                    1].leftPanel.shownElem.name);
                    _this.tvoyCatModuleMenuList.setItemSelected(true);
                    _this.tvoyCatModuleMenuList.setFocusOnElementByName("name", _this.navigationTree[_this.navigationTree.length - 1].leftPanel.selectedItem.name);
                    var string = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.listingHeaderString;
                    _this.updateListingHeaderString(string);
                    _this.tvoyCatBreadcrumb.clear();
                    _this.tvoyCatBreadcrumb.pushList(_this.navigationTree[_this.navigationTree.length - 1].currentBreadcrumb, true);
                    if (_this.navigationTree[_this.navigationTree.length -
                        1].rightPanel.tvoyIsGridShown) {
                        if (!_this.tvoyIsGridShown) {
                            _this.tvoyCatModuleList.hide();
                            _this.tvoyCatModuleEpisodesList.hide()
                        }
                        _this.tvoyCatGrid.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu);
                        _this.currentDataArray = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu;
                        if (!_this.tvoyIsGridShown)_this.tvoyCatGrid.show()
                    } else if (_this.navigationTree[_this.navigationTree.length - 1].rightPanel.isShowingEpisodes) {
                        this.tvoyCatModuleList.hide();
                        _this.tvoyCatModuleEpisodesList.setMenuList(_this.navigationTree[_this.navigationTree.length -
                        1].rightPanel.menu);
                        if (!this.isShowingEpisodes)_this.tvoyCatModuleEpisodesList.show()
                    } else _this.tvoyCatModuleList.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu);
                    _this.currentDataArray = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu;
                    _this.totalMovies = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.totalElements;
                    _this.rightPanelElementsString = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.endLabelString;
                    _this.tvoyIsGridShown =
                        _this.navigationTree[_this.navigationTree.length - 1].rightPanel.tvoyIsGridShown;
                    _this.isShowingEpisodes = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.isShowingEpisodes
                } else {
                    _this.currentFocus = _this.FOCUS_RIGHT;
                    _this.currentLeftMenuParent = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.menuParent;
                    _this.lastParentBreadcrumbElement = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.breadcrumbParent;
                    fw.log.debug("_this.currentLeftMenuParent is : " + _this.currentLeftMenuParent);
                    if (_this.navigationTree[_this.navigationTree.length - 1].leftPanel.needToShowTopButton) {
                        fw.log.debug("Showing top menu element");
                        _this.tvoyCatModuleMenuList.showTopButton()
                    } else {
                        fw.log.debug("Hiding top menu element");
                        _this.tvoyCatModuleMenuList.hideTopButton()
                    }
                    _this.isTopButtonShown = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.needToShowTopButton;
                    _this.tvoyCatModuleMenuList.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].leftPanel.menu);
                    _this.tvoyCatModuleMenuList.setFocusOnElementByName("name",
                        _this.navigationTree[_this.navigationTree.length - 1].leftPanel.selectedItem.name);
                    _this.tvoyCatModuleMenuList.setItemSelected(true);
                    _this.tvoyCatModuleMenuList.focusOff();
                    _this.currentFocus = _this.FOCUS_RIGHT;
                    _this.currentMenuArray = _this.navigationTree[_this.navigationTree.length - 1].leftPanel.menu;
                    var string = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.listingHeaderString;
                    _this.updateListingHeaderString(string);
                    _this.tvoyCatBreadcrumb.clear();
                    _this.tvoyCatBreadcrumb.pushList(_this.navigationTree[_this.navigationTree.length -
                    1].currentBreadcrumb, true);
                    if (_this.navigationTree[_this.navigationTree.length - 1].rightPanel.tvoyIsGridShown) {
                        if (!_this.tvoyIsGridShown) {
                            _this.tvoyCatModuleList.hide();
                            _this.tvoyCatModuleEpisodesList.hide()
                        }
                        fw.log.debug("Setting elements to grid");
                        _this.tvoyCatGrid.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu);
                        _this.currentDataArray = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu;
                        if (!_this.tvoyIsGridShown)_this.tvoyCatGrid.show();
                        _this.currentFocusedElem =
                            _this.navigationTree[_this.navigationTree.length - 1].rightPanel.selectedItem;
                        _this.tvoyCatGrid.setFocusOnElementByName("name", _this.currentFocusedElem.name)
                    } else {
                        fw.log.debug("Setting elements to list");
                        if (_this.navigationTree[_this.navigationTree.length - 1].rightPanel.isShowingEpisodes) {
                            _this.tvoyCatModuleEpisodesList.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu);
                            _this.currentFocusedElem = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.selectedItem;
                            _this.tvoyCatModuleEpisodesList.setFocusOnElementByName("name", _this.currentFocusedElem.name);
                            _this.tvoyCatModuleEpisodesList.show()
                        } else {
                            _this.tvoyCatModuleEpisodesList.hide();
                            _this.tvoyCatModuleList.setMenuList(_this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu);
                            _this.currentFocusedElem = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.selectedItem;
                            _this.tvoyCatModuleList.setFocusOnElementByName("name", _this.currentFocusedElem.name);
                            _this.tvoyCatModuleList.show()
                        }
                        _this.currentDataArray =
                            _this.navigationTree[_this.navigationTree.length - 1].rightPanel.menu;
                        _this.isShowingEpisodes = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.isShowingEpisodes
                    }
                    _this.rightPanelElementsString = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.endLabelString;
                    _this.totalMovies = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.totalElements;
                    fw.log.debug("this.currentFocusedElem : ", _this.currentFocusedElem);
                    _this.tvoyCatModuleInfo.setInfoByMoviePG(_this.navigationTree[_this.navigationTree.length -
                    1].detailedInfos, true);
                    fw.bannerUiManager.hideBanner();
                    _this.tvoyCatModuleInfo.show();
                    _this.tvoyIsGridShown = _this.navigationTree[_this.navigationTree.length - 1].rightPanel.tvoyIsGridShown
                }
                _this.updateFooter();
                fw.log.debug("Removing last element from navigation stack");
                _this.navigationTree.pop()
            }, 0)
        } catch (ex) {
            ex.errMethod = "callbackChangedSkinBack";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, parseTVOYVodsFromCategoryForSmartTVCallBack: function (_prop, _obj, _totalMoviesCount) {
        fw.log.debug("parseTVOYVodsFromCategoryCallBack : ",
            _obj);
        this.lastShownCategoryIdElements = this.currentFocusedElem.categoryId;
        this.totalMovies = _totalMoviesCount;
        this.movies = _obj;
        if (this.totalMovies == 1)if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(this.showSmartView, this, this.conf.hasLiveVideo); else this.showSmartView("OK"); else if (this.totalMovies == 0); else if (this.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(this.movies[0].isPCSafe))fw.pcmanager.checkPCPin(this.showSmartView, this,
            this.conf.hasLiveVideo); else this.showSmartView("OK")
    }, showSmartView: function (_res) {
        try {
            this.unLockKeyBoard();
            if (_res === "OK") {
                if (this.totalMovies == 1) {
                    this.tvoyCatBreadcrumb.clear();
                    this.tvoyCatBreadcrumb.pushList(this.buildBreadcrumbPath(this.currentFocusedElem), true);
                    this.tvoyCatBreadcrumb.push(this.appObj.messages.programma_label, true)
                }
                this.appObj.PCCatChecked = "Y";
                this.appObj.selectedCategoryContent = this.movies[0];
                this.appObj.selectedCategoryContents = this.movies;
                this.movie = this.movies[0];
                var objParam =
                    new Object;
                objParam.contentId = this.movie.id != null && this.movie.id != undefined ? this.movie.id : this.movies[0].id;
                objParam.category = this.currentFocusedElem.categoryId;
                objParam.breadCrumbList = fw.util.cloneAllObjectType(this.tvoyCatBreadcrumb.getBreadCrumbList());
                objParam.isOttPresent = true;
                objParam.categoryPathSkin = this.currPath;
                objParam.movie = this.movie;
                objParam.openMeerTv = true;
                objParam.isMoviePg = true;
                var inputObj = new Array("Detail", objParam);
                this.appObj.init(inputObj)
            }
        } catch (ex) {
            ex.errMethod = "showSmartView";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, showInteractivePopup: function () {
        try {
            var objToPassToInteractivePopup = new Object;
            objToPassToInteractivePopup.title = this.messagesArrayForBookmarkInteractivePopup[0].contentTitle;
            objToPassToInteractivePopup.message = this.messagesArrayForBookmarkInteractivePopup[1].contentTitle;
            objToPassToInteractivePopup.buttonOKlabel = this.messagesArrayForBookmarkInteractivePopup[2].contentTitle;
            objToPassToInteractivePopup.buttonKOlabel = this.messagesArrayForBookmarkInteractivePopup[3].contentTitle;
            objToPassToInteractivePopup.buttonOKstatus = "Resume";
            objToPassToInteractivePopup.buttonKOstatus = "Restart";
            objToPassToInteractivePopup.focusKO = true;
            fw.popupManager.showPopup(fw.conf.popupInteractiveName, objToPassToInteractivePopup, this.closeInteractiveBookmarkPopup, this)
        } catch (ex) {
            ex.errMethod = "showInteractivePopup";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, closeInteractiveBookmarkPopup: function (_prop) {
        try {
            var type = "N";
            this.appObj.init(new Array("Play", this.appObj.selectedCategoryContent.id, type, _prop.toLowerCase()))
        } catch (ex) {
            ex.errMethod =
                "closeInteractiveBookmarkPopup";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getDefaultMenu: function () {
        try {
            var objToReturn = fw.util.cloneAllObjectType(this.conf.defaultitem);
            return objToReturn
        } catch (ex) {
            ex.errMethod = "#PG_DefaultSkin_Catalogue";
            ex.errClass = "ScenarioTVOY";
            return new Object;
            fw.err(ex)
        }
    }, updateListingHeaderString: function (_string) {
        try {
            this.tvoyListingHeaderText.setTxt(_string);
            this.currentListingHeaderString = _string
        } catch (ex) {
            ex.errMethod = "updateListingHeaderString";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, getListingHeaderString: function () {
        try {
            return this.currentListingHeaderString
        } catch (ex) {
            ex.errMethod = "getListingHeaderString";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, createMessagesArrayForBookmarkInteractivePopup: function () {
        try {
            var arrayToParse = fw.util.returnAppMessageArray(this.appObj.messages, this.conf.popupInteractiveMessageBookMarkArray);
            return arrayToParse
        } catch (ex) {
            ex.errMethod = "createZapbannerMessagesArrayForBookmarkInteractivePopup";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, cleanScenario: function () {
        try {
        } catch (ex) {
            ex.errMethod =
                "cleanScenario";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }, buildBreadcrumbPath: function (_obj) {
        try {
            var arrayToRet = fw.util.cloneAllObjectType(this.startingBreadcrumbStringArray);
            var currObj = fw.util.cloneAllObjectType(_obj);
            fw.log.debug("checking Path for Breadcrumb : ", currObj);
            if (currObj.path != null && _obj.path != undefined) {
                fw.log.debug("checking Path for Breadcrumb : " + currObj.path);
                if (currObj.path.indexOf("/TVoY_UTC/TVoY_SENDER_NMC_DYN/") != -1) {
                    currObj.path = currObj.path.replace("/TVoY_UTC/TVoY_SENDER_NMC_DYN/",
                        "");
                    currObjSplittedPath = new Array;
                    currObjSplittedPath = currObj.path.split("/");
                    if (currObjSplittedPath.length > 1) {
                        if (this.navigationTree.length > 0)arrayToRet.push(this.navigationTree[0].leftPanel.selectedItem.name);
                        arrayToRet.push(currObjSplittedPath[0])
                    }
                } else if (currObj.path.indexOf("/TVoY_UTC/TVoY_SENDER_NMC_RULE/") != -1) {
                    currObj.path = currObj.path.replace("/TVoY_UTC/TVoY_SENDER_NMC_RULE/", "");
                    fw.log.debug("building breadcrumb  : currObj.path --\x3e ", currObj.path);
                    currObjSplittedPath = new Array;
                    currObjSplittedPath =
                        currObj.path.split("/");
                    fw.log.debug("building breadcrumb  : currObjSplittedPath _ ", currObjSplittedPath);
                    if (currObjSplittedPath.length > 1) {
                        if (this.navigationTree.length > 0)arrayToRet.push(this.navigationTree[0].leftPanel.selectedItem.name);
                        arrayToRet.push(currObjSplittedPath[0])
                    } else fw.log.debug("building breadcrumb  : currObjSplittedPath.length ==0 ");
                    if (currObj.action != null && currObj.action != undefined)if (currObj.isDay != null && currObj.isDay != undefined) {
                        arrayToRet.push(this.appObj.messages.AllDays);
                        arrayToRet.push(currObj.name)
                    }
                } else if (currObj.path.indexOf("/TVoY_UTC/TVoY_NMC_RULE/") != -1) {
                    currObj.path = currObj.path.replace("/TVoY_UTC/TVoY_NMC_RULE/", "");
                    currObjSplittedPath = new Array;
                    currObjSplittedPath = currObj.path.split("/");
                    if (currObj.action != null && currObj.action != undefined) {
                        if (currObj.isDay != null && currObj.isDay != undefined)arrayToRet.push(this.appObj.messages.AllDays);
                        arrayToRet.push(currObj.name)
                    }
                } else if (currObj.path.indexOf("/TVoY_UTC/TVoY_BROADCASTER_NMC_RULE/") != -1) {
                    currObj.path = currObj.path.replace("/TVoY_UTC/TVoY_BROADCASTER_NMC_RULE/",
                        "");
                    currObjSplittedPath = new Array;
                    currObjSplittedPath = currObj.path.split("/");
                    if (currObjSplittedPath.length > 1) {
                        if (this.navigationTree.length > 0)arrayToRet.push(this.navigationTree[0].leftPanel.selectedItem.name);
                        arrayToRet.push(currObjSplittedPath[0])
                    } else fw.log.debug("building breadcrumb  : currObjSplittedPath.length ==0 ");
                    if (currObj.action != null && currObj.action != undefined)if (currObj.isDay != null && currObj.isDay != undefined) {
                        arrayToRet.push(this.appObj.messages.AllDays);
                        arrayToRet.push(currObj.name)
                    }
                } else if (currObj.path.indexOf("/TVoY_UTC/TVoY_BROADCASTER_NMC_DYN/") != -1) {
                    currObj.path = currObj.path.replace("/TVoY_UTC/TVoY_BROADCASTER_NMC_DYN/", "");
                    currObjSplittedPath = new Array;
                    currObjSplittedPath = currObj.path.split("/");
                    if (currObjSplittedPath.length > 1) {
                        if (this.navigationTree.length > 0)arrayToRet.push(this.navigationTree[0].leftPanel.selectedItem.name);
                        arrayToRet.push(currObjSplittedPath[0])
                    } else fw.log.debug("building breadcrumb  : currObjSplittedPath.length ==0 ");
                    if (currObj.action != null && currObj.action != undefined)if (currObj.isDay != null && currObj.isDay != undefined) {
                        arrayToRet.push(this.appObj.messages.AllDays);
                        arrayToRet.push(currObj.name)
                    }
                } else if (currObj.path.indexOf("/TVoY_UTC/TVoY_BROADCASTER_NMC_DYN") != -1)arrayToRet.push(currObj.name); else if (currObj.path.indexOf("/TVoY_UTC/TVoY_SENDER_NMC_DYN") != -1)arrayToRet.push(currObj.name); else if (currObj.path.indexOf("/TVoY_UTC/TVoY_NMC_DYN/") != -1)arrayToRet.push(currObj.displayName)
            } else fw.log.debug("buildBreadcrumbPath : .path field is null or undefined - returning default breadcrumb string");
            fw.log.debug("returning breadcrumb array : ", arrayToRet);
            return arrayToRet
        } catch (ex) {
            ex.errMethod =
                "buildBreadcrumbPath";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    }
});
var ItemLeftMenuTvoy = Class.create({
    initialize: function (title) {
        this.contentTitle = title
    }
});
Date.prototype.getDayNameForTM = function (_val) {
    try {
        var d = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        return d[parseInt(this.getDay() + _val) < 0 ? parseInt(7 + this.getDay() + _val) : parseInt(this.getDay() + _val)]
    } catch (ex) {
        ex.errMethod = "Date.prototype.getDayNameForTM";
        ex.errClass = "ScenarioTVOY";
        fw.err(ex)
    }
};
