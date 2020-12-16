const db = require('../../../data/db-config');

module.exports = {
    find,
    findById,
    findBy,
    findRecipe,
    add,
    update,
    remove
}


async function find() {
    try {
        return await db('users');
    } catch (err) {
        throw err;
    }
}

async function findById(id) {
    try {
        const user = await db('users').where({ id }).first();
        return user;
    } catch (err) {
        throw err;
    }
}



async function findBy(filter) {
    return db("users").where(filter).orderBy("id");
  }


async function findRecipe(id) {
    try {
        const article = await
            db('recipe-update as r')
                .join('users as u', 'u.id', 'r.user_id')
                .where({ user_id: id })
                .select('r.id', 'u.username', 'r.title', 'r.ingredients', 'r.instructions', 'r.tags');

        return article;
    } catch (err) {
        throw err;
    }
}

async function add(userData) {
    try {
        const ids = await db('users').insert(userData);
        const newUser = await findById(ids[0]);
        return newUser;
    } catch (err) {
        throw err;
    }
}

async function update(id, changes) {
    try {
        await db('users').where({ id }).update(changes);
        return await findById(id);
    } catch (err) {
        throw err;
    }
}

async function remove(id) {
    try {
        return await db('users').del().where({ id });
    } catch (err) {
        throw err;
    }
}