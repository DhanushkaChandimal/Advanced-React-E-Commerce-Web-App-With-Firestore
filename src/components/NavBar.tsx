import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import '../styles/navbar.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { signOut, type User } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';

interface AppNavbarProps {
    user: User;
}

const AppNavbar = ({ user }: AppNavbarProps) => {
    const totalItems  = useSelector((state: RootState) => state.cart.totalItems);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const getInitials = () => {
        const name = user.displayName || 'User';
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className='d-flex justify-content-between align-items-start w-100 position-relative'>
            <Navbar expand="lg" className="flex-grow-1">
                <div className="d-flex align-items-center">
                    <Navbar.Toggle className='me-3' aria-controls="basic-navbar-nav" />
                    <Navbar.Brand href="/">DC Shop Hub</Navbar.Brand>
                </div>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/create-product">Add Product</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <div className="d-flex align-items-center gap-3">
                <Nav.Link href="/cart" className='d-flex align-items-center bg-primary text-white rounded px-2'>
                    <img src="../cart-icon.png" alt="Cart" className='cart-icon'/>
                    Cart {totalItems}
                </Nav.Link>
                
                <Dropdown align="end">
                    <Dropdown.Toggle className="user-profile-dropdown p-0 border-0 d-flex align-items-center justify-content-center">
                        {getInitials()}
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu>
                        <Dropdown.ItemText className="fw-bold">
                            {user.displayName || 'User'}
                        </Dropdown.ItemText>
                        <Dropdown.ItemText className="text-muted small">
                            {user.email}
                        </Dropdown.ItemText>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/profile">
                            User Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="/orders">
                            Order History
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut} className="text-danger">
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default AppNavbar;