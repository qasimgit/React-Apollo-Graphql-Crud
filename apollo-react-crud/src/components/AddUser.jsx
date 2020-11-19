import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

// get user schema
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int!) {
    createUser(name: $name, email: $email, age: $age) {
      name
      email
      age
    }
  }
`;

export const AddUser = () => {
  const [createUser, { data }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [userInput, seUserInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  console.log("userInput", userInput);

  /**
   *
   *  Function For Create User
   */
  const handleInput = ({ target: { name, value } }) => {
    seUserInput({
      ...userInput,
      // [name]: name === "age" ? parseInt(value) : value, // this can also be done in variables under userinput
      [name]: value, // this can also be done in variables under userinput
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      variables: {
        ...userInput,
        age: Number(userInput.age),
      },
    });
  };
  return (
    <div>
      <Card>
        {" "}
        <Card.Body>
          <h2 className="text-center mb-4">Create User</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group id="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                required
                name="age"
                onChange={handleInput}
              />
            </Form.Group>
            <Button className="w-100 mt-4" type="submit">
              Create User
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Link to="/">
        <div className="w-100 text-center mt-2">Go to Homepage </div>
      </Link>
    </div>
  );
};
