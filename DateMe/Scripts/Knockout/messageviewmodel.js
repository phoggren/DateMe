﻿var MessageViewModel = function() {
    var self = this;

    self.messages = ko.observableArray([]);
    self.messageText = ko.observable();

    self.toRelativeTime = function(dateObj) {
        return moment(dateObj).fromNow();
    };

    self.sendMessage = function(toUserId) {
        $.post("/api/messages/?toUserId=" + toUserId, { Text: self.messageText() }, function(data) {
            $("#send-message-form").fadeOut(function() {
                $("#send-message-title").text("Your message has been sent!");
            });
        });
    }

    self.removeMessage = function(message) {
        modalConfirm(function() {
            $.ajax({
                type: "DELETE",
                url: "/api/messages/" + message.Id,
                contentType: "application/json",
                success: function() {
                    self.messages.remove(message);
                },
                error: function() {
                    alert("Det gick inte att ta bort detta meddelande");
                }
            });
        });
    }
};

var messageVm = new MessageViewModel();

$(function() {
    ko.applyBindings(messageVm, document.getElementById('messages'));

    $("#ajax-loader").removeClass('hidden');
    $.getJSON("/Api/Messages/", function(data) {
        messageVm.messages(data);
        messageVm.messages.reverse();
        $("#ajax-loader").addClass('hidden');
    });
});
