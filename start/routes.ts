/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("register","AuthController.register");
  Route.post("login","AuthController.login");
  Route.group(() => {
    Route.get("books", "BooksController.index");
    Route.get("books/:id", "BooksController.show"); 
    Route.post("books", "BooksController.store");
    Route.get("perfil/listar/:id", "PerfilsController.listarUno");
    Route.get("Perfil/listartodo", "PerfilsController.getListarPerfiles");
    Route.get("user/listar/:id", "AuthController.listarUno");
    Route.get("user/listartodo", "AuthController.listarTodo");
    Route.group(() => { 
      Route.delete("books/delete", "BooksController.deleteBook");
      Route.delete("user/delete/:id", "AuthController.deleteUser");
      Route.delete("perfil/delete/:id", "PerfilsController.deletePerfil");
    }).middleware(["auth", "Administrador"])
    Route.group(() => {
      Route.post("perfil/register","PerfilsController.setRegistrarPerfiles");
      Route.put("perfil/update/:id", "PerfilsController.updatePerfil");
      Route.put("books/update/:id", "BooksController.update");
      Route.put("user/update/:id", "AuthController.updateUsuario");
     }).middleware(["auth", "Regular"])
  }).middleware("auth");
}).prefix("api");


