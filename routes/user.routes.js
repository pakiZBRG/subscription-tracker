import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({
    message: 'GET all users'
  })
})

userRouter.get('/:id', (req, res) => {
  res.send({
    message: 'GET id user'
  })
})

userRouter.post('/', (req, res) => {
  res.send({
    message: 'POST new user'
  })
})

userRouter.put('/:id', (req, res) => {
  res.send({
    message: 'PUT user'
  })
})

userRouter.delete('/:id', (req, res) => {
  res.send({
    message: 'DELETE user'
  })
})

export default userRouter;
