// UserInfo.jsx
import React from 'react';
import CustomTable from './CustomTable';

const UserInfo = ({ userInfo }) => {
  if (!userInfo) {
    return <div>No user information available.</div>;
  }

  const username = userInfo.username || 'N/A';
  const country = userInfo.profile?.countryName || 'N/A';
  const ranking = userInfo.profile?.ranking ?? 'N/A';
  const reputation = userInfo.profile?.reputation ?? 'N/A';
  const name = userInfo.profile?.realName || 'N/A';

  const rows = [
    { id: 1, name: 'Username', data: username },
    { id: 2, name: 'Name', data: name },
    { id: 3, name: 'Country', data: country },
    { id: 4, name: 'Ranking', data: ranking },
    { id: 5, name: 'Reputation', data: reputation },
    
  ];

  return (
    <div>
      <CustomTable rows={rows} TableName="User Info" />
    </div>
  );
};

export default UserInfo;