PCManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting PcManager")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, isProgramPCSafe: function (_program) {
        try {
            var pcSets = fw.mwManager.getParentalControlSettings();
            fw.log.debug("isProgramPCSafe start check");
            if (_program != null && (_program != undefined && (pcSets != null && pcSets != undefined))) {
                fw.log.debug("isProgramPCSafe PC enabled:" + pcSets.enabled);
                if (!pcSets.enabled) {
                    fw.log.debug("isProgramPCSafe PC not enabled:TRUE");
                    return true
                }
                var mpaaProgramLevel = _program.mpaaRating;
                if (mpaaProgramLevel != null && (mpaaProgramLevel != undefined && (mpaaProgramLevel != "" && mpaaProgramLevel != "AL"))) {
                    fw.log.debug("isProgramPCSafe check on MPAA program:" + mpaaProgramLevel);
                    var mpaaLevel = this.getPCRatingLevel(pcSets.ratings, "MPAA");
                    fw.log.debug("isProgramPCSafe check on MPAA user:" + mpaaLevel);
                    if (mpaaLevel != null && (mpaaLevel != "" && parseInt(mpaaProgramLevel) > parseInt(mpaaLevel))) {
                        fw.log.debug("isProgramPCSafe check MPAA not pass:FALSE");
                        return false
                    }
                }
                var vchipProgramLevel =
                    _program.parentalRating;
                if (vchipProgramLevel != null && (vchipProgramLevel != undefined && (vchipProgramLevel != "" && vchipProgramLevel != "AL"))) {
                    fw.log.debug("isProgramPCSafe check on VCHIP program:" + vchipProgramLevel);
                    var vchipLevel = this.getPCRatingLevel(pcSets.ratings, "VCHIP");
                    fw.log.debug("isProgramPCSafe check on VCHIP user:" + vchipLevel);
                    if (vchipLevel != null && (vchipLevel != "" && parseInt(vchipProgramLevel) > parseInt(vchipLevel))) {
                        fw.log.debug("isProgramPCSafe check VCHIP not pass:FALSE");
                        return false
                    }
                }
                var extRatingProgram =
                    _program.expandedParentalRating;
                if (extRatingProgram != null && (extRatingProgram != undefined && extRatingProgram != "")) {
                    fw.log.debug("isProgramPCSafe check on ER:" + extRatingProgram);
                    var erProgramList = extRatingProgram.split(",");
                    if (erProgramList != null && (erProgramList != undefined && erProgramList.length > 0)) {
                        var erList = this.getExtPCRatingLevel(pcSets.ratings);
                        fw.log.debug("isProgramPCSafe check on ER user:", erList);
                        for (var i = 0; i < erProgramList.length; i++)if (this.isErPresentInList(erProgramList[i], erList)) {
                            fw.log.debug("isProgramPCSafe check ER not pass:FALSE");
                            return false
                        }
                    }
                }
            }
            fw.log.debug("isProgramPCSafe check pass:TRUE");
            return true
        } catch (ex) {
            ex.errMethod = "isPCSafe";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, isErPresentInList: function (_erToCheck, _erList) {
        try {
            if (_erList != null && (_erList != undefined && (_erList.length > 0 && (_erToCheck != null && _erToCheck != undefined))))for (var i = 0; i < _erList.length; i++)if (_erList[i] == _erToCheck)return true;
            return false
        } catch (ex) {
            ex.errMethod = "isErPresentInList";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, getExtPCRatingLevel: function (_ratings) {
        try {
            var returnErList =
                new Array;
            if (_ratings != null && (_ratings != undefined && _ratings.length > 0))for (var i = 0; i < _ratings.length; i++)if (_ratings[i] != null && (_ratings[i] != undefined && _ratings[i].ratingType == "ER"))returnErList.push(_ratings[i].ratingCode);
            return returnErList
        } catch (ex) {
            ex.errMethod = "getExtPCRatingLevel";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, getPCRatingLevel: function (_ratings, _ratingType) {
        try {
            if (_ratings != null && (_ratings != undefined && (_ratings.length > 0 && (_ratingType != null && _ratingType != undefined))))for (var i = 0; i < _ratings.length; i++)if (_ratings[i] !=
                null && (_ratings[i] != undefined && _ratings[i].ratingType == _ratingType))return _ratings[i].ratingCode;
            return ""
        } catch (ex) {
            ex.errMethod = "getPCRatingLevel";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, checkPCLevel: function (_isPcSafe) {
        try {
            return !_isPcSafe && !fw.mwManager.isTimerActive()
        } catch (ex) {
            ex.errMethod = "checkPCLevel";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, showOnlyTitles: function () {
        try {
            var parentalControlSets = fw.mwManager.getParentalControlSettings();
            return !fw.mwManager.isTimerActive() && (parentalControlSets.enabled &&
                parentalControlSets.showAllTitles)
        } catch (ex) {
            ex.errMethod = "showOnlyTitles";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, checkPCPin: function (_callerCallbackMethod, _callerCallbackObj, _hasLiveVideo) {
        try {
            fw.pcmanager.callerCallbackMethod = _callerCallbackMethod;
            fw.pcmanager.callerCallbackObj = _callerCallbackObj;
            var popupConfObj = new Object;
            popupConfObj.forPurchase = "N";
            popupConfObj.hasLiveVideo = _hasLiveVideo != null && (_hasLiveVideo != undefined && _hasLiveVideo == "Y") ? "Y" : "N";
            fw.popupManager.showPopup(fw.conf.popupPcPINName,
                popupConfObj, fw.pcmanager.checkPCPinCallback, fw.pcmanager)
        } catch (ex) {
            ex.errMethod = "checkPCPin";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, checkPCPinCallback: function (_resultObj) {
        try {
            var retValue = _resultObj == true ? "OK" : "KO";
            fw.pcmanager.callerCallbackMethod.apply(fw.pcmanager.callerCallbackObj, new Array(retValue))
        } catch (ex) {
            ex.errMethod = "checkPCPinCallback";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }, checkPCPinFunction: function (_insertedPin) {
        try {
            if (fw.mwManager.verifySettingsPIN(_insertedPin)) {
                var parentalControlSets =
                    fw.mwManager.getParentalControlSettings();
                if (parentalControlSets.timeout != null && (parentalControlSets.timeout != undefined && parentalControlSets.timeout > 0))fw.mwManager.disarm();
                return true
            }
            return false
        } catch (ex) {
            ex.errMethod = "checkPCPinFunction";
            ex.errClass = "PCManager";
            fw.err(ex)
        }
    }
});
