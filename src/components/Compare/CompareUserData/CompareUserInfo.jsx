import React from 'react'
import CompareCustomTable from './CompareCustomTable'

const CompareUserInfo = ({userInfo1,userInfo2}) => {

    if (!userInfo1) {
        return <div>No user information available.</div>;
      }
    
      const username1 = userInfo1.username || 'N/A';
      const country1 = userInfo1.profile?.countryName || 'N/A';
      const ranking1 = userInfo1.profile?.ranking ?? 'N/A';
      const reputation1 = userInfo1.profile?.reputation ?? 'N/A';
      const name1 = userInfo1.profile?.realName || 'N/A';


      if (!userInfo2) {
        return <div>No user information available.</div>;
      }
    
      const username2 = userInfo2.username || 'N/A';
      const country2 = userInfo2.profile?.countryName || 'N/A';
      const ranking2 = userInfo2.profile?.ranking ?? 'N/A';
      const reputation2 = userInfo2.profile?.reputation ?? 'N/A';
      const name2 = userInfo2.profile?.realName || 'N/A';

      const rows=[
        {id:1,name:'Username',data1:username1,data2:username2},
        {id:2,name:'Name',data1:name1,data2:name2},
        {id:3,name:'Country',data1:country1,data2:country2},
        {id:4,name:'Ranking',data1:ranking1,data2:ranking2},
        {id:5,name:'Reputation',data1:reputation1,data2:reputation2},
        
      ]
  return (
    <div>
      <CompareCustomTable rows={rows} TableName="User Info" username1={username1} username2={username2}/>
    </div>

  )
}

export default CompareUserInfo
