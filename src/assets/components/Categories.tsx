import React, { useContext, useEffect, useState } from 'react'
import { TransactionContext } from '../../App'
import { Transaction } from '../../interfaces';

interface Category {
  name: string;
  totalAmount: number;
  transactions: Transaction[];
}

const Categories = () => {

  const { transactions } = useContext(TransactionContext)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const categories = (transactions ?? []).reduce(
      (acc: Category[], transaction: Transaction) => {
        const { category, amount } = transaction;

        if (category === undefined) {
          return acc;
        }

        const existingCategory = acc.find(
          (transactionByCategory) =>
            transactionByCategory.name === category
        );

        if (existingCategory) {
          existingCategory.totalAmount += amount;
          existingCategory.transactions.push(transaction);
        } else {
          acc.push({
            name: category,
            totalAmount: amount,
            transactions: [transaction],
          });
        }
        return acc;
      },
      [] as Category[]
    )
    setCategories(categories)
  }, [transactions])

  // SYNC Chrome Storage with Local Transactions
  useEffect(() => {
    if (transactions && chrome.storage) {
      chrome.storage.local.set({ transactions }).then(() => {
        console.log("Transactions saved : " + transactions.length);
      });
    }
  }, [transactions])

  return (
    <section className='categories'>
      <div className='flex gap-5 flex-wrap'>
        {
          categories.map((category, idx) => {
            return (
              <div key={idx} className='category flex flex-col justify-around items-center flex-nowrap'>
                <p className={`text-3xl font-medium ${category.totalAmount > 0 ? 'text-lime-500' : 'text-red-500'}`}>{Math.abs(category.totalAmount).toFixed(2)}<small className='text-sm'>€</small></p>
                <div className="tooltip tooltip-bottom" data-tip={category.name}>
                  <div className="text-black font-medium">{category.name.length > 15 ? category.name.slice(0, 15 - 1) + '...' : category.name}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Categories