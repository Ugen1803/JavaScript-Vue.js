"use strict";

// Сервер с базой товаров:
const goodsItemsURL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";
const goodsBasketItemsURL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json";

// Метод получения данных с сервера:
const getFromServer = (url) =>
  new Promise((resolve) => {
    const xhr = new XMLHttpRequest(); // Создание запроса на сервер
    xhr.open("GET", url); // Записываются метод запроса и url сервера данных
    xhr.send(); // Отсылается запрос на сервер
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response)); // Ответ сервера в виде строки и формата JSON, далее он парсится из строки в объект
    };
  });

// Объект Элемент товара:
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

  // Метод формирования Карточки товара:
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

// Объект Список товаров:
class GoodsList {
  items = []; // Массив полученных данных

  // Возвращение данных, полученных с сервера (getFromServer):
  getGoods() {
    return getFromServer(goodsItemsURL).then((data) => {
      this.items = data; // Сохраняем себе полученные данные
    });
  }

  // Метод вывода списка товаров:
  renderList() {
    const getGoodsList = this.items.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.renderItem();
    });
    document.querySelector(".goodsList").innerHTML = getGoodsList.join("");
  }

  // Метод подсчета стоимости товаров:
  calculatePrice() {
    const calculate = this.items.reduce((acc, { price }) => acc + price, 0);
    document.querySelector(
      ".calculatePrice"
    ).innerHTML = `<h3>Общая сумма товаров на: ${calculate} &#x584;</h3>`;
  }
}

const goodsList = new GoodsList();

goodsList.getGoods().then(() => {
  goodsList.renderList();
  goodsList.calculatePrice();
});
