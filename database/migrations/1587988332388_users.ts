import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string("name", 180).notNullable()
      table.string("apellido", 180).notNullable()
      table.string("tipoID", 180).notNullable()
      table.string("numID", 180).notNullable()
      table.string("direccion", 250).notNullable()
      table.string("barrio", 180).notNullable()
      table.string("municipio", 180).notNullable()
      table.string("departamento", 180).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      //table.integer('perfilID').references('perfilID').inTable('perfils').onDelete('CASCADE')
     
      
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
