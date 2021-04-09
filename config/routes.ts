export default  [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '船舶自动采集系统',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {exact: true, path: '/', redirect: '/customer'},
  {
    name: '客户管理',
    icon: 'UserSwitchOutlined',
    path: '/customer',
    component: './Customer',
    routes: [
      {
        path: '/customer',
        name: '客户管理',
        icon: 'smile',
        component: './Customer',
        hideInMenu: true,
      },
      {
        path: '/customer/connectShip',
        name: '关联船舶',
        icon: 'smile',
        component: './Ship',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '船舶管理',
    icon: 'FlagOutlined',
    path: '/ship',
    routes: [
      {
        path: '/ship',
        name: '客户管理',
        icon: 'smile',
        component: './Ship',
        hideInMenu: true,
      },
      {
        path: '/ship/shipDynamic',
        name: '关联船舶',
        icon: 'smile',
        component: './Ship/ShipDynamic',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '采集管理',
    icon: 'AreaChartOutlined',
    path: '/collection',
    component: './Collection',
    routes: [
      {
        name: '采集',
        icon: 'AreaChartOutlined',
        path: '/collection',
        component: './Collection',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '监控管理',
    icon: 'RobotOutlined',
    path: '/monitor',
    component: './Monitor',
  },
  {
    name: '邮件管理',
    icon: 'WalletOutlined',
    path: '/mail',
    routes: [
      {
        path: '/mail/mailTemplate',
        name: '邮件模板',
        icon: 'smile',
        component: './Mail/MailTemplate',
      },
      {
        path: '/mail/mailTemplate/add',
        name: '模板',
        icon: 'smile',
        component: './Mail/Add',
        hideInMenu: true,
      },
      {
        path: '/mail/mailSend',
        name: '邮件发送',
        icon: 'smile',
        component: './Mail/MailSend',
      },
      {
        path: '/mail/mailSend/EditEmailSend',
        name: '发送模板',
        icon: 'smile',
        component: './Mail/EditEmailSend',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '日志管理',
    icon: 'FormOutlined',
    path: '/log',
    routes: [
      {
        path: '/log/mailLog',
        name: '邮件日志',
        icon: 'smile',
        component: './Log/MailLog',
      },
      {
        path: '/log/operate',
        name: '操作记录',
        icon: 'smile',
        component: './Log/Operate',
      },
      {
        path: '/log/operate/operateFail',
        name: '失败记录',
        icon: 'smile',
        component: './Log/OperateFail',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '数据管理',
    icon: 'DatabaseOutlined',
    path: '/data',
    component: './Data',
  },
  {
    name: '系统管理',
    icon: 'DesktopOutlined',
    routes: [
      {
        path: '/system/params',
        name: '参数配置',
        icon: 'smile',
        component: './System/Params',
      },
      {
        path: '/system/account',
        access: 'canAdmin',
        name: '账号管理',
        icon: 'smile',
        component: './System/Account',
      },
      {
        path: '/system/mailBox',
        access: 'canAdmin',
        name: '邮箱管理',
        icon: 'smile',
        component: './System/MailBox',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
]
