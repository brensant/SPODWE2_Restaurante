# Sistema de Pedidos para Restaurante

Sistema web para gerenciamento de produtos de um restaurante e montagem de pedidos pelos clientes.

O projeto foi desenvolvido como atividade da disciplina **Desenvolvimento Web 2**, com foco na aplicação de conceitos de **Programação Orientada a Objetos (POO)**, operações de **CRUD**, manipulação do **DOM**, armazenamento no navegador e construção de uma interface de pedidos.

## Tecnologias

* HTML5
* CSS
* TailwindCSS
* JavaScript
* LocalStorage
* Programação Orientada a Objetos (POO)

## Objetivo

O sistema permite que o cliente visualize o cardápio, filtre os produtos por categoria, adicione produtos ao carrinho, altere suas quantidades e finalize um pedido.

Os produtos e pedidos são representados por classes JavaScript, enquanto os repositórios são responsáveis pelas operações de persistência no `localStorage`.

## Estrutura atual

```text
SPODWE2_Restaurante/
├── README.md
├── index.html
├── pages
│   ├── create.html
│   ├── menu-admin.html
│   ├── order.html
│   └── update.html
└── scripts
    ├── Item.js
    ├── Order.js
    ├── OrderRepository.js
    ├── Product.js
    ├── ProductRepository.js
    ├── ShoppingCart.js
    ├── menu.js
    └── pages
        ├── create.js
        ├── order.js
        └── update.js
```

## Classes

### `Product`

Representa um produto disponível no cardápio.

A classe possui:

* ID
* Nome
* Descrição
* Preço
* Categoria
* Imagem

Também possui métodos para consulta e alteração dos atributos e `toJSON()` para permitir sua persistência no `localStorage`.

### `Item`

Representa um produto associado a uma quantidade dentro do carrinho ou pedido.

Responsabilidades:

* Associar um `Product` a uma quantidade;
* Aumentar a quantidade;
* Diminuir a quantidade;
* Alterar a quantidade;
* Calcular o valor total daquele item.

### `ShoppingCart`

Representa o carrinho de compras.

Responsabilidades:

* Adicionar produtos;
* Remover produtos;
* Alterar quantidades;
* Limpar o carrinho;
* Obter os itens;
* Calcular o subtotal;
* Persistir o carrinho no `localStorage`.

### `Order`

Representa um pedido realizado.

Armazena:

* ID;
* Dados do cliente;
* Itens;
* Tipo de entrega;
* Subtotal;
* Taxa de entrega;
* Total;
* Status;
* Data do pedido.

### `ProductRepository`

Responsável pelo CRUD dos produtos e pela persistência do cardápio.

### `OrderRepository`

Responsável pelo CRUD dos pedidos e pela persistência dos pedidos realizados.

---

# Requisitos

## Programação Orientada a Objetos

* [x] Criar uma classe `Produto`, contendo os dados do produto.
* [x] Criar uma classe `Item Carrinho`, associando um produto a uma quantidade.
* [x] Criar uma classe `Carrinho`.
* [x] Criar uma classe `Pedido`.
* [x] Criar uma classe de gerenciamento/repositório para os produtos.
* [x] Criar uma classe de gerenciamento/repositório para os pedidos.
* [x] Utilizar objetos das classes durante o funcionamento do sistema.
* [x] Implementar métodos de acesso e alteração dos dados das classes.

## CRUD

### Produtos

* [x] **Create** — criação de produtos através do `ProductRepository`.
* [x] **Read** — leitura dos produtos armazenados.
* [x] **Update** — atualização dos dados de produtos.
* [x] **Delete** — exclusão de produtos.

### Carrinho

* [x] **Create** — adicionar produtos ao carrinho.
* [x] **Read** — visualizar os itens e quantidades do carrinho.
* [x] **Update** — aumentar ou diminuir a quantidade de um item.
* [x] **Delete** — remover um item do carrinho.
* [x] Limpar todos os itens do carrinho.

### Pedidos

* [x] **Create** — criar um pedido ao finalizar a compra.
* [x] **Read** — armazenar e recuperar pedidos através do `OrderRepository`.
* [x] **Update** — alterar o status de um pedido através do `OrderRepository`.
* [x] **Delete** — excluir um pedido através do `OrderRepository`.

