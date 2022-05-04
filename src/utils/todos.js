import Joi from 'joi'
import { PrismaClient } from '@primsa/client'

const db = new PrismaClient()

import logger from './logger'

const todoSchema = Joi.object({
    text: Joi.string().min(10).required(),
    completed: Joi.boolean().required(),
})

const idSchema = Joi.number().integer().positive().required()

export const getTodos = async (completed = null) => {
    if(completed === null){
        logger.log.success('Getting all todos')
        return await db.todos.findMany()
    }
        logger.log.success('Getting by completion todos')
        
        const isCompleted = completed == 'true' ? true : false

        return await db.todos.findMany({
            where: {
                completed: isCompleted,
            },
        })
}

export const getTodo = async (id) => {
    logger.log.info(`Validating id: ${id}`)
    const {error, value} = idSchema.validate(id)

    if(error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error}
    }
    logger.log.success(`Getting todo with id: ${id}`)
    return await db.todos.findUnique({
        where: {
            id: value,
        },
    })  
}

export const addTodo = async (todo) => {
    logger.log.info(`Validating ${todo} to add`)
    const {error, value} = todoSchema.validate(todo)

    if(error){
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return {error}
    }

    logger.log.success(`Validated: ${todo}`)

    const newTodo = await db.todos.create({
        data:{
            ...value,
        },
        select:{
            id: true,
            text: true,
            completed: true,
        },
    })

    return newTodo
}

export const updateTodo = (id, todo) => {
    logger.log.info(`Validating ${todo} for update`)
    const { error } = todoSchema.validate(todo)
  
    if (error) {
      logger.log.error(new Error(`Validation error: ${error.message}`))
      return { error }
    }
  
    logger.log.success(`Validated: ${todo}`)
    const todoIndex = todos.findIndex((t) => t.id === id)
    todos[todoIndex] = { id, ...todo }
    const updatedTodo = todos[todoIndex]
    return { updatedTodo }
  }


