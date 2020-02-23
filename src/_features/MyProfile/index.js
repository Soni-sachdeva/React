import React, { useEffect } from "react";
import { Card, Row, Col, Input } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActionCreator from "../../_redux/actions";

const MyProfile = props => {
  const { userActions, myInfo, error } = props;

  useEffect(() => {
    return () => {
      userActions.resetReducer();
    };
  }, []);
  return (
    <div>
      <Card
        title="Github profile:"
        hoverable
        style={{ width: "30rem", minHeight: "80vh" }}
      >
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ height: "100%" }}
        >
          {!error ? (
            <Col>
              <Input.Search
                placeholder="Please search your profile"
                onSearch={value => userActions.getMyProfileInfo(value)}
              />
              <br />
              <br />
              <Card
                hoverable
                style={{ width: 240, cursor: "default" }}
                type="inner"
                cover={<img alt="example" src={myInfo.avatar_url} />}
              >
                <Card.Meta
                  title={myInfo.title}
                  description={<a href={myInfo.html_url}>{myInfo.html_url}</a>}
                />
              </Card>
            </Col>
          ) : (
            <Col>
              <br />
              <br />

              <h1> Oops! Something went wroooong</h1>
              {error.message === "Not Found" && (
                <p> Sorry! We were not able to find you on github</p>
              )}
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  myInfo: state.userReducer.myInfo,
  loading: state.userReducer.loaders.getMyProfileInfo,
  error: state.userReducer.errors.getMyProfileInfo
});
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
