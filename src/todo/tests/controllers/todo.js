/* Sample Test */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const expect = chai.expect;
const Task = require('../../models/task');
chai.should();
chai.use(chaiAsPromised);

//TEST DRIVEN DEVELOPMENT
describe('Todo Controller', () => {
  const expectedResult = { status: 201, tasks: [{}], message: '' };

  //Testing if the array has a valid status
  it('should get a valid status', done => {
    const TodoMock = sinon.mock(Task);

    TodoMock.expects('find').yields(null, expectedResult);
    Task.find((err, result) => {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.equal(201);
      done();
    });
  });

  //Testing if the array has at least one value
  it('should return error', done => {
    const TodoMock = sinon.mock(Task);

    TodoMock.expects('find').yields(expectedResult, null);
    Task.find((err, result) => {
      TodoMock.verify();
      TodoMock.restore();
      expect(err.status).to.not.be.true; //This is the actual test
      done();
    });
  });
});
