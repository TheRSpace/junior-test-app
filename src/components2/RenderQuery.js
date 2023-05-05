export default function RenderQuery(query) {
  let content;
  if (query.isLoading) {
    content = <p>Loading...</p>;
  } else if (query.isError) {
    //content = <p>{query.error.message}</p>;
    content = <pre>Error: {JSON.stringify(query.error.message)}</pre>;
  }
  return content;
}
