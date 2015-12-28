var HtmlArea = Class.create(TextArea, {
    initialize: function ($super, _id, _css) {
        try {
            $super(_id, _css);
            this.id = _id;
            this.htmlAreaHeight = _css.htmlAreaHeight;
            this.focusOff()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, setHtmlContent: function (_pageUri) {
        try {
            this.textObj.setHtmlContent(_pageUri)
        } catch (ex) {
            ex.errMethod = "setHtmlContent";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            this.textObj.setStyle(this.css.htmlAreaSelected.style);
            this.isSelected =
                true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            this.textObj.setStyle(this.css.htmlAreaUnselected.style);
            this.isSelected = false
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, getRemainingPageDown: function () {
        try {
            return this.getObj().getContH() - this.htmlAreaHeight + this.position
        } catch (ex) {
            ex.errMethod = "getRemainingPageDown";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, getRemainingPageUp: function () {
        try {
            return this.position
        } catch (ex) {
            ex.errMethod =
                "getRemainingPageUp";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, scrollRowUp: function (_pixToScroll) {
        try {
            var scrolled = false;
            if (this.position < 0) {
                _pixToScroll == undefined ? this.position = this.position + 24 : this.position = this.position + _pixToScroll;
                scrolled = true
            }
            this.textObj.scroll(this.position, 0);
            return scrolled
        } catch (ex) {
            ex.errMethod = "scrollRowUp";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, scrollRowDown: function (_pixToScroll) {
        try {
            var scrolled = false;
            if (this.getObj().getContH() - this.htmlAreaHeight + this.position > 0) {
                _pixToScroll ==
                undefined ? this.position = this.position - 24 : this.position = this.position - _pixToScroll;
                scrolled = true
            }
            this.textObj.scroll(this.position, 0);
            return scrolled
        } catch (ex) {
            ex.errMethod = "scrollRowDown";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }, isOnePage: function () {
        try {
            return this.getObj().getContH() - this.htmlAreaHeight <= 0
        } catch (ex) {
            ex.errMethod = "isOnePage";
            ex.errClass = "HtmlArea";
            fw.err(ex)
        }
    }
});
