'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvaluacionesSchema extends Schema {
  up () {
    this.create('evaluaciones', (table) => {
      table.increments()
      table.timestamps()
      table.integer('id_aporte').notNullable().unsigned()
      table.integer('id_user').notNullable().unsigned()
      table.float('puntuacion').notNullable()
      table.datetime('fecha_ingresi').notNullable()
      table.text('observaciones').notNullable()
    })
  }

  down () {
    this.drop('evaluaciones')
  }
}

module.exports = EvaluacionesSchema
