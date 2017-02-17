var chai = require('chai')
  , spies = require('chai-spies')
  , should = chai.should()
  , MachineX = require('../dist/index').MachineX

chai.use(spies);

describe('fsehx', function() {

  describe('enter', function() {
    it('should emit events when entering a state', function() {
      var m = new MachineX({
        start: {}
      });

      var named_pre_entry = chai.spy();
      var pre_entry = chai.spy();
      var named_entry = chai.spy();
      var entry = chai.spy();
      var named = chai.spy();

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
        named_pre_entry.should.have.been.called.once();
        pre_entry.should.have.been.called.once.with('start', 'aaa');
        named_entry.should.have.been.called.once();
        entry.should.have.been.called.once.with('start', 'aaa');
        named.should.have.been.called.once();
      });
    });

    it('should emit events when exiting a state', function() {
      var m = new MachineX({
        start: {},
        end: {}
      }, 'start');

      var named_exit = chai.spy();
      var exit = chai.spy();

      m.on('start:exit', named_exit);
      m.on('exit', exit);

      m.ready.then(function() {
        return m.enter('end', 'aaa').then(function() {
          named_exit.should.have.been.called.once();
          exit.should.have.been.called.once.with('start', 'aaa');
        });
      });
    });

  });

});