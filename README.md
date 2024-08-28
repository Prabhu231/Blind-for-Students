# Blind-for-students

**Blind-for-students** is a platform that allows students to ask queries anonymously related to higher studies, job opportunities, and general topics. The platform is designed to facilitate anonymous interactions, enabling users to seek and provide answers without revealing their identities. Whether you're looking for guidance on academic paths or career opportunities, Blind-for-students connects you with knowledgeable individuals who can offer valuable insights.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and modern user interfaces.
- **Axios**: A promise-based HTTP client for making requests to APIs.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Prisma**: An ORM (Object-Relational Mapping) tool for interacting with the PostgreSQL database.

## Getting Started

To get started with Blind-for-students, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Yarn or npm (Node.js package managers)

### Clone the Repository

### Install Dependencies
```bash
yarn install
# or
npm install

```

### Update the .env by following .env.example

- For the database, you can use docker by following the video linked belo
https://www.youtube.com/watch?v=RdPYA-wDhTA
- Else, you can get a database from neon.tech or aiven.io or any other online platform. Just search for neon or aiven in your browser and follow the instructions.

### Prisma

- Run the Prisma migrations to set up the database schema.
```bash
npx prisma migrate dev

```
### Run the development server

```bash
yarn dev
# or
npm run dev

```

### Run the production ready code


```bash
# To compile and generate production ready files
npm run build
# or
yarn build

```

```bash
# After the build process completes, you can start the production server using
npm start
#or
yarn start

```
- Analyze and inform me if you find a bug or if you have any issues with the project.
