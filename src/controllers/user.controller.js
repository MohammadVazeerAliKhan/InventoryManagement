import UserModel from "../models/user.model.js"
// import ProductModel from "../models/product.model.js"
export default class UserController{
  getRegister(req, res){
    res.render('register')
  }

  getLogin(req, res){
    res.render('login', {errorMessage : null})
  }

  postRegister(req, res){
    const {name, email, password} = req.body
    UserModel.add(name, email, password)
    res.redirect('/login')
  }

  postLogin(req, res){
    const {email, password} = req.body
    const validUser = UserModel.isValidUser(email, password)
    console.log(validUser)
    if (!validUser){
      return res.render('login', {
        errorMessage: 'Invalid Credentials'
      })
    }
    req.session.userEmail = email
    console.log(req.session)
    // let products = ProductModel.get()
    // return res.render('products', {products: products})
    return res.redirect('/')
  }

  logout(req, res){
    // destroy the session id in cookie
    req.session.destroy((err)=>{
      if(err){
        console.log(err)
      }
      else{
        res.redirect('/login')
      }
    })

    res.clearCookie('lastVisit')
  }

}