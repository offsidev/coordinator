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

	//

});