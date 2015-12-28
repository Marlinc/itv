var ModuleItemDetails = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf) {
        $super(_parent, _prop);
        try {
            this.prop = _prop;
            this.conf = _modConf;
            this.parent = _parent;
            this.verticalScrollApps = true;
            this.ItemDetBackgroundRect = cssUtil.addElementToDom(RectFocusable, "ItemDetsBackgroundRect", this.conf.ItemDetInfoRect, this.getModObj());
            this.ItemDetTitleTxt = cssUtil.addElementToDom(Text, "ItemDetTitleTxt", this.conf.ItemDetTitleTxt, this.getModObj());
            this.ItemDetDescTxt = cssUtil.addElementToDom(TextArea,
                "ItemDetDescTxt", this.conf.ItemDetDescTxt, this.getModObj());
            this.ItemDetRightImg = cssUtil.addElementToDom(Image, "ItemDetRightImg", this.conf.ItemDetRightImg, this.getModObj());
            this.ItemDetLeftImg = cssUtil.addElementToDom(Image, "ItemDetLeftImg", this.conf.ItemDetLeftImg, this.getModObj());
            this.ItemDetCoverImg = cssUtil.addElementToDom(Image, "ItemDetCoverImg", this.conf.ItemDetCoverImg, this.getModObj());
            this.ItemDetUpImg = cssUtil.addElementToDom(Image, "ItemDetUpImg", this.conf.ItemDetUpImg, this.getModObj());
            this.ItemDetDownImg =
                cssUtil.addElementToDom(Image, "ItemDetDownImg", this.conf.ItemDetDownImg, this.getModObj());
            this.itemDetInfoContentMeerTv = cssUtil.addElementToDom(Text, "ItemDetTitleTxt", this.conf.itemDetInfoContentMeerTv, this.getModObj());
            this.numPagInDesc = 0;
            this.smartViewGrid = null;
            this.ItemDetUpImg.hide();
            this.ItemDetDownImg.hide();
            this.hideArrowRight();
            this.hideArrowLeft();
            this.isNavigable = false;
            this.isFocusOn = false;
            this.isSmartviewShown = false
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    },
    setMeerTvInfoLoading: function () {
        try {
            this.itemDetInfoContentMeerTv.setTxt(eval("this.parent.appObj.messages." + this.conf.itemDetInfoContentMeerTv.loadingMessage))
        } catch (ex) {
            ex.errMethod = "setMeerTvLoading";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, setMeerTvInfoEmpty: function () {
        try {
            this.itemDetInfoContentMeerTv.setTxt(eval("this.parent.appObj.messages." + this.conf.itemDetInfoContentMeerTv.emptyMessage))
        } catch (ex) {
            ex.errMethod = "setMeerTvInfoEmpty";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, cleanMeerTvInfo: function () {
        try {
            this.itemDetInfoContentMeerTv.setTxt("")
        } catch (ex) {
            ex.errMethod =
                "cleanMeerTvInfo";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, prepareSmartTv: function () {
        try {
            if (!this.isSmartviewShown) {
                this.isSmartviewShown = true;
                this.ItemDetBackgroundRect.hide();
                this.ItemDetTitleTxt.hide();
                this.ItemDetDescTxt.getObj().hide();
                this.ItemDetBackgroundRect.focusOff();
                this.isFocusOn = false;
                this.ItemDetDescTxt.resetPositionPage();
                this.ItemDetCoverImg.hide();
                this.hideAllArrow();
                if (this.smartViewGrid != null) {
                    this.getModObj().removeChild(this.smartViewGrid.getObj());
                    this.smartViewGrid = null
                }
                this.showMeerTv()
            }
        } catch (ex) {
            ex.errMethod =
                "prepareSmartTv";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, setSmartView: function (_list) {
        try {
            if (_list.length > 0) {
                this.cleanMeerTvInfo();
                if (this.verticalScrollApps) {
                    this.smartViewGrid = new GridPageFrame("moduleItemDetailSmartViewGrid", this.conf.grid, ImageCursorOtt, _list, this, this.smartViewGridCallBack, true);
                    if (_list.length > this.conf.grid.numRowsToScroll * this.conf.grid.numColumnInRow) {
                        this.setArrowDownUpOtt();
                        this.showArrowDown();
                        this.showArrowUp()
                    } else {
                        this.hideArrowDown();
                        this.hideArrowUp()
                    }
                } else {
                    this.smartViewGrid =
                        new HorizontalImageGrid("moduleItemDetailSmartViewGrid", this.conf.horizontalGrid, _list, this, this.smartViewGridCallBack);
                    if (this.smartViewGrid.isNumItemsMoreThanShown()) {
                        this.setStyleArrowRight(this.conf.horizontalGrid.arrowRightImg);
                        this.showArrowRight()
                    } else this.hideArrowRight()
                }
                this.getModObj().appendChild(this.smartViewGrid.getObj());
                this.smartViewGrid.focusOn()
            } else this.setMeerTvInfoEmpty()
        } catch (ex) {
            ex.errMethod = "setSmartView";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, setArrowDownUpOtt: function () {
        try {
            this.ItemDetUpImg.setStyle(this.conf.grid.arrowUpImg);
            this.ItemDetDownImg.setStyle(this.conf.grid.arrowDownImg)
        } catch (ex) {
            ex.errMethod = "setArrowDownUpOtt";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, setArrowDownUpDetail: function () {
        try {
            this.ItemDetUpImg.setStyle(this.conf.ItemDetUpImg);
            this.ItemDetDownImg.setStyle(this.conf.ItemDetDownImg)
        } catch (ex) {
            ex.errMethod = "setArrowDownUpOtt";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, isCusrsorSmartViewInFirstPosition: function () {
        if (this.isSmartviewShown)return this.smartViewGrid.isCursorInFirstPosition()
    }, rightSmartview: function () {
        if (this.isSmartviewShown)this.smartViewGrid.moveCursorToRight()
    },
    leftSmartview: function () {
        if (this.isSmartviewShown)this.smartViewGrid.moveCursorToLeft()
    }, downSmartview: function () {
        if (this.isSmartviewShown && this.verticalScrollApps)this.smartViewGrid.moveCursorToDown()
    }, upSmartview: function () {
        if (this.isSmartviewShown && this.verticalScrollApps)this.smartViewGrid.moveCursorToUp()
    }, onSmartview: function () {
        if (this.isSmartviewShown)this.smartViewGrid.focusOn()
    }, offSmartview: function () {
        if (this.isSmartviewShown)this.smartViewGrid.focusOff()
    }, smartViewGridCallBack: function (_IndexPage,
                                        _totalPosition, _domElement, _dataElement, _inPagePosition) {
        try {
            this.parent.callBackItemDetSmartView(_IndexPage, _totalPosition, _domElement, _dataElement, _inPagePosition)
        } catch (ex) {
            ex.errMethod = "smartViewGridCallBack";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, removeSmartview: function () {
        try {
            if (this.isSmartviewShown) {
                this.isSmartviewShown = false;
                if (this.smartViewGrid != null) {
                    this.getModObj().removeChild(this.smartViewGrid.getObj());
                    this.smartViewGrid = null
                }
                this.ItemDetUpImg.hide();
                this.ItemDetBackgroundRect.show();
                this.ItemDetTitleTxt.show();
                this.ItemDetDescTxt.getObj().show();
                this.ItemDetCoverImg.show();
                this.setArrowDownUpDetail();
                if (this.isNavigable) {
                    this.setStyleArrowRight(this.conf.ItemDetRightImg);
                    this.showArrowRight();
                    this.showArrowLeft()
                }
            }
        } catch (ex) {
            ex.errMethod = "removeSmartview";
            ex.errClass = "ModuleItemDetails";
            fw.err(ex)
        }
    }, isSmartViewShown: function () {
        return this.isSmartviewShown
    }, showNavigationArrow: function () {
        if (!this.isSmartViewShown()) {
            this.setStyleArrowRight(this.conf.ItemDetRightImg);
            this.showArrowRight();
            this.showArrowLeft()
        }
        this.isNavigable = true
    }, hideAllArrow: function () {
        this.hideArrowRight();
        this.hideArrowLeft();
        this.ItemDetUpImg.hide();
        this.ItemDetDownImg.hide()
    }, focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.removeSmartview();
        this.ItemDetBackgroundRect.focusOn();
        this.isFocusOn = true;
        this.hideArrowRight();
        this.hideArrowLeft()
    }, focusOff: function (_multiPage) {
        this.ItemDetBackgroundRect.focusOff();
        this.isFocusOn = false;
        this.ItemDetDescTxt.resetPositionPage();
        this.ItemDetUpImg.hide();
        this.ItemDetDownImg.show();
        if (this.isNavigable && (_multiPage == undefined || _multiPage)) {
            this.setStyleArrowRight(this.conf.ItemDetRightImg);
            this.showArrowRight();
            this.showArrowLeft()
        }
    }, showArrowUp: function () {
        this.ItemDetUpImg.show()
    }, hideArrowUp: function () {
        this.ItemDetUpImg.hide()
    }, showArrowDown: function () {
        this.ItemDetDownImg.show()
    }, hideArrowDown: function () {
        this.ItemDetDownImg.hide()
    }, moveToDown: function () {
        if (this.isFocusOn) {
            this.ItemDetDescTxt.scrollDown();
            if (this.ItemDetDescTxt.getPositionPage() > 0)this.ItemDetUpImg.show();
            if (this.ItemDetDescTxt.getPositionPage() ==
                this.getNumPageDescr() - 1)this.ItemDetDownImg.hide()
        }
    }, moveToUp: function () {
        if (this.isFocusOn) {
            this.ItemDetDescTxt.scrollUp();
            if (this.ItemDetDescTxt.getPositionPage() == 0)this.ItemDetUpImg.hide();
            if (this.ItemDetDescTxt.getPositionPage() < this.ItemDetDescTxt.getNumPage())this.ItemDetDownImg.show()
        }
    }, setTitle: function (_ItemInfoTitleTxt) {
    }, setDescription: function (_ItemInfoDescTxt) {
        this.txt = _ItemInfoDescTxt;
        this.ItemDetDescTxt.setTxt(_ItemInfoDescTxt);
        this.numPagInDesc = this.ItemDetDescTxt.getNumPage()
    }, getNumPageDescr: function () {
        return this.numPagInDesc
    },
    setCoverImage: function (_url) {
        if (_url == undefined || _url == "")_url = this.conf.ItemDetCoverImg.defaultImgUrl;
        this.ItemDetCoverImg.setUrl(_url)
    }, showArrowRight: function () {
        this.ItemDetRightImg.show()
    }, setStyleArrowRight: function (_conf) {
        try {
            this.ItemDetRightImg.setStyle(_conf)
        } catch (ex) {
            ex.errMethod = "setStyleArrowRight";
            ex.errClass = "ModuleItemDetail";
            fw.err(ex)
        }
    }, showArrowLeft: function () {
        this.ItemDetLeftImg.show()
    }, hideArrowRight: function () {
        this.ItemDetRightImg.hide()
    }, hideArrowLeft: function () {
        this.ItemDetLeftImg.hide()
    },
    showMeerTv: function () {
        try {
            if (this.isSmartViewShown() && this.smartViewGrid != null)this.smartViewGrid.getObj().show()
        } catch (ex) {
            ex.errMethod = "showMeerTv";
            ex.errClass = "ModuleItemDetail";
            fw.err(ex)
        }
    }, hideMeerTv: function () {
        try {
            if (this.isSmartViewShown())this.smartViewGrid.getObj().hide()
        } catch (ex) {
            ex.errMethod = "hideMeerTv";
            ex.errClass = "ModuleItemDetail";
            fw.err(ex)
        }
    }, clearAllContent: function () {
        try {
            this.ItemDetCoverImg.setUrl("");
            this.hideMeerTv();
            this.ItemDetTitleTxt.setTxt("");
            this.ItemDetDescTxt.setTxt("");
            this.ItemDetDescTxt.resetPositionPage();
            this.ItemDetUpImg.hide();
            this.ItemDetDownImg.hide();
            this.focusOff();
            this.isNavigable = false
        } catch (ex) {
            ex.errMethod = "clearAllContent";
            ex.errClass = "ModuleItemDetail";
            fw.err(ex)
        }
    }, clearAll: function () {
        this.ItemDetTitleTxt.setTxt("");
        this.ItemDetDescTxt.resetPositionPage();
        this.hideArrowRight();
        this.hideArrowLeft();
        this.ItemDetUpImg.hide();
        this.ItemDetDownImg.hide();
        this.isNavigable = false
    }
});
