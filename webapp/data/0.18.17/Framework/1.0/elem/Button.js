var Button = Class.create({
    id: null, css: null, btnObj: null, rectObj: null, textObj: null, initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.title = "";
            this.isSelected = false;
            this.btnObj = fw.cssBuilder.createDiv(_id + "_Button", this.css.styleItemCont.style);
            this.btnObj.show();
            this.rectObj = fw.cssBuilder.createRect(_id + "_ButtonBg", this.css.styleItemBgUnSelect.style);
            this.textObj = fw.cssBuilder.createText(_id + "_ButtonTxt", this.css.styleItemTxtUnSelect.style);
            this.btnObj.appendChild(this.rectObj);
            this.btnObj.appendChild(this.textObj);
            this.isSelect = false;
            this.btnObj.obj = this
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setDataObj: function (_index, _obj) {
        try {
            if (_obj[_index].contentTitle != undefined)this.setTxt(_obj[_index].contentTitle); else {
                var txt = this.css.styleItemCont.nameLabelTxt;
                this.setTxt(eval("_obj[_index]." + txt))
            }
        } catch (ex) {
            ex.errMethod = "setDataObj";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setItem: function (_obj,
                          _a, _b) {
        try {
            this.setDataFromObj(_obj)
        } catch (ex) {
            ex.errMethod = "setItem";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            if (_obj.contentTitle != undefined)this.setTxt(_obj.contentTitle); else if (eval("_obj." + this.css.styleItemCont.nameLabelTxt) != undefined && (eval("_obj." + this.css.styleItemCont.nameLabelTxt) != null && eval("_obj." + this.css.styleItemCont.nameLabelTxt) != ""))this.setTxt(eval("_obj." + this.css.styleItemCont.nameLabelTxt)); else if (eval("_obj." + this.css.styleItemCont.nameLabelTxt2) !=
                undefined && (eval("_obj." + this.css.styleItemCont.nameLabelTxt2) != null && eval("_obj." + this.css.styleItemCont.nameLabelTxt2) != ""))this.setTxt(eval("_obj." + this.css.styleItemCont.nameLabelTxt2)); else this.setTxt("")
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.btnObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.btnObj.setY(_y)
        } catch (ex) {
            ex.errMethod = "setY";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setW: function (_w) {
        try {
            this.btnObj.setW(_w);
            this.rectObj.setW(_w);
            this.textObj.setW(_w)
        } catch (ex) {
            ex.errMethod = "setW";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            this.rectObj.setStyle(this.css.styleItemBgSelect.style);
            this.textObj.setStyle(this.css.styleItemTxtSelect.style);
            this.isSelect = true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (!this.isSelected) {
                this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
                this.textObj.setStyle(this.css.styleItemTxtUnSelect.style);
                this.isSelect = false
            } else this.selected()
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setSelected: function () {
        try {
            if (!this.isSelect)this.selected(); else this.isSelected = true
        } catch (ex) {
            ex.errMethod = "setSelected";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setUnSelected: function () {
        try {
            this.isSelected = false;
            this.focusOff()
        } catch (ex) {
            ex.errMethod = "setUnSelected";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, isSelectedFunction: function () {
        try {
            return this.isSelected
        } catch (ex) {
            ex.errMethod = "isSelected";
            ex.errClass =
                "Button";
            fw.err(ex)
        }
    }, isSelect: function () {
        try {
            return this.isSelect
        } catch (ex) {
            ex.errMethod = "isSelect";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, focusOnShowTxt: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgSelect.style);
            this.textObj.show()
        } catch (ex) {
            ex.errMethod = "focusOnShowTxt";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, focusOffHideTxt: function () {
        try {
            this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
            this.textObj.hide()
        } catch (ex) {
            ex.errMethod = "focusOffHideTxt";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, selected: function () {
        try {
            this.isSelected =
                true;
            if (this.css.styleItemBgSelected.style != null)this.rectObj.setStyle(this.css.styleItemBgSelected.style);
            if (this.css.styleItemTxtSelected.style != null)this.textObj.setStyle(this.css.styleItemTxtSelected.style)
        } catch (ex) {
            ex.errMethod = "selected";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, changeTextColor: function (_color) {
        try {
            this.textObj.setFill(_color)
        } catch (ex) {
            ex.errMethod = "changeTextColor";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            this.title = _txt;
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod =
                "setTxt";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, getWidthTxt: function () {
        try {
            return $j("#" + this.id + "_ButtonTxt").width()
        } catch (ex) {
            ex.errMethod = "getWidthTxt";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, getHeightTxt: function () {
        try {
            return $j("#" + this.id + "_ButtonTxt").height()
        } catch (ex) {
            ex.errMethod = "getHeightTxt";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.btnObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.btnObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "Button";
            fw.err(ex)
        }
    }
});
