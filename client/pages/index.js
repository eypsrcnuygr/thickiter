import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

index.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = await client.get("/api/users/current_user");

  return data;
};

export default index;
