const makeShoppingCart = require('./shopping-cart.js')
const makeDb = require('./shopping-cart-db.js')

describe('shopping-cart', () => {
  let cart
  beforeEach(() => {
    const db = makeDb();
    cart = makeShoppingCart({ db })
  })
  it('adds an item', async () => {
    const item = { id: '34', name: 'Codemaster 4000', price: 2999, quantity: 2 }
    await cart.add(item)
    expect(await cart.getItems()).toContainEqual(item)
  })
  it('removes an item', async () => {
    const item = { id: '35', name: 'ThrustCoder 40k', price: 3999, quantity: 4 }
    await cart.add(item)
    await cart.remove(item.id)
    expect(await cart.getItems()).not.toContainEqual(item)
  })
  it("updates an item's quantity", async () => {
    const item = { id: '36', name: 'HackaMole 20000', price: 10000, quantity: 2 }
    const newQuantity = 3
    const newItem = {...item, quantity: newQuantity}
    await cart.add(item)
    await cart.update(newItem)
    expect(await cart.getItems()).toContainEqual(newItem)
  })
  it.todo('lists items')
  it.todo('calculates a subtotal price')

})
