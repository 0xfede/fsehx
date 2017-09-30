var chai = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , should = chai.should()
  , MachineX = require('../dist/index').MachineX

chai.use(sinonChai);

describe('fsehx', function() {

  describe('enter', async function() {
    it('should emit events when entering a state', async function() {
      const m = new MachineX({
        start: {}
      });

      let named_pre_entry = sinon.spy();
      let pre_entry = sinon.spy();
      let named_entry = sinon.spy();
      let entry = sinon.spy();
      let named = sinon.spy();

      m.on('start:pre-entry', named_pre_entry);
      m.on('pre-entry', pre_entry);
      m.on('start:entry', named_entry);
      m.on('entry', entry);
      m.on('start', named);

      should.not.exist(m.state);
      await m.enter('start', 'aaa');
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

    it('should emit events when exiting a state', async function() {
      const m = new MachineX({
        start: {},
        end: {}
      }, 'start');

      let named_exit = sinon.spy();
      let exit = sinon.spy();

      m.on('start:exit', named_exit);
      m.on('exit', exit);

      await m.ready;
      await m.enter('end', 'aaa');
      named_exit.should.have.been.calledOnce;
      exit.should.have.been.calledOnce;
      exit.should.have.been.calledWith('start');
    });

  });

});