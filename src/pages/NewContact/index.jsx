import PageHeader from "../../components/PageHeader"
import ContactForm from "../../components/ContactForm"
import ContactsServices from "../../services/ContactsServices"
import toast from "../../utils/toast"

const NewContact = () => {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId
      };

      await ContactsServices.createContact(contact);

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
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  )
}

export default NewContact
