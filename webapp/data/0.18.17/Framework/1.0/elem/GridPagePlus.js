var GridPagePlus = Class.create({
    initialize: function (_id, _gridCss, _item, _obj, _parentObj, _parentObjFunction) {
        try {
            this.id = _id;
            this.item = _item;
            this.obj = _obj;
            this.parentObj = _parentObj;
            this.parentObjFunction = _parentObjFunction;
            this.confGrid = _gridCss;
            this.confItem = this.confGrid.item;
            this.numItemsInRow = this.confGrid.numColumnInRow;
            this.numVisibleRows = parseInt(this.confGrid.numVisibleRows);
            this.numRowsToScroll = parseInt(this.confGrid.numRowsToScroll);
            if (this.confGrid.fastMode != undefined) {
                this.fastMode = this.confGrid.fastMode.active;
                this.timeLimit = this.confGrid.fastMode.fastModeDelayPressButton;
                this.numSwitchMode = this.confGrid.fastMode.fastModeNumScroll;
                this.resetKeyTimer = this.confGrid.fastMode.fastModeResetKeyTimer
            } else this.fastMode = false;
            this.updateForNewMovie = false;
            this.timerUpdateForNewMovie = null;
            this.startTimeOut = null;
            this.pixelToScroll = null;
            this.fromY = 0;
            this.toY = 0;
            this.numItems = this.obj.length;
            this.visibleIndexRow = 0;
            this.visibleIndexPage = 0;
            this.itemSelect = 0;
            this.numItemInPage = this.numItemsInRow * this.numVisibleRows;
            this.veloxConter =
                0;
            this.lastTimeKeyDownPress = 0;
            this.isVeloxMode = false;
            this.toClear = true;
            this.pagesData = new Array;
            var relPage = 0;
            var posArray = -1;
            for (var p = 0; p < this.numItems; p++) {
                if (p % this.numItemInPage == 0) {
                    relPage = 0;
                    posArray++;
                    this.pagesData.push(new Array)
                }
                this.pagesData[posArray][relPage] = [p, this.obj[p]];
                relPage++
            }
            if (this.pagesData.length < 5)this.fastMode = false;
            this.contGridScroll = fw.cssBuilder.createDiv(_id + "_ContGridScroll", this.confGrid.style);
            if (this.pagesData.length > 1) {
                this.createAllPage();
                this.showScrollBar =
                    this.confGrid.isScrollBarShow;
                if (this.showScrollBar) {
                    this.ScrollBarConf = this.confGrid.scrollBar;
                    this.scrollY = this.ScrollBarConf.startY;
                    _arrowDown = new Image(_id + "_arrowDown", this.ScrollBarConf.arrowDown);
                    _arrowUp = new Image(_id + "_arrowUp", this.ScrollBarConf.arrowUp);
                    this.contGridScroll.appendChild(_arrowDown.getObj());
                    this.contGridScroll.appendChild(_arrowUp.getObj());
                    this.drawScrollBar()
                }
            } else if (this.pagesData.length == 1) {
                this.contVisible = this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage);
                this.addToScreen(null, this.contVisible)
            }
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getData: function () {
        return this.obj
    }, createAllPage: function (_remove) {
        try {
            var appVisible = this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage);
            if (_remove != undefined && _remove)this.contGridScroll.removeChild(this.contVisible);
            this.contVisible = appVisible;
            this.addToScreen(null, this.contVisible);
            this.contPrev = this.drawPage(this.getVisibleIndexRow(), this.getUpIndexPage());
            this.contNext =
                this.drawPage(this.getVisibleIndexRow(), this.getDownIndexPage())
        } catch (ex) {
            ex.errMethod = "createAllPage";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, addToScreen: function (_toRemove, _toAdd) {
        try {
            if (_toRemove != null)this.contGridScroll.removeChild(_toRemove);
            if (_toAdd != null)this.contGridScroll.appendChild(_toAdd)
        } catch (ex) {
            ex.errMethod = "addToScreen";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getNumPage: function () {
        return this.pagesData.length
    }, createItem: function (_obj, _col, _row, _idItem) {
        try {
            var item = new this.item(this.id +
                "_cover" + _idItem, this.confItem);
            if (_obj != null) {
                item.setItem(_obj[1], 1, 1);
                item.position = _obj[0]
            } else item.position = -1;
            height = this.confItem.styleItemCont.h;
            width = this.confItem.styleItemCont.w;
            if (this.pixelToScroll == null)this.pixelToScroll = this.numVisibleRows * height + this.confGrid.distVerImgageGrid * this.numVisibleRows;
            if (_col != null && _row != null) {
                var x = _col * (width + this.confGrid.distHorImgageGrid);
                var y = _row * (height + this.confGrid.distVerImgageGrid);
                item.setX(x);
                item.setY(y)
            }
            return item
        } catch (ex) {
            ex.errMethod =
                "createItem";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, drawPage: function (_verticalPosition, _indexPage) {
        try {
            var contItems = fw.cssBuilder.createDiv(_indexPage + "_ContItems", this.confGrid.style);
            contItems.setX(0);
            contItems.setY(0);
            var page = this.pagesData[_indexPage];
            var _col = 0;
            var _row = _verticalPosition;
            var _posRel = 0;
            for (var i = 0; i < this.numItemInPage; i++) {
                if (i % this.numItemsInRow == 0 && i != 0) {
                    _col = 0;
                    _row++;
                    _posRel++
                }
                if (i < page.length)var item = this.createItem(page[i], _col, _row, _indexPage + "_" + i, i < page.length); else {
                    var item =
                        this.createItem(page[i], _col, _row, _indexPage + "_" + i, i < page.length);
                    item.hide()
                }
                contItems.appendChild(item.getObj());
                _col++
            }
            contItems.myLength = page.length;
            return contItems
        } catch (ex) {
            ex.errMethod = "drawPage";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, resetTimerKey: function () {
        try {
            if (this.timerKey != undefined)fw.util.clearTimeout(this.timerKey);
            var _this = this;
            this.timerKey = fw.util.setTimeout(function () {
                fw.log.debug("CLEAR TIMER KEY");
                if (_this.isVeloxMode) {
                    fw.log.debug("Update GRID");
                    _this.updateGrid(_this)
                }
                _this.toClear =
                    true;
                _this.veloxConter = 0;
                _this.lastTimeKeyDownPress = 0;
                _this.isVeloxMode = false
            }, this.resetKeyTimer)
        } catch (ex) {
            ex.errMethod = "resetTimerKey";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, checkVeloxMode: function () {
        if (this.pagesData.length > 1 && this.fastMode) {
            if (this.lastTimeKeyDownPress != undefined && this.lastTimeKeyDownPress <= 0) {
                this.lastTimeKeyDownPress = (new Date).getTime();
                this.isVeloxMode = false
            } else {
                var diff = (new Date).getTime() - this.lastTimeKeyDownPress;
                this.lastTimeKeyDownPress = (new Date).getTime();
                if (diff <
                    this.timeLimit) {
                    this.veloxConter++;
                    if (this.veloxConter > this.numSwitchMode) {
                        var _this = this;
                        this.isVeloxMode = true;
                        this.clear(this)
                    }
                }
            }
            this.resetTimerKey()
        }
    }, moveCursorToDown: function () {
        try {
            this.checkVeloxMode();
            if (this.itemSelect + this.numItemsInRow > this.contVisible.myLength - 1)this.changePageDown(); else {
                this.focusOff();
                this.itemSelect = this.itemSelect + this.numItemsInRow;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursortoDown";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, changePageDown: function () {
        try {
            this.focusOff();
            if (this.pagesData.length > 1) {
                this.setDownVisibleIndexPage();
                if (!this.isVeloxMode)if (this.itemSelect % this.numItemsInRow > this.contNext.myLength - 1) {
                    this.visibleIndexPage = 0;
                    this.createAllPage(true)
                } else {
                    this.contGridScroll.removeChild(this.contVisible);
                    this.contPrev = this.contVisible;
                    this.contVisible = this.contNext;
                    this.addToScreen(null, this.contVisible);
                    this.contNext = this.drawPage(this.getVisibleIndexRow(), this.getDownIndexPage())
                }
                this.itemSelect = this.itemSelect % this.numItemsInRow;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar()
            } else {
                this.itemSelect =
                    this.itemSelect % this.numItemsInRow;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "changePageDown";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, clear: function (_this) {
        try {
            if (_this.toClear) {
                fw.log.debug("clear");
                for (var i = 0; i < this.numItemInPage; i++) {
                    _this.contVisible.childNodes[i].obj.setItem(null, 1, 1);
                    _this.contVisible.childNodes[i].obj.show()
                }
                _this.contVisible.myLength = this.numItemInPage;
                _this.toClear = false
            }
        } catch (ex) {
            ex.errMethod = "clear";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, updateContDiv: function (_contDiv,
                                _indexPage, _asyncUpdate) {
        try {
            if (this.pagesData[_indexPage] != undefined) {
                var page = this.pagesData[_indexPage];
                if (_contDiv.myLength > page.length && this.isVeloxMode) {
                    var diff = _contDiv.myLength - page.length;
                    for (var i = _contDiv.myLength - 1; i > page.length - 1; i--) {
                        _contDiv.childNodes[i].obj.hide();
                        _contDiv.childNodes[i].obj.position = -1
                    }
                }
                var i = 0;
                var _this = this;
                var interval = setInterval(function () {
                    var obj = page[i];
                    if (_asyncUpdate != undefined && (_asyncUpdate && (_contDiv.childNodes[i].obj.isSelect != undefined && (_contDiv.childNodes[i].obj.isSelect &&
                        obj[1].blockId == -1))))try {
                        if (_this.parentObjFunction != null && _this.parentObj != null)_this.parentObj.updateUi(obj[0], _contDiv.childNodes[i].obj, obj[1])
                    } catch (ex) {
                    }
                    _contDiv.childNodes[i].obj.setItem(obj[1], 0, 0);
                    _contDiv.childNodes[i].obj.position = obj[0];
                    i++;
                    if (i >= page.length)clearInterval(interval)
                }, 0);
                _contDiv.myLength = page.length;
                if (this.itemSelect > _contDiv.myLength - 1) {
                    this.itemSelect = _contDiv.myLength - 1;
                    this.focusOn()
                }
            }
        } catch (ex) {
            ex.errMethod = "updateContDiv";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    },
    updateGrid: function (_this, _asyncUpdate) {
        try {
            _this.updateContDiv(_this.contVisible, _this.visibleIndexPage, _asyncUpdate);
            _this.contPrev = _this.drawPage(_this.getVisibleIndexRow(), _this.getUpIndexPage());
            _this.contNext = _this.drawPage(_this.getVisibleIndexRow(), _this.getDownIndexPage())
        } catch (ex) {
            ex.errMethod = "updateGrid";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, moveCursorToUp: function () {
        try {
            this.checkVeloxMode();
            if (this.itemSelect - this.numItemsInRow < 0)this.changePageUp(); else if (this.itemSelect - this.numItemsInRow >=
                0) {
                this.focusOff();
                this.itemSelect = this.itemSelect - this.numItemsInRow;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToUp";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getUpItemSelect: function (_contItems) {
        var appItemSelect = this.numItemInPage - 1 - (this.numItemsInRow - 1 - this.itemSelect);
        if (_contItems.myLength < this.numItemsInRow)return appItemSelect - this.numItemsInRow
    }, changePageUp: function () {
        try {
            this.focusOff();
            if (this.pagesData.length > 1) {
                this.setUpVisibleIndexPage();
                if (!this.isVeloxMode)if (this.getUpItemSelect(this.contPrev) >
                    this.contPrev.myLength - 1) {
                    this.visibleIndexPage = this.pagesData.length - 2;
                    this.createAllPage(true)
                } else {
                    this.contGridScroll.removeChild(this.contVisible);
                    this.contNext = this.contVisible;
                    this.contVisible = this.contPrev;
                    this.addToScreen(null, this.contVisible);
                    this.contPrev = this.drawPage(this.getVisibleIndexRow(), this.getUpIndexPage())
                }
                var appItemSelect = this.numItemInPage - 1 - (this.numItemsInRow - 1 - this.itemSelect);
                if (appItemSelect <= this.contVisible.myLength - 1)this.itemSelect = appItemSelect; else if (this.numItemsInRow ==
                    1)this.itemSelect = this.contVisible.myLength - 1;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar()
            } else {
                var appItemSelect = this.numItemInPage - 1 - (this.numItemsInRow - 1 - this.itemSelect);
                if (appItemSelect <= this.contVisible.myLength - 1)this.itemSelect = appItemSelect; else if (this.numItemsInRow == 1)this.itemSelect = this.contVisible.myLength - 1;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "changePageUp";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, moveCursorToRight: function () {
        try {
            if (this.itemSelect < this.numItemsInRow &&
                (this.itemSelect + 1 < this.numItemsInRow && this.itemSelect + 1 < this.contVisible.myLength) || this.itemSelect >= this.numItemsInRow && this.itemSelect + 1 < this.contVisible.myLength) {
                this.focusOff();
                this.itemSelect = this.itemSelect + 1;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToRight";
            ex.errClass = "GridPagePlus";
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
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, isCursorInFirstPosition: function () {
        return this.itemSelect == 0 || this.itemSelect % this.numItemsInRow == 0
    }, getVisibleItemAtPosition: function (_pos) {
        var appObj = new Object;
        appObj.dataElement = this.getDataElementItemVisibleByPosition(_pos);
        appObj.domElement = this.getDomElementItemVisibleByPosition(_pos);
        return appObj
    }, getActualNumPage: function () {
        return this.visibleIndexPage
    }, getDomElementItemSelect: function () {
        try {
            return this.contVisible.childNodes[this.itemSelect].obj
        } catch (ex) {
            ex.errMethod = "getDomElementItemSelect";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getDataElementItemByPos: function (_indexPage, _indexInPage) {
        try {
            return this.pagesData[_indexPage][_indexInPage][1]
        } catch (ex) {
            ex.errMethod = "getDataElementItemByPos";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getDataElementItemSelect: function () {
        try {
            return this.pagesData[this.visibleIndexPage][this.itemSelect][1]
        } catch (ex) {
            ex.errMethod = "getDataElementItemSelect";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getUiContentItemsVisible: function () {
        return this.contVisible.childNodes
    },
    getDomElementItemVisibleByPosition: function (_pos) {
        try {
            return this.contVisible.childNodes[_pos].obj
        } catch (ex) {
            ex.errMethod = "getDomElementItemVisibleByPosition";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getDataElementItemVisibleByPosition: function (_pos) {
        try {
            return this.pagesData[this.visibleIndexPage][_pos][1]
        } catch (ex) {
            ex.errMethod = "getDataElementItemVisibleByPosition";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getVisibleContentItemsLength: function () {
        return this.contVisible.myLength
    }, getItemSelectPosition: function () {
        return this.contVisible.childNodes[this.itemSelect].obj.position
    },
    getSelectedItem: function () {
        return this.contVisible.childNodes[this.itemSelect]
    }, focusOn: function (_isSelect) {
        try {
            if (this.pagesData[this.visibleIndexPage] != undefined && (this.pagesData[this.visibleIndexPage][this.itemSelect] != undefined && this.pagesData[this.visibleIndexPage][this.itemSelect][1] != undefined)) {
                var itemVisible = this.contVisible.childNodes[this.itemSelect];
                var dataElem = this.pagesData[this.visibleIndexPage][this.itemSelect][1];
                var pos = this.pagesData[this.visibleIndexPage][this.itemSelect][0];
                if (_isSelect == undefined || _isSelect != undefined && _isSelect)itemVisible.obj.focusOn();
                if (this.parentObjFunction != null && this.parentObj != null)if (itemVisible.obj.position != -1)this.parentObjFunction.apply(this.parentObj, new Array(this.visibleIndexPage, pos, itemVisible.obj, dataElem, this.itemSelect));
                var _this = this;
                if (this.visibleIndexPage == 0) {
                    if (this.startTimeOut != null)clearTimeout(this.startTimeOut);
                    this.startTimeOut = setTimeout(function () {
                            fw.mwManager.updateItems(pos, _this.obj, _this, _this.getOtherItemsCallBack)
                        },
                        600)
                } else fw.mwManager.updateItems(pos, _this.obj, _this, _this.getOtherItemsCallBack)
            }
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getOtherItemsCallBack: function (_resultCode, _data) {
        try {
            if (_resultCode)this.updateGrid(this, true)
        } catch (ex) {
            ex.errMethod = "getOtherItemsCallBack";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, focusOff: function () {
        try {
            if (this.contVisible.childNodes[this.itemSelect].position != -1)this.contVisible.childNodes[this.itemSelect].obj.focusOff()
        } catch (ex) {
            ex.errMethod =
                "focusOff";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, getUpIndexRow: function () {
        return this.visibleIndexRow - this.numVisibleRows
    }, getDownIndexRow: function () {
        return this.visibleIndexRow + this.numVisibleRows
    }, setUpVisibleIndexRow: function () {
        this.visibleIndexRow = this.visibleIndexRow - this.numVisibleRows
    }, setDownVisibleIndexRow: function () {
        this.visibleIndexRow = this.visibleIndexRow + this.numVisibleRows
    }, setUpVisibleIndexPage: function () {
        if (this.visibleIndexPage - 1 >= 0)this.visibleIndexPage = this.visibleIndexPage - 1;
        else this.visibleIndexPage = this.pagesData.length - 1
    }, setDownVisibleIndexPage: function () {
        if (this.visibleIndexPage + 1 < this.pagesData.length)this.visibleIndexPage = this.visibleIndexPage + 1; else this.visibleIndexPage = 0
    }, getVisibleIndexRow: function () {
        return this.visibleIndexRow
    }, getUpIndexPage: function () {
        var index = this.visibleIndexPage - 1;
        if (index < 0)index = this.pagesData.length - 1;
        return index
    }, getDownIndexPage: function () {
        var index = this.visibleIndexPage + 1;
        if (index > this.pagesData.length - 1)index = 0;
        return index
    },
    getObj: function () {
        return this.contGridScroll
    }, drawScrollBar: function () {
        try {
            this.scrollBar = new Rect("scrollBar", this.ScrollBarConf);
            var _numScroll = this.pagesData.length;
            var _spaceScrollContent = parseInt(this.ScrollBarConf.scrollBarSpace);
            this.pixelScroll = _spaceScrollContent / _numScroll;
            this.scrollBar.setHeight(this.pixelScroll);
            this.scrollY = parseInt(this.ScrollBarConf.startY);
            this.contGridScroll.appendChild(this.scrollBar.getObj())
        } catch (ex) {
            ex.errMethod = "drawScrollBar";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    },
    setScrollBar: function () {
        try {
            if (this.scrollBar != null && this.scrollBar != undefined) {
                var pos = this.visibleIndexPage * this.pixelScroll + parseInt(this.ScrollBarConf.startY);
                this.scrollBar.setY(pos)
            }
        } catch (ex) {
            ex.errMethod = "setScrollBar";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, selectElementByPosition: function (_pos, _isSelect, _forceUpdate) {
        try {
            var numPage = 0;
            var indexInPage = 0;
            for (var p = 0; p < this.pagesData.length; p++) {
                var page = this.pagesData[p];
                for (var j = 0; j < page.length; j++)if (page[j][0] == _pos) {
                    numPage = p;
                    indexInPage =
                        j;
                    p = this.pagesData.length;
                    break
                }
            }
            this.setGridAtPosition(indexInPage, numPage, _isSelect, _forceUpdate)
        } catch (ex) {
            ex.errMethod = "selectElementByPosition";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, setGridAtPosition: function (_posInPage, _indexVisiblePage, _isSelect, _forceUpdate) {
        try {
            this.focusOff();
            this.itemSelect = _posInPage;
            if (this.visibleIndexPage != _indexVisiblePage || _forceUpdate != undefined && _forceUpdate) {
                this.visibleIndexPage = _indexVisiblePage;
                if (this.contVisible != undefined && this.contVisible != null)this.contGridScroll.removeChild(this.contVisible);
                this.contVisible = null;
                this.contPrev = null;
                this.contNext = null;
                if (this.pagesData.length > 1) {
                    this.createAllPage();
                    this.setScrollBar()
                } else {
                    this.contVisible = this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage);
                    this.addToScreen(null, this.contVisible)
                }
            }
            this.focusOn(_isSelect)
        } catch (ex) {
            ex.errMethod = "setGridAtPosition";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, goNextPage: function () {
        try {
            if (this.pagesData.length > 1) {
                this.focusOff();
                this.setDownVisibleIndexPage();
                this.contGridScroll.removeChild(this.contVisible);
                this.contPrev = this.contVisible;
                this.contVisible = this.contNext;
                this.addToScreen(null, this.contVisible);
                this.contNext = this.drawPage(this.getVisibleIndexRow(), this.getDownIndexPage());
                if (this.itemSelect > this.contVisible.myLength - 1)this.itemSelect = this.contVisible.myLength - 1;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar()
            }
        } catch (ex) {
            ex.errMethod = "goNextPage";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }, goPreviusPage: function () {
        try {
            if (this.pagesData.length > 1) {
                this.focusOff();
                this.setUpVisibleIndexPage();
                this.contGridScroll.removeChild(this.contVisible);
                this.contNext = this.contVisible;
                this.contVisible = this.contPrev;
                this.addToScreen(null, this.contVisible);
                this.contPrev = this.drawPage(this.getVisibleIndexRow(), this.getUpIndexPage());
                if (this.itemSelect > this.contVisible.myLength - 1)this.itemSelect = this.contVisible.myLength - 1;
                this.focusOn();
                if (this.showScrollBar)this.setScrollBar()
            }
        } catch (ex) {
            ex.errMethod = "goPreviusPage";
            ex.errClass = "GridPagePlus";
            fw.err(ex)
        }
    }
});
