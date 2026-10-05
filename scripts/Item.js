import { Product } from "./Product.js";

/**
 * `Item` somente associa um `Produto` a uma quantidade.
 */
export class Item {
	#product;
	#amount;

	constructor(product, amount) {
		this.#product = product;
		this.#amount = amount;
	}

	getProduct() {
		return (this.#product);
	}

	getAmount() {
		return (this.#amount);
	}

	getTotal() {
		return (this.#product.getPrice() * this.#amount);
	}

	setAmount(amount) {
		if (amount > 0)
			this.#amount = amount;
	}

	increase(amount = 1) {
		this.#amount += amount;
	}

	decrease(amount = 1) {
		this.#amount -= amount;
	}

	toJSON() {
		return ({
			product: this.#product.toJSON(),
			amount: this.#amount
		});
	}
}
