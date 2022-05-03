import { Router } from 'express'
import { getTodos } from '../../utils/todos'

const router = Router()

router.get('/', (req, res) => {
    const todos = getTodos()
    res.send(todos)
})

export default router