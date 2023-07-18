function Drink(name, sugar, ice) {
  this.name = name;
  this.sugar = sugar;
  this.ice = ice;
}

Drink.prototype.price = function () {
  switch (this.name) {
    case "紅茶":
    case "綠茶":
    case "四季春":
      return 30;
    case "奶蓋紅茶":
    case "奶蓋綠茶":
      return 60;
    case "多多綠茶":
    case "檸檬綠茶":
      return 50;
    default:
      Swal.fire({
        icon: "error",
        text: "沒有此飲品",
      });
  }
};

function DrinkPos() {}

// 已被選擇的飲品資料
DrinkPos.prototype.getDrinkValue = function (inputName) {
  let selectedOption = "";
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value;
    }
  });
  return selectedOption;
};

// 訂單卡片
DrinkPos.prototype.addDrink = function (drink) {
  let orderListsCard = `
  <div class="card mb-2">
      <div class="card-body">
        <div class="text-end">
          <span href="#" data-pos-delete="delete-drink">X</span>
        </div>
        <h5 class="card-title">${drink.name}</h5>
        <p class="card-text">${drink.ice}</p>
        <p class="card-text">${drink.sugar}</p>
      </div>

      <div class="card-footer">
        <div class="card-text text-end">
          $ <span data-drink-price>${drink.price()}</span>
        </div>
      </div>
    </div>
  `;

  orderLists.insertAdjacentHTML("afterbegin", orderListsCard);
};

// 刪除訂單
DrinkPos.prototype.deletDrink = function (target) {
  Swal.fire({
    title: "確定刪除嗎？",
    text: "刪除後將無法恢復訂單",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("訂單刪除成功", "", "success");
      target.remove();
    }
  });
};

// 結帳
DrinkPos.prototype.checkout = function () {
  let totalAmount = 0;
  document.querySelectorAll("[data-drink-price]").forEach(function (drink) {
    totalAmount += Number(drink.textContent);
  });
  return totalAmount;
};

// 移除訂單
DrinkPos.prototype.cleanOrderList = function (target) {
  target.querySelectorAll(".card").forEach(function (card) {
    card.remove();
  });
};

// 事件監聽器

const drinkPos = new DrinkPos();

// add drink
const addDrinkButton = document.querySelector('[data-add-list="add-drink"]');
addDrinkButton.addEventListener("click", function () {
  const drinkName = drinkPos.getDrinkValue("drink");
  const drinkIce = drinkPos.getDrinkValue("ice");
  const drinkSugar = drinkPos.getDrinkValue("sugar");

  if (!drinkName) {
    Swal.fire({
      icon: "error",
      text: "請選擇飲品",
    });
    return;
  }

  const drink = new Drink(drinkName, drinkIce, drinkSugar);

  drinkPos.addDrink(drink);
});

// add order list
const orderLists = document.querySelector("[data-order-lists]");
orderLists.addEventListener("click", function (event) {
  const isDeleteButton = event.target.matches(
    '[data-pos-delete="delete-drink"]'
  );
  if (!isDeleteButton) {
    return;
  }
  drinkPos.deletDrink(event.target.parentElement.parentElement.parentElement);
});

// checkout
const checkoutButton = document.querySelector('[data-pos-checkout="checkout"]');
checkoutButton.addEventListener("click", function () {
  if (!drinkPos.checkout()) {
    return;
  }
  Swal.fire({
    title: `總金額 $ ${drinkPos.checkout()}`,
    showCancelButton: true,
    confirmButtonText: "確定結帳",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      drinkPos.cleanOrderList(orderLists);
      Swal.fire("結帳成功", "", "success");
    }
  });
});
