/**
 * Representa um item do cardápio.
 */
class Product {
	static #productCount = 0;

	#id;
	#name;
	#description
	#price;
	#category;
	#image;

	constructor(name, description, price, category, image) {
		this.#id = ++(Product.#productCount);
		this.#name = name;
		this.#description = description;
		this.#price = price;
		this.#category = category;
		this.#image = image;
	}

	getId() {
		return (this.#id)
	}

	getName() {
		return (this.#name);
	}

	getDescription() {
		return (this.#description);
	}

	getPrice() {
		return (this.#price);
	}

	getCategory() {
		return (this.#category);
	}

	getImage() {
		return (this.#image);
	}
}

/**
 * `Item` somente associa um `Produto` a uma quantidade.
 */
class Item {
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
}

/**
 * `ShoppingCart` é um singleton que agrega objetos do tipo `Item`.
 * */
class ShoppingCart {
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

export { Product, ShoppingCart, Item };
