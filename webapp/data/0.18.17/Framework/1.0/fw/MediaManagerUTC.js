var MediaManagerUTC = Class.create({
    initialize: function () {
        try {
            this.PlayResult = fw.UTC.OD.PlayResult;
            this.PlaybackStateEnum = fw.UTC.Playback.PlaybackStateEnum;
            this.StopReason = fw.UTC.OD.StopReason;
            this.ReminderResult = fw.UTCStub.Reminders.ReminderResult;
            this.PlaybackType = fw.UTC.Playback.PlaybackType;
            this.tuneChangeCallbackObj = null;
            this.playbackStateChangeCallbackObj = null;
            this.playbackParameterChangeCallbackObj = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, playVOD: function (_movie,
                          _offset, _trailer, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OD.playVOD(requestId, _movie, _offset, _trailer)
        } catch (ex) {
            ex.errMethod = "playVOD";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, stopVOD: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner,
                _callerCallbackParams);
            fw.UTC.OD.stopVOD(requestId)
        } catch (ex) {
            ex.errMethod = "stopVOD";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, changeSpeed: function (_speed, _callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OD.changeSpeed(requestId, _speed)
        } catch (ex) {
            ex.errMethod = "changeSpeed";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, jumpToTime: function (_offset, _callerCallbackFunction,
                             _callerCallbackOwner, _callerCallbackParams) {
        try {
            var requestId = fw.mwRequestManager.setCallback(_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams);
            fw.UTC.OD.jumpToTime(requestId, _offset)
        } catch (ex) {
            ex.errMethod = "jumpToTime";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, tuneToChannel: function (_channel) {
        try {
            fw.UTC.Playback.tuneToChannel(_channel)
        } catch (ex) {
            ex.errMethod = "tuneToChannel";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, tuneUp: function () {
        try {
            fw.UTC.Playback.tuneUp()
        } catch (ex) {
            ex.errMethod =
                "tuneUp";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, tuneDown: function () {
        try {
            fw.UTC.Playback.tuneDown()
        } catch (ex) {
            ex.errMethod = "tuneDown";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, tuneLastDTVChannel: function () {
        try {
            fw.UTC.Playback.tuneLastDTVChannel()
        } catch (ex) {
            ex.errMethod = "tuneLastDTVChannel";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, getPlaybackState: function () {
        try {
            fw.UTC.Playback.getPlaybackState()
        } catch (ex) {
            ex.errMethod = "getPlaybackState";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, getPlaybackParameters: function () {
        try {
            fw.UTC.Playback.getPlaybackParameters()
        } catch (ex) {
            ex.errMethod =
                "getPlaybackParameters";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, setPlaybackParameters: function (_x, _y, _width, _height) {
        try {
            var playbackParameters = new Object;
            playbackParameters.xPos = _x;
            playbackParameters.yPos = _y;
            playbackParameters.width = _width;
            playbackParameters.height = _height;
            fw.UTC.Playback.setPlaybackParameters(playbackParameters)
        } catch (ex) {
            ex.errMethod = "setPlaybackParameters";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, setPlaybackParametersFullscreen: function () {
        try {
            var playbackParameters = fw.conf.fullscreenPlaybackParameters;
            if (playbackParameters == null || playbackParameters == undefined)playbackParameters = [0, 0, 1280, 720];
            fw.mediaManager.setPlaybackParameters(playbackParameters[0], playbackParameters[1], playbackParameters[2], playbackParameters[3])
        } catch (ex) {
            ex.errMethod = "setPlaybackParametersFullscreen";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, getPlaybackType: function () {
        try {
            return fw.UTC.Playback.getPlaybackType()
        } catch (ex) {
            ex.errMethod = "getPlaybackType";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, tuneResponseManager: function (_tuneResponseCode,
                                      _channel) {
        try {
            fw.mediaManager.doRegisteredCallback(fw.mediaManager.tuneChangeCallbackObj, new Array(_tuneResponseCode, _channel))
        } catch (ex) {
            ex.errMethod = "tuneResponseManager";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, playbackStateChangedManager: function (_result, _playbackState) {
        try {
            fw.mediaManager.doRegisteredCallback(fw.mediaManager.playbackStateChangeCallbackObj, new Array(_result, _playbackState))
        } catch (ex) {
            ex.errMethod = "playbackStateChangedManager";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, playbackParametersChangedManager: function (_result,
                                                   _playbackParameters) {
        try {
            fw.mediaManager.doRegisteredCallback(fw.mediaManager.playbackStateChangeCallbackObj, new Array(_result, _playbackParameters))
        } catch (ex) {
            ex.errMethod = "playbackParametersChangedManager";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, registerTuneChangeCallback: function (_callbackFunction, _callbackOwner) {
        try {
            this.tuneChangeCallbackObj = new Array(_callbackFunction, _callbackOwner);
            fw.UTC.Playback.tuneResponse.connect(this.tuneResponseManager)
        } catch (ex) {
            ex.errMethod = "registerTuneChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, unregisterTuneChangeCallback: function () {
        try {
            fw.UTC.Playback.tuneResponse.disconnect(this.tuneResponseManager);
            this.tuneChangeCallbackObj = null
        } catch (ex) {
            ex.errMethod = "unregisterTuneChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, registerPlaybackStateChangeCallback: function (_callbackFunction, _callbackOwner) {
        try {
            this.playbackStateChangeCallbackObj = new Array(_callbackFunction, _callbackOwner);
            fw.UTC.Playback.playbackStateChanged.connect(this.playbackStateChangedManager)
        } catch (ex) {
            ex.errMethod =
                "registerPlaybackStateChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, unregisterPlaybackStateChangeCallback: function () {
        try {
            fw.UTC.Playback.playbackStateChanged.disconnect(this.playbackStateChangedManager);
            this.playbackStateChangeCallbackObj = null
        } catch (ex) {
            ex.errMethod = "unregisterPlaybackStateChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, registerPlaybackParameterChangeCallback: function (_callbackFunction, _callbackOwner) {
        try {
            this.playbackParameterChangeCallbackObj = new Array(_callbackFunction,
                _callbackOwner);
            fw.UTC.Playback.playbackParametersChanged.connect(this.playbackParametersChangedManager)
        } catch (ex) {
            ex.errMethod = "registerPlaybackParameterChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, unregisterPlaybackParameterChangeCallback: function () {
        try {
            fw.UTC.Playback.playbackParametersChanged.disconnect(this.playbackParametersChangedManager);
            this.playbackParameterChangeCallbackObj = null
        } catch (ex) {
            ex.errMethod = "unregisterPlaybackParameterChangeCallback";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, doRegisteredCallback: function (_callbackObj, _arrayParams) {
        try {
            fw.log.debug("doRegisteredCallback _arrayParams : ", _arrayParams);
            if (_callbackObj != null && (_callbackObj != undefined && (_callbackObj.size() >= 2 && (_callbackObj[0] != null && (_callbackObj[0] != undefined && (_callbackObj[1] != null && _callbackObj[1] != undefined)))))) {
                var callbackFunction = _callbackObj[0];
                var callbackOwner = _callbackObj[1];
                callbackFunction.apply(callbackOwner, _arrayParams)
            }
        } catch (ex) {
            ex.errMethod = "doRegisteredCallback";
            ex.errClass =
                "MediaManagerUTC";
            fw.err(ex)
        }
    }, isStopReasonEndOfStreamReached: function (_stopReason) {
        try {
            return _stopReason == fw.UTC.OD.StopReason.STOP_REASON_END_OF_STREAM
        } catch (ex) {
            ex.errMethod = "isStopReasonEndOfStreamReached";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, resizeVideoLive: function (_conf, _time) {
        try {
            if (_conf.hasLiveVideo != undefined && (_conf.hasLiveVideo != null && _conf.hasLiveVideo === "Y"))if (navigator.userAgent.indexOf("NSN") != -1)fw.util.setTimeout(function () {
                UTC.OTT.windowPositionSize(_conf.liveVideoPosition[0],
                    _conf.liveVideoPosition[1], _conf.liveVideoPosition[2], _conf.liveVideoPosition[3])
            }, 1)
        } catch (ex) {
            ex.errMethod = "resizeVideoLive";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }, isStopReasonError: function (_stopReason) {
        try {
            return _stopReason != fw.UTC.OD.StopReason.STOP_REASON_END_OF_STREAM && _stopReason != fw.UTC.OD.StopReason.STOP_REASON_USER_REQUEST
        } catch (ex) {
            ex.errMethod = "isStopReasonError";
            ex.errClass = "MediaManagerUTC";
            fw.err(ex)
        }
    }
});
