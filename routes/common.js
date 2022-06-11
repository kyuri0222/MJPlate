const getUser = (raw_data) => {
    const { id, user_ID, user_name, user_birth, user_phoneNum } = raw_data;
    const current_user = { id, user_ID, user_name, user_birth, user_phoneNum,};
    return current_user;
  };

module.exports = { getUser };