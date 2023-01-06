const db = require('../db/db.js');
const express = require('express');
const router = express.Router();

router.post('/cards/nextCard/:id', async (req, res, next) => {
  try {
    console.log('just checking');

    const _id = req.params.id;
    const { collection_id } = req.body;
    const row = await db.readCollectionCards(collection_id);
    const ids = row.map((element) => {
      return element._id;
    });

    // console.log('ids', ids)

    let idx = ids.findIndex((element) => {
      return element === Number(_id);
    });

    // console.log('idx', idx)

    const newIdx = (idx + 1) % ids.length;

    // console.log('newIdx', newIdx)

    res.status(200).json(row[newIdx]._id);
  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
});

router.get('/cards/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const row = await db.readCard(_id);
    // no card found
    if (row === undefined) throw `no card with id=${_id} found`;
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error getting single card',
      status: 500,
      message: { err: err },
    });
  }
});

router.get('/cards', async (req, res, next) => {
  try {
    const row = await db.readAllCards();
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error getting cards',
      status: 500,
      message: { err: err },
    });
  }
});

router.post('/cards', async (req, res, next) => {
  try {
    // sanitize post data
    const { title, front, back, difficulty, hints, scheduled, collection_id } = req.body;
    const data = {
      title,
      front,
      back,
      difficulty,
      hints,
      scheduled,
      collection_id,
    };

    console.log('creating data: ', data);
    const row = await db.createCard(data);
    res.status(200).json(row);
  } catch (err) {
    next({
      log: 'error creating card',
      status: 500,
      message: { err: err },
    });
  }
});

router.put('/cards/:id', async (req, res, next) => {
  try {
    const { _id, title, front, back, difficulty, hints, scheduled } = req.body;
    const data = { _id, title, front, back, difficulty, hints, scheduled };

    const row = await db.updateCard(data);
    res.status(200).json(row);
    console.log('updated sucessfully');
    return next();
  } catch (err) {
    next({
      log: 'error updating the card',
      status: 500,
      message: { err: err },
    });
  }
});

router.delete('/cards/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const row = await db.deleteCard(_id);
    if (row === undefined) throw `no card with id=${_id} was not found`;
    res.status(200).json(row);
    console.log('deleted sucessfully');
    return next();
  } catch (err) {
    next({
      log: 'error deleting the card',
      status: 500,
      message: { err: err },
    });
  }
});

router.post('/collections/create', async (req, res, next) => {
  try {
    const { user_id, title } = req.body;
    const data = { user_id, title };
    const row = await db.createCollection(data);
    res.status(200).json(row);
    console.log('created collection successfully');
    return next();
  } catch (err) {
    next({
      log: 'error creating collection',
      status: 500,
      message: { err: err },
    })
  }
});

router.post('/collections', async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const row = await db.readUserCollections(user_id);
    res.status(200).json(row);
    console.log('read collections successfully');
  } catch (err) {
    next({
      log: 'error getting collections',
      status: 500,
      message: { err, err },
    })
  }
})

router.post('/collections/cards', async (req, res, next) => {
  try {
    const { collection_id } = req.body;
    console.log('REQ.BODY FROM COLLECTIONS/CARDS', req.body);
    // console.log('REQUEST OBJECT: ', req);
    const row = await db.readCollectionCards(collection_id);
    res.status(200).json(row);
    console.log('read collection cards successfully');
  } catch (err) {
    next({
      log: 'error getting cards from collection',
      status: 500,
      message: { err },
    });
  }
})

router.delete('/collections', async (req, res, next) => {
  try {
    const { collection_id, user_id } = req.body;
    const row = await db.deleteCollection(collection_id);
    console.log('deleted collection successfully');
    const newColl = await db.readUserCollections(user_id);
    console.log('read user collection after deleted successfully');
    res.status(200).json(newColl);
  } catch (err) {
    next({
      log: 'error deleting collection',
      status: 500,
      message: { err },
    });
  }
})

module.exports = router;
