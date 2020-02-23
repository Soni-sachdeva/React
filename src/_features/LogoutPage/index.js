import React from "react";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

export const Logout = () => {
  return (
    <div>
      <Card
        title="Logout:"
        hoverable
        style={{ width: "30rem", minHeight: "80vh" }}
      >
        <Row type="flex" align="middle" justify="center">
          <Col>
            <h3 style={{ display: "flex", justifyContent: "center" }}>
              Please don't leave us
            </h3>
            <br />

            <img src="http://placekitten.com/200/300" />
            <br />
            <br />
            <br />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button size="large" icon="frown">
                <Link style={{ color: "inherit" }} to="/login">
                  &nbsp;&nbsp; Logout anyway
                </Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

// {
//   /* <Link to="/login">Logout</Link> */
// }
