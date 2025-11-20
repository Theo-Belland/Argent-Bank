import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/profile'; // petit P majuscule pour la convention React

function App() {
  return (
    <BrowserRouter>
      {/* Le conteneur principal en flex */}
      <div className="app-container">
        <Header />

        {/* Le contenu principal doit être flexible */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>


        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
