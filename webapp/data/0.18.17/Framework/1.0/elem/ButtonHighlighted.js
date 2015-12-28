var ButtonHighlighted = Class.create(Button, {
    rectHighlightObj: null, rectHighlightCursorObj: null, initialize: function ($super, _id, _css) {
        try {
            $super(_id, _css);
            this.rectHighlightObj = fw.cssBuilder.createRect(_id + "_RectHighlighted", this.css.styleItemHighlighted.style);
            this.rectHighlightCursorObj = fw.cssBuilder.createRect(_id + "_RectHighlightedCursor", this.css.styleItemHighlightedCursor.style);
            this.rectHighlightCursorObj.setW(this.css.styleItemHighlightedCursor.w);
            this.btnObj.appendChild(this.rectHighlightObj);
            this.btnObj.appendChild(this.rectHighlightCursorObj);
            this.hideHighlighted()
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ButtonHighlighted";
            fw.err(ex)
        }
    }, hideHighlighted: function () {
        try {
            this.rectHighlightObj.hide();
            this.rectHighlightCursorObj.hide()
        } catch (ex) {
            ex.errMethod = "init";
            ex.errClass = "ButtonHighlighted";
            fw.err(ex)
        }
    }, showHighlighted: function () {
        try {
            this.rectHighlightObj.show();
            this.rectHighlightCursorObj.show()
        } catch (ex) {
            ex.errMethod = "showHighlighted";
            ex.errClass = "ButtonHighlighted";
            fw.err(ex)
        }
    },
    posHighlight: function (_startPos, _hlWidth, _nCharsText, _fromLeft) {
        try {
            var xStart = 0;
            var widthHighlight = 0;
            var xCursor = 0;
            if (_fromLeft == null || _fromLeft == undefined)_fromLeft = false;
            if (_fromLeft) {
                xStart = _startPos * this.css.widthSingleHighlight + this.css.xStartHighlight + Math.floor((this.css.maxSizeHighlight - _nCharsText) * this.css.widthSingleHighlight / 2);
                xCursor = xStart + this.css.widthSingleHighlight
            } else {
                xStart = (this.css.maxSizeHighlight - _hlWidth - _startPos) * this.css.widthSingleHighlight + this.css.xStartHighlight;
                xCursor = xStart - this.css.styleItemHighlightedCursor.w
            }
            widthHighlight = _hlWidth * this.css.widthSingleHighlight;
            this.rectHighlightObj.setX(xStart);
            this.rectHighlightObj.setW(widthHighlight);
            this.rectHighlightCursorObj.setX(xCursor)
        } catch (ex) {
            ex.errMethod = "posHighlight";
            ex.errClass = "ButtonHighlighted";
            fw.err(ex)
        }
    }
});
