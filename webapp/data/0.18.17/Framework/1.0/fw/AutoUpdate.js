AutoUpdate = Class.create({
    init: function () {
        try {
            fw.autoUpdate.versionObj = null;
            fw.startingReleaseVersion = null;
            fw.autoUpdate.getVersionJson();
            fw.conf = fw.autoUpdate.getConfJson();
            fw.messages = fw.autoUpdate.getFWMessagesJson();
            var time = Math.floor(Math.random() * (fw.conf.autoupdateDeltaRandomMaxMs - fw.conf.autoupdateDeltaRandomMinMs + 1)) + fw.conf.autoupdateDeltaRandomMinMs;
            setTimeout("fw.autoUpdate.timeoutCallBack(fw.conf.autoupdateIntervalMs)", time)
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    },
    timeoutCallBack: function (_interval) {
        try {
            setTimeout(fw.autoUpdate.periodicalCallBack, _interval)
        } catch (ex) {
            ex.errMethod = "timeoutCallBack";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, periodicalCallBack: function () {
        try {
            var actualFWVersion = fw.autoUpdate.getFwVersion();
            var actualVersionObj = fw.autoUpdate.versionObj;
            fw.autoUpdate.getVersionJson();
            if (fw.util.compareVersion(fw.autoUpdate.getFwVersion(), actualFWVersion)) {
                fw.log.info("UPDATE FrameWork");
                fw.log.info("FrameWork force RELOAD");
                fw.mwManager.forceReload();
                fw.log.info("FrameWork NO-UPDATE after force RELOAD");
                fw.autoUpdate.versionObj = actualVersionObj;
                fw.autoUpdate.timeoutCallBack(fw.conf.autoupdateIntervalMs)
            } else {
                fw.log.info("FrameWork NO-UPDATE");
                fw.autoUpdate.timeoutCallBack(fw.conf.autoupdateIntervalMs)
            }
        } catch (ex) {
            ex.errMethod = "periodicalCallBack";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getConfJson: function () {
        try {
            url = "./Framework/" + fw.autoUpdate.getFwVersion() + "/fwconf_" + fw.mwManager.getHardwareVersion() + ".json";
            var res = fw.dataManager.doCallSync("GET",
                url, true, false);
            if (res != null)return res.fwConf; else fw.log.info("getConfJson at url +" + url + " is null")
        } catch (ex) {
            ex.errMethod = "getConfJson";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, updateForceConf: function () {
        try {
            if (fw.appManager != null && (fw.appManager != undefined && fw.appManager.isHtmlApplicationShown == true))fw.autoUpdate.getForceConfFromStorage();
            setTimeout("fw.autoUpdate.updateForceConf()", fw.conf.updateForceConfIntervalMs)
        } catch (ex) {
            ex.errMethod = "updateForceConf";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    },
    getForceConfFromStorage: function () {
        try {
            var objectFromStorage = fw.userPreferenceStorage.getPreferenceFromStorage(fw.conf.updateForceConfLabel);
            if (objectFromStorage != null && objectFromStorage != undefined) {
                var results = objectFromStorage.split("|");
                for (var i = 0; i < results.length; i++) {
                    var key = results[i++];
                    var value = results[i];
                    if (key != undefined && (value != undefined && (key != null && (value != null && (key != "" && value != "")))))eval("fw.conf." + key + ' = "' + value + '"')
                }
            }
            fw.userPreferenceStorage.setPreferenceInStorage("LAST_CHECK",
                (new Date).getTime())
        } catch (ex) {
            ex.errMethod = "getForceConfFromStorage";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getFWMessagesJson: function () {
        try {
            url = "./Framework/" + fw.autoUpdate.getFwVersion() + "/fwMessages_" + fw.mwManager.getUserLanguage().toLowerCase() + ".json";
            var res = fw.dataManager.doCallSync("GET", url, true, false);
            if (res != null)return res.messageConf; else console.warn("getFWMessagesJson at url +" + url + " is null")
        } catch (ex) {
            ex.errMethod = "getFWMessagesJson";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getVersionJson: function () {
        try {
            fw.dataManager.countReTry =
                0;
            var releaseVersionUrl = "./fw_release_version.json";
            fw.releaseVersionConf = doCallSync("GET", releaseVersionUrl, releaseVersionUrl);
            var urlFrameworkStartConf = "../../conf/" + fw.releaseVersionConf.releaseVersion + "/fw_start_conf.json";
            fw.fwStartConf = fw.dataManager.doCallVersionData("GET", urlFrameworkStartConf, null, true, false);
            this.setReleaseVersion();
            var autoupdateGroupNumberList = fw.fwStartConf != null && fw.fwStartConf != undefined ? fw.fwStartConf.autoupdateGroupNumberList : null;
            var url = "../../conf/" + fw.releaseVersionConf.releaseVersion +
                "/Version_" + fw.mwManager.getHardwareVersion() + "_" + fw.subscriberDataManager.getAutoupdateGroup(autoupdateGroupNumberList) + ".json";
            var defaultUrl = "../../conf/" + fw.releaseVersionConf.releaseVersion + "/Version_Default_Default.json";
            fw.dataManager.countReTry = 0;
            var res = fw.dataManager.doCallVersionData("GET", url, defaultUrl, true, false);
            if (res != null) {
                var firmwareVersion = fw.util.softwareVersionToNumbers(fw.mwManager.getSoftwareVersion());
                var versioning = res.versioning;
                for (i = 0; i < versioning.length; i++) {
                    rule = versioning[i].rule;
                    if ((rule.min != undefined || rule.min != null) && (rule.max != undefined || rule.max != null)) {
                        var ruleMinNumber = fw.util.softwareVersionToNumbers(rule.min);
                        var ruleMaxNumber = fw.util.softwareVersionToNumbers(rule.max);
                        if (this.softwareVersionCompare(firmwareVersion, ruleMinNumber) >= 0 && this.softwareVersionCompare(firmwareVersion, ruleMaxNumber) <= 0) {
                            fw.autoUpdate.versionObj = versioning[i].values;
                            break
                        }
                    } else if ((rule.min != undefined || rule.min != null) && (rule.max === undefined || rule.max === null)) {
                        var ruleMinNumber = fw.util.softwareVersionToNumbers(rule.min);
                        if (this.softwareVersionCompare(firmwareVersion, ruleMinNumber) >= 0) {
                            fw.autoUpdate.versionObj = versioning[i].values;
                            break
                        }
                    } else if ((rule.min === undefined || rule.min === null) && (rule.max != undefined || rule.max != null)) {
                        var ruleMaxNumber = fw.util.softwareVersionToNumbers(rule.max);
                        if (this.softwareVersionCompare(firmwareVersion, ruleMaxNumber) <= 0) {
                            fw.autoUpdate.versionObj = versioning[i].values;
                            break
                        }
                    }
                }
            } else fw.log.debug("getVersionJson at url +" + url + " is null")
        } catch (ex) {
            ex.errMethod = "getVersionJson";
            ex.errClass =
                "AutoUpdate";
            fw.err(ex)
        }
    }, getFwVersion: function () {
        try {
            return fw.autoUpdate.versionObj.Framework
        } catch (ex) {
            ex.errMethod = "getFwVersion";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, softwareVersionCompare: function (version1, version2) {
        for (var i = 0; i < 4; i++)if (version1[i] > version2[i])return 1; else if (version1[i] < version2[i])return -1;
        return 0
    }, getUpdateMethod: function () {
        try {
            return fw.autoUpdate.versionObj.UpdateMode
        } catch (ex) {
            ex.errMethod = "getUpdateMethod";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getAppVersion: function (_appId) {
        try {
            return eval("fw.autoUpdate.versionObj." +
                _appId + ".version;")
        } catch (ex) {
            ex.errMethod = "getAppVersion";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getAppIsPrecached: function (_appId) {
        try {
            return eval("fw.autoUpdate.versionObj." + _appId + ".isPrecached;")
        } catch (ex) {
            ex.errMethod = "getAppIsPrecached";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getPrecachedAppIds: function () {
        try {
            var result = new Array;
            for (var key in fw.autoUpdate.versionObj) {
                _appObj = fw.autoUpdate.versionObj[key].isPrecached;
                if (_appObj != undefined && _appObj === "true")result.push(key)
            }
            return result
        } catch (ex) {
            ex.errMethod =
                "getPrecachedAppIds";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getAppRequiredPackages: function (_appId) {
        try {
            var retVal = eval("fw.autoUpdate.versionObj." + _appId + ".requiredPkgs;");
            return retVal != null && retVal != undefined ? retVal : new Array
        } catch (ex) {
            ex.errMethod = "getAppRequiredPackages";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getAppApplicationTypes: function (_appId) {
        try {
            var retVal = eval("fw.autoUpdate.versionObj." + _appId + ".applicationTypes;");
            return retVal != null && retVal != undefined ? retVal : new Array
        } catch (ex) {
            ex.errMethod =
                "getAppApplicationTypes";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getAppLcdiApplicationTypes: function (_appId) {
        try {
            var retVal = eval("fw.autoUpdate.versionObj." + _appId + ".lcdiApplicationTypes;");
            return retVal != null && retVal != undefined ? retVal : new Array
        } catch (ex) {
            ex.errMethod = "getAppLcdiApplicationTypes";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getApplicationIdFromApplicationType: function (_applicationType) {
        try {
            for (var key in fw.autoUpdate.versionObj) {
                var appTypes = fw.autoUpdate.getAppApplicationTypes(key);
                if (appTypes.size() >
                    0)for (var j = 0; j < appTypes.size(); j++)if (appTypes[j] == _applicationType)return key
            }
            return null
        } catch (ex) {
            ex.errMethod = "getPrecachedAppIds";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, setReleaseVersion: function () {
        try {
            if (fw.fwStartConf != null && (fw.fwStartConf != undefined && (fw.releaseVersionConf.releaseVersion != null && (fw.releaseVersionConf.releaseVersion != undefined && (fw.startingReleaseVersion == null || fw.startingReleaseVersion == undefined)))))fw.startingReleaseVersion = fw.releaseVersionConf.releaseVersion
        } catch (ex) {
            ex.errMethod =
                "setReleaseVersion";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getOnScreenReleaseVersion: function () {
        try {
            return fw.releaseVersionConf.onScreenReleaseVersion
        } catch (ex) {
            ex.errMethod = "getOnScreenReleaseVersion";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }, getReleaseVersion: function () {
        try {
            return fw.startingReleaseVersion != null && fw.startingReleaseVersion != undefined ? fw.startingReleaseVersion : ""
        } catch (ex) {
            ex.errMethod = "getReleaseVersion";
            ex.errClass = "AutoUpdate";
            fw.err(ex)
        }
    }
});
