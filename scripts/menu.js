import { Product } from "./Product.js";

/* Cardápio base da aplicação */
export const menu = [
	new Product(
		1,
		"X-Burger",
		"Hambúrguer artesanal com queijo",
		25.90,
		"Hambúrgueres",
		"https://picsum.photos/400/300",
	),
	new Product(
		2,
		"X-Salada",
		"Hambúrguer artesanal com queijo e salada",
		28.90,
		"Hambúrgueres",
		"https://picsum.photos/400/300",
	),
	new Product(
		3,
		"Batata Frita",
		"Porção de batata frita",
		15.00,
		"Porções",
		"https://picsum.photos/400/300",
	),
	new Product(
		4,
		"Refrigerante",
		"Refrigerante de latinha 350ml",
		10.00,
		"Bebidas",
		"https://picsum.photos/400/300",
	),
	new Product(
		5,
		"Milkshake",
		"Milkshake com pedaços de fruta",
		12.00,
		"Sobremesas",
		"https://picsum.photos/400/300",
	)
];
