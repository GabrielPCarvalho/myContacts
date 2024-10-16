import {
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';

import CategoriesService from '../../services/CategoriesService';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone) ?? '');
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

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

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId
    });

    setIsSubmitting(false);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await CategoriesService.listCategories();

        setCategories(categories);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  },[setCategories, setIsLoadingCategories]);

  return {
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
  }
}
