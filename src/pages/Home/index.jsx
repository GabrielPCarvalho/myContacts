import { Container, Header, ListContainer, Card, InputSearchContainer } from './styles';
import { useEffect, useState } from 'react';

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'


const Home = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log("error", error)
      });
  },[]);

  console.log(contacts);

  // SOP -> Same Origin Policy -> Política de mesma origem (apenas em navegadores)
  // CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos de origens cruzadas
  // Origem: protocolo//domínio:porta

  // Saida -> http://localhost:3000
  // Destino -> http://localhost:3001

  // Preflight -> Pré-voo -> Verificar se o servidor aceita a requisição
  // OPTIONS (http://localhost:3001/contacts)
  return (
    <Container>
      {/* <Loader /> */}
      {/* <Modal danger /> */}
       <InputSearchContainer>
        <input type='text' placeholder='Pesquise pelo nome...' />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        <a href="/new">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type='button' className='sort-button'>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact) => {
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


      </ListContainer>
    </Container>
  )
}

export default Home
