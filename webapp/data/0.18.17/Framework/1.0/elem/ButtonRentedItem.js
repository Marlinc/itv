var ButtonRentedItem = Class.create(Button, {
    initialize: function (_id, _css) {
        try {
            this.id = _id;
            this.css = _css;
            this.title = "";
            this.btnObj = fw.cssBuilder.createDiv(_id + "_Button", this.css.styleItemCont.style);
            this.btnObj.show();
            this.rectObj = fw.cssBuilder.createRect(_id + "_ButtonBg", this.css.styleItemBgUnSelect.style);
            this.textObj = fw.cssBuilder.createText(_id + "_ButtonTxt", this.css.styleItemTxtUnSelect.style);
            this.yearObj = null;
            this.ctxObj = null;
            this.textRightObj = null;
            this.textSchedObj = null;
            this.btnObj.appendChild(this.rectObj);
            this.btnObj.appendChild(this.textObj);
            this.isFocused = false;
            this.isSelect = false;
            this.btnObj.obj = this
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, getObj: function () {
        try {
            return this.btnObj
        } catch (ex) {
            ex.errMethod = "getObj";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setItem: function (_obj, _a, _b) {
        try {
            if (_obj != null)this.setDataFromObj(_obj)
        } catch (ex) {
            ex.errMethod = "setItem";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setDataFromObj: function (_obj) {
        try {
            if (_obj != null) {
                var item =
                    _obj;
                switch (item.contentType) {
                    case "SOTV":
                        this.setDataFromObjPPV(item.programs[0]);
                        break;
                    case "PPV":
                        this.setDataFromObjPPV(item);
                        break;
                    case "VoD":
                        this.setDataFromObjVOD(item);
                        break;
                    case "TVoY":
                        this.setDataFromObjTVOY(item);
                        break
                }
                if (this.isSelect)this.focusOn()
            }
            var item = _obj
        } catch (ex) {
            ex.errMethod = "setDataFromObj";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setX: function (_x) {
        try {
            this.btnObj.setX(_x)
        } catch (ex) {
            ex.errMethod = "setX";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setY: function (_y) {
        try {
            this.btnObj.setY(_y)
        } catch (ex) {
            ex.errMethod =
                "setY";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setW: function (_w) {
        try {
            this.btnObj.setW(_w);
            this.rectObj.setW(_w);
            this.textObj.setW(_w)
        } catch (ex) {
            ex.errMethod = "setW";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, focusOn: function () {
        try {
            fw.appManager.setFocusElem(this);
            var _this = this;
            setTimeout(function () {
                _this.rectObj.setStyle(_this.css.styleItemBgSelect.style);
                _this.textObj.setStyle(_this.css.styleItemTxtSelect.style);
                if (_this.yearObj != null)_this.yearObj.setStyle(_this.css.styleItemYearSelect.style);
                if (_this.textRightObj != null)_this.textRightObj.setStyle(_this.css.styleItemRightTxtSelect.style);
                if (_this.textSchedObj != null)_this.textSchedObj.setStyle(_this.css.styleItemSchedTxtSelect.style);
                if (_this.ctxObj != null)cssUtil.changeRatingColor(_this.ctxObj, _this.css.styleRating.colorFocusOn, _this.css.styleRating.colorSecondHalf);
                _this.isSelect = true
            }, 0)
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            var _this = this;
            setTimeout(function () {
                _this.rectObj.setStyle(_this.css.styleItemBgUnSelect.style);
                _this.textObj.setStyle(_this.css.styleItemTxtUnSelect.style);
                if (_this.yearObj != undefined && _this.yearObj != null)_this.yearObj.setStyle(_this.css.styleItemYearUnSelect.style);
                if (_this.textRightObj != null)_this.textRightObj.setStyle(_this.css.styleItemRightTxtUnSelect.style);
                if (_this.textSchedObj != null)_this.textSchedObj.setStyle(_this.css.styleItemSchedTxtUnSelect.style);
                if (_this.ctxObj != null)cssUtil.changeRatingColor(_this.ctxObj, _this.css.styleRating.colorFocusOff, _this.css.styleRating.colorSecondHalf);
                _this.isSelect = false
            }, 0)
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, isSelect: function () {
        try {
            return this.isSelect
        } catch (ex) {
            ex.errMethod = "isSelect";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setTxt: function (_txt) {
        try {
            this.title = _txt;
            this.textObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setTxt";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setYear: function (_txt) {
        try {
            this.yearObj = fw.cssBuilder.createText(this.id + "_ButtonYear", this.css.styleItemYearUnSelect.style);
            this.btnObj.appendChild(this.yearObj);
            this.year = _txt;
            this.yearObj.setTxt(_txt)
        } catch (ex) {
            ex.errMethod = "setYear";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setTvoyButtons: function (_textRightObj, _textSchedObj) {
        try {
            this.textSchedObj = fw.cssBuilder.createText(this.id + "_ButtonSchedTxt", this.css.styleItemSchedTxtUnSelect.style);
            this.textRightObj = fw.cssBuilder.createText(this.id + "_ButtonRightTxt", this.css.styleItemRightTxtUnSelect.style);
            this.btnObj.appendChild(this.textRightObj);
            this.btnObj.appendChild(this.textSchedObj);
            this.textSchedObj.setTxt(_textSchedObj);
            this.textRightObj.setTxt(_textRightObj)
        } catch (ex) {
            ex.errMethod = "setTvoyButtons";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, getWidthTxt: function () {
        try {
            return $j("#" + this.id + "_ButtonTxt").width()
        } catch (ex) {
            ex.errMethod = "getWidthTxt";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, getHeightTxt: function () {
        try {
            return $j("#" + this.id + "_ButtonTxt").height()
        } catch (ex) {
            ex.errMethod = "getHeightTxt";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, hide: function () {
        try {
            this.btnObj.hide()
        } catch (ex) {
            ex.errMethod = "hide";
            ex.errClass =
                "ButtonRentedItem";
            fw.err(ex)
        }
    }, show: function () {
        try {
            this.btnObj.show()
        } catch (ex) {
            ex.errMethod = "show";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setDataFromObjTVOY: function (_obj) {
        try {
            this.appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            var title = "";
            if (_obj.name != undefined)title = _obj.name; else if (_obj.title != undefined)title = _obj.title;
            var appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            var suffix = appObj.messages.afleveringEpisodeSuffix;
            this.setTxt(title + suffix);
            this.textObj.setX(110);
            var descr = "";
            if (_obj.shortDescription != undefined)descr = _obj.shortDescription;
            if (_obj.licenceBeginDate != undefined)var date = _obj.licenceBeginDate; else date = "";
            this.setTvoyButtons(descr, this.getFormattedDate(this.css.daysArray, date))
        } catch (ex) {
            fw.log.error("TvoyItemList|setDataFromObj|" + ex);
            ex.errMethod = "setDataFromObjTVOY";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setDataFromObjVOD: function (_obj) {
        try {
            if (_obj.title == undefined)_obj.title = this.css.styleItemTitleTxtUnSelect.defaultTitle;
            if (_obj.releaseYear == undefined)_obj.releaseYear = "";
            this.setTxt(_obj.title);
            var appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            if (!this.verifyIfLocked(appObj, _obj)) {
                this.setYear(_obj.releaseYear);
                if (this.isSelect)this.ctxObj = cssUtil.drawRatingElement(this.btnObj, _obj.starRatingCode, this.css.styleRating.height, this.css.styleRating.marginLeft, this.css.styleRating.marginTop, this.css.styleRating.colorFocusOn, this.css.styleRating.colorSecondHalf, this.css.styleRating.leftOffset); else this.ctxObj =
                    cssUtil.drawRatingElement(this.btnObj, _obj.starRatingCode, this.css.styleRating.height, this.css.styleRating.marginLeft, this.css.styleRating.marginTop, this.css.styleRating.colorFocusOff, this.css.styleRating.colorSecondHalf, this.css.styleRating.leftOffset)
            }
        } catch (ex) {
            ex.errMethod = "setDataFromObjVOD";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, verifyIfLocked: function (appObj, _movie) {
        try {
            if (_movie.isLocked != undefined && _movie.isLocked)return true; else if (appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe))return true;
            return false
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, getFormattedDate: function (_daysArray, _unixTimestamp) {
        try {
            var day = (new Date(_unixTimestamp)).getDate();
            if (day <= 9)day = "0" + day;
            var month = parseInt((new Date(_unixTimestamp)).getMonth() + 1);
            if (month <= 9)month = "0" + month;
            var dayOfWeek = (new Date(_unixTimestamp)).getDay();
            var dayTranslation = eval("this.appObj.messages." + _daysArray[dayOfWeek]);
            return dayTranslation.substring(0, 2).toLowerCase() + " " + day + "-" + month
        } catch (ex) {
            ex.errMethod =
                "getFormattedDate";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }, setDataFromObjPPV: function (_obj) {
        try {
            this.appObj = fw.appManager.getAppInfo(fw.appManager.getCurrentApp()).app;
            var startTime = fw.util.getDayNumLit(_obj.programStartTime);
            this.setTxt(startTime + "&nbsp;&nbsp;&nbsp;" + _obj.title)
        } catch (ex) {
            ex.errMethod = "setDataFromObjPPV";
            ex.errClass = "ButtonRentedItem";
            fw.err(ex)
        }
    }
});
