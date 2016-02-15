# -*- coding: utf-8 -*-
from openerp import models, fields, api

class Mytodo(models.Model):
    _name = 'bbtodo.mymodel'#不能用大写？
    name=fields.Char('标题',required=True)
    wendu=fields.Integer(string='温度',required=True)

    @api.model
    def addItem(self,name):
        result=self.env['bbtodo.mymodel'].create({'name':name,'wendu':'2222'})#下面那个也是可以的
        return result.id

    @api.model
    def changeItem(self,id,name):
        self.browse([id]).write({'name':name})

    @api.model
    def deleteItem(self,id):
        self.browse([id]).unlink();