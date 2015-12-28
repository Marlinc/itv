var Effects = Class.create({
    slideVert: function (_item, _callbackObj, _callback, _keyLock, _keyUnLock, _duration, _from, _to) {
        new EffectSlideVert(_item, _callbackObj, _callback, _keyLock, _keyUnLock, _duration, _from, _to)
    },
    slideHoriz: function (_item, _callbackObj, _callback, _keyLock, _duration, _from, _to) {
        new EffectSlideHoriz(_item, _callbackObj, _callback, _keyLock, _duration, _from, _to)
    },
    fadeTo: function (_item, _callbackObj, _callback, _keyLock, _duration, _from, _to) {
        new EffectFadeTo(_item, _callbackObj, _callback, _keyLock, _duration,
            _from, _to)
    },
    fadeIn: function (_item, _callbackObj, _callback, _keyLock, _duration) {
        new EffectFadeIn(_item, _callbackObj, _callback, _keyLock, _duration)
    },
    fadeOut: function (_item, _callbackObj, _callback, _keyLock, _duration) {
        new EffectFadeOut(_item, _callbackObj, _callback, _keyLock, _duration)
    },
    multiAnimation: function (_item, _callbackObj, _callback, _keyLock, _keyUnLockToEnd, _duration, _left, _top, _width, _height) {
        new EffectMulti(_item, _callbackObj, _callback, _keyLock, _keyUnLockToEnd, _duration, _left, _top, _width, _height)
    }
});
