var ButtonFlagImage = Class.create(Button, {
    initialize: function ($super, _id, _css) {
        try {
            $super(_id, _css);
            this.id = _id + "_FlagImage";
            this.flagImage = fw.cssBuilder.createImg(this.id, this.css.styleButtonFlagImageImg.style);
            this.flagImage.setUrl("");
            this.hideFlagImage();
            this.btnObj.appendChild(this.flagImage);
            this.alternativeStyle = false;
            this.textSeparatorObj = fw.cssBuilder.createText(_id + "_ButtonTxtSeparator", this.css.styleItemTxtUnSelect.style);
            this.btnObj.appendChild(this.textSeparatorObj);
            this.textSeparatorObj.setX(this.css.styleItemCont.deltaXSeparator);
            this.textTitleObj = fw.cssBuilder.createText(_id + "_ButtonTxtTitle", this.css.styleItemTxtUnSelect.style);
            this.textTitleObj.setX(this.css.styleItemCont.deltaXTitle);
            this.btnObj.appendChild(this.textTitleObj)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            if (_obj.date != undefined)this.setTxt(_obj.date); else {
                var txt = this.css.styleItemCont.nameLabelTxt;
                this.setTxt(eval("_obj." + txt))
            }
            if (_obj.title != undefined) {
                this.textSeparatorObj.setTxt("-");
                this.textTitleObj.setTxt(_obj.title)
            }
            if (_obj.showFlag)this.showFlagImage(); else this.hideFlagImage();
            if (_obj.applyAlternativeStyle) {
                this.alternativeStyle = true;
                if (this.isSelect) {
                    this.rectObj.setStyle(this.css.styleItemBgSelect.style_alternative);
                    this.textObj.setStyle(this.css.styleItemTxtSelect.style_alternative);
                    this.textTitleObj.setStyle(this.css.styleItemTxtSelect.style_alternative)
                } else {
                    this.rectObj.setStyle(this.css.styleItemBgUnSelect.style_alternative);
                    this.textObj.setStyle(this.css.styleItemTxtUnSelect.style_alternative);
                    this.textTitleObj.setStyle(this.css.styleItemTxtUnSelect.style_alternative)
                }
            }
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, hideFlagImage: function () {
        try {
            this.flagImage.hide()
        } catch (ex) {
            ex.errMethod = "hideFlagImage";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, showFlagImage: function () {
        try {
            this.flagImage.show()
        } catch (ex) {
            ex.errMethod = "showFlagImage";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            var _this = this;
            _this.textSeparatorObj.setStyle(_this.css.styleItemTxtSelect.style);
            if (_this.alternativeStyle) {
                _this.rectObj.setStyle(_this.css.styleItemBgSelect.style_alternative);
                _this.textObj.setStyle(_this.css.styleItemTxtSelect.style_alternative);
                _this.textTitleObj.setStyle(_this.css.styleItemTxtSelect.style_alternative)
            } else {
                _this.rectObj.setStyle(_this.css.styleItemBgSelect.style);
                _this.textObj.setStyle(_this.css.styleItemTxtSelect.style);
                _this.textTitleObj.setStyle(_this.css.styleItemTxtSelect.style)
            }
            _this.isSelect =
                true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (!this.isSelected) {
                if (this.alternativeStyle) {
                    this.rectObj.setStyle(this.css.styleItemBgUnSelect.style_alternative);
                    this.textObj.setStyle(this.css.styleItemTxtUnSelect.style_alternative);
                    this.textSeparatorObj.setStyle(this.css.styleItemTxtUnSelect.style);
                    this.textTitleObj.setStyle(this.css.styleItemTxtUnSelect.style_alternative)
                } else {
                    this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
                    this.textObj.setStyle(this.css.styleItemTxtUnSelect.style);
                    this.textSeparatorObj.setStyle(this.css.styleItemTxtUnSelect.style);
                    this.textTitleObj.setStyle(this.css.styleItemTxtUnSelect.style)
                }
                this.isSelect = false
            } else this.selected()
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, selected: function () {
        try {
            if (this.css.styleItemBgSelected.style != null)this.rectObj.setStyle(this.css.styleItemBgSelected.style);
            if (this.css.styleItemTxtSelected.style != null) {
                this.textSeparatorObj.setStyle(this.css.styleItemTxtSelect.style);
                if (this.alternativeStyle) {
                    this.rectObj.setStyle(this.css.styleItemBgSelect.style_alternative);
                    this.textObj.setStyle(this.css.styleItemTxtSelect.style_alternative);
                    this.textTitleObj.setStyle(this.css.styleItemTxtSelect.style_alternative)
                } else {
                    this.rectObj.setStyle(this.css.styleItemBgSelect.style);
                    this.textObj.setStyle(this.css.styleItemTxtSelect.style);
                    this.textTitleObj.setStyle(this.css.styleItemTxtSelect.style)
                }
            }
            this.isSelected = true
        } catch (ex) {
            ex.errMethod = "selected";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, setSelected: function () {
        try {
            this.isSelected = true
        } catch (ex) {
            ex.errMethod = "setSelected";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, setUnSelected: function () {
        try {
            this.isSelected = false
        } catch (ex) {
            ex.errMethod = "setUnSelected";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, isSelected: function () {
        try {
            return this.isSelected
        } catch (ex) {
            ex.errMethod = "isSelected";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }, isSelect: function () {
        try {
            return this.isSelect
        } catch (ex) {
            ex.errMethod = "isSelect";
            ex.errClass = "ButtonFlagImage";
            fw.err(ex)
        }
    }
});
