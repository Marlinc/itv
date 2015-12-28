var EffectMulti = Class.create(Effect, {
    initialize: function ($super, _item, _callbackObj, _callback, _keyLock, _keyUnLockToEnd, _duration, _left, _top, _width, _height) {
        try {
            $super(_callbackObj, _callback, _keyLock, _keyUnLockToEnd);
            this.name = "EffectMulti";
            this.id = _item.id + "_" + this.name;
            var _this = this;
            if (_width == null)_width = $j("#" + _item.id).width();
            if (_height == null)_height = $j("#" + _item.id).height();
            if (_left == null)_left = $j("#" + _item.id).position().left;
            if (_top == null)_top = $j("#" + _item.id).position().top;
            $j("#" + _item.id).animate({
                "width": _width,
                "height": _height, "top": _top, "left": _left
            }, _duration, _this.listenerObj)
        } catch (ex) {
            fw.log.error(ex);
            this.fxError(ex)
        }
    }
});
