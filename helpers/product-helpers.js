
var db = require('../config/connection')
var collection = require('../config/collections');
const async = require('hbs/lib/async');
const { ObjectID } = require('bson');
// var ObjectId = require('mongodb').ObjectId;

const { response } = require('../app');


module.exports = {
    addProduct: (product, callback) => {



        db.get().collection('product').insertOne(product).then((data) => {

            callback(data.insertedId);

        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: ObjectID(prodId) }).then((response) => {
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetails:(prodId)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectID(prodId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(prodId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:ObjectID(prodId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    getUserDetails:()=>{
        return new Promise(async(resolve,reject)=>{
            let users =await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectID(userId)}).then((response)=>{
               console.log(response);
               resolve(response)
           }) 
        })},


    }






        
               

