import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import {
  Avatar,
  Table,
  Modal,
  Empty,
  Button,
  Popconfirm,
  notification,
} from "antd";
import { getAllStudents, deleteStudent, updateStudent } from "./Client";
import Container from "./Container";
import Footer from "./Footer";
import { LoadingOutlined } from "@ant-design/icons";
import { errorNotification } from "./Notification";
import AddStudentForm from "./forms/AddstudentForm";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 67,
      margin: "auto",
    }}
    spin
  />
);

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState([
    {
      students: [],

      isFetching: false,
      isAddStudentModalVisible: false,
    },
  ]);
  const openAddStudentModal = () => setOpenModal(true);
  const closeAddStudentModal = () => setOpenModal(false);
  const openNotificationWithIcon = (type, message, description) =>
    notification[type]({ message, description });

  useEffect(() => {
    setState({ isFetching: true });
    getAllStudents()
      .then((res) =>
        res.json().then((students) => {
          console.log(students);
          setState({
            students,
            isFetching: false,
          });
        })
      )
      .catch((error) => {
        const message = error.error.message;
        const description = error.error.httpStatus;
        console.log(error.error);
        errorNotification(message, description);
        setState({ isFetching: false });
      });
  }, []);

  // eslint-disable-next-line
  const updateStudentForSubmit = (student) => {
    updateStudent(student.studentId, student)
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Student updated",
          `${student.studentId} was updated`
        );
      })
      .catch((err) => {
        openNotificationWithIcon(
          "error",
          "error",
          `(${err.error.status}) ${err.error.error}`
        );
      });
  };

  let content = null;

  if (state.isFetching) {
    content = <Container>{antIcon}</Container>;
  }
  if (state.students && state.students.length) {
    const columns = [
      {
        title: "",
        key: "avatar",
        render: (text, student) => (
          <Avatar size="large">
            {student.firstName.charAt(0)}
            {student.lastName.charAt(0)}
          </Avatar>
        ),
      },
      {
        title: "Student ID",
        dataIndex: "studentId",
        key: "studentId",
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Fragment>
            <Popconfirm
              placement="topRight"
              title={`are you sure you want to delete ${record.firstName} ${record.lastName}`}
              onConfirm={() => deleteStudent(record.studentId)}
              okText="Yes,Delete"
              cancelText="No, Keep it"
              onCancel={(e) => e.stopPropagation()}
            >
              <Button
                type="danger"
                onClick={(e) => {
                  e.stopPropagation(record.studentId);
                }}
              >
                DELETE
              </Button>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return (content = (
      <Container>
        <Table
          style={{ marginBottom: "100px" }}
          dataSource={state.students}
          columns={columns}
          rowKey="studentId"
        />
        <Modal
          className="modal"
          title="Add New Student"
          visible={openModal}
          onOk={closeAddStudentModal}
          onCancel={closeAddStudentModal}
        >
          {/* inside our modal  */}
          <AddStudentForm
            onSuccess={() => closeAddStudentModal()}
            onFailure={(err) => {
              const message = err.error.message;
              const description = err.error.httpStatus;
              errorNotification(message, description);
            }}
          />
          {/*      */}
        </Modal>
        <Footer
          numberofStudents={state.students.length}
          handleOpen={() => openAddStudentModal()}
        />
        ;
      </Container>
    ));
  }

  return (
    <div>{content ? content : <Empty description="No Student Found" />}</div>
  );
}

export default App;
