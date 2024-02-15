"use strict";

const GET_GOODS_ITEMS =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";
const GET_BASKET_GOODS_ITEMS =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json";

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  };
}

class GoodsItem {
  constructor({
    img = '<svg class="goodsImgImg" width="512" height="512" viewBox="0 0 512 512" style="color:currentColor" xmlns="http://www.w3.org/2000/svg" class="h-full w-full"><rect width="512" height="512" x="0" y="0" rx="30" fill="transparent" stroke="transparent" stroke-width="0" stroke-opacity="100%" paint-order="stroke"></rect><svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img" style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></g></svg></svg>',
    product_name = "Product",
    price = 0,
  }) {
    this.img = img;
    this.product_name = product_name;
    this.price = price;
  }

  renderItem() {
    return `
    <li class="goodsItemWrap">

      <div class="goodsImgWrap">
        <div class="goodsImg">${this.img}</div>
      </div>

      <div class="goodsDescriptionWrap">

        <div class="goodsDescription">
          <h3>${this.product_name}</h3>
          <p>${this.price} &#x584;</p>
        </div>

        <div class="goodsButtonWrap">
          <button class="goodsButton" type="button">Добавить</button>
        </div>
        
      </div>

    </li>
  `;
  }
}

class GoodsList {
  items = [];

  fetchGoods(callback) {
    service(GET_GOODS_ITEMS, (data) => {
      this.items = data;
      callback();
    });
  }

  calculatePrice() {
    const calculate = this.items.reduce((acc, { price }) => acc + price, 0);
    document.querySelector(
      ".calculatePrice"
    ).innerHTML = `<h3>Общая сумма товаров на: ${calculate} &#x584;</h3>`;
  }

  renderList() {
    const getGoodsList = this.items.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.renderItem();
    });
    document.querySelector(".goodsList").innerHTML = getGoodsList.join("");
  }
}

const goodsList = new GoodsList();

goodsList.fetchGoods(() => {
  goodsList.renderList();
  goodsList.calculatePrice();
});
