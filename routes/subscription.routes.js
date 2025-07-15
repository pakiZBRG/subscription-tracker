import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send({message: 'Get all subscription'})
})

subscriptionRouter.get('/:id', (req, res) => {
  res.send({message: 'Get subscription details'})
})

subscriptionRouter.post('/', (req, res) => {
  res.send({message: 'Create subscription'})
})

subscriptionRouter.put('/:id', (req, res) => {
  res.send({message: 'Update subscription'})
})

subscriptionRouter.delete('/:id', (req, res) => {
  res.send({message: 'Delete subscription'})
})

subscriptionRouter.get('/user/:id', (req, res) => {
  res.send({message: 'Get users subscription'})
})

subscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({message: 'Cancel a subscription'})
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({message: 'GET upcoming renewals'})
})

export default subscriptionRouter
