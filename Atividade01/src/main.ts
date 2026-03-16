import { Cart } from "./services/Cart"
import { Product } from "./models/Product"
import { Category } from "./models/Category"
import { User } from "./models/User"
import { Role } from "./enums/Role"

const electronics: Category = {
  id: 1,
  name: "Eletrônicos"
}

const phone: Product = {
  id: 1,
  name: "Smartphone",
  price: 2000,
  category: electronics
}

const notebook: Product = {
  id: 2,
  name: "Notebook",
  price: 5000,
  category: electronics
}

const user = new User(
  1,
  "cassio",
  "cassio@email.com",
  Role.CUSTOMER
)

const cart = new Cart()

cart.addItem(phone, 1)
cart.addItem(phone, 2)
cart.addItem(notebook, 1)

console.log(user)
console.log(cart.getItems())
console.log(cart.getTotalItems())
console.log(cart.getFinalPrice())