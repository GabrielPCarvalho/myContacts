import { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"

import PageHeader from "../../components/PageHeader"
import ContactForm from "../../components/ContactForm"
import Loader from "../../components/Loader"

import ContactsService from "../../services/ContactsServices"

import toast from "../../utils/toast"

import useSafeAsyncAction from "../../hooks/useSafeAsyncAction"

const EditContact = () => {
  const [contactName, setContactName] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction()

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId
      };

      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: "success",
        text: "Contato editado com sucesso!"
      })
    } catch {
      toast({
      type: "danger",
      text: "Ocorreu um erro ao editar o contato!"
    })
    }
  }

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id,
        )

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact)
          setIsLoading(false)
          setContactName(contact.name);
        })
      } catch {
        safeAsyncAction(() => {
          history.push('/')
          toast({
            type: 'danger',
            text: 'Contato nao encontrado'
          })
        })
      }
    }

    loadContact();
  },[id, history, safeAsyncAction]);

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? "Carregando ..." : `Editar ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit} />
    </>
  )
}

export default EditContact
