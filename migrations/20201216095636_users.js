exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
      table.increments();
      table.text('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').unique().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('users');
  };
  