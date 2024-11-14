import * as uuid from 'uuid'
import { TodosAccess } from '../dataLayer/todoAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const todoAccess = new TodosAccess()
const logger = createLogger('TodosAccess')
export const createTodo = async (newTodoData, userId) => {
  const s3_env = process.env.TODOS_S3_BUCKET
  const { name, dueDate } = newTodoData
  logger.info('Process Create Todo Data is called', process.env.TODOS_S3_BUCKET)
  const todoId = uuid.v4()
  return await todoAccess.createData({
    todoId,
    name: name,
    userId,
    dueDate: dueDate,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: `https://${s3_env}.s3.amazonaws.com/${todoId}`
  })
}

export const updateData = async (updateTodoData, todoId, userId) => {
  const { name, dueDate, done } = updateTodoData
  logger.info('Process Update Todo Data is called')
  return await todoAccess.updateData({
    todoId,
    name: name,
    dueDate: dueDate,
    done: done,
    userId
  })
}

export const deleteData = async (todoId, userId) =>
  await todoAccess.deleteData(todoId, userId)

export const getTodosData = async (userId) =>
  await todoAccess.getListOfTodo(userId)
