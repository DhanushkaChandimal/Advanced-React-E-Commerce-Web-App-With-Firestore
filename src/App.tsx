import { Route, Routes } from 'react-router-dom'
import './App.css'
import Container from 'react-bootstrap/Container'
import AppNavbar from './components/NavBar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import HomePage from './components/HomePage'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from './lib/firebaseConfig'
import SignIn from './components/SignIn'

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container className="py-4">
      {user ? (
        <div>
          <AppNavbar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductList/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </div>
      ) : (
        <SignIn/>
      )}
    </Container>
  )
}

export default App
