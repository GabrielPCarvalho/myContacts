import { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"


import ContactsService from "../../services/ContactsServices"

import toast from "../../utils/toast"

import useSafeAsyncAction from "../../hooks/useSafeAsyncAction"

export default function useEditContact() {
  const [contactName, setContactName] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction()

  async function handleSubmit(contact) {
    try {
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

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
