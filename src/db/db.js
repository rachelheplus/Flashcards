const pool = require('./pool.js');

const obj = {};

//readCard is going to read info of a single flashcard
obj.readCard = async (id) => {
  try {
    const sql = `SELECT *
    FROM Cards
    WHERE _id=$1;`;
    const data = await pool.query(sql, [id]);
    // TODO: validate that there is only one row
    return data.rows[0];
  } catch (err) {
    throw new Error(`In db.js:obj.readCard: ${err.message}`);
  }
};

//readAllCards is going to read info of all cards in the database
obj.readAllCards = async () => {
  try {
    const sql = `SELECT *
    FROM Cards;`;
    const data = await pool.query(sql);
    return data.rows;
  } catch (err) {
    throw new Error(`In db.js:obj.readAllCards: ${err.message}`);
  }
};

//createCard is going to create a new flashcard with provided arguments
obj.createCard = async (args) => {
  try {
    // this is the current time in format 2022-12-28 12:34:56
    const currentTime = new Date();
    const formattedTime = currentTime
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    // parameterize sql arguments to prevent attacks
    const arr = [
      args['title'],
      args['front'],
      args['back'],
      Number(args['difficulty']),
      args['hints'],
      args['scheduled'] === undefined ? formattedTime : args['scheduled'], // args['scheduled'] should have format 2022-12-28 12:34:56
    ];

    const sql = `INSERT INTO Cards
    (title, front, back, difficulty, hints, scheduled)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;
    // execute sql command
    const data = await pool.query(sql, arr);
    return data.rows[0];
  } catch (err) {
    throw new Error(`In db.js:obj.createCard: ${err.message}`);
  }
};

//updateCard is to update specific flashcard info
obj.updateCard = async (args) => {
  try {
    // console.log('checking for update');
    const selectUserSQL = ` SELECT * FROM Cards WHERE _id=$1`;
    const data1 = await pool.query(selectUserSQL, [Number(args['_id'])]);
    console.log('data1', data1.rows[0]);

    const arr = [
      Number(args['_id']),
      args['title'] === undefined ? data1.rows[0].title : args['title'],
      args['front'] === undefined ? data1.rows[0].front : args['front'],
      args['back'] === undefined ? data1.rows[0].back : args['back'],
      Number(args['difficulty']) === undefined
        ? data1.rows[0].difficulty
        : args['difficulty'],
      args['hints'] === undefined ? data1.rows[0].hints : args['hints'],
      args['scheduled'] === undefined
        ? data1.rows[0].scheduled
        : args['scheduled'],
    ];
    const updateUserSQL = ` UPDATE Cards
    SET title = $2,
    front = $3,
    back = $4,
    difficulty = $5,
    hints = $6,
    scheduled = $7
    WHERE _id = $1`;

    const data2 = await pool.query(updateUserSQL, arr);
  } catch (err) {
    throw new Error(`In db.js: obj.updateCard: ${err.message}`);
  }
};

//deleleCard is to delete a flashcard by its id provided
obj.deleteCard = async (id) => {
  try {
    sql = `DELETE FROM Cards WHERE _id=$1 RETURNING *`;
    const data = await pool.query(sql, [id]);
    return data.rows[0];
  } catch (err) {
    throw new Error(`In db.js: obj.deleteCard: ${err.message}`);
  }
};

obj.addUser = async (args) => {
  try {
    const arr = [
      args['sub'],
      args['picture'],
      args['email'],
      args['email_verified'],
    ];
    const sql = `INSERT INTO GoogleUserInfo
    (sub, picture, email, email_verified)
    VALUES ($1, $2, $3, $4)
    RETURNING _id;`;
    const data = await pool.query(sql, arr);
    console.log(data.rows);
    return data.rows[0]._id;
  } catch (err) {
    console.log('addUser', err);
  }
};

obj.getUser = async (sub) => {
  console.log('sub in db: ', sub);
  try {
    const sql = `SELECT *
    FROM GoogleUserInfo
    WHERE GoogleUserInfo.sub=$1`;
    const data = await pool.query(sql, [sub]);
    if (data.rows.length === 0) {
      return null;
    } else if (data.rows.length === 1) {
      return data.rows[0];
    } else {
      console.warn('more than one user found');
      throw new Error('');
    }
  } catch {
    console.log('crash in db.getUser');
  }
};

obj.createCollection = async (args) => {
  try {
    const currentTime = new Date();
    const formattedTime = currentTime
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const arr = [args['user_id'], args['title']];

    const sql = `INSERT INTO Collections
    (user_id, title)
    VALUES ($1, $2)
    RETURNING *;`;

    const data = await pool.query(sql, arr);
    return data.rows[0];
  } catch (err) {
    throw new Error(`In db.js:obj.createCollection': ${err}`);
  }
};

obj.readUserCollections = async (user_id) => {
  try {
    const sql = `SELECT *
    from Collections
    WHERE user_id=$1;`;
    const data = await pool.query(sql, [user_id]);
    return data.rows;
  } catch (err) {
    throw new Error(`In db:js:obj.readUserCollections: ${err.message}`);
  }
};

obj.readCollectionCards = async (collection_id) => {
  try {
    const sql = `SELECT *
    from Cards
    WHERE collection_id=$1;`;
    const data = await pool.query(sql, [collection_id]);
    return data.rows;
  } catch (err) {
    throw new Error(`In db:js:obj.readCollectionCards: ${err.message}`);
  }
};

module.exports = obj;
