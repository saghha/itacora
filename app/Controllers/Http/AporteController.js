'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Objetivo = use('App/Models/Objetivo')
const Aporte = use('App/Models/Aporte')
const User = use('App/Models/User')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with aportes
 */
class AporteController {
  /**
   * Show a list of all aportes.
   * GET aportes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth, response, view }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No está autorizado'})
    try{
      const aportes = await Aporte.all()
      return response.json(aportes)
    } catch(e){
      throw e
    }
  }

  /**
   * Render a form to be used for creating a new aporte.
   * GET aportes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new aporte.
   * POST aportes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No está autorizado'})
    const rules = {
      id_objetivo: 'required|integer',
      titulo: 'required',
      flag_documentacion: 'required',
      id_user: 'required|integer',
      fecha_ingreso: 'required'
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
        const objetivo = await Objetivo.find(body.id_objetivo)
        const usr = await User.find(body.id_user)
        if(!objetivo) return response.status(404).json({status: 'error', message: 'Objetivo no encontrado'})
        if(!user) return response.status(404).json({status: 'error', message: 'Usuario no encontrado'})
        const aporte = await Aporte.create(body)
        return response.json(aporte)
      }catch(e){
        throw e
      }
    }
  }

  /**
   * Display a single aporte.
   * GET aportes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, auth, request, response, view }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No está autorizado'})
    try{
      const aporte = await Aporte.find(params.id)
      if(!aporte) return response.status(404).json({status: 'error', message: 'Aporte no existe'})
      return response.json(aporte)
    } catch(e){
      throw e
    }
  }

  /**
   * Render a form to update an existing aporte.
   * GET aportes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update aporte details.
   * PUT or PATCH aportes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request, response }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No está autorizado'})
    const rules = {
      id_objetivo: 'required|integer',
      titulo: 'required',
      flag_documentacion: 'required',
      id_user: 'required|integer',
      fecha_ingreso: 'required'
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
        const aporte = await Aporte.find(params.id)
        if(!aporte) return response.status(404).json({status: 'error', message: 'Aporte no encontrado'})
        aporte.merge(body)
        await aporte.save()
        return response.json(aporte)
      }catch(e){
        throw e
      }
    }
  }

  /**
   * Delete a aporte with id.
   * DELETE aportes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, request, response }) {
    const user = auth.user
    if(!user) return response.status(401).json({status: 'error', message: 'No está autorizado'})
    try{
      const aporte = Aporte.find(params.id)
      if(!aporte) return response.status(404).json({status: 'error', message: 'Aporte no encontrado'})
      await aporte.delete()
      return response.json({
        status: 'success',
        message: 'Aporte eliminado'
      })
    } catch(e){
      throw e
    }
  }
}

module.exports = AporteController
