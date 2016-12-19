// ==UserScript==
// @id             iitc-plugin-myplugin@hayeswise
// @name           IITC plugin: My Plugin
// @category       Info
// @version        1.2016.12.16
// @namespace      https://github.com/hayeswise/iitc-myplugin
// @description    Plugin description goes here.
// @updateURL      https://github.com/hayeswise/myplugin/raw/master/myplugin.user.js
// @downloadURL	   https://github.com/hayeswise/myplugin/raw/master/myplugin.user.js
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @author         Hayeswise
// @grant          none
// ==/UserScript==
// - The above section is the metadata block used by Tampermonkey and Greasemonkey.
// The values for the include and match keys can be left as is.  Be sure to change
// the other key values to be specific to your plugin and plugin version.  Some of
// the values will be listed in the "IITC About" dialog.
// - Following two lines are optional
// MIT License, Copyright (c) 2016 Brian Hayes ("Hayeswise")
// For more information, visit https://github.com/hayeswise/myplugin

//
// Standard IITC wrapper pattern (and JavaScript encapsulation pattern).
// See last three lines of this file where it is used.
//
function wrapper(plugin_info) {
    // Define the base plugin object if IITC is not already loaded.
    if (typeof window.plugin !== "function") {
        window.plugin = function () {};
    }

	// You will see the following PLUGIN AUTHORS lines in plugins built using the IITC build environemnt.
	// They are not needed to get your plugin to be listed in the 'About IITC' dialog.
	//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
	//(leaving them in place might break the 'About IITC' page or break update checks)
	//plugin_info.buildName = 'iitc';
	//plugin_info.dateTimeVersion = '20161003.4740';
	//plugin_info.pluginId = 'someid';
	//END PLUGIN AUTHORS NOTE

    // Base context for plugin (required).
    window.plugin.myplugin = function () {};
    //Sample plugin property/attribute.
    window.plugin.myplugin.message = "Hello!";
    //
    // Sample plugin method.  This one opens an IITC dialog.
    //
    window.plugin.myplugin.helloDialog = function () {
        var html;
        html = '<div>' + window.plugin.myplugin.message + '</div>';
        dialog({
            html: html,
            id: 'myplugin-hello',
            dialogClass: 'ui-dialog-aboutIITC',
            title: 'My Plugin'
        });
    };
    //
    // Setup function called by IITC.
    //
    window.plugin.myplugin.setup = function init() { // If your setup is named something else, change the assignment in var setup = ... below.
		// So our sample plugin does something, add HTML for Hello link/control in the IITC right hand side toolbox.
		var controlsHTML = '<a id="myPluginOpenHello" onclick="window.plugin.myplugin.helloDialog();false;" title="Click to for Hello.">My Plugin</a>';
        $("#toolbox").append(controlsHTML);

		// Delete setup function so that it is not run again.
        delete self.setup;
    };

	// Set a setup.info property. The data will be used in the About IITC dialog in the section listing the
	// installed plugins.  The plugin_info comes from the Tampermonkey/Greasemonkey comments at the top of
	// this file and is passed into the wrapper function when the script is added to the web page, below.
    var setup = window.plugin.myplugin.setup; // Set setup the plugin's setup/init method.
	setup.info = plugin_info;

    // IITC plugin setup.
    if (window.iitcLoaded && typeof setup === "function") {
        setup();
    } else if (window.bootPlugins) {
        window.bootPlugins.push(setup);
    } else {
        window.bootPlugins = [setup];
    }
}

//
// Add script to the web page.  This is boilerplate and is typically not changed.
//
// 1.  Get info from Tampermonkey/Greasemonkey related headers.
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script={version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description};
// 2.  Add new script elemement to page.
var script = document.createElement("script");
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
