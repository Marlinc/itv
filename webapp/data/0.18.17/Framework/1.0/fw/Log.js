Log = Class.create({
    initialize: function () {
        try {
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, consoleLog: function (_msg) {
        try {
            console.warn(_msg)
        } catch (ex) {
            ex.errMethod = "consoleLog";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, httpLog: function (_msg) {
        try {
            var req = new XMLHttpRequest;
            req.onreadystatechange = function () {
            };
            var _callUrl = fw.conf.logConf.logServerUrl +
                ":" + fw.conf.logConf.logServerPort + "/" + fw.conf.logConf.logServerServiceName + _msg;
            req.open("GET", _callUrl, true);
            req.send(null)
        } catch (ex) {
            ex.errMethod = "httpLog";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, alertLog: function (_msg) {
        try {
            alert(_msg)
        } catch (ex) {
            ex.errMethod = "alertLog";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, composeMsg: function (_msg, logLevel, _objToStringify) {
        try {
            var date =
                new Date;
            var day = date.getDate();
            if (day < 10)day = +0 + "" + day;
            var month = date.getMonth() + 1;
            if (month < 10)month = 0 + "" + month;
            var year = 1900 + date.getYear();
            var hour = date.getHours();
            if (hour < 10)hour = 0 + "" + hour;
            var minutes = date.getMinutes();
            if (minutes < 10)minutes = 0 + "" + minutes;
            var sec = date.getSeconds();
            if (sec < 10)sec = 0 + "" + sec;
            var dateComp = day + "" + month + "" + year + " " + hour + ":" + minutes + ":" + sec + "." + date.getMilliseconds();
            var userId = fw.mwManager.getSubscriberId();
            var macAdress = fw.mwManager.getMACAddress();
            var fwVersion = fw.autoUpdate.getFwVersion();
            var fmVersion = fw.mwManager.getSoftwareVersion();
            var hwVersion = fw.mwManager.getHardwareVersion();
            var relVersion = fw.autoUpdate.getReleaseVersion();
            var appId = "fw";
            if (fw.appManager != null && fw.appManager.getCurrentApp() != null)appId = fw.appManager.getCurrentApp(); else if (fw.conf.logDefaultAppId != undefined)appId = fw.conf.logDefaultAppId;
            var msgToReturn = dateComp + "|" + logLevel + "|" + userId + "|" + macAdress + "|" + hwVersion + "|" + fmVersion + "|" + fwVersion + "|" + relVersion + "|" + appId + "|" + _msg;
            if (_objToStringify != null && _objToStringify !=
                undefined)msgToReturn += " " + JSON.stringify(_objToStringify);
            return msgToReturn
        } catch (ex) {
            ex.errMethod = "composeMsg";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, debug: function (_msg, _objToStringify) {
        try {
            if (fw.conf.logEnable && fw.conf.logLevel === fw.conf.logDebug)this.printLog(this.composeMsg(_msg, fw.conf.logLevel, _objToStringify))
        } catch (ex) {
            ex.errMethod = "debug";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod +
                "|" + ex.message)
        }
    }, info: function (_msg, _objToStringify) {
        try {
            if (fw.conf.logEnable && (fw.conf.logLevel === fw.conf.logInfo || fw.conf.logLevel === fw.conf.logDebug))this.printLog(this.composeMsg(_msg, fw.conf.logInfo, _objToStringify))
        } catch (ex) {
            ex.errMethod = "info";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, warn: function (_msg, _objToStringify) {
        try {
            if (fw.conf.logEnable && (fw.conf.logLevel === fw.conf.logInfo || (fw.conf.logLevel === fw.conf.logDebug || fw.conf.logLevel ===
                fw.conf.logWarn)))this.printLog(this.composeMsg(_msg, fw.conf.logWarn, _objToStringify))
        } catch (ex) {
            ex.errMethod = "warn";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, error: function (_msg, _objToStringify) {
        try {
            if (fw.conf.logEnable && (fw.conf.logLevel === fw.conf.logInfo || (fw.conf.logLevel === fw.conf.logDebug || (fw.conf.logLevel === fw.conf.logWarn || fw.conf.logLevel === fw.conf.logError))))this.printLog(this.composeMsg(_msg, fw.conf.logError, _objToStringify))
        } catch (ex) {
            ex.errMethod =
                "error";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }, printLog: function (_msg) {
        try {
            if (fw.conf.logType === fw.conf.logHttp)this.httpLog(_msg); else if (fw.conf.logType === fw.conf.logConsole)this.consoleLog(_msg); else this.alertLog(_msg)
        } catch (ex) {
            ex.errMethod = "printLog";
            ex.errClass = "Log";
            console.warn("ERROR IN LOG FW COMPONENT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    }
});
