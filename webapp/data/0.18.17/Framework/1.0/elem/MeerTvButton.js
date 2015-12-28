var MeerTvButton = Class.create(Button, {
    initialize: function ($super, _id, _css) {
        $super(_id, _css);
        this.id = _id;
        this.callerObj = null;
        this.callerFunction = null;
        this.contList = new Array;
        this.imageList = new Array;
        for (var i = 0; i < 3; i++) {
            var id = this.id + "_MeerImage_" + i;
            var img = new Image(id, this.css.styleItemImage);
            this.contList[id] = id;
            img.getObj().style.position = "relative";
            this.btnObj.appendChild(img.getObj());
            this.imageList[i] = img
        }
    }, setCallBack: function (_callerObj, _callerFunction) {
        try {
            this.callerObj = _callerObj;
            this.callerFunction =
                _callerFunction
        } catch (ex) {
            ex.errMethod = "setCallback";
            ex.errClass = "MeerTvButton";
            fw.err(ex)
        }
    }, setImages: function (_obj) {
        try {
            this.contList = new Array;
            this.cont = _obj.length >= 3 ? 3 : _obj.length;
            if (this.cont > 0) {
                if (this.cont == 3) {
                    for (var i = 0; i < this.imageList.length && i < this.cont; i++)this.imageList[i].setUrl(_obj[i].iconURL);
                    this.imageList[0].getObj().style.right = 19;
                    this.imageList[2].getObj().style.left = 19
                } else if (this.cont == 2) {
                    this.imageList[0].setUrl(_obj[0].iconURL);
                    this.imageList[0].getObj().style.left = 3;
                    this.imageList[2].setUrl(_obj[1].iconURL);
                    this.imageList[2].getObj().style.right = 3
                } else this.imageList[1].setUrl(_obj[0].iconURL);
                if (this.callerObj != null && this.callerFunction != null)this.callerFunction.apply(this.callerObj, new Array("OK"))
            }
        } catch (ex) {
            ex.errMethod = "setImages";
            ex.errClass = "MeerTvButton";
            fw.err(ex)
        }
    }, callBackImageLoaded: function (_id, _result) {
        try {
            if (this.contList[_id] === _id)this.cont--;
            if (this.cont == 0)if (this.callerObj != null && this.callerFunction != null)this.callerFunction.apply(this.callerObj, new Array("OK"))
        } catch (ex) {
            ex.errMethod =
                "callBackImaeLoaded";
            ex.errClass = "MeerTvButton";
            fw.err(ex)
        }
    }
});
