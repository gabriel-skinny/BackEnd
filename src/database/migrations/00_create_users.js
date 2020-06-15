exports.up = function(knex){
    return knex.schema.createTable("users", table => {
      table.increments("id").primary()
      table.string("name").notNullable()
      table.string("email").notNullable()
      table.string("password").notNullable()
      table.string("atuação").notNullable()
      table.string("city").notNullable()
      table.string("uf", 2).notNullable()
      table.string("image")
    })
}

exports.down = function(knex){
    return knex.schema.dropTable("users")
}

