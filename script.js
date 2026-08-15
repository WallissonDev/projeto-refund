const expenseTitleInput = document.getElementById('expense-title');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseValueInput = document.getElementById('expense-value');
const expenseSubmitButton = document.getElementById('expense-submit');
const expenseContainer = document.getElementById('expense-items-container');

expenseSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const itemLi = createExpenseItem(expenseTitleInput.value, expenseCategorySelect.value, parseFloat(expenseValueInput.value));
    console.log(expenseTitleInput.value, expenseCategorySelect.value, parseFloat(expenseValueInput.value))
    expenseContainer.appendChild(itemLi);
}) 

function createExpenseItem(title, category, value) {
    const itemLi = document.createElement('li');

    const itemPicture = document.createElement('img');

    const descriptionContainer = document.createElement('div');
    const mainDescription = document.createElement('h3');
    const descritionCategory = document.createElement('p');

    const itemValue = document.createElement('p');
    const itemRemoveButton = document.createElement('img');

    descriptionContainer.appendChild(mainDescription);
    descriptionContainer.appendChild(descritionCategory);

    itemLi.appendChild(itemPicture);
    itemLi.appendChild(descriptionContainer);
    itemLi.appendChild(itemValue);
    itemLi.appendChild(itemRemoveButton);

    itemLi.setAttribute("id", "item");
    itemPicture.setAttribute("src", `./assets/${category}.svg`);
    mainDescription.textContent = title;
    descritionCategory.textContent = category;
    itemValue.textContent = `R$ ${value.toFixed(2).replace('.', ',')}`;
    itemRemoveButton.setAttribute("src", "./assets/remove-button.svg");

    return itemLi;
}
