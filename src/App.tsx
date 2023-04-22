import { createContext, useCallback, useEffect, useState } from 'react'
import './App.css'
import { Transaction } from './interfaces'
import TransactionsList from './assets/components/TransactionsList'
import Categories from './assets/components/Categories'

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

const TRANSACTION_NEW = [
  {
    "id": 1,
    "name": "CARTE 31/03/23 AMZN Mktp FR*JR4X CB*3630",
    "category": "Livres, cd/dvd, bijoux, jouets…",
    "amount": -10.12,
    "date": "31 mars 2023"
  },
  {
    "id": 2,
    "name": "CARTE 30/03/23 CODEUR.COM CB*3630",
    "category": "Non catégorisé",
    "amount": -34.8,
    "date": "31 mars 2023"
  },
  {
    "id": 3,
    "name": "CARTE 19/03/23 IONOS BY 1 AND 1 CB*3630",
    "category": "Abonnements & téléphonie",
    "amount": -2.4,
    "date": "29 mars 2023"
  },
  {
    "id": 4,
    "name": "CARTE 27/03/23 Envato CB*3630",
    "category": "Non catégorisé",
    "amount": -46.8,
    "date": "28 mars 2023"
  },
  {
    "id": 5,
    "name": "CARTE 25/03/23 Amazon Prime*JI10 CB*3630",
    "category": "Livres, cd/dvd, bijoux, jouets…",
    "amount": -6.99,
    "date": "27 mars 2023"
  },
  {
    "id": 6,
    "name": "CARTE 24/03/23 NobiNobi CB*3630",
    "category": "Non catégorisé",
    "amount": -19,
    "date": "27 mars 2023"
  },
  {
    "id": 7,
    "name": "VIR Virement de Soufiane AIT OUARRAOU",
    "category": "Virements émis",
    "amount": -57,
    "date": "24 mars 2023"
  },
  {
    "id": 8,
    "name": "VIR SEPA Pair Alain",
    "category": "Virements émis",
    "amount": -50,
    "date": "24 mars 2023"
  },
  {
    "id": 9,
    "name": "CARTE 23/03/23 ALDI MARCHE 214 CB*3630",
    "category": "Alimentation",
    "amount": -8.24,
    "date": "24 mars 2023"
  },
  {
    "id": 10,
    "name": "CARTE 22/03/23 SC-REST.GEMUSE CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -10.5,
    "date": "23 mars 2023"
  },
  {
    "id": 11,
    "name": "CARTE 21/03/23 QUAI DE LOIRE 2 CB*3630",
    "category": "Hébergement (hôtels, camping…)",
    "amount": -7.5,
    "date": "22 mars 2023"
  },
  {
    "id": 12,
    "name": "CARTE 20/03/23 FRANPRIX 5005 CB*3630",
    "category": "Alimentation",
    "amount": -6.88,
    "date": "22 mars 2023"
  },
  {
    "id": 13,
    "name": "CARTE 20/03/23 INTERMARCHE 2 CB*3630",
    "category": "Alimentation",
    "amount": -2.76,
    "date": "21 mars 2023"
  },
  {
    "id": 14,
    "name": "CARTE 19/03/23 4 NATIONS 2 CB*3630",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -6.5,
    "date": "20 mars 2023"
  },
  {
    "id": 15,
    "name": "CARTE 17/03/23 PIZZA CINQ CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -10.9,
    "date": "20 mars 2023"
  },
  {
    "id": 16,
    "name": "CARTE 17/03/23 CAM OBERKAMPF CB*3630",
    "category": "Abonnements & téléphonie",
    "amount": -9,
    "date": "20 mars 2023"
  },
  {
    "id": 17,
    "name": "CARTE 16/03/23 786 CB*3630",
    "category": "Non catégorisé",
    "amount": -10.9,
    "date": "17 mars 2023"
  },
  {
    "id": 18,
    "name": "CARTE 16/03/23 ALDI MARCHE 214 CB*3630",
    "category": "Alimentation",
    "amount": -5.58,
    "date": "17 mars 2023"
  },
  {
    "id": 19,
    "name": "CARTE 15/03/23 786 CB*3630",
    "category": "Non catégorisé",
    "amount": -10.4,
    "date": "16 mars 2023"
  },
  {
    "id": 20,
    "name": "CARTE 13/03/23 FRANPRIX 5005 CB*3630",
    "category": "Alimentation",
    "amount": -3.63,
    "date": "15 mars 2023"
  },
  {
    "id": 21,
    "name": "CARTE 12/03/23 ENVATO 65159309 CB*3630",
    "category": "Non catégorisé",
    "amount": -29.51,
    "date": "14 mars 2023"
  },
  {
    "id": 22,
    "name": "CARTE 11/03/23 ENVATO 65152810 CB*3630",
    "category": "Non catégorisé",
    "amount": -12.49,
    "date": "13 mars 2023"
  },
  {
    "id": 23,
    "name": "CARTE 10/03/23 LE RITAL 2 CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -19.9,
    "date": "13 mars 2023"
  },
  {
    "id": 24,
    "name": "CARTE 13/03/23 AMZN Mktp FR*1R8E CB*3630",
    "category": "Livres, cd/dvd, bijoux, jouets…",
    "amount": -173.31,
    "date": "13 mars 2023"
  },
  {
    "id": 25,
    "name": "CARTE 11/03/23 GAMBETTA 2 CB*3630",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -7.5,
    "date": "13 mars 2023"
  },
  {
    "id": 26,
    "name": "CARTE 09/03/23 G20 CB*3630",
    "category": "Alimentation",
    "amount": -4.51,
    "date": "10 mars 2023"
  },
  {
    "id": 27,
    "name": "CARTE 09/03/23 SUMUP *FAST CHIK CB*3630",
    "category": "Restaurants, bars, discothèques…",
    "amount": -11,
    "date": "10 mars 2023"
  },
  {
    "id": 28,
    "name": "CARTE 08/03/23 786 CB*3630",
    "category": "Non catégorisé",
    "amount": -10.4,
    "date": "9 mars 2023"
  },
  {
    "id": 29,
    "name": "CARTE 03/03/23 LIDL 3930 BAGNOLE CB*3630",
    "category": "Alimentation",
    "amount": -7.64,
    "date": "7 mars 2023"
  },
  {
    "id": 30,
    "name": "CARTE 06/03/23 Spotify P21914F02 CB*3630",
    "category": "Abonnements & téléphonie - autres",
    "amount": -9.99,
    "date": "7 mars 2023"
  },
  {
    "id": 31,
    "name": "VIR INST PAIR ALAIN",
    "category": "Santé - autres",
    "amount": -25,
    "date": "7 mars 2023"
  },
  {
    "id": 32,
    "name": "PRLV SEPA BOUYGUES TELECOM BUSINESS - DI",
    "category": "Téléphonie (fixe et mobile)",
    "amount": -14.99,
    "date": "7 mars 2023"
  },
  {
    "id": 33,
    "name": "CARTE 04/03/23 GAMBETTA 2 CB*3630",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -7.5,
    "date": "6 mars 2023"
  },
  {
    "id": 34,
    "name": "CARTE 03/03/23 Lydia*App CB*3630",
    "category": "Mobilier, électroménager, décoration…",
    "amount": -19,
    "date": "6 mars 2023"
  },
  {
    "id": 35,
    "name": "CARTE 03/03/23 Wise CB*3630",
    "category": "Alimentation",
    "amount": -70.29,
    "date": "6 mars 2023"
  },
  {
    "id": 36,
    "name": "PRLV SEPA UGC ILLIMITE",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -21.9,
    "date": "6 mars 2023"
  },
  {
    "id": 37,
    "name": "VIR INST AIT OUARRAOU MOHAMED",
    "category": "Virements émis",
    "amount": -260,
    "date": "3 mars 2023"
  },
  {
    "id": 38,
    "name": "CARTE 02/03/23 APPLE.COM/BILL CB*3630",
    "category": "Vie quotidienne",
    "amount": -2.99,
    "date": "3 mars 2023"
  },
  {
    "id": 39,
    "name": "CARTE 01/03/23 UGC BERCY 2 CB*3630",
    "category": "Divertissement - culture (ciné, théâtre, concerts…)",
    "amount": -8,
    "date": "3 mars 2023"
  },
  {
    "id": 40,
    "name": "VIR SEPA CYRUS CAPITAL",
    "category": "Salaire fixe",
    "amount": 1659.93,
    "date": "3 mars 2023"
  },
  {
    "id": 41,
    "name": "CARTE 01/03/23 SNCF INTERNET CB*3630",
    "category": "Transports longue distance (avions, trains…)",
    "amount": -44,
    "date": "2 mars 2023"
  },
  {
    "id": 42,
    "name": "VIR INST PAIR ALAIN",
    "category": "Santé - autres",
    "amount": -25,
    "date": "2 mars 2023"
  },
  {
    "id": 43,
    "name": "CARTE 28/02/23 CODEUR.COM CB*3630",
    "category": "Non catégorisé",
    "amount": -34.8,
    "date": "1 mars 2023"
  }
]

export const TransactionContext = createContext<Transaction[]|undefined>(undefined);

function App() {

  const [transactions, setTransactions] = useState<Array<Transaction> | undefined>(TRANSACTIONS)

  // Using Chrome Storage if exists
  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(["transactions"]).then((res) => {
        console.log("Value currently is " + res.transactions);
        if (res.transactions) {
          setTransactions(res.transactions)
        }
      });
    }
  }, [])

  const fetchTransactions = useCallback(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id || 0, { type: 'GET_DOM' }, (response: any) => {
          console.log('RES', response)
          setTransactions(response)
        });
    });
  }, [])

  useEffect(() => {
    console.log('transactions', transactions)
  }, [transactions])

  return (
    <TransactionContext.Provider value={transactions} >
    <div className="App">
      <button onClick={() => setTransactions(TRANSACTION_NEW)}>Analyser</button>
      <Categories />
      <TransactionsList />
      {transactions && <pre style={{ width: '100%', textAlign: 'left' }}>{JSON.stringify(transactions, undefined, 2)}</pre>}
    </div>
    </TransactionContext.Provider>
  )
}

export default App
