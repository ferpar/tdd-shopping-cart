function makeShoppingCart ({ db }) {
  return Object.freeze({
    add,
    getItems,
    remove,
    update
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

}

module.exports = makeShoppingCart
