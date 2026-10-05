/**
 * Representa um item do cardápio.
 */
export class Product {
	static #productCount = 0;

	#id;
	#name;
	#description
	#price;
	#category;
	#image;

	constructor(id, name, description, price, category, image) {
		this.#id = id;
		this.#name = name;
		this.#description = description;
		this.#price = price;
		this.#category = category;
		this.#image = image;
	}

	getId() {
		return (this.#id);
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

	setName(name) {
		this.#name = name ?? this.#name;
	}

	setDescription(description) {
		this.#description = description ?? this.#description;
	}

	setPrice(price) {
		if (price < 0)
			throw new Error("Preço inválido");

		this.#price = price ?? this.#price;
	}

	setCategory(category) {
		this.#category = category ?? this.#category;
	}

	setImage(image) {
		this.#image = image ?? this.#image;
	}

	toJSON() {
		return ({
			id: this.#id,
			name: this.#name,
			description: this.#description,
			price: this.#price,
			category: this.#category,
			image: this.#image
		});
	}
}
