var MwRequestManager = Class.create({
    initialize: function () {
        try {
            this.stopEventCallbackObj = null;
            this.updateIndexDoneList = new Array;
            this.requestMapForCallback = new Array;
            this.callbackStack = new Array;
            fw.UTC.OD.discountPriceReceived.connect(this.discountPriceReceivedManager);
            fw.UTC.OD.failedToGetDiscountPrice.connect(this.failedToGetDiscountPriceManager);
            fw.UTC.OD.rentVODResponse.connect(this.rentVODResponseManager);
            fw.UTC.OD.getCategoryResponse.connect(this.getCategoryResponseManager);
            fw.UTC.OD.getSubCategoriesResponse.connect(this.getSubCategoryResponseManager);
            fw.UTC.OD.getMoviesResponse.connect(this.getMoviesResponseManager);
            fw.UTC.RentedItems.getRecentlyViewedFreeVODItemsResponse.connect(this.getRecentlyViewedFreeVODItemsResponseManager);
            fw.UTC.RentedItems.getPaidVODItemsResponse.connect(this.getPaidVODItemsResponseManager);
            fw.UTC.RentedItems.getRecordingsResponse.connect(this.getRecordingsResponseManager);
            fw.UTC.RentedItems.getPPVItemsResponse.connect(this.getPPVItemsResponseManager);
            fw.UTC.OD.playResponse.connect(this, this.playResponseManager);
            fw.UTC.OD.stopResponse.connect(this,
                this.stopResponseManager);
            fw.UTC.OD.changeSpeedResponse.connect(this, this.changeSpeedResponseManager);
            fw.UTC.OD.jumpToTimeResponse.connect(this, this.jumpToTimeResponseManager);
            fw.UTCStub.PPV.getPPVResponse.connect(this.getPPVResponseManager);
            fw.UTCStub.PPV.rentPPVResponse.connect(this.rentPPVResponseManager);
            fw.UTCStub.Reminders.getReminderResponse.connect(this.getReminderResponseManager);
            fw.UTCStub.Reminders.modifyReminderResponse.connect(this.modifyReminderResponseManager);
            fw.UTC.Miscellaneous.getBannerResponse.connect(this.getBannerResponseManager);
            fw.UTC.RentedItems.getRentedSOTVItemsResponse.connect(this.getRentedSOTVItemsResponseManager);
            fw.UTC.Messages.newMessage.connect(this.newMessageManager);
            fw.UTC.OTTIntegration.getContextApplicationsResponse.connect(this.getContextApplicationsResponseManager);
            console.warn("INSIDE MwRequestManager.initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, setCallback: function (_callbackFunction, _callbackOwner, _callbackParameters, _callType, _useStack) {
        try {
            var requestId =
                fw.UTC.RequestIdGenerator.unique();
            if (_useStack == null || (_useStack == undefined || _useStack != true))_useStack = false;
            if (_callType != null && _callType != undefined)for (var key in this.requestMapForCallback) {
                var arrayTmp = this.requestMapForCallback[key];
                if (arrayTmp != null && (arrayTmp[3] != undefined && arrayTmp[3] == _callType))this.requestMapForCallback[key] = null
            }
            this.requestMapForCallback[requestId.id] = new Array(_callbackFunction, _callbackOwner, _callbackParameters, _callType, _useStack);
            return requestId
        } catch (ex) {
            ex.errMethod =
                "setCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, deleteCallBack: function (_requestId) {
        try {
            fw.log.debug("deleteCallBack", _requestId);
            if (_requestId != null)this.requestMapForCallback[_requestId.id] = null
        } catch (ex) {
            ex.errMethod = "deleteCallBack";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, retrieveCallback: function (_requestId) {
        try {
            var arrayToReturn = this.requestMapForCallback[_requestId.id];
            this.requestMapForCallback[_requestId.id] = null;
            return arrayToReturn
        } catch (ex) {
            ex.errMethod = "retrieveCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, doCallback: function (_requestId, _arrayParams) {
        try {
            var callbackObj = this.retrieveCallback(_requestId);
            var useStack = false;
            if (callbackObj != null && (callbackObj != undefined && callbackObj.size() >= 4))useStack = callbackObj[3];
            _arrayParams.push(_requestId.id);
            _requestId = fw.UTC.RequestIdGenerator.empty();
            if (useStack != null && (useStack != undefined && useStack == true)) {
                fw.log.debug("CallbackStack - Adding element on stack");
                this.putCallbackOnStack(callbackObj, _arrayParams)
            } else this.doInternalCallback(callbackObj,
                _arrayParams)
        } catch (ex) {
            ex.errMethod = "doCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, putCallbackOnStack: function (_callbackObj, _arrayParams) {
        try {
            fw.log.debug("CallbackStack - Add to callbackStack");
            this.callbackStack.push(new Array(_callbackObj, _arrayParams));
            if (this.callbackStack.length == 1) {
                fw.log.debug("CallbackStack - Only one element in stack, start to doCallback");
                this.doCallbackStack()
            }
        } catch (ex) {
            ex.errMethod = "putCallbackOnStack";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, doCallbackStack: function () {
        try {
            var objOnStack =
                this.callbackStack.pop();
            if (objOnStack != null && objOnStack != undefined) {
                fw.log.debug("CallbackStack - Do internal callback from stack");
                this.doInternalCallback(objOnStack[0], objOnStack[1]);
                fw.log.debug("CallbackStack - Iterate");
                this.doCallbackStack()
            } else fw.log.debug("CallbackStack - No more callback on stack")
        } catch (ex) {
            ex.errMethod = "putCallbackOnStack";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, doInternalCallback: function (_callbackObj, _arrayParams) {
        try {
            fw.log.debug("DO_INTERNAL_CALLBACK: start");
            if (_callbackObj != null && (_callbackObj != undefined && _callbackObj.size() >= 3)) {
                var callbackFunction = _callbackObj[0];
                var callbackOwner = _callbackObj[1];
                var callbackParameters = new Array;
                callbackParameters.push(_callbackObj[2]);
                var appendParams = callbackParameters.concat(_arrayParams);
                callbackFunction.apply(callbackOwner, appendParams)
            }
            fw.log.debug("DO_INTERNAL_CALLBACK: end")
        } catch (ex) {
            ex.errMethod = "doInternalCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, discountPriceReceivedManager: function (_requestId,
                                               _discountPrice) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(true, _discountPrice))
        } catch (ex) {
            ex.errMethod = "discountPriceReceivedManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, failedToGetDiscountPriceManager: function (_requestId, _errorType, _errorMessage) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(false, _errorType, _errorMessage))
        } catch (ex) {
            ex.errMethod = "failedToGetDiscountPriceManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, rentVODResponseManager: function (_requestId,
                                         _rentResult, _errorCode, _incentiveType, _maxCounterValue, _subscriberCounterValue) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_rentResult, _errorCode, _incentiveType, _maxCounterValue, _subscriberCounterValue))
        } catch (ex) {
            ex.errMethod = "rentVODResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getCategoryResponseManager: function (_requestId, _category) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_category))
        } catch (ex) {
            ex.errMethod = "getCategoryResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getSubCategoryResponseManager: function (_requestId, _categories) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_categories))
        } catch (ex) {
            ex.errMethod = "getSubCategoryResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getBannerResponseManager: function (requestId, bannerURL) {
        try {
            fw.mwRequestManager.doCallback(requestId, new Array(bannerURL))
        } catch (ex) {
            ex.errMethod = "getBannerResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getMoviesResponseManager: function (_requestId,
                                           _movies, _totalMoviesCount, _parentCategory) {
        try {
            fw.log.debug("GET_MOVIES_RESPONSE_MANAGER: _requestId:", _requestId);
            fw.log.debug("GET_MOVIES_RESPONSE_MANAGER: _totalMoviesCount:", _totalMoviesCount);
            fw.log.debug("GET_MOVIES_RESPONSE_MANAGER: _parentCategory:", _parentCategory);
            var returnedMovies = fw.mwRequestManager.fillMovieList(_movies, _totalMoviesCount);
            fw.log.debug("GET_MOVIES_RESPONSE_MANAGER: returnedMovies:", returnedMovies);
            fw.mwRequestManager.doCallback(_requestId, new Array(returnedMovies, _totalMoviesCount,
                _parentCategory))
        } catch (ex) {
            ex.errMethod = "getMoviesResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, fillMovieList: function (_movies, _totalMoviesCount) {
        try {
            var returnedMovies = new Array;
            var moreThanReturned = _movies != null && (_movies != undefined && (_movies.length < _totalMoviesCount && !fw.mwManager.noFillMoviesResponse));
            if (moreThanReturned) {
                var fillerSize = _totalMoviesCount - _movies.length;
                var fillerArray = new Array(fillerSize);
                fw.mwRequestManager.updateIndexDoneList = new Array;
                this.valApp = -1;
                for (var i =
                    0; i < fillerSize; i++) {
                    var obj = new Object;
                    var app = parseInt((_movies.length + i) / fw.conf.numItemsSingleCall) * fw.conf.numItemsSingleCall;
                    if (app != this.valApp) {
                        fw.mwRequestManager.updateIndexDoneList[app] = false;
                        this.valApp = app
                    }
                    obj.blockId = app;
                    fillerArray[i] = obj
                }
                returnedMovies = _movies.concat(fillerArray)
            } else returnedMovies = _movies;
            return returnedMovies
        } catch (ex) {
            ex.errMethod = "fillMovieList";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getRecentlyViewedFreeVODItemsResponseManager: function (_requestId, _movies) {
        try {
            fw.mwRequestManager.doCallback(_requestId,
                new Array(_movies))
        } catch (ex) {
            ex.errMethod = "getRecentlyViewedFreeVODItemsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getPaidVODItemsResponseManager: function (_requestId, _movies, _totalItemsCount) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_movies, _totalItemsCount))
        } catch (ex) {
            ex.errMethod = "getPaidVODItemsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getRecordingsResponseManager: function (_requestId, _recordings) {
        try {
            fw.mwRequestManager.doCallback(_requestId,
                new Array(_recordings))
        } catch (ex) {
            ex.errMethod = "getRecordingsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getPPVItemsResponseManager: function (_requestId, _ppvItems) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_ppvItems))
        } catch (ex) {
            ex.errMethod = "getPPVItemsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, playResponseManager: function (_requestId, _playResult, _length) {
        try {
            fw.log.info("INSIDE  playResponseManager");
            fw.mwRequestManager.doCallback(_requestId, new Array(_playResult,
                _length))
        } catch (ex) {
            ex.errMethod = "playResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, stopResponseManager: function (_requestId, _result, _stopReason) {
        try {
            if (fw.mwRequestManager.stopEventCallbackObj != null && fw.mwRequestManager.stopEventCallbackObj != undefined)fw.mwRequestManager.doInternalCallback(fw.mwRequestManager.stopEventCallbackObj, new Array(_result, _stopReason)); else fw.mwRequestManager.doCallback(_requestId, new Array(_result, _stopReason))
        } catch (ex) {
            ex.errMethod = "stopResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, changeSpeedResponseManager: function (_requestId, _result, _speed) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_result, _speed))
        } catch (ex) {
            ex.errMethod = "changeSpeedResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, jumpToTimeResponseManager: function (_requestId, _result) {
        try {
            var arrayForCallback = new Array;
            arrayForCallback.push(_result);
            fw.mwRequestManager.doCallback(_requestId, arrayForCallback)
        } catch (ex) {
            ex.errMethod = "jumpToTimeResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, registerStopEventCallback: function (_callbackFunction, _callbackOwner, _callbackParameters) {
        try {
            fw.mwRequestManager.stopEventCallbackObj = new Array(_callbackFunction, _callbackOwner, _callbackParameters)
        } catch (ex) {
            ex.errMethod = "registerStopEventCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, unregisterStopEventCallback: function () {
        try {
            fw.mwRequestManager.stopEventCallbackObj = null
        } catch (ex) {
            ex.errMethod = "unregisterStopEventCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getPPVResponseManager: function (_requestId, _ppvResp) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_ppvResp))
        } catch (ex) {
            ex.errMethod = "getPPVResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, rentPPVResponseManager: function (_requestId, _rentResult, _errorCode) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_rentResult, _errorCode))
        } catch (ex) {
            ex.errMethod = "rentPPVResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getReminderResponseManager: function (_requestId,
                                             _reminderItem) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_reminderItem))
        } catch (ex) {
            ex.errMethod = "getReminderResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, modifyReminderResponseManager: function (_requestId, _reminderResult, _ppvInConflictItem) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_reminderResult, _ppvInConflictItem))
        } catch (ex) {
            ex.errMethod = "modifyReminderResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getRentedSOTVItemsResponseManager: function (_requestId,
                                                    _sotvItems) {
        try {
            fw.mwRequestManager.doCallback(_requestId, new Array(_sotvItems))
        } catch (ex) {
            ex.errMethod = "getRentedSOTVItemsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, newMessageManager: function (_id) {
        try {
            if (fw.mwRequestManager.newMessageCallbackObj != null && fw.mwRequestManager.newMessageCallbackObj != undefined)fw.mwRequestManager.doInternalCallback(fw.mwRequestManager.newMessageCallbackObj, [_id])
        } catch (ex) {
            ex.errMethod = "newMessageManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, getContextApplicationsResponseManager: function (_requestId,
                                                        _applicationsList) {
        try {
            var response = new Array;
            if (_applicationsList != undefined && _applicationsList.length > 10)for (var i = 0; i < 10; i++)response[i] = _applicationsList[i]; else response = _applicationsList;
            fw.mwRequestManager.doCallback(_requestId, new Array(response))
        } catch (ex) {
            ex.errMethod = "getContextApplicationsResponseManager";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, registerNewMessageCallback: function (_callbackFunction, _callbackOwner, _callbackParameters) {
        try {
            fw.mwRequestManager.newMessageCallbackObj = new Array(_callbackFunction,
                _callbackOwner, _callbackParameters)
        } catch (ex) {
            ex.errMethod = "registerNewMessageCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }, unregisterNewMessageCallback: function () {
        try {
            fw.mwRequestManager.newMessageCallbackObj = null
        } catch (ex) {
            ex.errMethod = "registerNewMessageCallback";
            ex.errClass = "MwRequestManager";
            fw.err(ex)
        }
    }
});
