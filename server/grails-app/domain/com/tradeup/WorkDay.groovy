package com.tradeup

import java.sql.Time

class WorkDay {
    Integer wd_id
    Date day
    Time startTime
    Time finishTime
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
