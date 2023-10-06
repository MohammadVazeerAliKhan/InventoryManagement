import ProductController from "./src/controllers/product.controller.js"
import validateAddProduct from "./src/middlewares/validationAddProduct.middleware.js"
import { uploadFile } from "./src/middlewares/file-upload.middleware.js"
import express from "express"
import path from "path"
import expressEjsLayouts from "express-ejs-layouts"
import UserController from "./src/controllers/user.controller.js"
import session from "express-session"
import { auth } from "./src/middlewares/auth.middleware.js"
import cookieParser from "cookie-parser"
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js"
import { cookie } from "express-validator"

// Creating server using express
const server = express()

// Parse form data
server.use(express.urlencoded({extended: true}))


// Setting view engine
server.set('view engine','ejs')

server.set('views', path.join(path.resolve(), 'src', 'views'))

server.use(expressEjsLayouts)

server.use(cookieParser())
server.use(setLastVisit)

server.use(session({
  secret: 'SecretKey',
  resave : false,
  saveUninitialized: true,
  cookie: {secure : false},
}))

// Creating instance of imported product controller class
const productController = new ProductController()
const userController = new UserController()

// Handling request in class method getProducts
server.get('/', auth, productController.getProducts)
server.get('/add-product',auth, productController.getAddForm)
server.post('/', uploadFile.single('imageUrl'), auth,validateAddProduct, productController.postAddProduct)
server.get('/register', userController.getRegister)
server.get('/login', userController.getLogin)
server.post('/register',userController.postRegister)
server.post('/login', userController.postLogin)
server.get('/logout',userController.logout)
server.get('/update-product/:id', auth,productController.getUpdateProductView)
server.post('/update-product/',uploadFile.single('imageUrl'), auth, productController.postUpdateProduct)
server.post('/delete-product/:id', auth,productController.postDeleteProduct)


// Serving static files access to clients
server.use(express.static('public'))
server.use(express.static('src/views'))

// Listening server on port
server.listen(4600,()=> console.log('Server is running on port 4600'))