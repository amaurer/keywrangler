/*Copyright (c) 2014, Andrew Maurer andrew@maurer.me

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/


/* TODO : 
	- Using key object map to give better description to key codes
*/

;(function($){

	$.fn.keyWrangler = function(options){

		// This is the easiest way to have default options.
		var settings = $.extend({
			 navKeyList : [8,9,33,34,35,36,37,38,39,40]	
			,subKeyList : [13]
			,ignoreKeyList : [16,17,18,19,20,45,46,91,92,93,144,145]
			,fKeyList : [112,113,114,115,116,117,118,119,120,121,122,123]
			,keyAction : "keydown"
			,log : false
			,logVerbose : false
			,onFs : function(){}
			,onSubmit : function(){}
			,onNav : function(){}
			,onIgnore : function(){}
			,onType : function(){}
		}, options);


		function keyActionHandler(e){
			var kc = e.keyCode;

			// Matches Key Code
			function is(list, keyCode){
				for (var i = list.length - 1; i >= 0; i--) {
					if(list[i] === keyCode) return true;
				};
				return false;
			};

			if(settings.log || settings.logVerbose){
				console.log(e.keyCode, e.shiftKey, e.altKey, e.ctrlKey, e.metaKey, (settings.logVerbose)? e : null);
			};

			// Filters key code grouping and returns whatever the callback returns
			if( is(settings.fKeyList, kc) ){
				return settings.onFs.call(this, e);

			} else if( is(settings.subKeyList, kc) ){
				return settings.onSubmit.call(this, e);

			} else if( is(settings.navKeyList, kc) ){
				return settings.onNav.call(this, e);

			} else if( is(settings.ignoreKeyList, kc) ){
				return settings.onIgnore.call(this, e);

			} else {
				return settings.onType.call(this, e);

			};
		};


		return this.on(settings.keyAction, keyActionHandler);

	};

}(jQuery));