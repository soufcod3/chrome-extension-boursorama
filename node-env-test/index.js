import { html } from "./html.js";

const movementsList = document.querySelector('.list__movement')
const movementsByDate = {};

let date
let name
let categoryName
let amountInEur
// Loop through each li element and group movements by date
movementsList.querySelectorAll('li').forEach(li => {
  if (li.classList.contains('list-operation-date-line')) {
    date = li.textContent.trim()
    movementsByDate[date] = {
      date: date,
      movements: []
    };
  }
  if (li.classList.contains('list-operation-item')) {
    name = li.querySelector('.list__movement--label-user').textContent.trim()
    name = name.replace(/\n\s+/g, ' ') // removing \n
    categoryName = li.querySelector('.list-operation-item__category').textContent.trim()
    amountInEur = li.querySelector('.list-operation-item__amount').textContent.trim()

    let trimAmount = amountInEur.replace(/[^-\d,]/g, "").replace(",", ".");

    // Special negative sign character (the found "−" is not the regular "-"")
    if (amountInEur.includes('−')) trimAmount *= -1;
    const amount = parseFloat(trimAmount)

    movementsByDate[date] = {
      ...movementsByDate[date],
      movements: [
        ...movementsByDate[date].movements,
        { name, category: categoryName, amount }
      ]
    }
  }
});

// Convert movementsByDate object to array
const movementsArray = Object.values(movementsByDate);

// Log the final JSON output
console.log(JSON.stringify(movementsArray, null, 2));
