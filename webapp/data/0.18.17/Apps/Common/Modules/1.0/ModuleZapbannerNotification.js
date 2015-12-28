var ModuleZapbannerNotification = Class.create(Module, {
    initialize: function ($super, _parent, _prop, _modConf) {
        try {
            $super(_parent, _prop);
            this.prop = _prop;
            this.conf = _modConf;
            this.notificationIconMail = cssUtil.addElementToDom(Image, "notificationIconMail", this.conf.notificationIconMail, this.getModObj());
            this.notificationIconMail.setUrl("./Apps/Common/Resources/Images/1.0/mail.png");
            this.notificationIconRedButton = cssUtil.addElementToDom(Image, "notificationIconRedButton", this.conf.notificationIconRedButton, this.getModObj());
            this.notificationIconRedButton.setUrl("./Apps/Common/Resources/Images/1.0/help/nav_colorbutton_red.png");
            this.notificationNewMsgText = cssUtil.addElementToDom(Text, "notificationNewMsgText", this.conf.notificationNewMsgText, this.getModObj());
            this.notificationNewMsgText.setTxt(_parent.appObj.messages.notificationNewMsgText);
            this.notificationNewMsgText.setX(169);
            this.notificationHelpMsgText = cssUtil.addElementToDom(Text, "notificationHelpMsgText", this.conf.notificationHelpMsgText, this.getModObj());
            this.notificationHelpMsgText.setTxt(_parent.appObj.messages.notificationHelpMsgText);
            this.notificationHelpMsgText.setX(227);
            this.notificationHelpMsgText.setY(69);
            fw.log.info("entered")
        } catch (ex) {
            ex.errMethod = "initialize";
            ex.errClass = "ModuleZapbannerNotification";
            fw.err(ex)
        }
    }
});
