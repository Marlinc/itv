var ProgressBar = Class.create({
    getObj: function () {
        return this.obj
    }, initialize: function (_id, _css) {
        try {
            this.width = _css.pbCont.width;
            this.obj = fw.cssBuilder.createDiv("ProgressbarElement", _css.pbContainer.style);
            this.progressRectBg = cssUtil.addElementToDom(Rect, "ProgressBarBg", _css.pbCont, this.getObj());
            this.progressRect = cssUtil.addElementToDom(Rect, "ProgressBarCache", _css.past, this.getObj());
            this.currPbPos = cssUtil.addElementToDom(Rect, "ProgressBarCurrPos", _css.currPos, this.getObj());
            this.css = _css
        } catch (ex) {
            fw.log.error("ProgressBar initialize: " +
                ex)
        }
    }, hide: function () {
        this.obj.hide()
    }, show: function () {
        this.obj.show()
    }, setPercentage: function (_val, _totalTime) {
        var percentage = parseInt(_val * this.width / _totalTime);
        this.progressRect.setWidth(percentage);
        this.currPbPos.setX(percentage)
    }
});
