package com.tradeup

class Project {

    Integer project_id
    String project_name
    String country
    String state

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
