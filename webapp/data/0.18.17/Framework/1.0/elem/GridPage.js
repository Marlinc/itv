var GridPage = Class.create({
    initialize: function (_id, _gridCss, _item, _obj, _parentObj, _parentObjFunction, _defaultStart, _updateTime) {
        try {
            this.id = _id;
            this.item = _item;
            this.obj = _obj;
            this.parentObj = _parentObj;
            this.parentObjFunction = _parentObjFunction;
            this.updateTime = _updateTime;
            this.callBackTimer = null;
            this.confGrid = _gridCss;
            this.confItem = this.confGrid.item;
            this.numItemsInRow = this.confGrid.numColumnInRow;
            this.numVisibleRows = parseInt(this.confGrid.numVisibleRows);
            this.numRowsToScroll = parseInt(this.confGrid.numRowsToScroll);
            this.timeUpdateInfo = parseInt(this.confGrid.timeUpdateInfo);
            this.pixelToScroll = null;
            this.fromY = 0;
            this.toY = 0;
            this.numItems = this.obj.length;
            this.visibleIndexRow = 0;
            this.visibleIndexPage = 0;
            this.itemSelect = 0;
            this.numItemInPage = this.numItemsInRow * this.numVisibleRows;
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
            this.itemsPrev =
                new Array;
            this.itemsNext = new Array;
            this.itemsVisible = new Array;
            this.contGridScroll = fw.cssBuilder.createDiv(_id + "_ContGridScroll", this.confGrid.style);
            this.contGrid = fw.cssBuilder.createScrollableGroup(_id + "_ContGrid", this.confGrid.style);
            this.contGrid.setX(0);
            this.contGrid.setY(0);
            this.contGridScroll.appendChild(this.contGrid);
            if (_defaultStart == undefined || _defaultStart != undefined && _defaultStart)if (this.pagesData.length > 1) {
                this.drawPage(this.getUpIndexRow(), this.getUpIndexPage(), this.itemsPrev);
                this.drawPage(this.getVisibleIndexRow(),
                    this.visibleIndexPage, this.itemsVisible);
                this.drawPage(this.getDownIndexRow(), this.getDownIndexPage(), this.itemsNext);
                this.populateGrid()
            } else {
                this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage, this.itemsVisible);
                this.populateGrid()
            }
            this.showScrollBar = this.confGrid.isScrollBarShow;
            if (this.showScrollBar) {
                this.ScrollBarConf = this.confGrid.scrollBar;
                this.scrollY = this.ScrollBarConf.startY;
                _arrowDown = new Image(_id + "_arrowDown", this.ScrollBarConf.arrowDown);
                _arrowDown.setUrl(this.ScrollBarConf.arrowDown.url);
                _arrowUp = new Image(_id + "_arrowUp", this.ScrollBarConf.arrowUp);
                _arrowUp.setUrl(this.ScrollBarConf.arrowUp.url);
                this.contGridScroll.appendChild(_arrowDown.getObj());
                this.contGridScroll.appendChild(_arrowUp.getObj());
                this.drawScrollBar()
            }
            if (this.numItems > fw.conf.numItemsSingleCall)if (this.obj[this.numItems - 1].blockId != -1 && fw.mwRequestManager.updateIndexDoneList[this.obj[this.numItems - 1].blockId] == false) {
                fw.mwRequestManager.updateIndexDoneList[this.obj[this.numItems - 1].blockId] = true;
                fw.log.debug("UPDATE List INDEX - start : " +
                    this.obj[this.numItems - 1].blockId);
                fw.mwManager.getOtherMovies(this.obj, this.obj[this.numItems - 1].blockId)
            }
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, getObj: function () {
        return this.contGridScroll
    }, getNumPage: function () {
        return this.pagesData.length
    }, getListPages: function () {
        return this.pagesData
    }, resetGrid: function () {
        try {
            this.itemSelect = 0;
            this.visibleIndexPage = 0;
            while (this.itemsPrev.length)this.contGrid.removeChild(this.itemsPrev.pop().domElement.getObj());
            while (this.itemsVisible.length)this.contGrid.removeChild(this.itemsVisible.pop().domElement.getObj());
            while (this.itemsNext.length)this.contGrid.removeChild(this.itemsNext.pop().domElement.getObj());
            if (this.pagesData.length > 1) {
                this.drawPage(this.getUpIndexRow(), this.getUpIndexPage(), this.itemsPrev);
                this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage, this.itemsVisible);
                this.drawPage(this.getDownIndexRow(), this.getDownIndexPage(), this.itemsNext)
            } else this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage, this.itemsVisible);
            this.populateGrid()
        } catch (ex) {
            ex.errMethod = "resetGrid";
            ex.errClass =
                "GridPage";
            fw.err(ex)
        }
    }, populateGrid: function (_asyncUpdate) {
        try {
            var _this = this;
            this.timeUpdate = fw.util.setTimeout(function () {
                fw.log.debug("Update Items Grid " + _this.id);
                for (var i = 0; i < _this.itemsVisible.length; i++) {
                    if (_asyncUpdate != undefined && (_asyncUpdate && (_this.itemsVisible[i].domElement.isSelect != undefined && (_this.itemsVisible[i].domElement.isSelect && _this.itemsVisible[i].dataElement.blockId == -1))))if (_this.parentObjFunction != null && _this.parentObj != null)_this.parentObjFunction.apply(_this.parentObj,
                        new Array(_this.visibleIndexPage, _this.itemsVisible[i].position, _this.itemsVisible[i].domElement, _this.itemsVisible[i].dataElement, i));
                    _this.itemsVisible[i].domElement.setDataFromObj(_this.itemsVisible[i].dataElement)
                }
                if (_this.pagesData.length > 1) {
                    for (var i = 0; i < _this.itemsPrev.length; i++)_this.itemsPrev[i].domElement.setDataFromObj(_this.itemsPrev[i].dataElement);
                    for (var i = 0; i < _this.itemsNext.length; i++)_this.itemsNext[i].domElement.setDataFromObj(_this.itemsNext[i].dataElement)
                }
            }, this.timeUpdateInfo)
        } catch (ex) {
            ex.errMethod =
                "populateGrid";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, createItem: function (_obj, _col, _row, _idItem) {
        try {
            var item = new this.item(this.id + "_cover" + _idItem, this.confItem);
            height = this.confItem.styleItemCont.h;
            width = this.confItem.styleItemCont.w;
            if (this.pixelToScroll == null)this.pixelToScroll = this.numVisibleRows * height + this.confGrid.distVerImgageGrid * this.numVisibleRows;
            if (_col != null && _row != null) {
                var x = _col * (width + this.confGrid.distHorImgageGrid);
                var y = _row * (height + this.confGrid.distVerImgageGrid);
                item.setX(x);
                item.setY(y)
            }
            if (_obj[1].isSelected != undefined && _obj[1].isSelected == true) {
                item.setSelected();
                item.selected()
            }
            return new itemGrid(_obj[0], item, _obj[1])
        } catch (ex) {
            ex.errMethod = "createItem";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, drawPage: function (_verticalPosition, _indexPage, _arrayToUse) {
        try {
            var page = this.pagesData[_indexPage];
            var _col = 0;
            var _row = _verticalPosition;
            var _posRel = 0;
            for (var i = 0; i < page.length; i++) {
                if (i % this.numItemsInRow == 0 && i != 0) {
                    _col = 0;
                    _row++;
                    _posRel++
                }
                _item = this.createItem(page[i], _col, _row,
                    _indexPage + "_" + i);
                this.contGrid.appendChild(_item.domElement.getObj());
                _arrayToUse.push(_item);
                _col++
            }
        } catch (ex) {
            ex.errMethod = "drawpage";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, moveCursorToDown: function () {
        try {
            if (this.itemSelect + this.numItemsInRow > this.itemsVisible.length - 1)this.changePageDown(); else {
                this.focusOff();
                this.itemSelect = this.itemSelect + this.numItemsInRow;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "movecursorToDown";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, changePageDown: function () {
        try {
            if (this.timeUpdate !=
                undefined && this.timeUpdate != null) {
                fw.util.clearTimeout(this.timeUpdate);
                this.timeUpdate = null
            }
            this.focusOff();
            if (this.pagesData.length > 1) {
                this.fromY = this.toY;
                this.toY = this.toY + this.pixelToScroll;
                fw.effects.slideVert(this.contGrid, this, this.callbackSlideGridDown, false, false, this.confGrid.timeToScroll, this.fromY, this.toY);
                if (this.showScrollBar)this.setScrollBarDown()
            } else {
                if (this.numItemsInRow == 1)this.itemSelect = 0; else this.itemSelect = this.itemSelect % this.numItemsInRow;
                this.focusOn();
                fw.keys.unlock(1)
            }
        } catch (ex) {
            ex.errMethod =
                "changePageDown";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, callbackSlideGridDown: function () {
        try {
            while (this.itemsPrev.length) {
                var item = this.itemsPrev.pop();
                this.contGrid.removeChild(item.domElement.getObj())
            }
            for (var i = 0; i < this.itemsVisible.length; i++)this.itemsPrev[i] = this.itemsVisible[i];
            while (this.itemsVisible.length)this.itemsVisible.pop();
            for (var i = 0; i < this.itemsNext.length; i++)this.itemsVisible[i] = this.itemsNext[i];
            while (this.itemsNext.length)this.itemsNext.pop();
            this.setDownVisibleIndexPage();
            this.setDownVisibleIndexRow();
            this.drawPage(this.getDownIndexRow(), this.getDownIndexPage(), this.itemsNext);
            this.itemSelect = this.itemSelect % this.numItemsInRow;
            this.focusOn();
            this.populateGrid();
            fw.util.setTimeout(function () {
                fw.keys.unlock(1)
            }, 0)
        } catch (ex) {
            ex.errMethod = "callBackSlideGridDown";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, moveCursorToUp: function () {
        try {
            if (this.time != null) {
                fw.util.clearTimeout(this.time);
                this.time = null
            }
            if (this.itemSelect - this.numItemsInRow < 0)this.changePageUp(); else {
                this.focusOff();
                this.itemSelect = this.itemSelect -
                    this.numItemsInRow;
                this.focusOn()
            }
        } catch (ex) {
            ex.errMethod = "moveCursorToUp";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, changePageUp: function () {
        try {
            if (this.timeUpdate != undefined && this.timeUpdate != null) {
                fw.util.clearTimeout(this.timeUpdate);
                this.timeUpdate = null
            }
            this.focusOff();
            if (this.pagesData.length > 1) {
                this.fromY = this.toY;
                this.toY = this.toY - this.pixelToScroll;
                fw.effects.slideVert(this.contGrid, this, this.callbackSlideGridUp, false, false, this.confGrid.timeToScroll, this.fromY, this.toY);
                if (this.showScrollBar)this.setScrollBarUp()
            } else {
                if (this.numItemsInRow ==
                    1)this.itemSelect = this.itemsVisible.length - 1; else {
                    var appItemSelect = this.numItemInPage - 1 - (this.numItemsInRow - 1 - this.itemSelect);
                    if (appItemSelect <= this.itemsVisible.length - 1)this.itemSelect = appItemSelect; else this.itemSelect = this.itemsVisible.length - 1
                }
                this.focusOn();
                fw.util.setTimeout(function () {
                    fw.keys.unlock(1)
                }, 0)
            }
        } catch (ex) {
            ex.errMethod = "changePageUp";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, callbackSlideGridUp: function () {
        try {
            while (this.itemsNext.length) {
                var item = this.itemsNext.pop();
                this.contGrid.removeChild(item.domElement.getObj())
            }
            for (var i =
                0; i < this.itemsVisible.length; i++)this.itemsNext[i] = this.itemsVisible[i];
            while (this.itemsVisible.length)this.itemsVisible.pop();
            for (var i = 0; i < this.itemsPrev.length; i++)this.itemsVisible[i] = this.itemsPrev[i];
            while (this.itemsPrev.length)this.itemsPrev.pop();
            this.setUpVisibleIndexPage();
            this.setUpVisibleIndexRow();
            this.drawPage(this.getUpIndexRow(), this.getUpIndexPage(), this.itemsPrev);
            this.populateGrid();
            if (this.numItemsInRow == 1)this.itemSelect = this.itemsVisible.length - 1; else {
                var appItemSelect = this.numItemInPage -
                    1 - (this.numItemsInRow - 1 - this.itemSelect);
                if (appItemSelect <= this.itemsVisible.length - 1)this.itemSelect = appItemSelect
            }
            this.focusOn();
            fw.util.setTimeout(function () {
                fw.keys.unlock(1)
            }, 0)
        } catch (ex) {
            ex.errMethod = "callbackSlideGridUp";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, moveCursorToRight: function () {
        if (this.itemSelect < this.numItemsInRow && (this.itemSelect + 1 < this.numItemsInRow && this.itemSelect + 1 < this.itemsVisible.length) || this.itemSelect >= this.numItemsInRow && this.itemSelect + 1 < this.itemsVisible.length) {
            this.focusOff();
            this.itemSelect = this.itemSelect + 1;
            this.focusOn()
        }
    }, getPositionInPage: function () {
        return this.itemSelect
    }, moveCursorToLeft: function () {
        if (this.itemSelect - 1 >= 0) {
            this.focusOff();
            this.itemSelect = this.itemSelect - 1;
            this.focusOn()
        }
    }, isCursorInFirstPosition: function () {
        return this.itemSelect == 0 || this.itemSelect % this.numItemsInRow == 0
    }, getItemsVisible: function () {
        return this.itemsVisible
    }, getCursorPosition: function () {
        return this.itemsVisible[this.itemSelect].position
    }, focusOn: function (_isSelect) {
        try {
            if (_isSelect ==
                undefined || _isSelect)this.itemsVisible[this.itemSelect].domElement.focusOn();
            if (this.updateTime != undefined) {
                var _this = this;
                this.clearCallBackTimer();
                this.callBackTimer = setTimeout(function () {
                    if (_this.parentObjFunction != null && _this.parentObj != null)_this.parentObjFunction.apply(_this.parentObj, new Array(_this.visibleIndexPage, _this.itemsVisible[_this.itemSelect].position, _this.itemsVisible[_this.itemSelect].domElement, _this.itemsVisible[_this.itemSelect].dataElement, _this.itemSelect))
                }, this.updateTime)
            } else if (this.parentObjFunction !=
                null && this.parentObj != null)this.parentObjFunction.apply(this.parentObj, new Array(this.visibleIndexPage, this.itemsVisible[this.itemSelect].position, this.itemsVisible[this.itemSelect].domElement, this.itemsVisible[this.itemSelect].dataElement, this.itemSelect));
            fw.mwManager.updateItems(this.itemsVisible[this.itemSelect].position, this.obj, this, this.getOtherItemsCallBack)
        } catch (ex) {
            ex.errMethod = "focusOn";
            ex.errClass = "GridPage";
            fw.err(ex)
        }
    }, clearCallBackTimer: function () {
        if (this.callBackTimer != null) {
            clearTimeout(this.callBackTimer);
            this.callBackTimer = null
        }
    }, getOtherItemsCallBack: function (_resultCode, _data) {
        if (_resultCode)this.populateGrid(true)
    }, getData: function () {
        return this.obj
    }, selectElementByPosition: function (_pos, _isSelect) {
        var numPage = 0;
        var indexInPage = 0;
        for (var p = 0; p < this.pagesData.length; p++) {
            var page = this.pagesData[p];
            for (var j = 0; j < page.length; j++)if (page[j][0] == _pos) {
                numPage = p;
                indexInPage = j;
                p = this.pagesData.length;
                break
            }
        }
        this.setGridAtPosition(indexInPage, numPage, _isSelect)
    }, setGridAtPosition: function (_posInPage, _indexVisiblePage,
                                    _isSelect) {
        this.itemSelect = _posInPage;
        this.visibleIndexPage = _indexVisiblePage;
        while (this.itemsPrev.length)this.contGrid.removeChild(this.itemsPrev.pop().domElement.getObj());
        while (this.itemsVisible.length)this.contGrid.removeChild(this.itemsVisible.pop().domElement.getObj());
        while (this.itemsNext.length)this.contGrid.removeChild(this.itemsNext.pop().domElement.getObj());
        if (this.pagesData.length > 1) {
            this.drawPage(this.getUpIndexRow(), this.getUpIndexPage(), this.itemsPrev);
            this.drawPage(this.getVisibleIndexRow(),
                this.visibleIndexPage, this.itemsVisible);
            this.drawPage(this.getDownIndexRow(), this.getDownIndexPage(), this.itemsNext)
        } else this.drawPage(this.getVisibleIndexRow(), this.visibleIndexPage, this.itemsVisible);
        this.populateGrid();
        this.focusOn(_isSelect)
    }, getVisibleItemAtPosition: function (_index) {
        try {
            return this.itemsVisible[_index]
        } catch (ex) {
            fw.log.error("getVisibleItemAtPosition : " + ex)
        }
    }, getSelectedItem: function () {
        return this.itemsVisible[this.itemSelect]
    }, focusOff: function () {
        this.itemsVisible[this.itemSelect].domElement.focusOff()
    },
    getUpIndexRow: function () {
        return this.visibleIndexRow - this.numVisibleRows
    }, getDownIndexRow: function () {
        return this.visibleIndexRow + this.numVisibleRows
    }, setUpVisibleIndexRow: function () {
        this.visibleIndexRow = this.visibleIndexRow - this.numVisibleRows
    }, setDownVisibleIndexRow: function () {
        this.visibleIndexRow = this.visibleIndexRow + this.numVisibleRows
    }, setUpVisibleIndexPage: function () {
        if (this.visibleIndexPage - 1 >= 0)this.visibleIndexPage = this.visibleIndexPage - 1; else this.visibleIndexPage = this.pagesData.length - 1
    },
    setDownVisibleIndexPage: function () {
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
    }, getObj: function () {
        return this.contGridScroll
    }, drawScrollBar: function () {
        this.scrollBar =
            new Rect("scrollBar", this.ScrollBarConf);
        _numScroll = this.pagesData.length - 1;
        _spaceScrollContent = this.ScrollBarConf.scrollBarSpace;
        this.pixelScroll = _spaceScrollContent / _numScroll;
        this.contGridScroll.appendChild(this.scrollBar.getObj())
    }, setScrollBarDown: function () {
        if (this.scrollY == this.ScrollBarConf.startY + this.ScrollBarConf.scrollBarSpace) {
            this.scrollY = this.ScrollBarConf.startY;
            this.scrollBar.setY(this.scrollY)
        } else {
            this.scrollY = this.scrollY + this.pixelScroll;
            if (this.scrollY > this.ScrollBarConf.startY +
                this.ScrollBarConf.scrollBarSpace)this.scrollY = this.ScrollBarConf.startY + this.ScrollBarConf.scrollBarSpace;
            fw.effects.multiAnimation(this.scrollBar.getObj(), null, null, false, false, this.confGrid.timeToScroll, null, this.scrollY, null, null)
        }
    }, setScrollBarUp: function () {
        if (this.scrollY == this.ScrollBarConf.startY) {
            this.scrollY = this.ScrollBarConf.startY + this.ScrollBarConf.scrollBarSpace;
            this.scrollBar.setY(this.scrollY)
        } else {
            this.scrollY = this.scrollY - this.pixelScroll;
            if (this.scrollY < this.ScrollBarConf.startY)this.scrollY =
                this.ScrollBarConf.startY;
            fw.effects.multiAnimation(this.scrollBar.getObj(), null, null, false, false, this.confGrid.timeToScroll, null, this.scrollY, null, null)
        }
    }
});
var itemGrid = Class.create({
    initialize: function (_position, _domElement, _dataElement) {
        this.position = _position;
        this.domElement = _domElement;
        this.dataElement = _dataElement
    }
});
