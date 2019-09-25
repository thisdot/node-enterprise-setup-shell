/* Sample Test */

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
  //beforeEach

  it('tasks length should be at least one', async () => {
    const results = await TodoService.getTasks();
    results.tasks.length.should.be.least(1);
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

//Parte 1 inicializar servicio para gente desde 0 en enterprise (bbay steps un titutlo catchy)
//Parte 2 Servicio para auth y otro para todos y que ellos se comuniquen
//Loggers, service discovery (que servicios estan corriendo en que ip y puerto), messaging, api gateway, domain driven design
//Lynda Microservicos en node
