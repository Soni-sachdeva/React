import React, { useEffect } from "react";
import { Card, List, Avatar } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActionCreator from "../../_redux/actions";
import { map } from "lodash";
const Users = props => {
  const { userActions, users, loading } = props;
  useEffect(() => {
    userActions.getRandomUsers();
  }, []);
  return (
    <div>
      <Card
        title="Random github users:"
        hoverable
        loading={loading}
        style={{
          width: "30rem",
          height: "80vh",
          cursor: "default",
          overflow: "auto"
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={map(users)}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar_url} />}
                title={<b> {item.login}</b>}
                description={<a href={item.html_url}> {item.url}</a>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.userReducer.users,
  loading: state.userReducer.loaders.getUsers
});
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
