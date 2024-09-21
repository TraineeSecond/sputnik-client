import AuthProvider from 'app/providers/authProvider';
import AppRoutes from 'app/routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
