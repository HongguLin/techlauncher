package com.tradeup


import grails.rest.*
import grails.converters.*
import groovy.json.JsonSlurper
import groovy.sql.Sql

class NpdController {
	static responseFormats = ['json', 'xml']
    def scaffold = NonProductiveDay
    def index(){
    }
}
