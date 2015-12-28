var Keys = Class.create({
    preventAllDefault: true,
    CODE_Motorola_VIP1853: {
        FORWARD: 117,
        BACKWARD: 118,
        PLAY_PAUSE: 114,
        STOP: 115,
        RECORD: 119,
        RED: 120,
        GREEN: 121,
        YELLOW: 122,
        BLUE: 123,
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
        OK: 13,
        MENU: 113,
        TV: 36,
        GIDS: 112,
        EPG: 112,
        RADIO: 45,
        VOLUME_UP: 175,
        VOLUME_DOWN: 174,
        MUTE: 173,
        CHANNEL_UP: 33,
        CHANNEL_DOWN: 34,
        NUM_1: 49,
        NUM_2: 50,
        NUM_3: 51,
        NUM_4: 52,
        NUM_5: 53,
        NUM_6: 54,
        NUM_7: 55,
        NUM_8: 56,
        NUM_9: 57,
        NUM_0: 48,
        TELETEXT: 46,
        BACK: 8,
        TAB: 9,
        HELP: 47
    },
    keyCodeAsString: function (keyCode) {
        var result = null;
        $j.each({
            1: fw.keys.code.NUM_1,
            2: fw.keys.code.NUM_2,
            3: fw.keys.code.NUM_3,
            4: fw.keys.code.NUM_4,
            5: fw.keys.code.NUM_5,
            6: fw.keys.code.NUM_6,
            7: fw.keys.code.NUM_7,
            8: fw.keys.code.NUM_8,
            9: fw.keys.code.NUM_9,
            0: fw.keys.code.NUM_0
        }, function (key, value) {
            if (keyCode === value) {
                result = key;
                return false
            }
        });
        return result
    },
    CODE_DEFAULT: {
        FORWARD: 117,
        BACKWARD: 118,
        PLAY_PAUSE: 114,
        STOP: 115,
        RECORD: 119,
        RED: 120,
        GREEN: 121,
        YELLOW: 122,
        BLUE: 123,
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40,
        OK: 13,
        MENU: 113,
        TV: 36,
        GIDS: 112,
        EPG: 112,
        RADIO: 45,
        VOLUME_UP: 175,
        VOLUME_DOWN: 174,
        MUTE: 173,
        CHANNEL_UP: 33,
        CHANNEL_DOWN: 34,
        NUM_1: 49,
        NUM_2: 50,
        NUM_3: 51,
        NUM_4: 52,
        NUM_5: 53,
        NUM_6: 54,
        NUM_7: 55,
        NUM_8: 56,
        NUM_9: 57,
        NUM_0: 48,
        TELETEXT: 46,
        BACK: 8,
        TAB: 9,
        HELP: 47
    },
    initialize: function () {
        try {
            this.code = null;
            this._handlerScope = null;
            this._handler = null;
            this._handlerScopeUp = null;
            this._handlerUp = null;
            this._locked = false;
            this._unlockTimer = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Keys";
            if (fw != null && (fw != undefined && (fw.err != null && fw.err != undefined)))fw.err(ex); else console.warn("ERROR IN KEYS FW COMPONENT:" +
                ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    },
    setHandler: function (_handlerScope, _handler) {
        try {
            fw.keys._handlerScope = _handlerScope;
            fw.keys._handler = _handler
        } catch (ex) {
            ex.errMethod = "setHandler";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    setHandlerUp: function (_handlerScope, _handler) {
        try {
            fw.keys._handlerScopeUp = _handlerScope;
            fw.keys._handlerUp = _handler
        } catch (ex) {
            ex.errMethod = "setHandlerUp";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    lockOneTime: function () {
        try {
            if (!fw.keys._locked) {
                fw.log.debug("lock");
                fw.keys.lock()
            }
        } catch (ex) {
            ex.errMethod =
                "lockOneTime";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    unLockOneTime: function () {
        try {
            if (fw.keys._locked) {
                fw.log.debug("unlock");
                fw.keys.unlock()
            }
        } catch (ex) {
            ex.errMethod = "unLockOneTime";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    lock: function () {
        try {
            var unlockTimerVal = fw.conf != null && (fw.conf != undefined && (fw.conf.maxKeyLockIntervalMs != null && fw.conf.maxKeyLockIntervalMs != undefined)) ? fw.conf.maxKeyLockIntervalMs : 1E4;
            fw.keys.schedUnlock(unlockTimerVal);
            fw.keys._locked = true;
            fw.log.debug("Lock keys")
        } catch (ex) {
            ex.errMethod = "lock";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    unlock: function () {
        try {
            if (fw.keys._unlockTimer != null) {
                fw.util.clearTimeout(fw.keys._unlockTimer);
                fw.keys._unlockTimer = null
            }
            fw.keys._locked = false;
            fw.log.debug("unLock keys")
        } catch (ex) {
            ex.errMethod = "unlock";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    schedUnlock: function (_delay) {
        try {
            if (fw.keys._unlockTimer != null) {
                fw.util.clearTimeout(fw.keys._unlockTimer);
                fw.keys._unlockTimer = null
            }
            fw.keys._unlockTimer = fw.util.setTimeout(fw.keys.unlock, _delay)
        } catch (ex) {
            ex.errMethod = "schedUnlock";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    _handleDown: function (_evt) {
        try {
            if (!_evt)_evt = window.event;
            fw.log.debug("Key pressedDown : " + _evt.keyCode);
            if (fw.keys._locked) {
                fw.log.debug("Key locked!");
                return
            }
            if (fw.keys._handler !== null)fw.keys._handler.call(fw.keys._handlerScope, _evt);
            if (navigator.userAgent.indexOf("NSN") == -1)_evt.preventDefault()
        } catch (ex) {
            ex.errMethod = "_handleDown";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    },
    _handleUp: function (_evt) {
        try {
            if (!_evt)_evt = window.event;
            if (fw.keys._locked) {
                fw.log.info("Key locked!");
                return
            }
            if (fw.keys._handlerUp !== null)fw.keys._handlerUp.call(fw.keys._handlerScopeUp, _evt);
            if (fw.keys.preventAllDefault === true)_evt.preventDefault()
        } catch (ex) {
            ex.errMethod = "_handleUp";
            ex.errClass = "Keys";
            fw.err(ex)
        }
    }
});
