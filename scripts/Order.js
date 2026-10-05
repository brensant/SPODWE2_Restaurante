/**
 * Representa um pedido realizado pelo cliente.
 */
export class Order {
	#id;
	#customer;
	#items;
	#deliveryType;
	#status;
	#date;
	#subtotal;
	#deliveryFee;
	#total;

	constructor(id, customer, items, deliveryType, subtotal, deliveryFee, total, status = "pending",
	            date = new Date().toISOString()) {
		this.#id = id;
		this.#customer = customer;
		this.#items = [...items];
		this.#deliveryType = deliveryType;
		this.#subtotal = subtotal;
		this.#deliveryFee = deliveryFee;
		this.#total = total;
		this.#status = status;
		this.#date = date;
	}

	getId() {
		return (this.#id);
	}

	getCustomer() {
		return (this.#customer);
	}

	getItems() {
		return ([...this.#items]);
	}

	getDeliveryType() {
		return (this.#deliveryType);
	}

	getSubtotal() {
		return (this.#subtotal);
	}

	getDeliveryFee() {
		return (this.#deliveryFee);
	}

	getTotal() {
		return (this.#total);
	}

	getStatus() {
		return (this.#status);
	}

	getDate() {
		return (this.#date);
	}

	setStatus(status) {
		this.#status = status;
	}

	toJSON() {
		return ({
			id: this.#id,
			customer: this.#customer,
			items: this.#items,
			deliveryType: this.#deliveryType,
			subtotal: this.#subtotal,
			deliveryFee: this.#deliveryFee,
			total: this.#total,
			status: this.#status,
			date: this.#date
		});
	}
}
