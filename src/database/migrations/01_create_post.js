exports.up = function(knex){
    return knex.schema.createTable("posts", table => {
      table.increments("id").primary()
      table.string("title").notNullable()
      table.string("file").notNullable()
    })
}

exports.down = function(knex){
    return knex.schema.dropTable("posts")
}
