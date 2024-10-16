import { Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer, EmptyListContainer, SearchNotFoundContainer } from './styles';

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import emptyBox from '../../assets/images/emptyBox.svg'
import magnifierQuestion from '../../assets/images/magnifierQuestion.svg'
import sad from '../../assets/images/sad.svg'

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import useHome from './useHome';

const Home = () => {

  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    hasError,
    contacts,
    filteredContacts,
    contactBeingDeleted,
    searchTerm,
    orderBy,
    handleTryAgain,
    handleCloseDeleteModal,
    handleDeleteContact,
    handleConfirmDeleteContact,
    handleChangeSearchTerm,
    handleToggleOrderBy,
  } = useHome();

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

      <Modal
        danger
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type='text'
            value={searchTerm}
            placeholder='Pesquise pelo nome...'
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}


      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }>
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <a href="/new">Novo contato</a>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type='button' onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

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
                    {contact.category.name && (
                      <small>{contact.category.name}</small>
                    )}
                  </div>
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                </div>

                <div className="actions">
                  <a href={`/edit/${contact.id}`}>
                    <img src={edit} alt="Edit" />
                  </a>
                  <button
                    type='button'
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img src={trash} alt="Delete" />
                  </button>
                </div>
              </Card>
            )
          })}
        </>
      )}


    </Container>
  )
}

export default Home
