import { useUser } from '../hooks/useAuth';
import { type User } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface AppProps {
    user: User;
}

const UserProfile = ({ user }: AppProps) => {
    const { data: currentUser } = useUser(user.email || '');

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Header>
                            <h2 className="mb-0">
                                My Profile
                            </h2>
                        </Card.Header>
                        <Card.Body>
                            <Card className="mb-4">
                                <Card.Body>
                                    <h5>Account Information</h5>
                                    <p><strong>Email:</strong> {currentUser?.id}</p>
                                    <p><strong>First Name:</strong> {currentUser?.firstName}</p>
                                    <p><strong>Last Name:</strong> {currentUser?.lastName}</p>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;