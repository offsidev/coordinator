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

			eventX = 'EventX',
			eventY = 'EventY';

		it('should add supplied function to list of subscribers for supplied event', function () {
			
			Coordinator.subscribe(eventX, moduleA.func, moduleA);
			Coordinator.subscribe(eventX, moduleB.func, moduleB);

			expect(Coordinator._getSubscribers(eventX)).to.deep.include({ fn: moduleA.func, scp: moduleA });
			expect(Coordinator._getSubscribers(eventX)).to.deep.include({ fn: moduleB.func, scp: moduleB });

		});

		it('should fail if supplied malformed arguments', function () {
			// console.log( Coordinator.subscribe('string1', function () {}) );
			expect(Coordinator.subscribe(function() {})).to.not.be.ok;
			
			expect(Coordinator.subscribe(2, function() {})).to.not.be.ok;
			expect(Coordinator.subscribe('stringVal', 'stringVal')).to.to.not.be.ok;	
			expect(Coordinator.subscribe('stringVal', function () {})).to.be.ok;

			expect(Coordinator.subscribe('stringVal', function () {}, null, 10)).to.be.ok;			

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