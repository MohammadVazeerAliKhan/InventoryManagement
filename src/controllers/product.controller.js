import path from "path"
import ProductModel from "../models/product.model.js"


export default class ProductController{

  getProducts(req, res) {
    let products = ProductModel.get()
    // console.log(products)
    // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'))
    res.render('products', {products: products, userEmail: req.session.userEmail })
  }

  getAddForm(req, res){
    res.render('new-product', { userEmail: req.session.userEmail, errors: null})
  }

  postAddProduct(req, res) {
    // console.log(req.body)
    const {name, desc, price} = req.body
    const imageUrl = 'images/' + req.file.filename
    ProductModel.add(name, desc, price, imageUrl)
    let products = ProductModel.get()
    return res.render('products', {products: products, userEmail: req.session.userEmail})
  }


  getUpdateProductView(req, res){
    // 1. if products exists return view
    const id = req.params.id
    const productFound = ProductModel.getById(id)
    // console.log(productFound)
    if(productFound){
      res.render('update-product', {product: productFound, errors: null, userEmail: req.session.userEmail})
    }

    // 2. else return errors
    else{
      res.status(401).send('Product not found')
    }
  }


  postUpdateProduct(req, res){
    ProductModel.update(req.body)
    let products = ProductModel.get()
    return res.render('products', {products: products, userEmail: req.session.userEmail})
  }

  postDeleteProduct(req, res){
    const id = req.params.id
    const productFound = ProductModel.getById(id)
    if(!productFound){
      return res.status(401).send('Product not found')
    }
    ProductModel.delete(id)
    let products = ProductModel.get()
    return res.render('products', {products: products, userEmail: req.session.userEmail})
  }


}