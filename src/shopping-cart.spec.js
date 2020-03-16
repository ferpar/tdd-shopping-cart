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
  it('lists items', async () => {
    const item1 = { id: '34', name: 'Codemaster 4000', price: 2999, quantity: 2 }
    const item2 = { id: '35', name: 'ThrustCoder 40k', price: 3999, quantity: 4 }
    const item3 = { id: '36', name: 'HackaMole 20000', price: 10000, quantity: 2 }
    
    await cart.add(item1)
    await cart.add(item2)
    await cart.add(item3)

    const list = await cart.getItems()

    expect(Array.isArray(list)).toBe(true)
    expect(list).toEqual([item1, item2, item3])

  })
  it('calculates a subtotal price', async () => {
    const item1 = { id: '34', name: 'Codemaster 4000', price: 2999, quantity: 2 }
    const item2 = { id: '35', name: 'ThrustCoder 40k', price: 3999, quantity: 4 }
    const item3 = { id: '36', name: 'HackaMole 20000', price: 10000, quantity: 2 }
    
    await cart.add(item1)
    await cart.add(item2)
    await cart.add(item3)

    const expectedPrice = [item1,item2,item3].reduce(
      (ac,item) => { return ac += item.price*item.quantity }
      , 0)

    const calculatedPrice = await cart.subtotal()

    expect(calculatedPrice).toEqual(expectedPrice)
  
  })

})
