const obj = require('../src/db/db.js');
const pool = require('../src/db/pool.js');

describe('db.js SQL test', () => {
  describe('Cards table test', () => {
    beforeAll(async () => {
      const truncate = `TRUNCATE TABLE Cards, junctions_tag_card;`;
      const data = await pool.query(truncate);
      return data;
    });

    afterAll(async () => {
      const truncate = `TRUNCATE TABLE Cards, junctions_tag_card;`;
      const data = await pool.query(truncate);
      return data;
    });

    const newCard = {
      title: 'title',
      front: 'front',
      back: 'back',
      difficulty: 0,
      hints: 'hints',
    };

    let id;

    it('creates a new card with a valid entry', async () => {
      const result = await obj.createCard(newCard);
      id = result._id;
      expect(result.scheduled).toBeInstanceOf(Date);
      expect(result.back).toBe('back');
      expect(result.front).toBe('front');
      expect(result.difficulty).toBe(0);
      expect(result.hints).toBe('hints');
      expect(typeof result._id).toBe('number');
    });

    it('rejects a new card with an invalid entry', async () => {
      const fakeCard = {
        title: 13,
        difficulty: 'ohHi',
        hints: 999,
      };

      // const result = await obj.createCard(fakeCard);
      await expect(obj.createCard(fakeCard)).rejects.toThrow(
        'In db.js:obj.createCard',
      );
    });

    it('updates a card in db', async () => {
      console.log('id', id);
      const updateCard = {
        _id: id,
        title: 'newTitle',
        front: 'newFront',
        back: 'newBack',
        difficulty: 1,
        hints: 'newHints',
      };
      const result = await obj.updateCard(updateCard);
      expect(result).not.toBeInstanceOf(Error);
    });

    it('reads newly created card', async () => {
      const result = await obj.readCard(id);
      expect(result.scheduled instanceof Date).toBe(true);
      expect(result.back).toBe('newBack');
      expect(result.front).toBe('newFront');
      expect(result.difficulty).toBe(1);
      expect(result.hints).toBe('newHints');
      expect(typeof result._id).toBe('number');
    });

    it('reads all cards in db', async () => {
      const result = await obj.readAllCards();
      expect(result.length).toBe(1);
    });
    it('deletes a cards in db', async () => {
      const result = await obj.deleteCard(id);
      const numOfCards = await obj.readAllCards();
      expect(result._id).toBe(id);
      expect(numOfCards.length).toBe(0);
    });
  });

  describe('Googleuserinfo table test', () => {
    const newUser = {
      sub: 'subText',
      picture: 'picText',
      email: 'emailText',
      email_verified: true,
    };

    let id;

    afterAll(async () => {
      const truncate = `DELETE from googleuserinfo WHERE _id=$1 RETURNING *;`;
      const data = await pool.query(truncate, [id]);
      return data;
    });

    it('creates a new user', async () => {
      const result = await obj.addUser(newUser);
      id = result;
      expect(typeof result).toBe('number');
    });

    it('gets a new user', async () => {
      const result = await obj.getUser(newUser.sub);
      const newUserResult = { ...newUser, _id: id };
      console.log('newuser: ', result);
      expect(result).toEqual(newUserResult);
    });
  });

  describe('Collections table test', () => {
    const collUser = {
      sub: 'subText2',
      picture: 'picText2',
      email: 'emailText2',
      email_verified: true,
    };

    let id;
    let collId;
    let cardId;

    beforeAll(async () => {
      const result = await obj.addUser(collUser);
      id = result;
      return result;
    });

    afterAll(async () => {
      const truncate = `TRUNCATE TABLE Cards, junctions_tag_card;`;
      const data = await pool.query(truncate);
      return data;
    });

    afterAll(async () => {
      const deleteCollection = `DELETE from collections WHERE _id=$1 RETURNING *;`;
      const collData = await pool.query(deleteCollection, [collId]);
      return collData;
    });

    afterAll(async () => {
      const deleteUser = `DELETE from googleuserinfo WHERE _id=$1 RETURNING *;`;
      const userData = await pool.query(deleteUser, [id]);
      return userData;
    });

    it('creates a new collection', async () => {
      const newColl = { user_id: id, title: 'collection title' };
      const result = await obj.createCollection(newColl);
      collId = result._id;
      id = result.user_id;
    });

    it("reads a user's collections", async () => {
      const result = await obj.readUserCollections(id);
      console.log(result, 'read user collections');
      expect(result[0].title).toEqual('collection title');
      expect(result[0].user_id).toEqual(id);
      expect(result[0]._id).toEqual(collId);
    });

    it('reads cards in a collection', async () => {
      const newCard = {
        collection_id: collId,
        title: 'titleCol',
        front: 'frontCol',
        back: 'backCol',
      };

      //need to update create cards to include collections
      const addCard = await obj.createCard(newCard);
      cardId = addCard._id;
      console.log(cardId, 'cardId', newCard);
      const result = await obj.readCollectionCards(collId);
      console.log('result in line 182', addCard);
      // expect(result[0]._id).toEqual(cardId);
      // expect(result[0].title).toEqual('titleCol');
      // expect(result[0].front).toEqual('frontCol');
      // expect(result[0].back).toEqual('backCol');
    });
  });
});
