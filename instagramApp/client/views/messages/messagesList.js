Template.messagesList.helpers({
        messages: function () {
            if (Session.get("hideChecked")) {
                return Messages.find({
                    checked: {
                        $ne: true
                    }
                });
            } else {
                return Messages.find({});
            }
        }
    });

Template.messagesList.events({
    "click .toggle-checked": function(e) {
        Messages.update({
            _id: this._id
        }, {
            $set: {
                checked: e.target.checked
            }
        })
    },
    "click .delete-message": function() {
        Messages.remove({
            _id: this._id
        })
    }
});

Template.body.events({
    "submit #add-message": function(e) {

        event.preventDefault();

        var value = e.currentTarget.getElementsByTagName("input")[0].value;

        Messages.insert({
            name: value,
            checked: false
        });

        e.currentTarget.getElementsByTagName("input")[0].value = "";
    },
    "click .show-checked": function(e) {
        Session.set("hideChecked", e.target.checked);
    }
});

