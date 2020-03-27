'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/**
 * Fillable = [
 *  'id_aporte', 'id_user', 'puntuacion', 'fecha_ingreso', 'observaciones'
 * ]
 */
class Evaluacion extends Model {
    static boot () {
        super.boot()
    }

    Aporte(){
        return this.belongsTo('App/models/Aporte', 'id_aporte', 'id')
    }

    User(){
        return this.belongsTo('App/Models/User', 'id_user', 'id')
    }
}

module.exports = Evaluacion
