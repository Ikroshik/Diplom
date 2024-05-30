const express = require('express'); 
const path = require('node:path');
const MyProvider = require('./admin/provider/provider')

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')
const uploadFeature = require('@admin-bro/upload')

AdminBro.registerAdapter(AdminBroSequelize)
const app = express();

const { sequelize, connectToDb } = require('./models/index')
const News = require('./models/news')
const Webinars = require('./models/webinars.js')
const bcrypt = require('bcrypt')
const Users = require('./models/users.js')


const cors = require('cors');

var corsOptions = {
    origin: "http://localhost:9090"
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
    const { count, rows } = await News.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 5
    });
    res.render('mainPage', {
        title: 'БПОО НСГК',
        news: rows
    })
})

app.get('/basic-information', (req, res) => {
    res.render('mainInfo', {
        title: 'Основные сведения'
    })
})

app.get('/basic-information/direction-of-activity', (req, res) => {
    res.render('directionOfActivity', {
        title: 'Направление деятельности'
    })
})

app.get('/basic-information/structure-of-the-center', (req, res) => {
    res.render('centerStructure', {
        title: 'Структура центра'
    })
})

app.get('/basic-information/resource-center-structure', (req, res) => {
    res.render('centerResourceStructure', {
        title: 'Структура ресурного центра'
    })
})

app.get('/basic-information/documents', (req, res) => {
    res.render('documents', {
        title: 'Документы'
    })
})

app.get('/basic-information/documents/presidential-decrees', (req, res) => {
    res.render('presidentialDecrees', {
        title: 'Указы президента'
    })
})

app.get('/basic-information/documents/federal-laws', (req, res) => {
    res.render('federalLaws', {
        title: 'Федеральные законы'
    })
})

app.get('/basic-information/documents/resolutions-and-orders', (req, res) => {
    res.render('resolutionsAndOrders', {
        title: 'Постановления и распоряжения'
    })
})

app.get('/basic-information/documents/local-acts', (req, res) => {
    res.render('localActs', {
        title: 'Локальные акты'
    })
})

app.get('/basic-information/documents/international-acts', (req, res) => {
    res.render('internationalActs', {
        title: 'Международные акты'
    })
})

app.get('/education', (req, res) => {
    res.render('education', {
        title: 'Образование'
    })
})

app.get('/education/info-adapt-edu-progs', (req, res) => {
    res.render('infoAboutAdEduProgs', {
        title: 'Информация о реализуемых адаптированных образовательных программах'
    })
})

app.get('/education/methodological-recommendations', (req, res) => {
    res.render('methodologicalRecommendations', {
        title: 'Методические рекомендации'
    })
})

app.get('/education/add-edu-progs', (req, res) => {
    res.render('addEduProgs', {
        title: 'Программы дополнительного профессионального образования'
    })
})

app.get('/proforientation', (req, res) => {
    res.render('proforientation', {
        title: 'Профориентация'
    })
})

app.get('/proforientation/card-index-popular-professions', (req, res) => {
    res.render('cardIndex', {
        title: 'Картотека востребованных профессий с учетом регионального рынка труда'
    })
})

app.get('/proforientation/info-about-prof-center-and-employment', (req, res) => {
    res.render('infoProfCenterEmployment', {
        title: 'Информация по центру профориентации и трудоустройству'
    })
})

app.get('/proforientation/employment', (req, res) => {
    res.render('employment', {
        title: 'Трудоустройство'
    })
})

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Мероприятия'
    })
})

app.get('/events/professional-development', (req, res) => {
    res.render('profDevelopment', {
        title: 'Повышение квалификации'
    })
})

app.get('/events/webinars', async (req, res) => {
    const webinars = await Webinars.findAll()
    res.render('webinars', {
        title: 'Вебинары',
        web: webinars,
        url: req.route.path
    })
})

app.get('/events/webinars/webinar_:id', async (req, res) => {
    const webinars = await Webinars.findByPk(req.params.id)
    res.render('oneWebinar', {
        title: 'Вебинар',
        web: webinars,
        url: req.route.path
    })
})

app.get('/events/conferences-and-seminars', async (req, res) => {
    const webinars = await Webinars.findAll()
    res.render('webinars', {
        title: 'Конференции, семинары',
        web: webinars,
        url: req.route.path
    })
})

app.get('/events/conferences-and-seminars/webinar_:id', async (req, res) => {
    const webinars = await Webinars.findByPk(req.params.id)
    const urlLink = req.params
    res.render('oneWebinar', {
        title: 'Конференции, семинары',
        web: webinars,
        url: req.route.path
    })
})

app.get('/partners', (req, res) => {
    res.render('partners', {
        title: 'Партнеры'
    })
})

app.get('/partners/ROIV', (req, res) => {
    res.render('ROIV', {
        title: 'РОИВ'
    })
})

app.get('/partners/PMPK', (req, res) => {
    res.render('PMPK', {
        title: 'ПМПК'
    })
})

