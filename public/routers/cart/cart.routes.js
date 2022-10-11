const express = require('express');

const {Carrito} = require('../../../models/classCarrito')

const cartList = new Carrito("carts.json");

const productList = new Carrito("products.json");

const router = express.Router();


router.post('/', (req, res) => {
    
    cartList.createCart().then(id =>{
      res.json({ success: true, result: id });
     })  
  });

  router.delete('/:id', (req,res)=>{
    const { id } = req.params;
   
    cartList.deleteById(+id).then(result =>{
        if (!result) {
            return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
          }
         return (
            console.log(`product correctly eliminated`)
         )
     })  
})

router.get('/:id/products', (req,res)=>{
    const { id } = req.params;
    cartList.getAll().then(data =>{
        const cart = data.find(product => product.id === +id);
        if (!cart) {
            return res.status(404).json({ success: false, error: `Cart with id: ${id} does not exist!`});
          }
        let cartProducts = cart.products
        res.json({ success: true, result: cartProducts });
        
     })  
})

router.post('/:id/products', (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  
    productList.getById(+productId).then(product =>{
      cartList.saveProduct(+id, product)
      res.json({ success: true, result: product });
    
  })
});

router.delete('/:id/products/:id_prod', (req,res)=>{
  const { id, id_prod } = req.params;
  cartList.deleteProduct(+id, +id_prod)
  res.json({ success: true, result: "product was correctly eliminated" });
  
})
  

module.exports = router;