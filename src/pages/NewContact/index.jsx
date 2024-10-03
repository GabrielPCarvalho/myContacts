import { useRef } from "react"

import PageHeader from "../../components/PageHeader"
import ContactForm from "../../components/ContactForm"

import ContactsServices from "../../services/ContactsServices"

import toast from "../../utils/toast"


const NewContact = () => {
  const contactFormRef = useRef(null);


  async function handleSubmit(contact) {
    try {
      await ContactsServices.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: "success",
        text: "Contato cadastrado com sucesso!"
      })
    } catch {
      toast({
      type: "danger",
      text: "Ocorreu um erro ao cadastrar o contato!"
    })
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm ref={contactFormRef} buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  )
}

export default NewContact
