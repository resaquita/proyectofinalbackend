const express = require('express');

const {Carrito} = require('../../../models/classCarrito')

const cartList = new Carrito("carts.json");

const router = express.Router();

router.get('/:id/products', (req,res)=>{
  //me permite listar todos los productos guardados en el carrito
  cartList.getAll().then(products =>{
    res.render('./partials/vista', {products})
      })
     })  


router.get('/:id', (req,res)=>{
    const { id } = req.params;
    productList.getAll().then(data =>{
        const product = data.find(product => product.id === +id);
        if (!product) {
            return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
          }
        let products = [product]
        res.render('./partials/vista', {products})
        
     })  
})


router.post('/', (req, res) => {
  //crea un carrito y devuelve su id
    const { title, description, price, image, stock } = req.body;
    let admin = true
    if (!admin){
      return res.status(500).json({ error : -1, descripcion: "acceso no autorizado" });
    }
    if ( !title || !description || !price || !image || !stock) {
      return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
      title,
      description,
      price: +(price),
      image,
      stock
    };
    productList.save(newProduct).then(products =>{
      res.render('main')
     })  
  });


  router.put('/:productId', (req, res) => {
    const { params: { productId }, body: { title, description, price, image, stock} } = req;
    let admin = true
    if (!admin){
      return res.status(500).json({ error : -1, descripcion: "acceso no autorizado" });
    }
    if ( !title || !description || !price || !image || !stock) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    console.log(productId)
    productList.getById(productId).then(result =>{
        if(!result){
            return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!`})
        }

    })

    const newProduct = {
      title,
       description,
       price,
       image,
       stock,
       id: +productId,
       timestamp: Date.now(),
     };
     productList.edit(newProduct).then(result =>{
        return res.json({ success: true, result: newProduct });
    }) 
     
  });


router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    let admin = true
    if (!admin){
      return res.status(500).json({ error : -1, descripcion: "acceso no autorizado" });
    }
    productList.deleteById(+id).then(result =>{
        if (!result) {
            return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
          }
         return (
            console.log(`product correctly eliminated`)
         )
     })  
})

module.exports = router;