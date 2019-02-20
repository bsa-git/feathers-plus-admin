const userMenu =  [
  {header: 'Language', name: 'language'},
  {
    title: 'English',
    name: 'language_en',
    click: 'en'
  },
  {
    title: 'Русский',
    name: 'language_ru',
    click: 'ru'
  },
  {divider: true},
  {header: 'User', name: 'user'},
  {
    icon: 'account_circle',
    to: '/user/profile',
    title: 'Profile',
    name: 'profile'
  },
  {
    icon: 'person_add',
    to: '/user/sign-up',
    title: 'SignUp',
    name: 'sign_up'
  },
  {
    icon: 'input',
    to: '/user/login',
    title: 'Login',
    name: 'login'
  },
  {
    icon: 'fullscreen_exit',
    title: 'Logout',
    name: 'logout',
    click: 'logout'
  }
];

export default userMenu;
