# -*- coding: utf-8 -*-
{
    'name': "odoo_bbtodo",

    'summary': """
        将backbone的todo移值到这里""",

    'description': """

    """,

    'author': "伍明煜",
    'website': "https://www.odoo.com/documentation/8.0/howtos/web.html",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        #引入js，css,
        'static/htmlhead.xml',
        'menu/menu.xml',#,#菜单
        'security/ir.model.access.csv'
        #'views/view.xml' #视图
    ],
    'qweb': ['static/src/template/*.xml'],
    # only loaded in demonstration mode
    'demo': [
        #'views/demo.xml',
    ],
}