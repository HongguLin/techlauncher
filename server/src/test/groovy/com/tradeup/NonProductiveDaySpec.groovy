package com.tradeup

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class NonProductiveDaySpec extends Specification implements DomainUnitTest<NonProductiveDay> {

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
            true == false
    }
}
