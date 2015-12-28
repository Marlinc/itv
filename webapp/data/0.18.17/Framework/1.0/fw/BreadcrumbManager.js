BreadcrumbManager = Class.create({
    initialize: function () {
        try {
            fw.log.info("Starting Breadcrumb Manager");
            this.breadCrumbList = new Array
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, push: function (_str) {
        try {
            this.breadCrumbList.push(_str)
        } catch (ex) {
            ex.errMethod = "push";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, pushList: function (_arrStr) {
        try {
            this.breadCrumbList = _arrStr
        } catch (ex) {
            ex.errMethod = "pushList";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, pop: function () {
        try {
            return this.breadCrumbList.pop()
        } catch (ex) {
            ex.errMethod =
                "pop";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, replaceTop: function (_str) {
        try {
            this.pop();
            this.push(_str)
        } catch (ex) {
            ex.errMethod = "replaceTop";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, clear: function () {
        try {
            this.breadCrumbList.splice()
        } catch (ex) {
            ex.errMethod = "clear";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }, read: function () {
        try {
            return this.breadCrumbList
        } catch (ex) {
            ex.errMethod = "read";
            ex.errClass = "BreadcrumbManager";
            fw.err(ex)
        }
    }
});
