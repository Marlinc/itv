var VodCatItemList = Class.create({
    id: null,
    css: null,
    btnObj: null,
    rectObj: null,
    textTitleObj: null,
    textYearObj: null,
    initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.enableDifferentStarsFocusOnOff = false;
            this.isRatingDrawn = false;
            this.btnObj = fw.cssBuilder.createDiv(_id + "_Button", this.css.styleItemCont.style);
            this.btnObj.show();
            this.rectObj = fw.cssBuilder.createRect(_id + "_ButtonBg", this.css.styleItemBgUnSelect.style);
            this.textTitleObj = fw.cssBuilder.createText(_id + "_textTitleObj", this.css.styleItemTitleTxtUnSelect.style);
            this.textYearObj = fw.cssBuilder.createText(_id + "_textYearObj", this.css.styleItemYearTxtUnSelect.style);
            this.ratingContentUnSelect = fw.cssBuilder.createDiv(_id + "_ratingContentUnSelect", this.css.styleRating.style);
            this.ratingContentSelect = fw.cssBuilder.createDiv(_id + "_ratingContentSelect", this.css.styleRating.style);
            this.btnObj.appendChild(this.rectObj);
            this.btnObj.appendChild(this.textTitleObj);
            this.btnObj.appendChild(this.textYearObj);
            this.btnObj.appendChild(this.ratingContentUnSelect);
            this.btnObj.appendChild(this.ratingContentSelect);
            this.isSelect = false;
            this.rateImgOn = null;
            this.btnObj.obj = this;
            this.isSet = false;
            this.ctxObj = null;
            this.ctxObjOn = null
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    hide: function () {
        try {
            this.btnObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    show: function () {
        try {
            this.btnObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    setDataObj: function (_index, _obj) {
        try {
            this.textTitleObj.setTxt(_obj[_index].contentTitle)
        } catch (ex) {
            ex.errMethod = "setDataObj";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    verifyIfLocked: function (appObj, _movie) {
        try {
            if (_movie.isLocked != undefined && _movie.isLocked)return true; else if (appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe))return true;
            return false
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    setItem: function (_obj, _delay1, _delay2) {
        try {
            if (_obj !=
                null)this.setDataFromObj(_obj); else {
                this.isSet = false;
                this.textTitleObj.setTxt(this.css.styleItemTitleTxtUnSelect.defaultTitle);
                this.textYearObj.setTxt("");
                if (this.rateImgOn != null) {
                    this.btnObj.removeChild(this.rateImgOn.getObj());
                    this.rateImgOn = null
                }
            }
        } catch (ex) {
            ex.errMethod = "setItem";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    setDataFromObj: function (_obj) {
        try {
            if (_obj.title == undefined) {
                _obj.title = this.css.styleItemTitleTxtUnSelect.defaultTitle;
                this.isSet = false
            } else this.isSet = true;
            if (_obj.releaseYear ==
                null || (_obj.releaseYear == undefined || (_obj.releaseYear == 0 || (_obj.releaseYear == "0" || (_obj.releaseYear.length < 4 || _obj.releaseYear < 1E3)))))_obj.releaseYear = "";
            this.textTitleObj.setTxt(_obj.title);
            var appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            if (!this.verifyIfLocked(fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app, _obj)) {
                this.textTitleObj.setStyle(this.css.styleItemTitleTxtUnSelect.style);
                this.textYearObj.setTxt(_obj.releaseYear);
                this.drawRating(_obj.starRatingCode);
                if (!this.isSelect)this.hideRating()
            } else this.textTitleObj.style.width = "100%"
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    drawRating: function (_ratingValue) {
        try {
            if (_ratingValue != undefined && !this.isRatingDrawn) {
                for (var i = 0; i < parseInt(_ratingValue); i++) {
                    var appImg = cssUtil.addElementRelativeInLineToDom(Image, "starUnselect_" + i, this.css.styleRating.fullUnSelectStar, this.ratingContentUnSelect);
                    appImg.setUrl(this.css.styleRating.fullUnSelectStar.url);
                    var appImg = cssUtil.addElementRelativeInLineToDom(Image,
                        "starSelect_" + i, this.css.styleRating.fullSelectStar, this.ratingContentSelect);
                    appImg.setUrl(this.css.styleRating.fullSelectStar.url)
                }
                if (_ratingValue - parseInt(_ratingValue) > 0) {
                    var appImg = cssUtil.addElementRelativeInLineToDom(Image, "halfStarUnselect_" + i, this.css.styleRating.halfUnSelectStar, this.ratingContentUnSelect);
                    appImg.setUrl(this.css.styleRating.halfUnSelectStar.url);
                    var appImg = cssUtil.addElementRelativeInLineToDom(Image, "halfDStarSelect_" + i, this.css.styleRating.halfSelectStar, this.ratingContentSelect);
                    appImg.setUrl(this.css.styleRating.halfSelectStar.url)
                }
                this.isRatingDrawn = true
            }
        } catch (ex) {
            ex.errMethod = "drawRating";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    hideRating: function () {
        try {
            this.ratingContentUnSelect.show();
            this.ratingContentSelect.hide()
        } catch (ex) {
            ex.errMethod = "hideRating";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            if (this.enableDifferentStarsFocusOnOff) {
                this.ratingContentUnSelect.hide();
                this.ratingContentSelect.show()
            }
            this.rectObj.setStyle(this.css.styleItemBgSelect.style);
            this.textTitleObj.setStyle(this.css.styleItemTitleTxtSelect.style);
            this.textYearObj.setStyle(this.css.styleItemYearTxtSelect.style);
            this.isSelect = true
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    focusOff: function () {
        try {
            if (this.enableDifferentStarsFocusOnOff) {
                this.ratingContentUnSelect.show();
                this.ratingContentSelect.hide()
            }
            this.rectObj.setStyle(this.css.styleItemBgUnSelect.style);
            this.textTitleObj.setStyle(this.css.styleItemTitleTxtUnSelect.style);
            this.textYearObj.setStyle(this.css.styleItemYearTxtUnSelect.style);
            this.isSelect = false
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    setX: function (_x) {
        try {
            this.btnObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    setY: function (_y) {
        try {
            this.btnObj.setY(_y)
        } catch (ex) {
            ex.errMethod = "setY";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    },
    isSelect: function () {
        try {
            return this.isSelect
        } catch (ex) {
            ex.errMethod = "isSelect";
            ex.errClass = "VodCatItemList";
            fw.err(ex)
        }
    }
});
