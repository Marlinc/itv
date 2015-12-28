var TextArea = Class.create({
    id: null, css: null, textObj: null, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.textObj = fw.cssBuilder.createTextArea(_id, this.css);
            this.cursor = 0;
            this.position = this.css.startPositionTxt
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.textObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, resetPositionPage: function () {
        try {
            this.cursor = 0;
            this.position = this.css.startPositionTxt;
            this.textObj.scroll(this.position,
                0);
            this.textObj.totalPage = 0
        } catch (ex) {
            ex.errMethod = "resetPositionPage";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, setHtmlContent: function (_pageUri) {
        try {
            this.textObj.setHtmlContent(_pageUri)
        } catch (ex) {
            ex.errMethod = "setHtmlContent";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setTxt";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, scrollDown: function () {
        try {
            if (this.cursor < this.textObj.getNumPag() - 1) {
                fw.log.info("Scroll-Down textArea " + this.id);
                this.position =
                    this.position - this.textObj.getDisplayH();
                this.textObj.scroll(this.position, this.css.timeScroll);
                this.cursor++
            }
        } catch (ex) {
            ex.errMethod = "scrollDown";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, getNumPage: function () {
        try {
            return this.textObj.getNumPag()
        } catch (ex) {
            ex.errMethod = "getNumPage";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, getPositionPage: function () {
        try {
            return this.cursor
        } catch (ex) {
            ex.errMethod = "getPositionPage";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }, scrollUp: function () {
        try {
            if (this.cursor > 0) {
                fw.log.info("Scroll-Up textArea " +
                    this.id);
                this.position = this.position + this.textObj.getDisplayH();
                this.textObj.scroll(this.position, this.css.timeScroll);
                this.cursor--
            }
        } catch (ex) {
            ex.errMethod = "scrollDown";
            ex.errClass = "TextArea";
            fw.err(ex)
        }
    }
});
