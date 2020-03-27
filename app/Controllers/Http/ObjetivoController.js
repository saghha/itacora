'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Objetivo = use('App/Models/Objetivo')
const Proyecto = use('App/Models/Proyecto')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with objetivos
 */
class ObjetivoController {
  /**
   * Show a list of all objetivos.
   * GET objetivos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const objetivos = await Objetivo.all()
    return response.json(objetivos)
  }

  /**
   * Render a form to be used for creating a new objetivo.
   * GET objetivos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new objetivo.
   * POST objetivos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const user = auth.user
    if(!user) return response.status(401).json({
      status: 'error',
      message: 'No está autorizado'
    })
    const rules = {
      id_proyecto: 'required|integer',
      titulo: 'required',
      fecha_inicio: 'required',
      estado: 'requried'
    }
    const validation = await validate(request.all(), rules)
    if(validation.fails()){
      return response.status(403).json({
        status: 'error',
        message: validation.messages()
      })
    }
    else{
      try{
        const body = request.post()
        const proyecto = await Proyecto.find(body.id_proyecto)
        if(!proyecto) return response.status(404).json({status: 'error', message: 'no existe el proyecto'})
        const objetivo = await Objetivo.create(body)
        return response.json(objetivo)
      }catch(e){
        throw e
      }
    }
  }

  /**
   * Display a single objetivo.
   * GET objetivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, request, response}) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No autorizado'})
    try{
      const objetivo = await Objetivo.find(params.id)
      if(!objetivo) return response.status(404).json({status: 'error', message: 'No se encontró el curso'})
      else return response.json(objetivo)
    } catch(e){
      throw e
    }
  }

  /**
   * Render a form to update an existing objetivo.
   * GET objetivos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update objetivo details.
   * PUT or PATCH objetivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request, response }) {
    const user = await auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No autorizado'})
    const rules = {
      id_proyecto: 'required|integer',
      titulo: 'required',
      fecha_inicio: 'required',
      estado: 'requried'
    }
    const validation = await validate(request.all(), rules)
    if(validation.fails()){
      return response.status(403).json({
        status: 'error',
        message: validation.messages()
      })
    }
    else{
      try {
        const body = request.post()
        const objetivo = await Objetivo.find(params.id)
        if(!objetivo) return response.status(404).json({status: 'error', message: 'Objetivo no encontrado'})
        objetivo.merge(body)
        await objetivo.save()
        return response.json(objetivo)
      }catch(e){
        throw e
      }
    }
  }

  /**
   * Delete a objetivo with id.
   * DELETE objetivos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No autorizado'})
    try{
      const objetivo = Objetivo.find(params.id)
      if(!objetivo) return response.status(404).json({status: 'error', message: 'Objetivo no encontrado'})
      await objetivo.delete()
      return response.json({
        status: 'success',
        message: 'Objetivo eliminado'
      })
    } catch(e){
      throw e
    }
  }
}

module.exports = ObjetivoController
