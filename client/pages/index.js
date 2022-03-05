import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

index.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = await client.get("/api/users/current_user");

  return data;
};

export default index;
