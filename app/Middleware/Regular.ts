"use strict";
import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import Perfil from 'App/Models/Perfil';



class Admin {
  async handle({ auth }, next) {
    const user = await auth.user;
    const perfil = await Perfil.findBy("numID", user.numID);

    if (!perfil || perfil.descripcionPerfil !== "Regular")
        throw new AuthenticationException(
            'Necesitas ser usuario regular para acceder a esta ruta',
            'E_UNAUTHORIZED_ACCESS',
        )

    await next();
  }
}

module.exports = Admin;