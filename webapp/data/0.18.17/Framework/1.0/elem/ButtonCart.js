var ButtonCart = Class.create(Button, {
    initialize: function ($super, _id, _css) {
        try {
            $super(_id, _css);
            this.cartImg = fw.cssBuilder.createImg(_id + "_ImgChart", this.css.styleButtonCartImg.style);
            this.cartImg.setUrl("");
            this.hideCart();
            this.btnObj.appendChild(this.cartImg);
            this.isRented = true
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            var startTime =
                fw.util.getHumanTime(_obj.programStartTime);
            this.ppvId = eval("_obj." + this.css.styleButtonCartImg.PPVId);
            this.setTxt(startTime + " " + _obj.title);
            if (fw.mwManager.isPPVRented(_obj)) {
                this.showCart();
                this.isRented = false
            }
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, getPPVId: function () {
        try {
            return this.ppvId
        } catch (ex) {
            ex.errMethod = "getPPVId";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, isPPVRented: function () {
        try {
            return this.isRented
        } catch (ex) {
            ex.errMethod = "isPPVRented";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, hideCart: function () {
        try {
            this.cartImg.hide()
        } catch (ex) {
            ex.errMethod = "hideCart";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }, showCart: function () {
        try {
            this.cartImg.show()
        } catch (ex) {
            ex.errMethod = "showCart";
            ex.errClass = "ButtonCart";
            fw.err(ex)
        }
    }
});
