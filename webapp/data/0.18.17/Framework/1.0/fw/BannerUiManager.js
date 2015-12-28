BannerUiManager = Class.create({
    initialize: function () {
        try {
            this.banner = new Image("bannerImg", fw.conf.banner);
            $(fw.conf.DOM_PLANE_BANNER).appendChild(this.banner.getObj());
            this.timerShow = null;
            this.isShown = false;
            this.hideBanner()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, setDefaultBannerImage: function () {
        try {
            this.setUrlBannerImage(fw.conf.banner.defaultImgUrl)
        } catch (ex) {
            ex.errMethod = "setDefaultBannerImage";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, setUrlBannerImage: function (_url) {
        try {
            this.banner.setUrl(_url)
        } catch (ex) {
            ex.errMethod =
                "setUrlBannerImage";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, showBanner: function (_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams, _functionSuffix) {
        try {
            var actualApp = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            var actualScen = actualApp.getCurrScenId();
            var nameFunction = null;
            switch (actualScen) {
                case "ScenarioVodCatalogue":
                    var nameFunction = "getBannerForVideotheek";
                    if (_functionSuffix != undefined && _functionSuffix != null)var nameFunction = "getBannerForVideotheek" + _functionSuffix;
                    break;
                case "ScenarioHelp":
                    var nameFunction = "getBannerForHelp";
                    break;
                case "ScenarioHelpItemDetail":
                    var nameFunction = "getBannerForHelp";
                    break;
                case "ScenarioTVOY":
                    var nameFunction = "getBannerForPG";
                    break;
                case "ScenarioPPVPortal":
                    var nameFunction = "getBannerForPPVPortal";
                    break;
                case "ScenarioPPVDetail":
                    var nameFunction = "getBannerForPPVDetail";
                    break
            }
            if (nameFunction != null) {
                this.banner.getObj().setStyle(actualScen + "_" + fw.conf.banner.style);
                eval("fw.bannerManager." + nameFunction + "(this.callBackGetBanner, this, [_callerCallbackFunction, _callerCallbackOwner, _callerCallbackParams])")
            }
        } catch (ex) {
            ex.errMethod =
                "showBanner";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, callBackGetBanner: function (_callerCallbackParams, _banner) {
        try {
            if (_banner.imageSource == undefined || _banner.imageSource == "")this.setDefaultBannerImage(); else this.setUrlBannerImage(_banner.imageSource);
            this.isShown = true;
            this.banner.show();
            _callerCallbackParams[0].apply(_callerCallbackParams[1], [_callerCallbackParams[2], _banner])
        } catch (ex) {
            ex.errMethod = "callBackGetBanner";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, hideBanner: function () {
        try {
            if (this.timerShow !=
                null) {
                clearTimeout(this.timerShow);
                this.timerShow = null
            }
            this.banner.hide();
            this.isShown = false
        } catch (ex) {
            ex.errMethod = "hideBanner";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }, performsBannerAction: function (_banner, _keyCode) {
        try {
            if (this.isShown) {
                var keyCodeForBanner = fw.bannerManager.getKeyCodeForBannerAction(_banner);
                if (keyCodeForBanner != null && (keyCodeForBanner != undefined && keyCodeForBanner == _keyCode))return fw.bannerManager.callBannerAction(_banner)
            }
            return false
        } catch (ex) {
            ex.errMethod = "performsBannerAction";
            ex.errClass = "BannerUiManager";
            fw.err(ex)
        }
    }
});
