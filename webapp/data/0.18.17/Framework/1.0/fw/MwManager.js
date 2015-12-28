var MwManager = Class.create({
    initialize: function () {
        this.currentRequestId = -1;
        this.subCategoriesCached = null;
        this.currentSubCategoryCached = -1;
        this.categoriesCached = null;
        this.PluginManagerHTMLApplicationType = fw.UTC.PluginManager.HTMLApplicationType;
        this.PluginManagerErrorCode = fw.UTC.PluginManager.ErrorCode;
        this.isNetFlixAcceptedVar = false;
        fw.UTC.Miscellaneous.getHTMLUiVersion = this.getHTMLUiVersion
    },
    initForUTC: function () {
        try {
            fw.UTC.PluginManager.onShow = function (_url, _state, _applicationType, _params) {
                try {
                    fw.log.debug("onShow invoked passing _url:" +
                        _url + ", _state:" + _state + ", _applicationType:" + _applicationType + ", _params", _params);
                    var applicationId = null;
                    if (_applicationType == eval("fw.mwManager.PluginManagerHTMLApplicationType." + fw.conf.linkApplicationType))
                        if (_params != undefined && (_params != null && (_params.applicationId != undefined && _params.applicationId != null))) applicationId = _params.applicationId;
                        else {
                            if (_state != undefined && (_state != null && (_state.applicationId != undefined && _state.applicationId != null))) applicationId = _state.applicationId
                        } else {
                        var applicationIdString =
                            fw.mwManager.getApplicationStringFromApplicationId(_applicationType);
                        applicationId = fw.autoUpdate.getApplicationIdFromApplicationType(applicationIdString)
                    }
                    if (applicationId != null && applicationId != undefined) {
                        var checkOnPackages = fw.subscriberDataManager.checkUserPackageList(fw.autoUpdate.getAppRequiredPackages(applicationId));
                        if (checkOnPackages) {
                            fw.appManager.isHtmlApplicationShown = true;
                            fw.log.info("onShow : user has rights to access the App : " + applicationId);
                            return fw.mwManager.createErrorReport(fw.mwManager.PluginManagerErrorCode.Success,
                                null)
                        } else {
                            fw.log.info("onShow : user hasn't rights to access the App : " + applicationId);
                            return fw.mwManager.createErrorReport(fw.mwManager.PluginManagerErrorCode.InsufficientSubscriptions, fw.messages.packageUnsubscribedMessage)
                        }
                    } else {
                        fw.log.info("onShow : application id is undefined");
                        return fw.mwManager.createErrorReport(fw.mwManager.PluginManagerErrorCode.OtherError, null)
                    }
                } catch (ex) {
                    ex.errMethod = "onShow";
                    ex.errClass = "MwManager";
                    fw.err(ex)
                }
            }, fw.UTC.PluginManager.onHidden = function () {
                try {
                    fw.log.debug("onHidden invoked");
                    fw.appManager.isHtmlApplicationShown = false;
                    if (fw.appManager != undefined && (fw.appManager.currentApp != undefined && fw.appManager.currentApp != null)) {
                        var currentAppId = fw.appManager.getCurrentApp();
                        if (fw.appManager.getAppInfo(currentAppId) != null && (fw.appManager.getAppInfo(currentAppId) != undefined && (fw.appManager.getAppInfo(currentAppId).app != null && fw.appManager.getAppInfo(currentAppId).app != undefined))) fw.appManager.getAppInfo(currentAppId).app.onBrowserHide()
                    }
                    if (!fw.appManager.noAddToFwBackHistory) {
                        fw.log.debug("Add To Native BackHistory");
                        var objHistory = new Object;
                        objHistory.applicationId = fw.appManager.getAppInfo(currentAppId).app.id;
                        try {
                            objHistory.inputObj = fw.util.cloneAllObjectType(fw.appManager.getAppInfo(currentAppId).app.getCurrScenObj().getCurrentInputObj())
                        } catch (ex) {
                            fw.log.error("AppManager getCurrentInputObj method for back functionalities is not implemented in Scenario " + fw.appManager.getAppInfo(currentAppId).app.currentConfScenId);
                            objHistory.inputObj = new Array(fw.appManager.getAppInfo(currentAppId).app.currentConfScenId)
                        }
                        return objHistory
                    } else {
                        fw.log.debug("NO Add To Native BackHistory");
                        fw.appManager.noAddToFwBackHistory = false;
                        return null
                    }
                } catch (ex) {
                    ex.errMethod = "onHidden";
                    ex.errClass = "MwManager";
                    fw.err(ex)
                }
            }, fw.UTC.PluginManager.onShown.connect(fw.appManager.onShownManager);
            fw.UTC.PluginManager.onShowFailed.connect(fw.appManager.onShowFailedManager);
            fw.UTC.PluginManager.onHide.connect(fw.appManager.onHideManager);
            fw.UTC.PluginManager.onPopupPluginShow.connect(fw.popupManager.onPopupPluginShowManager);
            fw.UTC.PluginManager.onPopupPluginHide.connect(fw.popupManager.onPopupPluginHideManager);
            fw.UTC.Data.subscriberDataChanged.connect(fw.subscriberDataManager.updateSubscriberData);
            fw.UTC.Data.globalInstallChanged.connect(fw.subscriberDataManager.updateGlobalInstall);
            fw.UTC.Data.dtvlineupChanged.connect(fw.subscriberDataManager.updateDtvlineup);
            fw.UTC.PluginManager.onBackPressed = function () {
                try {
                    var evtKeyBack = new Object;
                    evtKeyBack.keyCode = fw.keys.code.BACK;
                    fw.keys._handleDown(evtKeyBack);
                    return true
                } catch (ex) {
                    ex.errMethod = "onBackPressed";
                    ex.errClass = "MwManager";
                    fw.err(ex)
                }
            }
        } catch (ex) {
            ex.errMethod =
                "initForUTC";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getHTMLUiVersion: function () {
        try {
            return fw.autoUpdate.getOnScreenReleaseVersion()
        } catch (ex) {
            ex.errMethod = "getHTMLUiVersion";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    preloadFinished: function () {
        try {
            fw.UTC.PluginManager.preloadFinished()
        } catch (ex) {
            ex.errMethod = "preloadFinished";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    goBackInHistory: function () {
        try {
            fw.navigationHistory.pop();
            if (fw.appManager != null && fw.appManager != undefined) {
                var currentAppId = fw.appManager.getCurrentApp();
                if (fw.appManager.getAppInfo(currentAppId) != null && (fw.appManager.getAppInfo(currentAppId) != undefined && (fw.appManager.getAppInfo(currentAppId).app != null && fw.appManager.getAppInfo(currentAppId).app != undefined))) {
                    fw.log.debug("goBackInHistory - pop scenarioHisotry");
                    fw.appManager.getAppInfo(currentAppId).app.scenariosHistoryPop()
                }
            }
            if (fw.appManager.getAppInfo(currentAppId).app.scenariosHistory.length == 0) {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setForceDestroy();
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.clearScenarioHistory()
            }
            fw.appManager.noAddToFwBackHistory =
                true;
            fw.UTC.PluginManager.goBackInHistory()
        } catch (ex) {
            ex.errMethod = "goBackInHistory";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSettings: function () {
        try {
            fw.UTC.PluginManager.openSettings()
        } catch (ex) {
            ex.errMethod = "openSettings";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openEPG: function (_type, _filter) {
        try {
            fw.appManager.noAddToFwBackHistory = false;
            fw.UTC.PluginManager.openEPG(_type, _filter)
        } catch (ex) {
            ex.errMethod = "openEPG";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openEPGDetail: function (_channelId, _startTime, _PINChecked) {
        try {
            fw.UTC.PluginManager.openEPGDetail(_channelId,
                _startTime, _PINChecked)
        } catch (ex) {
            ex.errMethod = "openEPGDetail";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openLiveFootballPortal: function () {
        try {
            fw.UTC.PluginManager.openLiveFootballPortal()
        } catch (ex) {
            ex.errMethod = "openLiveFootballPortal";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSDA: function () {
        try {
            fw.UTC.PluginManager.openSDA()
        } catch (ex) {
            ex.errMethod = "openSDA";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openMenu: function () {
        try {
            fw.appManager.toHistory = false;
            fw.appManager.noAddToFwBackHistory = true;
            fw.navigationHistory.clearHistory();
            if (fw.appManager.getCurrentApp() != null && (fw.appManager.getCurrentApp() != undefined && (fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != null && fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app != undefined))) {
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setForceDestroy();
                fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.clearScenarioHistory()
            }
            fw.UTC.PluginManager.openMenu()
        } catch (ex) {
            ex.errMethod = "openMenu";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    watchDTV: function (_channel) {
        try {
            fw.appManager.toHistory =
                false;
            fw.appManager.noAddToFwBackHistory = true;
            fw.navigationHistory.clearHistory();
            fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app.setForceDestroy();
            fw.UTC.PluginManager.watchDTV(_channel)
        } catch (ex) {
            ex.errMethod = "watchDTV";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    listenToRadio: function () {
        try {
            fw.UTC.PluginManager.listenToRadio()
        } catch (ex) {
            ex.errMethod = "listenToRadio";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    watchPVR: function (_recording, _position) {
        try {
            fw.UTC.PluginManager.watchPVR(_recording, _position)
        } catch (ex) {
            ex.errMethod =
                "watchPVR";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openIML: function (_url) {
        try {
            fw.UTC.PluginManager.openIML(_url)
        } catch (ex) {
            ex.errMethod = "openIML";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openMijnInfo: function () {
        try {
            var url = fw.UTC.Data.getDefaultURL();
            fw.UTC.PluginManager.openMijnInfo(url)
        } catch (ex) {
            ex.errMethod = "openMijnInfo";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openMyPackages: function () {
        try {
            var url = fw.mwManager.getUrlMyPackages();
            fw.UTC.PluginManager.openMijnInfo(url)
        } catch (ex) {
            ex.errMethod = "openMyPackages";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getUrlMyPackages: function () {
        try {
            var fips = fw.mwManager.getFIPS();
            if (fw.conf.myPackagesUrl != undefined)
                if (fw.conf.myPackagesUrl[fips] != undefined) return fw.conf.myPackagesUrl[fips];
                else if (fw.conf.myPackagesUrl["default"] != undefined) return fw.conf.myPackagesUrl["default"];
                else return fw.UTC.Data.getMyPackagesURL();
            else return fw.UTC.Data.getMyPackagesURL()
        } catch (ex) {
            ex.errMethod = "getUrlMyPackages";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSearch: function (_filter, _focus,
                          _category) {
        try {
            fw.UTC.PluginManager.openSearch(_filter, _focus, _category)
        } catch (ex) {
            ex.errMethod = "openSearch";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSearchEPGCategory: function (_category) {
        try {
            fw.UTC.PluginManager.openSearchEPGCategory(_category)
        } catch (ex) {
            ex.errMethod = "openSearchEPGCategory";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openPVR: function () {
        try {
            fw.UTC.PluginManager.openPVR()
        } catch (ex) {
            ex.errMethod = "openPVR";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openRecordingDetails: function (_channelId, _programRefNum,
                                    _programStartTime, _startDeltaTime, _PINchecked) {
        try {
            fw.UTC.PluginManager.openRecordingDetails(_channelId, _programRefNum, _programStartTime, _startDeltaTime, _PINchecked)
        } catch (ex) {
            ex.errMethod = "openRecordingDetails";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openTeletext: function () {
        try {
            fw.UTC.PluginManager.openTeletext()
        } catch (ex) {
            ex.errMethod = "openTeletext";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getCurrentItem: function () {
        try {
            return fw.UTC.OD.getCurrentItem()
        } catch (ex) {
            ex.errMethod = "getCurrentItem";
            ex.errClass =
                "MwManager";
            fw.err(ex)
        }
    },
    isItemRented: function (_movie) {
        try {
            return fw.UTC.OD.isItemRented(_movie)
        } catch (ex) {
            ex.errMethod = "isItemRented";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getItemExpiryTime: function (_movie) {
        try {
            return fw.UTC.OD.getItemExpiryTime(_movie)
        } catch (ex) {
            ex.errMethod = "getItemExpiryTime";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isVVSserverActive: function () {
        try {
            return fw.UTC.OD.isVVSserverActive()
        } catch (ex) {
            ex.errMethod = "isVVSserverActive";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getDiscountPrice: function (_voucherCode,
                                _movie, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OD.getDiscountPrice(requestId, _voucherCode, _movie);
            return true
        } catch (ex) {
            ex.errMethod = "getDiscountPrice";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    rentVOD: function (_movie, _voucherCode, _discountPrice, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams, _lockKeys) {
        try {
            fw.log.debug("*** DO RENT VOD ***");
            fw.keys.lockOneTime();
            if (_lockKeys != undefined && _lockKeys) fw.keys.lock();
            if (_discountPrice == undefined || _discountPrice == null) _discountPrice = 0;
            if (_voucherCode == undefined || _voucherCode == null) _voucherCode = "";
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OD.rentVOD(requestId, _movie, _voucherCode, _discountPrice);
            return true
        } catch (ex) {
            ex.errMethod = "rentVOD";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getCategory: function (_searchParameters,
                           _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams, "getCategory");
            fw.UTC.OD.getCategory(requestId, _searchParameters);
            return true
        } catch (ex) {
            ex.errMethod = "getCategory";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getCategoryFromCategoryPath: function (_categoryPath, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            if (this.categoriesCached != null && this.categoriesCached[_categoryPath] !=
                undefined) _callerCallbackFunction.apply(_callerCallbackOwner, [_callerCallbackParams, this.categoriesCached[_categoryPath]]);
            else {
                var categorySearchparams = new Object;
                categorySearchparams.searchField = fw.conf.filterCategoryPath;
                categorySearchparams.searchValue = _categoryPath;
                categorySearchparams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
                return this.getCategory(categorySearchparams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }
        } catch (ex) {
            ex.errMethod = "getCategoryFromCategoryPath";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getCategoryFromCategoryId: function (_categoryId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            if (this.categoriesCached != null && this.categoriesCached[_categoryId] != undefined) _callerCallbackFunction.apply(_callerCallbackOwner, [_callerCallbackParams, this.categoriesCached[_categoryId]]);
            else {
                var categorySearchparams = new Object;
                categorySearchparams.searchField = fw.conf.filterCategoryId;
                categorySearchparams.searchValue = _categoryId;
                categorySearchparams.skipParentalControlCheck =
                    this.getSkipParentalControlCheckValue();
                return this.getCategory(categorySearchparams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }
        } catch (ex) {
            ex.errMethod = "getCategoryFromCategoryId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getCategoryFromCategoryExternalId: function (_categoryExternalId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var categorySearchparams = new Object;
            categorySearchparams.searchField = fw.conf.filterCategoryExternalId;
            categorySearchparams.searchValue =
                _categoryExternalId;
            categorySearchparams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
            return this.getCategory(categorySearchparams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getCategoryFromCategoryId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSkipParentalControlCheckValue: function () {
        try {
            var parentalControlSets = this.getParentalControlSettings();
            return this.isTimerActive() || (parentalControlSets.enabled && parentalControlSets.showAllTitles || !parentalControlSets.enabled)
        } catch (ex) {
            ex.errMethod = "getSkipParentalControlCheckValue";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSubCategories: function (_searchParameters, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams, "getSubCategories");
            fw.log.debug("getSubCategory - requestId: ", requestId);
            fw.log.debug("getSubCategory -searchParameters: ", _searchParameters);
            fw.UTC.OD.getSubCategories(requestId,
                _searchParameters);
            return true
        } catch (ex) {
            ex.errMethod = "getSubCategories";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    subCategoriesPreCache: function (_callerCallbackParams, _categories) {
        try {
            if (this.subCategoriesCached == null) {
                this.subCategoriesCached = new Array;
                this.categoriesCached = new Array
            } else if (_categories != undefined && _categories != null) {
                this.subCategoriesCached[fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].path] = _categories;
                if (fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].categoryId !=
                    undefined) this.subCategoriesCached[fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].categoryId] = _categories;
                else this.subCategoriesCached[_categories[0].parentId] = _categories;
                if (fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].iterative)
                    for (var i = 0; i < _categories.length; i++) {
                        var obj = new Object;
                        obj.path = _categories[i].path;
                        obj.categoryId = _categories[i].categoryId;
                        obj.iterative = false;
                        fw.conf.cachedSubCategoriesPath.push(obj);
                        this.categoriesCached[_categories[i].categoryId] =
                            _categories[i];
                        this.categoriesCached[_categories[i].path] = _categories[i]
                    }
            }
            if (this.currentSubCategoryCached < fw.conf.cachedSubCategoriesPath.length - 1) {
                this.currentSubCategoryCached++;
                if (fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].isEnable != undefined && fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].isEnable) this.getSubCategoriesFromCategoryPath(fw.conf.cachedSubCategoriesPath[this.currentSubCategoryCached].path, this.subCategoriesPreCache, this, null);
                else this.subCategoriesPreCache(null,
                    null)
            }
        } catch (ex) {
            ex.errMethod = "subCategoriesPreCache";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    cleanSubCategoriesCached: function () {
        try {
            this.subCategoriesCached = null;
            this.currentSubCategoryCached = -1;
            this.subCategoriesPreCache(null, null)
        } catch (ex) {
            ex.errMethod = "cleanSubCategoriesCached";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSubCategoriesFromCategoryPath: function (_categoryPath, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            if (this.subCategoriesCached != null && this.subCategoriesCached[_categoryPath] !=
                undefined) _callerCallbackFunction.apply(_callerCallbackOwner, [_callerCallbackParams, this.subCategoriesCached[_categoryPath]]);
            else {
                var categorySearchparams = new Object;
                categorySearchparams.searchField = fw.conf.filterCategoryPath;
                categorySearchparams.searchValue = _categoryPath;
                categorySearchparams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
                return this.getSubCategories(categorySearchparams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }
        } catch (ex) {
            ex.errMethod =
                "getSubCategoriesFromCategoryPath";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSubCategoriesFromCategoryId: function (_categoryId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            if (this.subCategoriesCached != null && this.subCategoriesCached[_categoryId] != undefined) _callerCallbackFunction.apply(_callerCallbackOwner, [_callerCallbackParams, this.subCategoriesCached[_categoryId]]);
            else {
                var categorySearchparams = new Object;
                categorySearchparams.searchField = fw.conf.filterCategoryId;
                categorySearchparams.searchValue =
                    _categoryId;
                categorySearchparams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
                return this.getSubCategories(categorySearchparams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
            }
        } catch (ex) {
            ex.errMethod = "getSubCategoriesFromCategoryId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getBanner: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.Miscellaneous.getBanner(requestId)
        } catch (ex) {
            ex.errMethod = "getBanner";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMovies: function (_searchParameters, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            fw.mwManager.noFillMoviesResponse = false;
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.log.debug("getMovies - requestId: ", requestId);
            fw.log.debug("getMovies - searchParameters: ", _searchParameters);
            fw.mwManager.searchParametersForOtherCall =
                _searchParameters;
            fw.conf.getOtherItemsOffset = fw.conf.getOtherItemsFirstOffset;
            fw.UTC.OD.getMovies(requestId, _searchParameters);
            return true
        } catch (ex) {
            ex.errMethod = "getMovies";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    setSearchForOtherMovies: function (_searchParameters, _movies, _totalMoviesCount) {
        try {
            _searchParameters.count = fw.conf.numItemsFirstCall;
            fw.mwManager.searchParametersForOtherCall = _searchParameters;
            return fw.mwRequestManager.fillMovieList(_movies, _totalMoviesCount)
        } catch (ex) {
            ex.errMethod = "setSearchForOtherMovies";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    updateItems: function (_position, _obj, _objCaller, _objCallerFunction) {
        try {
            if (_obj.length > fw.conf.numItemsFirstCall) {
                var item = null;
                if (_obj[_position] != undefined && (_obj[_position].blockId != undefined && _obj[_position].blockId != -1)) item = _obj[_position];
                if (item != null && (fw.mwRequestManager.updateIndexDoneList[item.blockId] != undefined && fw.mwRequestManager.updateIndexDoneList[item.blockId] == false)) {
                    fw.log.debug("UPDATE FROM INDEX: " + item.blockId);
                    fw.conf.getOtherItemsOffset =
                        fw.conf.getOtherItemsSecondOffset;
                    fw.mwRequestManager.updateIndexDoneList[item.blockId] = true;
                    setTimeout(function () {
                        fw.mwManager.getOtherMovies(_obj, item.blockId, _objCaller, _objCallerFunction)
                    }, 0)
                }
            }
        } catch (ex) {
            ex.errMethod = "updateItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getUpIndexToCheck: function (_actualPos, _obj) {
        if (_actualPos - fw.conf.getOtherItemsOffset < 0) return _obj.length - 1;
        else return _actualPos - fw.conf.getOtherItemsOffset
    },
    getDownIndexToCheck: function (_actualPos, _obj) {
        if (_actualPos + fw.conf.getOtherItemsOffset >
            _obj.length) return 0;
        else return _actualPos + fw.conf.getOtherItemsOffset
    },
    getOtherMovies: function (_currentData, _startIndex, _objCaller, _objCallerFunction) {
        try {
            var callbackObject = new Object;
            callbackObject.currentData = _currentData;
            callbackObject.startIndex = _startIndex;
            callbackObject.objCaller = _objCaller;
            callbackObject.objCallerFunction = _objCallerFunction;
            var requestId = fw.mwRequestManager.setCallback(fw.mwManager.callbackGetOtherMovies, fw.mwManager, callbackObject, null, true);
            var searchParameters = fw.mwManager.searchParametersForOtherCall;
            searchParameters.startIndex = _startIndex;
            searchParameters.count = fw.conf.numItemsSingleCall;
            fw.mwManager.noFillMoviesResponse = true;
            this.currentRequestId = requestId.id;
            fw.UTC.OD.getMovies(requestId, searchParameters);
            return true
        } catch (ex) {
            ex.errMethod = "getOtherMovies";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    callbackGetOtherMovies: function (_callbackObject, _movies, _totalMoviesCount, _parentCategory, _requestId) {
        try {
            if (_callbackObject != undefined && _movies != undefined) {
                var currentData = _callbackObject.currentData;
                var startIndex = _callbackObject.startIndex;
                if (currentData != undefined && startIndex != undefined)
                    for (var i = 0; i < _movies.length; i++) {
                        currentData[i + startIndex] = $j.extend(currentData[i + startIndex], {
                            "blockId": -1
                        });
                        currentData[i + startIndex] = $j.extend(currentData[i + startIndex], _movies[i])
                    }
                if (_callbackObject != undefined && this.currentRequestId == _requestId)
                    if (_callbackObject.objCallerFunction != undefined && _callbackObject.objCaller != undefined) _callbackObject.objCallerFunction.apply(_callbackObject.objCaller, new Array(true,
                        currentData));
                _movies = null
            }
        } catch (ex) {
            ex.errMethod = "callbackGetOtherMovies";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    createMovieSearchParamsWithCategoryFilter: function (_area, _startIndex, _sortType, _searchField, _searchValue) {
        try {
            var movieSearchParams = new Object;
            movieSearchParams.area = _area;
            movieSearchParams.startIndex = _startIndex;
            if (_sortType == null || (_sortType == undefined || _sortType === "")) _sortType = fw.conf.storeTypeNone;
            movieSearchParams.sortType = _sortType;
            movieSearchParams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
            movieSearchParams.categoryCondition = new Object;
            movieSearchParams.moviesCondition = new Object;
            movieSearchParams.categoryCondition.searchField = _searchField;
            movieSearchParams.categoryCondition.searchValue = _searchValue;
            movieSearchParams.categoryCondition.onlyFirstSubCategory = true;
            movieSearchParams.moviesCondition.searchValue = "";
            return movieSearchParams
        } catch (ex) {
            ex.errMethod = "createMovieSearchParamsWithCategoryFilter";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    createMovieSearchParamsWithMovieFilter: function (_area,
                                                      _searchField, _searchValue, _sortType) {
        try {
            var movieSearchParams = new Object;
            movieSearchParams.area = _area;
            movieSearchParams.startIndex = 0;
            if (_sortType == null || (_sortType == undefined || _sortType === "")) _sortType = fw.conf.storeTypeNone;
            movieSearchParams.sortType = _sortType;
            movieSearchParams.skipParentalControlCheck = this.getSkipParentalControlCheckValue();
            movieSearchParams.moviesCondition = new Object;
            movieSearchParams.moviesCondition.searchField = _searchField;
            if (_searchValue != null && _searchValue != undefined) {
                movieSearchParams.moviesCondition.searchOperation =
                    fw.conf.searchCriteriaEquals;
                movieSearchParams.moviesCondition.searchValue = _searchValue
            }
            return movieSearchParams
        } catch (ex) {
            ex.errMethod = "createMovieSearchParamsWithMovieFilter";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromRentedItems: function (_startIndex, _sortType, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.vod, fw.conf.filterRentedMovies, null, _sortType);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getVodFromRentedItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromCategoryPath: function (_categoryPath, _startIndex, _sortType, _count, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithCategoryFilter(fw.conf.vod, _startIndex, _sortType, fw.conf.filterCategoryPath, _categoryPath);
            if (_count != undefined &&
                _count != null) movieSearchParams.count = _count;
            else movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getVodFromCategoryPath";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGFromCategoryPath: function (_categoryPath, _startIndex, _sortType, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithCategoryFilter(fw.conf.tvoy,
                _startIndex, _sortType, fw.conf.filterCategoryPath, _categoryPath);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getPGFromCategoryPath";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromCategoryId: function (_categoryId, _startIndex, _sortType, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithCategoryFilter(fw.conf.vod,
                _startIndex, _sortType, fw.conf.filterCategoryId, _categoryId);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getVodFromCategoryId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGFromCategoryId: function (_categoryId, _startIndex, _sortType, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithCategoryFilter(fw.conf.tvoy,
                _startIndex, _sortType, fw.conf.filterCategoryId, _categoryId);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getPGFromCategoryId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromExternalId: function (_externalId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.vod, fw.conf.filterExternalId,
                _externalId);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getVodFromExternalId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGFromExternalId: function (_externalId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.tvoy, fw.conf.filterExternalId, _externalId);
            movieSearchParams.count =
                fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getPGFromExternalId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromContentId: function (_contentId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.vod, fw.conf.filterMovieId, _contentId);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams,
                _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getVodFromContentId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGFromContentId: function (_contentId, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.tvoy, fw.conf.filterMovieId, _contentId);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner,
                _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getPGFromContentId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodFromAssetUrl: function (_assetUrl, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.vod, fw.conf.filterMovieAssetUrls, _assetUrl);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod =
                "getVodFromAssetUrl";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGFromAssetUrl: function (_assetUrl, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var movieSearchParams = this.createMovieSearchParamsWithMovieFilter(fw.conf.vod, fw.conf.filterMovieAssetUrls, _assetUrl);
            movieSearchParams.count = fw.conf.numItemsFirstCall;
            return this.getMovies(movieSearchParams, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getPGFromAssetUrl";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getAllRecentlyViewedFreeVODItems: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getRecentlyViewedFreeVODItems(requestId, fw.conf.all);
            return true
        } catch (ex) {
            ex.errMethod = "getAllRecentlyViewedFreeVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodRecentlyViewedFreeVODItems: function (_callerCallbackFunction, _callerCallbackOwner,
                                                _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getRecentlyViewedFreeVODItems(requestId, fw.conf.vod);
            return true
        } catch (ex) {
            ex.errMethod = "getVodRecentlyViewedFreeVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGRecentlyViewedFreeVODItems: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction,
                _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getRecentlyViewedFreeVODItems(requestId, fw.conf.tvoy);
            return true
        } catch (ex) {
            ex.errMethod = "getPGRecentlyViewedFreeVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getAllPaidVODItems: function (_startIndex, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getPaidVODItems(requestId, fw.conf.all,
                _startIndex, null);
            return true
        } catch (ex) {
            ex.errMethod = "getAllPaidVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getVodPaidVODItems: function (_startIndex, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getPaidVODItems(requestId, fw.conf.vod, _startIndex, null);
            return true
        } catch (ex) {
            ex.errMethod = "getVodPaidVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPGPaidVODItems: function (_startIndex, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getPaidVODItems(requestId, fw.conf.tvoy, _startIndex, null);
            return true
        } catch (ex) {
            ex.errMethod = "getPGPaidVODItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getRecordings: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId =
                fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getRecordings(requestId);
            return true
        } catch (ex) {
            ex.errMethod = "getRecordings";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPPVItems: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getPPVItems(requestId);
            return true
        } catch (ex) {
            ex.errMethod =
                "getPPVItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getRentalCost: function (_movie) {
        try {
            return fw.UTC.OD.getRentalCost(_movie)
        } catch (ex) {
            ex.errMethod = "getRentalCost";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getRentalDuration: function (_movie) {
        try {
            return fw.UTC.OD.getRentalDuration(_movie)
        } catch (ex) {
            ex.errMethod = "getRentalDuration";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getRentalDurationDayHourMins: function (_movie) {
        try {
            return fw.util.minsToTime(this.getRentalDuration(_movie))
        } catch (ex) {
            ex.errMethod = "getRentalDurationDayHourMins";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getRentalDurationHourMins: function (_movie) {
        try {
            return fw.util.minsToTime(this.getRentalDuration(_movie))
        } catch (ex) {
            ex.errMethod = "getRentalDurationHourMins";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getParentalControlSettings: function () {
        try {
            return fw.UTC.ParentalControl.getParentalControlSettings()
        } catch (ex) {
            ex.errMethod = "getParentalControlSettings";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isTimerActive: function () {
        try {
            return fw.UTC.ParentalControl.isTimerActive()
        } catch (ex) {
            ex.errMethod =
                "isTimerActive";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    disarm: function () {
        try {
            return fw.UTC.ParentalControl.disarm()
        } catch (ex) {
            ex.errMethod = "disarm";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getConnectionMode: function () {
        try {
            return fw.UTC.Data.getConnectionMode()
        } catch (ex) {
            ex.errMethod = "getConnectionMode";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    downloadTriggers: function () {
        try {
            return fw.UTC.Miscellaneous.downloadTriggers()
        } catch (ex) {
            ex.errMethod = "downloadTriggers";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSkinPackageVersion: function () {
        try {
            var skinPackageVersion =
                fw.UTC.Data.getSkinPackageVersion();
            if (skinPackageVersion == fw.conf.defaultSkinMapping) return fw.conf.defaultSkin;
            else return skinPackageVersion
        } catch (ex) {
            ex.errMethod = "getSkinPackageVersion";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSoftwareVersion: function () {
        try {
            if (fw.mwManager.SoftwareVersion == null || fw.mwManager.SoftwareVersion == undefined) fw.mwManager.SoftwareVersion = fw.UTC.Data.getSoftwareVersion();
            return fw.mwManager.SoftwareVersion
        } catch (ex) {
            ex.errMethod = "getSoftwareVersion";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getHardwareVersion: function () {
        try {
            if (fw.mwManager.HardwareVersion == null || fw.mwManager.HardwareVersion == undefined) fw.mwManager.HardwareVersion = fw.UTC.Data.getHardwareVersion();
            return fw.mwManager.HardwareVersion
        } catch (ex) {
            ex.errMethod = "getHardwareVersion";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMACAddress: function () {
        try {
            if (fw.mwManager.MACAddress == null || fw.mwManager.MACAddress == undefined) fw.mwManager.MACAddress = fw.UTC.Data.getMACAddress();
            return fw.mwManager.MACAddress
        } catch (ex) {
            ex.errMethod =
                "getMACAddress";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getTMServerName: function () {
        try {
            return fw.UTC.Data.getTMServerName()
        } catch (ex) {
            ex.errMethod = "getTMServerName";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getGroupsList: function () {
        try {
            return fw.UTC.Data.getGroupsList()
        } catch (ex) {
            ex.errMethod = "getGroupsList";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getAllPackages: function () {
        try {
            return fw.UTC.Data.getAllPackages()
        } catch (ex) {
            ex.errMethod = "getAllPackages";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSubscribedPackages: function () {
        try {
            return fw.UTC.Data.getSubscribedPackages()
        } catch (ex) {
            ex.errMethod =
                "getSubscribedPackages";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPackages: function (_userPackageIds) {
        try {
            return fw.UTC.Data.getPackages(_userPackageIds)
        } catch (ex) {
            ex.errMethod = "getPackages";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    setItems: function (_objectToSetInStorage) {
        try {
            return fw.UTC.Storage.setItems(_objectToSetInStorage)
        } catch (ex) {
            ex.errMethod = "setItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getItem: function (_prefName) {
        try {
            return fw.UTC.Storage.getItem(_prefName)
        } catch (ex) {
            ex.errMethod = "getItem";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getAllChannels: function () {
        try {
            return fw.UTC.Data.getAllChannels()
        } catch (ex) {
            ex.errMethod = "getAllChannels";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getDefaultURL: function () {
        try {
            return fw.UTC.Data.getDefaultURL()
        } catch (ex) {
            ex.errMethod = "getDefaultURL";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMyPackagesURL: function () {
        try {
            return fw.UTC.Data.getMyPackagesURL()
        } catch (ex) {
            ex.errMethod = "getMyPackagesURL";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isSettingsPINEnabled: function () {
        try {
            return fw.UTC.Data.isSettingsPINEnabled()
        } catch (ex) {
            ex.errMethod =
                "isSettingsPINEnabled";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isPurchasePINEnabled: function () {
        try {
            return fw.UTC.Data.isPurchasePINEnabled()
        } catch (ex) {
            ex.errMethod = "isPurchasePINEnabled";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    verifySettingsPIN: function (_pin) {
        try {
            return fw.UTC.Data.verifySettingsPIN(_pin)
        } catch (ex) {
            ex.errMethod = "verifySettingsPIN";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    verifyPurchasePIN: function (_pin) {
        try {
            return fw.UTC.Data.verifyPurchasePIN(_pin)
        } catch (ex) {
            ex.errMethod = "verifyPurchasePIN";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getFIPS: function () {
        try {
            if (fw.mwManager.FIPS == null || fw.mwManager.FIPS == undefined) fw.mwManager.FIPS = fw.UTC.Data.getFIPS();
            return fw.mwManager.FIPS
        } catch (ex) {
            ex.errMethod = "getFIPS";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getSubscriberId: function () {
        try {
            if (fw.mwManager.subscriberId == null || fw.mwManager.subscriberId == undefined) fw.mwManager.subscriberId = fw.UTC.Data.getSubscriberId();
            return fw.mwManager.subscriberId
        } catch (ex) {
            ex.errMethod = "getSubscriberId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getUpDownZappingSetting: function () {
        try {
            return fw.UTC.Data.getUpDownZappingSetting()
        } catch (ex) {
            ex.errMethod = "getUpDownZappingSetting";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMiniGuideTime: function () {
        try {
            return fw.UTC.Data.getMiniGuideTime()
        } catch (ex) {
            ex.errMethod = "getMiniGuideTime";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getChannelNameByChannelId: function (_channelId) {
        try {
            var channelRet = fw.subscriberDataManager.getChannelByChannelId(_channelId);
            if (channelRet != null && channelRet != undefined) return channelRet.displayChannelName;
            return ""
        } catch (ex) {
            ex.errMethod = "getChannelNameByChannelId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    createErrorReport: function (_errorCode, _errorMessage) {
        try {
            var errorReport = new Object;
            errorReport.errorCode = _errorCode;
            errorReport.errorMessage = _errorMessage;
            return errorReport
        } catch (ex) {
            ex.errMethod = "createErrorReport";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    sendVodGuideMessage: function (_categoryDisplayName) {
        try {
            fw.UTC.Miscellaneous.sendVodGuideMessage(_categoryDisplayName);
            fw.log.debug("sendVodGuideMessage",
                _categoryDisplayName)
        } catch (ex) {
            ex.errMethod = "sendVodGuideMessage";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    sendAVRRecord: function (eventId, eventType, avrVersion, isExternalIP, record) {
        try {
            fw.log.debug("sendAVRRecord: " + eventId + "|" + eventType + "|" + avrVersion + "|" + isExternalIP + "|" + record);
            fw.UTC.Miscellaneous.sendAVRRecord(eventId, eventType, avrVersion, isExternalIP, record)
        } catch (ex) {
            ex.errMethod = "sendAVRRecord";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getUserLanguage: function () {
        try {
            return fw.conf.defaultLanguage
        } catch (ex) {
            ex.errMethod =
                "getUserLanguage";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getApplicationStringFromApplicationId: function (_applicationType) {
        try {
            for (var appIdString in fw.UTC.PluginManager.HTMLApplicationType)
                if (fw.UTC.PluginManager.HTMLApplicationType[appIdString] == _applicationType) return appIdString;
            return null
        } catch (ex) {
            ex.errMethod = "getApplicationStringFromApplicationId";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getReminderTimeToStartDefaultValue: function () {
        try {
            return fw.UTCStub.Data.getReminderTimeToStartDefaultValue()
        } catch (ex) {
            ex.errMethod =
                "getReminderTimeToStartDefaultValue";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPPV: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.log.debug("getPPV - requestId: ", requestId);
            fw.UTCStub.PPV.getPPV(requestId);
            return true
        } catch (ex) {
            ex.errMethod = "getPPV";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isPPVRented: function (_ppvItem) {
        try {
            return fw.UTCStub.PPV.isPPVRented(_ppvItem)
        } catch (ex) {
            ex.errMethod =
                "isPPVRented";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getPPVRentalCost: function (_ppvItem) {
        try {
            return fw.UTCStub.PPV.getPPVRentalCost(_ppvItem)
        } catch (ex) {
            ex.errMethod = "getPPVRentalCost";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    rentPPV: function (_ppvItem, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTCStub.PPV.rentPPV(requestId, _ppvItem);
            return true
        } catch (ex) {
            ex.errMethod =
                "rentPPV";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getReminder: function (_ppvItem, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTCStub.Reminders.getReminder(requestId, _ppvItem);
            return true
        } catch (ex) {
            ex.errMethod = "getReminder";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    setReminder: function (_ppvItem, _reminderItem, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId =
                fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTCStub.Reminders.setReminder(requestId, _ppvItem, _reminderItem);
            return true
        } catch (ex) {
            ex.errMethod = "setReminder";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    updateReminder: function (_ppvItem, _reminderItem, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTCStub.Reminders.updateReminder(requestId,
                _ppvItem, _reminderItem);
            return true
        } catch (ex) {
            ex.errMethod = "updateReminder";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    deleteReminder: function (_ppvItem, _reminderItem, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTCStub.Reminders.deleteReminder(requestId, _ppvItem, _reminderItem);
            return true
        } catch (ex) {
            ex.errMethod = "deleteReminder";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSystemSettings: function () {
        try {
            fw.UTC.PluginManager.openSystemSettings()
        } catch (ex) {
            ex.errMethod = "openSystemSettings";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openSOTVDetails: function (_sotvItem, _PINChecked) {
        try {
            fw.UTC.PluginManager.openSOTVDetails(_sotvItem, _PINChecked)
        } catch (ex) {
            ex.errMethod = "openSOTVDetails";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openPPVDetails: function (_ppvItem, _PINChecked) {
        try {
            fw.UTC.PluginManager.openPPVDetails(_ppvItem, _PINChecked)
        } catch (ex) {
            ex.errMethod = "openPPVDetails";
            ex.errClass =
                "MwManager";
            fw.err(ex)
        }
    },
    getRentedSOTVItems: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.RentedItems.getRentedSOTVItems(requestId);
            return true
        } catch (ex) {
            ex.errMethod = "getRentedSOTVItems";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMessage: function (_id) {
        try {
            return fw.UTC.Messages.getMessage(_id)
        } catch (ex) {
            ex.errMethod = "getMessage";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMessagesList: function (_all) {
        try {
            var listMess = fw.UTC.Messages.getMessagesList(_all);
            return listMess
        } catch (ex) {
            ex.errMethod = "getMessagesList";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    markAsRead: function (_id) {
        try {
            return fw.UTC.Messages.markAsRead(_id)
        } catch (ex) {
            ex.errMethod = "markAsRead";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    markAsRemoved: function (_id) {
        try {
            return fw.UTC.Messages.markAsRemoved(_id)
        } catch (ex) {
            ex.errMethod = "markAsRemoved";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    openOTT: function (_url) {
        try {
            return fw.UTC.PluginManager.openOTT(_url)
        } catch (ex) {
            ex.errMethod =
                "openOTT";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getContextApplications: function (_context, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OTTIntegration.getContextApplications(requestId, _context);
            return requestId
        } catch (ex) {
            ex.errMethod = "getContextApplications";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getContextApplicationsForZender: function (_callerCallbackFunction,
                                               _callerCallbackOwner, _callerCallbackParams) {
        try {
            var contextForZender = {
                type: "PG",
                subType: "PerZenders"
            };
            return this.getContextApplications(contextForZender, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getContextApplicationsForZender";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getContextApplicationsForOmroep: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var contextForOmroep = {
                type: "PG",
                subType: "PerOmroep"
            };
            return this.getContextApplications(contextForOmroep,
                _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getContextApplicationsForOmroep";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getContextApplicationsForVodProviders: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var contextForVodProviders = {
                type: "VOD"
            };
            return this.getContextApplications(contextForVodProviders, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getContextApplicationsForVodProviders";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getContextApplicationsForMovie: function (_movieTitle, _categoryName, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            if (_categoryName != null && _categoryName != undefined) var contextForMovie = {
                type: "VOD",
                title: _movieTitle,
                catName: _categoryName
            };
            else var contextForMovie = {
                type: "VOD",
                title: _movieTitle
            };
            return this.getContextApplications(contextForMovie, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getContextApplicationsForMovie";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    forceReload: function () {
        try {
            return fw.UTC.PluginManager.forceReload()
        } catch (ex) {
            ex.errMethod = "forceReload";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isMovieComingSoon: function (_vodMovie) {
        try {
            return _vodMovie != null && (_vodMovie != undefined && (_vodMovie.commingSoonFlag == true || _vodMovie.licenceBeginDate != null && (_vodMovie.licenceBeginDate != undefined && _vodMovie.licenceBeginDate >= (new Date).getTime())))
        } catch (ex) {
            ex.errMethod = "isMovieComingSoon";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMovieRentalEndTimestamp: function (_vodMovie) {
        try {
            var ret = fw.mwManager.getItemExpiryTime(_vodMovie);
            return ret == null || ret == undefined ? 0 : ret
        } catch (ex) {
            ex.errMethod = "getMovieRentalEndTimestamp";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    getMovieRentalStartTimestamp: function (_vodMovie) {
        try {
            var rentalEnd = fw.mwManager.getItemExpiryTime(_vodMovie);
            var rentalDurationMin = fw.mwManager.getRentalDuration(_vodMovie);
            return rentalEnd - rentalDurationMin * 60 * 1E3
        } catch (ex) {
            ex.errMethod = "getMovieRentalEndTimestamp";
            ex.errClass =
                "MwManager";
            fw.err(ex)
        }
    },
    getChannelLogoCompleteUrl: function (_logoImgFile) {
        try {
            return fw.conf.protocolForTMImages + fw.mwManager.getTMServerName() + fw.conf.pathForTMImages + _logoImgFile
        } catch (ex) {
            ex.errMethod = "getChannelLogoCompleteUrl";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    setNetFlixAccepted: function () {
        try {
            fw.log.debug("setNetFlixAccepted");
            fw.mwManager.isNetFlixAcceptedVar = true;
            fw.UTC.PluginManager.NetflixConfirmationObtained()
        } catch (ex) {
            ex.errMethod = "setNetFlixAccepted";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isNetFlixAccepted: function () {
        try {
            fw.log.debug("isNetFlixAccepted", fw.mwManager.isNetFlixAcceptedVar);
            return fw.mwManager.isNetFlixAcceptedVar
        } catch (ex) {
            ex.errMethod = "isNetFlixAccepted";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    },
    isNetFlixAvailable: function () {
        try {
            var result = fw.UTC.PluginManager.isNetflixAvailable();
            fw.log.debug("isNetFlixAvailable", result);
            if (result != null && result != undefined) switch (result) {
                case fw.UTC.PluginManager.ErrorCode.Success:
                    fw.log.debug("isNetFlixAvailable - Success");
                    fw.mwManager.isNetFlixAcceptedVar =
                        true;
                    return true;
                    break;
                case fw.UTC.PluginManager.ErrorCode.NetflixNotAvailable:
                    fw.log.debug("isNetFlixAvailable - NetflixNotAvailable");
                    return false;
                    break;
                case fw.UTC.PluginManager.ErrorCode.NetflixNotProvisioned:
                    fw.log.debug("isNetFlixAvailable - NetflixNotProvisioned");
                    return false;
                    break;
                case fw.UTC.PluginManager.ErrorCode.NetflixCrashed:
                    fw.log.debug("isNetFlixAvailable - NetflixCrashed");
                    return false;
                    break;
                case fw.UTC.PluginManager.ErrorCode.NetflixConfirmationRequired:
                    fw.log.debug("isNetFlixAvailable - NetflixConfirmationRequired");
                    fw.mwManager.isNetFlixAcceptedVar = false;
                    return true;
                    break
            }
            return false
        } catch (ex) {
            ex.errMethod = "isNetFlixAvailable";
            ex.errClass = "MwManager";
            fw.err(ex);
            return false
        }
    },
    openNetFlix: function () {
        try {
            var source_type = 2;
            fw.UTC.PluginManager.startNetflix(source_type)
        } catch (ex) {
            ex.errMethod = "openNetFlix";
            ex.errClass = "MwManager";
            fw.err(ex)
        }
    }
});