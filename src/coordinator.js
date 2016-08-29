(function (root, factory) {

	if ( typeof exports === 'object' && typeof module === 'object' )
		module.exports = factory();

	else if ( typeof define === 'function' && define.amd )
		define('Coordinator', [], factory);

	else if ( typeof exports === 'object' )
		exports['Coordinator'] = factory();

	else
		root['Coordinator'] = factory();

})(this, function () {

	'use strict';

	var eventCenter = {};

	var _getSubscribers = function (ev) {
		if ( typeof ev == 'undefined' ) {
			return [];
		}
		
		return eventCenter['ev'];
	};

	var subscribe = function (ev, fn, scope) {
		if ( !eventCenter['ev'] )
			eventCenter['ev'] = [];

		eventCenter['ev'].push({
			fn: fn,
			scp: scope
		});
	};

	return {
		_getSubscribers: _getSubscribers,
		subscribe: subscribe,
	};

});