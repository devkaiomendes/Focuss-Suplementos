const cartLink = document.querySelector('.cart-link');
const cartSection = document.querySelector('#cart-items');

cartLink.addEventListener('click', () => {
  cartSection.scrollIntoView({ behavior: 'smooth' });
}); // selecione a seção do carrinho

cartLink.addEventListener('click', () => {
  // faz o menu do carrinho "pular" para a seção do carrinho
  cartSection.scrollIntoView({ behavior: 'smooth' });
});

// Função para formatar o preço em formato brasileiro
function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Array para armazenar os itens do carrinho
let cart = [];

// Atualiza o carrinho na tela
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Limpa os itens atuais
    cartItems.innerHTML = '';

    let totalPrice = 0;

    // Adiciona cada item ao carrinho
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${formatPrice(item.price)}`;
        li.dataset.index = index;
        cartItems.appendChild(li);
        totalPrice += item.price;
    });

    // Atualiza o preço total
    totalPriceElement.textContent = `Total: ${formatPrice(totalPrice)}`;
}

// Adiciona um produto ao carrinho
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Remove um produto do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Botão de finalizar compra
const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const itemList = cart.map(item => `${item.name} - ${formatPrice(item.price)}`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    alert(`Obrigado pela compra!\n\nItens:\n${itemList}\n\nTotal: ${formatPrice(total)}`);

    // Limpa o carrinho após a compra
    cart = [];
    updateCart();
});

// Botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        addToCart(name, price);
    });
});

// Botões de remover do carrinho
const cartItemsList = document.getElementById('cart-items');
cartItemsList.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        const index = event.target.dataset.index;
        removeFromCart(index);
    }
});