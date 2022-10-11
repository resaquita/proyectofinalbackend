const fs = require('fs');

class Carrito {

     constructor(nombreArchivo){
         this.name=nombreArchivo
        
    }
    
    async getAll(){
        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            return contenidojson
        }
        catch(error){
            console.log(error)
        }
        return contenidojson
    }

    async createCart(){

        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            let ultimoIndice = contenidojson.length - 1
            let ultimoId = contenidojson[ultimoIndice].id
            let newCart = {id: ultimoId + 1, timestamp: Date.now(), products: []}
            contenidojson.push(newCart)
            let id = newCart.id
            await fs.promises.writeFile(`./models/${this.name}`, JSON.stringify(contenidojson))

            return id
        } 
        catch(error){
            console.log(error)
        }
    }

    async saveProduct(id, object){

        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            const cart = contenidojson.find(cart => cart.id === +id);
            cart.products.push(object)
            await fs.promises.writeFile(`./models/${this.name}`, JSON.stringify(contenidojson));
            
        } 
        catch(error){
            console.log(error)
        }
    }
    
    async deleteProduct(id, id_prod){

        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            const cart = contenidojson.find(cart => cart.id === +id);
            if(cart){
                cart.products.splice(cart.products.findIndex(function(i){
                    return i.id===id_prod
            }),1)
            await fs.promises.writeFile(`./models/${this.name}`, JSON.stringify(contenidojson));
            } 
        }
        catch(error){
            console.log(error)
        }
    }
    async deleteById(id){
        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            const cart = contenidojson.find(cart => cart.id === +id);
            if(cart){
                contenidojson.splice(contenidojson.findIndex(function(i){
                    return i.id===id
            }),1)
            await fs.promises.writeFile(`./models/${this.name}`, JSON.stringify(contenidojson));
            const cartId = id
            return cartId
        };
            
        }
        catch(error){
            console.log(error)
        }
        
    }

    async getById(id){
        try{
            let contenido = await fs.promises.readFile(`./models/${this.name}`, 'utf-8');
            let contenidojson = JSON.parse(contenido);
            const object = contenidojson.find(x => x.id === +id)
            return object
        }
        catch(error){
            console.log(error)
        }
        
        return object
    }
    
}

module.exports = {Carrito}
