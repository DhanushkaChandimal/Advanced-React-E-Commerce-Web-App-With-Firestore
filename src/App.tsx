import { Route, Routes } from 'react-router-dom'
import './App.css'
import Container from 'react-bootstrap/Container'
import AppNavbar from './components/NavBar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import HomePage from './components/HomePage'
import CreateProduct from './components/CreateProduct'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from './lib/firebaseConfig'
import SignIn from './components/SignIn'
import Register from './components/Register'
import UserProfile from './components/UserProfile'

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

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
          <AppNavbar user={user}/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductList/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/create-product' element={<CreateProduct/>}/>
            <Route path='/profile' element={<UserProfile user={user}/>}/>
          </Routes>
        </div>
      ) : (
        showSignIn ? (
          <SignIn onSwitchToRegister={() => setShowSignIn(false)} />
        ) : (
          <Register onSwitchToSignIn={() => setShowSignIn(true)} />
        )
      )}
    </Container>
  )
}

export default App
