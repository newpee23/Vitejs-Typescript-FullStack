import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux';
import store from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from './pages/Detail.tsx';
import { Edit } from './pages/Edit.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/detail",
    element: <Detail/>
  },
  {
    path: "/edit/:itemId", // เปลี่ยน path เป็น "/edit/:itemId"
    element: <Edit/>
  }
 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
