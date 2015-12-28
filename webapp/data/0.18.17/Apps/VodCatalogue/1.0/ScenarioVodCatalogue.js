var ScenarioVodCatalogue = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        $super(_prop);
        try {
            this.id = _prop.id;
            this.conf = _conf;
            this.appObj = _parentObj;
            this.FOCUS_LEFT = 0;
            this.FOCUS_RIGHT = 1;
            this.currentFocus = this.FOCUS_LEFT;
            this.appObj.actualSkin = "";
            this.appObj.actualBkg = "";
            this.isMyRented = false;
            this.resetContent = false;
            this.inputObj = null;
            this.subCategory = null;
            this.isNetflixOpened = false;
            this.categoryBackId = null;
            this.parentCategoryPath = null;
            this.historyCategory = new Array;
            this.Mijn_gehuurde_videos =
                this.conf.specialCat.Mijn_gehuurde_videos;
            this.category = "";
            this.categoryCheck = "";
            if (fw.userPreferenceStorage.isGridMode() == null)fw.userPreferenceStorage.setGridMode("false");
            this.vodCatBreadcrumb = cssUtil.addElementToDom(Breadcrumb, "VodCatBreadcrumb", this.conf.vodCatBreadcrumb, this.getScenObj());
            this.vodCatHourTxt = cssUtil.addElementToDom(Text, "VodCatHourTxt", this.conf.vodCatHourTxt, this.getScenObj());
            this.vodCatDataTxt = cssUtil.addElementToDom(Text, "VodCatDataTxt", this.conf.vodCatDataTxt, this.getScenObj());
            this.vodCatLogoImg = cssUtil.addElementToDom(Image, "VodCatLogoImg", this.conf.vodCatLogoImg, this.getScenObj());
            this.vodCatLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo());
            this.vodCatBannerImg = cssUtil.addElementToDom(Image, "VodCatBannerImg", this.conf.vodCatBannerImg, this.getScenObj());
            this.vodCatChanNumTxt = cssUtil.addElementToDom(ChanNumTxt, "VodCatChanNumTxt", this.conf.vodCatChanNumTxt, this.getScenObj());
            this.vodCatChanNumTxt.setCallBack(this, this.vodCatChanNumTxtCallBack);
            this.vodCatModuleMenuList =
                new ModuleMenuList(this, this.conf.vodCatModuleMenuList, this.conf.vodCatModuleMenuListConf, Button, null, this, this.moduleMenuListCallBack, false);
            this.vodCatOptionMenuConfAZList = null;
            this.vodCatOptionMenuConfAZGrid = null;
            this.vodCatOptionMenuConfDateList = null;
            this.vodCatOptionMenuConfDateGrid = null;
            this.vodCatOptionMenuLeftPanelConfAZList = null;
            this.vodCatOptionMenuLeftPanelConfAZGrid = null;
            this.vodCatOptionMenuLeftPanelConfDateList = null;
            this.vodCatOptionMenuLeftPanelConfDateGrid = null;
            this.vcCreateOptionMenuObjects();
            this.timerStart = null;
            this.updateContent = false;
            this.isAanbiendersMode = false;
            this.isOttActive = fw.subscriberDataManager.userEnabledOTT();
            this.isAanbiendersActive = this.conf.Aanbienders.enable;
            this.openDetailInMeer = false;
            this.vodCatModuleInfo = new ModuleItemInfo(this, this.conf.vodCatModuleInfo, this.conf.vodCatModuleInfoConf);
            this.vodCatModuleInfo.hide();
            this.vodCatModuleList = new ModuleCatalogList(this, this.conf.vodCatModuleCatalogList, this.conf.vodCatModuleCatalogListConf, null, this, this.vodCatModuleListCallBack);
            this.vodCatGrid = new ModuleCatalogGrid(this, this.conf.vodCatModuleCatalogGrid, this.conf.vodCatModuleCatalogGridConf, null);
            this.isRightMenuReady = false;
            this.banner = null;
            this.drawFooter()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getCurrentInputObj: function () {
        try {
            var obj = new Object;
            obj.action = "backHistory";
            obj.categoryHistory = fw.util.cloneAllObjectType(this.historyCategory);
            obj.isNetflixOpened = this.isNetflixOpened;
            return new Array("Catalogue", obj, fw.util.cloneAllObjectType(this.category))
        } catch (ex) {
            ex.errMethod =
                "getCurrentInputObj";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, init: function (_inputObj) {
        try {
            this.isNetflixOpened = false;
            this.vodCatLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo());
            this.inputObj = _inputObj;
            fw.util.setHourDataTimer(this.vodCatHourTxt, this.vodCatDataTxt);
            var orderType = fw.userPreferenceStorage.getMovieOrderType();
            if (orderType != null && this.conf.setLastChosenContentOrder)this.orderInList = orderType; else this.orderInList = this.conf.defaultContentOrder;
            if (_inputObj[1] != undefined &&
                (_inputObj[1].origin == undefined || (_inputObj[1].origin == null || _inputObj[1].origin != "fromBanner")))switch (_inputObj[0].toLowerCase()) {
                case "catalogue":
                    if (_inputObj[1].action == "backHistory") {
                        if (_inputObj[1].isNetflixOpened != undefined && _inputObj[1].isNetflixOpened) {
                            this.currentFocus = this.FOCUS_LEFT;
                            fw.mediaManager.tuneLastDTVChannel()
                        }
                        if (_inputObj[1].categoryHistory != undefined)this.historyCategory = _inputObj[1].categoryHistory;
                        if (this.currentFocus == this.FOCUS_LEFT && (!this.isGridMode() && (_inputObj[2] !=
                            null && _inputObj[2] != undefined)))fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null, this.checkChangeBanner(_inputObj[2].path));
                        if (_inputObj[2] != undefined && this.category.categoryId != _inputObj[2].categoryId)this.defaultStart(_inputObj[2].categoryId); else if (_inputObj[3] != undefined && (_inputObj[3] != null && (_inputObj[4] != undefined && _inputObj[4] != null))) {
                            var item = _inputObj[3];
                            this.updateContent = _inputObj[4] || this.appObj.forceUpdateParentalControl;
                            if (this.movie != undefined && item != undefined) {
                                var conditionToUpdate =
                                    this.movie.id != undefined && this.movie.id != item.id;
                                if (conditionToUpdate || this.updateContent) {
                                    fw.log.debug("UPDATE-GRID");
                                    if (this.isGridMode())this.vodCatGrid.setFocusOnElementByName("id", item.id, this.currentFocus == this.FOCUS_RIGHT); else this.vodCatModuleList.setFocusOnElementByName("id", item.id, this.currentFocus == this.FOCUS_RIGHT, true)
                                } else if (this.currentFocus == this.FOCUS_RIGHT)this.rightFocusOn()
                            }
                        } else if (this.appObj.forceUpdateParentalControl) {
                            fw.log.debug("UPDATE-GRID2+" + fw.userPreferenceStorage.isGridMode());
                            this.updateContent = true;
                            if (fw.userPreferenceStorage.isGridMode() == "true" && !this.isAanbiendersMode)this.showContentGrid(this); else this.showContentList(this)
                        }
                    } else if (_inputObj[1].action == "banner") {
                        this.startClear();
                        this.isRightMenuReady = false;
                        if (_inputObj[1].externalId != undefined && _inputObj[1].externalId != null)fw.mwManager.getCategoryFromCategoryExternalId(_inputObj[1].externalId, this.callBackGetCategory, this, null); else {
                            this.historyCategory = new Array;
                            this.doRootCategory()
                        }
                    } else this.defaultStart(_inputObj[1]);
                    break;
                case "vodcategory":
                    this.defaultStart(_inputObj[1].categoryId);
                    break
            } else {
                this.defaultStart(this.category.categoryId);
                if (this.currentFocus == this.FOCUS_LEFT && (!this.isGridMode() && (this.checkChangeBanner != null && this.checkChangeBanner != undefined)))fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null, this.checkChangeBanner(this.categoryCheck.path))
            }
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, defaultStart: function (_categoryId, _breadCrumbList) {
        try {
            this.appObj.PCCatChecked =
                "N";
            this.startClear();
            this.vodCatModuleInfo.hide();
            this.vodCatModuleMenuList.clean();
            this.vodCatModuleList.clean();
            this.vodCatGrid.clean();
            this.isRightMenuReady = false;
            var categoryId = _categoryId;
            if (_breadCrumbList != undefined)this.vodCatBreadcrumb.clear();
            if (categoryId != undefined && categoryId == this.conf.specialCat.Mijn_gehuurde_videos.categoryId) {
                this.vodCatModuleInfo.hide(true);
                this.setFocusLeft();
                this.showMijnGehuurdeVideos()
            } else if (categoryId != undefined || categoryId != null) {
                this.footerElementYellow.show();
                this.footerElementOKLeft.setDefaultTxtStyle();
                fw.mwManager.getCategoryFromCategoryId(categoryId, this.callBackGetCategory, this, _breadCrumbList)
            }
        } catch (ex) {
            ex.errMethod = "defaultStart";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, setFocusLeft: function () {
        try {
            if (this.categoryCheck.categoryId != this.conf.specialCat.Mijn_gehuurde_videos.categoryId) {
                this.footerElementYellow.show();
                this.footerElementOKLeft.setDefaultTxtStyle()
            }
            this.currentFocus = this.FOCUS_LEFT;
            this.appObj.isFocusOnLeftMenu = true;
            this.vodCatModuleInfo.hide(true);
            this.leftFocusOn();
            this.footerElementOKLeft.show();
            this.footerElementOKRight.hide();
            this.footerElementNav.hide()
        } catch (ex) {
            ex.errMethod = "setFocusLeft";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, setFocusRight: function () {
        try {
            this.currentFocus = this.FOCUS_RIGHT;
            this.appObj.isFocusOnLeftMenu = false;
            this.rightFocusOn();
            if (!fw.userPreferenceStorage.isGridMode() == "true")this.vodCatModuleInfo.show();
            if (!this.isAanbiendersMode && this.categoryCheck.categoryId != this.conf.specialCat.Mijn_gehuurde_videos.categoryId) {
                this.footerElementYellow.show();
                this.footerElementOKLeft.setDefaultTxtStyle()
            }
            this.footerElementOKLeft.hide();
            this.footerElementOKRight.show();
            this.footerElementNav.show()
        } catch (ex) {
            ex.errMethod = "setFocusRight";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, callBackShowBanner: function (_callerCallbackParams, _banner) {
        try {
            this.banner = _banner
        } catch (ex) {
            ex.errMethod = "callBackShowBanner";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, checkChangeBanner: function (_categoryPath) {
        try {
            if (_categoryPath != null) {
                var sString = _categoryPath;
                var functionCall =
                    "";
                while (sString.length > 0) {
                    if (this.conf.bannerConf != undefined && this.conf.bannerConf[sString] != undefined) {
                        functionCall = this.conf.bannerConf[sString].bannerToRetrieve;
                        break
                    }
                    sString = sString.substring(0, sString.lastIndexOf("/"))
                }
                return functionCall
            }
        } catch (ex) {
            ex.errMethod = "checkChangeBanner";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, addToHistoryCategory: function (_category) {
        try {
            var obj = new Object;
            obj.categoryId = _category.parentId;
            obj.selectId = _category.categoryId;
            this.historyCategory.push(obj)
        } catch (ex) {
            ex.errMethod =
                "addToHistoryCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getFromHistoryCategory: function () {
        try {
            if (this.historyCategory.length > 0)return this.historyCategory.pop(); else if (this.inputObj.fromNative != null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true)) {
                fw.log.debug("getFromHistoryCategory - back to NATIVE App");
                fw.mwManager.goBackInHistory()
            } else {
                fw.log.debug("getFromHistoryCategory - back to HTML App");
                fw.navigationHistory.back()
            }
        } catch (ex) {
            ex.errMethod = "getFromHistoryCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, vodCatModuleListCallBack: function (_domElement, _dataElement) {
        try {
            fw.bannerUiManager.hideBanner();
            if (_dataElement.isOttContent) {
                if (_dataElement.title == undefined)_dataElement.title = _dataElement.displayName;
                if (_dataElement.description == undefined) {
                    eval("var desc = this.appObj.messages." + this.conf.Aanbienders.vodCatDescrOtt_label);
                    _dataElement.description = desc + " " + _dataElement.displayName
                }
                this.vodCatModuleInfo.setInfoSmartview(_dataElement)
            } else this.vodCatModuleInfo.setInfoByMovie(_dataElement,
                false, this.updateContent);
            this.updateContent = false
        } catch (ex) {
            ex.errMethod = "vodCatModuleListCallBack";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, moduleMenuListCallBack: function (_LeftMenuTotalPosition, _LeftMenuDomElement, _LeftMenuDataElement) {
        try {
            this.footerElementOKLeft.setText(" : " + _LeftMenuDataElement.displayName)
        } catch (ex) {
            ex.errMethod = "moduleMenuListCallBack";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    }, startClear: function () {
        try {
            this.historyCategory = new Array;
            this.footerElementOKLeft.hide();
            this.footerElementOKRight.hide();
            this.footerElementNav.hide();
            this.footerElementYellow.hide();
            this.vodCatBreadcrumb.clear();
            this.vodCatModuleInfo.clearAll();
            this.currentFocus = this.FOCUS_LEFT
        } catch (ex) {
            ex.errMethod = "startClear";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, setBreadcrumb: function (_list) {
        try {
            for (var i = 0; i < _list.length; i++)this.vodCatBreadcrumb.push(eval("this.appObj.messages." + _list[i]))
        } catch (ex) {
            ex.errMethod = "setBreadcrumb";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    }, showMijnGehuurdeVideos: function () {
        try {
            this.footerElementOKLeft.setExstenTxtStyle();
            this.footerElementYellow.hide();
            this.currentFocus = this.FOCUS_LEFT;
            this.isMyRented = true;
            this.doRootCategory()
        } catch (ex) {
            ex.errMethod = "showMijnGehuurdeVideos";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, doRootCategory: function () {
        try {
            this.appObj.actualSkin = "";
            this.appObj.actualBkg = "";
            this.appObj.PCCatChecked = "N";
            this.vodCatModuleMenuList.focusOff();
            fw.mwManager.getCategoryFromCategoryPath(this.conf.rootCategory, this.callBackGetCategory, this, null)
        } catch (ex) {
            ex.errMethod = "doRootCategory";
            ex.errClass =
                "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, callBackGetCategory: function (_callerCallbackParams, _category) {
        try {
            if (_category != undefined && _category != null)if (_category.path.indexOf("TVoY") != -1)fw.appManager.goToHtmlApp("PG", "DefaultSkin", ["Catalogue"], false, false); else {
                if (_callerCallbackParams != undefined) {
                    this.vodCatBreadcrumb.clear();
                    this.vodCatBreadcrumb.pushList(_callerCallbackParams, true)
                } else this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault);
                this.category = _category;
                this.PcCheckOnCategory();
                fw.mwManager.sendVodGuideMessage(_category.name)
            }
        } catch (ex) {
            ex.errMethod =
                "callBackGetCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, PcCheckOnCategory: function () {
        try {
            this.appObj.allLocked = false;
            if (this.category.isPCSafe != undefined)if (fw.pcmanager.checkPCLevel(this.category.isPCSafe))fw.pcmanager.checkPCPin(this.callBackCheckPCLevel, this, this.conf.hasLiveVideo); else this.showCategoryInApp()
        } catch (ex) {
            ex.errMethod = "PcCheckOnCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, callBackCheckPCLevel: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked =
                    "Y";
                this.appObj.allLocked = false;
                this.showCategoryInApp()
            } else {
                this.appObj.PCCatChecked = "N";
                this.appObj.allLocked = true;
                this.showCategoryInApp()
            }
        } catch (ex) {
            ex.errMethod = "callBackCheckPCLevel";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, isCategoryInSubCategories: function (_category) {
        try {
            if (this.subCategory != null) {
                for (var i = 0; i < this.subCategory.length; i++)if (this.subCategory[i].categoryId == _category.categoryId)return true;
                return false
            } else return false
        } catch (ex) {
            ex.errMethod = "isCategoryInSubCategories";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, showCategoryInApp: function () {
        try {
            this.vodCatModuleMenuList.setTopButton(this.conf.menuListTopElement);
            if (!this.category.isLeaf)this.addToHistoryCategory(this.category);
            if (this.isAanbiendersMode) {
                this.vodCatModuleInfo.hide(true);
                this.vodCatModuleList.clean()
            } else if (this.isGridMode()) {
                this.vodCatGrid.clean(true);
                this.vodCatGrid.setLoadingMessage()
            } else {
                this.vodCatModuleInfo.hide(true);
                this.vodCatModuleList.clean();
                this.vodCatModuleList.setLoadingMessage()
            }
            if (this.category.path ==
                this.conf.Aanbienders.categoryPath && this.isAanbiendersActive)if (this.isCategoryInSubCategories(this.category))this.getSubCategoriesFromCategoryIdCallBack("OTT", this.subCategory); else fw.mwManager.getSubCategoriesFromCategoryId(this.category.parentId, this.getSubCategoriesFromCategoryIdCallBack, this, "OTT"); else fw.mwManager.getSubCategoriesFromCategoryId(this.category.categoryId, this.getSubCategoriesFromCategoryIdCallBack, this, "")
        } catch (ex) {
            ex.errMethod = "showCategoryInApp";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getSubCategoriesFromCategoryIdCallBack: function (_callerCallbackParams, _categories) {
        try {
            if (_categories != null && _categories.length > 0) {
                this.isAanbiendersMode = false;
                if (_callerCallbackParams == "OTT") {
                    this.vodCatModuleMenuList.setMenuList(_categories);
                    this.vodCatModuleMenuList.setFocusOnElementByName("categoryId", this.category.categoryId, this.currentFocus == this.FOCUS_LEFT);
                    this.vodCatModuleMenuList.setItemSelected(this.currentFocus == this.FOCUS_LEFT);
                    this.categoryCheck = this.category;
                    fw.mwManager.getSubCategoriesFromCategoryId(this.category.categoryId,
                        this.drawOttCategory, this, "")
                } else {
                    if (this.category.path == this.conf.rootCategory || this.category.isLeaf && this.category.path.split("/").length == 3) {
                        var appArr = new Array;
                        appArr.push(this.conf.specialCat.Mijn_gehuurde_videos);
                        if (fw.mwManager.isNetFlixAvailable())if (this.conf.specialCat.Netflix.positionInMenu == -1)appArr.push(this.conf.specialCat.Netflix); else _categories.splice(this.conf.specialCat.Netflix.positionInMenu, 0, this.conf.specialCat.Netflix);
                        _categories = _categories.concat(appArr)
                    }
                    this.subCategory =
                        _categories;
                    if (this.isMyRented) {
                        this.category = this.conf.specialCat.Mijn_gehuurde_videos;
                        this.isMyRented = false;
                        this.categoryCheck = this.conf.specialCat.Mijn_gehuurde_videos;
                        this.drawMyRented()
                    } else {
                        this.categoryCheck = this.category;
                        if (!this.category.isLeaf)this.categoryCheck = this.subCategory[0];
                        if (!this.category.isLeaf && this.subCategory[0].isLeaf) {
                            this.category = this.subCategory[0];
                            fw.mwManager.sendVodGuideMessage(this.category.name)
                        }
                        this.drawCategory()
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "getSubCategoriesFromCategoryIdCallBack";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getCategoryFromSubCategoryList: function (_categories, categoryId) {
        try {
            for (var i = 0; i < _categories.length; i++)if (_categories[i].categoryId == categoryId)return _categories[i];
            return this.category
        } catch (ex) {
            ex.errMethod = "getCategoryFromSubCategoryList";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, drawCategory: function () {
        try {
            this.isAanbiendersMode = false;
            if (this.currentFocus == this.FOCUS_RIGHT) {
                this.footerElementYellow.show();
                this.footerElementOKLeft.setDefaultTxtStyle()
            }
            this.vodCatModuleMenuList.setMenuList(this.subCategory);
            if (this.categoryBackId != null) {
                this.vodCatModuleMenuList.setFocusOnElementByName("categoryId", this.categoryBackId.selectId, false);
                this.vodCatModuleMenuList.setItemSelected(this.currentFocus == this.FOCUS_LEFT);
                fw.mwManager.getVodFromCategoryId(this.categoryBackId.selectId, 0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null);
                this.categoryCheck = this.getCategoryFromSubCategoryList(this.subCategory, this.categoryBackId.selectId);
                this.category = this.categoryCheck;
                this.categoryBackId = null
            } else {
                if (this.appObj !=
                    undefined && (this.appObj.isFocusOnLeftMenu != undefined && this.appObj.isFocusOnLeftMenu))this.setFocusLeft(); else if (this.appObj != undefined && (this.appObj.isFocusOnLeftMenu != undefined && !this.appObj.isFocusOnLeftMenu))this.setFocusRight();
                if (!this.category.isLeaf)this.vodCatModuleMenuList.setFocusOnFirstElement(this.currentFocus == this.FOCUS_LEFT); else this.vodCatModuleMenuList.setFocusOnElementByName("categoryId", this.category.categoryId, this.currentFocus == this.FOCUS_LEFT);
                this.vodCatModuleMenuList.setItemSelected(this.currentFocus ==
                    this.FOCUS_LEFT);
                this.loadContentsByCategory(this.category, 0, this, this.getVodFromCategoryIdCallBack, null)
            }
            this.setBreadCrumbFromCategoryPath(this.categoryCheck.displayPath, this.categoryCheck.displayName);
            if (this.appObj.checkSubSkinChange(this.categoryCheck.path)) {
                if (this.appObj.checkChangeSkinCategory(this.categoryCheck.path)[0])this.vodCatModuleMenuList.getModObj().hide();
                var _this = this;
                setTimeout(function () {
                    _this.appObj.setSubSkin(_this.categoryCheck.path, _this, _this.subSkinChanged)
                }, 0)
            }
        } catch (ex) {
            ex.errMethod =
                "drawCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, loadContentsByCategory: function (_category, _index, _callBackObj, _callBackObjFunction, _callBackParams) {
        try {
            this.checkCategorySortingConf(_category);
            fw.mwManager.getVodFromCategoryId(_category.categoryId, _index, this.orderInList, _callBackObjFunction, _callBackObj, _callBackParams)
        } catch (ex) {
            ex.errMethod = "loadContentsByCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, checkCategorySortingConf: function (_category) {
        try {
            var path = _category.displayPath;
            if (path.toLowerCase().search("serie") != -1)this.orderInList = fw.conf.getMovieFilterByName; else {
                var orderType = fw.userPreferenceStorage.getMovieOrderType();
                if (orderType != null)this.orderInList = orderType; else this.orderInList = this.conf.defaultContentOrder
            }
        } catch (ex) {
            ex.errMethod = "checkCategorySortingConf";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, drawOttCategory: function (_callerCallbackParams, _categories) {
        try {
            if (_categories != null && _categories.length > 0) {
                if (this.isOttActive) {
                    this.footerElementOKLeft.setExstenTxtStyle();
                    this.footerElementYellow.hide()
                }
                this.setBreadCrumbFromCategoryPath(this.category.displayPath, this.category.displayName);
                if (fw.userPreferenceStorage.isGridMode() == "true") {
                    this.vodCatGrid.clean();
                    this.vodCatGrid.hide()
                }
                this.isRightMenuReady = true;
                this.isAanbiendersMode = true;
                if (this.isOttActive)fw.mwManager.getContextApplicationsForVodProviders(this.getContextApplicationsForVodProvidersCallback, this, _categories); else {
                    this.vodCatModuleList.setMenuList(_categories, false, true);
                    this.vodCatModuleList.show();
                    if (this.currentFocus == this.FOCUS_RIGHT) {
                        this.rightFocusOn();
                        this.vodCatModuleInfo.show()
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "drawOttCategory";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getContextApplicationsForVodProvidersCallback: function (_callerCallbackParams, _res) {
        try {
            if (_res != null && _res != undefined) {
                var cantents = _callerCallbackParams.concat(_res);
                this.vodCatModuleList.setMenuList(cantents, false, true);
                this.vodCatModuleList.show();
                if (this.currentFocus == this.FOCUS_RIGHT) {
                    this.rightFocusOn();
                    this.vodCatModuleInfo.show()
                }
            }
        } catch (ex) {
            ex.errMethod =
                "getContextApplicationsForVodProvidersCallback";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, drawMyRented: function () {
        try {
            this.setBreadCrumbFromCategoryPath(this.categoryCheck.displayPath, this.categoryCheck.displayName);
            this.vodCatModuleMenuList.setMenuList(this.subCategory);
            this.vodCatModuleMenuList.setFocusOnElementByName("categoryId", this.conf.specialCat.Mijn_gehuurde_videos.categoryId, this.currentFocus == this.FOCUS_LEFT);
            this.vodCatModuleMenuList.setItemSelected(this.currentFocus == this.FOCUS_LEFT);
            if (this.appObj.checkSubSkinChange(this.categoryCheck.path)) {
                if (this.appObj.checkChangeSkinCategory(this.categoryCheck.path))this.vodCatModuleMenuList.getModObj().hide();
                var _this = this;
                setTimeout(function () {
                    _this.appObj.setSubSkin(_this.categoryCheck.path, _this, _this.subSkinChanged)
                }, 1)
            }
            fw.mwManager.getVodFromRentedItems(0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null)
        } catch (ex) {
            ex.errMethod = "drawMyRented";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, subSkinChanged: function () {
        try {
            this.vodCatModuleMenuList.getModObj().show()
        } catch (ex) {
            ex.errMethod =
                "subSkinChanged";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getVodFromCategoryIdCallBack: function (_callerCallbackParams, _movies, _totalMoviesCount, _parentCategory) {
        try {
            if (_movies != null) {
                this.appObj.selectedCategoryContents = _movies;
                this.totalMovies = _totalMoviesCount;
                var _this = this;
                setTimeout(function () {
                    if (fw.userPreferenceStorage.isGridMode() == "true")_this.showContentGrid(_this); else _this.showContentList(_this)
                }, 0);
                this.isRightMenuReady = true
            }
        } catch (ex) {
            ex.errMethod = "getVodFromCategoryIdCallBack";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, showContentGrid: function (_this) {
        try {
            fw.bannerUiManager.hideBanner();
            _this.vodCatModuleList.clean();
            _this.vodCatModuleInfo.hide();
            _this.vodCatModuleList.hide();
            setTimeout(function () {
                _this.vodCatGrid.setMenuList(_this.appObj.selectedCategoryContents, _this.appObj.allLocked);
                _this.vodCatGrid.show();
                if (_this.currentFocus == _this.FOCUS_RIGHT)_this.rightFocusOn();
                if (_this.appObj.selectedCategoryContents.length > 0 && _this.currentFocus == _this.FOCUS_RIGHT)if (!_this.resetContent)if (_this.appObj.positionInCategory !=
                    null && !this.isAanbiendersMode)_this.vodCatGrid.setElementByPosition(_this.appObj.positionInCategory); else _this.rightFocusOn(); else {
                    _this.resetContent = false;
                    _this.rightFocusOn()
                } else _this.currentFocus = _this.FOCUS_LEFT
            }, 0)
        } catch (ex) {
            ex.errMethod = "showContentGrid";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, isGridMode: function () {
        return fw.userPreferenceStorage.isGridMode() == "true"
    }, showContentList: function (_this) {
        try {
            _this.vodCatGrid.clean();
            _this.vodCatGrid.hide();
            setTimeout(function () {
                if (_this.currentFocus ==
                    _this.FOCUS_LEFT)fw.bannerUiManager.showBanner(_this.callBackShowBanner, _this, null, _this.checkChangeBanner(_this.categoryCheck.path));
                _this.vodCatModuleList.setMenuList(_this.appObj.selectedCategoryContents, _this.appObj.allLocked);
                _this.vodCatModuleList.show();
                if (_this.currentFocus == _this.FOCUS_RIGHT)_this.rightFocusOn(); else _this.leftFocusOn();
                if (_this.appObj.selectedCategoryContents.length > 0 && _this.currentFocus == _this.FOCUS_RIGHT)if (!_this.resetContent) {
                    if (_this.appObj.positionInCategory != null && !this.isAanbiendersMode)_this.vodCatModuleList.setElementByPosition(_this.appObj.positionInCategory, _this.currentFocus == _this.FOCUS_RIGHT); else _this.rightFocusOn();
                    _this.vodCatModuleInfo.show()
                } else {
                    _this.resetContent = false;
                    _this.rightFocusOn()
                } else _this.currentFocus = _this.FOCUS_LEFT
            }, 0)
        } catch (ex) {
            ex.errMethod = "showContentList";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, getBreadCrumbEnd: function (_list, _pos) {
        try {
            var returnName = "";
            for (var i = _pos; i < _list.length; i++) {
                returnName = returnName + _list[i];
                if (i < _list.length - 1)returnName = returnName + "/"
            }
            return returnName
        } catch (ex) {
            ex.errMethod = "getBreadCrumbEnd";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, setBreadCrumbFromCategoryPath: function (_categoryPath, _displayName) {
        try {
            var _this = this;
            setTimeout(function () {
                if (_categoryPath != null && (_categoryPath != undefined && _categoryPath != "")) {
                    var listPath = _categoryPath.split("/");
                    _this.vodCatBreadcrumb.clear();
                    var listBreadCrumb = new Array;
                    for (var i = 0; i < _this.conf.breadcrumbCatalogueDefault.length; i++)listBreadCrumb.push(eval("_this.appObj.messages." +
                        _this.conf.breadcrumbCatalogueDefault[i]));
                    for (var j = 2; j < listPath.length; j++) {
                        var pathDisplay = _this.getBreadCrumbEnd(listPath, j);
                        if (pathDisplay == _displayName) {
                            listBreadCrumb.push(pathDisplay);
                            break
                        } else listBreadCrumb.push(listPath[j])
                    }
                    _this.vodCatBreadcrumb.pushList(listBreadCrumb, true)
                }
            }, 0)
        } catch (ex) {
            ex.errMethod = "setBreadCrumbFromCategoryPath";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, vodCatChanNumTxtCallBack: function (_res) {
        try {
            fw.mediaManager.tuneToChannel(_res)
        } catch (ex) {
            ex.errMethod = "vodCatChanNumTxtCallBack";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, popUpNetflixCallback: function (_status) {
        try {
            switch (_status) {
                case "OK":
                    fw.mwManager.setNetFlixAccepted();
                    this.isNetflixOpened = true;
                    this.isRightMenuReady = true;
                    fw.mwManager.openNetFlix();
                    break;
                case "MENU":
                    fw.mwManager.openMenu();
                    break;
                case "EPG":
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case "RADIO":
                    fw.mwManager.listenToRadio();
                    break;
                case "TV":
                    fw.mwManager.watchDTV();
                    break
            }
        } catch (ex) {
            ex.errMethod = "popUpNetflixCallback";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, keyHandler: function (_evt) {
        try {
            var _this = this;
            switch (_evt.keyCode) {
                case fw.keys.code.DOWN:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.vodCatModuleMenuList.moveFocusToDown();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isAanbiendersMode)this.vodCatModuleList.moveFocusToDown(); else if (this.isGridMode())this.vodCatGrid.moveFocusToDown(); else this.vodCatModuleList.moveFocusToDown();
                            break
                    }
                    break;
                case fw.keys.code.UP:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.vodCatModuleMenuList.moveFocusToUp();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isAanbiendersMode)this.vodCatModuleList.moveFocusToUp(); else if (this.isGridMode())this.vodCatGrid.moveFocusToUp(); else this.vodCatModuleList.moveFocusToUp();
                            break
                    }
                    break;
                case fw.keys.code.RIGHT:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            fw.log.error("this.isRightMenuReady", this.isRightMenuReady);
                            if (this.isRightMenuReady) {
                                var isChanged = false;
                                if (this.isAanbiendersMode) {
                                    fw.bannerUiManager.hideBanner();
                                    this.currentFocus = this.FOCUS_RIGHT;
                                    this.appObj.isFocusOnLeftMenu =
                                        false;
                                    this.vodCatModuleList.focusToGrid();
                                    this.rightFocusOn();
                                    this.vodCatModuleInfo.show();
                                    isChanged = true
                                } else if (this.isGridMode()) {
                                    if (this.vodCatGrid.getNumElement() > 0) {
                                        this.currentFocus = this.FOCUS_RIGHT;
                                        this.appObj.isFocusOnLeftMenu = false;
                                        this.rightFocusOn();
                                        isChanged = true
                                    }
                                } else if (this.vodCatModuleList.getNumElement() > 0) {
                                    fw.bannerUiManager.hideBanner();
                                    this.currentFocus = this.FOCUS_RIGHT;
                                    this.appObj.isFocusOnLeftMenu = false;
                                    this.rightFocusOn();
                                    this.vodCatModuleInfo.show();
                                    isChanged = true
                                }
                                if (!this.isAanbiendersMode &&
                                    (this.categoryCheck.categoryId != this.conf.specialCat.Mijn_gehuurde_videos.categoryId && isChanged)) {
                                    this.footerElementYellow.show();
                                    this.footerElementOKLeft.setDefaultTxtStyle()
                                }
                                if (isChanged) {
                                    this.footerElementOKLeft.hide();
                                    this.footerElementOKRight.show();
                                    this.footerElementNav.show()
                                }
                            }
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isAanbiendersMode)this.vodCatModuleList.moveFocusToRight(); else if (this.isGridMode())this.vodCatGrid.moveFocusToRight(); else;
                            break
                    }
                    break;
                case fw.keys.code.LEFT:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isAanbiendersMode)if (!this.vodCatModuleList.isCursorInFirstPosition())this.vodCatModuleList.moveFocusToLeft(); else {
                                fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null, this.checkChangeBanner(this.categoryCheck.path));
                                this.currentFocus = this.FOCUS_LEFT;
                                this.appObj.isFocusOnLeftMenu = true;
                                this.vodCatModuleList.focusOff();
                                this.vodCatModuleList.clearRatingTimeout();
                                this.vodCatModuleInfo.hide(true);
                                this.leftFocusOn();
                                this.footerElementOKLeft.show();
                                this.footerElementOKRight.hide();
                                this.footerElementNav.hide()
                            } else if (this.isGridMode())if (this.vodCatGrid.isCursorInFirstPosition()) {
                                this.leftFocusOn();
                                this.currentFocus = this.FOCUS_LEFT;
                                this.appObj.isFocusOnLeftMenu = true;
                                this.footerElementOKLeft.show();
                                this.footerElementOKRight.hide();
                                this.footerElementNav.hide()
                            } else this.vodCatGrid.moveFocusToLeft(); else {
                                fw.bannerUiManager.showBanner(this.callBackShowBanner, this, null, this.checkChangeBanner(this.categoryCheck.path));
                                this.currentFocus = this.FOCUS_LEFT;
                                this.appObj.isFocusOnLeftMenu =
                                    true;
                                this.leftFocusOn();
                                this.vodCatModuleList.clearRatingTimeout();
                                this.vodCatModuleInfo.hide(true);
                                this.footerElementOKLeft.show();
                                this.footerElementOKRight.hide();
                                this.footerElementNav.hide()
                            }
                            break
                    }
                    break;
                case fw.keys.code.OK:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.updateContent = true;
                            this.vodCatModuleInfo.clearAllCatalog();
                            this.appObj.PCCatChecked = "N";
                            if (this.vodCatModuleMenuList.isTopElementSelected()) {
                                if (this.category.path != this.conf.rootCategory) {
                                    this.isRightMenuReady = false;
                                    this.historyCategory =
                                        new Array;
                                    this.doRootCategory()
                                }
                            } else {
                                var category = this.vodCatModuleMenuList.getSelectItem().cont;
                                this.loadCategoryFromList(category)
                            }
                            break;
                        case this.FOCUS_RIGHT:
                            var appModule = null;
                            if (this.isAanbiendersMode)appModule = this.vodCatModuleList; else if (this.isGridMode())appModule = this.vodCatGrid; else appModule = this.vodCatModuleList;
                            var content = appModule.getSelectItem();
                            if (content.isOttContent != undefined && content.isOttContent)if (content.categoryId != undefined) {
                                this.isAanbiendersMode = false;
                                this.loadCategoryFromList(content)
                            } else {
                                if (content.appURL !=
                                    undefined)fw.mwManager.openOTT(content.appURL)
                            } else {
                                this.movie = content;
                                if (this.movie.blockId == undefined || this.movie.blockId == -1)if (this.appObj.allLocked || this.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(this.movie.isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContent, this, this.conf.hasLiveVideo); else this.runDetail(false)
                            }
                            break
                    }
                    break;
                case 66:
                case fw.keys.code.BLUE:
                    if (this.currentFocus == this.FOCUS_RIGHT) {
                        var _this = this;
                        if (this.isAanbiendersMode)if (fw.userPreferenceStorage.isGridMode() ==
                            "false")if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfDateList, this.vodCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfAZList, this.vodCatalogueOptionMenuCallback, this); else if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfDateGrid, this.vodCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfAZGrid,
                            this.vodCatalogueOptionMenuCallback, this); else if (fw.userPreferenceStorage.isGridMode() == "false")if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuConfDateList, this.vodCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuConfAZList, this.vodCatalogueOptionMenuCallback, this); else if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuConfDateGrid, this.vodCatalogueOptionMenuCallback,
                            this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuConfAZGrid, this.vodCatalogueOptionMenuCallback, this)
                    } else if (this.currentFocus == this.FOCUS_LEFT) {
                        var _this = this;
                        if (fw.userPreferenceStorage.isGridMode() == "false")if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfDateList, this.vodCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfAZList, this.vodCatalogueOptionMenuCallback,
                            this); else if (this.orderInList != fw.conf.getMovieFilterByName)fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfDateGrid, this.vodCatalogueOptionMenuCallback, this); else fw.overlayManager.showOptionMenu(this.vodCatOptionMenuLeftPanelConfAZGrid, this.vodCatalogueOptionMenuCallback, this)
                    }
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown(); else switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.vodCatModuleMenuList.setPageUp();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isGridMode())this.vodCatGrid.changePageDown(); else this.vodCatModuleList.changePageDown();
                            break;
                        default:
                            break
                    }
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp(); else switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            this.vodCatModuleMenuList.setPageDown();
                            break;
                        case this.FOCUS_RIGHT:
                            if (this.isGridMode())this.vodCatGrid.changePageUp(); else this.vodCatModuleList.changePageUp();
                            break;
                        default:
                            break
                    }
                    break;
                case fw.keys.code.YELLOW:
                    this.yellowButtonFunction();
                    break;
                case fw.keys.code.BACK:
                    this.appObj.PCCatChecked = "N";
                    if (this.categoryCheck.parentId == this.conf.rootCategoryId || this.categoryCheck.isLeaf && this.categoryCheck.path.split("/").length == 3)if (this.inputObj.fromNative != null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true)) {
                        fw.log.debug("BACK - back to NATIVE App");
                        fw.mwManager.goBackInHistory()
                    } else {
                        fw.log.debug("BACK - back to HTML App");
                        fw.navigationHistory.back()
                    } else if (this.categoryCheck.categoryId == this.conf.specialCat.Mijn_gehuurde_videos.categoryId)this.appObj.init(new Array(fw.conf.backLabel,
                        {"action": "BackHistory"})); else {
                        if (this.vodCatModuleMenuList.isTopElementSelected())this.vodCatModuleMenuList.focusOff();
                        if (this.categoryCheck.path != this.conf.Aanbienders.categoryPath && (this.categoryCheck.path.indexOf(this.conf.Aanbienders.categoryPath) != -1 && this.isAanbiendersActive))fw.mwManager.getCategoryFromCategoryPath(this.conf.Aanbienders.categoryPath, this.callBackGetCategory, this, null); else {
                            this.categoryBackId = this.getFromHistoryCategory();
                            if (this.categoryBackId != undefined)fw.mwManager.getCategoryFromCategoryId(this.categoryBackId.categoryId,
                                this.callBackGetCategory, this, null)
                        }
                    }
                    break;
                case fw.keys.code.RADIO:
                    fw.mwManager.listenToRadio();
                    break;
                case fw.keys.code.TV:
                    fw.mwManager.watchDTV();
                    break;
                case fw.keys.code.MENU:
                    fw.mwManager.openMenu();
                    break;
                case fw.keys.code.GIDS:
                    fw.mwManager.openEPG("DEFAULT", "");
                    break;
                case fw.keys.code.HELP:
                    fw.appManager.goToHtmlApp("Help", "DefaultSkin", new Array("scenariohelp", "VOD", "Videotheek"), false, true);
                    break;
                default:
                    fw.bannerUiManager.performsBannerAction(this.banner, _evt.keyCode);
                    break
            }
            if (fw.keys.keyCodeAsString(_evt.keyCode) !=
                null)this.vodCatChanNumTxt.setTxt(fw.keys.keyCodeAsString(_evt.keyCode))
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, openNetflix: function () {
        try {
            fw.log.debug("VodCatalogue - openNetflix");
            var topGunVar = fw.mwManager.isNetFlixAccepted();
            fw.log.debug("isNetFlixAccepted", topGunVar);
            if (topGunVar != null && (topGunVar != undefined && topGunVar)) {
                this.isNetflixOpened = true;
                this.isRightMenuReady = true;
                fw.mwManager.openNetFlix()
            } else {
                fw.log.debug("VodCatalogue - openNetflix - show Conf-Popup");
                var objToPassToMessagePopup = new Object;
                objToPassToMessagePopup.title = eval("this.appObj.messages." + this.conf.popupNetFlixLegal.title);
                objToPassToMessagePopup.message = eval("this.appObj.messages." + this.conf.popupNetFlixLegal.message);
                objToPassToMessagePopup.buttonOKlabel = eval("this.appObj.messages." + this.conf.popupNetFlixLegal.okButton);
                objToPassToMessagePopup.buttonKOlabel = eval("this.appObj.messages." + this.conf.popupNetFlixLegal.koButton);
                fw.popupManager.showPopup(fw.conf.popupMessageLargeName, objToPassToMessagePopup,
                    this.popUpNetflixCallback, this)
            }
        } catch (ex) {
            ex.errMethod = "openNetflix";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, loadCategoryFromList: function (_category) {
        try {
            fw.mwManager.sendVodGuideMessage(_category.name);
            this.isRightMenuReady = false;
            if (_category.specialCatId != undefined)if (_category.specialCatId == this.conf.specialCat.Mijn_gehuurde_videos.specialCatId) {
                this.category = _category;
                this.categoryCheck = _category;
                this.setBreadCrumbFromCategoryPath(this.categoryCheck.displayPath, this.categoryCheck.displayName);
                this.footerElementYellow.hide();
                this.footerElementOKLeft.setExstenTxtStyle();
                if (this.isAanbiendersMode) {
                    this.vodCatModuleInfo.hide(true);
                    this.vodCatModuleList.clean()
                } else if (fw.userPreferenceStorage.isGridMode() == "true") {
                    this.vodCatGrid.clean();
                    this.vodCatGrid.setLoadingMessage()
                } else {
                    this.vodCatModuleInfo.hide(true);
                    this.vodCatModuleList.setLoadingMessage()
                }
                this.vodCatModuleMenuList.setItemSelected(true);
                this.leftFocusOn();
                var _this = this;
                setTimeout(function () {
                    _this.appObj.setSubSkin(_this.category.path,
                        null, null)
                }, 0);
                fw.mwManager.getVodFromRentedItems(0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null)
            } else {
                if (_category.specialCatId == this.conf.specialCat.Netflix.specialCatId)this.openNetflix()
            } else {
                this.footerElementYellow.show();
                if (this.currentFocus == this.FOCUS_RIGHT)this.footerElementOKLeft.setDefaultTxtStyle();
                if (_category.parentId != this.categoryCheck.categoryId)this.appObj.PCCatChecked = "N";
                this.category = _category;
                if (this.category.isLeaf) {
                    this.categoryCheck = _category;
                    this.setBreadCrumbFromCategoryPath(this.categoryCheck.displayPath,
                        this.categoryCheck.displayName);
                    if (this.isAanbiendersMode) {
                        this.vodCatModuleInfo.hide(true);
                        this.vodCatModuleList.clean()
                    } else if (fw.userPreferenceStorage.isGridMode() == "true" && !this.isAanbiendersMode) {
                        this.vodCatGrid.clean();
                        this.vodCatGrid.setLoadingMessage()
                    } else {
                        this.vodCatModuleInfo.hide(true);
                        this.vodCatModuleList.setLoadingMessage()
                    }
                    this.isAanbiendersMode = false;
                    this.vodCatModuleMenuList.setItemSelected(this.currentFocus == this.FOCUS_LEFT);
                    this.leftFocusOn();
                    var _this = this;
                    setTimeout(function () {
                        _this.appObj.setSubSkin(_this.category.path,
                            null, null)
                    }, 0);
                    this.loadContentsByCategory(this.category, 0, this, this.getVodFromCategoryIdCallBack, null)
                } else this.PcCheckOnCategory()
            }
        } catch (ex) {
            ex.errMethod = "loadCategoryFromList";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, callBackcheckPCLevelContent: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                this.appObj.allLocked = false;
                this.runDetail(true)
            }
        } catch (ex) {
            ex.errMethod = "callBackcheckPCLevelContent";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, keyHandlerUp: function (_evt) {
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
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, cleanScenario: function () {
        try {
            if (this.timerStart != null)clearTimeout(this.timerStart)
        } catch (ex) {
            ex.errMethod = "cleanScenario";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, yellowButtonFunction: function () {
        try {
            if (this.categoryCheck.path != this.conf.specialCat.Mijn_gehuurde_videos.path)this.showMijnGehuurdeVideos()
        } catch (ex) {
            ex.errMethod = "yellowButtonFunction";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, drawFooter: function () {
        try {
            this.footerOpties = cssUtil.addElementToDom(FooterElement, "vodCatFooterOpties", this.conf.FooterElementOpties, this.getScenObj());
            this.footerOpties.setText(eval("this.appObj.messages." + this.conf.FooterElementOpties.txtCont.txt));
            this.footerElementOKLeft = cssUtil.addElementToDom(FooterElement, "vodCatFooterElementOKLeft", this.conf.FooterElementOKLeft, this.getScenObj());
            this.footerElementOKRight = cssUtil.addElementToDom(FooterElement, "vodCatFooterElementOKRight", this.conf.FooterElementOKRight,
                this.getScenObj());
            this.footerElementOKRight.setText(eval("this.appObj.messages." + this.conf.FooterElementOKRight.txtCont.txt));
            this.footerElementNav = cssUtil.addElementToDom(FooterElement, "vodCatFooterElementNav", this.conf.FooterElementNav, this.getScenObj());
            this.footerElementNav.setText(eval("this.appObj.messages." + this.conf.FooterElementNav.txtCont.txt));
            this.footerElementYellow = cssUtil.addElementToDom(FooterElement, "vodCatFooterElementYellow", this.conf.FooterElementYellow, this.getScenObj());
            this.footerElementYellow.hide();
            this.footerElementYellow.setText(eval("this.appObj.messages." + this.conf.FooterElementYellow.txtCont.txt))
        } catch (ex) {
            ex.errMethod = "drawFooter";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, vcCreateOptionMenuObjects: function () {
        try {
            var optMenuConfObj = this.conf.optionMenuConfAZList;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj =
                new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo = this.conf.hasLiveVideo;
            this.vodCatOptionMenuConfAZList = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfAZGrid;
            var optMenuElemsObj = new Array;
            for (var j = 0; j < optMenuConfObj.size(); j++) {
                var menuElem = new Object;
                menuElem.label = eval("this.appObj.messages." + optMenuConfObj[j]);
                menuElem.status = optMenuConfObj[j];
                optMenuElemsObj.push(menuElem)
            }
            var optMenuObj = new Object;
            optMenuObj.menuElement = optMenuElemsObj;
            optMenuObj.hasLiveVideo =
                this.conf.hasLiveVideo;
            this.vodCatOptionMenuConfAZGrid = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfDateList;
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
            this.vodCatOptionMenuConfDateList = optMenuObj;
            var optMenuConfObj =
                this.conf.optionMenuConfDateGrid;
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
            this.vodCatOptionMenuConfDateGrid = optMenuObj;
            this.vodCatOptionMenuLeftPanelConfAZList = null;
            this.vodCatOptionMenuLeftPanelConfAZGrid = null;
            this.vodCatOptionMenuLeftPanelConfDateList = null;
            this.vodCatOptionMenuLeftPanelConfDateGrid = null;
            var optMenuConfObj = this.conf.optionMenuConfFocusLeftAZGrid;
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
            this.vodCatOptionMenuLeftPanelConfAZGrid =
                optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfFocusLeftAZList;
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
            this.vodCatOptionMenuLeftPanelConfAZList = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfFocusLeftDateGrid;
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
            this.vodCatOptionMenuLeftPanelConfDateGrid = optMenuObj;
            var optMenuConfObj = this.conf.optionMenuConfFocusLeftDateList;
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
            this.vodCatOptionMenuLeftPanelConfDateList = optMenuObj
        } catch (ex) {
            ex.errMethod = "vcCreateOptionMenuObjects";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, runDetail: function (_toUpdatePinControl) {
        try {
            if (this.movie.title != undefined) {
                if (this.isGridMode())this.appObj.positionInCategory =
                    this.vodCatGrid.getList().getItemSelectPosition(); else this.appObj.positionInCategory = this.vodCatModuleList.getList().getItemSelectPosition();
                this.appObj.selectedCategoryContent = this.movie;
                this.appObj.selectCategory = this.category;
                var objParam = new Object;
                objParam.contentId = this.movie.id;
                objParam.category = this.categoryCheck;
                objParam.isOttPresent = this.isOttActive;
                objParam.openMeerTv = this.openDetailInMeer;
                objParam.breadCrumbList = this.vodCatBreadcrumb.getBreadCrumbList();
                objParam.updatePinControl = _toUpdatePinControl;
                this.appObj.init(new Array("Detail", objParam));
                this.openDetailInMeer = false
            }
        } catch (ex) {
            ex.errMethod = "runDetail";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, vodCatalogueOptionMenuCallback: function (_obj) {
        try {
            if (_obj != undefined && _obj != null)switch (_obj[0].toLowerCase()) {
                case "moreinfo":
                    if (!this.isAanbiendersMode) {
                        var appModule = null;
                        if (this.isGridMode())appModule = this.vodCatGrid; else appModule = this.vodCatModuleList;
                        this.movie = appModule.getSelectItem();
                        this.appObj.positionInCategory = appModule.getList().itemSelect;
                        if (this.appObj.allLocked || this.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(this.movie.isPCSafe))fw.pcmanager.checkPCPin(this.callBackcheckPCLevelContent, this, this.conf.hasLiveVideo); else this.runDetail(false)
                    }
                    break;
                case "watchtv":
                    fw.mwManager.watchDTV();
                    break;
                case "orderdate":
                    this.orderInList = fw.conf.getMovieFilterByDateTime;
                    fw.userPreferenceStorage.setAZOrderMode(false);
                    if (!this.isAanbiendersMode) {
                        if (fw.userPreferenceStorage.isGridMode() == "true") {
                            this.vodCatGrid.clean();
                            this.vodCatGrid.setLoadingMessage()
                        } else {
                            if (this.currentFocus !=
                                this.FOCUS_RIGHT)this.vodCatModuleInfo.hide(true);
                            this.vodCatModuleList.clean();
                            this.vodCatModuleList.setLoadingMessage()
                        }
                        this.resetContent = true;
                        if (this.category.specialCatId == this.conf.specialCat.Mijn_gehuurde_videos.specialCatId)fw.mwManager.getVodFromRentedItems(0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null); else fw.mwManager.getVodFromCategoryId(this.category.categoryId, 0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null)
                    }
                    break;
                case "orderaz":
                    this.orderInList = fw.conf.getMovieFilterByName;
                    fw.userPreferenceStorage.setAZOrderMode(true);
                    if (!this.isAanbiendersMode) {
                        if (fw.userPreferenceStorage.isGridMode() == "true") {
                            this.vodCatGrid.clean();
                            this.vodCatGrid.setLoadingMessage()
                        } else {
                            if (this.currentFocus != this.FOCUS_RIGHT)this.vodCatModuleInfo.hide(true);
                            this.vodCatModuleList.clean();
                            this.vodCatModuleList.setLoadingMessage()
                        }
                        this.resetContent = true;
                        if (this.category.specialCatId == this.conf.specialCat.Mijn_gehuurde_videos.specialCatId)fw.mwManager.getVodFromRentedItems(0, this.orderInList, this.getVodFromCategoryIdCallBack,
                            this, null); else fw.mwManager.getVodFromCategoryId(this.category.categoryId, 0, this.orderInList, this.getVodFromCategoryIdCallBack, this, null)
                    }
                    break;
                case "gridview":
                    fw.userPreferenceStorage.setGridMode("true");
                    if (!this.isAanbiendersMode)this.showContentGrid(this);
                    break;
                case "listview":
                    fw.userPreferenceStorage.setGridMode("false");
                    if (!this.isAanbiendersMode)this.showContentList(this);
                    break;
                case "searchinall":
                    fw.mwManager.openSearch("", "", "");
                    break;
                case "menu":
                    break;
                case "epg":
                    break
            }
        } catch (ex) {
            ex.errMethod =
                "vodCatalogueOptionMenuCallback";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, onHide: function () {
    }, rightFocusOn: function () {
        try {
            this.vodCatModuleMenuList.focusOff();
            if (this.isGridMode() && !this.vodCatModuleMenuList.getIsFocusOn())this.vodCatGrid.focusToGrid(); else if (!this.isGridMode() && !this.vodCatModuleMenuList.getIsFocusOn())this.vodCatModuleList.focusToGrid()
        } catch (ex) {
            ex.errMethod = "rightFocusOn";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }, leftFocusOn: function () {
        try {
            if (this.isGridMode() &&
                (this.vodCatGrid != null && this.vodCatGrid != undefined))this.vodCatGrid.focusOff(); else if (!this.isGridMode() && (this.vodCatModuleList != null && this.vodCatModuleList != undefined))this.vodCatModuleList.focusOff();
            this.vodCatModuleMenuList.focusOn()
        } catch (ex) {
            ex.errMethod = "leftFocusOn";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    }
});
