const htmlToJson = (ul) => {
  const transactions = [];

  let date
  let name
  let category
  let id = 1

  ul.querySelectorAll('li').forEach(li => {
    if (li.classList.contains('list-operation-date-line')) { // DATE
      date = li.textContent.trim()
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
      transactions.push({ id, name, category, amount, date })

      id++
    }
  });

  // Convert transactions object to array
  return transactions;
}

/**************** SCRIPT ****************/

const messagesFromReactAppListener = (msg, sender, sendResponse) => {


  const ul = document.querySelector('.list__movement')

  const transactions = htmlToJson(ul)

  // Log the final JSON output
  // console.log(JSON.stringify(transactions, null, 2));

  // console.log('[content.js]. Message received', msg);

  chrome.storage.local.set({ transactions }).then(() => {
    console.log("Transactions found : " + transactions.length);
  });

  sendResponse(transactions);
}

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);