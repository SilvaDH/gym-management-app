// Frontend: features/user/User.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List, Loader, Message, Segment, Card, Icon } from 'semantic-ui-react';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api_v1/users');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadUsers();
  }, []);

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Segment padded raised style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
        <Header as="h2" icon textAlign="center" style={{ color: 'red' }}>
          <Icon name="users" circular inverted color="red" />
          <Header.Content>Users List</Header.Content>
        </Header>
        {loading && <Loader active inline="centered" />}
        {error && <Message negative>{error}</Message>}
        <Card.Group centered>
          {users.map((user) => (
            <Card key={user._id} color="red" style={{ borderRadius: '10px', boxShadow: '5px 5px 15px rgba(0,0,0,0.5)' }}>
              <Card.Content textAlign="center">
                <Icon name="user circle" size="huge" color="black" />
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>{user.email}</Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </Container>
  );
};

export default User;