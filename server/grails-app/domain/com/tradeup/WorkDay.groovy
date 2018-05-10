package com.tradeup
import grails.rest.*

@Resource(uri='/wd')
class WorkDay {
    Integer wd_id
    Date day
    Date startTime
    Date finishTime
    static belongsTo = [employee:Employee]

    static constraints = {
        wd_id blank:false
    }

    static mapping = {
        table 'work_day'
        version false
        id name: "wd_id"
    }
}
