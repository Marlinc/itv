var ButtonListContent = Class.create({
    id: null, css: null, btnObj: null, rectObj: null, textObj: null, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.btnObj = fw.cssBuilder.createDiv(_id + "_Button", this.css.styleItemCont.style);
            this.btnObj.show();
            this.rectObj = fw.cssBuilder.createRect(_id + "_ButtonBg", this.css.styleItemBgUnSelect.style);
            this.textObj = fw.cssBuilder.createText(_id + "_ButtonTxt", this.css.styleItemTxtUnSelect.style);
            this.textYear = fw.cssBuilder.createText(_id + "_ButtonTxtYear", this.css.styleItemYearTxtUnSelect.style);
            this.btnObj.appendChild(this.rectObj);
            this.btnObj.appendChild(this.textObj);
            this.btnObj.appendChild(this.textYear)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setDataObj: function (_index, _obj) {
        try {
            this.textObj.setTxt(_obj[_index].contentTitle);
            _rating = Math.random() * (5 - 1) + 1;
            for (z = 0; z <= _rating; z++) {
                _x = this.css.styleItemRate.x + z * (this.css.styleItemRate.w +
                    this.css.styleItemRate.margin);
                _img = new Image("Rating_img", this.css.styleItemRate);
                _img.setUrl(this.css.styleItemRate.url);
                _img.setX(_x);
                this.btnObj.appendChild(_img.getObj())
            }
            year = Math.floor(Math.random() * (2011 - 1999) + 1999);
            this.textYear.setTxt(year)
        } catch (ex) {
            ex.errMethod = "setDataObj";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            this.textObj.setTxt(_obj.contentTitle);
            _rating = Math.random() * (5 - 1) + 1;
            for (z = 0; z <= _rating; z++) {
                _x = this.css.styleItemRate.x + z * (this.css.styleItemRate.w +
                    this.css.styleItemRate.margin);
                _img = new Image("Rating_img", this.css.styleItemRate);
                _img.setUrl(this.css.styleItemRate.url);
                _img.setX(_x);
                this.btnObj.appendChild(_img.getObj())
            }
            year = Math.floor(Math.random() * (2011 - 1999) + 1999);
            this.textYear.setTxt(year)
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.btnObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.btnObj.setY(_y)
        } catch (ex) {
            ex.errMethod =
                "setY";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setW: function (_w) {
        try {
            this.btnObj.setW(_w);
            this.rectObj.setW(_w);
            this.textObj.setW(_w)
        } catch (ex) {
            ex.errMethod = "setW";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            this.rectObj.setStyle(this.css.styleItemBgSelect.style);
            this.textObj.setStyle(this.css.styleItemTxtSelect.style);
            this.textYear.setStyle(this.css.styleItemYearTxtSelect.style)
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
            this.textObj.setStyle(this.css.styleItemTxtUnSelect.style);
            this.textYear.setStyle(this.css.styleItemYearTxtUnSelect.style)
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, focusOnShowTxt: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgSelect.style);
            this.textObj.show()
        } catch (ex) {
            ex.errMethod = "focusOnShowTxt";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, focusOffHideTxt: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
            this.textObj.hide()
        } catch (ex) {
            ex.errMethod = "focusOffHideTxt";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, selected: function () {
        try {
            if (this.css.styleItemBgSelected.style != null)this.rectObj.setStyle(this.css.styleItemBgSelected.style);
            if (this.css.styleItemTxtSelected.style != null)this.textObj.setStyle(this.css.styleItemTxtSelected.style)
        } catch (ex) {
            ex.errMethod = "selected";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, changeTextColor: function (_color) {
        try {
            this.textObj.setFill(_color)
        } catch (ex) {
            ex.errMethod =
                "changeTextColor";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setTxt";
            ex.errClass = "ButtonListContent";
            fw.err(ex)
        }
    }
});
