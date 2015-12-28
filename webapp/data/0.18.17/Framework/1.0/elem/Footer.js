Footer = Class.create({
    getObj: function () {
        return this.footer
    }, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            fw.log.info("Starting Footer");
            this.footerList = this.css.footerElements;
            this.footer = fw.cssBuilder.createDiv(this.id + "_Footer", this.css.styleItemCont.style);
            if (this.css.styleItemCont.x != undefined)this.footer.setX(this.css.styleItemCont.x);
            if (this.css.styleItemCont.y != undefined)this.footer.setY(this.css.styleItemCont.y);
            if (this.css.styleItemCont.w != undefined)this.footer.setW(this.css.styleItemCont.w);
            if (this.css.styleItemCont.h != undefined)this.footer.setH(this.css.styleItemCont.h);
            this.footer.show();
            this.buildFooter()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Footer";
            fw.err(ex)
        }
    }, buildFooter: function () {
        try {
            for (i = 0; i < this.footerList.length; i++) {
                var imgFoot = fw.cssBuilder.createImg(this.id + "_Img_" + i, this.footerList[i].footerImg.style);
                var textFoot = fw.cssBuilder.createText(this.id + "_Txt_" + i, this.footerList[i].footerTxt.style);
                if (this.footerList[i].footerImg.x == undefined && this.footerList[i].footerImg.y ==
                    undefined) {
                    imgFoot.style.position = "relative";
                    imgFoot.style.display = "inline-block"
                } else {
                    imgFoot.setX(this.footerList[i].footerImg.x);
                    imgFoot.setY(this.footerList[i].footerImg.y);
                    if (this.footerList[i].footerImg.w != undefined)imgFoot.setW(this.footerList[i].footerImg.w);
                    if (this.footerList[i].footerImg.h != undefined)imgFoot.setH(this.footerList[i].footerImg.h)
                }
                imgFoot.setUrl("");
                this.footer.appendChild(imgFoot);
                if (this.footerList[i].footerTxt.x == undefined && this.footerList[i].footerTxt.y == undefined) {
                    textFoot.style.position =
                        "relative";
                    textFoot.style.display = "inline-block"
                } else {
                    textFoot.setX(this.footerList[i].footerTxt.x);
                    textFoot.setY(this.footerList[i].footerTxt.y);
                    if (this.footerList[i].footerImg.w != undefined)textFoot.setW(this.footerList[i].footerTxt.w);
                    if (this.footerList[i].footerImg.h != undefined)textFoot.setH(this.footerList[i].footerTxt.h)
                }
                textFoot.setTxt(this.footerList[i].footerTxt.text);
                this.footer.appendChild(textFoot)
            }
        } catch (ex) {
            ex.errMethod = "pushList";
            ex.errClass = "Footer";
            fw.err(ex)
        }
    }, read: function () {
        try {
            return this.footerStrList
        } catch (ex) {
            ex.errMethod =
                "read";
            ex.errClass = "Footer";
            fw.err(ex)
        }
    }
});
