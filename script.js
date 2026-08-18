const expenseTitleInput = document.getElementById('expense-title');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseValueInput = document.getElementById('expense-value');
const expenseSubmitButton = document.getElementById('expense-submit');
const expenseContainer = document.getElementById('expense-items-container');
const totalValue = document.getElementsByClassName("totalValue")
const numberOfExpenses = document.getElementById("numberOfExpenses")

totalValue[0].textContent = calculateTotalExpense().toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })

expenseContainer.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.remove-button')

    if (!clickedButton) return;

    const itemToRemove = clickedButton.closest('li')

    if (itemToRemove) {
        itemToRemove.remove()
        totalValue[0].textContent = calculateTotalExpense().toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })

        numberOfExpenses.textContent = `Despesas: ${expenseContainer.querySelectorAll('li').length}`
    }
})

expenseSubmitButton.addEventListener('click', (event) => {
    event.preventDefault()
    try {
        if ( expenseCategorySelect.value === "Selecione" || expenseTitleInput.value === "" || expenseValueInput.value === "") {
            throw new Error("Todos os campos devem ser preenchidos")
        }
    } catch (error) {
        alert(error.message)
        return
    }
    
    try {
        if (parseFloat(expenseValueInput.value) <= 0) {
            throw new Error("O valor da despesa deve ser um numero maior que zero")
        }
    } catch (error) {
        alert(error.message)
        return
    }

    const itemLi = createExpenseItem(expenseTitleInput.value, expenseCategorySelect.value, parseFloat(expenseValueInput.value));
    expenseContainer.appendChild(itemLi)
    totalValue[0].textContent = calculateTotalExpense().toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })

    numberOfExpenses.textContent = `Despesas: ${expenseContainer.querySelectorAll('li').length}`
})

function calculateTotalExpense(){
    let sum = 0
    const expenseItems = expenseContainer.querySelectorAll('.expenseValue');
    expenseItems.forEach(item => {
        sum += Number(item.outerText.replace(",","."));
    });
    return sum
}

function createExpenseItem(title, category, value) {
    const itemLi = document.createElement('li')

    const itemPicture = document.createElement('img')

    const descriptionContainer = document.createElement('div')
    const mainDescription = document.createElement('h3')
    const descritionCategory = document.createElement('p')

    const itemValue = document.createElement('p')
    const currencyType = document.createElement('p')
    const itemRemoveButton = document.createElement('img')
    
    currencyType.innerText = "R$  "

    currencyType.appendChild(itemValue)
    descriptionContainer.appendChild(mainDescription)
    descriptionContainer.appendChild(descritionCategory)

    itemLi.appendChild(itemPicture)
    itemLi.appendChild(descriptionContainer)
    itemLi.appendChild(currencyType)
    itemLi.appendChild(itemRemoveButton)

    currencyType.style.display = "flex"
    currencyType.style.gap = "0.5rem"
    itemLi.setAttribute("id", "item")
    itemPicture.setAttribute("src", `./assets/${category}.svg`)
    mainDescription.textContent = title
    descritionCategory.textContent = category
    itemRemoveButton.setAttribute("src", "./assets/remove-button.svg")
    itemRemoveButton.setAttribute("class", "remove-button")
    itemValue.setAttribute("class", "expenseValue")
    itemValue.innerHTML = value.toFixed(2).replace(".", ",")

    return itemLi
}

