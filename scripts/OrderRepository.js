import { Item } from "./Item.js";
import { Order } from "./Order.js";
import { Product } from "./Product.js";

/**
 * Realiza o CRUD interno de pedidos.
 */
export class OrderRepository {
	#orders;
	#nextId;

	constructor() {
		this.#orders = this.#load();
		this.#nextId = this.#getNextId();
	}

	create(customer, items, deliveryType, subtotal, deliveryFee, total) {
		const order = new Order(
			this.#nextId,
			customer,
			items,
			deliveryType,
			subtotal,
			deliveryFee,
			total
		);

		this.#orders.push(order);
		this.#nextId++;

		this.#save();

		return (order);
	}

	getAll() {
		return ([...this.#orders]);
	}

	getById(id) {
		return (this.#orders.find(order => order.getId() === id));
	}

	updateStatus(id, status) {
		const order = this.getById(id);

		if (!order)
			return (false);

		order.setStatus(status);

		this.#save();

		return (order);
	}

	delete(id) {
		const index = this.#orders.findIndex(order => order.getId() === id);

		if (index === -1)
			return (false);

		this.#orders.splice(index, 1);

		this.#save();

		return (true);
	}

	#load() {
		const data = localStorage.getItem("orders");

		if (!data) {
			localStorage.setItem("orders", JSON.stringify([]));
			return ([]);
		}

		return (
			JSON.parse(data).map(order => new Order(
				order.id,
				order.customer,
				order.items.map(item => new Item(
					new Product(
						item.product.id,
						item.product.name,
						item.product.description,
						item.product.price,
						item.product.category,
						item.product.image
					),
					item.amount
				)),
				order.deliveryType,
				order.subtotal,
				order.deliveryFee,
				order.total,
				order.status,
				order.date
			))
		);
	}

	#save() {
		localStorage.setItem("orders", JSON.stringify(this.#orders));
	}

	#getNextId() {
		if (this.#orders.length === 0)
			return (1);

		return (Math.max(...this.#orders.map(order => order.getId())) + 1);
	}
}
