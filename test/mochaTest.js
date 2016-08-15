﻿// window and document
var jsdom = require('jsdom').jsdom;
window = jsdom().defaultView;
document = window.document;
jQuery = require('jquery');
$ = jQuery;
navigator = window.navigator;

// assertion
chai = require('chai');
assert = chai.assert;
expect = chai.expect;

// library
var bnKeyboardSource = require("../rokeya_layout-4.4.73.js");
var Keyboard = bnKeyboardSource.Keyboard;
var banglaLayout = bnKeyboardSource.banglaLayout;

// preparation (i.e. qunit-fixture)
$("body").append('<textarea style="display:block" id="checkItOut" name="checkItOut"></textarea><input type="text" id="basicUsageEvents" />');

describe('Installation', function () {

    it('should initiate for textarea', function (done) {
        var bnLayout = new banglaLayout("checkItOut").loadHelpTooltip();
        assert.ok(bnLayout != null, "Class initiation failed");
        done();
    });

    it('should initiate for input[type=text]', function (done) {
        var withEvents = {};
        withEvents.beforeKeyEvent = function () { };
        withEvents.afterKeyEvent = function () { };

        var bnLayoutWithEvents = new banglaLayout("basicUsageEvents", withEvents);
        assert.ok(bnLayoutWithEvents != null, "Class initiation failed");

        done();
    });
});

describe('Keyboard Functionality', function () {

    it('Should handle vowel and consonants', function (done) {
        
        var $textarea = $("#checkItOut");
        $textarea.val("");
        var pseudoKeyboard = new Keyboard();

        var event = $.Event("keypress");
        event.keyCode = 65;
        event.which = 65;

        var expectedString = "", msgOnError = "", doAssert = true;

        $textarea.on('keypress', function (keyEvent) {
            var oEvent = window.event || keyEvent;
            var oSource = oEvent.srcElement || oEvent.target;
            pseudoKeyboard.handleKeyboardInput(oEvent, oSource);

            if (doAssert) {
                assert.equal($textarea.val(), expectedString, msgOnError);
            }
        });

        expectedString = 'আ';
        msgOnError = "আ should be inserted initially";
        $textarea.trigger(event);

        expectedString = 'আক';
        msgOnError = "ক should be appended";
        event.keyCode = 75;
        event.which = 75;
        $textarea.trigger(event);

        assert.equal($textarea.val(), expectedString);
        done();
    });
});