import chat from './chat.js';
import profile from './profile.js';

const translation = {
	translation: {
		header: {
			login: 'Войти',
			register: 'Регистрация',
			greeting: 'Здравствуйте,',
			back: 'Назад',
		},
		navigation: {
			chat: 'Диалоги',
			profile: 'Профиль',
		},
		login: {
			label: 'Войти',
			email: 'E-mail',
			password: 'Пароль',
			forgot: 'Забыл пароль',
			'stay-logined': 'Запомнить',
			register: 'зарегистрируйтесь сейчас',
			login: 'Войти',
			errors: {
				'email-empty': 'Укажите e-mail!',
				'email-incorrect': 'Неверный e-mail!',
				'password-empty': 'Введите пароль',
				'incorrect-credentials': 'Нет пользователя с e-mail',
				'incorrect-password': 'Неверный пароль',
			},
		},
		register: {
			email: 'E-mail',
			password: 'Пароль',
			'confirm-password': 'Подтвердите пароль',
			firstName: 'Имя',
			'firstName-tooltip': 'Валерий',
			secondName: 'Фамилия',
			'secondName-tooltip': 'Жмышенко',
			submit: 'Зарегестрироваться',
			errors: {
				'email-empty': 'Укажите e-mail!',
				'email-invalid': 'Некорректный e-mail!',
				'password-empty': 'Введите пароль',
				'password-short': 'Минимальная длина пароля составляет 6 символов',
				'password-not-confirmed': 'Подтвердите пароль!',
				'password-not-match': 'Пароли не совпадают',
				'firstName-empty': 'Введите Ваше имя',
				'secondName-empty': 'Введите Вашу фамилию',
			},
		},
		menu: {
			logout: 'Выйти',
			mapsList: 'Мои карты',
			mapCreate: 'Создать карту',
		},
		maps: {
			list: {
				header: 'Мои карты',
			},
			listItem: {
				creationdate: 'Дата создания',
				author: 'Автор',
			},
			create: {
				header: 'Новая карта',
				name: 'Название',
				description: 'Описание',
				public: 'Публичная карта',
				save: 'Создать',
				errors: {
					'name-maxlength': 'Максимальная длина имени карты - 100 символов',
				},
			},
			actions: {
				names: {
					1: 'Маркер',
				},
				tips: {
					drop: 'Удалить',
					edit: 'Редактировать',
					submit: 'Сохранить',
				},
				description: 'Комментарий',
				description_placeholder: 'Добавьте описание',
			},
			join: {
				loading: 'Карта загружается',
				errors: {
					unauthorized: 'У Вас недостаточно прав для просмотра карты',
					invalidHash: 'Карта не существует или удалена 😔',
				},
			},
			settings: {
				default: {
					label: 'Настройки',
					name: 'Имя',
					placeholders: { name: 'Ваше имя на карте' },
				},
				map: {
					label: 'Карта',
				},
				save: 'Сохранить',
			},
		},
		errors: {
			label: 'Ошибка',
			description: {
				default:
					'Что-то пошло не по плану, попробуйте перезагрузить страницу и проверьте данные',
				unauthorized: 'Действие доступно только авторизованным пользователям',
			},
		},
		chat,
		profile,
	},
};

export default translation;
