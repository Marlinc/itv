var EffectSlideHoriz = Class.create(Effect, {
    initialize: function ($super, _item, _callbackObj, _callback, _keyLock, _duration, _from, _to) {
        try {
            $super(_callbackObj, _callback, _keyLock, true);
            this.name = "EffectSlideHoriz";
            this.id = _item.id + "_" + this.name;
            fw.log.debug(this.name + " : " + _item.id);
            var item = $(_item.id);
            if (parseInt(item.style.left) != _from * -1)item.style.left = _from * -1 + "px";
            var _this = this;
            $j("#" + _item.id).animate({"left": -1 * _to + "px"}, _duration, _this.listenerObj)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass =
                "EffectSlideHoriz";
            fw.err(ex);
            this.fxError(ex)
        }
    }
});
