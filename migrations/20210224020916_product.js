exports.up = function (knex) {
  return knex.schema.createTable('product', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description');
    table.decimal('price').notNullable();
    table.integer('quantity').unsigned().notNullable();
    table.text('image');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('product');
};
