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
      alert("沒有此飲品");
  }
};

function DrinkPos() {}

DrinkPos.prototype.getDrinkValue = function (inputName) {
  let selectedOption = "";
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value;
    }
  });
  return selectedOption;
};

const orderLists = document.querySelector("[data-order-lists]");
// 刪除訂單
orderLists.addEventListener('click', function(event) {
  const isDeleteButton = event.target.matches('[data-pos-delete="delete-drink"]')
  if(!isDeleteButton) {
    return
  }
  drinkPos.deletDrink(event.target.parentElement.parentElement.parentElement)
})



// 新增訂單卡片
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
}

// add drink

const drinkPos = new DrinkPos();

const addDrinkButton = document.querySelector('[data-add-list="add-drink"]');

addDrinkButton.addEventListener("click", function () {
  const drinkName = drinkPos.getDrinkValue("drink");
  const drinkIce = drinkPos.getDrinkValue("ice");
  const drinkSugar = drinkPos.getDrinkValue("sugar");

  if (!drinkName) {
    alert("請選擇飲品");
    return;
  }

  const drink = new Drink(drinkName, drinkIce, drinkSugar);

  drinkPos.addDrink(drink)

  
});

// delete order list
DrinkPos.prototype.deletDrink = function (target) {
  target.remove()
}




