import PageHeader from "../../components/PageHeader"
import ContactForm from "../../components/ContactForm"
import ContactsServices from "../../services/ContactsServices"

const NewContact = () => {
  async function handleSubmit(formData) {
    try {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    };

    const response = await ContactsServices.createContact(contact);

    console.log(response)
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato')
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
