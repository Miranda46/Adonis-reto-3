import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('perfilID').primary();
      table.string("descripcionPerfil", 300).notNullable;
      table.timestamps(false)
      table.integer("id").unsigned().unique().index("id");
      table.foreign("id").references("users.id").onDelete("cascade");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
