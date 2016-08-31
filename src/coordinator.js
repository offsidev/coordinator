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

	var _isEventRegistered = function (ev) {
		return ( typeof eventCenter[ev] != 'undefined' ) ? true : false;
	};

	var _deRegisterEvent = function (ev) {
		if ( _isEventRegistered(ev) )
			delete eventCenter[ev];
	};

	var subscribe = function (ev, fn, scope) {
		var numberOfArguments = arguments.length;	
		if ( numberOfArguments < 2 )
			return false;	
		else {
			if ( typeof ev != 'string' || typeof fn != 'function' )
				return false;
			if ( typeof scope == 'undefined' )
				scope = null;
		}

		if ( !_isEventRegistered(ev) )
			eventCenter[ev] = [];

		return eventCenter[ev].push({
			fn: fn,
			scp: scope
		});
	};

	var broadcast = function (ev, data) {
		if ( !_isEventRegistered(ev) )
			return false;

		var subscribers = _getSubscribers(ev);
		for ( var i = 0; i < subscribers.length; i++ ) {
			if ( typeof data == 'undefined' )
				subscribers[i]['fn'].apply(subscribers[i]['scp']);
			else
				subscribers[i]['fn'].apply(subscribers[i]['scp'], [data]);
		}
		return true;
	};

	var unsubscribe = function (ev, fn, scope) {
		var numberOfArguments = arguments.length;		
		if ( numberOfArguments < 2 )
			return false;		
		else {
			if ( typeof ev != 'string' || typeof fn != 'function' )
				return false;
			if ( typeof scope == 'undefined' )
				scope = null;
		}

		if ( _isEventRegistered(ev) ) {
			var updatedSubscriberList = [],
				subscriberList = _getSubscribers(ev),
				subscriber;

			for (var i = 0; i < subscriberList.length; i++) {
				subscriber = subscriberList[i];
				if ( subscriber['fn'] != fn || subscriber['scp'] != scope )
					updatedSubscriberList.push(subscriber);
			};

			_setSubscribers(ev, updatedSubscriberList);
		}

		return true;
	};

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe,
		broadcast: broadcast,
		_getSubscribers: _getSubscribers,
		_setSubscribers: _setSubscribers,
		_deRegisterEvent: _deRegisterEvent,
	};

});



