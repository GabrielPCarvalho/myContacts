import { useState } from 'react';
import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types';

import FormGroup from "../FormGroup"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"



const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  }
  //TODO -  Validando os dados do input de nome
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nome'
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail'
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder='Telefone'
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Categoria</option>
          <option value='Instagram'>Instagram</option>
          <option value='Facebook'>Facebook</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
      <Button type='submit'>
        {buttonLabel}
      </Button>
      </ButtonContainer>
    </Form>
  )
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default ContactForm;
