var expect = require('chai').expect,
	Coordinator = require('../src/coordinator');

describe('Test Coordinator Module', function () {

	describe('#subscribe', function () {

		var moduleA = {
				prop: 'A',
				func: function () {}
			},

			moduleB = {
				prop: 'B',
				func: function () {}
			},

			ev = 'EventX';

		it('should fail if supplied incorrect arguments');

		it('should add supplied function to list of subscribers for supplied event', function () {
			
			Coordinator.subscribe(ev, moduleA.func, moduleA);

			expect(Coordinator._getSubscribers(ev)).to.deep.include({
				fn: moduleA.func,
				scp: moduleA
			});

		});

		it('should behave properly if the scope argument not supplied');

	});

	describe('#broadcast', function () {
		
		it('should call the subscribed functions with the data broadcasted');
		it('should call the subscribed functions within the appropriate scope');

	});

	describe('#unsubscribe', function () {
		
		it('should remove the passed in function from the subscriber list of supplied event');

	});

});