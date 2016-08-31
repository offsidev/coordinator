var expect = require('chai').expect,
	sinon = require('sinon'),

	Coordinator = require('../src/coordinator');

describe('Test Coordinator Module', function () {

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
		eventZ = 'EventZ',
		dataObj = { data: 'value' };

	describe('#subscribe', function () {

		it('should return false if supplied malformed arguments.', function () {
			expect(Coordinator.subscribe(function() {})).to.not.be.ok;
			expect(Coordinator.subscribe(2, function() {})).to.not.be.ok;
			expect(Coordinator.subscribe('stringVal', 'stringVal')).to.to.not.be.ok;	
			expect(Coordinator.subscribe('stringVal', function () {})).to.be.ok;
			expect(Coordinator.subscribe('stringVal', function () {}, null, 10)).to.be.ok;
		});

		it('should add supplied function to list of subscribers for supplied event.', function () {
			
			Coordinator.subscribe(eventX, moduleA.func, moduleA);
			Coordinator.subscribe(eventX, moduleB.func, moduleB);

			expect(Coordinator._getSubscribers(eventX)).to.deep.include({ fn: moduleA.func, scp: moduleA });
			expect(Coordinator._getSubscribers(eventX)).to.deep.include({ fn: moduleB.func, scp: moduleB });

		});

	});

	describe('#broadcast', function () {

		beforeEach(function () {
			sinon.spy(moduleA, 'func');
			sinon.spy(moduleB, 'func');
			sinon.spy(moduleC, 'func');
			dummyFunc = sinon.spy();
			Coordinator._setSubscribers(eventX, [
				{ fn: moduleA.func, scp: moduleA },
				{ fn: moduleB.func, scp: moduleB }
			]);
			Coordinator._setSubscribers(eventY, [
				{ fn: dummyFunc, scp: null}
			]);
		});

		afterEach(function () {
			moduleA.func.restore();
			moduleB.func.restore();
			moduleC.func.restore();
			dummyFunc.reset();
			Coordinator._deRegisterEvent(eventX);
			Coordinator._deRegisterEvent(eventY);
		});

		it('should call the subscribed functions with the data broadcasted.', function () {
			Coordinator.broadcast(eventX, dataObj);
			
			expect(moduleA.func.called).to.be.true;
			expect(moduleA.func.calledWithExactly(dataObj)).to.be.true;
			expect(moduleB.func.called).to.be.true;
			expect(moduleB.func.calledWithExactly(dataObj)).to.be.true;
			expect(moduleC.func.called).to.be.false;
		});

		it('should call the subscribed functions with no args if no data supplied', function () {
			Coordinator.broadcast(eventX);

			expect(moduleA.func.called).to.be.true;
			expect(moduleA.func.lastCall.args.length).to.equal(0);
		});

		it('should call the subscribed functions on the registered scope.', function () {
			Coordinator.broadcast(eventX, dataObj);
			expect(moduleA.func.calledOn(moduleA)).to.be.true;
			expect(moduleB.func.calledOn(moduleB)).to.be.true;

			Coordinator.broadcast(eventY);
			expect(dummyFunc.calledOn(null)).to.be.true;
		});

		it('should return false if event is not registered.', function () {
			expect(Coordinator.broadcast('eventZ', 'some data')).to.be.false;
		});

	});
	
	describe('#unsubscribe', function () {

		beforeEach(function () {
			sinon.spy(moduleA, 'func');
			sinon.spy(moduleB, 'func');
			Coordinator._setSubscribers(eventX, [
				{ fn: moduleA.func, scp: moduleA },
				{ fn: moduleB.func, scp: moduleB }
			]);
		});

		afterEach(function () {
			moduleA.func.restore();
			moduleB.func.restore();
			Coordinator._deRegisterEvent(eventX);
		});

		it('should return false if supplied malformed arguments.', function () {
			expect(Coordinator.unsubscribe(function() {})).to.not.be.ok;		
			expect(Coordinator.unsubscribe(2, function() {})).to.not.be.ok;
			expect(Coordinator.unsubscribe('stringVal', 'stringVal')).to.to.not.be.ok;	
			expect(Coordinator.unsubscribe('stringVal', function () {})).to.be.ok;
			expect(Coordinator.unsubscribe('stringVal', function () {}, null, 10)).to.be.ok;
		});

		it('should remove the unsubscribing function from the subscriber list of supplied event.', function () {
			Coordinator.unsubscribe(eventX, moduleA.func, moduleA);
			expect(Coordinator._getSubscribers(eventX))
				.to.not.deep.include({ fn: moduleA.func, scp: moduleA });
			expect(Coordinator._getSubscribers(eventX))
				.to.deep.include({ fn: moduleB.func, scp: moduleB });
		});

		it('should not call unsubscribed function upon event broadcasting.', function () {
			Coordinator.unsubscribe(eventX, moduleA.func, moduleA);
			Coordinator.broadcast(eventX, 'some data');

			expect(moduleA.func.called).to.be.false;
			expect(moduleB.func.called).to.be.true;
		});

	});

});



