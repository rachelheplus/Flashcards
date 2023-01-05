const obj = require('../src/db/db.js');

describe('db.js SQL test', () => {
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

  describe('Cards table test', () => {
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
      expect(result.scheduled instanceof Date).toBe(true);
      expect(result.back).toBe('back');
      expect(result.front).toBe('front');
      expect(result.difficulty).toBe(0);
      expect(result.hints).toBe('hints');
      expect(typeof result._id).toBe('number');
      expect(result).not.toBeInstanceOf(Error);
    });

    it('reads newly created card', async () => {
      const result = await obj.readCard(id);
      expect(result.scheduled instanceof Date).toBe(true);
      expect(result.back).toBe('back');
      expect(result.front).toBe('front');
      expect(result.difficulty).toBe(0);
      expect(result.hints).toBe('hints');
      expect(typeof result._id).toBe('number');
      expect(result).not.toBeInstanceOf(Error);
    });

    it('reads all cards in db', async () => {
      const result = await obj.readAllCards();
      expect(result.length).toBe(1);
    });

    it('updates a card in db', async () => {
      const result = await obj.updateCard();
      expect(result.length).toBe(1);
    });
  });
});
