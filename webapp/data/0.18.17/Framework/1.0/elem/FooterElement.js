var FooterElement = Class.create({
    getObj: function () {
        return this.obj
    }, initialize: function (_id, _css) {
        try {
            this.css = _css;
            this.obj = fw.cssBuilder.createDiv(_id + "_ContFooterElement", _css.itemCont.style);
            this.actualCssStyle = _css.itemCont.style;
            this.img = cssUtil.addElementRelativeInLineToDom(Image, _id + "_imgFooterElement", _css.imgItem, this.getObj());
            this.txt = cssUtil.addElementRelativeInLineToDom(Text, _id + "_txtFooterElement", _css.txtCont, this.getObj());
            this.txt.getObj().style.whiteSpace = "nowrap";
            this.txtLabel =
                "";
            this.imgUrl = "";
            this.status = "show"
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, setDefaultTxtStyle: function () {
        try {
            this.txt.setStyle(this.css.txtCont.style)
        } catch (ex) {
            ex.errMethod = "setDefaultTxtStyle";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, setExstenTxtStyle: function () {
        try {
            if (this.css.txtCont.extStyle != undefined)this.txt.setStyle(this.css.txtCont.extStyle)
        } catch (ex) {
            ex.errMethod = "setExstenTxtStyle";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.obj.hide();
            this.status = "hide"
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.obj.show();
            this.status = "show"
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, setText: function (_txt) {
        try {
            this.txt.setTxt(_txt);
            this.txtLabel = _txt
        } catch (ex) {
            ex.errMethod = "setText";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, getText: function () {
        try {
            return this.txtLabel
        } catch (ex) {
            ex.errMethod = "getText";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, setImage: function (_url) {
        try {
            this.img.setUrl(_url);
            this.imgUrl = _url
        } catch (ex) {
            ex.errMethod = "setImage";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, getImageUrl: function () {
        try {
            return this.imgUrl
        } catch (ex) {
            ex.errMethod = "getImageUrl";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, getActualCssStyle: function () {
        try {
            return this.actualCssStyle
        } catch (ex) {
            ex.errMethod = "getActualCssStyle";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }, setActualCssStyle: function (_string) {
        try {
            this.actualCssStyle = _string
        } catch (ex) {
            ex.errMethod = "setActualCssStyle";
            ex.errClass = "FooterElement";
            fw.err(ex)
        }
    }
});
