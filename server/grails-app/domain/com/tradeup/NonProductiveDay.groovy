package com.tradeup
import grails.rest.*

@Resource(uri='/npd')
class NonProductiveDay {
    int npd_id
    Date start
    Date end
    String reason

    static constraints = {
        npd_id blank:false
    }

    static mapping = {
        table 'non_productive_day'
        version false
        id generator: 'increment', name: 'npd_id'
    }

    //def beforeInsert() {
        //npd_id=1
    //}

    String toString() {
        reason
    }
}
