package com.tradeup


import grails.rest.*
import grails.converters.*

class ProjectController {
	static responseFormats = ['json', 'xml']
    def scaffold = Project
	
    def index() { }
}
