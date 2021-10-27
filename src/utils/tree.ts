export const mapCategory = (data: any[], key: string, select: boolean) => {
  data.map((category: any) => {
    if (category.select !== undefined) {
      delete category.select;
    }
    if (category.key === key) {
      category.select = select;
    }
    if (category.children !== undefined) {
      mapCategory(category.children, key, select);
    }
    return category;
  });
};

export const searchCategory: any = (
  data: any,
  name: string,
  filterCategories: string[]
) => {
  for (let i = 0; i < data.length; i++) {
    const category = data[i];
    if (category.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())) {
      filterCategories.push(category.key);
    }
    if (category.children !== undefined) {
      const arr = searchCategory(category.children, name, filterCategories);
      filterCategories.concat(arr);
    }
  }
  return filterCategories;
};

export const filter: any = (data: any[], keysSearch: string[]) => {
  return data
    .filter(
      (item: any) =>
        keysSearch.includes(item.key) || Array.isArray(item.children)
    )
    .map((item: any) => {
      if (Array.isArray(item.children)) {
        return {...item, children: filter(item.children, keysSearch)}
      }
      return item;
    });
};

export const filterChildren: any = (data: any[], keysSearch: string[]) => {
  return data.filter((item:any) => {      
    if (Array.isArray(item.children)) {
      if (item.children.length !== 0 || keysSearch.includes(item.key)) {
        return true;
      }
      return false;
    }
    return true;
  })
  .map((item:any) => {
    if (item.children !== undefined) {
      return { ...item, children: filterChildren(item.children, keysSearch) }
    }    
    return item;
  });
};