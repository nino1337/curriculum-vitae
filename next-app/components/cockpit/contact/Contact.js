import { TextField } from '@material-ui/core';
import { useAnimation } from 'framer-motion';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

import { forms } from '../../../axios';
import Button from '../button/Button';
import * as S from './Contact.styles';

const Contact = ({ inView }) => {
  const [formInputs, setFormInputs] = useState({
    name: '',
    mail: '',
    subject: '',
    message: '',
  });
  const [formSubmission, setFormSubmission] = useState({
    submitted: false,
    error: false,
  });
  const animationContact = useAnimation();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const response = await forms.post('/submit/contact', {
      form: {
        ...formInputs,
      },
    });

    if (response.status === 200) {
      setFormSubmission({
        submitted: true,
        error: false,
      });
    } else {
      setFormSubmission({
        submitted: true,
        error: true,
      });
    }
  };
  const handleInputChange = (event) => {
    setFormInputs((prevFormInputs) => ({
      ...prevFormInputs,
      [event.target.id]: event.target.value,
    }));
  };

  if (inView) {
    animationContact.start({ opacity: 1, top: 0 });
  }

  return (
    <S.ContactForm
      onChange={handleInputChange}
      onSubmit={handleFormSubmit}
      initial={{ opacity: 0, top: 100 }}
      animate={animationContact}
    >
      <Row>
        <Col xs="12" md="6">
          <TextField id="name" label="Name, Vorname" value={formInputs.name} required />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <TextField id="mail" label="E-Mail" value={formInputs.mail} required />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="6">
          <TextField id="subject" label="Betreff" value={formInputs.subject} />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <TextField
            id="message"
            label="Nachricht"
            value={formInputs.message}
            multiline
            rows="8"
            required
          />
        </Col>
      </Row>
      <Button onClick={handleFormSubmit} text="Absenden" />
      {formSubmission.submitted && formSubmission.error && (
        <S.ContactError>
          Es ist ein Fehler aufgetreten. Versuchen Sie es bitte erneut!
        </S.ContactError>
      )}
      {formSubmission.submitted && !formSubmission.error && (
        <S.ContactSuccess>Ihre Nachricht wurde erfolgreich abgeschickt.</S.ContactSuccess>
      )}
    </S.ContactForm>
  );
};

Contact.propTypes = {
  inView: propTypes.bool,
};

export default Contact;
