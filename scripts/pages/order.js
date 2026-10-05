import { OrderRepository } from "../OrderRepository.js";
import { Item } from "../Item.js";
import { ProductRepository } from "../ProductRepository.js";
import { ShoppingCart } from "../ShoppingCart.js";

const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();
const cart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", () => {
	renderCategories();
	renderProducts();
	renderCart();

	setupDeliveryType();
	setupClearCart();
	setupFinishOrder();
});

/*
 * ------------------------------------------------------------
 * Produtos
 * ------------------------------------------------------------
 */

function renderProducts(category = "all") {
	const productList = document.getElementById("product-list");

	productList.replaceChildren();

	const products = productRepository.getAll();

	const filteredProducts = category === "all"
		? products
		: products.filter(product => product.getCategory() === category);

	filteredProducts.forEach(product => {
		productList.appendChild(createProductCard(product));
	});
}

function createProductCard(product) {
	const article = document.createElement("article");

	article.classList.add(
		"overflow-hidden",
		"rounded-2xl",
		"bg-white",
		"shadow-sm",
		"transition",
		"hover:-translate-y-0.5",
		"hover:shadow-md"
	);

	article.innerHTML = `
		<img src="${product.getImage()}" alt="${product.getName()}" class="h-48 w-full object-cover">
		<div class="p-5">
			<div class="mb-2 flex items-start justify-between gap-4">
				<h2 class="font-semibold">${product.getName()}</h2>
				<span class="shrink-0 font-semibold">${formatCurrency(product.getPrice())}</span>
			</div>
			<p class="mb-4 text-sm leading-relaxed text-gray-600">${product.getDescription()}</p>
			<button type="button" class="add-product w-full rounded-lg bg-yellow-300 p-4 text-md font-semibold text-black hover:text-white transition hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer">
				Adicionar
			</button>
		</div>
	`;

	article.querySelector(".add-product").addEventListener("click", () => {
		cart.addItem(new Item(product, 1));
		renderCart();
	});

	return (article);
}

/*
 * ------------------------------------------------------------
 * Categorias
 * ------------------------------------------------------------
 */

function renderCategories() {
	const container = document.getElementById("category-filter");

	const categories = [
		...new Set(
			productRepository
				.getAll()
				.map(product => product.getCategory())
		)
	];

	categories.forEach(category => {
		const button = document.createElement("button");

		button.type = "button";
		button.textContent = category;

		button.className = [
			"category-button",
			"rounded-full",
			"border",
			"border-gray-300",
			"px-4",
			"py-2",
			"text-sm",
			"font-medium",
			"text-gray-700",
			"transition",
			"hover:bg-gray-100"
		].join(" ");

		button.dataset.category = category;

		button.addEventListener("click", () => {
			setActiveCategory(button);
			renderProducts(category);
		});

		container.appendChild(button);
	});
}

function setActiveCategory(activeButton) {
	document
		.querySelectorAll(".category-button")
		.forEach(button => {
			button.classList.remove(
				"bg-gray-900",
				"text-white"
			);

			button.classList.add(
				"border-gray-300",
				"text-gray-700"
			);
		});

	activeButton.classList.remove(
		"border-gray-300",
		"text-gray-700"
	);

	activeButton.classList.add(
		"bg-gray-900",
		"text-white"
	);
}

/*
 * ------------------------------------------------------------
 * Carrinho
 * ------------------------------------------------------------
 */

function renderCart() {
	const container = document.getElementById("cart-items");

	container.replaceChildren();

	const items = cart.getItems();

	if (items.length === 0) {
		const empty = document.createElement("div");

		empty.className = "px-5 py-10 text-center text-sm text-gray-500";

		empty.innerHTML = `
			<p class="font-medium text-gray-700">Seu carrinho está vazio.</p>
			<p class="mt-1">Adicione produtos do cardápio para começar.</p>
		`;

		container.appendChild(empty);
	} else {
		items.forEach(item => {
			container.appendChild(createCartItem(item));
		});
	}

	updateCartSummary();
}

