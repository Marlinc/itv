var Effect = Class.create({
    EFFECT_COMPLETE: 0, EFFECT_ERROR: 1, initialize: function (_callbackObj, _callback, _keyLock, _keyUnLockToEnd) {
        this.callbackObj = _callbackObj;
        this.callback = _callback;
        this.keyLock = _keyLock;
        this.keyUnLockToEnd = _keyUnLockToEnd;
        var _this = this;
        this.listenerObj = function () {
            _this.fxCallback.apply(_this)
        };
        if (this.keyLock)fw.keys.lock()
    }, fxCallback: function () {
        try {
            if (this.keyLock && this.keyUnLockToEnd)fw.keys.schedUnlock(1);
            if (this.callbackObj != null && this.callback != null)this.callback.apply(this.callbackObj,
                [this.EFFECT_COMPLETE])
        } catch (ex) {
            ex.errMethod = "fxCallback";
            ex.errClass = "Effect";
            fw.err(ex)
        }
    }, fxError: function () {
        try {
            if (this.keyLock)fw.keys.schedUnlock(1);
            if (this.callbackObj && this.callback)this.callback.apply(this.callbackObj, [this.EFFECT_ERROR])
        } catch (ex) {
            ex.errMethod = "fxError";
            ex.errClass = "Effect";
            fw.err(ex)
        }
    }
});
