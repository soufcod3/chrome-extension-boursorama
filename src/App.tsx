import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState({})

  const analyze = useCallback(() => {
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      console.log('TABS', tabs)
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

  return (
    <div className="App">
      <div className="card">
        <button onClick={() => analyze()}>Analyser</button>
        {Object.keys(data).length > 0 &&
          <pre style={{ width: '100%', textAlign: 'left' }}>{JSON.stringify(data, undefined, 2)}</pre>
        }
      </div>
    </div>
  )
}

export default App
