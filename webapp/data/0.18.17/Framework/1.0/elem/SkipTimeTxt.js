var SkipTimeTxt = Class.create({
    getObj: function () {
        return this.obj
    }, initialize: function (_id, _css) {
        try {
            this.index = 6;
            this.text = "";
            this.secs = 0;
            this.mins = 0;
            this.hours = 0;
            this.obj = fw.cssBuilder.createDiv(_id + "_ContFooterElement", _css.itemCont.style);
            this.img1 = cssUtil.addElementRelativeInLineToDom(Image, _id + "_img1Element", _css.imgPrev, this.getObj());
            this.txt = cssUtil.addElementRelativeInLineToDom(Text, _id + "_txtElement", _css.txtCont, this.getObj());
            this.img2 = cssUtil.addElementRelativeInLineToDom(Image, _id + "_img2Element",
                _css.imgNext, this.getObj());
            this.obj.hide()
        } catch (ex) {
            fw.log.error("FooterElement initialize: " + ex)
        }
    }, hide: function () {
        this.obj.hide()
    }, show: function () {
        this.obj.show()
    }, setText: function (_txt) {
        if (this.index > 0) {
            this.obj.show();
            this.text = this.text + _txt;
            var txt = "";
            this.index--;
            for (var i = 0; i < this.index; i++)txt = txt + "0";
            txt = txt + this.text;
            this.txt.setTxt("&nbsp;" + txt.substring(0, 2) + ":" + txt.substring(2, 4) + ":" + txt.substring(4) + "&nbsp;");
            this.secs = txt.substring(4);
            this.mins = txt.substring(2, 4);
            this.hours = txt.substring(0,
                2)
        } else {
            this.index = 6;
            this.text = "";
            this.text = this.text + _txt;
            var txt = "";
            this.index--;
            for (var i = 0; i < this.index; i++)txt = txt + "0";
            txt = txt + this.text;
            this.txt.setTxt("&nbsp;" + txt.substring(0, 2) + ":" + txt.substring(2, 4) + ":" + txt.substring(4) + "&nbsp;")
        }
    }, setIndex: function (_index) {
        this.index = _index
    }, setLabel: function (_label) {
        this.text = _label
    }, getSecs: function () {
        return this.secs
    }, getMins: function () {
        return this.mins
    }, getHours: function () {
        return this.hours
    }
});
