import axios from "axios";

const index = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

index.getInitialProps = async ({ req }) => {
  let response = null;

  if (typeof window === "undefined") {
    response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current_user",
      {
        headers: req.headers,
      }
    );
  } else {
    response = await axios.get("/api/users/current_user");

    return response.data;
  }

  return response.data;
};

export default index;
