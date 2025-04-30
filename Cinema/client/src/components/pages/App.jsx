import { RouterProvider } from 'react-router-dom';

import CreateRouter from '../utils/createRouter';

const App = () => {
  const router = CreateRouter();

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
