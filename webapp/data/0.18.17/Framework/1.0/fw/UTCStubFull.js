var UTCStubFull = Class.create({
    initialize: function () {
        this.RequestIdGenerator = new Object;
        this.PluginManager = new Object;
        this.OD = new Object;
        this.ParentalControl = new Object;
        this.Storage = new Object;
        this.Miscellaneous = new Object;
        this.Data = new Object;
        this.Playback = new Object;
        this.RentedItems = new Object;
        this.Messages = new Object;
        this.OTTIntegration = new Object;
        this.OD.deltaTimeExpiryMs = 2592E5;
        this.OD.VVSServerActiveFlag = true;
        this.OD.isItemRentedDefault = false;
        this.OD.correctVoucherCode = "11111111";
        this.OD.discountPriceValue =
            1;
        this.OD.moviePriceValue = 3;
        this.OD.movieRentalDurationValue = 7445;
        this.OD.getCategoryInTimeout = false;
        this.OD.getSubcategoriesInTimeout = false;
        this.OD.getMoviesInTimeout = false;
        this.OD.maxReturnedMoviesSize = 100;
        this.ParentalControl.parentalControlDefaultSettings = new Object;
        this.ParentalControl.parentalControlDefaultSettings.enabled = true;
        this.ParentalControl.parentalControlDefaultSettings.showAllTitles = true;
        this.ParentalControl.parentalControlDefaultSettings.timeout = 100;
        this.ParentalControl.parentalControlDefaultSettings.ratings =
            new Array;
        this.ParentalControl.isTimerActiveDefault = false;
        this.Miscellaneous.bannerURLDefault = "../../stubJSON/banner/banner.xml";
        this.Data.connectionModeDefault = "ImplicitNAT";
        this.Data.skinPackageVersionDefault = "DefaultSkin";
        this.Data.getSoftwareVersionDefault = "3.0.5_1";
        this.Data.getHardwareVersionDefault = "Motorola_VIP1853";
        this.Data.getMACAddressDefault = "00:00:00:00:00:00";
        this.Data.getTMServerNameDefault = "";
        this.Data.getGroupsListDefault = [{"id": 1, "name": "Group1"}, {"id": 2, "name": "Group2"}, {
            "id": 3,
            "name": "Profiling_1"
        }];
        this.Data.getAllPackagesDefault = [{"packageId": 1}, {"packageId": 2}, {"packageId": 3}, {"packageId": 4}];
        this.Data.getSubscribedPackagesDefault = [1, 3, 4];
        this.Data.getAllChannelsDefault = [{
            "channelId": 1,
            "displayChannelName": "CHAN1",
            "isHD": false,
            "callLetter": "CHAN1"
        }, {"channelId": 2, "displayChannelName": "CHAN2", "isHD": true, "callLetter": "CHAN2"}, {
            "channelId": 3,
            "displayChannelName": "CHAN3",
            "isHD": false,
            "callLetter": "CHAN3"
        }];
        this.Data.getDefaultURLDefault = "";
        this.Data.getMyPackagesURLDefault =
            "";
        this.Data.isSettingsPINEnabledDefault = true;
        this.Data.isPurchasePINEnabledDefault = true;
        this.Data.correctSettingsPIN = "1111";
        this.Data.correctPurchasePIN = "2222";
        this.Data.getFIPSDefault = "000001";
        this.Data.getSubscriberIdDefault = "SUBSCRIBERID1";
        this.Data.getUpDownZappingSettingDefault = false;
        this.Data.getMiniGuideTimeDefault = 5;
        this.RentedItems.maxReturnedMoviesSize = 100;
        this.Playback.playbackTypeDefault = "VOD";
        this.RentedItems.getRentedSOTVItemsInTimeout = false;
        this.Messages.defaultMessagesArray = [{
            "displayDuration": 1,
            "displayTime": 0,
            "filters": {
                "hardwareVersion": "",
                "ipAddress": "",
                "locationId": "",
                "packageId": "",
                "softwareVersion": "",
                "uiLanguage": "",
                "uiVersion": "",
                "watchedChannelId": "0"
            },
            "id": 226,
            "isRead": false,
            "maxDelay": 0,
            "messageText": '{"ttl":"Welkom bij KPN interactieve TV","msg":"Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. Welkom bij KPN interactieve TV. U kunt via de help-knop meer informatie vinden over het gebruik van uw interactieve tv-ontvanger. ","tms":1397205824,"type":1}',
            "validityTime": 1415109600
        }];
        this.onHashChange = function () {
            var hashString = location.hash;
            var appString = hashString.split("#")[1];
            var inputData = appString.split("_");
            var paramsObj = new Object;
            paramsObj.applicationId = inputData[0];
            paramsObj.inputObj = "";
            for (i = 2; i < inputData.length; i++) {
                paramsObj.inputObj = paramsObj.inputObj + inputData[i];
                if (i < inputData.length - 1)paramsObj.inputObj = paramsObj.inputObj + "_"
            }
            fw.UTC.PluginManager.invokeSignalOnShown(null, fw.UTC.PluginManager.HTMLApplicationType.link, paramsObj, false)
        };
        if ("onhashchange"in window)window.addEventListener("hashchange", this.onHashChange, true);
        this.RequestIdGenerator.unique = function () {
            var time = (new Date).getTime();
            while (time == (new Date).getTime());
            var returnObj = new Object;
            returnObj.id = (new Date).getTime();
            return returnObj
        };
        this.RequestIdGenerator.empty = function () {
            return null
        };
        this.RequestIdGenerator.isPush = function (_requestId) {
            return false
        };
        this.RequestIdGenerator.equal = function (_id1, _id2) {
            return _id1.id === _id2.id
        };
        this.PluginManager.LCDIErrorCode = {
            LCDIErrorSuccess: 0,
            LCDIErrorInvalidKeyCode: 801,
            LCDIErrorParentalControlPinRequred: 802,
            LCDIErrorUserInputRequired: 803,
            LCDIErrorOperationNotAllowed: 804,
            LCDIErrorNoHDInterest: 805,
            LCDIErrorChannelNotPlayable: 806,
            LCDIErrorChannelNotSubscribed: 807,
            LCDIErrorChannelIsHidden: 808,
            LCDIErrorContentNeedsToBeRented: 809,
            LCDIErrorContentNotAvailable: 810,
            LCDIErrorFailedRecording: 811,
            LCDIErrorFutureRecording: 812,
            LCDIErrorUnknownRecording: 813,
            LCDIErrorProgramOutOfSchedule: 814,
            LCDIErrorChannelNotAvailable: 815,
            LCDIErrorInvalidCharacter: 816,
            LCDIErrorNotInTextEntry: 817
        };
        this.PluginManager.HTMLApplicationType = {
            link: 0,
            vodSearchResult: 1,
            vodDetailsLcdi: 2,
            vodDetailsIml: 3,
            pgSearchResult: 4,
            vodCategory: 5,
            playVodLcdi: 6,
            playVodIml: 7,
            playVodOtt: 8,
            help: 9,
            helpVideos: 10,
            showMessageDetails: 999,
            showMessagesList: 998
        };
        this.PluginManager.ErrorCode = {
            Success: 0,
            InsufficientSubscriptions: 1,
            ChannelNotAvailable: 2,
            ChannelNotSubscribed: 3,
            HDInterestDisabled: 4,
            ProgramOutofSchedule: 5,
            UnknownRecording: 6,
            OtherError: 132
        };
        this.PluginManager.LCDIErrorCode = {
            LCDIErrorSuccess: 0,
            LCDIErrorInvalidKeyCode: 801,
            LCDIErrorParentalControlPinRequred: 802,
            LCDIErrorUserInputRequired: 803,
            LCDIErrorOperationNotAllowed: 804,
            LCDIErrorNoHDInterest: 805,
            LCDIErrorChannelNotPlayable: 806,
            LCDIErrorChannelNotSubscribed: 807,
            LCDIErrorChannelIsHidden: 808,
            LCDIErrorContentNeedsToBeRented: 809,
            LCDIErrorContentNotAvailable: 810,
            LCDIErrorFailedRecording: 811,
            LCDIErrorFutureRecording: 812,
            LCDIErrorUnknownRecording: 813,
            LCDIErrorProgramOutOfSchedule: 814,
            LCDIErrorChannelNotAvailable: 815,
            LCDIErrorInvalidCharacter: 816,
            LCDIErrorNotInTextEntry: 817
        };
        this.PluginManager.LCDIOperationFinished = function (_errorCode) {
            return true
        };
        this.PluginManager.preloadFinished = function () {
            return true
        };
        this.PluginManager.goBackInHistory = function () {
            return true
        };
        this.PluginManager.LCDIOperationFinished = function (_errorCode) {
            return true
        };
        this.PluginManager.openSettings = function () {
            return true
        };
        this.PluginManager.openEPG = function (_type, _filter) {
            return true
        };
        this.PluginManager.openEPGDetail = function (_channelId, _startTime, _PINChecked) {
            return true
        };
        this.PluginManager.openLiveFootballPortal = function () {
            return true
        };
        this.PluginManager.openSDA = function () {
            return true
        };
        this.PluginManager.openMenu = function () {
            return true
        };
        this.PluginManager.watchDTV = function (_channel) {
            return true
        };
        this.PluginManager.listenToRadio = function () {
            return true
        };
        this.PluginManager.watchPVR = function (_recording, _position) {
            return true
        };
        this.PluginManager.openIML = function (_url) {
            return true
        };
        this.PluginManager.openMijnInfo = function (_url) {
            return true
        };
        this.PluginManager.openSearch =
            function (_filter, _focus, _category) {
                return true
            };
        this.PluginManager.openSearchEPGCategory = function (_category) {
            return true
        };
        this.PluginManager.openPVR = function () {
            return true
        };
        this.PluginManager.openRecordingDetails = function (_channelId, _programRefNum, _programStartTime, _startDeltaTime, _PINchecked) {
            return true
        };
        this.PluginManager.openTeletext = function () {
            return true
        };
        this.PluginManager.openSystemSettings = function () {
            return true
        };
        this.PluginManager.openSOTVDetails = function (_sotvItem, _PINChecked) {
            return true
        };
        this.PluginManager.openPPVDetails = function (_ppvItem, _PINChecked) {
            return true
        };
        this.PluginManager.openOTT = function (_url) {
            return true
        };
        this.PluginManager.forceReload = function () {
            return true
        };
        this.PluginManager.onShown = new Object;
        this.PluginManager.onShown.connect = function (f) {
            this.onShownFunction = f
        };
        this.PluginManager.onShown.disconnect = function (f) {
            this.onShownFunction = null
        };
        this.PluginManager.invokeSignalOnShown = function (_state, _applicationType, _params) {
            if (this.onShown.onShownFunction != null && this.onShown.onShownFunction !=
                undefined)this.onShown.onShownFunction.apply(fw.mwRequestManager, new Array(_state, _applicationType, _params))
        };
        this.PluginManager.onPopupPluginShow = new Object;
        this.PluginManager.onPopupPluginShow.connect = function (f) {
            this.onPopupPluginShowFunction = f
        };
        this.PluginManager.onPopupPluginShow.disconnect = function (f) {
            this.onPopupPluginShowFunction = null
        };
        this.PluginManager.invokeSignalOnPopupPluginShow = function () {
            if (this.onPopupPluginShow.onPopupPluginShowFunction != null && this.onPopupPluginShow.onPopupPluginShowFunction !=
                undefined)this.onPopupPluginShow.onPopupPluginShowFunction.apply(fw.popupManager)
        };
        this.PluginManager.onPopupPluginHide = new Object;
        this.PluginManager.onPopupPluginHide.connect = function (f) {
            this.onPopupPluginHideFunction = f
        };
        this.PluginManager.onPopupPluginHide.disconnect = function (f) {
            this.onPopupPluginHideFunction = null
        };
        this.PluginManager.invokeSignalOnPopupPluginHide = function () {
            if (this.onPopupPluginHide.onPopupPluginHideFunction != null && this.onPopupPluginHide.onPopupPluginHideFunction != undefined)this.onPopupPluginHide.onPopupPluginHideFunction.apply(fw.popupManager)
        };
        this.PluginManager.onShowFailed = new Object;
        this.PluginManager.onShowFailed.connect = function (f) {
            this.onShowFailedFunction = f
        };
        this.PluginManager.onShowFailed.disconnect = function (f) {
            this.onShowFailedFunction = null
        };
        this.PluginManager.invokeSignalOnShowFailed = function (_error) {
            if (this.onShowFailed.onShowFailedFunction != null && this.onShowFailed.onShowFailedFunction != undefined)this.onShowFailed.onShowFailedFunction.apply(fw.mwRequestManager, new Array(_error))
        };
        this.PluginManager.onHide = new Object;
        this.PluginManager.onHide.connect =
            function (f) {
                this.onHideFunction = f
            };
        this.PluginManager.onHide.disconnect = function (f) {
            this.onHideFunction = null
        };
        this.PluginManager.invokeSignalOnHide = function () {
            if (this.onHide.onHideFunction != null && this.onHide.onHideFunction != undefined)this.onHide.onHideFunction.apply(fw.mwRequestManager)
        };
        this.PluginManager.onBackPressed = function (f) {
            this.onBackPressedFunction = f
        };
        this.PluginManager.invokeCallbackOnBackPressed = function () {
            if (this.onBackPressedFunction != null && this.onBackPressedFunction != undefined)this.onBackPressedFunction.apply(fw.navigationHistory)
        };
        this.PluginManager.onShow = function (f) {
            this.onShowPressedFunction = f
        };
        this.PluginManager.invokeCallbackOnShow = function (_url, _state, _applicationType, _params) {
            if (this.onShowPressedFunction != null && this.onShowPressedFunction != undefined)this.onShowPressedFunction.apply(fw.appManager, new Array(_url, _state, _applicationType, _params))
        };
        this.PluginManager.onHidden = function (f) {
            this.onHiddenFunction = f
        };
        this.PluginManager.invokeCallbackOnHidden = function () {
            if (this.onHiddenFunction != null && this.onHiddenFunction != undefined)this.onHiddenFunction.apply(fw.appManager)
        };
        this.PluginManager.isNetflixAvailable = function () {
            return "success"
        };
        this.OD.RequestResult = {SUCCESS: 0, LCDIErrorInvalidKeyCode: 0, FAILURE: 1};
        this.OD.PlayResult = {
            PLAY_SUCCESS: 0,
            PLAY_FAILURE_UNKNOWN_ERROR: 1,
            PLAY_FAILURE_RC_DENIED: 2,
            PLAY_FAILURE_HAL: 3,
            PLAY_FAILURE_ITEM_NOT_RENTED: 4,
            PLAY_FAILURE_ITEM_NOT_SUBSCRIBED: 5,
            PLAY_FAILURE_RENTAL_SERVER_ERROR: 6,
            PLAY_FAILURE_RENTAL_NOT_AUTHORISED: -9,
            PLAY_FAILURE_HD_CONTENT_ON_SD_STB: -813,
            PLAY_FAILURE_HD_INTEREST_DISABLED: -814,
            PLAY_FAILURE_HD_RECEPTION_DISABLED: -815,
            PLAY_FAILURE_CONNECT_HDMI_OUTPUT: -816,
            PLAY_FAILURE_PC: -1015,
            PLAY_FAILURE_ITEM_NOT_FOUND: -40404,
            PLAY_FAILURE_VOD_SERVER_NOT_FOUND: -40462,
            PLAY_FAILURE_RC_CONFLICT: -4520
        };
        this.OD.StopReason = {
            STOP_REASON_USER_REQUEST: 0,
            STOP_REASON_HD_INTEREST_DISABLED: 1,
            STOP_REASON_RC_SERVICE_REQUEST: 2,
            STOP_REASON_END_OF_STREAM: 3,
            STOP_REASON_POWER_LEVEL_CHANGED: 4,
            STOP_REASON_STOPPED_BY_HAL: 5
        };
        this.OD.RentResult = {
            FREE: 0,
            ALREADY_RENTED: 1,
            CHARGED: 2,
            RENT_OK: 3,
            INCENTIVE_REDEEM: 4,
            INCENTIVE_EARN: 5,
            FCC: 6,
            FAILURE: -6,
            FAILURE_UNKNOWN: -7,
            RESOURCE_DENIED: -8,
            NOT_AUTHORISED: -9,
            INVALID_MASTER_PIN: -23,
            INVALID_PURCHASE_PIN: -37,
            REASON_POST_PAY_STB: -75,
            REASON_POST_PAY_TM: -76,
            REASON_HW_SD_ONLY: -813,
            NO_HD_INTEREST: -814,
            NO_HD_RECEPTION: -815,
            NOTSUBSCRIBED: -1014,
            RESOURCE_CONFLICT: -45200
        };
        this.OD.ErrorCode = {
            Success: 0,
            InsufficientSubscriptions: 1,
            ChannelNotAvailable: 2,
            ChannelNotSubscribed: 3,
            HDInterestDisabled: 4,
            ProgramOutofSchedule: 5,
            UnknownRecording: 6,
            OtherError: 132
        };
        this.OD.PlaybackStateEnum = {
            PLAYBACK_STATE_CONNECTING: 0,
            PLAYBACK_STATE_PLAY: 1,
            PLAYBACK_STATE_PAUSED: 2,
            PLAYBACK_STATE_PLAYING_IN_TIMESHIFT: 3,
            PLAYBACK_STATE_REW: 4,
            PLAYBACK_STATE_FFWD: 5,
            PLAYBACK_STATE_STOPPED: 6,
            PLAYBACK_STATE_BUFFERING: 7,
            PLAYBACK_STATE_ENDOFSTREAM: 8
        };
        this.OD.UTCOCIError = {
            NETWORK_ERROR: -9990,
            HTTP_ERROR: -9991,
            PARSE_FAILURE: -9992,
            STARTUP_EVENT_NOT_RECEIVED: -9993,
            GLOBAL_INSTALL_QUERIER_UNINITIALIZED: -9994,
            SETTINGS_QUERIER_UNINITIALIZED: -9995,
            SUBSCRIBER_INFO_QUERIER_UNINITIALIZED: -9996,
            UNKNOWN_ERROR: -9999
        };
        this.OD.playVOD = function (_requestId, _movie, _offset, _trailer) {
            if (navigator.userAgent.indexOf("NSN") != -1) {
                UTC.OTT.load(_movie.assetURL, false);
                if (_offset != null && (_offset != undefined && _offset > 0))UTC.OTT.move(_offset);
                this.invokeSignalPlayResponse(_requestId, this.PlayResult.PLAY_SUCCESS, UTC.OTT.duration())
            } else this.invokeSignalPlayResponse(_requestId, this.PlayResult.PLAY_SUCCESS, _movie.runtime);
            fw.UTC.Playback.invokeSignalPlaybackStateChanged(this.RequestResult.SUCCESS, {
                "playbackState": this.PlaybackStateEnum.PLAYBACK_STATE_PLAY,
                "speed": 100,
                "position": _offset,
                "aboslutePosition": 0
            })
        };
        this.OD.stopVOD = function (_requestId) {
            if (navigator.userAgent.indexOf("NSN") != -1)UTC.OTT.stop();
            this.invokeSignalStopResponse(_requestId, this.RequestResult.SUCCESS, this.StopReason.STOP_REASON_USER_REQUEST);
            fw.UTC.Playback.invokeSignalPlaybackStateChanged(this.RequestResult.SUCCESS, {
                "playbackState": this.PlaybackStateEnum.PLAYBACK_STATE_STOPPED,
                "speed": 0,
                "position": 0,
                "aboslutePosition": 0
            })
        };
        this.OD.changeSpeed = function (_requestId, _speed) {
            this.invokeSignalChangeSpeedResponse(_requestId, this.RequestResult.SUCCESS, _speed);
            var statusToReturn = this.PlaybackStateEnum.PLAYBACK_STATE_PLAY;
            if (_speed == 0)statusToReturn = this.PlaybackStateEnum.PLAYBACK_STATE_PAUSED; else if (_speed > 100)statusToReturn = this.PlaybackStateEnum.PLAYBACK_STATE_FFWD; else if (_speed < 0)statusToReturn = this.PlaybackStateEnum.PLAYBACK_STATE_REW;
            fw.UTC.Playback.invokeSignalPlaybackStateChanged(this.RequestResult.SUCCESS, {
                "playbackState": statusToReturn,
                "speed": _speed,
                "position": 1340,
                "aboslutePosition": 0
            })
        };
        this.OD.jumpToTime = function (_requestId, _offset) {
            if (navigator.userAgent.indexOf("NSN") != -1)UTC.OTT.move(_offset);
            this.invokeSignalJumpToTimeResponse(_requestId,
                this.RequestResult.SUCCESS);
            fw.UTC.Playback.invokeSignalPlaybackStateChanged(this.RequestResult.SUCCESS, {
                "playbackState": this.PlaybackStateEnum.PLAYBACK_STATE_PLAY,
                "speed": 100,
                "position": _offset,
                "aboslutePosition": 0
            })
        };
        this.OD.getCurrentItem = function () {
            return null
        };
        this.OD.isItemRented = function (_movie) {
            return this.isItemRentedDefault
        };
        this.OD.getItemExpiryTime = function (_movie) {
            var currentTimestamp = (new Date).getTime();
            return this.deltaTimeExpiryMs + currentTimestamp
        };
        this.OD.isVVSserverActive = function () {
            return this.VVSServerActiveFlag
        };
        this.OD.getDiscountPrice = function (_requestId, _voucherCode, _movie) {
            if (_voucherCode == this.correctVoucherCode)this.invokeSignalDiscountPriceReceived(_requestId, this.discountPriceValue); else this.invokeSignalFailedToGetDiscountPrice(_requestId, this.ErrorCode.OtherError, "Error voucher")
        };
        this.OD.rentVOD = function (_requestId, _movie, _voucherCode, _discountPrice) {
            if (_voucherCode == null || (_voucherCode == undefined || (_voucherCode === "" || _voucherCode == this.correctVoucherCode)))this.invokeSignalRentVODResponse(_requestId,
                this.RentResult.RENT_OK, this.ErrorCode.Success, "NO_INCENTIVE", 0, 0); else this.invokeSignalRentVODResponse(_requestId, this.RentResult.FAILURE, this.ErrorCode.OtherError, "NO_INCENTIVE", 0, 0)
        };
        this.OD.getCategory = function (_requestId, _searchParameters) {
            if (this.getCategoryInTimeout)this.invokeSignalGetCategoryResponse(_requestId, new Object); else {
                var url = "../../stubJSON/category/" + _searchParameters.searchValue + ".json";
                fw.dataManager.doCallAsync("GET", url, new Array(_requestId, _searchParameters.skipParentalControlCheck),
                    this, this.callbackGetCategory, true, false)
            }
        };
        this.OD.callbackGetCategory = function (_categoryResp, _param) {
            var requestId = _param[0];
            var skipParentalControlCheck = _param[1];
            if (skipParentalControlCheck == true || _categoryResp.isPCSafe == true)this.invokeSignalGetCategoryResponse(requestId, _categoryResp); else this.invokeSignalGetCategoryResponse(_requestId, new Object)
        };
        this.OD.getSubCategories = function (_requestId, _searchParameters) {
            if (this.getSubcategoriesInTimeout)this.invokeSignalGetSubCategoriesResponse(_requestId,
                new Object); else {
                var url = "../../stubJSON/subcategories/" + _searchParameters.searchValue + ".json";
                if (_searchParameters.searchField == fw.conf.filterCategoryPath) {
                    var find = "/";
                    var re = new RegExp(find, "g");
                    var strToSearch = _searchParameters.searchValue.replace(re, "_");
                    url = "../../stubJSON/subcategories/" + strToSearch + ".json"
                }
                fw.dataManager.doCallAsync("GET", url, new Array(_requestId, _searchParameters.skipParentalControlCheck), this, this.callbackGetSubcategories, true, false)
            }
        };
        this.OD.callbackGetSubcategories = function (_categoriesResp,
                                                     _param) {
            var requestId = _param[0];
            var skipParentalControlCheck = _param[1];
            if (skipParentalControlCheck == false) {
                var filteredListOfCategories = new Array;
                for (var i = 0; i < _categoriesResp.size(); i++) {
                    var categoryFromRetrievedList = _categoriesResp[i];
                    if (categoryFromRetrievedList.isPCSafe)filteredListOfCategories.push(categoryFromRetrievedList)
                }
                this.invokeSignalGetSubCategoriesResponse(requestId, filteredListOfCategories)
            } else this.invokeSignalGetSubCategoriesResponse(requestId, _categoriesResp)
        };
        this.OD.getMovies =
            function (_requestId, _searchParameters) {
                if (this.getMoviesInTimeout)this.invokeSignalGetMoviesResponse(_requestId, new Object, 0, new Object); else {
                    var sortTypeForSearch = _searchParameters.sortType == null || (_searchParameters.sortType == undefined || _searchParameters.sortType == "NONE") ? "BY_NAME" : _searchParameters.sortType;
                    var categoryConditionFilter = _searchParameters.categoryCondition != null && _searchParameters.categoryCondition != undefined ? _searchParameters.categoryCondition.searchValue : "";
                    var url = "../../stubJSON/movies/" +
                        _searchParameters.area + "_" + sortTypeForSearch + "_" + categoryConditionFilter + "_" + _searchParameters.moviesCondition.searchValue + ".json";
                    if (_searchParameters.area == fw.conf.tvoy && (_searchParameters.categoryCondition != null && (_searchParameters.categoryCondition != undefined && _searchParameters.categoryCondition.searchField == fw.conf.filterCategoryPath))) {
                        var find = "/";
                        var re = new RegExp(find, "g");
                        var strToSearch = _searchParameters.categoryCondition.searchValue.replace(re, "_");
                        url = "../../stubJSON/movies/" + _searchParameters.area +
                            "_" + sortTypeForSearch + "_" + strToSearch + "_" + _searchParameters.moviesCondition.searchValue + ".json"
                    }
                    fw.dataManager.doCallAsync("GET", url, new Array(_requestId, _searchParameters.skipParentalControlCheck, _searchParameters.startIndex), this, this.callbackGetMovies, true, false)
                }
            };
        this.OD.callbackGetMovies = function (_moviesResp, _param) {
            var requestId = _param[0];
            var skipParentalControlCheck = _param[1];
            var startIndex = _param[2];
            var filteredListOfMovies = new Array;
            if (skipParentalControlCheck == false)for (var i = 0; i < _moviesResp.size(); i++) {
                var movieFromRetrievedList =
                    _moviesResp[i];
                if (movieFromRetrievedList.isPCSafe)filteredListOfMovies.push(movieFromRetrievedList)
            } else filteredListOfMovies = _moviesResp;
            var sizedListOfMovies = new Array;
            var numOfRetrievedMovies = filteredListOfMovies.size();
            if (startIndex < numOfRetrievedMovies)for (var j = startIndex; j < numOfRetrievedMovies && sizedListOfMovies.size() < this.maxReturnedMoviesSize; j++)sizedListOfMovies.push(filteredListOfMovies[j]);
            this.invokeSignalGetMoviesResponse(requestId, sizedListOfMovies, numOfRetrievedMovies, new Object)
        };
        this.OD.getRentalCost = function (_movie) {
            return this.moviePriceValue
        };
        this.OD.getRentalDuration = function (_movie) {
            return this.movieRentalDurationValue
        };
        this.OD.playResponse = new Object;
        this.OD.playResponse.connect = function (f) {
            this.playResponseFunction = f
        };
        this.OD.playResponse.disconnect = function (f) {
            this.playResponseFunction = null
        };
        this.OD.invokeSignalPlayResponse = function (_requestId, _playResult, _length) {
            if (this.playResponse.playResponseFunction != null && this.playResponse.playResponseFunction != undefined)this.playResponse.playResponseFunction.apply(fw.mwRequestManager,
                new Array(_requestId, _playResult, _length))
        };
        this.OD.stopResponse = new Object;
        this.OD.stopResponse.connect = function (f) {
            this.stopResponseFunction = f
        };
        this.OD.stopResponse.disconnect = function (f) {
            this.stopResponseFunction = null
        };
        this.OD.invokeSignalStopResponse = function (_requestId, _result, _stopReason) {
            if (this.stopResponse.stopResponseFunction != null && this.stopResponse.stopResponseFunction != undefined)this.stopResponse.stopResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _result, _stopReason))
        };
        this.OD.changeSpeedResponse = new Object;
        this.OD.changeSpeedResponse.connect = function (f) {
            this.changeSpeedResponseFunction = f
        };
        this.OD.changeSpeedResponse.disconnect = function (f) {
            this.changeSpeedResponseFunction = null
        };
        this.OD.invokeSignalChangeSpeedResponse = function (_requestId, _result, _speed) {
            if (this.changeSpeedResponse.changeSpeedResponseFunction != null && this.changeSpeedResponse.changeSpeedResponseFunction != undefined)this.changeSpeedResponse.changeSpeedResponseFunction.apply(fw.mwRequestManager, new Array(_requestId,
                _result, _speed))
        };
        this.OD.jumpToTimeResponse = new Object;
        this.OD.jumpToTimeResponse.connect = function (f) {
            this.jumpToTimeResponseFunction = f
        };
        this.OD.jumpToTimeResponse.disconnect = function (f) {
            this.jumpToTimeResponseFunction = null
        };
        this.OD.invokeSignalJumpToTimeResponse = function (_requestId, _result) {
            if (this.jumpToTimeResponse.jumpToTimeResponseFunction != null && this.jumpToTimeResponse.jumpToTimeResponseFunction != undefined)this.jumpToTimeResponse.jumpToTimeResponseFunction.apply(fw.mwRequestManager, new Array(_requestId,
                _result))
        };
        this.OD.discountPriceReceived = new Object;
        this.OD.discountPriceReceived.connect = function (f) {
            this.discountPriceReceivedFunction = f
        };
        this.OD.discountPriceReceived.disconnect = function (f) {
            this.discountPriceReceivedFunction = null
        };
        this.OD.invokeSignalDiscountPriceReceived = function (_requestId, _discountPrice) {
            if (this.discountPriceReceived.discountPriceReceivedFunction != null && this.discountPriceReceived.discountPriceReceivedFunction != undefined)this.discountPriceReceived.discountPriceReceivedFunction.apply(fw.mwRequestManager,
                new Array(_requestId, _discountPrice))
        };
        this.OD.failedToGetDiscountPrice = new Object;
        this.OD.failedToGetDiscountPrice.connect = function (f) {
            this.failedToGetDiscountPriceFunction = f
        };
        this.OD.failedToGetDiscountPrice.disconnect = function (f) {
            this.failedToGetDiscountPriceFunction = null
        };
        this.OD.invokeSignalFailedToGetDiscountPrice = function (_requestId, _errorType, _errorMessage) {
            if (this.failedToGetDiscountPrice.failedToGetDiscountPriceFunction != null && this.failedToGetDiscountPrice.failedToGetDiscountPriceFunction !=
                undefined)this.failedToGetDiscountPrice.failedToGetDiscountPriceFunction.apply(fw.mwRequestManager, new Array(_requestId, _errorType, _errorMessage))
        };
        this.OD.rentVODResponse = new Object;
        this.OD.rentVODResponse.connect = function (f) {
            this.rentVODResponseFunction = f
        };
        this.OD.rentVODResponse.disconnect = function (f) {
            this.rentVODResponseFunction = null
        };
        this.OD.invokeSignalRentVODResponse = function (_requestId, _rentResult, _errorCode, _incentiveType, _maxCounterValue, _subscriberCounterValue) {
            if (this.rentVODResponse.rentVODResponseFunction !=
                null && this.rentVODResponse.rentVODResponseFunction != undefined)this.rentVODResponse.rentVODResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _rentResult, _errorCode, _incentiveType, _maxCounterValue, _subscriberCounterValue))
        };
        this.OD.getCategoryResponse = new Object;
        this.OD.getCategoryResponse.connect = function (f) {
            this.getCategoryResponseFunction = f
        };
        this.OD.getCategoryResponse.disconnect = function (f) {
            this.getCategoryResponseFunction = null
        };
        this.OD.invokeSignalGetCategoryResponse = function (_requestId,
                                                            _category) {
            if (this.getCategoryResponse.getCategoryResponseFunction != null && this.getCategoryResponse.getCategoryResponseFunction != undefined)this.getCategoryResponse.getCategoryResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _category))
        };
        this.OD.getSubCategoriesResponse = new Object;
        this.OD.getSubCategoriesResponse.connect = function (f) {
            this.getSubCategoriesResponseFunction = f
        };
        this.OD.getSubCategoriesResponse.disconnect = function (f) {
            this.getSubCategoriesResponseFunction = null
        };
        this.OD.invokeSignalGetSubCategoriesResponse =
            function (_requestId, _categories) {
                if (this.getSubCategoriesResponse.getSubCategoriesResponseFunction != null && this.getSubCategoriesResponse.getSubCategoriesResponseFunction != undefined)this.getSubCategoriesResponse.getSubCategoriesResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _categories))
            };
        this.OD.getMoviesResponse = new Object;
        this.OD.getMoviesResponse.connect = function (f) {
            this.getMoviesResponseFunction = f
        };
        this.OD.getMoviesResponse.disconnect = function (f) {
            this.getMoviesResponseFunction =
                null
        };
        this.OD.invokeSignalGetMoviesResponse = function (_requestId, _movies, _totalMoviesCount, _parentCategory) {
            if (this.getMoviesResponse.getMoviesResponseFunction != null && this.getMoviesResponse.getMoviesResponseFunction != undefined)this.getMoviesResponse.getMoviesResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _movies, _totalMoviesCount, _parentCategory))
        };
        this.ParentalControl.getParentalControlSettings = function () {
            return this.parentalControlDefaultSettings
        };
        this.ParentalControl.isTimerActive =
            function () {
                return this.isTimerActiveDefault
            };
        this.ParentalControl.disarm = function () {
            return true
        };
        this.ParentalControl.armed = new Object;
        this.ParentalControl.armed.connect = function (f) {
            this.armedFunction = f
        };
        this.ParentalControl.armed.disconnect = function (f) {
            this.armedFunction = null
        };
        this.ParentalControl.invokeSignalArmed = function () {
            if (this.armed.armedFunction != null && this.armed.armedFunction != undefined)this.armed.armedFunction.apply(fw.mwRequestManager)
        };
        this.Storage.storageLocalMap = new Array;
        this.Storage.getItem =
            function (_key) {
                return this.storageLocalMap[_key]
            };
        this.Storage.getAllItems = function () {
            return this.storageLocalMap
        };
        this.Storage.setItems = function (_items) {
            for (var key in _items)this.storageLocalMap[key] = _items[key]
        };
        this.Storage.deleteItems = function (_keys) {
            for (var i = 0; i < _keys.size(); i++)this.storageLocalMap[_keys[i]] = null
        };
        this.Miscellaneous.downloadTriggers = function () {
            return true
        };
        this.Miscellaneous.sendVodGuideMessage = function (_menuItem) {
            return true
        };
        this.Miscellaneous.sendAVRRecord = function (_eventId,
                                                     _eventType, _avrVersion, _isExternalIP, _record) {
            return true
        };
        this.Miscellaneous.getBanner = function (_requestId) {
            this.invokeSignalGetBannerResponse(_requestId, this.bannerURLDefault)
        };
        this.Miscellaneous.getBannerResponse = new Object;
        this.Miscellaneous.getBannerResponse.connect = function (f) {
            this.getBannerResponseFunction = f
        };
        this.Miscellaneous.getBannerResponse.disconnect = function (f) {
            this.getBannerResponseFunction = null
        };
        this.Miscellaneous.invokeSignalGetBannerResponse = function (_requestId, _bannerURL) {
            if (this.getBannerResponse.getBannerResponseFunction !=
                null && this.getBannerResponse.getBannerResponseFunction != undefined)this.getBannerResponse.getBannerResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _bannerURL))
        };
        this.Data.ItemAssignType = {IAT_NONE: 0, IAT_CATEGORY: 1, IAT_INDIVIDUAL: 2};
        this.Data.ItemPackageType = {
            IPT_NONE: 0,
            IPT_DTV: 1,
            IPT_VOD: 2,
            IPT_WWW: 3,
            IPT_PVR: 4,
            IPT_TELE: 5,
            IPT_IPG: 6,
            IPT_PCA: 7,
            IPT_BNDL: 8
        };
        this.Data.LocationType = {LT_NONE: 0, LT_PRIMARY: 1, LT_REMOTE: 2};
        this.Data.ItemSubtypeType = {
            IST_NONE: 0,
            IST_BARK: 1,
            IST_DTV: 2,
            IST_PPV: 3,
            IST_MUS: 4,
            IST_VC: 5,
            IST_VOD: 6,
            IST_KOD: 7,
            IST_TVOY: 8,
            IST_WWW: 9,
            IST_WG: 10,
            IST_PAUSE: 11,
            IST_CPVR: 12,
            IST_NPVR: 13,
            IST_CLINK: 14,
            IST_NLINK: 15,
            IST_CID: 16,
            IST_IPG: 17,
            IST_PREM: 18,
            IST_HMS_0: 19,
            IST_HMS_1: 20,
            IST_HMS_2: 21,
            IST_HMS_3: 22,
            IST_PCC_0: 23,
            IST_PCC_1: 24,
            IST_PCC_2: 25,
            IST_PCC_3: 26,
            IST_OPA: 27,
            IST_CUTV: 28,
            IST_IP: 29,
            IST_BNDL: 30,
            IST_DVBTM: 31,
            IST_DVBTV: 32,
            IST_SOTV: 33,
            IST_OTTAP: 34
        };
        this.Data.getConnectionMode = function () {
            return this.connectionModeDefault
        };
        this.Data.getSkinPackageVersion = function () {
            return this.skinPackageVersionDefault
        };
        this.Data.getSoftwareVersion = function () {
            return this.getSoftwareVersionDefault
        };
        this.Data.getHardwareVersion = function () {
            return this.getHardwareVersionDefault
        };
        this.Data.getMACAddress = function () {
            return this.getMACAddressDefault
        };
        this.Data.getTMServerName = function () {
            return this.getTMServerNameDefault
        };
        this.Data.getGroupsList = function () {
            return this.getGroupsListDefault
        };
        this.Data.getPackages = function (_userPackages) {
            return this.getAllPackagesDefault
        };
        this.Data.getSubscribedPackages = function () {
            return this.getSubscribedPackagesDefault
        };
        this.Data.getAllChannels = function () {
            return this.getAllChannelsDefault
        };
        this.Data.getDefaultURL = function () {
            return this.getDefaultURLDefault
        };
        this.Data.getMyPackagesURL = function () {
            return this.getMyPackagesURLDefault
        };
        this.Data.isSettingsPINEnabled = function () {
            return this.isSettingsPINEnabledDefault
        };
        this.Data.isPurchasePINEnabled = function () {
            return this.isPurchasePINEnabledDefault
        };
        this.Data.verifySettingsPIN = function (_pin) {
            return _pin == this.correctSettingsPIN
        };
        this.Data.verifyPurchasePIN = function (_pin) {
            return _pin ==
                this.correctPurchasePIN
        };
        this.Data.getFIPS = function () {
            return this.getFIPSDefault
        };
        this.Data.getSubscriberId = function () {
            return this.getSubscriberIdDefault
        };
        this.Data.getUpDownZappingSetting = function () {
            return this.getUpDownZappingSettingDefault
        };
        this.Data.getMiniGuideTime = function () {
            return this.getMiniGuideTimeDefault
        };
        this.Data.subscriberDataChanged = new Object;
        this.Data.subscriberDataChanged.connect = function (f) {
            this.subscriberDataChangedFunction = f
        };
        this.Data.subscriberDataChanged.disconnect = function (f) {
            this.subscriberDataChangedFunction =
                null
        };
        this.Data.invokeSignalSubscriberDataChanged = function () {
            if (this.subscriberDataChanged.subscriberDataChangedFunction != null && this.subscriberDataChanged.subscriberDataChangedFunction != undefined)this.subscriberDataChanged.subscriberDataChangedFunction.apply(fw.subscriberDataManager)
        };
        this.Data.dtvlineupChanged = new Object;
        this.Data.dtvlineupChanged.connect = function (f) {
            this.dtvlineupChangedFunction = f
        };
        this.Data.dtvlineupChanged.disconnect = function (f) {
            this.dtvlineupChangedFunction = null
        };
        this.Data.invokeSignalDtvlineupChanged =
            function () {
                if (this.dtvlineupChanged.dtvlineupChangedFunction != null && this.dtvlineupChanged.dtvlineupChangedFunction != undefined)this.dtvlineupChanged.dtvlineupChangedFunction.apply(fw.subscriberDataManager)
            };
        this.Data.globalInstallChanged = new Object;
        this.Data.globalInstallChanged.connect = function (f) {
            this.globalInstallChangedFunction = f
        };
        this.Data.globalInstallChanged.disconnect = function (f) {
            this.globalInstallChangedFunction = null
        };
        this.Data.invokeSignalGlobalInstallChanged = function () {
            if (this.globalInstallChanged.globalInstallChangedFunction !=
                null && this.globalInstallChanged.globalInstallChangedFunction != undefined)this.globalInstallChanged.globalInstallChangedFunction.apply(fw.subscriberDataManager)
        };
        this.Data.nativeSkinChanged = new Object;
        this.Data.nativeSkinChanged.connect = function (f) {
            this.nativeSkinChangedFunction = f
        };
        this.Data.nativeSkinChanged.disconnect = function (f) {
            this.nativeSkinChangedFunction = null
        };
        this.Data.invokeSignalNativeSkinChanged = function (_skin) {
            if (this.nativeSkinChanged.nativeSkinChangedFunction != null && this.nativeSkinChanged.nativeSkinChangedFunction !=
                undefined)this.nativeSkinChanged.nativeSkinChangedFunction.apply(fw.mwRequestManager, new Array(_skin))
        };
        this.Playback.RequestResult = {SUCCESS: 0, LCDIErrorInvalidKeyCode: 0, FAILURE: 1};
        this.Playback.PlaybackStateEnum = {
            PLAYBACK_STATE_CONNECTING: 0,
            PLAYBACK_STATE_PLAY: 1,
            PLAYBACK_STATE_PAUSED: 2,
            PLAYBACK_STATE_PLAYING_IN_TIMESHIFT: 3,
            PLAYBACK_STATE_REW: 4,
            PLAYBACK_STATE_FFWD: 5,
            PLAYBACK_STATE_STOPPED: 6,
            PLAYBACK_STATE_BUFFERING: 7,
            PLAYBACK_STATE_ENDOFSTREAM: 8
        };
        this.Playback.TuneResponseCode = {
            TUNE_SUCCESS: 0,
            TUNE_DENIED_NOT_SUBSCRIBED: 1,
            TUNE_DENIED_PPV: 2,
            TUNE_FAILURE_BASIC_DTV: 3,
            TUNE_FAILURE_RC_CONFLICT: 4,
            TUNE_FAILURE_RC_DENIED_BW: 5,
            TUNE_FAILURE_HD: 6,
            TUNE_FAILURE_HAL: 7,
            TUNE_FAILURE_INT: 8,
            TUNE_FAILURE_BLOCKED: 9,
            TUNE_FAILURE_INVALID_CHANNEL: 10,
            TUNE_FAILURE_ZERO_BW: 11,
            TUNE_FAILURE_RC_DENIED_STREAM: 12,
            TUNE_FAILURE_ALREADY_TUNED: 13
        };
        this.Playback.PlaybackType = {DTV: 0, NPVR: 1, CPVR: 2, VOD: 3, OTT: 4};
        this.Playback.tuneToChannel = function (_channel) {
            this.invokeSignalTuneResponse(this.TuneResponseCode.TUNE_SUCCESS, 1)
        };
        this.Playback.tuneUp = function () {
            this.invokeSignalTuneResponse(this.TuneResponseCode.TUNE_SUCCESS,
                1)
        };
        this.Playback.tuneDown = function () {
            this.invokeSignalTuneResponse(this.TuneResponseCode.TUNE_SUCCESS, 1)
        };
        this.Playback.tuneLastDTVChannel = function () {
            this.invokeSignalTuneResponse(this.TuneResponseCode.TUNE_SUCCESS, 1)
        };
        this.Playback.getPlaybackState = function () {
            this.invokeSignalPlaybackStateChanged(this.RequestResult.SUCCESS, null)
        };
        this.currentPlaybackParameter = new Object;
        this.Playback.getPlaybackParameters = function () {
            this.invokeSignalPlaybackParametersChanged(this.RequestResult.SUCCESS, _playbackParameters)
        };
        this.Playback.setPlaybackParameters = function (_playbackParameters) {
            if (navigator.userAgent.indexOf("NSN") != -1)UTC.OTT.windowPositionSize(_playbackParameters.xPos, _playbackParameters.yPos, _playbackParameters.width, _playbackParameters.height);
            this.currentPlaybackParameter = _playbackParameters;
            this.invokeSignalPlaybackParametersChanged(this.RequestResult.SUCCESS, _playbackParameters)
        };
        this.Playback.getPlaybackType = function () {
            if (fw.isPc)return fw.mediaManager.PlaybackType.DTV; else return this.playbackTypeDefault
        };
        this.Playback.tuneResponse = new Object;
        this.Playback.tuneResponse.connect = function (f) {
            this.tuneResponseFunction = f
        };
        this.Playback.tuneResponse.disconnect = function (f) {
            this.tuneResponseFunction = null
        };
        this.Playback.invokeSignalTuneResponse = function (_tuneResponseCode, _channel) {
            if (this.tuneResponse.tuneResponseFunction != null && this.tuneResponse.tuneResponseFunction != undefined)this.tuneResponse.tuneResponseFunction.apply(fw.mediaManager, new Array(_tuneResponseCode, _channel))
        };
        this.Playback.playbackStateChanged =
            new Object;
        this.Playback.playbackStateChanged.connect = function (f) {
            this.playbackStateChangedFunction = f
        };
        this.Playback.playbackStateChanged.disconnect = function (f) {
            this.playbackStateChangedFunction = null
        };
        this.Playback.invokeSignalPlaybackStateChanged = function (_result, _playbackState) {
            if (_playbackState == null || _playbackState == undefined)_playbackState = this.lastPlaybackStateSaved;
            if (_playbackState == null || _playbackState == undefined)_playbackState = new Object;
            this.lastPlaybackStateSaved = _playbackState;
            if (this.playbackStateChanged.playbackStateChangedFunction !=
                null && this.playbackStateChanged.playbackStateChangedFunction != undefined)this.playbackStateChanged.playbackStateChangedFunction.apply(fw.mediaManager, new Array(_result, _playbackState))
        };
        this.Playback.playbackParametersChanged = new Object;
        this.Playback.playbackParametersChanged.connect = function (f) {
            this.playbackParametersChangedFunction = f
        };
        this.Playback.playbackParametersChanged.disconnect = function (f) {
            this.playbackParametersChangedFunction = null
        };
        this.Playback.invokeSignalPlaybackParametersChanged = function (_result,
                                                                        _playbackParameters) {
            if (this.playbackParametersChanged.playbackParametersChangedFunction != null && this.playbackParametersChanged.playbackParametersChangedFunction != undefined)this.playbackParametersChanged.playbackParametersChangedFunction.apply(fw.mediaManager, new Array(_result, _playbackParameters))
        };
        this.RentedItems.getRecentlyViewedFreeVODItems = function (_requestId, _area) {
            var url = "../../stubJSON/renteditems/recentlyViewedFreeVODItems_" + _area + ".json";
            fw.dataManager.doCallAsync("GET", url, _requestId,
                this, this.callbackGetRecentlyViewedFreeVODItems, true, false)
        };
        this.RentedItems.callbackGetRecentlyViewedFreeVODItems = function (_moviesResp, _requestId) {
            this.invokeSignalGetRecentlyViewedFreeVODItemsResponse(_requestId, _moviesResp)
        };
        this.RentedItems.getPaidVODItems = function (_requestId, _area, _startIndex, _endIndex) {
            var url = "../../stubJSON/renteditems/paidVODItems_" + _area + ".json";
            fw.dataManager.doCallAsync("GET", url, new Array(_requestId, _startIndex), this, this.callbackGetPaidVODItems, true, false)
        };
        this.RentedItems.callbackGetPaidVODItems =
            function (_moviesResp, _params) {
                var requestId = _params[0];
                var startIndex = _params[1];
                var sizedListOfMovies = new Array;
                var numOfRetrievedMovies = _moviesResp.size();
                if (startIndex < numOfRetrievedMovies)for (var j = startIndex; j < numOfRetrievedMovies && sizedListOfMovies.size() < this.maxReturnedMoviesSize; j++)sizedListOfMovies.push(_moviesResp[j]);
                this.invokeSignalGetPaidVODItemsResponse(requestId, sizedListOfMovies, numOfRetrievedMovies)
            };
        this.RentedItems.getRecordings = function (_requestId) {
            var url = "../../stubJSON/renteditems/recordings.json";
            fw.dataManager.doCallAsync("GET", url, _requestId, this, this.callbackGetRecordings, true, false)
        };
        this.RentedItems.callbackGetRecordings = function (_recordingsResp, _requestId) {
            this.invokeSignalGetRecordingsResponse(_requestId, _recordingsResp)
        };
        this.RentedItems.getPPVItems = function (_requestId) {
            var url = "../../stubJSON/renteditems/ppv.json";
            fw.dataManager.doCallAsync("GET", url, _requestId, this, this.callbackGetPPVItems, true, false)
        };
        this.RentedItems.callbackGetPPVItems = function (_ppvResp, _requestId) {
            this.invokeSignalGetPPVItemsResponse(_requestId,
                _ppvResp)
        };
        this.RentedItems.getRecentlyViewedFreeVODItemsResponse = new Object;
        this.RentedItems.getRecentlyViewedFreeVODItemsResponse.connect = function (f) {
            this.getRecentlyViewedFreeVODItemsResponseFunction = f
        };
        this.RentedItems.getRecentlyViewedFreeVODItemsResponse.disconnect = function (f) {
            this.getRecentlyViewedFreeVODItemsResponseFunction = null
        };
        this.RentedItems.invokeSignalGetRecentlyViewedFreeVODItemsResponse = function (_requestId, _movies) {
            if (this.getRecentlyViewedFreeVODItemsResponse.getRecentlyViewedFreeVODItemsResponseFunction !=
                null && this.getRecentlyViewedFreeVODItemsResponse.getRecentlyViewedFreeVODItemsResponseFunction != undefined)this.getRecentlyViewedFreeVODItemsResponse.getRecentlyViewedFreeVODItemsResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _movies))
        };
        this.RentedItems.getPaidVODItemsResponse = new Object;
        this.RentedItems.getPaidVODItemsResponse.connect = function (f) {
            this.getPaidVODItemsResponseFunction = f
        };
        this.RentedItems.getPaidVODItemsResponse.disconnect = function (f) {
            this.getPaidVODItemsResponseFunction =
                null
        };
        this.RentedItems.invokeSignalGetPaidVODItemsResponse = function (_requestId, _movies, _totalItemsCount) {
            if (this.getPaidVODItemsResponse.getPaidVODItemsResponseFunction != null && this.getPaidVODItemsResponse.getPaidVODItemsResponseFunction != undefined)this.getPaidVODItemsResponse.getPaidVODItemsResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _movies, _totalItemsCount))
        };
        this.RentedItems.getRecordingsResponse = new Object;
        this.RentedItems.getRecordingsResponse.connect = function (f) {
            this.getRecordingsResponseFunction =
                f
        };
        this.RentedItems.getRecordingsResponse.disconnect = function (f) {
            this.getRecordingsResponseFunction = null
        };
        this.RentedItems.invokeSignalGetRecordingsResponse = function (_requestId, _recordings) {
            if (this.getRecordingsResponse.getRecordingsResponseFunction != null && this.getRecordingsResponse.getRecordingsResponseFunction != undefined)this.getRecordingsResponse.getRecordingsResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _recordings))
        };
        this.RentedItems.getPPVItemsResponse = new Object;
        this.RentedItems.getPPVItemsResponse.connect =
            function (f) {
                this.getPPVItemsResponseFunction = f
            };
        this.RentedItems.getPPVItemsResponse.disconnect = function (f) {
            this.getPPVItemsResponseFunction = null
        };
        this.RentedItems.invokeSignalGetPPVItemsResponse = function (_requestId, _ppvItems) {
            if (this.getPPVItemsResponse.getPPVItemsResponseFunction != null && this.getPPVItemsResponse.getPPVItemsResponseFunction != undefined)this.getPPVItemsResponse.getPPVItemsResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _ppvItems))
        };
        this.RentedItems.getRentedSOTVItems =
            function (_requestId) {
                if (this.getRentedSOTVItemsInTimeout)this.invokeSignalGetRentedSOTVItemsResponse(_requestId, new Object); else {
                    var url = "../../stubJSON/renteditems/getSOTV.json";
                    fw.dataManager.doCallAsync("GET", url, new Array(_requestId), this, this.callbackGetRentedSOTVItems)
                }
            };
        this.RentedItems.callbackGetRentedSOTVItems = function (_sotvItems, _param) {
            var requestId = _param[0];
            this.invokeSignalGetRentedSOTVItemsResponse(requestId, _sotvItems)
        };
        this.RentedItems.getRentedSOTVItemsResponse = new Object;
        this.RentedItems.getRentedSOTVItemsResponse.connect =
            function (f) {
                this.getRentedSOTVItemsFunction = f
            };
        this.RentedItems.getRentedSOTVItemsResponse.disconnect = function (f) {
            this.getRentedSOTVItemsFunction = null
        };
        this.RentedItems.invokeSignalGetRentedSOTVItemsResponse = function (_requestId, _sotvItems) {
            if (this.getRentedSOTVItemsResponse.getRentedSOTVItemsFunction != null && this.getRentedSOTVItemsResponse.getRentedSOTVItemsFunction != undefined)this.getRentedSOTVItemsResponse.getRentedSOTVItemsFunction.apply(fw.mwRequestManager, new Array(_requestId, _sotvItems))
        };
        this.Messages.getMessage =
            function (_id) {
                var message = null;
                for (var i = 0; i < this.defaultMessagesArray.length; i++)if (this.defaultMessagesArray[i].id == _id)message = this.defaultMessagesArray[i];
                return message[_id]
            };
        this.Messages.getMessagesList = function (_all) {
            if (_all)return this.defaultMessagesArray; else {
                var outArray = new Array;
                for (var i = 0; i < this.defaultMessagesArray.length; i++) {
                    var currentMessage = this.defaultMessagesArray[i];
                    if (currentMessage != null && (currentMessage != undefined && !currentMessage.isRead))outArray.push(currentMessage)
                }
                return outArray
            }
        };
        this.Messages.markAsRead = function (_id) {
            for (var i = 0; i < this.defaultMessagesArray.length; i++)if (this.defaultMessagesArray[i].id == _id)this.defaultMessagesArray[i].isRead = true
        };
        this.Messages.markAsRemoved = function (_id) {
            for (var i = 0; i < this.defaultMessagesArray.length; i++)if (this.defaultMessagesArray[i].id == _id)this.defaultMessagesArray.splice(i, 1)
        };
        this.Messages.newMessage = new Object;
        this.Messages.newMessage.connect = function (f) {
            this.newMessageFunction = f
        };
        this.Messages.newMessage.disconnect = function (f) {
            this.newMessageFunction =
                null
        };
        this.Messages.invokeSignalNewMessage = function (_id) {
            if (this.newMessage.newMessageFunction != null && this.newMessage.newMessageFunction != undefined)this.newMessage.newMessageFunction.apply(fw.mwRequestManager, new Array(_id))
        };
        this.OTTIntegration.contextApplicationsDefault = [{
            "title": "Auto Week",
            "description": "Lorem ipsum dolor sit amet",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://192.168.7.40/stub_evo/iptv3.0/TESTCSS/index.html"
        }, {
            "title": "Telegraph",
            "description": "Ut enim ad minim veniam, quis nostrud",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/Telegraph.png",
            "appURL": "http://192.168.7.150/avs_iptv/index.html"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/NuSport.png",
            "appURL": "http://www.google.it"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://abc.def/pathOTT/UrlAppSport"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/NuSport.png",
            "appURL": "http://www.google.it"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://abc.def/pathOTT/UrlAppSport"
        }, {
            "title": "Auto Week",
            "description": "Lorem ipsum dolor sit amet",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://192.168.7.40/stub_evo/iptv3.0/TESTCSS/index.html"
        }, {
            "title": "Telegraph",
            "description": "Ut enim ad minim veniam, quis nostrud",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/Telegraph.png",
            "appURL": "http://192.168.7.150/avs_iptv/index.html"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/NuSport.png",
            "appURL": "http://www.google.it"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://abc.def/pathOTT/UrlAppSport"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/NuSport.png",
            "appURL": "http://www.google.it"
        }, {
            "title": "Sport",
            "description": "Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            "iconURL": "http://127.0.0.1:8081/IPTV-4.0/Workspace/trunk/stubJSON/OTT/AutoWeek.png",
            "appURL": "http://abc.def/pathOTT/UrlAppSport"
        }];
        this.OTTIntegration.getContextApplications = function (_requestId, _context) {
            this.invokeSignalGetContextApplicationsResponse(_requestId, this.contextApplicationsDefault)
        };
        this.OTTIntegration.getContextApplicationsResponse =
            new Object;
        this.OTTIntegration.getContextApplicationsResponse.connect = function (f) {
            this.getContextApplicationsResponseFunction = f
        };
        this.OTTIntegration.getContextApplicationsResponse.disconnect = function (f) {
            this.getContextApplicationsResponseFunction = null
        };
        this.OTTIntegration.invokeSignalGetContextApplicationsResponse = function (_requestId, _applicationsList) {
            if (this.getContextApplicationsResponse.getContextApplicationsResponseFunction != null && this.getContextApplicationsResponse.getContextApplicationsResponseFunction !=
                undefined)this.getContextApplicationsResponse.getContextApplicationsResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _applicationsList))
        }
    }
});
