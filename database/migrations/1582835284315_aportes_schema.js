'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AportesSchema extends Schema {
  up () {
    this.create('aportes', (table) => {
      table.increments()
      table.timestamps()
      table.integer('id_objetivo').unsigned().notNullable()
      table.string('titulo').notNullable()
      table.text('descripcion').nullable()
      table.integer('flag_documentacion').notNullable().unsigned().defaultTo(0)
      table.integer('id_user').notNullable().unsigned()
      table.float('factor_impacto').nullable()
      table.datetime('fecha_ingreso').notNullable()
      table.datetime('fecha_evaluacion').nullable()
    })
  }

  down () {
    this.drop('aportes')
  }
}

module.exports = AportesSchema
