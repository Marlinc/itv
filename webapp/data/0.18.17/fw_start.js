function getHWVersion() {
    if (navigator.userAgent.indexOf("NSN") != -1)return UTC.Data.getHardwareVersion(); else return "Motorola_VIP1853"
}
function getAutoupdateGroup(_autoupdateGroupNumberList) {
    if (navigator.userAgent.indexOf("NSN") != -1) {
        var userGroups = UTC.Data.getGroupsList();
        if (userGroups != null && (userGroups != undefined && (userGroups.length > 0 && (_autoupdateGroupNumberList != null && (_autoupdateGroupNumberList != undefined && _autoupdateGroupNumberList.length > 0)))))for (var i = 0; i < _autoupdateGroupNumberList.length; i++)for (var j = 0; j < userGroups.length; j++)if (_autoupdateGroupNumberList[i] == userGroups[j].id)return userGroups[j].id
    }
    return "Default"
}
function getFirmwareVersion() {
    if (navigator.userAgent.indexOf("NSN") != -1)return UTC.Data.getSoftwareVersion(); else return "3.0.5_1.dev"
}
function doCallSync(_method, _url, _urlDefault) {
    try {
        var req = new XMLHttpRequest;
        console.warn("start-conf " + _method + " request : " + _url);
        req.open(_method, _url, false);
        req.setRequestHeader("Access-Control-Max-Age", "0");
        req.send(null);
        if (req.status == 200) {
            console.warn("start-conf " + _url + " : req.status == 200");
            console.warn("start-conf OK : " + _url);
            var res = null;
            eval("res = " + req.responseText);
            return res
        } else if (_urlDefault != undefined && this.countReTry < 3) {
            console.warn("start-conf try Default" + _urlDefault);
            this.countReTry++;
            return doCallSync(_method, _urlDefault, _urlDefault)
        } else {
            console.warn("start-conf " + _url + " : other req.status");
            console.warn("start-conf KO : " + _url);
            return null
        }
    } catch (ex) {
        console.warn("start-conf " + ex)
    }
}
function callBackLoadMultiJsFile() {
    $j = jQuery.noConflict();
    fw.init()
}
function loadMultiJsFile(_path, ListJs, _index) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", _path + ListJs[_index]);
    script.onreadystatechange = script.onload = function () {
        if (_index === ListJs.length - 1)callBackLoadMultiJsFile(); else loadMultiJsFile(_path, ListJs, _index + 1)
    };
    script.onerror = function () {
        console.warn("!!! loadMultiJsFile - ERROR " + src)
    };
    if (typeof script != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(script);
        console.warn(script.getAttribute("src") + " Loaded")
    }
}
function stringToInt(_string) {
    var number = null;
    _string != undefined || _string != null ? number = parseInt(_string) : number = 0;
    if (isNaN(number))return 0; else return number
}
function softwareVersionToNumbers(softwareVersion) {
    if (softwareVersion == undefined || softwareVersion == null)return new Array(0, 0, 0, 0);
    var softwareVersionArray = softwareVersion.split(".");
    var returnArray = new Array(4);
    returnArray[0] = stringToInt(softwareVersionArray[0]);
    if (softwareVersionArray.length > 1)returnArray[1] = stringToInt(softwareVersionArray[1]); else returnArray[1] = 0;
    if (softwareVersionArray.length > 2) {
        var softwSubVersionArray = softwareVersionArray[2].split("_");
        returnArray[2] = stringToInt(softwSubVersionArray[0]);
        if (softwSubVersionArray.length > 1)returnArray[3] = stringToInt(softwSubVersionArray[1]); else returnArray[3] = 0
    } else {
        returnArray[2] = 0;
        returnArray[3] = 0
    }
    return returnArray
}
function softwareVersionCompare(version1, version2) {
    for (var i = 0; i < 4; i++)if (version1[i] > version2[i])return 1; else if (version1[i] < version2[i])return -1;
    return 0
}
function start() {
    this.countReTry = 0;
    var releaseVersionUrl = "./fw_release_version.json";
    var releaseVersionConf = doCallSync("GET", releaseVersionUrl, releaseVersionUrl);
    var urlFrameworkStartConf = "../../conf/" + releaseVersionConf.releaseVersion + "/fw_start_conf.json";
    var fwStartConf = doCallSync("GET", urlFrameworkStartConf, urlFrameworkStartConf);
    var autoupdateGroupNumberList = fwStartConf != null && fwStartConf != undefined ? fwStartConf.autoupdateGroupNumberList : null;
    this.countReTry = 0;
    var urlFrameworkVersion = "../../conf/" +
        releaseVersionConf.releaseVersion + "/Version_" + getHWVersion() + "_" + getAutoupdateGroup(autoupdateGroupNumberList) + ".json";
    var urlFrameworkVersionDefault = "../../conf/" + releaseVersionConf.releaseVersion + "/Version_Default_Default.json";
    var res = doCallSync("GET", urlFrameworkVersion, urlFrameworkVersionDefault);
    var versionObj = null;
    if (res != null)try {
        var firmwareVersion = getFirmwareVersion();
        var firmwareVersionNumbers = softwareVersionToNumbers(firmwareVersion);
        var versioning = res.versioning;
        for (i = 0; i < versioning.length; i++) {
            rule =
                versioning[i].rule;
            if ((rule.min != undefined || rule.min != null) && (rule.max != undefined || rule.max != null)) {
                var ruleMinNumber = softwareVersionToNumbers(rule.min);
                var ruleMaxNumber = softwareVersionToNumbers(rule.max);
                if (softwareVersionCompare(firmwareVersionNumbers, ruleMinNumber) >= 0 && softwareVersionCompare(firmwareVersionNumbers, ruleMaxNumber) <= 0) {
                    versionObj = versioning[i].values;
                    break
                }
            } else if ((rule.min != undefined || rule.min != null) && (rule.max === undefined || rule.max === null)) {
                var ruleMinNumber = softwareVersionToNumbers(rule.min);
                if (softwareVersionCompare(firmwareVersionNumbers, ruleMinNumber) >= 0) {
                    versionObj = versioning[i].values;
                    break
                }
            } else if ((rule.min === undefined || rule.min === null) && (rule.max != undefined || rule.max != null)) {
                var ruleMaxNumber = softwareVersionToNumbers(rule.max);
                if (softwareVersionCompare(firmwareVersionNumbers, ruleMaxNumber) <= 0) {
                    versionObj = versioning[i].values;
                    break
                }
            }
        }
        var urlToRetriveJsFw = "./Framework/" + versionObj.Framework + "/jsListFile.json";
        var resJsList = doCallSync("GET", urlToRetriveJsFw);
        if (resJsList != null)loadMultiJsFile("./Framework/" +
            versionObj.Framework, resJsList.jsFileList, 0); else console.warn("start-conf call JsList is null")
    } catch (ex) {
        console.warn("start " + ex)
    } else console.warn("start-conf call version is null")
}
start();
