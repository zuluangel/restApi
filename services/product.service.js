const faker = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductService {

  constructor(){
    this.products = []
    this.generate()
  }

  generate(){
    const limit = 30
    for (let i=0; i<limit; i++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

find(){
    return new Promise((resolve, reject)=> {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }

  async findOne(id){
    return this.products.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1){
      throw new Error('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1){
      throw new Error('Product not found')
    }
    this.products.splice(index, 1)
    return {id}
  }
}

module.exports = ProductService
