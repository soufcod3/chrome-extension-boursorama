import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { JsonData } from './interfaces'

const JSON_EXAMPLE = {
  "count": 30,
  "data": [
    {
      "date": "11 avril 2023",
      "movements": [
        {
          "name": "VIR INST PAIR ALAIN",
          "category": "Virements émis",
          "amount": -25
        }
      ]
    },
    {
      "date": "7 avril 2023",
      "movements": [
        {
          "name": "METAPAY OneNation fb.com cc IE",
          "category": "Autorisation paiement en cours CB*3630",
          "amount": -20
        }
      ]
    },
    {
      "date": "6 avril 2023",
      "movements": [
        {
          "name": "Spotify P223A448C4 Stockholm SE",
          "category": "Autorisation paiement en cours CB*3630",
          "amount": -9.99
        },
        {
          "name": "PRLV SEPA UGC ILLIMITE",
          "category": "Divertissement - culture (ciné, théâtre, concerts…)",
          "amount": -21.9
        }
      ]
    },
    {
      "date": "5 avril 2023",
      "movements": [
        {
          "name": "CARTE 03/04/23 IKEA 2 CB*3630",
          "category": "Mobilier, électroménager, décoration…",
          "amount": -9.99
        }
      ]
    },
    {
      "date": "4 avril 2023",
      "movements": [
        {
          "name": "VIR SEPA CYRUS CAPITAL",
          "category": "Virements reçus",
          "amount": 1659.93
        }
      ]
    },
    {
      "date": "3 avril 2023",
      "movements": [
        {
          "name": "CARTE 01/04/23 APPLE.COM/BILL CB*3630",
          "category": "Vie quotidienne",
          "amount": -2.99
        },
        {
          "name": "CARTE 01/04/23 BOLLYNAN 2 CB*3630",
          "category": "Restaurants, bars, discothèques…",
          "amount": -22.8
        },
        {
          "name": "CARTE 01/04/23 LE ROYAL VI NATI CB*3630",
          "category": "Restaurants, bars, discothèques…",
          "amount": -7.9
        },
        {
          "name": "VIR INST PAIR ALAIN",
          "category": "Virements émis",
          "amount": -25
        },
        {
          "name": "PRLV SEPA BOUYGUES TELECOM BUSINESS - DI",
          "category": "Téléphonie (fixe et mobile)",
          "amount": -14.99
        }
      ]
    },
    {
      "date": "31 mars 2023",
      "movements": [
        {
          "name": "CARTE 31/03/23 AMZN Mktp FR*JR4X CB*3630",
          "category": "Livres, cd/dvd, bijoux, jouets…",
          "amount": -10.12
        },
        {
          "name": "CARTE 30/03/23 CODEUR.COM CB*3630",
          "category": "Non catégorisé",
          "amount": -34.8
        }
      ]
    },
    {
      "date": "29 mars 2023",
      "movements": [
        {
          "name": "CARTE 19/03/23 IONOS BY 1 AND 1 CB*3630",
          "category": "Abonnements & téléphonie",
          "amount": -2.4
        }
      ]
    },
    {
      "date": "28 mars 2023",
      "movements": [
        {
          "name": "CARTE 27/03/23 Envato CB*3630",
          "category": "Non catégorisé",
          "amount": -46.8
        }
      ]
    },
    {
      "date": "27 mars 2023",
      "movements": [
        {
          "name": "CARTE 25/03/23 Amazon Prime*JI10 CB*3630",
          "category": "Livres, cd/dvd, bijoux, jouets…",
          "amount": -6.99
        },
        {
          "name": "CARTE 24/03/23 NobiNobi CB*3630",
          "category": "Non catégorisé",
          "amount": -19
        }
      ]
    },
    {
      "date": "24 mars 2023",
      "movements": [
        {
          "name": "VIR Virement de Soufiane AIT OUARRAOU",
          "category": "Virements émis",
          "amount": -57
        },
        {
          "name": "VIR SEPA Pair Alain",
          "category": "Virements émis",
          "amount": -50
        },
        {
          "name": "CARTE 23/03/23 ALDI MARCHE 214 CB*3630",
          "category": "Alimentation",
          "amount": -8.24
        }
      ]
    },
    {
      "date": "23 mars 2023",
      "movements": [
        {
          "name": "CARTE 22/03/23 SC-REST.GEMUSE CB*3630",
          "category": "Restaurants, bars, discothèques…",
          "amount": -10.5
        }
      ]
    },
    {
      "date": "22 mars 2023",
      "movements": [
        {
          "name": "CARTE 21/03/23 QUAI DE LOIRE 2 CB*3630",
          "category": "Hébergement (hôtels, camping…)",
          "amount": -7.5
        },
        {
          "name": "CARTE 20/03/23 FRANPRIX 5005 CB*3630",
          "category": "Alimentation",
          "amount": -6.88
        }
      ]
    },
    {
      "date": "21 mars 2023",
      "movements": [
        {
          "name": "CARTE 20/03/23 INTERMARCHE 2 CB*3630",
          "category": "Alimentation",
          "amount": -2.76
        }
      ]
    },
    {
      "date": "20 mars 2023",
      "movements": [
        {
          "name": "CARTE 19/03/23 4 NATIONS 2 CB*3630",
          "category": "Divertissement - culture (ciné, théâtre, concerts…)",
          "amount": -6.5
        },
        {
          "name": "CARTE 17/03/23 PIZZA CINQ CB*3630",
          "category": "Restaurants, bars, discothèques…",
          "amount": -10.9
        },
        {
          "name": "CARTE 17/03/23 CAM OBERKAMPF CB*3630",
          "category": "Abonnements & téléphonie",
          "amount": -9
        }
      ]
    },
    {
      "date": "17 mars 2023",
      "movements": [
        {
          "name": "CARTE 16/03/23 786 CB*3630",
          "category": "Non catégorisé",
          "amount": -10.9
        },
        {
          "name": "CARTE 16/03/23 ALDI MARCHE 214 CB*3630",
          "category": "Alimentation",
          "amount": -5.58
        }
      ]
    },
    {
      "date": "16 mars 2023",
      "movements": [
        {
          "name": "CARTE 15/03/23 786 CB*3630",
          "category": "Non catégorisé",
          "amount": -10.4
        }
      ]
    }
  ]
}

function App() {
  const [data, setData] = useState<JsonData|undefined>(undefined)

  const analyze = useCallback(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      chrome.tabs.sendMessage(
        // Current tab id
        tabs[0].id || 0,

        // Message type
        { type: 'GET_DOM' },

        // Callback executed when the content script sends a response
        (response: any) => {
          console.log('RES', response)
          setData(response)
        });
    });
  }, [])

  useEffect(() => {
    chrome.storage.local.get(["data"]).then((result) => {
      console.log("Value currently is " + result.data);
      if (result.data) {
        setData(result.data)
      }
    });
  })

  return (
    <div className="App">
      <div className="card">
        {/* <button onClick={() => setData(JSON_EXAMPLE)}>Analyser</button> */}
        <button onClick={() => analyze()}>Analyser</button>
        {data &&
          <pre style={{ width: '100%', textAlign: 'left' }}>{JSON.stringify(data, undefined, 2)}</pre>
        }
      </div>
    </div>
  )
}

export default App
