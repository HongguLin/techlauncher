package com.tradeup
import grails.rest.*

import javax.persistence.Column

@Resource(uri='/npd')
class NonProductiveDay {
    Integer npd_id
    Date start
    Date end
    Integer repeatDays;
    String reason

    static constraints = {
        npd_id blank:false
    }

    static mapping = {
        table 'non_productive_day'
        version false
        id name: "npd_id"
    }


    String toString() {
        reason
    }
}
