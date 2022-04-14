

var express = require('express');
const { render } = require('../app');
const productHelpers = require('../helpers/product-helpers')
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
const { dooLogin } = require('../helpers/product-helpers');

const cridential={
  email:'admin@gmail.com',
  password:123
}
const verifyLogin = (req,res,next)=>{
  if(req.session.adminLoggedIn){
    next();
  }else{
    res.redirect('/admin/admin_login')
  }
  
}
//Get admin page
router.get('/',verifyLogin,(req,res,next)=>{
  productHelpers.getAllProducts().then((products)=>{


    
    res.render('admin/view-products',{admin:true,products}) 

    
    
   
  })
 
})



router.get('/admin_login',(req,res)=>{
  if(req.session.adminLoggedIn){
    res.redirect('/admin/')
  }else{
    res.render('admin/admin_login',{admin:true})
  }
})


 router.post('/admin_login', function(req, res) {

  if(req.body.Email==cridential.email && req.body.Password==cridential.password){
    req.session.adminLoggedIn=true;
    
    res.redirect('/admin/')
        
  }else{
    res.send("invalid user name add password")
  }
});



router.get('/view-users',(req,res)=>{
  productHelpers.getUserDetails().then((users)=>{
    console.log(users)
    res.render('admin/view-users',{users})
  })
});

router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  console.log(userId)
  productHelpers.deleteUser(userId).then((response)=>{
    res.redirect('/admin/view-users/')
  })

  
})




router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
});

router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render('admin/add-product')
      }else{
        console.log(err);
      }
    })
  })

})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })

  
})
router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  console.log(req.params.id);
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')
    }
  })
})
module.exports = router;