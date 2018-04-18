package com.tradeup

import grails.rest.*

@Resource(uri='/employee')
class Employee {
    int employee_id
    String employee_name

    static constraints = {
        employee_id blank:false
    }

    static mapping = {
        table 'employee'
        version false
        id generator: 'assigned', name: "employee_id"
    }

    def beforeInsert() {
        employee_id=1
    }


    String toString() {
        employee_name
    }
}
