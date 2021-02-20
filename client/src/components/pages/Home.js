import React, { useContext, useEffect } from 'react';
import Contact from '../contacts/Contact';
import ContactContext from '../../context/contact/ContactState';
import ContactForm from '../../components/contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

import AuthContext from '../../context/auth/authContext';

const Home = (props) => {
  const authContext = useContext(AuthContext);
  const { token, loadUser } = authContext;

  useEffect(() => {
    // if (token) authContext.loadUser();
    // else {
    //   props.history.push('/login');
    // }

    loadUser();
    //eslint-disable-next-line
  }, []);
  console.log(useContext(ContactContext));
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>

      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
