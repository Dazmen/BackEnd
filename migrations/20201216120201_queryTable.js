
exports.up = function(knex, Promise) {
    return knex.schema.createTable('query', function(table) {

      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('tag_id').notNullable().references('id').inTable('tags');
      table.integer('title_id').notNullable().references('id').inTable('recipe')
      table.primary(['user_id', 'tag_id', 'title_id'])

    })
    
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('query');
  };