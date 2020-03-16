function makeShoppingCart ({ db }) {
  return Object.freeze({
    add,
    getItems,
    remove,
    update,
    subtotal
  })

  async function add(item){
    return db.insert(item)
  }

  async function getItems() {
    return db.list()
  }

  async function remove(itemId) {
    return db.remove(itemId)
  }

  async function update(item) {
    return db.update(item)
  }

  async function subtotal() {
    const list = await db.list()
    const subtotal = list.reduce(
      (total, item) => total+= item.price * item.quantity, 0)

    return subtotal
  }
}

module.exports = makeShoppingCart
