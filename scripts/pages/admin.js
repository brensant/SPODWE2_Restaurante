import { Product } from "../Product.js";
import { ProductRepository } from "../ProductRepository.js";

const pr = new ProductRepository();

document.addEventListener("DOMContentLoaded", () => {
	populateProductsTable();

	setupNewProductForm();
	setupEditProductForm();
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

	newRow.dataset.id = product.getId();
	newRow.classList.add("hover:bg-gray-200", "cursor-pointer");
	newRow.innerHTML = `
		<td class="p-2 border">${product.getId()}</th>
		<td class="p-2 border">${product.getName()}</th>
		<td class="p-2 border">${product.getDescription()}</th>
		<td class="p-2 border">${Number.parseFloat(product.getPrice()).toFixed(2)}</th>
		<td class="p-2 border">${product.getCategory()}</th>
		<td class="p-2 border"><img src="${product.getImage()}" class="max-w-30"></th>
	`;
	newRow.addEventListener("click", () => {
		const editForm = document.getElementById("form-edit");

		const id = document.getElementById("input-edit-id");
		const name = document.getElementById("input-edit-name");
		const description = document.getElementById("input-edit-description");
		const price = document.getElementById("input-edit-price");
		const category = document.getElementById("select-edit-category");
		const image = document.getElementById("input-edit-image");

		id.value = newRow.dataset.id;
		name.value = product.getName();
		description.value = product.getDescription();
		price.value = product.getPrice();
		category.value = product.getCategory();
		image.value = product.getImage();
	});

	return (newRow);
}

function setupNewProductForm() {
	const formCreate = document.querySelector("#form-create");

	formCreate.addEventListener("submit", (event) => {
		event.preventDefault()

		const name = document.getElementById("input-create-name").value.trim();
		const description = document.getElementById("input-create-description").value.trim();
		const price = Number.parseFloat(document.getElementById("input-create-price").value.trim());
		const category = document.getElementById("select-create-category").value.trim();
		const image = document.getElementById("input-create-image").value.trim();

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
			alert("Produto cadastrado!");
		}
	});
}

function setupEditProductForm() {
	const formEdit = document.getElementById("form-edit");

	formEdit.addEventListener("submit", (event) => {
		event.preventDefault();

		const inputId = document.getElementById("input-edit-id");
		const inputName = document.getElementById("input-edit-name");
		const inputDescription = document.getElementById("input-edit-description");
		const inputPrice = document.getElementById("input-edit-price");
		const inputCategory = document.getElementById("select-edit-category");
		const inputImage = document.getElementById("input-edit-image");

		const id = Number.parseInt(inputId.value);

		const product = pr.update(id, {
			name: inputName.value.trim(),
			description: inputDescription.value.trim(),
			price: Number.parseFloat(inputPrice.value.trim()),
			category: inputCategory.value.trim(),
			image: inputImage.value.trim()
		});

		if (product != false) {
			const oldRow = document.querySelector(`tr[data-id='${id}']`);
			const updatedRow = createRowFromProduct(product);

			oldRow.replaceWith(updatedRow);
			alert(`Produto ID ${id} atualizado`);
		}
	});

	const deleteButton = document.getElementById("button-edit-delete");

	deleteButton.addEventListener("click", () => {
		const inputId = document.getElementById("input-edit-id");
		const inputName = document.getElementById("input-edit-name");
		const inputDescription = document.getElementById("input-edit-description");
		const inputPrice = document.getElementById("input-edit-price");
		const inputCategory = document.getElementById("select-edit-category");
		const inputImage = document.getElementById("input-edit-image");

		const id = Number.parseInt(inputId.value);

		if (pr.delete(id)) {
			const oldRow = document.querySelector(`tr[data-id='${id}']`);
			console.log(oldRow);
			oldRow.remove();

			cleanEditForm();
			alert(`Produto ID ${id} removido`);
		}
	});
}

function cleanEditForm(rowId) {
	const inputId = document.getElementById("input-edit-id");
	const inputName = document.getElementById("input-edit-name");
	const inputDescription = document.getElementById("input-edit-description");
	const inputPrice = document.getElementById("input-edit-price");
	const inputCategory = document.getElementById("select-edit-category");
	const inputImage = document.getElementById("input-edit-image");

	inputId.value = "";
	inputName.value = "";
	inputDescription.value = "";
	inputPrice.value = "";
	inputCategory.value = "";
	inputImage.value = "";
}
