const Menu = [
  {header: 'Apps', alias: 'apps'},
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'dashboard',
    alias: 'dashboard',
    to: '/dashboard'
  },
  {
    title: 'Chat',
    group: 'apps',
    icon: 'chat_bubble',
    target: '_blank',
    name: 'chat',
    alias: 'chat',
    to: '/admin/chat'
  },
  {
    title: 'Inbox',
    group: 'apps',
    name: 'mail',
    alias: 'inbox',
    target: '_blank',
    icon: 'email',
    to: '/admin/mail'
  },
  {
    title: 'Media',
    group: 'apps',
    name: 'media',
    alias: 'media',
    icon: 'perm_media',
    to: '/admin/media'
  },
  {
    title: 'Service',
    group: 'service',
    name: 'service',
    alias: 'service',
    icon: 'account_circle',
    to: '/service',
    items: [
      {
        title: 'Admins',
        group: 'admins',
        name: 'service-admins',
        alias: 'admins',
        to: '/service/admins',
        children: [
          { name: 'service-admins-management', alias: 'management', title: 'Management', icon: 'people_outline', to: '/service/admins/management' },
          { name: 'service-admins-settings', alias: 'settings', title: 'Settings', icon: 'settings', to: '/service/admins/settings' },
        ]
      },
      {
        title: 'Actions',
        group: 'actions',
        name: 'service-actions',
        alias: 'actions',
        to: '/service/actions',
        children: [
          { name: 'service-actions-create', alias: 'create', title: 'Create', icon: 'add', to: '/service/actions/create' },
          { name: 'service-actions-read', alias: 'read', title: 'Read', icon: 'insert_drive_file', to: '/service/actions/read' },
          { name: 'service-actions-update', alias: 'update', title: 'Update', icon: 'update', to: '/service/actions/update' },
          { name: 'service-actions-delete', alias: 'delete', title: 'Delete', icon: 'delete', to: '/service/actions/delete' },
        ]
      },
    ]
  },
  {
    title: 'Widgets',
    group: 'widgets',
    name: 'widgets',
    alias: 'widgets',
    icon: 'widgets',
    disabled: false,
    to: '/widgets',
    items: [
      {name: 'widgets-social', alias: 'social', title: 'Social', to: '/widgets/social'},
      {name: 'widgets-statistic', alias: 'statistic', title: 'Statistic', to: '/widgets/statistic'},
      {name: 'widgets-chart', alias: 'chart', title: 'Chart', to: '/widgets/chart'},
      {name: 'widgets-list', alias: 'list', title: 'List', to: '/widgets/widget-list'},
    ]
  },
  {header: 'UI Elements', alias: 'ui_elements'},
  {
    title: 'General',
    group: 'components',
    name: 'components',
    alias: 'general',
    icon: 'tune',
    to: '/components',
    items: [
      {name: 'components-alerts', alias: 'alerts', title: 'Alerts', to: '/components/alerts'},
      {name: 'components-avatars', alias: 'avatars', title: 'Avatars', to: '/components/avatars'},
      {name: 'components-badges', alias: 'badges', title: 'Badges', to: '/components/badges'},
      {name: 'components-buttons', alias: 'buttons', title: 'Buttons', to: '/components/buttons'},
      {name: 'components-cards', alias: 'cards', title: 'Cards', to: '/components/cards'},
      {name: 'components-carousels', alias: 'carousels', title: 'Carousels', to: '/components/carousels'},
      {name: 'components-chips', alias: 'chips', title: 'Chips', to: '/components/chips'},
      {name: 'components-dialogs', alias: 'dialogs', title: 'Dialogs', to: '/components/dialogs'},
      {name: 'components-icons', alias: 'icons', title: 'Icons', to: '/components/icons'},
      {name: 'components-tables', alias: 'tables', title: 'Data Tables', to: '/components/tables'},
      {name: 'components-parallax', alias: 'parallax', title: 'Parallax  image', to: '/components/parallax'},
      {name: 'components-snackbar', alias: 'snackbar', title: 'Snackbar', to: '/components/snackbar'},
      {name: 'components-progress', alias: 'progress', title: 'Progress', to: '/components/progress'},
      {name: 'components-slider', alias: 'slider', title: 'Slider', to: '/components/sliders'},
      {name: 'components-tooltip', alias: 'tooltip', title: 'Tooltip', to: '/components/tooltips'},
      {name: 'components-pagination', alias: 'pagination', title: 'Pagination', to: '/components/paginations'},
      {name: 'components-typography', alias: 'typography', title: 'Typography', to: '/components/typography'},
      {name: 'components-color', alias: 'color', title: 'Color', to: '/components/color'},

    ]
  },
  {
    title: 'Pickers',
    group: 'pickers',
    name: 'pickers',
    alias: 'pickers',
    icon: 'filter_vintage',
    to: '/pickers',
    items: [
      {name: 'pickers-timepicker', alias: 'timepicker', title: 'Timepicker', to: '/pickers/color'},
      {name: 'pickers-datepicker', alias: 'datepicker', title: 'Datepicker', to: '/pickers/datepicker'},

    ]
  },
  {
    title: 'Layout',
    group: 'layout',
    name: 'layout',
    alias: 'layout',
    icon: 'view_compact',
    to: '/layout',
    items: [
      {name: 'layout-bottom-sheets', alias: 'bottom_sheets', title: 'Bottom panels', to: '/layout/bottom-sheets'},
      {name: 'layout-expansion-panels', alias: 'expansion_panels', title: 'Expansion panels', to: '/layout/expansion-panels'},
      {name: 'layout-footer', alias: 'footer', title: 'Footer', to: '/layout/footer'},
      {name: 'layout-lists', alias: 'lists', title: 'Lists', to: '/layout/lists'},
      {name: 'layout-jumbotrons', alias: 'jumbotrons', title: 'Jumbotrons', badge: 'new', to: '/layout/jumbotrons'},
      {name: 'layout-menus', alias: 'menus', title: 'Menus', to: '/layout/menus'},
      {name: 'layout-tabs', alias: 'tabs', title: 'Tabs', to: '/layout/tabs'},
      {name: 'layout-toolbar', alias: 'toolbar', title: 'Toolbar', to: '/layout/toolbar'},
      {name: 'layout-timeline', alias: 'timeline', title: 'Timeline', to: '/layout/timeline'},
    ]
  },
  {
    title: 'Forms & Controls',
    group: 'forms',
    name: 'forms',
    alias: 'forms_controls',
    icon: 'edit',
    to: '/forms',
    items: [
      {name: 'forms-basic', alias: 'basic', title: 'General', to: '/forms/timeline'},
      {name: 'forms-selects', alias: 'selects', title: 'Selects', badge: 'new', to: '/forms/selects'},
      {name: 'forms-selection-controls', alias: 'selection_controls', title: 'Selection Controls', to: '/forms/selection-controls'},
      {name: 'forms-text-fields', alias: 'text_fields', title: 'Text Fields', to: '/forms/text-fields'},
      {name: 'forms-steppers', alias: 'steppers', title: 'Steppers', to: '/forms/steppers'},
      {name: 'forms-editors', alias: 'editors', title: 'Editors', to: '/forms/editors'},
    ]
  },
  {divider: true},
  {header: 'Extras', alias: 'extras'},
  {
    title: 'Pages',
    group: 'system',
    name: 'system',
    alias: 'pages',
    icon: 'list',
    disabled: true,
    to: '/system',
    items: [
      {name: 'system-login', alias: 'login', title: 'Login', to: '/user/login'},
      {name: 'system-404', alias: '404', title: '404', to: '/error/404'},
      {name: 'system-403', alias: '403', title: '403', to: '/error/403'},
      {name: 'system-500', alias: '500', title: '500', to: '/error/500'},
    ]
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
