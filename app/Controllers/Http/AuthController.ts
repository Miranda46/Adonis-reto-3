import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input("email");
        const password = request.input("password");
        try {

            const token = await auth.use("api").attempt(email, password, { expiresIn: "60 mins", });

            return {
                token,
                "msg": "Usuario logueado correctamente"
            }
        } catch (error) {
            return response.unauthorized("Invalid Credentials")
        }
    }

    public async register({ request, auth }: HttpContextContract) {
        const numID = request.input("numID");
        const name = request.input("name");
        const email = request.input("email");
        const password = request.input("password");
        const tipoID = request.input("tipoID");
        const direccion = request.input("direccion");
        const barrio = request.input("barrio");
        const municipio = request.input("municipio");
        const departamento = request.input("departamento");
        const perfil = request.input("perfil");
        const confirm: Number = await this.validarUsuarioExistente(numID)
        if (confirm === 0) {
            const user = new User();
            user.email = email;
            user.password = password;
            user.name = name;
            user.tipoID = tipoID;
            user.numID = numID;
            user.direccion = direccion;
            user.barrio = barrio;
            user.municipio = municipio;
            user.departamento = departamento;
            user.perfil = perfil;
            await user.save();

            const token = await auth.use("api").login(user, { expiresIn: "10 days", });
            return {
                token,
                "msg": "Usuario registrado correctamente"
            };
        } else {
            return {
                "msg": "ERROR: Usuario ya existe en el sistema"
            }
        }
    }
    private async validarUsuarioExistente(numID: Number): Promise<Number> {
        const total = await User.query().where({ "numID": numID }).count("*").from("users")
        return parseInt(total[0]["count(*)"])
    }

    public async updateUsuario({ request, params }: HttpContextContract) {
        const user = await User.find(params.id);
        if (user) {
            user.email = request.input("email");
            user.password = request.input("password");
            user.name = request.input("name");
            user.tipoID = request.input("tipoID");
            user.numID = request.input("numID");
            user.direccion = request.input("direccion");
            user.barrio = request.input("barrio");
            user.municipio = request.input("municipio");
            user.departamento = request.input("departamento");
            user.departamento = request.input("perfil");
            if (await user.save()) {
                return {
                    "msg": "Actualizado correctamente", user
                }
            }
            else {
                return ({
                    "msg": "No se pudo actualizar", "estado": 401,
                });
            }
        } else {
            return ({
                "msg": "Usuario no encontrado", "estado": 401
            });
        }
    }

    public async deleteUser({ params, response }: HttpContextContract) {
        //const dataUser = request.only(["numID"])
        const dataUser = await User.find(params.id);
        
        try {
            const userExistente: Number = await this.validarUsuarioExistente(params.id)
            if (userExistente === 0) {
                response.status(400).json({ "msg": "El código de User no existe/el User no está registrado" })
            } else {
                
                await User.query().where('numID', params.id).delete()
                response.status(200).json({ "msg": "El User se ha eliminado satisfactoriamente" })
            }
        }
        catch (error) {
            console.log(error)
            response.status(500).json({ "msg": "Error en el servidor" })
        }


    }
    public async listarUno({ params }: HttpContextContract) {
        const usuario = await User.find(params.id);
        if (usuario) {
            return usuario;
        } else {
            return { "msg": `No se halló un Usuario con ID: ${params.id}` }
        }
    }

    public async listarTodo(): Promise<User[]> {
        const todo = await User.all()
        return todo;
    }
}
