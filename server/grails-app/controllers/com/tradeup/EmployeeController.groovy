package com.tradeup


import grails.rest.*
import grails.converters.*
import groovy.json.JsonSlurper
import groovy.sql.Sql

class EmployeeController {
	static responseFormats = ['json', 'xml']

    def dbURL = 'jdbc:mysql://localhost:3306/tradeup'
    def dbUserName = 'root'
    def dbPassword = '1234'
    def dbDriver = 'com.mysql.jdbc.Driver'
	
    def index() { }

    //never used
    def get() {
        def allEmployees = []
        try {
            def db = Sql.newInstance(this.dbURL, this.dbUserName, this.dbPassword, this.dbDriver)

            db.eachRow('select * from employee;', { row ->

                def event = [:]
                event['id'] = row.employee_id
                event['name'] = row.employee_name

                allEmployees << event
            })


        } catch(Exception e){
            println("ERROR")
            println(e)
        }

        def res = allEmployees.collect {[
                'id': it.id,
                'name': it.name,
        ]}
        render res as JSON
    }

    def save(){

        def jsonEvent = request.reader.text
        def slurper = new JsonSlurper();
        def event = slurper.parseText(jsonEvent).event

        println(event);

        try {
            def db = Sql.newInstance(this.dbURL, this.dbUserName, this.dbPassword, this.dbDriver)
            def insertStatement = 'INSERT INTO employee (employee_name) VALUES (:employee_name)';
            db.execute(insertStatement, event)

            db.close()
            def response = ['success': true]
            render response as JSON
        } catch(Exception e){
            println("ERROR")
            println(e)
            def response = ['success': false]
            render response as JSON
        }
    }
}
