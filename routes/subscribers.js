const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscribers');
const mongoose = require('mongoose');

// Getting  all
router.get('/', async (req, res) => {
   try {
      const subscribers = await Subscriber.find();
      res.status(200).json(subscribers);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
   console.log(Object.getPrototypeOf(res.subscriber));
   res.status(200).json(res.subscriber);
});

// Creating one
router.post('/', async (req, res) => {
   const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel,
   });
   try {
      const createdSubscriber = await subscriber.save();
      res.status(201).json(createdSubscriber);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
   if (req.body.name != null) {
      res.subscriber.name = req.body.name;
   }
   if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
   }
   try {
      const updatedSubscriber = await res.subscriber.save();
      res.status(200).json(updatedSubscriber);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
   try {
      await res.subscriber.remove();
      res.json({ message: 'Subscriber deleted !!!' });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// function acting like middleware
async function getSubscriber(req, res, next) {
   let subscriber;
   try {
      let subscriberId = mongoose.Types.ObjectId(req.params.id);
      subscriber = await Subscriber.findById(subscriberId);
      if (subscriber == null) {
         return res.status(404).json({ message: 'Cannot find subscriber !!!' });
      }
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
   res.subscriber = subscriber;
   next();
}

module.exports = router;
