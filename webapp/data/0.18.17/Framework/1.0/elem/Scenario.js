var Scenario = Class.create(BaseScenario, {
    initialize: function ($super, _prop) {
        try {
            $super(_prop);
            this._scenCntObj = fw.cssBuilder.createDiv(_prop.id, _prop.style);
            this._scenCntObj.style.overflow = "hidden";
            $(this.parent).appendChild(this._scenCntObj);
            this._scenObj = fw.cssBuilder.createScrollableGroup(_prop.id + "_Group", _prop.style);
            this._scenObj.setX(0);
            this._scenObj.setY(0);
            this._scenCntObj.appendChild(this._scenObj)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Scenario";
            fw.err(ex)
        }
    }
});
