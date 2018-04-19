/* eslint-env mocha,chai */

const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");
const {expect} = require('chai')
const {db, Product} = require('./index')
chai.use(chaiAsPromised)

describe('Product model', () => {
  
  let product

  beforeEach(async () => {
    await db.sync({force: true})
    product = await Product.create({
      name: 'Laptop',
      description: 'Dell XPS 15',
      price: 999.99,
      inventoryQuantity: 2,
    })
  })

  it('Should have a name property', () => {
    expect(product).to.have.property('name')
  })

  it('It will be rejected if a name is not given', async () => {
    await expect(Product.create({
      description: 'Dell XPS 15',
      price: 999.99,
      inventoryQuantity: 2,
    })).to.be.rejected
  })

  it('It will be rejected if an empty string is passed into the name', async () => {
    await expect(Product.create({
      name: '',
      description: 'Dell XPS 15',
      price: 999.99,
      inventoryQuantity: 2,
    })).to.be.rejected
  })

  it('Should have a description property', () => {
    expect(product).to.have.property('description')
  })

  it('It will be rejected if a description is not given', async () => {
    await expect(Product.create({
      name: 'Laptop',
      price: 999.99,
      inventoryQuantity: 2,
    })).to.be.rejected
  })

  it('It will be rejected if an empty string is passed into the description', async () => {
    await expect(Product.create({
      name: 'Laptop',
      description: '',
      price: 999.99,
      inventoryQuantity: 2,
    })).to.be.rejected
  })

  it('Should have a price property', () => {
    expect(product).to.have.property('price')
  })

  it('It will be rejected if a price is not given', async () => {
    await expect(Product.create({
      name: 'Laptop',
      description: 'Dell XPS 15',
      inventoryQuantity: 2,
    })).to.be.rejected
  })

  it('Price should be saved as a number', () => {
    expect(typeof product.price).to.equal('number')
  })

  it('Should have an inventoryQuantity property', () => {
    expect(product).to.have.property('inventoryQuantity')
  })

  it('It will be rejected if an inventoryQuantity is not given', async () => {
    await expect(Product.create({
      name: 'Laptop',
      description: 'Dell XPS 15',
      price: 999.99,
    })).to.be.rejected
  })

  it('InventoryQuantity should be saved as a number', () => {
    expect(typeof product.inventoryQuantity).to.equal('number')
  })

  it('Should have an imgUrl property', () => {
    expect(product).to.have.property('imgUrl')
  })

  it('It will be fulfilled if an imgUrl is not given', async () => {
    await expect(Product.create({
      name: 'Laptop',
      description: 'Dell XPS 15',
      price: 999.99,
      inventoryQuantity: 2,
    })).to.be.fulfilled
  })

  it('imgUrl has a default value', () => {
    expect(product.imgUrl).to.equal('./img/defaultpic.png')
  })

})