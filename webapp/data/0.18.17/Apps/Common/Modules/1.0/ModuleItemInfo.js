var ModuleItemInfo = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf) {
        $super(_parent, _prop);
        this.prop = _prop;
        this.conf = _modConf;
        this.parent = _parent;
        this.ItemInfoTitleTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoTitleTxt", this.conf.ItemInfoTitleTxt, this.getModObj());
        this.ItemInfoDurationTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDurationTxt", this.conf.ItemInfoDurationTxt, this.getModObj());
        this.ItemInfoPriceLblTxt = cssUtil.addElementToDom(Text, this.prop.id +
            "_ItemInfoPriceLblTxt", this.conf.ItemInfoPriceLblTxt, this.getModObj());
        this.ItemInfoPriceTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoPriceTxt", this.conf.ItemInfoPriceTxt, this.getModObj());
        this.ItemInfoPriceValLblTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoPriceValLblTxt", this.conf.ItemInfoPriceValLblTxt, this.getModObj());
        this.ItemInfoPriceValxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoPriceValxt", this.conf.ItemInfoPriceValxt, this.getModObj());
        this.ItemInfoEndPurchValLblTxt =
            cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoEndPurchValLblTxt", this.conf.ItemInfoEndPurchValLblTxt, this.getModObj());
        this.ItemInfoEndPurchValTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoEndPurchValTxt", this.conf.ItemInfoEndPurchValTxt, this.getModObj());
        this.ItemInfoEndValLblTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoEndValLblTxt", this.conf.ItemInfoEndValLblTxt, this.getModObj());
        this.ItemInfoEndValTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoEndValTxt", this.conf.ItemInfoEndValTxt,
            this.getModObj());
        this.ItemInfoCastTxt = null;
        this.ItemInfoDescTxt = null;
        if (this.conf.ItemInfoRatingPng != undefined) {
            this.ratingContent = cssUtil.addElementToDom(Image, "Rating", this.conf.ItemInfoRatingPng.ItemInfoRatingPngComposed, this.getModObj());
            this.ratingContent.setUrl("")
        } else this.ratingContent = null;
        this.ItemInfoLogoImg = cssUtil.addElementToDom(Image, this.prop.id + "_ItemInfoLogoImg", this.conf.ItemInfoLogoImg, this.getModObj());
        this.ItemInfoPCLockImg = cssUtil.addElementToDom(Image, this.prop.id + "_ItemInfoPCLockImg",
            this.conf.ItemInfoPCLockImg, this.getModObj());
        this.contER = fw.cssBuilder.createDiv(this.prop.id + "_ItemInfoContRating", this.conf.itemContRating.style);
        this.itemErArray = new Array;
        this.rating = null;
        for (var i = 0; i < 12; i++)this.itemErArray.push(cssUtil.addElementRelativeInLineToDom(Image, this.prop.id + "_ItemInfoERImg_" + i, this.conf.ItemInfoER1Img, this.contER));
        this.getModObj().appendChild(this.contER);
        this.actualMovie = null;
        this.labelDayForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_lday);
        this.labelDaysForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_ldays);
        this.labelHourForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_lhour);
        this.labelHoursForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_lhours);
        this.labelMinForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_lmin);
        this.labelMinsForPriceDuration = eval("this.parent.appObj.messages." + this.conf.label_lmins)
    },
    hide: function (_isTimeOut) {
        if (_isTimeOut == undefined)this.getModCntObj().hide();
        else if (_isTimeOut) {
            var _this = this;
            setTimeout(function () {
                _this.getModCntObj().hide()
            }, 0)
        }
    },
    show: function (_isTimeout) {
        if (_isTimeout == undefined)this.getModCntObj().show(); else if (_isTimeOut) {
            var _this = this;
            setTimeout(function () {
                _this.getModCntObj().show()
            }, 0)
        }
    },
    setInfoSmartview: function (_smartMovie) {
        this.clearAll();
        this.clearExtRating();
        this.setTitle(_smartMovie.title);
        this.ItemInfoDescTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDescTxt", this.conf.ItemInfoDesc2LinesTxt, this.getModObj());
        this.setDescription(_smartMovie.description)
    },
    setInfoByMovie: function (_movie, _isRatingPresent, _forceUpdate) {
        try {
            if (_movie != null && (_movie.blockId != undefined && _movie.blockId == -1 || _movie.blockId == undefined)) {
                this.actualMovie = _movie;
                this.clearAllCatalog();
                var _this = this;
                if (_movie.title != undefined && _movie.title != null)_this.setTitle(_movie.title); else if (_movie.name != undefined && _movie.name != null)_this.setTitle(_movie.name);
                if (_movie.runtime != undefined && _movie.runtime != null)_this.setDuration(parseInt(_movie.runtime) +
                    eval("_this.parent.appObj.messages." + _this.conf.label_min)); else _this.setDuration("0" + eval("_this.parent.appObj.messages." + _this.conf.label_min));
                if (fw.mwManager.isMovieComingSoon(_movie))_this.ItemInfoPriceLblTxt.setTxt(_this.parent.appObj.messages.label_coming_soon); else this.setPriceAndValue(_movie);
                if (_this.verifyIfLocked(_movie, _this)) {
                    _this.ItemInfoPCLockImg.setUrl(_this.conf.lock_image_url);
                    _this.ItemInfoPCLockImg.show()
                } else {
                    this.ItemInfoPCLockImg.hide();
                    if (_isRatingPresent != undefined && _isRatingPresent) {
                        this.removeDesc();
                        this.removeCast();
                        this.ItemInfoCastTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoCastTxt", this.conf.ItemInfoCastTxt, this.getModObj());
                        this.ItemInfoCastTxt.setTxt(this.setCast(_movie));
                        if (_movie.starRatingCode != undefined && _movie.starRatingCode != null)this.setRatingPng(_movie.starRatingCode)
                    } else if (_isRatingPresent != undefined && !_isRatingPresent) {
                        this.removeDesc();
                        this.removeCast();
                        this.ItemInfoCastTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoCastTxt", this.conf.ItemInfoCastTxt, this.getModObj());
                        this.ItemInfoCastTxt.setTxt(this.setCast(_movie));
                        this.ItemInfoDescTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDescTxt", this.conf.ItemInfoDesc2LinesTxt, this.getModObj());
                        if (_movie.shortDescription != undefined && _movie.shortDescription != null)this.setDescription(_movie.shortDescription); else this.setDescription(eval("this.parent.appObj.messages." + this.conf.catalogGrid_NoDesc))
                    }
                }
                this.setExtRating(_movie)
            } else if (_movie.blockId != -1 && _movie.blockId != undefined) {
                this.clearAllCatalog();
                this.setTitle(_movie.title);
                this.ItemInfoDescTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDescTxt", this.conf.ItemInfoDesc2LinesTxt, this.getModObj());
                this.setDescription(eval("this.parent.appObj.messages." + this.conf.catalogGrid_NoDesc));
                this.setPriceAndValue(_movie)
            }
        } catch (ex) {
            ex.errMethod = "setInfoByMovie";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setExtRating: function (_movie) {
        try {
            var listRating = new Array;
            var contRating = this.itemErArray.length - 1;
            if (_movie.extendedRating != undefined && _movie.extendedRating != null)if (_movie.extendedRating.length >
                0)for (var i = 0; i < _movie.extendedRating.length && contRating > 0; i++) {
                var code = _movie.extendedRating[i].ratingCode;
                var url = "";
                switch (code) {
                    case "G":
                        url = this.conf.icon_ER_G_url;
                        break;
                    case "S":
                        url = this.conf.icon_ER_S_url;
                        break;
                    case "A":
                        url = this.conf.icon_ER_A_url;
                        break;
                    case "H":
                        url = this.conf.icon_ER_H_url;
                        break;
                    case "D":
                        url = this.conf.icon_ER_D_url;
                        break;
                    case "T":
                        url = this.conf.icon_ER_T_url;
                        break
                }
                if (url != "") {
                    listRating.push(url);
                    contRating--
                }
            }
            if (_movie.ratingType != undefined && _movie.ratingType != null)if (_movie.ratingType ==
                "MPAA") {
                var url = "";
                if (_movie.ratingCode != "NR") {
                    if (_movie.ratingCode == "6")url = this.conf.icon_Age_6_url; else if (_movie.ratingCode == "9")url = this.conf.icon_Age_9_url; else if (_movie.ratingCode == "12")url = this.conf.icon_Age_12_url; else if (_movie.ratingCode == "16")url = this.conf.icon_Age_16_url; else if (_movie.ratingCode == "18")url = this.conf.icon_Age_20_url; else if (_movie.ratingCode == "AL")url = this.conf.icon_Age_all_url;
                    listRating.push(url);
                    contRating--
                }
            } else if (_movie.ratingType == "VCHIP") {
                var url = "";
                if (_movie.ratingCode ==
                    "6")url = this.conf.icon_Age_6_url; else if (_movie.ratingCode == "9")url = this.conf.icon_Age_9_url; else if (_movie.ratingCode == "12")url = this.conf.icon_Age_12_url; else if (_movie.ratingCode == "16")url = this.conf.icon_Age_16_url; else if (_movie.ratingCode == "20")url = this.conf.icon_Age_20_url; else if (_movie.ratingCode == "AL")url = this.conf.icon_Age_all_url;
                listRating.push(url);
                contRating--
            }
            if (_movie.hdContent != undefined && (_movie.hdContent != null && _movie.hdContent))if (_movie.movieCategories[0].categoryId != undefined &&
                _movie.movieCategories[0].categoryId == fw.conf.fullHdCategoryId) {
                listRating.push(this.conf.icon_fullhd_url);
                contRating--
            } else {
                listRating.push(this.conf.icon_hd_url);
                contRating--
            }
            if (_movie.isSurroundSound != undefined && _movie.isSurroundSound != null)if (_movie.isSurroundSound) {
                listRating.push(this.conf.icon_dolby_url);
                contRating--
            }
            var j = 0;
            for (var i = this.itemErArray.length - 1; i > 0 && i >= contRating; i--) {
                this.itemErArray[i].setUrl(listRating[j]);
                j++
            }
        } catch (ex) {
            ex.errMethod = "setCast";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setCast: function (_movie) {
        try {
            var cast = "";
            if (_movie.releaseYear != undefined && _movie.releaseYear != 0)cast = cast + _movie.releaseYear;
            if (_movie.releaseYear != undefined && (_movie.releaseYear != "" && (_movie.actorsList != undefined && (_movie.actorsList != null && _movie.actorsList.length > 0) || _movie.directorsList != undefined && (_movie.directorsList != null && _movie.directorsList.length > 0))))if (cast.length > 0)cast = cast + ",";
            if (_movie.actorsList != undefined && (_movie.actorsList != null && _movie.actorsList.length > 0))cast =
                cast + eval("this.parent.appObj.messages." + this.conf.label_met) + this.getListNameFormatted(_movie.actorsList) + ".";
            if (_movie.directorsList != undefined && (_movie.directorsList != null && _movie.directorsList.length > 0))cast = cast + " " + eval("this.parent.appObj.messages." + this.conf.label_regie) + this.getListNameFormatted(_movie.directorsList) + ".";
            return cast
        } catch (ex) {
            ex.errMethod = "setCast";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    getListNameFormatted: function (_list) {
        try {
            var artistList = "";
            if (_list != undefined && _list.length >
                0)for (var i = 0; i < _list.length; i++)if (i == _list.length - 1 && i > 0)artistList = artistList + " en " + _list[i]; else if (i == 0)artistList = artistList + _list[i]; else artistList = artistList + ", " + _list[i];
            return artistList
        } catch (ex) {
            ex.errMethod = "getListNameFormatted";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setPriceAndValue: function (_movie) {
        try {
            if (_movie.rentalType != undefined && (_movie.rentalType != null && _movie.rentalType != "POD")) {
                this.setPriceInfo(eval("this.parent.appObj.messages." + this.conf.label_Price_Gratis), "", "",
                    null);
                this.setPublicationValidity(eval("this.parent.appObj.messages." + this.conf.label_PublicationValidity), _movie.licenceEndDate)
            } else if (_movie.rentalType != undefined && (_movie.rentalType != null && (_movie.rentalType == "POD" && (_movie.rentalTRCcode != undefined && (_movie.rentalTRCcode != null && (_movie.rentalTRCcode == "T0" || _movie.rentalTRCcode == "R0")))))) {
                this.setPriceInfo(eval("this.parent.appObj.messages." + this.conf.label_Price_Gratis), "", "", null);
                this.setPublicationValidity(eval("this.parent.appObj.messages." +
                    this.conf.label_PublicationValidity), _movie.licenceEndDate)
            } else if (fw.mwManager.isItemRented(_movie)) {
                var rentalPeriodLong = fw.mwManager.getMovieRentalEndTimestamp(_movie);
                if (rentalPeriodLong != undefined && (rentalPeriodLong != null && rentalPeriodLong > 0)) {
                    var rentalPeriod = "";
                    if (rentalPeriodLong != 0)rentalPeriod = fw.util.getInfoDetailtime(rentalPeriodLong);
                    this.setPurchaseValidity(eval("this.parent.appObj.messages." + this.conf.label_PurchaseValidity), rentalPeriod)
                }
            } else if (_movie.licenceEndDate != undefined &&
                _movie.licenceEndDate != null) {
                this.setPriceInfo(null, fw.mwManager.getRentalCost(_movie), eval("this.parent.appObj.messages." + this.conf.label_per), fw.mwManager.getRentalDurationDayHourMins(_movie));
                this.setPublicationValidity(eval("this.parent.appObj.messages." + this.conf.label_PublicationValidity), _movie.licenceEndDate)
            }
        } catch (ex) {
            ex.errMethod = "setPriceAndValue";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    verifyIfLocked: function (_movie, _obj) {
        try {
            if (_movie.blockId != undefined && _movie.blockId != -1)return false;
            else if (_movie.isLocked != undefined && _movie.isLocked)return true; else if (_obj.parent.appObj != undefined && (_obj.parent.appObj.PCCatChecked != undefined && (_obj.parent.appObj.PCCatChecked != "Y" && fw.pcmanager.checkPCLevel(_movie.isPCSafe))))return true;
            return false
        } catch (ex) {
            ex.errMethod = "verifyIfLocked";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setInfoByMoviePG: function (_movie, _isRatingPresent) {
        try {
            if (_movie != undefined || (this.actualMovie == null || this.actualMovie != null && this.actualMovie != _movie)) {
                this.actualMovie =
                    _movie;
                this.clearAll()
            }
            var _this = this;
            if (_movie.title != undefined && _movie.title != null)this.setTitle(_movie.title); else if (_movie.displayName != undefined && (_movie.displayName != null && _movie.displayName != ""))this.setTitle(_movie.displayName); else this.setTitle(_movie.name);
            if (_movie.runtime != undefined && _movie.runtime != null)this.setDuration(parseInt(_movie.runtime) + eval("this.parent.appObj.messages." + this.conf.label_min) + "&nbsp;&nbsp;" + fw.util.getFormattedDate(_movie.licenceBeginDate));
            if (fw.mwManager.isMovieComingSoon(_movie))this.ItemInfoPriceLblTxt.setTxt(this.parent.appObj.messages.label_coming_soon);
            else this.setPriceAndValue(_movie);
            if (this.parent.appObj.PCCatChecked == "N" && fw.pcmanager.checkPCLevel(_movie.isPCSafe)) {
                this.ItemInfoPCLockImg.setUrl(this.conf.lock_image_url);
                this.ItemInfoPCLockImg.show();
                if (_movie.hasFakeDesc == null || _movie.hasFakeDesc == undefined)if (_movie.shortDescription != null && (_movie.shortDescription != undefined && (_movie.id != null || _movie.categoryId != null)))this.setLogoChannel(_movie.shortDescription)
            } else {
                this.ItemInfoPCLockImg.hide();
                if (_isRatingPresent == undefined || _isRatingPresent !=
                    undefined && !_isRatingPresent) {
                    this.removeDesc();
                    this.removeCast();
                    if (_movie.categoryId != undefined) {
                        this.ItemInfoDescTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDescTxt", this.conf.ItemInfoCastTxt, this.getModObj());
                        if (_movie.shortDescription != undefined && _movie.shortDescription != null) {
                            this.setDescription(_movie.shortDescription);
                            if (_movie.hasFakeDesc == null || _movie.hasFakeDesc == undefined)if (_movie.shortDescription != null && (_movie.shortDescription != undefined && (_movie.id != null || _movie.categoryId !=
                                null)))this.setLogoChannel(_movie.shortDescription)
                        } else if (_movie.hasFakeDesc == null || _movie.hasFakeDesc == undefined)if (_movie.shortDescription != null && (_movie.shortDescription != undefined && (_movie.id != null || _movie.categoryId != null)))this.setLogoChannel(_movie.shortDescription)
                    } else {
                        this.ItemInfoDescTxt = cssUtil.addElementToDom(Text, this.prop.id + "_ItemInfoDescTxt", this.conf.ItemInfoDesc2LinesTxt, this.getModObj());
                        if (_movie.shortDescription != undefined && _movie.shortDescription != null) {
                            this.setDescription(_movie.shortDescription);
                            if (_movie.hasFakeDesc == null || _movie.hasFakeDesc == undefined)if (_movie.shortDescription != null && (_movie.shortDescription != undefined && (_movie.id != null || _movie.categoryId != null)))this.setLogoChannel(_movie.shortDescription)
                        } else if (_movie.hasFakeDesc == null || _movie.hasFakeDesc == undefined)if (_movie.shortDescription != null && (_movie.shortDescription != undefined && (_movie.id != null || _movie.categoryId != null)))this.setLogoChannel(_movie.shortDescription)
                    }
                }
            }
            this.setExtRating(_movie);
            this.actualMovie = _movie
        } catch (ex) {
            ex.errMethod =
                "setInfoByMoviePG";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setLogoChannel: function (_logoUrl) {
        try {
            this.channelObject = fw.subscriberDataManager.getChannelByCallLetter(_logoUrl);
            if (this.channelObject != null && this.channelObject != undefined)var url = fw.mwManager.getChannelLogoCompleteUrl(this.channelObject.logoName); else var url = fw.conf.CLEAR_IMAGE;
            this.ItemInfoLogoImg.setUrl(url)
        } catch (ex) {
            ex.errMethod = "setLogoChannel";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setTitle: function (_ItemInfoTitleTxt) {
        this.ItemInfoTitleTxt.setTxt(_ItemInfoTitleTxt)
    },
    setDuration: function (_ItemInfoDurationTxt) {
        this.ItemInfoDurationTxt.setTxt(_ItemInfoDurationTxt)
    },
    setDescription: function (_ItemInfoDescTxt) {
        this.ItemInfoDescTxt.setTxt(_ItemInfoDescTxt)
    },
    setPriceInfo: function (_ItemInfoPriceLblTxt, _ItemInfoPriceTxt, _ItemInfoPriceValLblTxt, _ItemInfoPriceDaysHourMinVal) {
        try {
            var price = "";
            if (_ItemInfoPriceLblTxt != null)price = _ItemInfoPriceLblTxt; else if (_ItemInfoPriceTxt != null && _ItemInfoPriceTxt != undefined)price = fw.util.formatPrice(parseInt(_ItemInfoPriceTxt));
            var itemInfoPriceVal =
                "";
            if (_ItemInfoPriceDaysHourMinVal != null && _ItemInfoPriceDaysHourMinVal != undefined) {
                var days = _ItemInfoPriceDaysHourMinVal.d;
                if (days != null && (days != undefined && days > 0)) {
                    var labelDay = parseInt(days) > 1 ? this.labelDaysForPriceDuration : this.labelDayForPriceDuration;
                    if (itemInfoPriceVal.length > 1)itemInfoPriceVal += " ";
                    itemInfoPriceVal += days + " " + labelDay
                }
                var hours = _ItemInfoPriceDaysHourMinVal.h;
                if (hours != null && (hours != undefined && hours > 0)) {
                    var labelHour = parseInt(hours) > 1 ? this.labelHoursForPriceDuration : this.labelHourForPriceDuration;
                    if (itemInfoPriceVal.length > 1)itemInfoPriceVal += " ";
                    itemInfoPriceVal += hours + " " + labelHour
                }
                var mins = _ItemInfoPriceDaysHourMinVal.m;
                if (mins != null && (mins != undefined && mins > 0)) {
                    var labelMins = parseInt(mins) > 1 ? this.labelMinsForPriceDuration : this.labelMinForPriceDuration;
                    if (itemInfoPriceVal.length > 1)itemInfoPriceVal += " ";
                    itemInfoPriceVal += " " + mins + " " + labelMins
                }
            }
            this.ItemInfoPriceLblTxt.setTxt(price + " " + _ItemInfoPriceValLblTxt + " " + itemInfoPriceVal)
        } catch (ex) {
            ex.errMethod = "setPriceInfo";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setPurchaseValidity: function (_ItemInfoEndPurchValLblTxt, _ItemInfoEndPurchValTxt) {
        this.ItemInfoEndPurchValLblTxt.setTxt(_ItemInfoEndPurchValLblTxt);
        this.ItemInfoEndPurchValTxt.setTxt(_ItemInfoEndPurchValTxt)
    },
    setPublicationValidity: function (_ItemInfoEndValLblTxt, _endDateValidity) {
        if (fw.util.getDatesDiff((new Date).getTime(), _endDateValidity) <= this.conf.daysValidityGapConf) {
            this.ItemInfoEndValLblTxt.getObj().setStyle(this.conf.ItemInfoEndValLblSelectTxt.style);
            this.ItemInfoEndValTxt.getObj().setStyle(this.conf.ItemInfoEndValSelectTxt.style)
        } else {
            this.ItemInfoEndValLblTxt.getObj().setStyle(this.conf.ItemInfoEndValLblTxt.style);
            this.ItemInfoEndValTxt.getObj().setStyle(this.conf.ItemInfoEndValTxt.style)
        }
        this.ItemInfoEndValLblTxt.setTxt(_ItemInfoEndValLblTxt);
        this.ItemInfoEndValTxt.setTxt(fw.util.getDate(_endDateValidity, true))
    },
    setRatingPng: function (_ItemInfoRatingImg) {
        try {
            var rat = parseInt(_ItemInfoRatingImg);
            if (rat != null && (rat > 0 && rat <= 5))this.ratingContent.setUrl(this.conf.ItemInfoRatingPng.ItemInfoRatingPngComposed.urlComposed + _ItemInfoRatingImg + this.conf.ItemInfoRatingPng.ItemInfoRatingPngComposed.urlComposedExtension)
        } catch (ex) {
            ex.errMethod =
                "setRatingPng";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    clearPngRating: function () {
        try {
            if (this.ratingContent != null)this.ratingContent.setUrl("")
        } catch (ex) {
            ex.errMethod = "clearPngRating";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    setRatingCanvas: function (_ItemInfoRatingImg) {
        try {
            this.rating = cssUtil.drawRatingElement(this.getModObj(), parseFloat(_ItemInfoRatingImg), this.conf.ItemInfoRating.height, this.conf.ItemInfoRating.marginLeft, this.conf.ItemInfoRating.marginTop, this.conf.ItemInfoRating.color, this.conf.ItemInfoRating.colorSecondHalf,
                this.conf.ItemInfoRating.leftOffset)
        } catch (ex) {
            ex.errMethod = "setRatingCanvas";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    clearCanvasRating: function () {
        try {
            if (this.rating != undefined && this.rating != null) {
                if (this.rating.fullCanvas != undefined)this.getModObj().removeChild(this.rating.fullCanvas);
                if (this.rating.hlfCanvas != undefined)this.getModObj().removeChild(this.rating.hlfCanvas)
            }
        } catch (ex) {
            ex.errMethod = "clearCanvasRating";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    removeDesc: function () {
        try {
            var _this = this;
            if (this.ItemInfoDescTxt != null) {
                var id = this.prop.id + "_ItemInfoDescTxt";
                $j("#" + id).remove();
                this.ItemInfoDescTxt = null
            }
        } catch (ex) {
            ex.errMethod = "removeDesc";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    removeCast: function () {
        try {
            var _this = this;
            if (this.ItemInfoCastTxt != undefined && this.ItemInfoCastTxt != null) {
                var id = this.prop.id + "_ItemInfoCastTxt";
                $j("#" + id).remove();
                this.ItemInfoCastTxt = null
            }
        } catch (ex) {
            ex.errMethod = "removeCast";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    clearAllCatalog: function () {
        try {
            this.clearPngRating();
            this.ItemInfoPCLockImg.hide();
            this.ItemInfoTitleTxt.setTxt("");
            this.ItemInfoDurationTxt.setTxt("");
            this.ItemInfoPriceLblTxt.setTxt("");
            this.ItemInfoPriceTxt.setTxt("");
            this.ItemInfoPriceValLblTxt.setTxt("");
            this.ItemInfoPriceValxt.setTxt("");
            this.ItemInfoEndPurchValLblTxt.setTxt("");
            this.ItemInfoEndPurchValTxt.setTxt("");
            this.ItemInfoEndValLblTxt.setTxt("");
            this.ItemInfoEndValTxt.setTxt("");
            var url = fw.conf.CLEAR_IMAGE;
            this.ItemInfoLogoImg.setUrl(url);
            this.removeDesc();
            this.removeCast();
            for (i = 0; i <
            this.itemErArray.length; i++)this.itemErArray[i].setUrl("")
        } catch (ex) {
            ex.errMethod = "clearAllCatalog";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    clearExtRating: function () {
        try {
            for (var i = this.itemErArray.length - 1; i > 0; i--)this.itemErArray[i].setUrl("")
        } catch (ex) {
            ex.errMethod = "clearExtRating";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    },
    clearAll: function () {
        try {
            this.removeCast();
            this.clearPngRating();
            this.ItemInfoPCLockImg.hide();
            this.ItemInfoTitleTxt.setTxt("");
            this.ItemInfoDurationTxt.setTxt("");
            this.ItemInfoPriceLblTxt.setTxt("");
            this.ItemInfoPriceTxt.setTxt("");
            this.ItemInfoPriceValLblTxt.setTxt("");
            this.ItemInfoPriceValxt.setTxt("");
            this.ItemInfoEndPurchValLblTxt.setTxt("");
            this.ItemInfoEndPurchValTxt.setTxt("");
            this.ItemInfoEndValLblTxt.setTxt("");
            this.ItemInfoEndValTxt.setTxt("");
            var url = fw.conf.CLEAR_IMAGE;
            this.ItemInfoLogoImg.setUrl(url);
            this.removeDesc();
            for (i = 0; i < this.itemErArray.length; i++)this.itemErArray[i].setUrl("")
        } catch (ex) {
            ex.errMethod = "clearAll";
            ex.errClass = "ModuleItemInfo";
            fw.err(ex)
        }
    }
});
