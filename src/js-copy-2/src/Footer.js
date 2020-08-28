import React from "react";
import Container from "./Container";
import { Button, Avatar } from "antd";
import "./Footer.css";

const Footer = ({ numberofStudents, handleOpen }) => (
  <div className="footer">
    <Container>
      {numberofStudents !== undefined ? (
        <Avatar className="avatar" size="large">
          {numberofStudents}
        </Avatar>
      ) : null}
      <Button onClick={() => handleOpen()} type="primary">
        Add New Student +
      </Button>
    </Container>
  </div>
);
export default Footer;
