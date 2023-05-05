export default function RenderQuery(query) {
  let content;
  const { isLoading, isError } = query;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    //content = <p>{query.error.message}</p>;
    content = <pre>Error: {JSON.stringify(query.error.message)}</pre>;
  }
  return content;
}
