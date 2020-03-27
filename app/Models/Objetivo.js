'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/**
 * Fillable = [
 *  'id_proyecto', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_termino', 'estado'
 * ]
 */
class Objetivo extends Model {
    static boot () {
        super.boot()
    }

    Proyecto(){
        return this.belongsTo('App/Models/Proyecto', 'id_proyecto', 'id')
    }

    Aportes(){
        return this.hasMany('App/Models/Aporte', 'id', 'id_objetivo')
    }
}

module.exports = Objetivo
