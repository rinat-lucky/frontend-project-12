const ru = {
  translation: {
    header: {
      appTitle: 'Hexlet Chat',
      logOutButton: 'Выйти',
    },
    messagesStatus: {
      sending: 'отправляется...',
      delivered: 'доставлено',
    },
    messagesCount: {
      msg_zero: '{{count}} сообщений',
      msg_one: '{{count}} сообщение',
      msg_two: '{{count}} сообщения',
      msg_few: '{{count}} сообщения',
      msg_many: '{{count}} сообщений',
    },
    messagePlaceholder: 'Введите сообщение...',
    messageLabel: 'Новое сообщение',
    messageButton: 'Отправить',
    channelsTitle: 'Каналы',
    channelsButton: {
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    channelSettings: 'Управление каналом',
    notFoundPage: {
      title: 'Страница не найдена',
      navigateText: 'Но вы можете перейти ',
      toHomePage: 'на главную страницу',
    },
    modal: {
      label: 'Имя канала',
      cancelButton: 'Отменить',
      submitButton: 'Отправить',
    },
    addModal: {
      title: 'Добавить канал',
    },
    renameModal: {
      title: 'Переименовать канал',
    },
    removeModal: {
      title: 'Удалить канал',
      confirm: 'Уверены?',
      cancelButton: 'Отменить',
      submitButton: 'Удалить',
    },
    loginPage: {
      imgAlt: 'Авторизация',
      title: 'Войти',
      nameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      submitButton: 'Войти',
      haveNotAccount: 'Нет аккаунта? ',
      registerLink: 'Регистрация',
    },
    signupPage: {
      title: 'Регистрация',
      nameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmPasswordLabel: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
    },
    error: {
      userAlreadyExist: 'Такой пользователь уже существует',
      wrongData: 'Неверные имя пользователя или пароль',
      notUnique: 'Должно быть уникальным',
      wrongLength: 'От 3 до 20 символов',
      tooShort: 'Не менее 6 символов',
      required: 'Обязательное поле',
      mustMatch: 'Пароли должны совпадать',
      network: 'ошибка соединения',
    },
    notice: {
      newChannel: 'Канал создан',
      renameChannel: 'Канал переименован',
      removeChannel: 'Канал удалён',
      networkError: 'Ошибка соединения',
      signin: 'Неизвестная ошибка при авторизации',
      signup: 'Неизвестная ошибка при регистрации',
      getData: 'Неизвестная ошибка при загрузке данных',
    },
  },
};

export default ru;
