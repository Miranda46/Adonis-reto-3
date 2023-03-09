import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'
import Perfil from './Perfil'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public tipoID: string

  @column()
  public numID: string

  @column()
  public direccion: string

  @column()
  public barrio: string

  @column()
  public municipio: string

  @column()
  public departamento: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Book)
  public books: HasMany<typeof Book>

  @hasOne(() => Perfil, {
    localKey: "id",
    foreignKey: "id",
  })
  public perfil: HasOne<typeof Perfil>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
