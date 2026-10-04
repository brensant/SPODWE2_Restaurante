import { Product } from "../Product.js";
import { ProductRepository } from "../ProductRepository.js";
import { menu } from "../menu.js";

const pr = new ProductRepository();

document.addEventListener("DOMContentLoaded", () => {
	populateProductsTable();

	setupNewProductForm();
});

/**
 * Popula a `<table>` de produtos com os registros atuais.
 */
function populateProductsTable() {
	const tableBody = document.getElementById("table-body");

	const products = pr.getAll();

	products.forEach(p => {
		tableBody.appendChild(createRowFromProduct(p));
	});
}

function createRowFromProduct(product) {
	const newRow = document.createElement("tr");

	newRow.innerHTML = `
		<td class="p-2 border">${product.getId()}</th>
		<td class="p-2 border">${product.getName()}</th>
		<td class="p-2 border">${product.getDescription()}</th>
		<td class="p-2 border">${Number.parseFloat(product.getPrice()).toFixed(2)}</th>
		<td class="p-2 border">${product.getCategory()}</th>
		<td class="p-2 border"><img src="${product.getImage()}"></th>
	`;

	return (newRow);
}

function setupNewProductForm() {
	const form = document.querySelector("form");

	form.addEventListener("submit", (event) => {
		event.preventDefault()

		const name = document.getElementById("input-name").value;
		const description = document.getElementById("input-description").value;
		const price = Number.parseFloat(document.getElementById("input-price").value);
		const category = document.getElementById("select-category").value;
		const image = document.getElementById("input-image").value;

		if (name == "" || description == "" || price === "" || category == "" || image == "") {
			alert("Por favor, preencha todos os campos.");
			return;
		}

		if (price <= 0) {
			alert("Preço inválido.");
			return;
		}

		const newProduct = pr.create(name, description, price, category, image);

		if (newProduct != null) {
			const tableBody = document.getElementById("table-body");
			tableBody.appendChild(createRowFromProduct(newProduct));
		}
	});
}
