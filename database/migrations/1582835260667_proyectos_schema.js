'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProyectosSchema extends Schema {
  up () {
    this.create('proyectos', (table) => {
      table.increments()
      table.timestamps()
      table.string('titulo').notNullable()
      table.string('descripcion').nullable()
      table.enum('estado', ['por confirmar', 'en progreso', 'archivado', 'cancelado', 'pausado']).notNullable()
      table.datetime('fecha_inicio').notNullable()
      table.datetime('fecha_cambio_estado').notNullable()
      table.datetime('fecha_termino').nullable()
    })
  }

  down () {
    this.drop('proyectos')
  }
}

module.exports = ProyectosSchema
