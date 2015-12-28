UserPreferenceStorage = Class.create({
    initialize: function () {
    }, setPreferenceInStorage: function (_prefName, _prefValue) {
        try {
            var objectToSetInStorage = new Object;
            objectToSetInStorage[_prefName] = _prefValue;
            fw.mwManager.setItems(objectToSetInStorage)
        } catch (ex) {
            ex.errMethod = "setPreferenceInStorage";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, getPreferenceFromStorage: function (_prefName) {
        try {
            var objectFromStorage = fw.mwManager.getItem(_prefName);
            if (objectFromStorage != null && objectFromStorage != undefined)return objectFromStorage;
            else return null
        } catch (ex) {
            ex.errMethod = "getPreferenceFromStorage";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, isGridMode: function () {
        try {
            return this.getPreferenceFromStorage(fw.conf.userPreferenceStorageIsGridMode)
        } catch (ex) {
            ex.errMethod = "isGridMode";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, setGridMode: function (_isGridValue) {
        try {
            this.setPreferenceInStorage(fw.conf.userPreferenceStorageIsGridMode, _isGridValue)
        } catch (ex) {
            ex.errMethod = "setGridMode";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    },
    isAZOrderMode: function () {
        try {
            return this.getPreferenceFromStorage(fw.conf.userPreferenceStorageIsAZOrderMode)
        } catch (ex) {
            ex.errMethod = "isAZOrderMode";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, setUIVersion: function (_version) {
        try {
            this.setPreferenceInStorage(fw.conf.userPreferenceStorageSetUIVersion, _version)
        } catch (ex) {
            ex.errMethod = "setUIVersion";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, setAZOrderMode: function (_isAZOrderModeValue) {
        try {
            this.setPreferenceInStorage(fw.conf.userPreferenceStorageIsAZOrderMode,
                _isAZOrderModeValue)
        } catch (ex) {
            ex.errMethod = "setAZOrderMode";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }, getMovieOrderType: function () {
        try {
            if (this.isAZOrderMode() == "true")return fw.conf.getMovieFilterByName;
            return fw.conf.getMovieFilterByDateTime
        } catch (ex) {
            ex.errMethod = "getMovieOrderType";
            ex.errClass = "UserPreferenceStorage";
            fw.err(ex)
        }
    }
});
