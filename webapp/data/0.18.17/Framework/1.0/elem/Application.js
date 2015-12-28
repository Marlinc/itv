var Application = Class.create(BaseApplication, {
    initialize: function ($super, _prop, _applicationId, _forPrecache) {
        $super(_prop, _applicationId);
        try {
            this._appObj = fw.cssBuilder.createDiv(this.conf.applicationProp.id, this.conf.applicationProp.style);
            this._appObj.style.overflow = "hidden";
            $(this.parent).appendChild(this._appObj);
            if (_forPrecache === "true")this.hide();
            if (fw.conf.PRECACHE_SCENARIOS_ENABLED)this.precacheScenarios()
        } catch (ex) {
            fw.log.error("Error to create Dom App " + this.id + "- " + ex)
        }
    }, precacheStyle: function () {
        if (this.conf.subskinCategoryConf !=
            undefined)for (var key in this.conf.subskinCategoryConf) {
            var urlCss = this.conf.subskinCategoryConf[key].cssFileToApply;
            cssUtil.loadCss(urlCss, "text/css")
        }
    }
});
