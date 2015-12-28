var ScenarioItemDetail = Class.create(Scenario, {
    initialize: function ($super, _prop, _conf, _parentObj) {
        $super(_prop);
        try {
            this.id = _prop.id;
            this.conf = _conf;
            this.appObj = _parentObj;
            this.FOCUS_LEFT = 0;
            this.FOCUS_DETAIL = 1;
            this.FOCUS_SMARTVIEW = 2;
            this.FOCUS_SMARTVIEW_MENU = 3;
            this.currentFocus = this.FOCUS_LEFT;
            this.isLessInfoPresent = false;
            this.timerContextApplication = null;
            this.maxTimeToRetriveContext = 5E3;
            this.currentContentId = -1;
            this.requestId = 0;
            this.isOttPresent = false;
            this.newMovie = null;
            this.inputObj = null;
            this.smartViewLink =
                null;
            this.category = {};
            this.movie = {};
            this.lockNavLeftMenu = false;
            this.openMeerTv = false;
            this.isMeerTvShown = false;
            this.isThermCondShown = false;
            this.isMeerTvShown = false;
            this.bookmarkChecked = null;
            this.hasMultiItems = true;
            this.tempCurrentPosition = -1;
            this.isMoviePg = false;
            this.messagesArrayForBookmarkInteractivePopup = this.createMessagesArrayForBookmarkInteractivePopup();
            this.ItemDetBreadcrumb = cssUtil.addElementToDom(Breadcrumb, "ItemDetBreadcrumb", this.conf.ItemDetBreadcrumb, this.getScenObj());
            this.ItemDetHourTxt =
                cssUtil.addElementToDom(Text, "ItemDetHourTxt", this.conf.ItemDetHourTxt, this.getScenObj());
            this.ItemDetDataTxt = cssUtil.addElementToDom(Text, "ItemDetDataTxt", this.conf.ItemDetDataTxt, this.getScenObj());
            this.ItemDetLogoImg = cssUtil.addElementToDom(Image, "ItemDetLogoImg", this.conf.ItemDetLogoImg, this.getScenObj());
            this.ItemDetLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo());
            this.ItemDetChanNumTxt = cssUtil.addElementToDom(ChanNumTxt, "ItemDetChanNumTxt", this.conf.ItemDetChanNumTxt, this.getScenObj());
            this.ItemDetChanNumTxt.setCallBack(this, this.callBackChangeChannel);
            this.itemDetModuleInfo = new ModuleItemInfo(this, this.conf.ItemDetModuleInfo, this.conf.ItemDetModuleInfoConf);
            this.itemDetModuleMenuList = new ModuleMenuDetailList(this, this.conf.ItemDetModuleMenuList, this.conf.ItemDetModuleMenuListConf, PinButton, null, this, this.moduleMenuListCallBack, null, fw.subscriberDataManager.userEnabledOTT());
            this.itemDetModuleItemDetails = new ModuleItemDetails(this, this.conf.ItemDetModuleItemDetails, this.conf.ItemDetModuleItemDetailsConf);
            this.loadFooter();
            this.itemDetOptionMenuArray = null;
            this.updateCatalog = false;
            this.createVodDetailOptionMenuArray()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    getCurrentInputObj: function () {
        try {
            var objReturn = new Array;
            objReturn.push("Detail");
            objReturn.push(fw.util.cloneAllObjectType({"action": "backHistory"}));
            if (this.category != null)if (typeof this.category == "string" || this.category instanceof String)objReturn.push(this.category); else objReturn.push(fw.util.cloneAllObjectType(this.category));
            else objReturn.push({});
            objReturn.push(this.appObj.positionInCategory);
            objReturn.push(fw.util.cloneAllObjectType(this.movie));
            objReturn.push(fw.util.cloneAllObjectType(this.appObj.selectedCategoryContents));
            objReturn.push(this.isOttPresent);
            objReturn.push(fw.util.cloneAllObjectType(this.ItemDetBreadcrumb.getBreadCrumbList()));
            if (this.categoryPath != null)objReturn.push(this.categoryPath); else objReturn.push("/");
            objReturn.push(this.hasMultiItems);
            if (this.inputObj.fromNative != null)objReturn.push(this.inputObj.fromNative);
            else objReturn.push(false);
            objReturn.push(this.isMoviePg);
            return objReturn
        } catch (ex) {
            ex.errMethod = "getCurrentInputObj";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    init: function (_inputObj) {
        try {
            this.ItemDetLogoImg.setUrl(fw.subscriberDataManager.getRetailerLogo());
            this.assetUrl = null;
            this.externalId = null;
            this.bookmarkChecked = null;
            this.inputObj = _inputObj;
            this.isOttPresent = false;
            this.isMoviePg = false;
            this.showButtonYellow();
            fw.util.setHourDataTimer(this.ItemDetHourTxt, this.ItemDetDataTxt);
            if (this.inputObj[1].action !=
                "backHistory" && this.inputObj[1].action != "banner") {
                this.isThermCondShown = false;
                this.currentFocus = this.FOCUS_LEFT;
                var firstParameter = this.inputObj[0];
                this.clean(firstParameter);
                this.ItemDetBreadcrumb.show();
                switch (firstParameter.toLowerCase()) {
                    case "detail":
                        this.removeSmartView();
                        this.hasMultiItems = true;
                        this.isInApp = true;
                        var objReturned = this.inputObj[1];
                        if (objReturned.isPCAlreadyChecked)this.appObj.PCCatChecked = "Y";
                        this.contentId = objReturned.contentId;
                        if (objReturned.category != undefined && objReturned.category !=
                            null) {
                            this.category = objReturned.category;
                            this.categoryId = this.category.categoryId;
                            if (this.category.path != undefined)this.categoryPath = this.category.path; else if (objReturned.categoryPathSkin != undefined && objReturned.categoryPathSkin != null)this.categoryPath = objReturned.categoryPathSkin; else this.categoryPath = "/"
                        } else if (objReturned.categoryPathSkin != undefined && objReturned.categoryPathSkin != null)this.categoryPath = objReturned.categoryPathSkin; else this.categoryPath = "/";
                        this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                        if (objReturned.updatePinControl != undefined && objReturned.updatePinControl != null)this.updateCatalog = objReturned.updatePinControl; else this.updateCatalog = false;
                        if (objReturned.breadCrumbList != undefined) {
                            this.ItemDetBreadcrumb.clear();
                            this.ItemDetBreadcrumb.pushList(objReturned.breadCrumbList, true)
                        }
                        if (objReturned.openMeerTv != undefined) {
                            this.openMeerTv = objReturned.openMeerTv;
                            this.isMeerTvShown = this.openMeerTv
                        }
                        if (this.openMeerTv != null)this.showButtonYellow();
                        if (objReturned.isMoviePg != undefined)this.isMoviePg =
                            objReturned.isMoviePg;
                        break;
                    case "vodsearchresult":
                        this.removeSmartView();
                        this.clean(null);
                        this.hasMultiItems = false;
                        if (this.inputObj[1] != undefined) {
                            var _this = this;
                            setTimeout(function () {
                                _this.appObj.setSubSkin("/", null, null)
                            }, 0);
                            this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                            _params = this.inputObj[1];
                            this.category = "searchVod";
                            this.appObj.selectedCategoryContent = _params.searchResult[_params.contentPosition];
                            this.appObj.PCCatChecked = "Y";
                            if (this.conf.breadcrumbCatalogueDefault != undefined)this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault)
                        }
                        break;
                    case "pgsearchresult":
                        this.removeSmartView();
                        this.clean(null);
                        this.hasMultiItems = false;
                        if (this.inputObj[1] != undefined) {
                            var _this = this;
                            setTimeout(function () {
                                _this.appObj.setSubSkin("/", null, null)
                            }, 0);
                            this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                            var _params = this.inputObj[1];
                            this.category = "searchPG";
                            this.isMoviePg = true;
                            this.appObj.selectedCategoryContent = _params.searchResult[_params.contentPosition];
                            this.appObj.PCCatChecked = "Y";
                            if (this.conf.breadcrumbCatalogueDefault != undefined)this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault)
                        }
                        break;
                    case "voddetailslcdi":
                        this.removeSmartView();
                        this.clean(null);
                        this.hasMultiItems = false;
                        this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                        var objReturned = _inputObj[1];
                        this.externalId = objReturned.externalId;
                        this.categoryId = objReturned.categoryId;
                        this.PINchecked = objReturned.PINchecked;
                        if (this.categoryId != undefined && this.categoryId != "")fw.mwManager.getCategoryFromCategoryId(this.categoryId, this.callBackGetCategoryFromCategoryId, this, new Array(this.externalId)); else {
                            if (this.conf.breadcrumbCatalogueDefault !=
                                undefined)this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault);
                            if (this.externalId != undefined || this.externalId != null)fw.mwManager.getVodFromExternalId(this.externalId, this.callBackVodRetrieve, this, null)
                        }
                        break;
                    case "voddetailsiml":
                        this.removeSmartView();
                        this.clean(null);
                        this.hasMultiItems = false;
                        if (this.conf.breadcrumbCatalogueDefault != undefined)this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault);
                        this.hasMultiItems = false;
                        this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                        var objReturned =
                            _inputObj[1];
                        this.assetUrl = objReturned.assetUrl;
                        fw.mwManager.getVodFromAssetUrl(this.assetUrl, this.callBackVodRetrieve, this, null);
                        break
                }
                this.buttonNavigateTxt.hide();
                this.buttonNavigate.hide();
                if (this.appObj.positionInCategory == undefined)this.appObj.positionInCategory = 0;
                if (this.assetUrl == null && this.externalId == null) {
                    if (this.appObj.selectedCategoryContent != undefined && this.appObj.selectedCategoryContent != null)this.callBackVodRetrieve(null, new Array(this.appObj.selectedCategoryContent), 1, null); else if (this.contentId !=
                        undefined || this.contentId != null)fw.mwManager.getVodFromContentId(this.contentId, this.callBackVodRetrieve, this, null);
                    if (this.appObj.selectedCategoryContents != undefined && this.appObj.selectedCategoryContents != null)this.callBackVodFromCategoryRetrieve(null, this.appObj.selectedCategoryContents, this.appObj.selectedCategoryContents.length, null); else if (this.categoryId != undefined && this.categoryId != null)fw.mwManager.getVodFromCategoryId(this.categoryId, 0, "BY_NAME", this.callBackVodFromCategoryRetrieve, this,
                        null)
                }
            } else if (_inputObj[1].action == "banner") {
                if (_inputObj[1].externalId != undefined && _inputObj[1].externalId != null) {
                    this.removeSmartView();
                    var _this = this;
                    setTimeout(function () {
                        _this.appObj.setSubSkin("/", null, null)
                    }, 0);
                    this.appObj.cleanParentalControl();
                    this.clean("clearBreadCrumb");
                    if (this.conf.breadcrumbCatalogueDefault != undefined)this.setBreadcrumb(this.conf.breadcrumbCatalogueDefault);
                    this.buttonNavigate.hide();
                    this.buttonNavigateTxt.hide();
                    this.totalMoviesCount = 0;
                    fw.mwManager.getVodFromExternalId(_inputObj[1].externalId,
                        this.callBackVodRetrieve, this, null)
                }
            } else {
                this.inputObj.fromNative = _inputObj[10];
                this.category = _inputObj[2];
                this.isOttPresent = fw.subscriberDataManager.userEnabledOTT();
                if (_inputObj[12] != undefined && _inputObj[12] != null)this.isMoviePg = _inputObj[12];
                if (this.currentContentId != -1 && _inputObj[4].id != this.currentContentId) {
                    this.appObj.positionInCategory = _inputObj[3];
                    this.appObj.selectedCategoryContent = _inputObj[4];
                    this.appObj.selectedCategoryContents = _inputObj[5];
                    this.hasMultiItems = _inputObj[9]
                }
                if (_inputObj[8] !=
                    null)this.categoryPath = _inputObj[8];
                if (_inputObj[7] != undefined) {
                    this.ItemDetBreadcrumb.clear();
                    this.ItemDetBreadcrumb.pushList(_inputObj[7], true)
                }
                if (this.verifyIfLocked(_inputObj[4]) && this.appObj.forceUpdateParentalControl) {
                    this.clean("hideBreadCrumb");
                    this.cleanEnterWithPin();
                    if (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.id != "PG")this.ItemDetBreadcrumb.pop();
                    this.movies = this.appObj.selectedCategoryContents;
                    this.movie = this.appObj.selectedCategoryContent;
                    fw.appManager.lockAutomaticPopup =
                        false;
                    fw.pcmanager.checkPCPin(this.callBackInsertPin, this, this.conf.hasLiveVideo)
                } else {
                    this.inputObj.fromNative = _inputObj[10];
                    var _this = this;
                    if (_inputObj[8] != null) {
                        this.categoryPath = _inputObj[8];
                        if (this.categoryPath != undefined && this.categoryPath != null)setTimeout(function () {
                            _this.appObj.setSubSkin(_this.categoryPath, null, null)
                        }, 0)
                    }
                    if (this.currentContentId != -1 && _inputObj[4].id != this.currentContentId) {
                        this.appObj.positionInCategory = _inputObj[3];
                        this.appObj.selectedCategoryContent = _inputObj[4];
                        this.appObj.selectedCategoryContents =
                            _inputObj[5];
                        this.hasMultiItems = _inputObj[9];
                        this.itemDetModuleItemDetails.clearAllContent();
                        if (this.appObj.selectedCategoryContent != undefined && this.appObj.selectedCategoryContent != null)this.callBackVodRetrieve(null, new Array(this.appObj.selectedCategoryContent), 1, null);
                        if (this.appObj.selectedCategoryContents != undefined && this.appObj.selectedCategoryContents != null)this.callBackVodFromCategoryRetrieve(null, this.appObj.selectedCategoryContents, this.appObj.selectedCategoryContents.length, null)
                    }
                }
                this.hasMultiItems =
                    _inputObj[9];
                if (this.hasMultiItems != undefined && this.hasMultiItems) {
                    this.itemDetModuleItemDetails.showNavigationArrow();
                    this.buttonNavigate.show();
                    this.buttonNavigateTxt.show()
                } else {
                    this.itemDetModuleItemDetails.hideArrowRight();
                    this.itemDetModuleItemDetails.hideArrowLeft();
                    this.buttonNavigate.hide();
                    this.buttonNavigateTxt.hide()
                }
            }
            if (this.buttonYellow != null)this.buttonYellowTxt.setTxt(eval("this.appObj.messages." + this.conf.footerElementsDetail.buttonYellowTxt.txt))
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass =
                "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackGetCategoryFromCategoryId: function (_callerCallbackParams, _category) {
        try {
            if (_category != undefined && _category != null)this.setBreadCrumbFromCategoryPath(_category.displayPath);
            if (_callerCallbackParams != undefined && _callerCallbackParams[0] != undefined)fw.mwManager.getVodFromExternalId(_callerCallbackParams[0], this.callBackVodRetrieve, this, null)
        } catch (ex) {
            ex.errMethod = "callBackGetCategoryFromCategoryId";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    setBreadCrumbFromCategoryPath: function (_categoryPath) {
        try {
            var _this =
                this;
            setTimeout(function () {
                if (_categoryPath != null && (_categoryPath != undefined && _categoryPath != "")) {
                    var listPath = _categoryPath.split("/");
                    _this.ItemDetBreadcrumb.clear();
                    var listBreadCrumb = new Array;
                    if (_this.conf.breadcrumbCatalogueDefault != undefined)for (var i = 0; i < _this.conf.breadcrumbCatalogueDefault.length; i++)listBreadCrumb.push(eval("_this.appObj.messages." + _this.conf.breadcrumbCatalogueDefault[i]));
                    for (var j = 2; j < listPath.length; j++)listBreadCrumb.push(listPath[j]);
                    _this.ItemDetBreadcrumb.pushList(listBreadCrumb,
                        true)
                }
            }, 0)
        } catch (ex) {
            ex.errMethod = "setBreadCrumbFromCategoryPath";
            ex.errClass = "ScenarioVodCatalogue";
            fw.err(ex)
        }
    },
    verifyIfLocked: function (_movie) {
        try {
            return this.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe)
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    setBreadcrumb: function (_list) {
        try {
            for (var i = 0; i < _list.length; i++)this.ItemDetBreadcrumb.push(eval("this.appObj.messages." + _list[i]), true)
        } catch (ex) {
            ex.errMethod = "setBreadcrumb";
            ex.errClass =
                "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    clean: function (_param) {
        try {
            if (_param === "clearBreadCrumb")this.ItemDetBreadcrumb.clear(); else if (_param === "hideBreadCrumb")this.ItemDetBreadcrumb.hide(); else if (_param != undefined && (_param != null && _param == fw.conf.backLabel))this.ItemDetBreadcrumb.pop(); else this.ItemDetBreadcrumb.clear();
            this.itemDetModuleMenuList.clean();
            this.itemDetModuleInfo.clearAll();
            this.itemDetModuleInfo.clearExtRating();
            this.itemDetModuleItemDetails.clearAllContent();
            this.itemDetModuleItemDetails.setCoverImage("");
            this.itemDetModuleItemDetails.hideArrowLeft();
            this.itemDetModuleItemDetails.hideArrowRight()
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    cleanScenario: function () {
        try {
        } catch (ex) {
            ex.errMethod = "cleanScenario";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackChangeChannel: function (_chanNum) {
        try {
            fw.log.debug("vodCatChanNumTxtCallBack_res: " + _chanNum);
            fw.mediaManager.tuneToChannel(_chanNum)
        } catch (ex) {
            ex.errMethod = "callBackChangeChannel";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackVodRetrieve: function (_callerCallbackParams, _movies, _totalMoviesCount, _parentCategory) {
        try {
            this.movie = _movies[0];
            if (this.movie != undefined && this.movie != null)if (this.verifyIfLocked(this.movie))fw.pcmanager.checkPCPin(this.callBackInsertPinFromBanner, this, this.conf.hasLiveVideo); else {
                this.populateDetail();
                this.populateMenuList(this);
                if (this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo != undefined || this.isMoviePg && !this.openMeerTv)this.itemDetModuleInfo.setInfoByMoviePG(this.movie);
                else if (!this.openMeerTv)this.itemDetModuleInfo.setInfoByMovie(this.movie, this.isRatingPresent(), true)
            } else fw.log.error("Movie Error")
        } catch (ex) {
            ex.errMethod = "callBackVodRetrieve";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackInsertPinFromBanner: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                this.populateDetail();
                this.populateMenuList(this);
                if (this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo != undefined || this.isMoviePg)this.itemDetModuleInfo.setInfoByMoviePG(this.movie);
                else this.itemDetModuleInfo.setInfoByMovie(this.movie, this.isRatingPresent(), true)
            } else {
                var obj = new Object;
                if (this.appObj.getLastScenarioDataInHistory() != undefined) {
                    obj.action = "backHistory";
                    obj.origin = "fromBanner";
                    this.appObj.getLastScenarioDataInHistory().scenarioInputObj = obj
                }
                if (this.inputObj.fromNative != null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true)) {
                    fw.log.debug("back to NATIVE App");
                    fw.mwManager.goBackInHistory()
                } else {
                    fw.log.debug("back to HTML App");
                    this.appObj.init(new Array(fw.conf.backLabel,
                        this.movie))
                }
            }
        } catch (ex) {
            ex.errMethod = "callBackInsertPinFromBanner";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackInsertPin: function (_res) {
        try {
            if (_res === "OK") {
                this.appObj.PCCatChecked = "Y";
                if (!this.isMeerTvShown && !this.isThermCondShown)this.populateDetail(); else this.itemDetModuleItemDetails.showMeerTv();
                this.ItemDetBreadcrumb.show();
                if (this.currentFocus == this.FOCUS_DETAIL)this.currentFocus = this.FOCUS_LEFT;
                this.populateMenuList(this);
                if ((this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo !=
                    undefined || this.isMoviePg) && !this.openMeerTv)this.itemDetModuleInfo.setInfoByMoviePG(this.movie); else if (!this.openMeerTv)this.itemDetModuleInfo.setInfoByMovie(this.movie, this.isRatingPresent(), true);
                if (this.movies.length > 1)this.itemDetModuleItemDetails.showNavigationArrow(); else {
                    this.itemDetModuleItemDetails.hideArrowLeft();
                    this.itemDetModuleItemDetails.hideArrowRight()
                }
            } else try {
                var param = new Array(fw.util.cloneAllObjectType(this.movie), this.updateCatalog, fw.util.cloneAllObjectType(this.category));
                this.appObj.getLastScenarioDataInHistory().scenarioInputObj = this.appObj.getLastScenarioDataInHistory().scenarioInputObj.concat(param);
                this.appObj.init(new Array(fw.conf.backLabel, this.movie));
                this.itemDetModuleItemDetails.removeSmartview();
                this.currentFocus = this.FOCUS_LEFT;
                this.showButtonYellow();
                this.isMeerTvShown = false
            } catch (ex) {
                this.appObj.init(new Array(fw.conf.backLabel, this.movie))
            }
        } catch (ex) {
            ex.errMethod = "callBackInsertPin";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackVodFromCategoryRetrieve: function (_callerCallbackParams,
                                               _movies, _totalMoviesCount, _parentCategory) {
        try {
            this.movies = _movies;
            this.totalMoviesCount = _totalMoviesCount;
            if (this.totalMoviesCount != undefined && (this.totalMoviesCount > 1 && this.hasMultiItems)) {
                this.itemDetModuleItemDetails.showNavigationArrow();
                this.buttonNavigate.show();
                this.buttonNavigateTxt.show()
            } else {
                this.itemDetModuleItemDetails.hideArrowRight();
                this.itemDetModuleItemDetails.hideArrowLeft();
                this.buttonNavigate.hide();
                this.buttonNavigateTxt.hide()
            }
        } catch (ex) {
            ex.errMethod = "callBackVodFromCategoryRetrieve";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    checkTypeVod: function (_type) {
        try {
            if (this.movie.rentalType != undefined && (this.movie.rentalType != null && (this.movie.rentalType == "POD" && (this.movie.rentalTRCcode != undefined && (this.movie.rentalTRCcode != null && (this.movie.rentalTRCcode == "T0" || this.movie.rentalTRCcode == "R0")))))) {
                fw.mwManager.rentVOD(this.movie, null, null, null, null, null);
                this.doContentShow(_type)
            } else this.doContentShow(_type)
        } catch (ex) {
            ex.errMethod = "checkTypeVod";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    doContentShow: function (_type) {
        try {
            this.playingTrailer = _type == "OKOnPlayVideo" ? "N" : "Y";
            if (this.movie.bookmarks != null && (this.movie.bookmarks != undefined && (parseInt(this.movie.bookmarks) > 0 && !(this.playingTrailer == "Y")))) {
                var _this = this;
                setTimeout(function () {
                    _this.showInteractivePopup()
                }, 1)
            } else this.appObj.init(new Array("Play", this.movie.id, this.playingTrailer, "restart"))
        } catch (ex) {
            ex.errMethod = "doContentShow";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    checkPin: function () {
        try {
            if (this.newMovie.blockId !=
                undefined && this.newMovie.blockId != -1) {
                this.lockNavLeftMenu = true;
                this.movie = this.newMovie;
                this.movie.title = eval("this.appObj.messages." + this.conf.catalogGrid_NoTitle);
                this.movie.longDescription = eval("this.appObj.messages." + this.conf.catalogGrid_NoDesc);
                this.movie.shortDescription = eval("this.appObj.messages." + this.conf.catalogGrid_NoDesc);
                if ((this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo != undefined || this.isMoviePg) && !this.openMeerTv)this.itemDetModuleInfo.setInfoByMoviePG(this.movie);
                else if (!this.openMeerTv)this.itemDetModuleInfo.setInfoByMovie(this.movie, this.isRatingPresent(), true);
                this.populateDetail()
            } else if (this.verifyIfLocked(this.newMovie))fw.pcmanager.checkPCPin(this.callBackinsertPinItemCategory, this, this.conf.hasLiveVideo); else {
                this.movie = this.newMovie;
                this.appObj.selectedCategoryContent = this.movie;
                this.buildPage()
            }
        } catch (ex) {
            ex.errMethod = "checkPin";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackinsertPinItemCategory: function (_res) {
        try {
            if (_res === "OK") {
                this.updateCatalog =
                    true;
                this.appObj.PCCatChecked = "Y";
                this.movie = this.newMovie;
                this.appObj.selectedCategoryContent = this.newMovie;
                this.currentContentId = this.movie.id;
                this.buildPage()
            } else {
                this.lockNavLeftMenu = false;
                if (this.tempCurrentPosition != -1) {
                    this.appObj.positionInCategory = this.tempCurrentPosition;
                    this.tempCurrentPosition = -1
                }
            }
        } catch (ex) {
            ex.errMethod = "callBackinsertPinItemCategory";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    isRatingPresent: function () {
        try {
            var isRatingPresent = true;
            if (this.conf.showRatingIcons != null &&
                (this.conf.showRatingIcons != undefined && !this.conf.showRatingIcons))isRatingPresent = false;
            return isRatingPresent
        } catch (ex) {
            ex.errMethod = "isRatingPresent";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    buildPage: function () {
        try {
            if (this.ItemDetBreadcrumb.getBreadCrumbList().length > 2 && !(this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo != undefined))this.ItemDetBreadcrumb.pop();
            var _this = this;
            if (_this.conf.showContentChannelInfo != null && _this.conf.showContentChannelInfo != undefined ||
                _this.isMoviePg && !_this.openMeerTv)_this.itemDetModuleInfo.setInfoByMoviePG(_this.movie); else if (!_this.openMeerTv)_this.itemDetModuleInfo.setInfoByMovie(_this.movie, _this.isRatingPresent(), true);
            this.populateDetail();
            if (this.updateMenuTimer != undefined && this.updateMenuTimer != null)fw.util.clearTimeout(this.updateMenuTimer);
            this.updateMenuTimer = fw.util.setTimeout(function () {
                fw.log.info("showContentChannelInfo : " + _this.conf.showContentChannelInfo);
                if (_this.movie.blockId == undefined || _this.movie.blockId == -1) {
                    _this.populateMenuList(_this);
                    _this.updateMenuTimer = null
                }
            }, fw.conf.detailPageLeftMenuTimerUpdate)
        } catch (ex) {
            ex.errMethod = "buildPage";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    populateMenuList: function (_this, _nofocus, _unlock) {
        try {
            var isThermShow = false;
            _this.objMenuList = new Array;
            var isUseVaoucherPresent = false;
            var isComingSoon = fw.mwManager.isMovieComingSoon(this.movie);
            if (!isComingSoon)if (this.movie.rentalType == "POD")if (!fw.mwManager.isItemRented(this.movie)) {
                isThermShow = true;
                if (fw.mwManager.isPurchasePINEnabled())_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." +
                    _this.conf.label_bestel), true, "insBuyPin")); else _this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." + _this.conf.label_bestel), false, "BuyNoPin"));
                isUseVaoucherPresent = fw.mwManager.isVVSserverActive()
            } else {
                if (_this.movie.assetURL != undefined && _this.movie.assetURL != "")_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." + _this.conf.label_Show), false, "OKOnPlayVideo"))
            } else if (_this.movie.assetURL != undefined && _this.movie.assetURL != "")_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." +
                _this.conf.label_Show), false, "OKOnPlayVideo"));
            if (_this.movie.previewURL != undefined && _this.movie.previewURL != "")if (!(_this.movie.rentalType != "POD" && (_this.conf.showContentChannelInfo != null && _this.conf.showContentChannelInfo != undefined || _this.isMoviePg)))_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." + _this.conf.label_Watch_Trailer), false, "OKOnPlayTrailer"));
            if (isUseVaoucherPresent && !isComingSoon)_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." +
                _this.conf.label_Watch_Use_Voucher), false, "Use_Voucher"));
            _this.isLessInfoPresent = false;
            _this.itemDetModuleItemDetails.hideArrowDown();
            if (_this.conf.menuTopButton != undefined && (_this.conf.menuTopButton.isPresent != undefined && _this.conf.menuTopButton.isPresent))_this.itemDetModuleMenuList.setTopButton(eval("_this.appObj.messages." + _this.conf.menuTopButton.txtButton));
            if (!this.isThermCondShown && (!_this.isMeerTvShown && _this.itemDetModuleItemDetails.getNumPageDescr() > 1)) {
                _this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." +
                    _this.conf.label_Watch_Less_Info), false, "moreInfo"));
                _this.itemDetModuleItemDetails.showArrowDown();
                _this.isLessInfoPresent = true
            }
            if (isThermShow && !this.isThermCondShown)_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." + _this.conf.label_Therm), false, "Therm&Cond")); else if (isThermShow && (this.isThermCondShown && !this.isMeerTvShown))_this.objMenuList.push(new ItemLeftPinButton(eval("_this.appObj.messages." + _this.conf.label_Programma_info), false, "programma_info"));
            if (_this.objMenuList.length <=
                0) {
                _this.menuLeftCode.hide();
                _this.buttonOk.hide();
                _this.buttonOkTxt.hide()
            }
            _this.itemDetModuleMenuList.setMenuList(_this.objMenuList);
            if (this.isOttPresent)_this.itemDetModuleMenuList.setMeerTvButton(_this.category, _this.movie, eval("_this.appObj.messages." + _this.conf.label_SmartView), "SmartView");
            if (_this.isMeerTvShown)_this.itemDetModuleMenuList.setProgrammaInfo(eval("_this.appObj.messages." + _this.conf.label_Programma_info), "programma_info");
            if (_this.itemDetModuleMenuList.getMenuList() != null && (_this.itemDetModuleMenuList.getMenuList() !=
                undefined && (_this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0) != null && (_this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0) != undefined && _this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).dataElement.isMaskActive === true))))_this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).domElement.showPinStructure();
            if (_this.openMeerTv) {
                _this.itemDetModuleMenuList.setMeerTvButtonSelected();
                _this.currentFocus = _this.FOCUS_SMARTVIEW;
                _this.isMeerTvShown =
                    true;
                _this.buttonOkTxt.setTxt(": " + eval("_this.appObj.messages." + _this.conf.label_SmartView));
                _this.doContextApplicationsCall();
                _this.openMeerTv = false
            }
            if (_this.currentFocus == _this.FOCUS_LEFT || _this.currentFocus == _this.FOCUS_SMARTVIEW_MENU) {
                _this.itemDetModuleMenuList.focusOn();
                _this.lockNavLeftMenu = false
            }
            if (_unlock == undefined || _unlock)setTimeout(function () {
                _this.unLockKeyBoard()
            }, 1)
        } catch (ex) {
            ex.errMethod = "populateMenuList";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    popupVoucherNameCallback: function (_res) {
        try {
            if (_res !=
                null && (_res.itemDiscountPrice != undefined && (_res.voucherPin != undefined && _res.itemDiscountPrice >= 0))) {
                this.voucherPin = _res.voucherPin;
                this.actualDiscountPrice = _res.itemDiscountPrice;
                fw.log.debug("popupVoucherNameCallback - calling fw.mwManager.rentVOD");
                fw.mwManager.rentVOD(this.movie, this.voucherPin, this.actualDiscountPrice, this.rentVODCallBack, this, null, true)
            } else {
                fw.log.debug("popupVoucherNameCallback - ERROR");
                if (_res != null && _res.messVoucherIncorrectObj != undefined)fw.popupManager.showPopup(fw.conf.popupMessageName,
                    _res.messVoucherIncorrectObj, this.popupMessageNameCallback, this); else {
                    this.itemDetModuleMenuList.setFocusOnFirstElement();
                    if (this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).dataElement.isMaskActive === true)this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).domElement.showPinStructure()
                }
            }
        } catch (ex) {
            ex.errMethod = "popupVoucherNameCallback";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    navigateRightMovies: function () {
        try {
            if (this.movies != undefined && (this.movies.length >
                0 && this.hasMultiItems)) {
                this.lockNavLeftMenu = true;
                this.tempCurrentPosition = this.appObj.positionInCategory;
                this.appObj.positionInCategory++;
                if (this.appObj.positionInCategory > this.movies.length - 1)this.appObj.positionInCategory = 0;
                this.newMovie = this.movies[this.appObj.positionInCategory];
                if (this.newMovie.blockId != undefined && this.newMovie.blockId != -1)fw.mwManager.updateItems(this.appObj.positionInCategory, this.movies, this, this.callBackOtherMovie);
                this.checkPin()
            }
        } catch (ex) {
            ex.errMethod = "navigateRightMovies";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackOtherMovie: function (_resultCode, _data) {
        this.newMovie = _data[this.appObj.positionInCategory];
        this.lockNavLeftMenu = false;
        this.ItemDetBreadcrumb.pop();
        this.checkPin()
    },
    navigateLeftMovies: function () {
        try {
            if (this.movies != undefined && (this.movies.length > 0 && this.hasMultiItems)) {
                this.lockNavLeftMenu = true;
                this.tempCurrentPosition = this.appObj.positionInCategory;
                this.appObj.positionInCategory--;
                if (this.appObj.positionInCategory < 0)this.appObj.positionInCategory =
                    this.movies.length - 1;
                this.newMovie = this.movies[this.appObj.positionInCategory];
                if (this.newMovie.blockId != undefined && this.newMovie.blockId != -1)fw.mwManager.updateItems(this.appObj.positionInCategory, this.movies, this, this.callBackOtherMovie);
                this.checkPin()
            }
        } catch (ex) {
            ex.errMethod = "navigateLeftMovies";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    populateDetail: function () {
        try {
            this.currentContentId = this.movie.id;
            this.itemDetModuleItemDetails.setTitle(this.movie.title);
            this.itemDetModuleItemDetails.setDescription(this.movie.longDescription);
            this.itemDetModuleItemDetails.setCoverImage(this.movie.jpeg);
            if (this.ItemDetBreadcrumb.getBreadCrumbList()[this.ItemDetBreadcrumb.getBreadCrumbList().length - 1] != this.movie.title && !(this.conf.showContentChannelInfo != null && this.conf.showContentChannelInfo != undefined))this.ItemDetBreadcrumb.push(this.movie.title, true)
        } catch (ex) {
            ex.errMethod = "populateDetail";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    createMessagesArrayForBookmarkInteractivePopup: function () {
        try {
            var arrayToParse = fw.util.returnAppMessageArray(this.appObj.messages,
                this.conf.popupInteractiveMessageBookMarkArray);
            return arrayToParse
        } catch (ex) {
            ex.errMethod = "createZapbannerMessagesArrayForBookmarkInteractivePopup";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    showInteractivePopup: function () {
        try {
            var objToPassToInteractivePopup = new Object;
            objToPassToInteractivePopup.title = this.messagesArrayForBookmarkInteractivePopup[0].contentTitle;
            objToPassToInteractivePopup.message = this.messagesArrayForBookmarkInteractivePopup[1].contentTitle;
            objToPassToInteractivePopup.buttonOKlabel =
                this.messagesArrayForBookmarkInteractivePopup[2].contentTitle;
            objToPassToInteractivePopup.buttonKOlabel = this.messagesArrayForBookmarkInteractivePopup[3].contentTitle;
            objToPassToInteractivePopup.buttonOKstatus = "Resume";
            objToPassToInteractivePopup.buttonKOstatus = "Restart";
            objToPassToInteractivePopup.focusKO = true;
            fw.popupManager.showPopup(fw.conf.popupInteractiveName, objToPassToInteractivePopup, this.closeInteractiveBookmarkPopup, this)
        } catch (ex) {
            ex.errMethod = "showInteractivePopup";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    closeInteractiveBookmarkPopup: function (_prop) {
        try {
            this.bookmarkChecked = _prop.toLowerCase();
            this.appObj.selectedCategoryContent = this.movie;
            this.appObj.init(new Array("Play", this.movie.id, this.playingTrailer, _prop.toLowerCase()))
        } catch (ex) {
            ex.errMethod = "closeInteractiveBookmarkPopup";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    doPurchase: function (_pin) {
        try {
            if (fw.mwManager.verifyPurchasePIN(_pin)) {
                this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).domElement.clear();
                fw.mwManager.rentVOD(this.movie, null, null, this.rentVODCallBack, this, null, true)
            } else {
                this.itemDetModuleMenuList.getMenuList().getVisibleItemAtPosition(0).domElement.clear();
                var popupPcPINNameObj = new Object;
                popupPcPINNameObj.hasLiveVideo = this.conf.hasLiveVideo;
                popupPcPINNameObj.forPurchase = "Y";
                popupPcPINNameObj.isMoviePCSafe = this.movie.isPCSafe;
                fw.popupManager.showPopup(fw.conf.popupPcPINName, popupPcPINNameObj, this.popupPcPINNameCallback, this)
            }
        } catch (ex) {
            ex.errMethod = "doPurchase";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    popupPcPINNameCallback: function (_res) {
        try {
            this.lockNavLeftMenu = false;
            if (_res)fw.mwManager.rentVOD(this.movie, null, null, this.rentVODCallBack, this, null, true)
        } catch (ex) {
            ex.errMethod = "popupPcPINNameCallback";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    rentVODCallBack: function (_callerCallbackParams, _rentResult, _errorCode, _incentiveType, _maxCounterValue, _subscriberCounterValue) {
        try {
            fw.log.debug("*** CALBACK RENT VOD ***");
            var _this = this;
            this.lockNavLeftMenu = false;
            if (_rentResult > 0) {
                if (this.isThermCondShown) {
                    this.itemDetModuleItemDetails.setTitle(this.movie.title);
                    this.itemDetModuleItemDetails.setDescription(this.movie.longDescription);
                    this.isThermCondShown = false;
                    this.isMeerTvShown = false
                } else if (this.itemDetModuleItemDetails.isSmartViewShown()) {
                    this.itemDetModuleItemDetails.cleanMeerTvInfo();
                    this.itemDetModuleItemDetails.removeSmartview();
                    this.populateDetail();
                    this.itemDetModuleInfo.setInfoByMovie(this.movie, true, true);
                    this.currentFocus = this.FOCUS_LEFT;
                    this.showButtonYellow();
                    this.isMeerTvShown = false
                }
                this.populateMenuList(this, true, false);
                if ((this.conf.showContentChannelInfo !=
                    null && this.conf.showContentChannelInfo != undefined || this.isMoviePg) && !this.openMeerTv)this.itemDetModuleInfo.setInfoByMoviePG(this.movie); else if (!this.openMeerTv)this.itemDetModuleInfo.setInfoByMovie(this.movie, true, true);
                var popupRentalObj = new Object;
                popupRentalObj.itemTitle = this.movie.title;
                fw.log.debug("rentVODCallBack - calling fw.popupManager.showPopup, params : fw.conf.popupRentalConfName => " + fw.conf.popupRentalConfName + " , popupRentalObj => ", popupRentalObj);
                fw.popupManager.showPopup(fw.conf.popupRentalConfName,
                    popupRentalObj, _this.popupRentalConfNameCallback, _this)
            } else switch (_errorCode) {
                case -56:
                    fw.log.debug("rentVODCallBack - ERROR OCCURRED : max rental limit (" + _errorCode + ")");
                    var popupMessError = new Object;
                    popupMessError.title = this.appObj.messages.rental_limit_exceeded_popup_title_56;
                    popupMessError.message = this.appObj.messages.rental_limit_exceeded_popup_message_56 + "(" + _errorCode + ")";
                    popupMessError.button = this.appObj.messages.rental_limit_exceeded_popup_button_56;
                    fw.popupManager.showPopup(fw.conf.popupMessageName,
                        popupMessError, _this.popupMessageNameCallback, _this);
                    break;
                case -9990:
                    var popupMessError = new Object;
                    popupMessError.title = this.appObj.messages.unable_to_communicate_with_prepay_server_popup_msg_title_txt_9990;
                    popupMessError.message = this.appObj.messages.unable_to_communicate_with_prepay_server_popup_msg_message_txt_9990 + "(" + _errorCode + ")";
                    popupMessError.button = this.appObj.messages.unable_to_communicate_with_prepay_server_popup_msg_button_txt_9990;
                    fw.popupManager.showPopup(fw.conf.popupMessageName, popupMessError,
                        this.popupMessageNameCallback, _this);
                    break;
                default:
                    fw.log.debug("rentVODCallBack - ERROR OCCURRED : _errorCode => " + _errorCode);
                    break
            }
        } catch (ex) {
            ex.errMethod = "rentVODCallBack";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    popupMessageNameCallback: function () {
        try {
            this.itemDetModuleMenuList.focusOn()
        } catch (ex) {
            ex.errMethod = "popuoMessageNameCallback";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    popupMessageNameVoucherIncorrectCallback: function (_res) {
        try {
            this.itemDetModuleMenuList.focusOn()
        } catch (ex) {
            ex.errMethod =
                "popupMessageNameVoucherIncorrectCallback";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    popupRentalConfNameCallback: function (_res) {
        try {
            fw.log.debug("popupRentalConfNameCallback - start , param : _res => " + _res);
            this.itemDetModuleMenuList.focusOn();
            if (_res === "NOW") {
                fw.log.debug("popupRentalConfNameCallback - inside if for NOW => calling doContentShow(OKOnPlayVideo)");
                this.doContentShow("OKOnPlayVideo")
            }
        } catch (ex) {
            ex.errMethod = "popupRentalConfNameCallback";
            ex.errClass = "navigateLeftMovies";
            fw.err(ex)
        }
    },
    moduleMenuListCallBack: function (_LeftMenuTotalPosition, _LeftMenuDomElement, _LeftMenuDataElement) {
        try {
            if (_LeftMenuTotalPosition == 0 && _LeftMenuDataElement.isMaskActive === true)this.showFooterInsCode(); else if (_LeftMenuDataElement.contentTitle != null && _LeftMenuDataElement.contentTitle != undefined)this.setLeftMenuNav(": " + _LeftMenuDataElement.contentTitle); else this.setLeftMenuNav(": " + _LeftMenuDataElement.name)
        } catch (ex) {
            ex.errMethod = "moduleMenuListCallBack";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    showSmartViewCallBack: function (_callerCallbackParams, _applicationsList) {
        try {
            if (_callerCallbackParams != null) {
                clearTimeout(_callerCallbackParams);
                this.timerContextApplication = null
            }
            if (_applicationsList != null && _applicationsList != undefined) {
                if (_applicationsList.length > 0)this.itemDetModuleItemDetails.setSmartView(_applicationsList);
                if (_applicationsList.length == 0) {
                    this.currentFocus = this.FOCUS_LEFT;
                    this.itemDetModuleMenuList.focusOn()
                }
            }
        } catch (ex) {
            ex.errMethod = "showSmartViewCallBack";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    callBackItemDetSmartView: function (_IndexPage, _totalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            var _this = this;
            if (this.smartViewTimeUpdate != undefined && this.smartViewTimeUpdate != null) {
                clearTimeout(this.smartViewTimeUpdate);
                this.smartViewTimeUpdate = null
            }
            this.smartViewTimeUpdate = setTimeout(function () {
                _this.itemDetModuleInfo.setInfoSmartview(_dataElement)
            }, 400);
            if (_dataElement.appURL != undefined && (_dataElement.appURL != null && _dataElement.appURL != ""))this.smartViewLink = _dataElement.appURL;
            else if (_dataElement.applicationURL != undefined && (_dataElement.applicationURL != null && _dataElement.applicationURL != ""))this.smartViewLink = _dataElement.applicationURL
        } catch (ex) {
            ex.errMethod = "callBackItemDetSmartView";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    buttonYellowFunction: function () {
        try {
            if (this.buttonYellow != null && this.buttonYellow.isImageShown()) {
                var currApp = this.appObj.id;
                if (currApp.toLowerCase() == "vodcatalogue")this.appObj.init(new Array("Catalogue", "MijnGehuurde")); else fw.appManager.goToHtmlApp("VodCatalogue",
                    "DefaultSkin", new Array("Catalogue", "MijnGehuurde"), false, true)
            }
        } catch (ex) {
            ex.errMethod = "buttonYellowFunction";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    removeSmartView: function () {
        try {
            if (this.itemDetModuleItemDetails != undefined && this.itemDetModuleItemDetails != null && (this.itemDetModuleItemDetails.isSmartViewShown() || this.isMeerTvShown)) {
                this.itemDetModuleItemDetails.removeSmartview();
                this.populateDetail();
                this.itemDetModuleInfo.setInfoByMovie(this.movie, true, true);
                this.currentFocus = this.FOCUS_LEFT;
                this.showButtonYellow();
                this.isMeerTvShown = false;
                this.populateMenuList(this)
            }
        } catch (ex) {
            ex.errMethod = "manageSmartView";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    manageSmartView: function (_nofocus) {
        try {
            if (this.isThermCondShown)this.isThermCondShown = false;
            if (this.itemDetModuleItemDetails.isSmartViewShown()) {
                this.itemDetModuleItemDetails.removeSmartview();
                this.populateDetail();
                this.itemDetModuleInfo.setInfoByMovie(this.movie, true, true);
                this.currentFocus = this.FOCUS_LEFT;
                this.showButtonYellow();
                this.isMeerTvShown =
                    false;
                this.populateMenuList(this, _nofocus)
            } else {
                this.currentFocus = this.FOCUS_SMARTVIEW;
                this.isMeerTvShown = true;
                this.populateMenuList(this);
                this.itemDetModuleMenuList.setMeerTvButtonSelected();
                this.itemDetModuleMenuList.focusOff();
                this.buttonOkTxt.setTxt(": " + eval("this.appObj.messages." + this.conf.label_SmartView));
                this.doContextApplicationsCall()
            }
            if (!this.isThermCondShown) {
                this.itemDetModuleItemDetails.setTitle(this.movie.title);
                this.itemDetModuleItemDetails.setDescription(this.movie.longDescription)
            }
        } catch (ex) {
            ex.errMethod =
                "manageSmartView";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    doContextApplicationsCall: function () {
        try {
            this.itemDetModuleItemDetails.setMeerTvInfoLoading();
            this.itemDetModuleItemDetails.prepareSmartTv();
            var _this = this;
            this.timerContextApplication = setTimeout(function () {
                fw.mwRequestManager.deleteCallBack(this.requestId);
                _this.timerContextApplication = null;
                _this.manageSmartView(false);
                _this.itemDetModuleItemDetails.cleanMeerTvInfo()
            }, this.maxTimeToRetriveContext);
            this.requestId = fw.mwManager.getContextApplicationsForMovie(this.movie.title,
                this.category.name, this.showSmartViewCallBack, this, this.timerContextApplication)
        } catch (ex) {
            ex.errMethod = "doContextApplicationsCall";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    cleanEnterWithPin: function () {
        try {
            if (this.isThermCondShown || this.itemDetModuleItemDetails.isSmartViewShown()) {
                this.isThermCondShown = false;
                this.isMeerTvShown = false;
                this.currentFocus = this.FOCUS_LEFT;
                this.itemDetModuleItemDetails.cleanMeerTvInfo();
                this.itemDetModuleItemDetails.removeSmartview()
            }
        } catch (ex) {
            ex.errMethod = "doContextApplicationsCall";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    keyHandler: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.RIGHT:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            fw.log.debug("ScenarioItemDetail : keyHandler : checking if can move right : this.totalMoviesCount : " + this.totalMoviesCount);
                            if (this.totalMoviesCount != undefined && this.totalMoviesCount > 1) {
                                this.isMeerTvShown = false;
                                this.isThermCondShown = false;
                                this.navigateRightMovies()
                            }
                            break;
                        case this.FOCUS_DETAIL:
                            break;
                        case this.FOCUS_SMARTVIEW:
                            this.itemDetModuleItemDetails.rightSmartview();
                            break;
                        case this.FOCUS_SMARTVIEW_MENU:
                            this.itemDetModuleMenuList.focusOff();
                            this.itemDetModuleItemDetails.onSmartview();
                            this.currentFocus = this.FOCUS_SMARTVIEW;
                            this.buttonOkTxt.setTxt(": " + eval("this.appObj.messages." + this.conf.label_SmartView));
                            break
                    }
                    break;
                case fw.keys.code.LEFT:
                    switch (this.currentFocus) {
                        case this.FOCUS_LEFT:
                            if (this.itemDetModuleMenuList.getFocusItem().dataElement.isMaskActive && this.itemDetModuleMenuList.getFocusItem().domElement.getPin() != "")this.itemDetModuleMenuList.getFocusItem().domElement.removePin();
                            else {
                                fw.log.debug("ScenarioItemDetail : keyHandler : checking if can move left : this.totalMoviesCount : " + this.totalMoviesCount);
                                if (this.totalMoviesCount != undefined && this.totalMoviesCount > 1) {
                                    this.isMeerTvShown = false;
                                    this.isThermCondShown = false;
                                    this.navigateLeftMovies()
                                }
                            }
                            break;
                        case this.FOCUS_DETAIL:
                            this.itemDetModuleItemDetails.focusOff(this.hasMultiItems);
                            this.itemDetModuleMenuList.focusOn();
                            this.currentFocus = this.FOCUS_LEFT;
                            break;
                        case this.FOCUS_SMARTVIEW:
                            if (this.itemDetModuleItemDetails.isCusrsorSmartViewInFirstPosition()) {
                                this.itemDetModuleItemDetails.offSmartview();
                                this.itemDetModuleMenuList.setFocusOnProgInfoButton();
                                if (this.smartViewTimeUpdate != undefined && this.smartViewTimeUpdate != null) {
                                    clearTimeout(this.smartViewTimeUpdate);
                                    this.smartViewTimeUpdate = null
                                }
                                var _this = this;
                                setTimeout(function () {
                                    _this.itemDetModuleInfo.setInfoByMovie(_this.movie, true, true)
                                }, 1);
                                this.currentFocus = this.FOCUS_SMARTVIEW_MENU
                            } else this.itemDetModuleItemDetails.leftSmartview();
                            break
                    }
                    break;
                case fw.keys.code.DOWN:
                    switch (this.currentFocus) {
                        case this.FOCUS_SMARTVIEW_MENU:
                        case this.FOCUS_LEFT:
                            this.itemDetModuleMenuList.moveFocusToDown();
                            break;
                        case this.FOCUS_DETAIL:
                            this.itemDetModuleItemDetails.moveToDown();
                            break;
                        case this.FOCUS_SMARTVIEW:
                            this.itemDetModuleItemDetails.downSmartview();
                            break
                    }
                    break;
                case fw.keys.code.UP:
                    switch (this.currentFocus) {
                        case this.FOCUS_SMARTVIEW_MENU:
                        case this.FOCUS_LEFT:
                            this.itemDetModuleMenuList.moveFocusToUp();
                            break;
                        case this.FOCUS_DETAIL:
                            this.itemDetModuleItemDetails.moveToUp();
                            break;
                        case this.FOCUS_SMARTVIEW:
                            this.itemDetModuleItemDetails.upSmartview();
                            break
                    }
                    break;
                case fw.keys.code.OK:
                    switch (this.currentFocus) {
                        case this.FOCUS_SMARTVIEW_MENU:
                        case this.FOCUS_LEFT:
                            if (fw.mediaManager.getPlaybackType() !=
                                fw.mediaManager.PlaybackType.DTV) {
                                fw.log.debug("OK key locked in menu while VOD/SOTV is still playing");
                                return
                            }
                            if (!this.lockNavLeftMenu)if (this.conf.menuTopButton != undefined && (this.conf.menuTopButton.isPresent != undefined && (this.conf.menuTopButton.isPresent && this.itemDetModuleMenuList.isTopElementSelected())))this.appObj.init(this.conf.menuTopButton.inputObjTopButton); else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "OKOnPlayTrailer")this.doContentShow(this.itemDetModuleMenuList.getFocusItem().dataElement.action);
                            else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "OKOnPlayVideo") {
                                this.itemDetModuleMenuList.getFocusItem().domElement.focusOn();
                                this.checkTypeVod(this.itemDetModuleMenuList.getFocusItem().dataElement.action)
                            } else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "Use_Voucher") {
                                var popupVoucherName = new Object;
                                popupVoucherName.hasLiveVideo = this.conf.hasLiveVideo;
                                popupVoucherName.movie = this.movie;
                                fw.popupManager.showPopup(fw.conf.popupVoucherName, popupVoucherName,
                                    this.popupVoucherNameCallback, this)
                            } else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "BuyNoPin")fw.mwManager.rentVOD(this.movie, null, null, this.rentVODCallBack, this, null, true); else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "SmartView")if (this.itemDetModuleMenuList.getSelectedItem().dataElement != null && this.itemDetModuleMenuList.getSelectedItem().dataElement.action === "SmartView") {
                                this.itemDetModuleMenuList.focusOff();
                                this.itemDetModuleItemDetails.onSmartview();
                                this.currentFocus = this.FOCUS_SMARTVIEW
                            } else this.manageSmartView(); else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "programma_info")if (this.isThermCondShown) {
                                this.itemDetModuleItemDetails.setTitle(this.movie.title);
                                this.itemDetModuleItemDetails.setDescription(this.movie.longDescription);
                                this.isThermCondShown = false;
                                this.isMeerTvShown = false;
                                this.populateMenuList(this, false)
                            } else {
                                this.itemDetModuleItemDetails.cleanMeerTvInfo();
                                this.manageSmartView()
                            } else if (this.isLessInfoPresent &&
                                this.itemDetModuleMenuList.getFocusItem().dataElement.action === "moreInfo") {
                                if (this.itemDetModuleItemDetails.isSmartViewShown())this.manageSmartView();
                                this.currentFocus = this.FOCUS_DETAIL;
                                this.itemDetModuleMenuList.focusOff();
                                var _this = this;
                                setTimeout(function () {
                                    _this.itemDetModuleItemDetails.focusOn()
                                }, 0)
                            } else if (this.itemDetModuleMenuList.getFocusItem().dataElement.action === "Therm&Cond" && !this.isThermCondShown) {
                                if (this.itemDetModuleItemDetails.isSmartViewShown()) {
                                    this.itemDetModuleItemDetails.cleanMeerTvInfo();
                                    this.manageSmartView()
                                }
                                this.itemDetModuleItemDetails.setTitle(eval("this.appObj.messages." + this.conf.label_Therm));
                                this.itemDetModuleItemDetails.setDescription(eval("this.appObj.messages." + this.conf.Txt_Therm));
                                this.isThermCondShown = true;
                                this.populateMenuList(this, false);
                                this.itemDetModuleMenuList.setFocusOnElementByName("action", "programma_info", true)
                            }
                            break;
                        case this.FOCUS_DETAIL:
                            this.itemDetModuleItemDetails.focusOff();
                            this.itemDetModuleMenuList.focusOn();
                            this.currentFocus = this.FOCUS_LEFT;
                            break;
                        case this.FOCUS_SMARTVIEW:
                            if (this.smartViewLink != null) {
                                fw.mwManager.openOTT(this.smartViewLink);
                                this.itemDetModuleItemDetails.cleanMeerTvInfo()
                            }
                            break
                    }
                    break;
                case fw.keys.code.BACK:
                    this.currentFocus = this.FOCUS_LEFT;
                    if (this.isOttPresent && this.itemDetModuleItemDetails.isSmartViewShown()) {
                        this.itemDetModuleItemDetails.removeSmartview();
                        this.itemDetModuleMenuList.focusOn()
                    }
                    if (this.inputObj[1].action != undefined && this.inputObj[1].action == "banner") {
                        this.appObj.cleanParentalControl();
                        var obj = new Object;
                        if (this.appObj.getLastScenarioDataInHistory() !=
                            undefined) {
                            obj.action = "backHistory";
                            obj.origin = "fromBanner";
                            this.appObj.getLastScenarioDataInHistory().scenarioInputObj = obj
                        }
                        this.appObj.init(new Array(fw.conf.backLabel, obj))
                    } else if (this.inputObj.fromNative != null && (this.inputObj.fromNative != undefined && this.inputObj.fromNative == true)) {
                        fw.log.debug("back to NATIVE App");
                        fw.mwManager.goBackInHistory()
                    } else {
                        fw.log.debug("back to HTML App");
                        try {
                            var param = new Array(fw.util.cloneAllObjectType(this.movie), this.updateCatalog, fw.util.cloneAllObjectType(this.category));
                            this.appObj.getLastScenarioDataInHistory().scenarioInputObj = this.appObj.getLastScenarioDataInHistory().scenarioInputObj.concat(param);
                            this.appObj.init(new Array(fw.conf.backLabel, this.movie))
                        } catch (ex) {
                            this.appObj.init(new Array(fw.conf.backLabel, this.movie))
                        }
                    }
                    break;
                case fw.keys.code.YELLOW:
                    this.buttonYellowFunction();
                    break;
                case fw.keys.code.BLUE:
                    if (this.conf.footerElementsDetail.ItemDetButtonBlue != undefined && this.conf.footerElementsDetail.ItemDetButtonBlue.isPresent)fw.overlayManager.showOptionMenu(this.itemDetOptionMenuArray,
                        this.vodDetailsOptionMenuCallback, this);
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
                    if (this.conf.Context_sensitive_help != undefined)fw.appManager.goToHtmlApp("Help", null, this.conf.Context_sensitive_help, false, true);
                    break;
                case fw.keys.code.CHANNEL_UP:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneUp();
                    break;
                case fw.keys.code.CHANNEL_DOWN:
                    if (fw.mwManager.getUpDownZappingSetting())fw.mediaManager.tuneDown();
                    break
            }
            if (fw.keys.keyCodeAsString(_evt.keyCode) != null) {
                var num = fw.keys.keyCodeAsString(_evt.keyCode);
                switch (this.currentFocus) {
                    case this.FOCUS_SMARTVIEW_MENU:
                    case this.FOCUS_LEFT:
                        if (!this.lockNavLeftMenu)if (this.itemDetModuleMenuList.getFocusItem().dataElement.isMaskActive == true && !this.itemDetModuleMenuList.isTopElementSelected()) {
                            if (!this.itemDetModuleMenuList.getFocusItem().domElement.isFull()) {
                                this.itemDetModuleMenuList.getFocusItem().domElement.addPin(num);
                                if (this.itemDetModuleMenuList.getFocusItem().domElement.isFull())this.doPurchase(this.itemDetModuleMenuList.getFocusItem().domElement.getPin())
                            }
                        } else this.ItemDetChanNumTxt.setTxt(num);
                        break;
                    case this.FOCUS_DETAIL:
                        this.ItemDetChanNumTxt.setTxt(num);
                        break
                }
            }
        } catch (ex) {
            ex.errMethod = "keyHandler";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    keyHandlerUp: function (_evt) {
        switch (_evt.keyCode) {
            case fw.keys.code.DOWN:
                fw.log.info("DOWN_UP");
                break;
                break;
            case fw.keys.code.UP:
                fw.log.info("UP_UP");
                break
        }
    },
    showFooterInsCode: function () {
        try {
            this.buttonOk.hide();
            this.buttonOkTxt.hide();
            this.menuLeftCode.show()
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "showFooterInsCode";
            fw.err(ex)
        }
    },
    setLeftMenuNav: function (_txt) {
        try {
            this.menuLeftCode.hide();
            this.buttonOk.show();
            this.buttonOkTxt.show();
            this.buttonOkTxt.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setLeftMenuNav";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    hideHorizNav: function () {
        try {
            this.buttonNavigate.hide();
            this.buttonNavigateTxt.hide()
        } catch (ex) {
            ex.errMethod = "hideHorizNav";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    showHorizNav: function () {
        try {
            this.buttonNavigate.show();
            this.buttonNavigateTxt.show()
        } catch (ex) {
            ex.errMethod = "showHorizNav";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    showButtonYellow: function () {
        try {
            if (this.buttonYellow != null && this.buttonYellowTxt != null) {
                this.buttonYellow.show();
                this.buttonYellowTxt.show()
            }
        } catch (ex) {
            ex.errMethod = "showButtonYellow";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    hideButtonYellow: function () {
        try {
            if (this.buttonYellow != null && this.buttonYellowTxt != null) {
                this.buttonYellow.hide();
                this.buttonYellowTxt.hide()
            }
        } catch (ex) {
            ex.errMethod = "hideButtonYellow";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    loadFooter: function () {
        try {
            var conf = this.conf.footerElementsDetail;
            if (fw.subscriberDataManager.userEnabledOTT() && this.conf.footerElementsDetailOtt != undefined)conf = this.conf.footerElementsDetailOtt;
            this.contFooter = fw.cssBuilder.createDiv(this.id + "_ContFooterElement", conf.ItemDetContFooter.style);
            this.getScenObj().appendChild(this.contFooter);
            if (conf != undefined) {
                if (conf.ItemDetButtonBlue !=
                    undefined && conf.ItemDetButtonBlue.isPresent) {
                    this.buttonOpties = cssUtil.addElementToDom(Image, "ItemDetButtonBlue", conf.ItemDetButtonBlue, this.getScenObj());
                    this.TxtOpties = cssUtil.addElementToDom(Text, "ItemDetTxtBlue", conf.ItemDetTxtButtonBlue, this.getScenObj());
                    this.TxtOpties.setTxt(eval("this.appObj.messages." + conf.ItemDetTxtButtonBlue.txt))
                }
                if (conf.buttonYellow != undefined && conf.buttonYellow.isPresent) {
                    this.buttonYellow = cssUtil.addElementRelativeInLineToDom(Image, "buttonYellow", conf.buttonYellow,
                        this.contFooter);
                    this.buttonYellowTxt = cssUtil.addElementRelativeInLineToDom(Text, "buttonYellowTxt", conf.buttonYellowTxt, this.contFooter)
                } else {
                    this.buttonYellow = null;
                    this.buttonYellowTxt = null
                }
                if (conf.buttonNavigate != undefined && conf.buttonNavigate.isPresent) {
                    this.buttonNavigate = cssUtil.addElementRelativeInLineToDom(Image, "buttonNavigate", conf.buttonNavigate, this.contFooter);
                    this.buttonNavigate.hide();
                    this.buttonNavigateTxt = cssUtil.addElementRelativeInLineToDom(Text, "buttonNavigateTxt", conf.buttonNavigateTxt,
                        this.contFooter);
                    this.buttonNavigateTxt.hide();
                    this.buttonNavigateTxt.setTxt(eval("this.appObj.messages." + conf.buttonNavigateTxt.txt))
                }
                if (conf.buttonOk != undefined && conf.buttonOk.isPresent)if (!fw.subscriberDataManager.userEnabledOTT()) {
                    this.buttonOk = cssUtil.addElementRelativeInLineToDom(Image, "buttonOk", conf.buttonOk, this.contFooter);
                    this.buttonOkTxt = cssUtil.addElementRelativeInLineToDom(Text, "buttonOkTxt", conf.buttonOkTxtCut, this.contFooter);
                    this.menuLeftCode = cssUtil.addElementRelativeInLineToDom(Text,
                        "menuLeftCode", conf.menuLeftCodeCut, this.contFooter);
                    this.menuLeftCode.setTxt(eval("this.appObj.messages." + conf.menuLeftCodeCut.txt))
                } else {
                    this.buttonOk = cssUtil.addElementRelativeInLineToDom(Image, "buttonOk", conf.buttonOk, this.contFooter);
                    this.buttonOkTxt = cssUtil.addElementRelativeInLineToDom(Text, "buttonOkTxt", conf.buttonOkTxt, this.contFooter);
                    this.menuLeftCode = cssUtil.addElementRelativeInLineToDom(Text, "menuLeftCode", conf.menuLeftCode, this.contFooter);
                    this.menuLeftCode.setTxt(eval("this.appObj.messages." +
                        conf.menuLeftCode.txt))
                }
            }
        } catch (ex) {
            ex.errMethod = "LoadFooter";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    createVodDetailOptionMenuArray: function () {
        try {
            var optMenuConfObj = this.conf.optionMenuConf;
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
            this.itemDetOptionMenuArray = optMenuObj;
            fw.log.info("END - vcCreateItemDetailOptionMenuObjects")
        } catch (ex) {
            ex.errMethod = "createVodDetailOptionMenuArray";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    vodDetailsOptionMenuCallback: function (_obj) {
        try {
            if (_obj != null)switch (_obj[0].toLowerCase()) {
                case "watchtv":
                    fw.mwManager.watchDTV();
                    break;
                case "searchinall":
                    fw.mwManager.openSearch("", "", "");
                    break;
                case "searchinvideotheek":
                    fw.log.debug("categoryPath: " + this.categoryPath);
                    fw.mwManager.openSearch("VOD",
                        "VOD", "");
                    break;
                case "searchinprogrammagemist":
                    fw.mwManager.openSearch("PG", "PG", this.categoryPath);
                    break;
                case "renteditems":
                    var currApp = this.appObj.id;
                    if (currApp.toLowerCase() == "vodcatalogue")this.appObj.init(new Array("Catalogue", "MijnGehuurde")); else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin", new Array("Catalogue", "MijnGehuurde"), false, true);
                    break
            }
        } catch (ex) {
            ex.errMethod = "vodDetailsOptionMenuCallback";
            ex.errClass = "ScenarioItemDetail";
            fw.err(ex)
        }
    },
    lockKeyBoard: function () {
        try {
            fw.keys.lockOneTime()
        } catch (ex) {
            ex.errMethod =
                "lockKeyBoard";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    },
    unLockKeyBoard: function () {
        try {
            fw.keys.unLockOneTime()
        } catch (ex) {
            ex.errMethod = "unLockKeyBoard";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    },
    keyHandlerUp: function (_evt) {
        try {
            switch (_evt.keyCode) {
                case fw.keys.code.RIGHT:
                    if (this.currentFocus == this.FOCUS_LEFT && (this.totalMoviesCount != undefined && (this.totalMoviesCount > 1 && this.updateMenuTimer != null)))this.lockKeyBoard();
                    break;
                case fw.keys.code.LEFT:
                    if (this.currentFocus == this.FOCUS_LEFT && (this.totalMoviesCount !=
                        undefined && (this.totalMoviesCount > 1 && this.updateMenuTimer != null)))this.lockKeyBoard();
                    break
            }
        } catch (ex) {
            ex.errMethod = "keyHandlerUp";
            ex.errClass = "ScenarioTVOY";
            fw.err(ex)
        }
    },
    show: function () {
        fw.log.debug("Show Detail");
        fw.keys.setHandlerUp(this, this.keyHandlerUp)
    },
    hide: function () {
        fw.log.debug("Hide Detail");
        fw.keys.setHandlerUp(null, null)
    },
    onHide: function () {
        fw.log.debug("OnHide Detail")
    }
});
var ItemLeftPinButton = Class.create({
    initialize: function (_title, _isMaskActive, _action) {
        this.name = _title;
        this.contentTitle = _title;
        this.isMaskActive = _isMaskActive;
        this.action = _action
    }
});
