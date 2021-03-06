﻿var ModelView = function () {
    var self = this;

    self.result = ko.observableArray();
    self.orderBy = "";

    self.sortByColumn = function (col) {
        if (self.orderBy == col) {

            self.result.reverse();

        } else {

            self.result.sort(function (left, right) {
                return left[col] == right[col] ? 0 : (left[col] < right[col] ? -1 : 1);
            });

            self.orderBy = col;
        }
    };
};

var vm = new ModelView();

$(function () {
    ko.applyBindings(vm);

    $("#NicknameQuery").keyup(function () {
        if ($(this).val().length > 0) {
            $("#ajax-loader").removeClass("hidden");

            $.getJSON("/Api/Users/", { query: $(this).val() }, function (data) {
                vm.result(data);
                $("#ajax-loader").addClass("hidden");
            });
        } else {
            vm.result([]);
        }
    });

    $(window).bind("pageshow", function () {
        $("#NicknameQuery").val("");
    });
});