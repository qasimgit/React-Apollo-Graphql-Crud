import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useQuery, gql, useMutation } from "@apollo/client";

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
// delete user schema
const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

// update user schema
const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String!, $email: String!, $age: Int!) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [updateSubmit, setUpdateSubmit] = useState(false);
  const [currentID, setCurrentID] = useState();
  const [userID, setUserID] = useState();
  const [curretTodo, setCurrentTodo] = useState({});

  const [deleteUser, { data }] = useMutation(DELETE_USER, {
    onCompleted: () => console.log("user successfully deleted"),
    refetchQueries: [{ query: GET_USERS }],
  });

  // get users usequery
  const { data: usersData, refetch: refetchUsers } = useQuery(GET_USERS, {
    onCompleted: ({ users }) =>
      setUsers(users) || console.log("USERSSERSERSER", users),
    onError: ({ messege }) => console.log(messege),
  });

  // update user mutation
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: refetchUsers,
  });

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log(userID);
  }, [userID]);

  // handle update user function
  const handleUpdateUser = ({ name, id, email, age }) => {
    setCurrentTodo({ name, id, email, age });
    console.log(curretTodo);
    setCurrentID(id);

    console.log(updateState);
    console.log("id ", id);
  };

  // handle update input function
  const handleUpdateInput = ({ target: { name, value } }) => {
    setCurrentTodo({ ...curretTodo, [name]: value });
  };

  // handle delete function
  const handleDelete = ({ name, id }) => {
    deleteUser({
      variables: {
        id,
      },
    });
    console.log("name ", name, "id", id);
  };

  // handle submitting update function
  const handleUpdateSubmit = () => {
    setUpdateSubmit(!updateSubmit);
    console.log("handleSubmit");
    if (updateSubmit) {
      updateUser({
        variables: {
          id: curretTodo.id,
          name: curretTodo.name,
          email: curretTodo.email,
          age: Number(curretTodo.age),
        },
      });
      console.log("update button working");
      setUpdateSubmit(!updateSubmit);
      console.log(updateSubmit);
    }
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
        {usersData?.users.map((val, i) => {
          return (
            <tbody key={i}>
              <tr>
                {updateState && val.id === currentID ? (
                  <>
                    <td>{val.id}</td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        value={curretTodo.name}
                        name="name"
                        onChange={handleUpdateInput}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        value={curretTodo.email}
                        name="email"
                        onChange={handleUpdateInput}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        name="age"
                        value={curretTodo.age}
                        onChange={handleUpdateInput}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.age}</td>
                  </>
                )}

                <td>
                  <Button
                    variant="danger"
                    style={{ marginRight: "5px" }}
                    onClick={() => handleDelete(val)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setUpdateState(!updateState);

                      if (!updateSubmit) {
                        handleUpdateUser(val);
                      }
                      handleUpdateSubmit();
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};
