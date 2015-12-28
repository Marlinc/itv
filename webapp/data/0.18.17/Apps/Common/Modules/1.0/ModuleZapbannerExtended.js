var ModuleZapbannerExtended = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            this.zapBannerExtBg = cssUtil.addElementToDom(Image, "zapBannerExtBg", this.conf.zapBannerExtBg, this.getModObj());
            this.zapBannerExtVodRectFocus = cssUtil.addElementToDom(RectFocusable, "zapBannerExtVodRectFocus", this.conf.zapBannerExtVodRectFocus, this.getModObj());
            this.zapBannerExtTitle = cssUtil.addElementToDom(Text, "zapBannerExtTitle", this.conf.zapBannerExtTitle,
                this.getModObj());
            this.zapBannerExtVodDesc = cssUtil.addElementToDom(TextArea, "zapBannerExtVodDesc", this.conf.zapBannerExtVodDesc, this.getModObj());
            this.contER = fw.cssBuilder.createDiv(this.prop.id + "_zapBannerExtContExtRating", this.conf.itemContRating.style);
            this.itemErArray = new Array;
            for (var i = 0; i < 9; i++)this.itemErArray.push(cssUtil.addElementRelativeInLineToDom(Image, this.prop.id + "_zapBannerExtRatingIcon_" + i, this.conf.ItemInfoER1Img, this.contER));
            this.getModObj().appendChild(this.contER)
        } catch (ex) {
            ex.errMethod =
                "initialize";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, setVodTitle: function (_ItemInfoTitleTxt) {
        try {
            this.zapBannerExtTitle.setTxt(_ItemInfoTitleTxt)
        } catch (ex) {
            ex.errMethod = "setVodTitle";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, setVodLongDescription: function (_ItemInfoDescTxt) {
        try {
            this.zapBannerExtVodDesc.setTxt(_ItemInfoDescTxt)
        } catch (ex) {
            ex.errMethod = "setVodLongDescription";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, getMenuList: function () {
        try {
            return this.zapBannerExtMenuList.getMenuList()
        } catch (ex) {
            ex.errMethod =
                "getMenuList";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, getVodDescPages: function () {
        try {
            return this.zapBannerExtVodDesc.getNumPage()
        } catch (ex) {
            ex.errMethod = "getVodDescPages";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, showDescFocus: function (_bool) {
        try {
            if (_bool)this.zapBannerExtVodRectFocus.focusOn(); else this.zapBannerExtVodRectFocus.focusOff()
        } catch (ex) {
            ex.errMethod = "showDescFocus";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, scrollTxtAreaDescUp: function () {
        try {
            this.zapBannerExtVodDesc.scrollUp()
        } catch (ex) {
            ex.errMethod =
                "scrollTxtAreaDescUp";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, resetTxtAreaDescPosition: function () {
        try {
            this.zapBannerExtVodDesc.resetPositionPage()
        } catch (ex) {
            ex.errMethod = "resetTxtAreaDescPosition";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, scrollTxtAreaDescDown: function () {
        try {
            this.zapBannerExtVodDesc.scrollDown()
        } catch (ex) {
            ex.errMethod = "scrollTxtAreaDescDown";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, cleanVodExtendedRatingIcons: function () {
        try {
            for (var i = 0; i < 9; i++)this.itemErArray[i].setUrl("")
        } catch (ex) {
            ex.errMethod =
                "cleanVodExtendedRatingIcons";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }, setVodExtendedRatingIcons: function (_movie) {
        try {
            var _this = this;
            this.cleanVodExtendedRatingIcons();
            var contRating = 8;
            if (_movie.extendedRating != undefined && _movie.extendedRating != null)if (_movie.extendedRating.length > 0)for (var i = 0; i < _movie.extendedRating.length && contRating >= 0; i++) {
                var code = _movie.extendedRating[i].ratingCode;
                var url = "";
                switch (code) {
                    case "G":
                        url = _this.conf.icon_ER_G_url;
                        break;
                    case "S":
                        url = _this.conf.icon_ER_S_url;
                        break;
                    case "A":
                        url = _this.conf.icon_ER_A_url;
                        break;
                    case "H":
                        url = _this.conf.icon_ER_H_url;
                        break;
                    case "D":
                        url = _this.conf.icon_ER_D_url;
                        break;
                    case "T":
                        url = _this.conf.icon_ER_T_url;
                        break
                }
                if (url != "") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + url);
                    _this.itemErArray[contRating].setUrl(url);
                    contRating--
                }
            }
            if (_movie.ratingType != undefined && _movie.ratingType != null)if (_movie.ratingType == "MPAA") {
                if (_movie.ratingCode != "NR") {
                    if (_movie.ratingCode == "6") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " +
                            contRating + " - url : " + _this.conf.icon_Age_6_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_6_url)
                    } else if (_movie.ratingCode == "9") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_9_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_9_url)
                    } else if (_movie.ratingCode == "12") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_12_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_12_url)
                    } else if (_movie.ratingCode ==
                        "16") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_16_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_16_url)
                    } else if (_movie.ratingCode == "18") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_20_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_20_url)
                    } else if (_movie.ratingCode == "AL") {
                        fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating +
                            " - url : " + _this.conf.icon_Age_all_url);
                        _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_all_url)
                    }
                    contRating--
                }
            } else if (_movie.ratingType == "VCHIP") {
                if (_movie.ratingCode == "6") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_6_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_6_url)
                } else if (_movie.ratingCode == "9") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_9_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_9_url)
                } else if (_movie.ratingCode == "12") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_12_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_12_url)
                } else if (_movie.ratingCode == "16") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_16_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_16_url)
                } else if (_movie.ratingCode ==
                    "20") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_20_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_20_url)
                } else if (_movie.ratingCode == "AL") {
                    fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_Age_all_url);
                    _this.itemErArray[contRating].setUrl(_this.conf.icon_Age_all_url)
                }
                contRating--
            }
            if (_movie.hdContent != undefined && (_movie.hdContent != null && _movie.hdContent))if (_movie.movieCategories[0].categoryId !=
                undefined && _movie.movieCategories[0].categoryId == fw.conf.fullHdCategoryId) {
                _this.itemErArray[contRating].setUrl(_this.conf.icon_fullhd_url);
                contRating--
            } else {
                fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating + " - url : " + _this.conf.icon_hd_url);
                _this.itemErArray[contRating].setUrl(_this.conf.icon_hd_url);
                contRating--
            }
            if (_movie.isSurroundSound != undefined && _movie.isSurroundSound != null)if (_movie.isSurroundSound) {
                fw.log.debug("setVodExtendedRatingIcons - setting to icon : " + contRating +
                    " - url : " + _this.conf.icon_dolby_url);
                _this.itemErArray[contRating].setUrl(_this.conf.icon_dolby_url);
                contRating--
            }
        } catch (ex) {
            ex.errMethod = "setVodExtendedRatingIcons";
            ex.errClass = "ModuleZapbannerExtended";
            fw.err(ex)
        }
    }
});
