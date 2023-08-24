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
					2: 'Линия',
					3: 'Полигон',
				},
				tips: {
					drop: 'Удалить',
					edit: 'Редактировать',
					submit: 'Сохранить',
				},
				description: 'Комментарий',
				description_placeholder: 'Добавьте описание',
				area: {
					label: 'Площадь',
				},
			},
			join: {
				loading: 'Карта загружается',
				errors: {
					unauthorized: 'У Вас недостаточно прав для просмотра карты',
					invalidHash: 'Карта не существует или удалена 😔',
				},
			},
			participant: {
				type: {
					0: 'Участник',
					10: 'Редактор',
					20: 'Модератор',
					30: 'Администратор',
					40: 'Создатель',
				},
				status: {
					0: 'Активный',
					'-1': 'Забанен',
				},
			},
			settings: {
				default: {
					label: 'Настройки',
					name: 'Имя участника',
					placeholders: { name: 'Ваше имя на карте' },
				},
				map: {
					label: 'Карта',
					name: 'Название карты',
					description: 'Описание карты',
					public: 'Публичная карта',
					anonView: 'Анонимный просмотр',
					editRules: {
						label: 'Редактирование карты',
						all: 'Все могут редактировать',
						creator: 'Только создатель может редактировать',
						logined: 'Зарегестрированные пользователи могут редактировать',
						creator_and_moderators:
							'Администраторы и модераторы могут редактировать',
						allowed_users: 'Редактировать могут только участники из списка',
					},
					placeholders: {
						name: 'Введите название карты',
						description: 'Введите описание карты',
					},
				},
				participants: {
					label: 'Участники',
					status: 'Статус',
					type: 'Роль',
					logined: 'Залогиненый',
					actions: {
						ban: 'Забанить',
						unban: 'Разбанить',
					},
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
			templates: {
				required: 'Поле обязательно к заполнению',
				'min-field': 'Минимальная длина {{min}} символов',
				'max-field': 'Максимальная длина {{max}} символов',
			},
		},
		templates: {
			yes: 'Да',
			no: 'Нет',
			area: {
				km2: '{{num}} км²',
			},
		},
		chat,
		profile,
	},
};

export default translation;
