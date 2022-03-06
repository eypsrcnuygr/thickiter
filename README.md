# THICKITER
A microservice structured application that you can sell second-hand tickets <br />
It uses [Dockerized](https://www.docker.com/) images, and run on [Kubernetes](https://kubernetes.io/) cluster.

### In progress...

## The Features Implemented Yet
- Authentication service implemented <br />
    1. You can sign up sign in and sign out
    2. The flow is managed via JWT coupled with cookie.
    3. The front-end is implemented for auth, it's a SSR [Next.js](https://nextjs.org/) application.
- Ticket service implemented <br />
    1. You can create a ticket
    2. You can see all tickets created
    3. You can update your own tickets
    4. Front-end yet not implemented!
- [Mongo DB](https://www.mongodb.com/) connection is implemented
    1. User creation
- Tests for auth service
- Tests for tickets service
- An [npm package](https://www.npmjs.com/package/@esuthickiter/common) is pushed for common module that is a submodule of this repo.

## Quick Note
- To run this repo locally the best is add the thickiter.dev to your ```hosts``` file which points to 127.0.0.1 then run the ```skaffold dev``` command in the root. Then it'll pull down the images from docker hub, start Kubernetes cluster with the pulled containers inside the pods. I'm also assuming that you already have ```ingress-nginx``` locally which serves as a controller and organizes the routing to the related services. If you still have problems running it locally DM me via Twitter or mail, so we can look it up and solve the issue.
- I'm planning to deploy it to the internet, build upon it a real application, which serves as a thicket selling environment, especially in Turkey. So hoping you'll see the finished product in the end.

