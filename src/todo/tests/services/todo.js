// /* Sample Test */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const TodoService = require('../../services/todo');
const mongoDB = require('../../../loaders/mongoose');

describe('Todo Service', () => {
  const task = { _id: '5d89973cf47adf55979b38c0', title: 'test', content: 'test', __v: 0 };

  before(() => mongoDB.connect());

  it('tasks length should be at least one', async () => {
    const results = await TodoService.getTasks();
    results.length.should.be.least(1);
  });

  it('should resolve', () => {
    return TodoService.getTasks();
  });

  after(() => mongoDB.disconnect());
});
