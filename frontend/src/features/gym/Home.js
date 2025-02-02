// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Header, Image, Grid, Segment, Icon } from 'semantic-ui-react';

// const Home = () => {
//   const [photos, setPhotos] = useState([]);
//   const [schedules, setSchedules] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const photosResponse = await axios.get('http://localhost:8000/api_v1/gym/photos');
//         const schedulesResponse = await axios.get('http://localhost:8000/api_v1/gym/schedules');
//         setPhotos(photosResponse.data);
//         setSchedules(schedulesResponse.data);
//       } catch (error) {
//         console.error("Error fetching gym data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Container textAlign="center" style={{ marginTop: '5em' }}>
//       <Segment raised>
//         <Header as="h2" icon textAlign="center" style={{ color: 'red' }}>
//           <Icon name="dumbbell" circular inverted color="red" />
//           <Header.Content>Welcome to Our Gym</Header.Content>
//         </Header>
        
//         {/* Display Gym Photos */}
//         <Grid columns={3} stackable>
//           {photos.map(photo => (
//             <Grid.Column key={photo._id}>
//               <Image src={photo.imageUrl} size="medium" bordered rounded />
//               <p>{photo.caption}</p>
//             </Grid.Column>
//           ))}
//         </Grid>

//         {/* Display Gym Schedules */}
//         <Segment>
//           <Header as="h3" style={{ color: 'red' }}>Gym Schedules</Header>
//           {schedules.map(schedule => (
//             <p key={schedule._id}>
//               <strong>{schedule.day}</strong>: {schedule.openTime} - {schedule.closeTime} | Activities: {schedule.activities.join(', ')}
//             </p>
//           ))}
//         </Segment>
//       </Segment>
//     </Container>
//   );
// };

// export default Home;
// Frontend: Home.js
















  

 // Frontend: Home.js - Enhanced Modern UI with Pricing & Testimonials
import { useEffect, useState } from 'react';
import { Container, Header, Image, Grid, Segment, Icon, List, Divider, Button, Card, Form, Input, TextArea } from 'semantic-ui-react';

const Home = () => {
  // Dummy Data for Gym Photos, Schedules, Pricing, and Testimonials
  const dummyPhotos = [
    { id: 1, imageUrl: 'https://d2ub1k1pknil0e.cloudfront.net/media/images/gym-membership-on-wellington-campus.width-1200.jpg', caption: 'State-of-the-art equipment' },
    { id: 2, imageUrl: 'https://plus.unsplash.com/premium_photo-1661265933107-85a5dbd815af?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3ltfGVufDB8fDB8fHww', caption: 'Spacious workout area' },
    { id: 3, imageUrl: 'https://www.styku.com/hubfs/gym-interior-with-equipments-2.jpg', caption: 'Group training sessions' }
  ];

  const dummySchedules = [
    { id: 1, day: 'Monday - Friday', openTime: '6:00 AM', closeTime: '10:00 PM', activities: ['Cardio', 'Weight Training', 'Yoga'] },
    { id: 2, day: 'Saturday - Sunday', openTime: '8:00 AM', closeTime: '8:00 PM', activities: ['CrossFit', 'Zumba', 'Boxing'] }
  ];

  const dummyPricing = [
    { id: 1, plan: 'Basic', price: '$30/month', features: ['Gym Access', 'Locker Room', 'Free Weights'] },
    { id: 2, plan: 'Premium', price: '$50/month', features: ['All Basic Features', 'Personal Trainer', 'Group Classes'] },
    { id: 3, plan: 'Elite', price: '$80/month', features: ['All Premium Features', 'Sauna & Spa', 'Exclusive Member Events'] }
  ];

  const dummyTestimonials = [
    { id: 1, name: 'John Doe', review: 'Great gym with amazing facilities! Highly recommended!' },
    { id: 2, name: 'Jane Smith', review: 'Best trainers and well-maintained equipment!' },
    { id: 3, name: 'David Lee', review: 'I love the community and the classes offered here!' }
  ];

  return (
    <Container textAlign="center" style={{ marginTop: '5em' }}>
      <Segment raised style={{ background: '#121212', color: 'white', borderRadius: '15px', padding: '3em', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.3)' }}>
        <Header as="h2" icon textAlign="center" style={{ color: '#E63946' }}>
          <Icon name="dumbbell" circular inverted color="red" />
          <Header.Content>Welcome to Our Gym</Header.Content>
        </Header>
        <Divider />
        
        {/* Display Gym Photos */}
        <Grid columns={3} stackable>
          {dummyPhotos.map(photo => (
            <Grid.Column key={photo.id}>
              <Card style={{ background: '#1E1E1E', color: 'white', borderRadius: '10px', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.2)' }}>
                <Image src={photo.imageUrl} size="large" wrapped style={{ borderRadius: '10px' }} />
                <Card.Content>
                  <Card.Description style={{ color: 'white', fontSize: '1.2em' }}>{photo.caption}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        
        <Divider />

        {/* Membership Pricing Plans */}
        <Header as="h3" style={{ color: '#E63946' }}>Membership Plans</Header>
        <Grid columns={3} stackable>
          {dummyPricing.map(plan => (
            <Grid.Column key={plan.id}>
              <Segment raised style={{ background: '#1E1E1E', color: 'white', borderRadius: '10px', padding: '1.5em' }}>
                <Header as="h4" style={{ color: '#E63946' }}>{plan.plan}</Header>
                <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{plan.price}</p>
                <List divided relaxed>
                  {plan.features.map((feature, index) => (
                    <List.Item key={index} style={{ color: 'white' }}>{feature}</List.Item>
                  ))}
                </List>
                <Button color="red" size="large" style={{ marginTop: '1em', borderRadius: '10px' }}>Join Now</Button>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
        
        <Divider />
        
        {/* Testimonials */}
        <Header as="h3" style={{ color: '#E63946' }}>What Our Members Say</Header>
        <Grid columns={3} stackable>
          {dummyTestimonials.map(testimonial => (
            <Grid.Column key={testimonial.id}>
              <Segment raised style={{ background: '#1E1E1E', color: 'white', borderRadius: '10px', padding: '1.5em' }}>
                <Header as="h4" style={{ color: '#E63946' }}>{testimonial.name}</Header>
                <p style={{ fontSize: '1.1em', fontStyle: 'italic' }}>"{testimonial.review}"</p>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
        
        <Divider />

        {/* Contact Form */}
        <Header as="h3" style={{ color: '#E63946' }}>Get in Touch</Header>
        <Form style={{ maxWidth: '600px', margin: 'auto' }}>
          <Form.Field
            control={Input}
            label='Name'
            placeholder='Your Name'
          />
          <Form.Field
            control={Input}
            label='Email'
            placeholder='Your Email'
          />
          <Form.Field
            control={TextArea}
            label='Message'
            placeholder='Your Message'
          />
          <Button color="red" size="large" style={{ borderRadius: '10px', marginTop: '1em', background: '#E63946', color: 'white', boxShadow: '0 4px 8px rgba(255, 0, 0, 0.3)' }}>Send Message</Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default Home;