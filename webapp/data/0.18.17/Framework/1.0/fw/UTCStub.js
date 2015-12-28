var UTCStub = Class.create({
    initialize: function () {
        this.Reminders = new Object;
        this.PPV = new Object;
        this.Data = new Object;
        this.Reminders.getReminderInTimeout = false;
        this.Reminders.modifyReminderInTimeout = false;
        this.Reminders.modifyReminderInConflict = false;
        this.Reminders.ppvInConflictDefault = {
            "programReferenceNumber": "SH000000694385",
            "programStartTime": 1379030400,
            "programInfoType": "CURRENT",
            "title": "Feuten",
            "alternateTitles": [],
            "subtitle": "",
            "alternateSubtitles": [],
            "episodeTitle": "",
            "programType": "P",
            "category": "Series",
            "subcategory": "",
            "mpaaRating": "",
            "parentalRating": "12",
            "expandedParentalRating": "S,G,D",
            "yearofReleaseOnMovies": 2011,
            "qualityStarRatingsOnMovies": "",
            "countryOfOriginOnMovies": "",
            "trueDuration": 34,
            "directorOnMovies": "",
            "actorsOnMovies": ["Hanna Verboom", "Manuel Broekman", "Tim Murck"],
            "expandedRating": "",
            "Descriptions": ["over het studentencorps. Bram is een slagerszoon uit een klein dorp. Hij loopt over van ambitie en heeft zich met zijn jeugdvriend Joep bij het studentencorps ingeschreven. Als eerstejaars moet Bram zich bewijzen bij een hechte club die drank en seks als belangrijkste bindmiddel lijken te hebben. Nadat hij bevriend raakt met de charismatische Olivier en zijn bloedmooie zus Marie-Claire, ziet de toekomst er rooskleurig uit. Maar als de o",
                "ntgroening dramatisch uit de hand loopt, komen Bram en zijn vrienden voor levensbepalende keuzes te staan."],
            "isBlackAndWhite": false,
            "isVideo": false,
            "isSurroundSound": true,
            "isSeasonalProgram": false,
            "isInfomerical": false,
            "isAnimatedProgram": false,
            "isLetterboxVersion": false,
            "itemId": 33,
            "isMusicVideo": false,
            "assetPreviewUrl": "",
            "movieJpeg": "",
            "studioLogoUrl": "http://192.168.7.40/stub_evo/iptv3.0/app/Apps/Common/Resources/Images/1.0/channelLogos/skynews.png",
            "sourceType": "",
            "showType": "",
            "syndicatedEpisodeNumber": "0",
            "alternateSyndicatedEpisodeNumber": "0",
            "infoPage": "",
            "seriesId": "",
            "channelId": 3,
            "hasReminder": false
        };
        this.Reminders.ReminderResult = {SUCCESS: 0, KO_REMINDER_IN_CONFLICT: -1, FAILURE: -2};
        this.PPV.getPPVInTimeout = false;
        this.PPV.isPPVRentedDefault = true;
        this.PPV.ppvPriceValue = 299;
        this.PPV.RentPPVResult = {SUCCESS: 0, KO_PPV_ALREADY_FINISHED: -1, FAILURE: -2};
        this.Data.reminderTimeToStartDefault = 300;
        this.Data.getReminderTimeToStartDefaultValue = function () {
            return this.reminderTimeToStartDefault
        };
        this.Reminders.getReminder =
            function (_requestId, _ppvItem) {
                if (this.getReminderInTimeout)this.invokeSignalGetReminderResponse(_requestId, new Object); else {
                    var url = "../../stubJSON/PPV/reminder_" + _ppvItem.programReferenceNumber + ".json";
                    fw.dataManager.doCallAsync("GET", url, new Array(_requestId), this, this.callbackGetReminder)
                }
            };
        this.Reminders.callbackGetReminder = function (_reminderResp, _param) {
            var requestId = _param[0];
            this.invokeSignalGetReminderResponse(requestId, _reminderResp)
        };
        this.Reminders.getReminderResponse = new Object;
        this.Reminders.getReminderResponse.connect =
            function (f) {
                this.getReminderResponseFunction = f
            };
        this.Reminders.getReminderResponse.disconnect = function (f) {
            this.getReminderResponseFunction = null
        };
        this.Reminders.invokeSignalGetReminderResponse = function (_requestId, _reminderItem) {
            if (this.getReminderResponse.getReminderResponseFunction != null && this.getReminderResponse.getReminderResponseFunction != undefined)this.getReminderResponse.getReminderResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _reminderItem))
        };
        this.Reminders.setReminder = function (_requestId,
                                               _ppvItem, _reminderItem) {
            if (this.modifyReminderInTimeout)this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.FAILURE, new Object); else if (this.modifyReminderInConflict)this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.KO_REMINDER_IN_CONFLICT, this.ppvInConflictDefault); else this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.SUCCESS, new Object)
        };
        this.Reminders.updateReminder = function (_requestId, _ppvItem, _reminderItem) {
            if (this.modifyReminderInTimeout)this.invokeSignalModifyReminderResponse(_requestId,
                this.ReminderResult.FAILURE, new Object); else if (this.modifyReminderInConflict)this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.KO_REMINDER_IN_CONFLICT, this.ppvInConflictDefault); else this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.SUCCESS, new Object)
        };
        this.Reminders.deleteReminder = function (_requestId, _ppvItem, _reminderItem) {
            if (this.modifyReminderInTimeout)this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.FAILURE, new Object); else if (this.modifyReminderInConflict)this.invokeSignalModifyReminderResponse(_requestId,
                this.ReminderResult.KO_REMINDER_IN_CONFLICT, this.ppvInConflictDefault); else this.invokeSignalModifyReminderResponse(_requestId, this.ReminderResult.SUCCESS, new Object)
        };
        this.Reminders.modifyReminderResponse = new Object;
        this.Reminders.modifyReminderResponse.connect = function (f) {
            this.modifyReminderResponseFunction = f
        };
        this.Reminders.modifyReminderResponse.disconnect = function (f) {
            this.modifyReminderResponseFunction = null
        };
        this.Reminders.invokeSignalModifyReminderResponse = function (_requestId, _reminderResult,
                                                                      _ppvInConflictItem) {
            if (this.modifyReminderResponse.modifyReminderResponse != null && this.modifyReminderResponse.modifyReminderResponse != undefined)this.modifyReminderResponse.modifyReminderResponse.apply(fw.mwRequestManager, new Array(_requestId, _reminderResult, _ppvInConflictItem))
        };
        this.PPV.getPPV = function (_requestId) {
            if (this.getPPVInTimeout)this.invokeSignalGetPPVResponse(_requestId, new Array); else {
                var url = "../../stubJSON/PPV/getPPV.json";
                fw.dataManager.doCallAsync("GET", url, new Array(_requestId), this,
                    this.callbackGetPPV)
            }
        };
        this.PPV.callbackGetPPV = function (_ppvResp, _param) {
            var requestId = _param[0];
            this.invokeSignalGetPPVResponse(requestId, _ppvResp)
        };
        this.PPV.getPPVResponse = new Object;
        this.PPV.getPPVResponse.connect = function (f) {
            this.getPPVResponseFunction = f
        };
        this.PPV.getPPVResponse.disconnect = function (f) {
            this.getPPVResponseFunction = null
        };
        this.PPV.invokeSignalGetPPVResponse = function (_requestId, _ppvResp) {
            if (this.getPPVResponse.getPPVResponseFunction != null && this.getPPVResponse.getPPVResponseFunction !=
                undefined)this.getPPVResponse.getPPVResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _ppvResp))
        };
        this.PPV.isPPVRented = function (_ppvItem) {
            return this.isPPVRentedDefault
        };
        this.PPV.rentPPV = function (_requestId, _ppvItem) {
            this.invokeSignalRentPPVResponse(_requestId, this.RentPPVResult.SUCCESS, 0)
        };
        this.PPV.rentPPVResponse = new Object;
        this.PPV.rentPPVResponse.connect = function (f) {
            this.rentPPVResponseFunction = f
        };
        this.PPV.rentPPVResponse.disconnect = function (f) {
            this.rentPPVResponseFunction = null
        };
        this.PPV.invokeSignalRentPPVResponse = function (_requestId, _rentResult, _errorCode) {
            if (this.rentPPVResponse.rentPPVResponseFunction != null && this.rentPPVResponse.rentPPVResponseFunction != undefined)this.rentPPVResponse.rentPPVResponseFunction.apply(fw.mwRequestManager, new Array(_requestId, _rentResult, _errorCode))
        };
        this.PPV.getPPVRentalCost = function (_ppvItem) {
            return this.ppvPriceValue
        }
    }
});
