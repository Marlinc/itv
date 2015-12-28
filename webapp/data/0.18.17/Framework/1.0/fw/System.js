var System = Class.create({
    initialize: function () {
        try {
            this.myStartTime = 0;
            this.startTime = 0;
            fw.log.info("Starting System component")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "System";
            fw.err(ex)
        }
    }, getCurrTimeMillis: function () {
        try {
            if (this.myStartTime > 0)return this.myStartTime + (fw.conf.TIME_SYNC_OFFSET * 60 * 60 * 1E3 + this.getTimeOffset()); else return this.getSystemMillis()
        } catch (ex) {
            ex.errMethod = "getCurrTimeMillis";
            ex.errClass = "System";
            fw.err(ex)
        }
    }, getTimeOffset: function () {
        try {
            return (new Date).getTimezoneOffset() *
                60 * 1E3
        } catch (ex) {
            ex.errMethod = "getTimeOffset";
            ex.errClass = "System";
            fw.err(ex)
        }
    }, newDate: function (_long) {
        try {
            return new Date(_long + this.getTimeOffset())
        } catch (ex) {
            ex.errMethod = "newDate";
            ex.errClass = "System";
            fw.err(ex)
        }
    }, getSystemMillis: function () {
        try {
            return (new Date).getTime()
        } catch (ex) {
            ex.errMethod = "getSystemMillis";
            ex.errClass = "System";
            fw.err(ex)
        }
    }
});
