package com.tradeup
import grails.rest.*

@Resource(uri='/employee')
class Employee {
    Integer employee_id
    String employee_name
    static belongsTo = [project:Project]
    static hasMany = [npds:NonProductiveDay, wds:WorkDay]

    static constraints = {
        employee_name blank:false
    }

    static mapping = {
        table 'employee'
        version false
        id name: "employee_id"
    }


    String toString() {
        employee_name
    }
}
