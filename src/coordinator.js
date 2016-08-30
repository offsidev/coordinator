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
		return eventCenter[ev] || [];
	};

	var subscribe = function (ev, fn, scope) {
		var numberOfArguments = arguments.length;
		
		if ( numberOfArguments < 2 )
			return false;
		
		else if ( numberOfArguments == 2 ) {
			if ( typeof ev != 'string' || typeof fn != 'function' )
				return false;
			scope = null;
		}

		if ( !eventCenter[ev] )
			eventCenter[ev] = [];
		
		return eventCenter[ev].push({
			fn: fn,
			scp: scope
		});
	};

	return {
		_getSubscribers: _getSubscribers,
		subscribe: subscribe,
	};

});