import { useDeleteUser, useUser, useUpdateUser } from '../hooks/useAuth';
import { type User, deleteUser } from 'firebase/auth';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface AppProps {
    user: User;
}

const UserProfile = ({ user }: AppProps) => {
    const { data: currentUser } = useUser(user.email || '');
    const deleteUserMutation = useDeleteUser();
    const updateUserMutation = useUpdateUser();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: ''
    });

    const handleEditClick = () => {
        if (currentUser) {
            setFormData({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            });
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({ firstName: '', lastName: '' });
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!currentUser) return;
        
        try {
            await updateUserMutation.mutateAsync({
                ...currentUser,
                firstName: formData.firstName,
                lastName: formData.lastName
            });
            
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    };

    const handleDeleteProfile = async () => {
        if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            try {
                await deleteUserMutation.mutateAsync(user.email || '');
                
                await deleteUser(user);
                
                alert('Profile deleted successfully! You will be signed out.');
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
                                    
                                    {isEditing ? (
                                        <Form onSubmit={handleUpdateProfile}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    placeholder="Enter first name"
                                                />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    placeholder="Enter last name"
                                                />
                                            </Form.Group>
                                            
                                            <div className="d-flex gap-2">
                                                <Button 
                                                    type="submit" 
                                                    variant="primary"
                                                >
                                                    Save Changes
                                                </Button>
                                                <Button 
                                                    type="button" 
                                                    variant="secondary"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </Form>
                                    ) : (
                                        <div>
                                            <p><strong>First Name:</strong> {currentUser?.firstName}</p>
                                            <p><strong>Last Name:</strong> {currentUser?.lastName}</p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                            
                            {!isEditing && (
                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="warning"
                                        size="lg"
                                        onClick={handleEditClick}
                                        disabled={!currentUser}
                                    >
                                        Edit Profile
                                    </Button>

                                    <Button 
                                        variant="danger" 
                                        size="lg"
                                        onClick={handleDeleteProfile}
                                    >
                                        Delete Profile
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;