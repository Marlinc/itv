var EffectFadeOut = Class.create(Effect, {
    initialize: function ($super, _item, _callbackObj, _callback, _keyLock, _duration) {
        try {
            $super(_callbackObj, _callback, _keyLock, true);
            this.name = "EffectFadeOut";
            this.id = _item.id + "_" + this.name;
            fw.log.debug(this.name + " : " + _item.id);
            var _this = this;
            $j("#" + _item.id).animate({"opacity": "0"}, _duration, _this.listenerObj)
        } catch (ex) {
            fw.log.error(ex);
            this.fxError(ex)
        }
    }
});
