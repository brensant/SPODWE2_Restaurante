document.addEventListener("DOMContentLoaded", () => {
	const buttonClient = document.getElementById("button-client");
	const buttonAdmin = document.getElementById("button-admin");

	buttonClient.addEventListener("click", () => {
		document.location.href = "./pages/order.html";
	});

	buttonAdmin.addEventListener("click", () => {
		document.location.href = "./pages/admin.html"
	})
});
