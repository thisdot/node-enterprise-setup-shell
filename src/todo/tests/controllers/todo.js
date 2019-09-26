/* Sample Test */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

const expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);
require('sinon-mongoose');

const todoController = require('../../controllers/todoController');
const Task = require('../../models/task');
const mongoDB = require('../../../loaders/mongoose');

describe('Todo Controller', () => {
  const task = { _id: '5d89973cf47adf55979b38c0', title: 'test', content: 'test', __v: 0 };
  const expectedResult = { status: 201, tasks: [{}], message: '' };
  let res, req;
  before(() => mongoDB.connect());
  beforeEach(function() {
    res = {
      ...expectedResult
    };
  });

  it('shoudl get a valid status', done => {
    const TodoMock = sinon.mock(Task);

    TodoMock.expects('find').yields(null, expectedResult);
    Task.find((err, result) => {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.equal(201);
      done();
    });
  });

  it('should at least task have one object', done => {
    const TodoMock = sinon.mock(Task);

    TodoMock.expects('find').yields(null, expectedResult);
    Task.find((err, result) => {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.tasks.length).to.be.least(1);
      done();
    });
  });

  afterEach(() => {
    mongoDB.disconnect();
  });
});
