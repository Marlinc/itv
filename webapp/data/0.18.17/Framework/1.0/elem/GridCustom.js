var Grid = Class.create({
    getObj: function () {
        return this.contGridScroll
    }, initialize: function (_id, _gridCss, _item, _obj, _parentObj, _parentObjFunction) {
        this.id = _id;
        this.item = _item;
        this.obj = _obj;
        this.parentObj = _parentObj;
        this.parentObjFunction = _parentObjFunction;
        this.confGrid = _gridCss;
        this.confItem = this.confGrid.item;
        this.numItemsInRow = this.confGrid.numColumnInRow;
        this.numVisibleRows = this.confGrid.numVisibleRows;
        this.pixelToScroll = null;
        this.numItems = this.obj.length;
        this.firstVisibleRow = 0;
        this.lastRowVisible =
            this.numVisibleRows - 1;
        this.relLineCursorPosition = 0;
        this.relCursorPosition = 0;
        this.cursorPosition = 0;
        this.fromY = 0;
        this.toY = 0;
        this.numRows = Math.floor(this.numItems / this.numItemsInRow);
        if (this.numItems % this.numItemsInRow > 0)this.numRows++;
        this.itemsPrev = new Array;
        this.itemsNext = new Array;
        this.itemsVisible = new Array;
        for (i = 0; i < this.numVisibleRows; i++)this.itemsVisible.push(new Array);
        this.contGridScroll = fw.cssBuilder.createScrollableGroup(_id + "_ContGridScroll", this.confGrid.style);
        this.contGrid = fw.cssBuilder.createScrollableGroup(_id +
            "_ContGrid", this.confGrid.style);
        this.contGrid.setX(0);
        this.contGrid.setY(0);
        this.contGridScroll.appendChild(this.contGrid);
        this.createFirstTimeGrid();
        this.showScrollBar = this.confGrid.isScrollBarShow;
        if (this.showScrollBar) {
            this.ScrollBarConf = this.confGrid.scrollBar;
            this.scrollY = this.ScrollBarConf.startY;
            _arrowDown = new Image(_id + "_arrowDown", this.ScrollBarConf.arrowDown);
            _arrowDown.setUrl("./Apps/Common/Resources/Images/1.0/arrow_down.png");
            _arrowUp = new Image(_id + "_arrowUp", this.ScrollBarConf.arrowUp);
            _arrowUp.setUrl("./Apps/Common/Resources/Images/1.0/arrow_up.png");
            this.contGridScroll.appendChild(_arrowDown.getObj());
            this.contGridScroll.appendChild(_arrowUp.getObj());
            this.drawScrollBar()
        }
    }, drawScrollBar: function () {
        this.scrollBar = new Rect("scrollBar", this.ScrollBarConf);
        _numScroll = this.numRows - this.numVisibleRows;
        _spaceScrollContent = this.ScrollBarConf.scrollBarSpace;
        this.pixelScroll = _spaceScrollContent / _numScroll;
        this.contGridScroll.appendChild(this.scrollBar.getObj())
    }, setScrollBarDown: function () {
        this.scrollY =
            this.scrollY + this.pixelScroll;
        fw.effects.multiAnimation(this.scrollBar.getObj(), null, null, false, false, this.confGrid.timeToScroll, null, this.scrollY, null, null)
    }, setScrollBarUp: function () {
        this.scrollY = this.scrollY - this.pixelScroll;
        fw.effects.multiAnimation(this.scrollBar.getObj(), null, null, false, false, this.confGrid.timeToScroll, null, this.scrollY, null, null)
    }, createItem: function (_index, _col, _row) {
        try {
            var item = new this.item("_cover" + _index, this.confItem);
            item.setDataObj(_index, this.obj);
            height = this.confItem.styleItemCont.h;
            width = this.confItem.styleItemCont.w;
            if (this.pixelToScroll == null)this.pixelToScroll = this.confGrid.numRowsToScroll * height + this.confGrid.distVerImgageGrid;
            if (_col != null && _row != null) {
                var x = _col * (width + this.confGrid.distHorImgageGrid);
                var y = _row * (height + this.confGrid.distVerImgageGrid);
                item.setX(x);
                item.setY(y)
            }
        } catch (e) {
            fw.log.error(e)
        }
        item.objPosition = _index;
        return item
    }, createFirstTimeGrid: function () {
        var _col = 0;
        var _row = -1;
        for (i = 0; i < (this.numVisibleRows + 1) * this.numItemsInRow && i < this.obj.length; i++) {
            if (i %
                this.numItemsInRow == 0) {
                _col = 0;
                _row++
            }
            var itemTmp = this.createItem(i, _col, _row);
            this.contGrid.appendChild(itemTmp.getObj());
            if (_row < this.numVisibleRows)this.itemsVisible[_row].push(itemTmp); else this.itemsNext.push(itemTmp);
            _col++
        }
    }, getNumVisibleItem: function () {
        return this.itemsVisible.length
    }, setVisibleItem: function (_index, _obj) {
        try {
            var item = this.itemsVisible[_index];
            item.setDataFromObj(_obj);
            this.obj[item.objPosition] = _obj
        } catch (ex) {
            fw.log.error("Error to set Grid Item: " + ex)
        }
    }, createPagesDown: function () {
        if (this.itemsPrev.length >
            0)for (i = 0; i < this.itemsPrev.length; i++)this.contGrid.removeChild(this.itemsPrev[i].getObj());
        this.itemsPrev = this.itemsVisible[0];
        for (i = 1; i < this.itemsVisible.length; i++)this.itemsVisible[i - 1] = this.itemsVisible[i];
        this.itemsVisible[this.itemsVisible.length - 1] = this.itemsNext;
        this.itemsNext = [];
        _startElem = (this.lastRowVisible + 1) * this.numItemsInRow;
        var _col = -1;
        var _row = this.lastRowVisible + 1;
        for (i = _startElem; i < _startElem + this.numItemsInRow && i < this.obj.length; i++) {
            _col++;
            _item = this.createItem(i, _col, _row);
            this.contGrid.appendChild(_item.getObj());
            this.itemsNext.push(_item)
        }
    }, createPagesUp: function () {
        if (this.itemsNext.length > 0)for (i = 0; i < this.itemsNext.length; i++)this.contGrid.removeChild(this.itemsNext[i].getObj());
        this.itemsNext = this.itemsVisible[this.itemsVisible.length - 1];
        for (i = this.itemsVisible.length - 1; i > 0; i--)this.itemsVisible[i] = this.itemsVisible[i - 1];
        this.itemsVisible[0] = this.itemsPrev;
        this.itemsPrev = [];
        if (this.firstVisibleRow > 0) {
            _startElem = (this.firstVisibleRow - 1) * this.numItemsInRow;
            var _col =
                -1;
            var _row = this.firstVisibleRow - 1;
            for (i = _startElem; i < _startElem + this.numItemsInRow && i < this.obj.length; i++) {
                _col++;
                _item = this.createItem(i, _col, _row);
                this.contGrid.appendChild(_item.getObj());
                this.itemsPrev.push(_item)
            }
        }
    }, moveCursorToDown: function () {
        if (this.cursorPosition + this.numItemsInRow < this.numItems || this.cursorPosition + this.numItemsInRow >= this.numItems && this.numRows - 1 > Math.floor(this.cursorPosition / this.numItemsInRow)) {
            this.focusOff();
            fw.util.clearTimeout(this.time);
            if (this.cursorPosition + this.numItemsInRow <
                this.numItems)this.cursorPosition += this.numItemsInRow; else {
                this.cursorPosition = this.numItems - 1;
                this.relLineCursorPosition = this.numItems - (this.numRows - 1) * this.numItemsInRow - 1
            }
            this.relCursorPosition++;
            if (this.lastRowVisible < Math.floor(this.cursorPosition / this.numItemsInRow)) {
                this.firstVisibleRow++;
                this.lastRowVisible++;
                this.fromY = this.toY;
                this.toY = this.toY + this.pixelToScroll;
                fw.effects.slideVert(this.contGrid, this, this.callbackSlideGridDown, true, true, this.confGrid.timeToScroll, this.fromY, this.toY);
                if (this.showScrollBar)this.setScrollBarDown()
            } else this.selectItem(this.relCursorPosition - 1, this.relCursorPosition, this.relLineCursorPosition, this.relLineCursorPosition, this.cursorPosition)
        }
    }, moveCursorToUp: function () {
        if (this.cursorPosition - this.numItemsInRow >= 0) {
            this.focusOff();
            fw.util.clearTimeout(this.time);
            this.cursorPosition -= this.numItemsInRow;
            this.relCursorPosition--;
            if (Math.floor(this.cursorPosition / this.numItemsInRow) < this.firstVisibleRow) {
                this.firstVisibleRow--;
                this.lastRowVisible--;
                this.fromY =
                    this.toY;
                this.toY = this.toY - this.pixelToScroll;
                fw.effects.slideVert(this.contGrid, this, this.callbackSlideGridUp, true, true, this.confGrid.timeToScroll, this.fromY, this.toY);
                if (this.showScrollBar)this.setScrollBarUp()
            } else this.selectItem(this.relCursorPosition + 1, this.relCursorPosition, this.relLineCursorPosition, this.relLineCursorPosition, this.cursorPosition)
        }
    }, callbackSlideGridDown: function () {
        this.createPagesDown();
        this.relCursorPosition = this.itemsVisible.length - 1;
        _this = this;
        this.time = fw.util.setTimeout("_this.selectItem(_this.relCursorPosition-1,_this.relCursorPosition,_this.relLineCursorPosition,_this.relLineCursorPosition,_this.cursorPosition)",
            this.confGrid.timeToUpdateCursor)
    }, callbackSlideGridUp: function () {
        this.createPagesUp();
        this.relCursorPosition = 0;
        _this = this;
        this.time = fw.util.setTimeout("_this.selectItem(_this.relCursorPosition+1,_this.relCursorPosition,_this.relLineCursorPosition,_this.relLineCursorPosition,_this.cursorPosition)", this.confGrid.timeToUpdateCursor)
    }, moveCursorToRight: function () {
        if ((this.getCursorPosition() == 0 || (this.getCursorPosition() + 1) % this.numItemsInRow != 0) && this.getCursorPosition() < this.obj.length - 1) {
            this.cursorPosition++;
            this.relLineCursorPosition++;
            this.selectItem(this.relCursorPosition, this.relCursorPosition, this.relLineCursorPosition - 1, this.relLineCursorPosition, this.cursorPosition)
        }
    }, setFocusInFirstPosition: function () {
        this.cursorPosition = 0;
        this.relLineCursorPosition = 0;
        this.relCursorPosition = 0
    }, moveCursorToLeft: function () {
        if (!this.getCursorPosition() % this.numItemsInRow == 0) {
            this.cursorPosition--;
            this.relLineCursorPosition--;
            this.selectItem(this.relCursorPosition, this.relCursorPosition, this.relLineCursorPosition +
                1, this.relLineCursorPosition, this.cursorPosition)
        }
    }, isCursorInFirstPosition: function () {
        return this.getCursorPosition() % this.numItemsInRow == 0
    }, getCursorPosition: function () {
        return this.cursorPosition
    }, getSelectedItem: function () {
        return this.itemsVisible[this.relCursorPosition][this.relLineCursorPosition]
    }, getSelectedItemData: function () {
        return this.obj[this.cursorPosition]
    }, getFullPositionInGrid: function () {
        var retObj = new Object;
        retObj.relCursorPosition = this.relCursorPosition;
        retObj.relLineCursorPosition =
            this.relLineCursorPosition;
        retObj.cursorPosition = this.cursorPosition;
        return retObj
    }, setFullPositionInGrid: function (_positionObj) {
        this.relCursorPosition = _positionObj.relCursorPosition;
        this.relLineCursorPosition = _positionObj.relLineCursorPosition;
        this.cursorPosition = _positionObj.cursorPosition
    }, focusOn: function () {
        this.itemsVisible[this.relCursorPosition][this.relLineCursorPosition].focusOn()
    }, focusOff: function () {
        this.itemsVisible[this.relCursorPosition][this.relLineCursorPosition].focusOff()
    }, selectItem: function (_preRelPos,
                             _actualRelPos, _preRelLinePos, _actualRelLinePos) {
        this.itemsVisible[_preRelPos][_preRelLinePos].focusOff();
        this.itemsVisible[_actualRelPos][_actualRelLinePos].focusOn();
        if (this.parentObjFunction != null && this.parentObj != null)this.parentObjFunction.apply(this.parentObj, new Array(this.cursorPosition, _actualRelLinePos))
    }
});
