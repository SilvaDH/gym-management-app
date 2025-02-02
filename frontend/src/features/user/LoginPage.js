// Frontend: features/user/LoginPage.js
import { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Message, Segment, Header, Icon } from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api_v1/users/login', {
        email: form.email.trim().toLowerCase(), // Ensure email consistency
        password: form.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
};


  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Segment padded raised style={{ backgroundColor: '#222', color: 'white', borderRadius: '10px' }}>
        <Header as="h2" icon textAlign="center" style={{ color: 'red' }}>
          <Icon name="sign-in" circular inverted color="red" />
          <Header.Content>Login</Header.Content>
        </Header>
        {error && <Message negative>{error}</Message>}
        <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
          <Form.Input label="Email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} required />
          <Form.Input label="Password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} required />
          <Button color="red" fluid size="large" type="submit">Login</Button>
        </Form>
        <Message>
          Don't have an account? <Link to="/register" style={{ color: 'red' }}>Sign Up</Link>
        </Message>
      </Segment>
    </Container>
  );
};

export default LoginPage;