'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Proyecto = use('App/Models/Proyecto')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with proyectos
 */
class ProyectoController {
  /**
   * Show a list of all proyectos.
   * GET proyectos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const proyecto = await Proyecto.all()
    return response.json(proyecto)
  }

  /**
   * Render a form to be used for creating a new proyecto.
   * GET proyectos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new proyecto.
   * POST proyectos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const user = await auth.user
    if(!user) return response.status(401).json({
      status: 'error',
      message: 'No autorizado'
    })
    const rules = {
      titulo: 'required',
      estado: 'required',
      fecha_inicio: 'required',
      fecha_cambio_estado: 'required',
    }
    const validation = await validate(request.all(), rules)
    if(validation.fails()){
      return response.status(401).json({
        status: 'error',
        message: validation.messages()
      })
    }
    else{
      const body = request.post()
      const proyecto = await Proyecto.create(body)
      return proyecto
    }
  }

  /**
   * Display a single proyecto.
   * GET proyectos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, request, response, view }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No autorizado'})
    try{
      const proyecto = await Proyecto.find(params.id)
      if(!proyecto) return response.status(404).json({status: 'error', message: 'Proyecto no encontrado'})
      else{
        return response.json(proyecto)
      }
    } catch(e){
      throw e
    }
  }

  /**
   * Render a form to update an existing proyecto.
   * GET proyectos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    
  }

  /**
   * Update proyecto details.
   * PUT or PATCH proyectos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request, response }) {
    const user = await auth.user
    if(!user) return response.status(401).json({
      status: 'error',
      message: 'No autorizado'
    })
    const rules = {
      titulo: 'required',
      estado: 'required',
      fecha_inicio: 'required',
      fecha_cambio_estado: 'required',
    }
    const validation = await validate(request.all(), rules)
    if(validation.fails()){
      return response.status(401).json({
        status: 'error',
        message: validation.messages()
      })
    }
    else{
      const body = request.post()
      try{
        const proyecto = await Proyecto.find(params.id)
        if(!proyecto) return response.status(404).json({status: 'error', message: 'Proyecto no encontrado'})
        proyecto.merge(body)
        await proyecto.save()
        return response.json(proyecto)
      }catch(e){
        throw e
      }
    }
  }

  /**
   * Delete a proyecto with id.
   * DELETE proyectos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const user = await auth.user
    if(user) return response.status(401).json({
      status: 'error',
      message: 'No autorizado'
    })
    try{
      const proyecto = await Proyecto.find(params.id)
      if(!proyecto) return response.status(404).json({status: "error", message: "Proyecto no encontrado"})
      await proyecto.delete()
      return response.json({
        status: 'success',
        message: 'Proyecto eliminado'
      })
    }catch(e){
      throw e
    }
  }
}

module.exports = ProyectoController
