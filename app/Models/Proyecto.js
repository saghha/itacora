'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/**
 * Fillable = [
 *  'titulo', 'descripcion', 'estado' (por confirmar, en progreso, archivado, cancelado, pausado), 'fecha_inicio', 'fecha_cambio_estado', 'fecha_termino'
 * ]
 */
class Proyecto extends Model {
    static boot () {
        super.boot()
    }
    Objetivos(){
        return this.hasMany('App/Models/Objetivo', 'id', 'id_proyecto')
    }
}

module.exports = Proyecto
