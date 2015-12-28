SubscriberDataManager = Class.create({
    initialize: function () {
        try {
            this.userPackages = new Array;
            this.allChannels = new Array;
            this.vooruitIds = new Array;
            console.warn("INSIDE SubscriberDataManager.initialize END")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, init: function () {
        try {
            this.updateUserPackages();
            this.updateDtvlineup()
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, updateSubscriberData: function () {
        try {
            fw.subscriberDataManager.updateUserPackages()
        } catch (ex) {
            ex.errMethod =
                "updateSubscriberData";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, updateGlobalInstall: function () {
        try {
            fw.subscriberDataManager.updateUserPackages()
        } catch (ex) {
            ex.errMethod = "updateGlobalInstall";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, updateDtvlineup: function () {
        try {
            fw.subscriberDataManager.allChannels = fw.mwManager.getAllChannels()
        } catch (ex) {
            ex.errMethod = "updateDtvlineup";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, updateUserPackages: function () {
        try {
            var userPackageIds = fw.mwManager.getSubscribedPackages();
            var filteredPackages = fw.mwManager.getPackages(userPackageIds);
            fw.subscriberDataManager.userPackages = filteredPackages
        } catch (ex) {
            ex.errMethod = "updateUserPackages";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, updateVooruit: function () {
        try {
            this.doCallUpdateVooruit(fw.conf.RentItmVooruitFilterList)
        } catch (ex) {
            ex.errMethod = "updateVooruit";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, doCallUpdateVooruit: function (_pathList) {
        try {
            if (_pathList.length > 0) {
                var path = _pathList.pop();
                fw.mwManager.getCategoryFromCategoryPath(path,
                    fw.subscriberDataManager.getCategoryIdVooruitCallback, fw.subscriberDataManager, _pathList)
            }
        } catch (ex) {
            ex.errMethod = "doCallUpdateVooruit";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getCategoryIdVooruitCallback: function (_prop, _obj) {
        try {
            if (_obj != null && (_obj != undefined && (_obj.categoryId != undefined && _obj.categoryId != null))) {
                fw.subscriberDataManager.vooruitIds = new Array;
                fw.subscriberDataManager.vooruitIds.push(_obj.categoryId);
                if (!_obj.isLeaf)fw.mwManager.getSubCategoriesFromCategoryId(_obj.categoryId,
                    fw.subscriberDataManager.getSubCategoriesVooruitCallback, fw.subscriberDataManager, _prop); else this.doCallUpdateVooruit(_prop)
            }
        } catch (ex) {
            ex.errMethod = "getCategoryIdVooruitCallback";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getSubCategoriesVooruitCallback: function (_callerCallbackParams, _categories) {
        try {
            if (_categories != null && _categories.length > 0)for (var i = 0; i < _categories.length; i++)if (_categories[i].categoryId != undefined && _categories[i].categoryId != null)fw.subscriberDataManager.vooruitIds.push(_categories[i].categoryId);
            this.doCallUpdateVooruit(_callerCallbackParams)
        } catch (ex) {
            ex.errMethod = "getSubCategoriesVooruitCallback";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getVooruitIds: function () {
        try {
            return fw.subscriberDataManager.vooruitIds
        } catch (ex) {
            ex.errMethod = "getVooruitIds";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, isChannelHd: function (_channelId) {
        try {
            var channelRet = this.getChannelByChannelId(_channelId);
            if (channelRet != null && channelRet != undefined)return channelRet.isHD;
            return false
        } catch (ex) {
            ex.errMethod =
                "isChannelHd";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getChannelByChannelId: function (_channelId) {
        try {
            var channelList = this.allChannels;
            if (channelList != null && (channelList != undefined && channelList.length > 0))for (var i = 0; i < channelList.length; i++)if (channelList[i].channelId == _channelId)return channelList[i];
            return null
        } catch (ex) {
            ex.errMethod = "getChannelByChannelId";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getChannelLogoURLByChannelId: function (_channelId) {
        try {
            var channelObject = fw.subscriberDataManager.getChannelByChannelId(_channelId);
            if (channelObject != null && (channelObject != undefined && (channelObject.logoName != null && channelObject.logoName != undefined)))return fw.mwManager.getChannelLogoCompleteUrl(channelObject.logoName); else return fw.conf.CLEAR_IMAGE
        } catch (ex) {
            ex.errMethod = "getChannelLogoURLByChannelId";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getChannelByCallLetter: function (_channelCallLetter) {
        try {
            var channelList = this.allChannels;
            if (channelList != null && (channelList != undefined && channelList.length > 0))for (var i = 0; i < channelList.length; i++)if (channelList[i].callLetter ==
                _channelCallLetter)return channelList[i];
            return null
        } catch (ex) {
            ex.errMethod = "getChannelByCallLetter";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getStoredAllChannels: function () {
        try {
            return this.allChannels
        } catch (ex) {
            ex.errMethod = "getStoredAllChannels";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, isPackageInUserPackages: function (_packageToCheck, _userPackageIds) {
        try {
            if (_packageToCheck != null && (_packageToCheck != undefined && (_userPackageIds != null && (_userPackageIds != undefined && _userPackageIds.length >
                0)))) {
                var packageIdToCheck = _packageToCheck.packageId;
                if (packageIdToCheck != null && packageIdToCheck != undefined)for (var j = 0; j < _userPackageIds.length; j++)if (packageIdToCheck == _userPackageIds[j])return true
            }
            return false
        } catch (ex) {
            ex.errMethod = "isPackageInUserPackages";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getUserPackages: function () {
        try {
            return this.userPackages
        } catch (ex) {
            ex.errMethod = "getUserPackages";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackageId: function (_pkgIdToCheck) {
        try {
            if (this.userPackages !=
                null && (this.userPackages != undefined && this.userPackages.length > 0))for (var i = 0; i < this.userPackages.length; i++)if (this.userPackages[i].packageId == _pkgIdToCheck)return true;
            return false
        } catch (ex) {
            ex.errMethod = "checkUserPackageId";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackageIdList: function (_pkgIdListToCheck) {
        try {
            if (_pkgIdListToCheck != null && (_pkgIdListToCheck != undefined && _pkgIdListToCheck.length > 0)) {
                for (var j = 0; j < _pkgIdListToCheck.length; j++)if (!this.checkUserPackageId(_pkgIdListToCheck[j]))return false;
                return true
            }
            return true
        } catch (ex) {
            ex.errMethod = "checkUserPackageIdList";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getUserGroup: function () {
        try {
            return fw.mwManager.getGroupsList()
        } catch (ex) {
            ex.errMethod = "getUserGroup";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserGroupName: function (_groupName) {
        try {
            var userGroups = this.getUserGroup();
            if (userGroups != null && (userGroups != undefined && userGroups.length > 0))for (var i = 0; i < userGroups.length; i++)if (userGroups[i].name === _groupName)return true;
            return false
        } catch (ex) {
            ex.errMethod =
                "checkUserGroupName";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserGroupNumber: function (_groupNumber) {
        try {
            var userGroups = this.getUserGroup();
            if (userGroups != null && (userGroups != undefined && userGroups.length > 0))for (var i = 0; i < userGroups.length; i++)if (userGroups[i].id == _groupNumber)return true;
            return false
        } catch (ex) {
            ex.errMethod = "checkUserGroupNumber";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getUserGroupFromPrefix: function (_groupPrefix) {
        try {
            var userGroups = this.getUserGroup();
            if (userGroups !=
                null && (userGroups != undefined && userGroups.length > 0))for (var i = 0; i < userGroups.length; i++)if (fw.util.stringStartsWith(userGroups[i].name, _groupPrefix))return userGroups[i].name;
            return null
        } catch (ex) {
            ex.errMethod = "getUserGroupFromPrefix";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getAutoupdateGroup: function (_autoupdateGroupNumberList) {
        try {
            var userGroups = this.getUserGroup();
            if (userGroups != null && (userGroups != undefined && (userGroups.length > 0 && (_autoupdateGroupNumberList != null && (_autoupdateGroupNumberList !=
                undefined && _autoupdateGroupNumberList.length > 0)))))for (var i = 0; i < _autoupdateGroupNumberList.length; i++)for (var j = 0; j < userGroups.length; j++)if (_autoupdateGroupNumberList[i] == userGroups[j].id)return userGroups[j].id;
            return "Default"
        } catch (ex) {
            ex.errMethod = "getAutoupdateGroup";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getProfilingGroup: function () {
        try {
            return this.getUserGroupFromPrefix(fw.conf.profilingGroupPrefix)
        } catch (ex) {
            ex.errMethod = "getProfilingGroup";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    },
    isUserInProfilingGroup: function () {
        try {
            var userProfilingGroup = this.getProfilingGroup();
            return userProfilingGroup != null && userProfilingGroup != undefined
        } catch (ex) {
            ex.errMethod = "isUserInProfilingGroup";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, getRetailerLogo: function () {
        try {
            var fips = fw.mwManager.getFIPS();
            if (fips != null && fips != undefined) {
                var retailerLogo = eval("fw.conf.retailerLogoMapping.fips" + fips);
                if (retailerLogo != null && retailerLogo != undefined)return retailerLogo
            }
            return fw.conf.retailerLogoDefault
        } catch (ex) {
            ex.errMethod =
                "getRetailerLogo";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackageList: function (_pkgList) {
        try {
            if (_pkgList != null && (_pkgList != undefined && _pkgList.length > 0))for (var i = 0; i < _pkgList.length; i++) {
                var pkgObj = _pkgList[i];
                if (pkgObj != null && pkgObj != undefined)if (!this.checkUserPackage(pkgObj.pkType, pkgObj.pkSubtype))return false
            }
            return true
        } catch (ex) {
            ex.errMethod = "checkUserPackageList";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackage: function (_pkgType, _pkgSubtype) {
        try {
            var pkgType =
                eval(fw.conf.prefixItemPackageType + _pkgType);
            var pkgSubtype = _pkgSubtype != null && _pkgSubtype != undefined ? eval(fw.conf.prefixItemSubtypeType + _pkgSubtype) : null;
            if (pkgType != null && (pkgType != undefined && (this.userPackages != null && (this.userPackages != undefined && this.userPackages.length > 0))))for (var i = 0; i < this.userPackages.length; i++) {
                var packageTypes = this.userPackages[i].packageTypes;
                var packageSubtypes = this.userPackages[i].subtypeData;
                if (this.checkUserPackageType(packageTypes, packageSubtypes, pkgType, pkgSubtype))return true
            }
            return false
        } catch (ex) {
            ex.errMethod =
                "checkUserPackage";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackageType: function (_packageTypes, _packageSubtypes, _pkgType, _pkgSubtype) {
        try {
            if (_packageTypes != null && (_packageTypes != undefined && _packageTypes.length > 0))for (var j = 0; j < _packageTypes.length; j++)if (_packageTypes[j] == _pkgType)if (this.checkUserPackageSubtype(_packageSubtypes, _pkgSubtype))return true;
            return false
        } catch (ex) {
            ex.errMethod = "checkUserPackageType";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, checkUserPackageSubtype: function (_packageSubtypes,
                                          _pkgSubtype) {
        try {
            if (_pkgSubtype != null && _pkgSubtype != undefined)if (_packageSubtypes != null && (_packageSubtypes != undefined && _packageSubtypes.length > 0))for (var k = 0; k < _packageSubtypes.length; k++)if (_packageSubtypes[k] != null && (_packageSubtypes[k] != undefined && _packageSubtypes[k].subtype == _pkgSubtype))return true;
            return false
        } catch (ex) {
            ex.errMethod = "checkUserPackageSubtype";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }, userEnabledOTT: function () {
        try {
            return fw.mwManager.getConnectionMode() == fw.conf.natModeIdentifier &&
                this.checkUserPackageList(fw.conf.pkgListForOTT)
        } catch (ex) {
            ex.errMethod = "userEnabledOTT";
            ex.errClass = "SubscriberDataManager";
            fw.err(ex)
        }
    }
});
