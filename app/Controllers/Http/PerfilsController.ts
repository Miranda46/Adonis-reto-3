import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from "App/Models/Perfil"
export default class PerfilsController {
    public async setRegistrarPerfiles({ request, response }: HttpContextContract) {
        const dataPerfil = request.only(["perfilID", "descripcionPerfil", "id"])
        try {
            const codigoPerfil = dataPerfil.perfilID
            const PerfilExistente: Number = await this.validarPerfilExistente(codigoPerfil)
            if (PerfilExistente === 0) {
                await Perfil.create(dataPerfil)
                response.status(200).json({ "msg": "Perfil registrado con exito" })
            } else {
                response.status(400).json({ "msg": "Codigo del Perfil ya se encuentra registrado" })
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({ "msg": "Error en el servidor" })
        }
    }
    private async validarPerfilExistente(perfilID: Number): Promise<Number> {
        const total = await Perfil.query().where({ "perfilID": perfilID }).count("*").from("perfils")
        return parseInt(total[0]["count(*)"])
    }
    public async deletePerfil({ request, response }: HttpContextContract) {
        const dataPerfil = request.only(["perfilID"])
        try {
            const codigoPerfil = dataPerfil.perfilID
            const PerfilExistente: Number = await this.validarPerfilExistente(codigoPerfil)
            if (PerfilExistente === 0) {
                response.status(400).json({ "msg": "El código de Perfil no existe/el Perfil no está registrado" })
            } else {
                await Perfil.query().where('perfilID', codigoPerfil).delete()
                response.status(200).json({ "msg": "El Perfil se ha eliminado satisfactoriamente" })
            }
        }
        catch (error) {
            console.log(error)
            response.status(500).json({ "msg": "Error en el servidor" })
        }
    }
    public async updatePerfil({ request, params }: HttpContextContract) {
        const perfil = await Perfil.find(params.perfilID);
        if (perfil) {
            perfil.descripcionPerfil = request.input("descripcionPerfil");
            if (await perfil.save()) {
                return {
                    "msg": "Actualizado correctamente", perfil
                }
            }
            else {
                return ({
                    "msg": "No se pudo actualizar", "estado": 401,
                });
            }
        } else {
            return ({
                "msg": "Perfil no encontrado", "estado": 401
            });
        }
    }

    public async listarUno({ params }: HttpContextContract) {
        const perfil = await Perfil.find(params.perfilID);
        if (perfil) {
            return perfil;
        } else {
            return { "msg": `No se halló un perfil con ID: ${params.perfilID}` }
        }
    }
    public async getListarPerfiles(): Promise<Perfil[]> {
        const perfil = await Perfil.all()
        return perfil;
    }
}
