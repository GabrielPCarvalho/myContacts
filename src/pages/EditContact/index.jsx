import { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"

import PageHeader from "../../components/PageHeader"
import ContactForm from "../../components/ContactForm"
import Loader from "../../components/Loader"

import ContactsService from "../../services/ContactsServices"
import toast from "../../utils/toast"

const EditContact = () => {
  const [isLoading, setIsLoading] = useState(true);

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(
          id,
        )

        console.log(contactData)
        setIsLoading(false)
      } catch {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contato nao encontrado'
        })
      }
    }

    loadContact();
  },[id, history]);

  function handleSubmit() {
    console.log('submit')
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Gabriel Carvalho" />
      <ContactForm ref={contactFormRef}  buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  )
}

export default EditContact
