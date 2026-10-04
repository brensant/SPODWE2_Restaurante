import { Item } from "./Item";

/**
 * `ShoppingCart` é um singleton que agrega objetos do tipo `Item`.
 * */
export class ShoppingCart {
	static #instance = null;

	#items = new Array();

	constructor() {
		if (ShoppingCart.#instance)
			return (ShoppingCart.#instance);

		ShoppingCart.#instance = this;
	}

	static getInstance() {
		if (!ShoppingCart.#instance)
			ShoppingCart.#instance = new ShoppingCart();

		return (ShoppingCart.#instance);
	}

	addItem(item) {
		const index = this.#items.findIndex(
			i => i.getProduct().getId() === item.getProduct().getId()
		);

		if (index == -1)
			this.#items.push(item);
		else
			this.#items[index].setAmount(item.getAmount());
	}

	removeItem(item) {
		const index = this.#items.findIndex(
			i => i.getProduct().getId() === item.getProduct().getId()
		);

		if (index > -1)
			this.#items.splice(index, 1);
	}

	clear() {
		this.#items = [];
	}

	getTotal() {
		let total = 0;

		this.#items.forEach(item => {
			total += item.getTotal();
		});

		return (total);
	}
}
