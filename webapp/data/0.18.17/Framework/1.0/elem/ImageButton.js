var ImageButton = Class.create({
    id: null,
    css: null,
    btnObj: null,
    imageUnSelectObj: null,
    imageSelectObj: null,
    textObj: null,
    getObj: function () {
        return this.btnObj
    },
    initialize: function (_id, _css) {
        this.id = _id;
        this.btnObj = fw.cssBuilder.createDiv(_id + "_imgButt", _css.styleItemCont);
        this.btnObj.show();
        this.imageUnsel = fw.cssBuilder.createImg(_id + "_sel", _css.styleItemUnSelect);
        this.imageUnsel.setX(0);
        this.imageUnsel.setY(0);
        this.btnObj.appendChild(this.imageUnsel);
        this.imageSelect = fw.cssBuilder.createImg(_id + "_unSel",
            _css.styleItemSelect);
        this.imageSelect.setX(0);
        this.imageSelect.setY(0);
        this.btnObj.appendChild(this.imageSelect);
        this.textObj = fw.cssBuilder.createText(_id + "_Txt", _css.styleItemTxt);
        this.btnObj.appendChild(this.textObj)
    },
    focusOn: function () {
        fw.appManager.setFocusElem(this);
        this.imageSelect.show()
    },
    focusOff: function () {
        this.imageSelect.hide()
    },
    changeTextColor: function (_color) {
        this.textObj.setFill(_color)
    },
    setTxt: function (_txt) {
        this.textObj.setTxt(_txt)
    }
});
