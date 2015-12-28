var EffectFadeTo = Class.create(Effect, {
    initialize: function ($super, _item, _callbackObj, _callback, _keyLock, _duration, _from, _to) {
        try {
            $super(_callbackObj, _callback, _keyLock, true);
            this.name = "EffectFadeTo";
            this.id = _item.id + "_" + this.name;
            fw.log.debug(this.name + " : " + _item.id);
            var _this = this;
            $j("#" + _item.id).animate({"opacity": _to}, _duration, _this.listenerObj)
        } catch (ex) {
            fw.log.error(ex);
            this.fxError(ex)
        }
    }
});
