'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ObjetivosSchema extends Schema {
  up () {
    this.create('objetivos', (table) => {
      table.increments()
      table.timestamps()
      table.integer('id_proyecto').unsigned().notNullable()
      table.string('titulo').notNullable()
      table.text('descripcion').nullable()
      table.datetime('fecha_inicio').notNullable()
      table.datetime('fecha_termino').nullable()
      table.enum('estado', ['por confirmar', 'en progreso', 'archivado', 'cancelado', 'pausado'])
    })
  }

  down () {
    this.drop('objetivos')
  }
}

module.exports = ObjetivosSchema
