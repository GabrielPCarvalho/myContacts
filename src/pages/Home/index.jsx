import { Container, Header, ListHeader, Card, InputSearchContainer } from './styles';
import { useEffect, useState, useMemo } from 'react';

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import Loader from '../../components/Loader';

import ContactsServices from '../../services/ContactsServices';


const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))
  }, [contacts, searchTerm]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        console.log('antes')
        const contactsList = await ContactsServices.listContacts(orderBy);
        console.log('depois')

        setContacts(contactsList);
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  },[orderBy]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => prevState === 'asc' ? 'desc' : 'asc'
    )
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  // SOP -> Same Origin Policy -> Política de mesma origem (apenas em navegadores)
  // CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos de origens cruzadas
  // Origem: protocolo//domínio:porta

  // Saida -> http://localhost:3000
  // Destino -> http://localhost:3001

  // Preflight -> Pré-voo -> Verificar se o servidor aceita a requisição
  // OPTIONS (http://localhost:3001/contacts)
  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
      <input
        type='text'
        value={searchTerm}
        placeholder='Pesquise pelo nome...'
        onChange={handleChangeSearchTerm}
      />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        <a href="/new">Novo contato</a>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type='button' onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => {
        return (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <a href={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </a>
              <button type='button'>
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        )
      })}


    </Container>
  )
}

export default Home
