import { useState, useEffect } from 'react';
import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types';
import FormGroup from "../FormGroup"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"
import CategoriesService from '../../services/CategoriesService';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErrors from '../../hooks/useErrors';



const ContactForm = ({ buttonLabel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const {
    setError,
    getErrorMessageByFieldName,
    removeError,
    errors
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  function handleNameChange(e){
    setName(e.target.value)

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(e){
    setEmail(e.target.value)

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({ field: 'email', message: 'Email invalido' });
    } else {
      removeError('email');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  useEffect(() => {
    async function loadCategories() {
      const categories = await CategoriesService.listCategories();
      setCategories(categories);
    }

    loadCategories();
  },[]);

  return (
    <Form method='post' onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder='Nome *'
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='E-mail'
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          placeholder='Telefone'
          maxLength={15}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value=''>Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}

        </Select>
      </FormGroup>

      <ButtonContainer>
      <Button type='submit' disabled={!isFormValid}>
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
