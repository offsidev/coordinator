var expect = require('chai').expect,
	sinon = require('sinon'),

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

	});

	describe('#broadcast', function () {

		var moduleA = {
				prop: 'A',
				func: function () {}
			},
			moduleB = {
				prop: 'B',
				func: function () {}
			},
			moduleC = {
				prop: 'C',
				func: function () {}
			},
			eventX = 'EventX',
			eventY = 'EventY',

			dataObj = { data: 'value' };

		sinon.spy(moduleA, 'func');
		sinon.spy(moduleB, 'func');
		sinon.spy(moduleC, 'func');

		Coordinator._setSubscribers(eventX, [
			{ fn: moduleA.func, scp: moduleA },
			{ fn: moduleB.func, scp: moduleB }
		]);

		it('should call the subscribed functions with the data broadcasted', function () {
			Coordinator.broadcast(eventX, dataObj);
			
			expect(moduleA.func.calledOnce).to.be.true;
			expect(moduleA.func.calledWithExactly(dataObj)).to.be.true;
			expect(moduleB.func.calledOnce).to.be.true;
			expect(moduleB.func.calledWithExactly(dataObj)).to.be.true;
			expect(moduleC.func.calledOnce).to.be.false;
		});

		it('should call the subscribed functions within the appropriate scope');

	});

	describe('#unsubscribe', function () {
		
		it('should remove the passed in function from the subscriber list of supplied event');

	});

});