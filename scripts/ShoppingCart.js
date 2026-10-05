import { Item } from "./Item.js";
import { Product } from "./Product.js";

/**
 * `ShoppingCart` agrega objetos do tipo `Item`.
 * */
export class ShoppingCart {
	#items;

	constructor() {
		this.#items = this.#load();
	}

	getItems() {
		return ([...this.#items]);
	}

	addItem(item) {
		const index = this.#items.findIndex(
			i => i.getProduct().getId() === item.getProduct().getId()
		);

		if (index == -1)
			this.#items.push(item);
		else
			this.#items[index].increase(item.getAmount());

		this.#save();
	}

	removeItem(item) {
		const index = this.#items.findIndex(
			i => i.getProduct().getId() === item.getProduct().getId()
		);

		if (index > -1)
			this.#items.splice(index, 1);

		this.#save();
	}

	clear() {
		this.#items = [];

		this.#save();
	}

	getSubtotal() {
		let subtotal = 0;

		this.#items.forEach(item => {
			subtotal += item.getTotal();
		});

		return (subtotal);
	}

	#load() {
		const data = localStorage.getItem("shoppingCart");

		if (!data) {
			localStorage.setItem("shoppingCart", JSON.stringify([]));
			return ([]);
		}

		return (
			JSON.parse(data).map(item => new Item(
				new Product(
					item.product.id,
					item.product.name,
					item.product.description,
					item.product.price,
					item.product.category,
					item.product.image
				),
				item.amount
			))
		);
	}

	#save() {
		localStorage.setItem("shoppingCart", JSON.stringify(this.#items));
	}
}
