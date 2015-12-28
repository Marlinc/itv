var Framework = Class.create({
    cssBuilder: new CssBuilder,
    effects: new Effects,
    keys: new Keys,
    util: new Util,
    dataManager: new DataManager,
    autoUpdate: new AutoUpdate,
    appManager: null,
    popupManager: null,
    isPc: false,
    init: function () {
        try {
            if (navigator.userAgent.indexOf("NSN") != -1) {
                fw.UTC = UTC;
                fw.isPc = false;
                $j(document.body).addClass("nsn")
            } else {
                fw.UTC = new UTCStubFull;
                fw.isPc = true;
                $j(document.body).addClass("pc")
            }
            fw.UTCStub = new UTCStub;
            fw.mwManager = new MwManager;
            fw.mwRequestManager = new MwRequestManager;
            fw.subscriberDataManager =
                new SubscriberDataManager;
            fw.subscriberDataManager.init();
            fw.keys.code = eval("fw.keys.CODE_" + fw.mwManager.getHardwareVersion());
            if (fw.keys.code == null || fw.keys.code == undefined)fw.keys.code = fw.keys.CODE_DEFAULT;
            document.body.style.cursor = "none";
            document.onkeydown = fw.keys._handleDown;
            document.onkeyup = fw.keys._handleUp;
            fw.autoUpdate.init();
            fw.log = new Log;
            fw.log.info("Running on : " + navigator.userAgent);
            this.userPreferenceStorage = new UserPreferenceStorage;
            fw.autoUpdate.updateForceConf();
            fw.sys = new System;
            fw.navigationHistory = new NavigationHistory;
            fw.pcmanager = new PCManager;
            fw.popupManager = new PopupManager;
            fw.overlayManager = new OverlayManager;
            fw.profiling = new Profiling;
            this.mediaManager = new MediaManagerUTC;
            this.bannerManager = new BannerManager;
            this.bannerUiManager = new BannerUiManager;
            this.natModeManager = new NatModeManager;
            fw.userPreferenceStorage.setUIVersion(fw.autoUpdate.getOnScreenReleaseVersion());
            fw.appManager = new ApplicationManager;
            fw.mwManager.initForUTC();
            fw.log.info("Framework init OK");
            return true
        } catch (ex) {
            ex.errMethod =
                "init";
            ex.errClass = "Framework";
            if (fw != null && (fw != undefined && (fw.err != null && fw.err != undefined)))fw.err(ex); else console.warn("ERROR IN FW INIT:" + ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
        return false
    },
    err: function (_ex) {
        try {
            var mess = _ex.errClass + "|" + _ex.errMethod + "|" + _ex.message;
            if (fw != null && (fw != undefined && (fw.log != null && fw.log != undefined)))fw.log.error(mess); else console.warn("CONSOLE RECOVERY LOG ERR:" + mess)
        } catch (ex) {
            ex.errMethod = "err";
            ex.errClass = "Framework";
            console.warn("ERROR IN FW ERR METHOD:" +
                ex.errClass + "|" + ex.errMethod + "|" + ex.message)
        }
    },
    destroy: function () {
        return true
    }
});
var fw = new Framework;
