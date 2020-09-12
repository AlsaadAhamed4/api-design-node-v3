/* eslint-disable prettier/prettier */
import { Router } from 'express'

const controller = (req, res) => {
    res.send({ message: "hello" });
}

const router = Router()
// /api/item

router
    .route('/')
    .get(controller)
    .post(controller)

router
    .route('/:id')
    .put(controller)
    .delete(controller)
    .get(controller)


export default router
