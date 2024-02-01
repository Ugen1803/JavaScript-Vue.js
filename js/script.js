"use strict";

const goods = [
  {
    img: '<img class="goodsImgImg" src="img/sectionProducts/shirt.png" alt="Shirt">',
    title: "Shirt",
    price: 150,
  },
  {
    img: '<img class="goodsImgImg" src="img/sectionProducts/socks.png" alt="Socks">',
    title: "Socks",
    price: 50,
  },
  {
    img: '<img class="goodsImgImg" src="img/sectionProducts/jacket.png" alt="Jacket">',
    title: "Jacket",
    price: 350,
  },
  {
    img: '<img class="goodsImgImg" src="img/sectionProducts/shoes.png" alt="Shoes">',
    title: "Shoes",
    price: 250,
  },
  {},
];

const renderGoodsItem = function ({
  img = '<svg class="goodsImgImg" width="512" height="512" viewBox="0 0 512 512" style="color:currentColor" xmlns="http://www.w3.org/2000/svg" class="h-full w-full"><rect width="512" height="512" x="0" y="0" rx="30" fill="transparent" stroke="transparent" stroke-width="0" stroke-opacity="100%" paint-order="stroke"></rect><svg width="256px" height="256px" viewBox="0 0 24 24" fill="currentColor" x="128" y="128" role="img" style="display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></g></svg></svg>',
  title = "Product",
  price = "is unknown",
}) {
  return `
    <li class="goodsItemWrap">

      <div class="goodsImgWrap">
        <div class="goodsImg">${img}</div>
      </div>

      <div class="goodsDescriptionWrap">

        <div class="goodsDescription">
          <h3>${title}</h3>
          <p>${price} $</p>
        </div>

        <div class="goodsButtonWrap">
          <button class="goodsButton" type="button">Добавить</button>
        </div>
        
      </div>

    </li>
  `;
};

function renderGoodsList(list) {
  // ES5:
  // let goodsList = list.map(function(item) {
  //                 return renderGoodsItem(item.img, item.title, item.price)
  // });

  // ES6 (Чеерз деструктуризированный вариант и стрелочные функции):
  let goodsList = list.map((item) => renderGoodsItem(item));

  document.querySelector(".goodsList").innerHTML = goodsList.join("");
}

renderGoodsList(goods);
