package com.tradeup
import grails.rest.*

@Resource(uri='/project')
class Project {
    Integer project_id
    String project_name
    String country
    String state

    static hasMany = [employees: Employee]

    static constraints = {
        project_name blank:false
    }

    static mapping = {
        table 'project'
        version false
        id name: "project_id"
    }


    String toString() {
        project_name
    }
}
