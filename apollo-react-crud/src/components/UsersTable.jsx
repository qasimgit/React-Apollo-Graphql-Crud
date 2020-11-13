import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";

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

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState();
  useQuery(GET_USERS, {
    onCompleted: ({ users }) => setUsers(users),
    onError: ({ messege }) => console.log(messege),
  });
  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  const handleUserID = (e) => {
    console.log("name", e.targe.name);
  };
  return (
    <div style={{ margin: "100px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        {users.map((val, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.age}</td>
                <td>
                  <Button
                    variant="danger"
                    style={{ marginRight: "5px" }}
                    onClick={() => setUserID(val.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="primary">Update</Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};
