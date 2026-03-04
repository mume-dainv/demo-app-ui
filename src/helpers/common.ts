export const getSearchParams = (searchParams: Object) => {
  const search = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    search.set(key, value);
  });

  return search;
};
