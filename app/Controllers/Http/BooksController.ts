import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({ request }: HttpContextContract) {
        const book = new Book();
        book.title = request.input('title');
        book.author = request.input('author');
        await book.save()
        return {
            "Libro": book,
            "msg": "Registro ingresado correctamente", "estado": 200
        }
    }
    public async index() {
        const books = await Book.query();
        return books
    }
    public async show({ params }: HttpContextContract) {
        try {
            const book = await Book.find(params.id);
            if (book) {
                return book
            } else {
                return ("Registro no existe")
            }
        } catch (error) {
            console.log(error)
        }
    }
    public async update({ request, params }: HttpContextContract) {
        const book = await Book.find(params.id);
        if (book) {
            book.title = request.input('title');
            book.author = request.input('author');
            if (await book.save()) {
                return {
                    "msg": "Actualizado correctamente", book
                }
            }
            else {
                return ({
                    "msg": "No se pudo actualizar", "estado": 401,
                });
            }
        } else {
            return ({
                "msg": "Registro no encontrado", "estado": 401
            });
        }
    }

    public async deleteBook({request, response}: HttpContextContract){
        const dataBook = request.only(["id"])
        try {
            const codigoBook = dataBook.id
            const BookExistente: Number = await this.validarBookExistente(codigoBook)
            if (BookExistente === 0){
                response.status(400).json({"msg":"El código de Book no existe/el Book no está registrado"})
            } else {
                await Book.query().where('id', codigoBook).delete()
                response.status(200).json({"msg":"El Book se ha eliminado satisfactoriamente"})
            }
        }
        catch (error){
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor"})
        }

    
    }
    private async validarBookExistente(numID:Number):Promise <Number>{
        const total = await Book.query().where({"numID":numID}).count("*").from("users")
        return parseInt(total[0]["count(*)"])
    }
   
}