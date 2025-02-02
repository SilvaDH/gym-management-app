// Frontend: features/user/RegisterPage.js
import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Message, Segment, Header, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await axios.post('http://localhost:8000/api_v1/users/register', form);
      setSuccess('User registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Segment padded raised style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
        <Header as="h2" icon textAlign="center" style={{ color: 'red' }}>
          <Icon name="signup" circular inverted color="red" />
          <Header.Content>Register</Header.Content>
        </Header>
        {error && <Message negative>{error}</Message>}
        {success && <Message positive>{success}</Message>}
        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
          <Form.Input label="Name" name="name" placeholder="Enter your name" onChange={handleChange} required />
          <Form.Input label="Email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
          <Form.Input label="Password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
          <Button color="red" fluid size="large" type="submit">Register</Button>
        </Form>
        <Message>
          Already have an account? <Link to="/login" style={{ color: 'red' }}>Login</Link>
        </Message>
      </Segment>
    </Container>
  );
};

export default RegisterPage;