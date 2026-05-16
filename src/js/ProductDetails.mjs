import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // obtener producto desde la fuente de datos
    this.product = await this.dataSource.findProductById(this.productId);

    // renderizar HTML primero
    this.renderProductDetails();

    // luego enganchar evento al botón
    const btn = document.getElementById('addToCart');
    btn.addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    // obtener carrito existente o inicializar vacío
    let cart = getLocalStorage('so-cart') || [];

    // agregar producto actual
    cart.push(this.product);

    // guardar en localStorage
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    const productElement = document.querySelector('.product-detail');

    productElement.innerHTML = `
      <h3>${this.product.Brand?.Name || ''}</h3>

      <h2 class="divider">${this.product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.NameWithoutBrand}"
      />

      <p class="product-card__price">
        $${this.product.FinalPrice}
      </p>

      <p class="product__color">
        ${this.product.Colors?.[0]?.ColorName || ''}
      </p>

      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">
          Add to Cart
        </button>
      </div>
    `;
  }
}