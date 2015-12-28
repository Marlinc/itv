var EffectSlideVert = Class.create(Effect, {
    initialize: function ($super, _item, _callbackObj, _callback, _keyLock, _keyUnLock, _duration, _from, _to) {
        try {
            $super(_callbackObj, _callback, _keyLock, _keyUnLock, true);
            this.name = "EffectSlideVert";
            this.id = _item.id + "_" + this.name;
            fw.log.debug(this.name + " : " + _item.id);
            var item = $(_item.id);
            if (parseInt(item.style.top) != _from * -1)item.style.top = _from * -1 + "px";
            var _this = this;
            $j("#" + _item.id).animate({"top": -1 * _to + "px"}, _duration, _this.listenerObj)
        } catch (ex) {
            fw.log.error(ex);
            this.fxError(ex)
        }
    }
});