app.get('/hotline', (req, res) => {
    res.render('hotline', {
        title: 'Горячая линия'
    })
})

app.get('/access-environment', (req, res) => {
    res.render('accessEnvironment', {
        title: 'Доступная среда'
    })
})

app.get('/access-environment/about-means-of-edu', (req, res) => {
    res.render('meansOfEdu', {
        title: 'О специально оборудованных учебных кабинетах'
    })
})

app.get('/access-environment/about-facilities-for-practical-lesson-persons-with-health-limitations', (req, res) => {
    res.render('facilitiesForPracticalLessonsForOVZ', {
        title: 'Об объектах для проведения практических занятий для лиц с ОВЗ'
    })
})

app.get('/access-environment/about-library-for-persons-with-health-limitations', (req, res) => {
    res.render('library', {
        title: 'Об объектах для проведения практических занятий для лиц с ОВЗ'
    })
})

app.get('/access-environment/about-facilities-of-sport-for-persons-with-health-limitations', (req, res) => {
    res.render('sportFacilities', {
        title: 'Об объектах спорта, приспособленных для лиц с ОВЗ'
    })
})

app.get('/access-environment/about-edu-means-for-persons-with-health-limitations', (req, res) => {
    res.render('eduMeans', {
        title: 'О средствах обучения и воспитания, приспособленных для лиц с ОВЗ'
    })
})

app.get('/access-environment/about-ensuring-access-to-building', (req, res) => {
    res.render('ensuringAccessToBuilding', {
        title: 'Об обеспечении беспрепятственного доступа в здание колледжа'
    })
})

app.get('/access-environment/about-special-conditionals-of-meal', (req, res) => {
    res.render('specialConditionalsOfMeal', {
        title: 'О специальных условиях питания'
    })
})

app.get('/access-environment/about-special-conditionals-of-health', (req, res) => {
    res.render('specialConditionalsOfHealth', {
        title: 'О специальных условиях охраны здоровья'
    })
})

app.get('/access-environment/about-accesss-to-info-sys-and-IT', (req, res) => {
    res.render('accessToInfoSysAndIT', {
        title: 'О доступе к информационным системам и информационно-телекоммуникационным сетям'
    })
})

app.get('/access-environment/about-electronic-edu-resources-for-persons-with-health-limitations', (req, res) => {
    res.render('electronicEduResources', {
        title: 'Об электронных образовательных ресурсах, к которым обеспечивается доступ инвалидов и лиц с ОВЗ'
    })
})

app.get('/access-environment/about-conditionals-for-access-to-dormitory', (req, res) => {
    res.render('conditionalsForAccessToDormitory', {
        title: 'О наличии условий для беспрепятственного доступа в общежитие'
    })
})

app.get('/access-environment/about-number-of-quarters-in-dormitory', (req, res) => {
    res.render('numberOfQuartersInDomitory', {
        title: 'О количестве жилых помещений в общежитии'
    })
})

app.get('/access-environment/availability-passport', (req, res) => {
    res.render('availabilityPassport', {
        title: 'Паспорт доступности'
    })
})

app.get('/news', async (req, res) => {
    const {count, rows} = await News.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 6
    });
    res.render('allNewsPage', {
        title: 'Новости',
        news: rows,
        count: parseInt(count),
        page: 1
    })
})

app.get('/news/page_:page', async (req, res) => {
    var page = req.params.page;
    const {count, rows} = await News.findAndCountAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 6,
        offset: 6 * (page-1)
    });
    res.render('allNewsPage', {
        title: 'Новости',
        news: rows,
        count: parseInt(count),
        page: page
    })
})

app.get('/news/news_id_:id', async (req, res) => {
    const news = await News.findByPk(req.params.id)
    res.render('oneNewsPage', {
        title: 'Новости',
        news: news
    })
})

const provider = new MyProvider('public/images', path.join(__dirname, '/public/images'))

const validation = {
    mimeTypes: ['image/jpeg', 'image/png'],
    maxSize: 67108864
  }

const adminBro = new AdminBro({
    resources: [{
      resource: Users,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          }
        }
      }
    }, 
    {
        resource: News,
        features: [uploadFeature({
            provider,
            properties: {
                key: 'image',
                bucket: 'bucket',
                file: 'Превью'
            },
            uploadPath: (record, filename) => (
                `${filename}`
            ),
            validation,
          })],
          options: {
            properties: {
                image: {
                    isVisible: false
                },
                bucket: {
                    isVisible: false
                },
            }
          }
    }],
    rootPath: '/admin',
  })
  
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (login, password) => {
      const user = await Users.findOne({ login })
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword)
        if (matched) {
          return user
        }
      }
      return false
    },
    cookiePassword: 'cco',
}, undefined, {
    resave: true, 
    saveUninitialized: false,
    cookie: {
        // maxAge: (60000 * 60) * 4
    }
})

app.use(adminBro.options.rootPath, router)

const PORT = process.env.PORT || 9090;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDb();
})