## Cardápio

* [x] Exibir os produtos cadastrados.
* [x] Exibir imagem, nome, descrição e preço dos produtos.
* [x] Filtrar produtos por categoria.
* [x] Adicionar produtos ao carrinho.

## Carrinho de compras

* [x] Adicionar produtos.
* [x] Aumentar a quantidade de um produto.
* [x] Diminuir a quantidade de um produto.
* [x] Remover produtos.
* [x] Limpar o carrinho.
* [x] Calcular o subtotal automaticamente.
* [x] Atualizar o resumo do pedido após alterações.
* [x] Exibir o total de itens do carrinho.
* [x] Atualizar o total automaticamente.

## Entrega e valores

* [x] Permitir escolher entre retirada e delivery.
* [x] Calcular a taxa de R$ 2,50 para a opção de delivery.
* [x] Exibir separadamente o subtotal.
* [x] Exibir separadamente a taxa de entrega.
* [x] Exibir o valor total do pedido.

> **Observação:** o enunciado especifica que a taxa de R$ 2,50 deve ser aplicada quando o pedido for de **marmita para entrega via delivery**. O modelo atual ainda não possui uma propriedade que identifique um produto como marmita. Portanto, a implementação atual aplica a taxa à opção `delivery`, sem distinguir esse tipo de produto.

## Finalização do pedido

* [x] Solicitar o nome do cliente.
* [x] Solicitar o telefone do cliente.
* [x] Registrar o tipo de entrega.
* [x] Registrar os itens do carrinho.
* [x] Registrar subtotal, taxa de entrega e total.
* [x] Registrar o status inicial do pedido.
* [x] Registrar a data do pedido.
* [x] Gerar um identificador para o pedido.
* [x] Salvar o pedido no `localStorage`.
* [x] Limpar o carrinho após a finalização.
* [x] Exibir confirmação da realização do pedido.

## Carrossel

* [ ] Implementar carrossel de produtos.
* [ ] Exibir imagem, nome e preço dos produtos no carrossel.

Atualmente os produtos são exibidos em uma grade de cards, e não em um carrossel.

## Interface e IHC

* [x] Fornecer feedback após a realização do pedido.
* [x] Exibir o estado de carrinho vazio.
* [x] Desabilitar o botão de finalização quando o carrinho estiver vazio.
* [x] Permitir limpar o carrinho mediante confirmação.
* [x] Utilizar elementos `label` associados aos campos de formulário.
* [x] Utilizar textos alternativos nas imagens dos produtos.
* [x] Fornecer estados visuais de interação em botões e campos.
* [x] Utilizar agrupamento semântico para opções de entrega e dados do cliente.

## Persistência

* [x] Persistir produtos no `localStorage`.
* [x] Recuperar produtos do `localStorage` ao carregar o sistema.
* [x] Persistir o carrinho no `localStorage`.
* [x] Recuperar o carrinho do `localStorage`.
* [x] Persistir pedidos no `localStorage`.
* [x] Recuperar pedidos do `localStorage`.
* [x] Reconstruir instâncias das classes após a leitura do `localStorage`.

A persistência utilizando `localStorage` também atende ao requisito adicional previsto no enunciado.

Principais chaves utilizadas:

```text
menu
shoppingCart
orders
```

Como as classes utilizam campos privados (`#`), os objetos implementam `toJSON()` para transformar seus dados em objetos serializáveis antes de utilizar `JSON.stringify()`.

Ao recuperar os dados com `JSON.parse()`, os repositórios recriam as instâncias das respectivas classes.

## Status do projeto

O fluxo principal de realização de pedidos está implementado:

```text
Cardápio → Carrinho → Dados do cliente → Entrega → Pedido → LocalStorage
```

Ainda permanecem como pendências principais:

* [ ] Implementar o carrossel de produtos.
* [ ] Implementar a distinção entre produtos do tipo **marmita** e outros produtos para aplicar corretamente a regra da taxa de delivery.
* [ ] Implemwntar as interfaces administrativas de gerenciamento de pedidos.

