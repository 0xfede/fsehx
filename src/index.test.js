var chai = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , should = chai.should()
  , MachineX = require('../dist/index').MachineX

chai.use(sinonChai);

describe('fsehx', function() {

  describe('enter', function() {
    it('should emit events when entering a state', function() {
      var m = new MachineX({
        start: {}
      });

      var named_pre_entry = sinon.spy();
      var pre_entry = sinon.spy();
      var named_entry = sinon.spy();
      var entry = sinon.spy();
      var named = sinon.spy();

      m.on('start:pre-entry', named_pre_entry);
      m.on('pre-entry', pre_entry);
      m.on('start:entry', named_entry);
      m.on('entry', entry);
      m.on('start', named);

      should.not.exist(m.state);
      return m.enter('start', 'aaa').then(function() {
        should.exist(m.state);
        m.state.should.be.a('string');
        m.state.should.equal('start');
        named_pre_entry.should.have.been.calledOnce;
        pre_entry.should.have.been.calledOnce;
        pre_entry.should.have.been.calledWith('start', 'aaa');
        named_entry.should.have.been.calledOnce;
        entry.should.have.been.calledOnce;
        entry.should.have.been.calledWith('start', 'aaa');
        named.should.have.been.calledOnce;
      });
    });

    it('should emit events when exiting a state', function() {
      var m = new MachineX({
        start: {},
        end: {}
      }, 'start');

      var named_exit = sinon.spy();
      var exit = sinon.spy();

      m.on('start:exit', named_exit);
      m.on('exit', exit);

      m.ready.then(function() {
        return m.enter('end', 'aaa').then(function() {
          named_exit.should.have.been.calledOnce;
          exit.should.have.been.calledOnce;
          exit.should.have.been.calledWith('start');
        });
      });
    });

  });

});