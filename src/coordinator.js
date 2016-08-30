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
		return eventCenter[ev] || [];
	};

	var _setSubscribers = function (ev, subscribers) {
		if ( !subscribers instanceof Array )
			return false;
		eventCenter[ev] = subscribers;
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

	var broadcast = function (ev, data) {
		var subscribers = _getSubscribers(ev);
		for ( var i = 0; i < subscribers.length; i++ ) {
			if ( typeof data == 'undefined' )
				subscribers[i]['fn'].apply(subscribers[i]['scp']);
			else
				subscribers[i]['fn'].apply(subscribers[i]['scp'], [data]);
		}
	};

	var unsubscribe = function (ev, fn) {

	};

	return {
		_getSubscribers: _getSubscribers,
		_setSubscribers: _setSubscribers,
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		broadcast: broadcast
	};

});



