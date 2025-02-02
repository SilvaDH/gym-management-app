import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, Table, Loader, Message, Segment, Icon } from 'semantic-ui-react';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api_v1/gym/members', {
          headers: { Authorization: token },
        });
        setMembers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load members');
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Segment padded raised style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
        <Header as="h2" icon textAlign="center" style={{ color: 'red' }}>
          <Icon name="users" circular inverted color="red" />
          <Header.Content>Gym Members</Header.Content>
        </Header>
        {loading && <Loader active inline="centered" />}
        {error && <Message negative>{error}</Message>}
        <Table celled compact style={{ backgroundColor: '#fff', color: '#000' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.map(member => (
              <Table.Row key={member._id}>
                <Table.Cell>{member.name}</Table.Cell>
                <Table.Cell>{member.email}</Table.Cell>
                <Table.Cell>{member.phone}</Table.Cell>
                <Table.Cell>{member.membershipStatus}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
};

export default Dashboard;
