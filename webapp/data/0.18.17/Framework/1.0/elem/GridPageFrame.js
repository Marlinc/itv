var GridPageFrame = Class.create({
    initialize: function (_id, _gridCss, _item, _obj, _parentObj, _parentObjFunction) {
        try {
            this.id = _id;
            this.item = _item;
            this.parentObj = _parentObj;
            this.parentObjFunction = _parentObjFunction;
            this.confGrid = _gridCss;
            this.confItem = this.confGrid.item;
            this.numItemsInRow = this.confGrid.numColumnInRow;
            this.numVisibleRows = parseInt(this.confGrid.numVisibleRows);
            this.numRowsToScroll = parseInt(this.confGrid.numRowsToScroll);
            this.visibleIndexRow = 0;
            this.visibleIndexPage = 0;
            this.lastScrolledPage = 0;
            this.itemSelect = 0;
            this.numItemInPage = this.numItemsInRow * this.numVisibleRows;
            this.scrollBar = null;
            this.showScrollBar = this.confGrid.isScrollBarShow;
            this.ScrollBarConf = this.confGrid.scrollBar;
            this.scrollingMode = false;
            this.timerPrecachePages = null;
            this.timerPrecacheImages = null;
            this.timerScrollingMode = null;
            this.delayTimerAsap = fw.conf.gridPageFrameDelayTimerAsap;
            this.delayTimerPrecachePages = fw.conf.gridPageFrameDelayTimerPrecachePages;
            this.delayTimerPrecacheImages = fw.conf.gridPageFrameDelayTimerPrecacheImages;
            this.delayTimerScrollingMode = fw.conf.gridPageFrameDelayTimerScrollingMode;
            this.pageScrollSize = this.confGrid.item.styleItemCont.h * this.confGrid.numVisibleRows + this.confGrid.distVerImgageGrid * this.confGrid.numVisibleRows;
            this.contGridExt = fw.cssBuilder.createDiv(_id + "_ContGridExt", this.confGrid.style);
            this.contGridInt = fw.cssBuilder.createDiv(_id + "_ContGridInt", null);
            this.contGridInt.setX(0);
            this.contGridInt.setY(0);
            this.contGridInt.setH(this.confGrid.item.styleItemCont.h * this.confGrid.numVisibleRows +
                this.confGrid.distVerImgageGrid * (this.confGrid.numVisibleRows - 1) + 15);
            this.contGridInt.setW(this.confGrid.item.styleItemCont.w * this.confGrid.numColumnInRow + this.confGrid.distHorImgageGrid * this.confGrid.numColumnInRow);
            this.contGridExt.appendChild(this.contGridInt);
            this.contGridFrame = fw.cssBuilder.createDiv(this.id + "_ContGridFrame", null);
            this.contGridFrame.setX(0);
            this.contGridFrame.setY(0);
            this.contGridFrame.setW(this.confItem.styleItemCont.w * this.confGrid.numColumnInRow + this.confGrid.distHorImgageGrid *
                this.confGrid.numColumnInRow);
            this.contGridInt.appendChild(this.contGridFrame);
            this.reinit(_obj)
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, reinit: function (_obj) {
        try {
            this.destroyAllPages();
            this.visibleIndexRow = 0;
            this.visibleIndexPage = 0;
            this.itemSelect = 0;
            this.scrollingMode = false;
            this.obj = _obj;
            this.numItems = this.obj.length;
            this.pagesData = new Array;
            var page = -1;
            for (var i = 0; i < this.obj.length; i++) {
                if (i % this.numItemInPage == 0) {
                    page++;
                    this.pagesData.push(new Array)
                }
                var item =
                {idx: i, dom: null, onScreen: false};
                this.pagesData[page].push(item)
            }
            this.hasMoreThanOnePage = this.pagesData.length > 1;
            this.hasMoreThanTwoPage = this.pagesData.length > 2;
            this.hasMoreThanThreePage = this.pagesData.length > 3;
            this.contGridFrame.setH(this.pageScrollSize * this.pagesData.length);
            this.rebuildAllPages();
            this.scrollToCurrentPageFirst();
            if (this.showScrollBar && this.obj.length > this.numItemInPage)this.drawScrollBar(); else this.destroyScrollBar()
        } catch (ex) {
            ex.errMethod = "reinit";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    },
    getData: function () {
        return this.obj
    }, getItemIdx: function (_p, _i) {
        return this.pagesData[_p][_i].idx
    }, getItemObj: function (_p, _i) {
        return this.obj[this.getItemIdx(_p, _i)]
    }, getItemDOM: function (_p, _i) {
        return this.pagesData[_p][_i].dom
    }, createItem: function (_obj, _p, _i, _c, _r, _drawImage) {
        try {
            var item = new this.item("Cover_" + _p + "_" + _i, this.confItem);
            item.setX(_c * (this.confItem.styleItemCont.w + this.confGrid.distHorImgageGrid));
            item.setY(_r * (this.confItem.styleItemCont.h + this.confGrid.distVerImgageGrid));
            item.setTitle(_obj);
            item.updateLock(_obj);
            if (_drawImage)item.setUrl(_obj);
            return item
        } catch (ex) {
            ex.errMethod = "createItem";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, createPage: function (_p, _drawImages) {
        try {
            var col = 0;
            var row = -1 + _p * this.numVisibleRows;
            for (var i = 0; i < this.pagesData[_p].length; i++) {
                if (i % this.numItemsInRow == 0) {
                    col = 0;
                    row++
                }
                var tmpObj = this.pagesData[_p][i];
                if (tmpObj.onScreen != true) {
                    var item = this.createItem(this.obj[tmpObj.idx], _p, i, col, row, _drawImages);
                    this.contGridFrame.appendChild(item.getObj());
                    tmpObj.dom = item;
                    tmpObj.onScreen = true
                } else break;
                col++
            }
        } catch (ex) {
            ex.errMethod = "createPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, refreshPage: function (_p) {
        try {
            for (var i = 0; i < this.pagesData[_p].length; i++)if (this.pagesData[_p][i] && this.pagesData[_p][i].onScreen == true) {
                if (this.getItemDOM(_p, i).isSet == false && (this.getItemObj(_p, i).blockId == -1 || this.getItemObj(_p, i).blockId == undefined))this.getItemDOM(_p, i).setTitle(this.getItemObj(_p, i));
                this.getItemDOM(_p, i).updateLock(this.getItemObj(_p, i));
                this.getItemDOM(_p, i).setUrl(this.getItemObj(_p,
                    i))
            }
        } catch (ex) {
            ex.errMethod = "refreshPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, refreshAllPages: function () {
        try {
            this.refreshPage(this.visibleIndexPage);
            this.afterPageScroll();
            if (this.hasMoreThanOnePage)this.refreshPage(this.getDownIndexPage());
            if (this.hasMoreThanTwoPage)this.refreshPage(this.getUpIndexPage());
            if (this.parentObjFunction != null && this.parentObj != null)this.parentObjFunction.apply(this.parentObj, new Array(this.visibleIndexPage, this.getItemIdx(this.visibleIndexPage, this.itemSelect), this.getDomElementItemSelect(),
                this.getDataElementItemSelect(), this.itemSelect))
        } catch (ex) {
            ex.errClass = "GridPageFrame";
            ex.errMethod = "refreshAllPages";
            fw.err(ex)
        }
    }, schedulePrecachePages: function () {
        try {
            var _this = this;
            if (this.timerPrecachePages != null) {
                clearTimeout(this.timerPrecachePages);
                this.timerPrecachePages = null
            }
            this.timerPrecachePages = setTimeout(function () {
                _this.precachePages()
            }, this.delayTimerPrecachePages)
        } catch (ex) {
            ex.errMethod = "schedulePrecachePages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, precachePages: function () {
        try {
            if (this.hasMoreThanOnePage)this.createPage(this.getDownIndexPage());
            if (this.hasMoreThanTwoPage)this.createPage(this.getUpIndexPage())
        } catch (ex) {
            ex.errMethod = "precachePages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, checkPrecachePages: function () {
        try {
            if (this.timerPrecachePages != null) {
                clearTimeout(this.timerPrecachePages);
                this.timerPrecachePages = null;
                this.precachePages()
            }
        } catch (ex) {
            ex.errMethod = "checkPrecachePages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, schedulePrecacheImages: function () {
        try {
            var _this = this;
            if (this.timerPrecacheImages != null) {
                clearTimeout(this.timerPrecacheImages);
                this.timerPrecacheImages = null
            }
            this.timerPrecacheImages = setTimeout(function () {
                if (_this.hasMoreThanOnePage)_this.loadPageImages(_this.getDownIndexPage(), false);
                if (_this.hasMoreThanTwoPage)_this.loadPageImages(_this.getUpIndexPage(), false)
            }, this.delayTimerPrecacheImages)
        } catch (ex) {
            ex.errMethod = "schedulePrecacheImages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, afterPageScroll: function () {
        try {
            if (!this.scrollingMode)this.execAfterPageScroll();
            this.resetTimerScrollingMode(this.delayTimerScrollingMode)
        } catch (ex) {
            ex.errMethod =
                "afterPageScroll";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, execAfterPageScroll: function () {
        try {
            this.loadPageImages(this.visibleIndexPage, true);
            this.schedulePrecacheImages()
        } catch (ex) {
            ex.errMethod = "execAfterPageScroll";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, destroyPage: function (_p) {
        try {
            if (this.pagesData != null && (this.pagesData != undefined && (this.pagesData[_p] != null && this.pagesData[_p] != undefined)))for (var i = 0; i < this.pagesData[_p].length; i++) {
                var tmpObj = this.pagesData[_p][i];
                if (tmpObj.dom != null) {
                    fw.log.debug("REMOVING ITEM - page:" +
                        _p + " idx:" + i);
                    this.contGridFrame.removeChild(tmpObj.dom.getObj());
                    tmpObj.dom = null;
                    tmpObj.onScreen = false
                }
            }
        } catch (ex) {
            ex.errMethod = "destroyPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, resetTimerScrollingMode: function (_delay) {
        try {
            this.scrollingMode = true;
            var _this = this;
            if (this.timerScrollingMode != null) {
                clearTimeout(this.timerScrollingMode);
                this.timerScrollingMode = null
            }
            this.timerScrollingMode = setTimeout(function () {
                _this.scrollingMode = false;
                _this.execAfterPageScroll()
            }, _delay)
        } catch (ex) {
            ex.errMethod =
                "resetTimerScrollingMode";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, scrollToCurrentPage: function () {
        try {
            if (this.visibleIndexPage != this.lastScrolledPage) {
                this.lastScrolledPage = this.visibleIndexPage;
                this.afterPageScroll();
                this.contGridFrame.setY(-1 * this.visibleIndexPage * this.pageScrollSize)
            }
        } catch (ex) {
            ex.errMethod = "scrollToCurrentPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, scrollToCurrentPageFirst: function () {
        try {
            if (this.visibleIndexPage != this.lastScrolledPage) {
                this.lastScrolledPage = this.visibleIndexPage;
                this.contGridFrame.setY(-1 * this.visibleIndexPage * this.pageScrollSize)
            }
            this.schedulePrecacheImages()
        } catch (ex) {
            ex.errMethod = "scrollToCurrentPageFirst";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, loadPageImages: function (_p, _isUrgent) {
        try {
            if (_isUrgent)for (var i = 0; i < this.pagesData[_p].length; i++)this.loadItemImage(_p, i); else {
                var _this = this;
                setTimeout(function () {
                    _this.loadItemImage(_p, 0)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 1)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p,
                        2)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 3)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 4)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 5)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 6)
                }, this.delayTimerAsap);
                setTimeout(function () {
                    _this.loadItemImage(_p, 7)
                }, this.delayTimerAsap)
            }
        } catch (ex) {
            ex.errMethod = "loadPageImages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, loadItemImage: function (_p, _i) {
        try {
            if (this.pagesData[_p][_i] &&
                (this.pagesData[_p][_i].onScreen == true && (this.getItemObj(_p, _i).blockId == -1 && this.getItemDOM(_p, _i).posterLoaded != true)))this.getItemDOM(_p, _i).setUrl(this.getItemObj(_p, _i))
        } catch (ex) {
            ex.errMethod = "loadItemImage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, getNumPage: function () {
        return this.pagesData.length
    }, moveCursorToDown: function () {
        try {
            var conditionChangePage = this.pagesData.length > 1 && (this.pagesData[this.visibleIndexPage].length <= this.numItemsInRow || this.pagesData[this.visibleIndexPage].length > this.numItemsInRow &&
                this.itemSelect >= this.numItemsInRow);
            if (conditionChangePage)this.changePageDown(); else if (this.itemSelect + this.numItemsInRow <= this.pagesData[this.visibleIndexPage].length - 1) {
                this.focusOff();
                this.itemSelect = this.itemSelect + this.numItemsInRow;
                this.focusOn()
            } else if (this.pagesData.length == 1) {
                this.focusOff();
                if (this.pagesData[this.visibleIndexPage].length > this.numItemsInRow && (this.itemSelect < this.numItemsInRow && this.itemSelect + this.numItemsInRow > this.pagesData[this.visibleIndexPage].length - 1))this.itemSelect =
                    this.pagesData[this.visibleIndexPage].length - 1; else this.itemSelect = this.itemSelect % this.numItemsInRow;
                this.focusOn()
            } else {
                this.focusOff();
                this.itemSelect = this.pagesData[this.visibleIndexPage].length - 1;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToDown";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, updateGrid: function (_this) {
        try {
            _this.refreshAllPages()
        } catch (ex) {
            ex.errMethod = "updateGrid";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, getOtherItemsCallBack: function (_resultCode, _data) {
        try {
            if (_resultCode)this.updateGrid(this)
        } catch (ex) {
            ex.errMethod =
                "getOtherItemsCallBack";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, moveCursorToUp: function () {
        try {
            if (this.itemSelect - this.numItemsInRow < 0 && this.pagesData.length > 1)this.changePageUp(); else if (this.itemSelect - this.numItemsInRow >= 0) {
                this.focusOff();
                this.itemSelect = this.itemSelect - this.numItemsInRow;
                this.focusOn()
            } else if (this.pagesData.length == 1 && (this.itemSelect < this.numItemsInRow && this.itemSelect + this.numItemsInRow > this.pagesData[this.visibleIndexPage].length - 1)) {
                this.focusOff();
                this.itemSelect = this.pagesData[this.visibleIndexPage].length -
                    1;
                this.focusOn()
            } else {
                var tmpItemPos = this.itemSelect % this.numItemsInRow + this.numItemsInRow * (this.numVisibleRows - 1);
                if (tmpItemPos <= this.pagesData[this.visibleIndexPage].length - 1) {
                    this.focusOff();
                    this.itemSelect = tmpItemPos;
                    this.focusOn()
                }
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToUp";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, getUpItemInColumn: function () {
        try {
            var upPage = this.getUpIndexPage();
            if (this.pagesData[upPage].length > this.numItemsInRow) {
                var upItemInColumn = this.itemSelect + this.numItemsInRow;
                if (this.pagesData[upPage][upItemInColumn] !=
                    null && this.pagesData[upPage][upItemInColumn] != undefined)return upItemInColumn; else return this.pagesData[upPage].length - 1
            } else if (this.pagesData[upPage][this.itemSelect] != null && this.pagesData[upPage][this.itemSelect] != undefined)return this.itemSelect; else return this.pagesData[upPage].length - 1
        } catch (ex) {
            ex.errMethod = "getUpItemInColumn";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, changePageUp: function () {
        try {
            if (this.pagesData.length > 1) {
                this.checkPrecachePages();
                var oldPage = this.visibleIndexPage;
                if (this.getUpItemInColumn() != -1) {
                    this.focusOff();
                    this.itemSelect = this.getUpItemInColumn();
                    this.setUpVisibleIndexPage()
                } else if (this.hasMoreThanTwoPage) {
                    this.focusOff();
                    this.setUpVisibleIndexPage();
                    this.itemSelect = this.getUpItemInColumn();
                    this.setUpVisibleIndexPage();
                    this.rebuildAllPages(oldPage)
                } else {
                    this.focusOff();
                    this.itemSelect = this.itemSelect % this.numItemsInRow + this.numItemsInRow * (this.numVisibleRows - 1);
                    this.focusOn()
                }
                if (oldPage != this.visibleIndexPage) {
                    this.scrollToCurrentPage();
                    this.focusOn();
                    if (this.showScrollBar)this.setScrollBar();
                    if (this.hasMoreThanThreePage) {
                        this.createPage(this.getUpIndexPage());
                        this.destroyPage(this.getDownIndexPage(oldPage))
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "changePageUp";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, getDownItemInColumn: function () {
        try {
            var downPage = this.getDownIndexPage();
            var downItemInColumn = this.itemSelect % this.numItemsInRow;
            if (this.pagesData[downPage][downItemInColumn] != null && this.pagesData[downPage][downItemInColumn] != undefined)return downItemInColumn; else return this.pagesData[downPage].length -
                1
        } catch (ex) {
            ex.errMethod = "getDownItemInColumn";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, changePageDown: function () {
        try {
            if (this.pagesData.length > 1) {
                this.checkPrecachePages();
                var oldPage = this.visibleIndexPage;
                if (this.getDownItemInColumn() != -1) {
                    this.focusOff();
                    this.itemSelect = this.getDownItemInColumn();
                    this.setDownVisibleIndexPage()
                } else if (this.hasMoreThanTwoPage) {
                    this.focusOff();
                    this.setDownVisibleIndexPage();
                    this.itemSelect = this.getDownItemInColumn();
                    this.setDownVisibleIndexPage();
                    this.rebuildAllPages(oldPage)
                } else {
                    this.focusOff();
                    this.itemSelect = this.itemSelect % this.numItemsInRow;
                    this.focusOn()
                }
                if (oldPage != this.visibleIndexPage) {
                    this.scrollToCurrentPage();
                    this.focusOn();
                    if (this.showScrollBar)this.setScrollBar();
                    if (this.hasMoreThanThreePage) {
                        this.createPage(this.getDownIndexPage());
                        this.destroyPage(this.getUpIndexPage(oldPage))
                    }
                }
            }
        } catch (ex) {
            ex.errMethod = "changePageDown";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, moveCursorToRight: function () {
        try {
            if (this.itemSelect < this.numItemsInRow && (this.itemSelect + 1 < this.numItemsInRow && this.itemSelect +
                1 < this.pagesData[this.visibleIndexPage].length) || this.itemSelect >= this.numItemsInRow && this.itemSelect + 1 < this.pagesData[this.visibleIndexPage].length) {
                this.focusOff();
                this.itemSelect = this.itemSelect + 1;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToRight";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, moveCursorToLeft: function () {
        try {
            if (this.itemSelect - 1 >= 0) {
                this.focusOff();
                this.itemSelect = this.itemSelect - 1;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToLeft";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    },
    isCursorInFirstPosition: function () {
        return this.itemSelect == 0 || this.itemSelect % this.numItemsInRow == 0
    }, getDomElementItemSelect: function () {
        return this.getItemDOM(this.visibleIndexPage, this.itemSelect)
    }, getDataElementItemSelect: function () {
        return this.getItemObj(this.visibleIndexPage, this.itemSelect)
    }, getDomElementItemVisibleByPosition: function (_pos) {
        try {
            return this.getItemDOM(this.visibleIndexPage, _pos)
        } catch (ex) {
            ex.errMethod = "getDomElementItemVisibleByPosition";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    },
    getDataElementItemVisibleByPosition: function (_pos) {
        try {
            return this.getItemObj(this.visibleIndexPage, _pos)
        } catch (ex) {
            ex.errMethod = "getDataElementItemVisibleByPosition";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, getVisibleContentItemsLength: function () {
        return this.pagesData[this.visibleIndexPage].length
    }, getItemSelectPosition: function () {
        return this.getItemIdx(this.visibleIndexPage, this.itemSelect)
    }, getSelectedItem: function () {
        return this.getDataElementItemSelect()
    }, focusOn: function () {
        try {
            if (this.pagesData[this.visibleIndexPage] !=
                undefined && (this.getItemDOM(this.visibleIndexPage, this.itemSelect) != undefined && this.getItemDOM(this.visibleIndexPage, this.itemSelect) != null)) {
                this.getItemDOM(this.visibleIndexPage, this.itemSelect).focusOn();
                if (this.parentObjFunction != null && this.parentObj != null)this.parentObjFunction.apply(this.parentObj, new Array(this.visibleIndexPage, this.getItemIdx(this.visibleIndexPage, this.itemSelect), this.getDomElementItemSelect(), this.getDataElementItemSelect(), this.itemSelect));
                fw.mwManager.updateItems(this.getItemIdx(this.visibleIndexPage,
                    this.itemSelect), this.obj, this, this.getOtherItemsCallBack)
            }
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (this.pagesData[this.visibleIndexPage] != undefined && (this.getItemDOM(this.visibleIndexPage, this.itemSelect) != undefined && this.getItemDOM(this.visibleIndexPage, this.itemSelect) != null))this.getItemDOM(this.visibleIndexPage, this.itemSelect).focusOff()
        } catch (ex) {
            ex.errMethod = "focusOff";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, setUpVisibleIndexPage: function () {
        this.visibleIndexPage =
            this.getUpIndexPage()
    }, setDownVisibleIndexPage: function () {
        this.visibleIndexPage = this.getDownIndexPage()
    }, getVisibleIndexRow: function () {
        return this.visibleIndexRow
    }, getUpIndexPage: function (_startPage) {
        if (_startPage == null || _startPage == undefined)_startPage = this.visibleIndexPage;
        if (_startPage - 1 >= 0)return _startPage - 1; else return this.pagesData.length - 1
    }, getDownIndexPage: function (_startPage) {
        if (_startPage == null || _startPage == undefined)_startPage = this.visibleIndexPage;
        if (_startPage + 1 < this.pagesData.length)return _startPage +
            1; else return 0
    }, getObj: function () {
        return this.contGridExt
    }, drawScrollBar: function () {
        try {
            if (this.scrollBar == null) {
                this.scrollBarArrowDown = new Image(this.id + "_arrowDown", this.ScrollBarConf.arrowDown);
                this.scrollBarArrowUp = new Image(this.id + "_arrowUp", this.ScrollBarConf.arrowUp);
                this.contGridExt.appendChild(this.scrollBarArrowDown.getObj());
                this.contGridExt.appendChild(this.scrollBarArrowUp.getObj());
                this.scrollBar = new Rect("scrollBar", this.ScrollBarConf);
                this.contGridExt.appendChild(this.scrollBar.getObj())
            }
            var _numScroll =
                this.pagesData.length;
            var _spaceScrollContent = parseInt(this.ScrollBarConf.scrollBarSpace);
            this.pixelScroll = _spaceScrollContent / _numScroll;
            this.scrollBar.setHeight(this.pixelScroll);
            this.setScrollBar()
        } catch (ex) {
            ex.errMethod = "drawScrollBar";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, destroyScrollBar: function () {
        try {
            if (this.scrollBar != null && this.scrollBar != undefined) {
                this.contGridExt.removeChild(this.scrollBar.getObj());
                this.contGridExt.removeChild(this.scrollBarArrowDown.getObj());
                this.contGridExt.removeChild(this.scrollBarArrowUp.getObj());
                this.scrollBar = null;
                this.scrollBarArrowDown = null;
                this.scrollBarArrowUp = null
            }
        } catch (ex) {
            ex.errMethod = "destroyScrollBar";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, setScrollBar: function () {
        try {
            if (this.scrollBar != null && this.scrollBar != undefined) {
                var pos = this.visibleIndexPage * this.pixelScroll + parseInt(this.ScrollBarConf.startY);
                this.scrollBar.setY(pos)
            }
        } catch (ex) {
            ex.errMethod = "setScrollBar";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, selectElementByPosition: function (_pos) {
        try {
            var numPage = 0;
            var indexInPage =
                0;
            for (var p = 0; p < this.pagesData.length; p++)for (var i = 0; i < this.pagesData[p].length; i++)if (this.getItemIdx(p, i) == _pos) {
                numPage = p;
                indexInPage = i;
                break
            }
            this.setGridAtPosition(indexInPage, numPage)
        } catch (ex) {
            ex.errMethod = "selectElementByPosition";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, setGridAtPosition: function (_posInPage, _indexVisiblePage) {
        try {
            this.checkPrecachePages();
            var oldPage = this.visibleIndexPage;
            this.focusOff();
            this.itemSelect = _posInPage;
            this.visibleIndexPage = _indexVisiblePage;
            this.scrollToCurrentPage();
            if (this.showScrollBar && this.pagesData.length > 1)this.setScrollBar();
            if (oldPage != _indexVisiblePage)this.rebuildAllPages(oldPage); else this.refreshAllPages();
            this.focusOn()
        } catch (ex) {
            ex.errMethod = "setGridAtPosition";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, goNextPage: function () {
        try {
            if (this.pagesData.length > 1) {
                this.checkPrecachePages();
                var oldPage = this.visibleIndexPage;
                this.focusOff();
                this.setDownVisibleIndexPage();
                this.scrollToCurrentPage();
                if (this.itemSelect > this.getVisibleContentItemsLength() - 1)this.itemSelect =
                    this.getVisibleContentItemsLength() - 1;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar();
                if (this.hasMoreThanThreePage) {
                    this.createPage(this.getDownIndexPage());
                    this.destroyPage(this.getUpIndexPage(oldPage))
                }
            }
        } catch (ex) {
            ex.errMethod = "goNextPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, rebuildAllPages: function (_oldPage) {
        try {
            if (_oldPage != null && _oldPage != undefined)this.destroyAllPages(_oldPage);
            this.createPage(this.visibleIndexPage, true);
            if (this.hasMoreThanOnePage)this.createPage(this.getDownIndexPage(),
                true);
            if (this.hasMoreThanTwoPage)this.createPage(this.getUpIndexPage(), true)
        } catch (ex) {
            ex.errMethod = "rebuildAllPages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, destroyAllPages: function (_oldPage) {
        try {
            if (_oldPage == null || _oldPage == undefined)_oldPage = this.visibleIndexPage;
            this.destroyPage(_oldPage);
            if (this.hasMoreThanTwoPage)this.destroyPage(this.getUpIndexPage(_oldPage));
            if (this.hasMoreThanOnePage)this.destroyPage(this.getDownIndexPage(_oldPage))
        } catch (ex) {
            ex.errMethod = "destroyAllPages";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, goPreviusPage: function () {
        try {
            if (this.pagesData.length > 1) {
                this.checkPrecachePages();
                var oldPage = this.visibleIndexPage;
                this.focusOff();
                this.setUpVisibleIndexPage();
                this.scrollToCurrentPage();
                if (this.itemSelect > this.getVisibleContentItemsLength() - 1)this.itemSelect = this.getVisibleContentItemsLength() - 1;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar();
                if (this.hasMoreThanThreePage) {
                    this.createPage(this.getUpIndexPage());
                    this.destroyPage(this.getDownIndexPage(oldPage))
                }
            }
        } catch (ex) {
            ex.errMethod =
                "goPreviusPage";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }, clean: function () {
        try {
            if (this.timerPrecachePages != null) {
                clearTimeout(this.timerPrecachePages);
                this.timerPrecachePages = null
            }
            if (this.timerPrecacheImages != null) {
                clearTimeout(this.timerPrecacheImages);
                this.timerPrecacheImages = null
            }
            if (this.timerScrollingMode != null) {
                clearTimeout(this.timerScrollingMode);
                this.timerScrollingMode = null
            }
            this.scrollingMode = false
        } catch (ex) {
            ex.errMethod = "clean";
            ex.errClass = "GridPageFrame";
            fw.err(ex)
        }
    }
});
