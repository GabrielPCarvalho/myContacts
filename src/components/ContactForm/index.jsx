import { forwardRef } from 'react';
import { Form, ButtonContainer } from './styles';
import PropTypes from 'prop-types';
import FormGroup from "../FormGroup"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"
import useContactForm from "./useContactForm"

const ContactForm = forwardRef(function ContactForm({ buttonLabel, onSubmit }, ref) {
    const {
      handleSubmit,
      getErrorMessageByFieldName,
      name,
      handleNameChange,
      isSubmitting,
      email,
      handleEmailChange,
      phone,
      handlePhoneChange,
      isLoadingCategories,
      categories,
      categoryId,
      isFormValid,
      setCategoryId,
    } = useContactForm(onSubmit, ref);

  return (
    <Form method='post' onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder='Nome *'
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='E-mail'
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          placeholder='Telefone'
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
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
      <Button
        type='submit'
        disabled={!isFormValid}
        isLoading={isSubmitting}
      >
        {buttonLabel}
      </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ContactForm;
