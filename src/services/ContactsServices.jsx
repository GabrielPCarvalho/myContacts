import HttpClient from './utils/HttpClient';
import ContactMapper from '../services/mappers/ContactMapper';
class ContactsServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listContacts(orderBy = 'asc') {
    const contact = await this.httpClient.get(`/contacts/?orderBy=${orderBy}`);

    return contact.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
     const contact = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, { body })
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsServices();
