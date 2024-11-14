import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { getTodosData } from '../../businessLogic/todo.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('getTodosData')

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
  .handler(async (event) => {
    logger.info('Getting: ', event)
    const userId = getUserId(event)
    const todoDatas = await getTodosData(userId)
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todoDatas
      })
    }
  })
