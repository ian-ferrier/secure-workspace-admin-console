import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { Analytics } from '@vercel/analytics/react';


function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Analytics />
    </div>
  )
}

export default App
