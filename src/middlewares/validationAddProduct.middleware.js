import { body, validationResult } from "express-validator"


const validateAddProduct = async (req, res, next) => {
    // const {name, price, imageUrl} = req.body
    // let errors = []
    // if(!name || name.trim() == ''){
    //   errors.push('Name should be present')
    // }
    // if(!price || parseFloat(price) < 1){
    //   errors.push('Price should be a number and value should be atleast one')
    // }

    // try{
    //   let newUrl = new URL(imageUrl)
    // }catch(err){
    //   errors.push('Please enter a valid URL')
    // }

    // 1. setup rules for validation
    const rules = [
      body('name').notEmpty().withMessage('Name should be present'),
      body('price').isFloat({gt:0}).withMessage('Price should be a positive value'),
      // body('imageUrl').isURL().withMessage('URL is invalid')
      body('imageUrl').custom((value, {req}) =>{
        if(!req.file){
          throw new Error('Image is required')
        }
      })
    ]
    // 2. run the rules
    await Promise.all(rules.map((rule) => rule.run(req)))


    // 3. check for errors after running the rules 
    let validationErrors = validationResult(req)

    // 4. If there are any errors return error messages
    // console.log(validationErrors.array()[0].msg)
    if (!validationErrors.isEmpty()){
      return res.render('new-product', {errors: validationErrors.array()[0].msg})
    }
    next()
}
    

export default validateAddProduct