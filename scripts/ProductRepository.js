import { menu } from "./menu.js";
import { Product } from "./Product.js";

/**
 * Realiza o CRUD interno de produtos.
 */
export class ProductRepository {
	#products;
	#nextId;

	constructor() {
		this.#products = this.#load();
		this.#nextId = this.#getNextId();
	}

	create(name, description, price, category, image) {
		if (this.getByName(name) != null) {
			alert(`Erro: produto com o nome "${name}" já existe.`);
			return (null);
		}

		const product = new Product(this.#nextId, name, description, price, category, image);

		this.#products.push(product);
		this.#nextId++;

		this.#save();

		return (product);
	}

	getAll() {
		return ([...this.#products]);
	}

	getById(id) {
		return (this.#products.find(product => product.getId() === id));
	}

	getByName(name) {
		return (this.#products.find(product => product.getName() === name));
	}

	update(id, data) {
		const product = this.getById(id);

		if (!product)
			return (false);

		product.setName(data.name);
		product.setDescription(data.description);
		product.setPrice(data.price);
		product.setCategory(data.category);
		product.setImage(data.image);

		this.#save();
		return (product);
	}

	delete(id) {
		const index = this.#products.findIndex(
			product => product.getId() === id
		);

		if (index === -1)
			return (false);

		this.#products.splice(index, 1);

		this.#save();
		return (true);
	}

	#load() {
		const data = localStorage.getItem("menu");

		if (!data) {
			localStorage.setItem("menu", JSON.stringify(menu));
			return (menu);
		}

		return (JSON.parse(data).map(product => new Product(
			product.id,
			product.name,
			product.description,
			product.price,
			product.category,
			product.image
		)));
	}

	#save() {
		localStorage.setItem("menu", JSON.stringify(this.#products));
	}

	#getNextId() {
		if (this.#products.length === 0)
			return (1);

		return (Math.max(...this.#products.map(product => product.getId())) + 1);
	}
}
