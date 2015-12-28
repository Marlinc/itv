var Module = Class.create(BaseModule, {
    initialize: function ($super, _parent, _prop) {
        try {
            $super(_parent, _prop);
            this._modCntObj = fw.cssBuilder.createDiv(_prop.id, _prop.style);
            this._modCntObj.style.overflow = "hidden";
            this._modCntObj.show();
            $(this.parent).appendChild(this._modCntObj);
            this._modObj = fw.cssBuilder.createScrollableGroup(_prop.id + "_Group", _prop.style);
            this._modObj.setX(0);
            this._modObj.setY(0);
            this._modCntObj.appendChild(this._modObj)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Module";
            fw.err(ex)
        }
    }
});
