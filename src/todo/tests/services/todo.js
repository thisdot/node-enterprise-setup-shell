/* Todo Service Test */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const TodoService = require('../../services/todo');
const mongoDB = require('../../../loaders/mongoose');

describe('Todo Service', () => {});
