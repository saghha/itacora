'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/**
 * Fillable = [
 *  'id_objetivo', 'titulo', 'descripcion', 'flag_documentacion', 'id_user', 'factor_impacto', 'fecha_ingreso', 'fecha_evaluacion'
 * ]
 */
class Aporte extends Model {
    static boot () {
        super.boot()
    }

    Objetivo(){
        return this.belongsTo('App/Models/Objetivo', 'id_objetivo', 'id')
    }

    Evaluaciones(){
        return this.hasMany('App/Models/Evaluacion', 'id', 'id_aporte')
    }
}

module.exports = Aporte
