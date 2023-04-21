import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Transaction } from './interfaces'
import TransactionsList from './assets/components/TransactionsList'

export const TRANSACTIONS = [
  {
    "id": 0,
    "name": "Zalando Payments Berlin DE",
    "category": "Autorisation paiement en cours CB*3630",
    "amount": -9.95,
    "date": "21 avril 2023"
  },
  {
    "id": 1,
    "name": "CARTE 20/04/23 CARREFOUR CITY CB*3630",
    "category": "Non catégorisé",
    "amount": -2.7,
    "date": "21 avril 2023"
  },
  {
    "id": 2,
    "name": "CARTE 16/04/23 TOLBIAC 2 CB*3630",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -9.5,
    "date": "17 avril 2023"
  },
  {
    "id": 3,
    "name": "AVOIR 15/04/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": 66,
    "date": "17 avril 2023"
  },
  {
    "id": 4,
    "name": "CARTE 15/04/23 EASYJET 000K5 CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": -59.25,
    "date": "17 avril 2023"
  },
  {
    "id": 5,
    "name": "CARTE 14/04/23 MONOPRIX 4 CB*3630",
    "category": "Alimentation",
    "amount": -1.95,
    "date": "17 avril 2023"
  },
  {
    "id": 6,
    "name": "RETRAIT DAB 13/04/23 PARIS CB*3630",
    "category": "Retraits cash",
    "amount": -70,
    "date": "14 avril 2023"
  },
  {
    "id": 7,
    "name": "AVOIR 13/04/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": 49,
    "date": "14 avril 2023"
  },
  {
    "id": 8,
    "name": "CARTE 13/04/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": -122,
    "date": "14 avril 2023"
  },
  {
    "id": 9,
    "name": "CARTE 13/04/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": -49,
    "date": "14 avril 2023"
  },
  {
    "id": 10,
    "name": "CARTE 12/04/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": -49,
    "date": "14 avril 2023"
  },
  {
    "id": 11,
    "name": "VIR INST PAIR ALAIN",
    "category": "Santé - autres",
    "amount": -25,
    "date": "13 avril 2023"
  },
  {
    "id": 12,
    "name": "CARTE 11/04/23 IKEA 2 CB*3630",
    "category": "Mobilier, électroménager, décoration…",
    "amount": -14.99,
    "date": "13 avril 2023"
  },
  {
    "id": 13,
    "name": "AVOIR 11/04/23 IKEA (LAMPE USB) CB*3630",
    "category": "Mobilier, électroménager, décoration…",
    "amount": 9.99,
    "date": "12 avril 2023"
  },
  {
    "id": 14,
    "name": "CARTE 10/04/23 AMZN Mktp FR*526O CB*3630",
    "category": "Vêtements et accessoires",
    "amount": -24.65,
    "date": "11 avril 2023"
  },
  {
    "id": 15,
    "name": "CARTE 10/04/23 Wise CB*3630",
    "category": "Alimentation",
    "amount": -70.29,
    "date": "11 avril 2023"
  },
  {
    "id": 16,
    "name": "CARTE 09/04/23 MONOPRIX 4 CB*3630",
    "category": "Alimentation",
    "amount": -3.99,
    "date": "11 avril 2023"
  },
  {
    "id": 17,
    "name": "CARTE 09/04/23 UBER * EATS PEN CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -15.08,
    "date": "11 avril 2023"
  },
  {
    "id": 18,
    "name": "CARTE 08/04/23 VELOV INTERNET 4 CB*3630",
    "category": "Transports quotidiens (métro, bus…)",
    "amount": -4,
    "date": "11 avril 2023"
  },
  {
    "id": 19,
    "name": "CARTE 08/04/23 INDIEN LYON CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -17,
    "date": "11 avril 2023"
  },
  {
    "id": 20,
    "name": "CARTE 07/04/23 OneNation PALESTINE CB*3630",
    "category": "Dons et cadeaux",
    "amount": -20,
    "date": "11 avril 2023"
  },
  {
    "id": 21,
    "name": "CARTE 06/04/23 Spotify P223A448C CB*3630",
    "category": "Abonnements & téléphonie - autres",
    "amount": -9.99,
    "date": "11 avril 2023"
  },
  {
    "id": 22,
    "name": "VIR INST AIT OUARRAOU MOHAMED",
    "category": "Loyers, charges",
    "amount": -200,
    "date": "11 avril 2023"
  },
  {
    "id": 23,
    "name": "VIR INST PAIR ALAIN",
    "category": "Santé - autres",
    "amount": -25,
    "date": "11 avril 2023"
  },
  {
    "id": 24,
    "name": "PRLV SEPA UGC ILLIMITE",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -21.9,
    "date": "6 avril 2023"
  },
  {
    "id": 25,
    "name": "CARTE 03/04/23 IKEA (LAMPE USB) CB*3630",
    "category": "Mobilier, électroménager, décoration…",
    "amount": -9.99,
    "date": "5 avril 2023"
  },
  {
    "id": 26,
    "name": "VIR SEPA CYRUS CAPITAL",
    "category": "Salaire fixe",
    "amount": 1659.93,
    "date": "4 avril 2023"
  },
  {
    "id": 27,
    "name": "CARTE 01/04/23 APPLE.COM/BILL CB*3630",
    "category": "Abonnements & téléphonie - autres",
    "amount": -2.99,
    "date": "3 avril 2023"
  },
  {
    "id": 28,
    "name": "CARTE 01/04/23 BOLLYNAN 2 CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -22.8,
    "date": "3 avril 2023"
  },
  {
    "id": 29,
    "name": "CARTE 01/04/23 LE ROYAL VI NATI CB*3630",
    "category": "Tabac",
    "amount": -7.9,
    "date": "3 avril 2023"
  }
]

function App() {
  const [transactions, setTransactions] = useState<Array<Transaction> | undefined>(TRANSACTIONS)

  // Using Chrome Storage if exists
  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(["transactions"]).then((result) => {
        console.log("Value currently is " + result.data);
        if (result.data) {
          setTransactions(result.data)
        }
      });
    }
  }, [])

  const analyze = useCallback(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id || 0, { type: 'GET_DOM' }, (response: any) => {
          console.log('RES', response)
          setTransactions(response.data)
        });
    });
  }, [])

  return (
    <div className="App">
      <button onClick={() => analyze()}>Analyser</button>
      <TransactionsList transactions={transactions} />
      {transactions && <pre style={{ width: '100%', textAlign: 'left' }}>{JSON.stringify(transactions, undefined, 2)}</pre>}
    </div>
  )
}

export default App