function createCartItem(item) {
	const product = item.getProduct();

	const element = document.createElement("div");

	element.className = "p-5";

	element.innerHTML = `
		<div class="flex gap-3">
			<img src="${product.getImage()}" alt="" class="h-16 w-16 shrink-0 rounded-lg object-cover">
			<div class="min-w-0 flex-1">
				<div class="flex items-start justify-between gap-3">
					<h3 class="text-sm font-semibold">${product.getName()}</h3>
					<button type="button" class="remove-item text-xs font-medium text-red-600 hover:text-red-800">
						Remover
					</button>
				</div>
				<p class="mt-1 text-sm text-gray-600">${formatCurrency(item.getTotal())}</p>
				<div class="mt-3 flex items-center justify-between">
					<div class="flex items-center rounded-lg border">
						<button type="button" class="decrease px-3 py-1.5 text-gray-600 hover:bg-gray-100" aria-label="Diminuir quantidade">
							-
						</button>
						<span class="quantity min-w-8 text-center text-sm font-medium">${item.getAmount()}</span>
						<button type="button" class="increase px-3 py-1.5 text-gray-600 hover:bg-gray-100" aria-label="Aumentar quantidade">
							+
						</button>
					</div>
					<span class="text-sm font-semibold">${formatCurrency(item.getTotal())}</span>
				</div>
			</div>
		</div>
	`;

	element
		.querySelector(".increase")
		.addEventListener("click", () => {
			item.increase();
			renderCart();
		});

	element.querySelector(".decrease").addEventListener("click", () => {
		if (item.getAmount() === 1) {
			cart.removeItem(item);
		} else {
			item.decrease();
		}

		renderCart();
	});

	element.querySelector(".remove-item").addEventListener("click", () => {
		cart.removeItem(item);
		renderCart();
	});

	return (element);
}

/*
 * ------------------------------------------------------------
 * Resumo
 * ------------------------------------------------------------
 */

function updateCartSummary() {
	const subtotal = cart.getSubtotal();

	document.getElementById("cart-subtotal").textContent =
		formatCurrency(subtotal);

	updateDeliveryFee();
	updateFinishButton();
}

function updateDeliveryFee() {
	const deliveryType = document.querySelector(
		'input[name="delivery-type"]:checked'
	).value;

	const fee = getDeliveryFee(deliveryType);

	document.getElementById("delivery-fee").textContent =
		formatCurrency(fee);

	document.getElementById("cart-total").textContent =
		formatCurrency(cart.getSubtotal() + fee);
}

/*
 * ------------------------------------------------------------
 * Tipo de entrega
 * ------------------------------------------------------------
 */

function setupDeliveryType() {
	document
		.querySelectorAll('input[name="delivery-type"]')
		.forEach(input => {
			input.addEventListener("change", () => {
				updateDeliveryFee();
			});
		});
}

/*
 * ------------------------------------------------------------
 * Limpar
 * ------------------------------------------------------------
 */

function setupClearCart() {
	document
		.getElementById("clear-cart")
		.addEventListener("click", () => {

			if (cart.getItems().length === 0)
				return;

			if (!confirm("Deseja realmente limpar o carrinho?"))
				return;

			cart.clear();
			renderCart();
		});
}

/*
 * ------------------------------------------------------------
 * Finalização
 * ------------------------------------------------------------
 */

function setupFinishOrder() {
	document
		.getElementById("finish-order")
		.addEventListener("click", () => {
			finishOrder();
		});
}

function finishOrder() {
	const items = cart.getItems();

	if (items.length === 0) {
		alert("Adicione pelo menos um produto ao pedido.");
		return;
	}

	const name = document.getElementById("customer-name").value.trim();
	const phone = document.getElementById("customer-phone").value.trim();

	if (name === "") {
		alert("Informe o nome do cliente.");
		return;
	}

	const deliveryType = document.querySelector('input[name="delivery-type"]:checked').value;

	const subtotal = cart.getSubtotal();
	const deliveryFee = getDeliveryFee(deliveryType);
	const total = subtotal + deliveryFee;

	const customer = {
		name: name,
		phone: phone
	};

	const order = orderRepository.create(customer, items, deliveryType, subtotal, deliveryFee, total);

	cart.clear();

	renderCart();

	document.getElementById("customer-name").value = "";
	document.getElementById("customer-phone").value = "";

	showOrderSuccess(order);
}

function showOrderSuccess(order) {
	const element = document.getElementById("order-success");

	element.classList.remove("hidden");

	element.textContent = `Pedido #${order.getId()} realizado com sucesso. ` + `Total: ${formatCurrency(order.getTotal())}`;
}

function getDeliveryFee(deliveryType) {
	if (deliveryType === "delivery")
		return (2.50);

	return (0);
}

function updateFinishButton() {
	const button = document.getElementById("finish-order");

	button.disabled = cart.getItems().length === 0;
}

/*
 * ------------------------------------------------------------
 * Utilidades
 * ------------------------------------------------------------
 */

function formatCurrency(value) {
	return (Number(value).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	}));
}
