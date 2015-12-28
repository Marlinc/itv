var NatModeManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting NatModeManager");
            setTimeout("fw.natModeManager.natModePeriodicalCallBack()", fw.conf.natModeIntevalMs)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "NatModeManager";
            fw.err(ex)
        }
    }, natModePeriodicalCallBack: function () {
        try {
            fw.log.debug("check on Nat mode");
            setTimeout("fw.natModeManager.natModePeriodicalCallBack()", fw.conf.natModeIntevalMs);
            if (fw.mwManager.getConnectionMode() == fw.conf.natModeIdentifier) {
                fw.log.debug("invoking downloadTriggers for Nat mode");
                fw.mwManager.downloadTriggers()
            }
        } catch (ex) {
            ex.errMethod = "natModePeriodicalCallBack";
            ex.errClass = "NatModeManager";
            fw.err(ex)
        }
    }
});
