const htmlToJson = (ul) => {
  const movementsByDate = [];
  let count = 0

  let date
  let name
  let category

  ul.querySelectorAll('li').forEach(li => {

    if (li.classList.contains('list-operation-date-line')) { // DATE
      date = li.textContent.trim()
      movementsByDate.push({
        date: date,
        movements: []
      });
    }

    if (li.classList.contains('list-operation-item')) { // MOVEMENT
      // Getting the name
      name = li.querySelector('.list__movement--label-user').textContent.trim()
      name = name.replace(/\n\s+/g, ' ') // removing \n

      // Getting the category
      category = li.querySelector('.list-operation-item__category').textContent.trim()

      // Getting the amount
      amountString = li.querySelector('.list-operation-item__amount').textContent.trim()
      let trimAmount = amountString.replace(/[^-\d,]/g, "").replace(",", ".");
      // Converting to negative if needed
      if (amountString.includes('−')) trimAmount *= -1;
      const amount = parseFloat(trimAmount)

      // Storing the movement
      const currentDateIndex = movementsByDate.length - 1
      movementsByDate[currentDateIndex]['movements']
      .push({ name, category, amount })

      count++
    }
  });

  // Convert movementsByDate object to array
  return { count, data: movementsByDate };
}

/**************** SCRIPT ****************/

const messagesFromReactAppListener = (msg, sender, sendResponse) => {

  const ul = document.querySelector('.list__movement')

  const movements = htmlToJson(ul)

  // Log the final JSON output
  console.log(JSON.stringify(movements, null, 2));

  // console.log('[content.js]. Message received', msg);

  sendResponse(movements);
}

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);