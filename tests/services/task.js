/* Sample Test */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const TodoService = require('../../src/services/todo');
const mongoDB = require('../../src/loaders/mongoose');

describe('Todo Service', () => {
  const task = { _id: '5d89973cf47adf55979b38c0', title: 'test', content: 'test', __v: 0 };

  before(() => mongoDB.connect());

  it('tasks length should be at least one', async () => {
    const results = await TodoService.getTasks();
    results.tasks.length.should.be.least(1);
    if (results.task === 0) {
      throw new Error('No data!');
    }
  });

  it('should resolve', () => {
    return TodoService.getTasks();
  });

  it('should get proper task by ID', async () => {
    const result = await TodoService.getTasksById(task._id);
    const id = result.task._doc._id.toString();
    id.should.equal(task._id);
    Object.keys(result.task._doc).length.should.equal(4);
  });

  it('full fills the promise with the correct task', async () => {
    const result = await TodoService.getTasksById(task._id);
    result.task._doc._id = result.task._id.toString();
    result.task._doc.should.eql(task);
  });

  after(() => mongoDB.disconnect());
});
