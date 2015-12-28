BannerManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting Banner Manager");
            this.bannerCache = new Array;
            this.bannerCacheExpireTime = new Array
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForHelp: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypeHelp, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForHelp";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForVideotheek: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypeVideotheek, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForVideotheek";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForVideotheekKids: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypeVideotheekKids, _callerCallbackFunction,
                _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForVideotheekKids";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForVideotheekVideoland: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypeVideotheekVideoland, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForVideotheekVideoland";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForPPVPortal: function (_callerCallbackFunction,
                                     _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypePPVPortal, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForPPVPortal";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForPPVDetail: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypePPVDetail, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForPPVDetail";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerForPG: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            this.getBannerToShow(fw.conf.bannerTypePG, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getBannerForPG";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerImage: function (_banner) {
        try {
            if (_banner != null && _banner != undefined)return _banner.imageSource;
            return null
        } catch (ex) {
            ex.errMethod = "performsBannerAction";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerUrlCallBack: function (_callerCallbackParams, _bannerUrl) {
        try {
            var bannerType = _callerCallbackParams[3];
            var bannerUrlToCall = _bannerUrl;
            fw.log.info("getBannerUrlCallBack-_bannerUrl:", _bannerUrl);
            if (bannerUrlToCall != null && (bannerUrlToCall != undefined && bannerUrlToCall.length > 0)) {
                bannerUrlToCall = bannerUrlToCall.replace("@BannerID", "@" + bannerType);
                fw.dataManager.doCallAsync("GET", bannerUrlToCall, _callerCallbackParams, fw.bannerManager, fw.bannerManager.getBannerObjCallback, false, false)
            }
        } catch (ex) {
            ex.errMethod =
                "getBannerUrlCallBack";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerObjCallback: function (_bannerResponse, _callerCallbackParams) {
        try {
            if (_bannerResponse != undefined) {
                fw.log.info("getBannerObjCallback-_bannerResponse:", _bannerResponse);
                var callerCallbackFunction = _callerCallbackParams[0];
                var callerCallbackOwner = _callerCallbackParams[1];
                var callerCallbackParams = _callerCallbackParams[2];
                var bannerType = _callerCallbackParams[3];
                var imageSource = fw.bannerManager.getBannerElementFromTagName(_bannerResponse,
                    fw.conf.bannerResponseImageSource);
                var target = fw.bannerManager.getBannerElementFromTagName(_bannerResponse, fw.conf.bannerResponseTarget);
                var refreshTime = fw.bannerManager.getBannerElementFromTagName(_bannerResponse, fw.conf.bannerResponseRefreshTime);
                var keyCode = fw.bannerManager.getBannerElementFromTagName(_bannerResponse, fw.conf.bannerResponseKeyCode);
                var ratingCode = fw.bannerManager.getBannerElementFromTagName(_bannerResponse, fw.conf.bannerResponseRatingCode);
                if (refreshTime != null && refreshTime != undefined)refreshTime =
                    parseInt(refreshTime);
                var bannerObj = this.createBannerObject(imageSource, ratingCode, refreshTime, target, keyCode);
                fw.log.info("getBannerObjCallback-bannerObj:", bannerObj);
                fw.log.info("updating banner in cache for bannerType:" + bannerType);
                fw.bannerManager.updateBannerInCache(bannerType, bannerObj);
                callerCallbackFunction.apply(callerCallbackOwner, new Array(callerCallbackParams, bannerObj))
            }
        } catch (ex) {
            ex.errMethod = "getBannerObjCallback";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerElementFromTagName: function (_bannerResponseText,
                                           _tagElemen) {
        try {
            var tagContent = null;
            if (_bannerResponseText != null && (_bannerResponseText != undefined && (_tagElemen != null && (_tagElemen != undefined && _tagElemen.length > 0)))) {
                var matchs = _bannerResponseText.match("<" + _tagElemen + "[^>]*>([^<]+)</" + _tagElemen + ">");
                if (matchs != null && (matchs != undefined && matchs.length > 1))tagContent = matchs[1]
            }
            return tagContent
        } catch (ex) {
            ex.errMethod = "getBannerElementFromTagName";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerToShow: function (_bannerType, _callerCallbackFunction, _callerCallbackOwner,
                               _callerCallbackParams) {
        try {
            var bannerFromCache = this.getBannerFromCache(_bannerType);
            if (bannerFromCache != null && bannerFromCache != undefined) {
                fw.log.info("banner rietrieved from cache for bannerType:" + _bannerType);
                _callerCallbackFunction.apply(_callerCallbackOwner, new Array(_callerCallbackParams, bannerFromCache))
            } else {
                fw.log.info("banner not in cache or expired for bannerType:" + _bannerType);
                fw.mwManager.getBanner(this.getBannerUrlCallBack, this, new Array(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams,
                    _bannerType))
            }
        } catch (ex) {
            ex.errMethod = "getBannerToShow";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    callBannerAction: function (_banner) {
        try {
            var targetParameters = this.getTargetParameters(_banner.target);
            fw.log.info("invoked callBannerAction for targetParameters:", targetParameters);
            if (targetParameters != null && targetParameters != undefined) {
                var targetType = targetParameters[fw.conf.bannerResponseTargetType];
                if (targetType != null && targetType != undefined)switch (targetType.toLowerCase()) {
                    case fw.conf.bannerResponseTargetTypeInfopage:
                        var targetInfopageurl =
                            targetParameters[fw.conf.bannerResponseTargetInfourl];
                        targetInfopageurl = targetInfopageurl.replace(fw.conf.bannerResponseTargetInfourlPrefix, "");
                        fw.log.info("invoked callBannerAction for openIML:", targetInfopageurl);
                        fw.mwManager.openIML(targetInfopageurl);
                        break;
                    case fw.conf.bannerResponseTargetTypeVodguide:
                        var obj = new Object;
                        obj.action = "banner";
                        fw.log.info("invoked callBannerAction for open Vod Guide");
                        var currentApplicationId = fw.appManager.getCurrentApp();
                        if (currentApplicationId == "VodCatalogue")fw.appManager.getAppInfo(currentApplicationId).app.init(new Array("Catalogue",
                            obj)); else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin", new Array("Catalogue", obj), false, true);
                        break;
                    case fw.conf.bannerResponseTargetTypeVod:
                        var obj = new Object;
                        obj.action = "banner";
                        obj.externalId = targetParameters[fw.conf.bannerResponseTargetExternalid];
                        fw.log.info("invoked callBannerAction for Vod:", obj.externalId);
                        var currentApplicationId = fw.appManager.getCurrentApp();
                        if (currentApplicationId == "VodCatalogue")fw.appManager.getAppInfo(currentApplicationId).app.init(new Array("Detail", obj));
                        else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin", new Array("Detail", obj), false, true);
                        break;
                    case fw.conf.bannerResponseTargetTypeVodcategory:
                        var obj = new Object;
                        obj.action = "banner";
                        obj.externalId = targetParameters[fw.conf.bannerResponseTargetExternalid];
                        var currentApplicationId = fw.appManager.getCurrentApp();
                        if (currentApplicationId == "VodCatalogue")fw.appManager.getAppInfo(currentApplicationId).app.init(new Array("Catalogue", obj)); else fw.appManager.goToHtmlApp("VodCatalogue", "DefaultSkin",
                            new Array("Catalogue", obj), false, true);
                        break;
                    case fw.conf.bannerResponseTargetTypeIpg:
                        fw.log.info("invoked callBannerAction for Ipg");
                        var startGidsTimeout = fw.conf.startGidsTimeout != null && fw.conf.startGidsTimeout != undefined ? fw.conf.startGidsTimeout : 400;
                        setTimeout(function () {
                            fw.mwManager.openEPG("HORIZONTAL", "")
                        }, startGidsTimeout);
                        break;
                    case fw.conf.bannerResponseTargetTypeVipg:
                        fw.log.info("invoked callBannerAction for Vipg");
                        var startGidsTimeout = fw.conf.startGidsTimeout != null && fw.conf.startGidsTimeout !=
                        undefined ? fw.conf.startGidsTimeout : 400;
                        setTimeout(function () {
                            fw.mwManager.openEPG("VERTICAL", "")
                        }, startGidsTimeout);
                        break;
                        break;
                    case fw.conf.bannerResponseTargetTypeDtv:
                        fw.log.info("invoked callBannerAction for Dtv:", targetExternalid);
                        var targetExternalid = targetParameters[fw.conf.bannerResponseTargetExternalid];
                        fw.mwManager.watchDTV(targetExternalid);
                        break;
                    case fw.conf.bannerResponseTargetTypeMusic:
                        fw.log.info("invoked callBannerAction for Radio:", targetExternalid);
                        var targetExternalid = targetParameters[fw.conf.bannerResponseTargetExternalid];
                        fw.mwManager.watchDTV(targetExternalid);
                        break;
                    default:
                        fw.log.warn("invoked callBannerAction for unexpected target type - no action performed");
                        break
                }
            }
            return true
        } catch (ex) {
            ex.errMethod = "callBannerAction";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getKeyCodeForBannerAction: function (_banner) {
        try {
            if (_banner != null && _banner != undefined)switch (_banner.keyCode.toLowerCase()) {
                case fw.conf.bannerResponseKeyRed:
                    return fw.keys.code.RED;
                    break;
                case fw.conf.bannerResponseKeyGreen:
                    return fw.keys.code.GREEN;
                    break;
                case fw.conf.bannerResponseKeyBlue:
                    return fw.keys.code.BLUE;
                    break;
                case fw.conf.bannerResponseKeyYellow:
                    return fw.keys.code.YELLOW;
                    break;
                default:
                    return null;
                    break
            }
            return null
        } catch (ex) {
            ex.errMethod = "getKeyCodeForBannerAction";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    createBannerObject: function (_imageSource, _ratingCode, _refreshTime, _target, _keyCode) {
        try {
            var bannerObj = new Object;
            bannerObj.imageSource = _imageSource != null && _imageSource != undefined ? _imageSource : "";
            bannerObj.ratingCode = _ratingCode != null && _ratingCode != undefined ? _ratingCode : "";
            bannerObj.refreshTime =
                _refreshTime != null && _refreshTime != undefined ? _refreshTime : 0;
            bannerObj.target = _target != null && _target != undefined ? _target : "";
            bannerObj.keyCode = _keyCode != null && _keyCode != undefined ? _keyCode : "";
            return bannerObj
        } catch (ex) {
            ex.errMethod = "createBannerObject";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getTargetParameters: function (_bannerTarget) {
        try {
            var vars = [], hash;
            if (_bannerTarget != null && (_bannerTarget != undefined && _bannerTarget.length > 0)) {
                var hashes = _bannerTarget.slice(_bannerTarget.indexOf("?") + 1).split("&");
                for (var i = 0; i < hashes.length; i++) {
                    hash = hashes[i].split("=");
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1]
                }
            }
            return vars
        } catch (ex) {
            ex.errMethod = "getTargetParameters";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    updateBannerInCache: function (_bannerType, _bannerObj) {
        try {
            if (_bannerObj != null && _bannerObj != undefined) {
                if (fw.bannerManager.bannerCache == null || fw.bannerManager.bannerCache == undefined)fw.bannerManager.bannerCache = new Array;
                if (fw.bannerManager.bannerCacheExpireTime == null || fw.bannerManager.bannerCacheExpireTime ==
                    undefined)fw.bannerManager.bannerCacheExpireTime = new Array;
                var currentTime = (new Date).getTime();
                var expireTime = _bannerObj.refreshTime + currentTime;
                fw.bannerManager.bannerCache[_bannerType] = _bannerObj;
                fw.bannerManager.bannerCacheExpireTime[_bannerType] = expireTime;
                fw.log.info("success in updateBannerInCache for bannerType:" + _bannerType + " - expireTime:" + expireTime + " - _bannerObj:", _bannerObj);
                return true
            }
            fw.log.warn("error in updateBannerInCache for bannerType:" + _bannerType + " - _bannerObj:", _bannerObj);
            return false
        } catch (ex) {
            ex.errMethod = "updateBannerInCache";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    },
    getBannerFromCache: function (_bannerType) {
        try {
            if (fw.bannerManager.bannerCacheExpireTime != null && fw.bannerManager.bannerCacheExpireTime != undefined) {
                var expireTime = fw.bannerManager.bannerCacheExpireTime[_bannerType];
                var currentTime = (new Date).getTime();
                if (currentTime <= expireTime && (fw.bannerManager.bannerCache != null && (fw.bannerManager.bannerCache != undefined && (fw.bannerManager.bannerCache[_bannerType] != null &&
                    fw.bannerManager.bannerCache[_bannerType] != undefined))))return fw.bannerManager.bannerCache[_bannerType]
            }
            return null
        } catch (ex) {
            ex.errMethod = "getBannerFromCache";
            ex.errClass = "BannerManager";
            fw.err(ex)
        }
    }
});
