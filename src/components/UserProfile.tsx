import { useDeleteUser, useUser } from '../hooks/useAuth';
import { type User } from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface AppProps {
    user: User;
}

const UserProfile = ({ user }: AppProps) => {
    const { data: currentUser } = useUser(user.email || '');
    const deleteUserMutation = useDeleteUser();

    const handleDeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            try {
                await deleteUserMutation.mutateAsync(user.email || '');
                alert('Profile deleted successfully!');
            } catch (error) {
                console.error('Error deleting profile:', error);
                alert('Error deleting profile. Please try again.');
            }
        }
    };

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
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>First Name:</strong> {currentUser?.firstName}</p>
                                    <p><strong>Last Name:</strong> {currentUser?.lastName}</p>
                                </Card.Body>
                            </Card>
                            
                            <div className="d-grid gap-2">
                                <Button 
                                    variant="danger" 
                                    size="lg"
                                    onClick={handleDeleteProfile}
                                >
                                    Delete Profile
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;