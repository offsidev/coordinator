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

	/**
	 * Event matrix contains the registered events and subscribed listeners
	 *
	 * @private
	 * @type {Object}
	 */
	var eventCenter = {};

	/**
	 * Returns the subscriber list for the passed-in event
    *
    * @param {String} ev is the event name
    * @return {Array} list of subscribers
    */
	var _getSubscribers = function (ev) {
		return eventCenter[ev] || [];
	};

	/**
  	 * Subscribes a list of listeners to an event
  	 *
  	 * @param {String} ev is the event name
  	 * @param {Array} subscribers
  	 * @return {Array} list of subscribers
  	 */
	var _setSubscribers = function (ev, subscribers) {
		if ( !subscribers instanceof Array )
         return false;
		eventCenter[ev] = subscribers;
	};

	/**
  	 * Checks whether the passed-in event is registered
  	 *
  	 * @param {String} ev is the event name
  	 * @return {Boolean}
  	 */
	var _isEventRegistered = function (ev) {
      return ( typeof eventCenter[ev] != 'undefined' ) ? true : false;
	};

	/**
	 * Removes the passed-in event from the event matrix
	 *
	 * @param {String} ev is the event name
	 */
	var _deRegisterEvent = function (ev) {
      if ( _isEventRegistered(ev) )
         delete eventCenter[ev];
	};

	/**
	 * Subscribes the passed-in function to the passed-in event
	 *
	 * @param {String} ev is the event name
	 * @param {Function} fn listener function
	 * @param {(Object|null)} scope is the scope context of the listener function
	 * @return {(Boolean|Number)}
	 */
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

	/**
	 * Broadcast supplied event to its subscribers with optional data
    *
    * @param {String} ev is the event name
    * @param {*} data
    * @return {Boolean}
    */
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

	/**
	 * Unsubscribes the passed-in function from the passed-in event's list
    *
    * @param {String} ev is the event name
    * @param {Function} fn listener function
    * @param {(Object|null)} scope is the scope context of the listener function
    * @return {Boolean}
    */
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



