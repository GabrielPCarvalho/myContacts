import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';



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
  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}


      <Header hasError={hasError} qtyOfContacts={contacts.length} qtyOfFilteredContacts={filteredContacts.length} />

      {hasError && ( <ErrorStatus onTryAgain={handleTryAgain} /> )}
      {isListEmpty && ( <EmptyList /> )}
      {isSearchEmpty && ( <SearchNotFound searchTerm={searchTerm} /> )}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  )
}

export default Home
