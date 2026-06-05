
import AppRouter from './routes';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  );
}

export default App;
