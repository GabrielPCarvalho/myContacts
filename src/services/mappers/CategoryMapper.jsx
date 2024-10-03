class CategoryMapper {
  toDomain(persitenceCategory) {
    return {
      id: persitenceCategory.id,
      name: persitenceCategory.name
    }
  }
}

export default new CategoryMapper();
