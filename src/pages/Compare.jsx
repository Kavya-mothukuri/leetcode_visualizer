import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Alert,
  AlertTitle,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';

import { CompareUserInfo,CompareContestInfo,CompareContestRatingGraph,CompareSubmissionsGraph,CompareCommonContestsChart} from '../components/Compare';
import { Calender } from '../components/Compare';
import  './Compare.css';

const Compare = () => {
  const [loading, setLoading] = useState(false);
  //user1
  const input1=useRef(null);
  const [username1, setUsername1] = useState('');
  const [userInfo1, setUserInfo1] = useState(null);
  const [userContests1, setUserContests1] = useState(null);
  const [userContestRankingHistory1,setUserContestRankingHistory1]=useState('');
  const [submitStatsGlobal1,setSubmitStatsGlobal1]=useState(null);
  const [calendar1,setCalendar1]=useState('');

  //user2
  const input2=useRef(null);
  const [username2, setUsername2] = useState('');
  const [userInfo2, setUserInfo2] = useState(null);
  const [userContests2, setUserContests2] = useState(null);
  const [userContestRankingHistory2,setUserContestRankingHistory2]=useState('');
  const [submitStatsGlobal2,setSubmitStatsGlobal2]=useState(null);
  const [calendar2,setCalendar2]=useState('');


  const [error,setError]=useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let user1=input1.current.value;
    let user2=input2.current.value;
    setUsername1(user1.toLowerCase());
    setUsername2(user2.toLowerCase());
  }
  useEffect(() => {

    const fetchData = async () => {
        setLoading(true);
        try {
            const response1 =  await axios.get(`http://localhost:3000/user/${username1}`);
            const data1 = response1.data;
            const response2 =  await axios.get(`http://localhost:3000/user/${username2}`);
            const data2 = response2.data;
            if (data1?.matchedUser) {
              setUserInfo1(data1.matchedUser);
              setUserContests1(data1.userContestRanking || null);    
              setUserContestRankingHistory1(data1.userContestRankingHistory || null);  
              setSubmitStatsGlobal1(data1.matchedUser.submitStatsGlobal || null); 
              setCalendar1(data1.calendar || []);
              setError(false);
            } else {
              // Throw only if matchedUser doesn't exist at all
              throw new Error('User not found');
            }
  
            if(data2.matchedUser){
              setUserInfo2(data2.matchedUser);
              setUserContests2(data2.userContestRanking || null);  
              setUserContestRankingHistory2(data2.userContestRankingHistory || null);  
              setSubmitStatsGlobal2(data2.matchedUser.submitStatsGlobal || null); 
              setCalendar2(data2.calendar || []);
              setError(false);
            }
            else {
              // Throw only if matchedUser doesn't exist at all
              throw new Error('User not found');
            }
        } catch (err) {
          console.error('Error:', err);
          setError(true);
          setUserInfo1(null);
          setUserContests1(null);
          setUserContests2(null);
          setUserInfo2(null);
          setUserContestRankingHistory1(null);
          setUserContestRankingHistory2(null);
          setSubmitStatsGlobal1(null);
          setSubmitStatsGlobal2(null);
          setCalendar1(null);
          setCalendar2(null);
          set
  
        }
        finally {
          setLoading(false);
        }
    }
  
    if(username1 !== '' && username2 !== ''){
        fetchData();
    }
  
  }, [username1, username2]);
  function renderData() {
        
    // if(userInfo1 && username1 === userInfo1.handle && userInfo2 && username2 === userInfo2.handle){
    if(userInfo1 && userInfo2){
        return (
            <>
              {/* <div className='narrowOuter' > */}
             
              <div className='broadComponent'>
                    <CompareUserInfo userInfo1={userInfo1} userInfo2={userInfo2} username1={username1} username2={username2} />
              </div>

              <div className='broadComponent'>
                <CompareContestInfo userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} />
              </div>

              <div className='broadComponent'>
                <CompareContestRatingGraph userContestRankingHistory1={userContestRankingHistory1} userContestRankingHistory2={userContestRankingHistory2} username1={username1} username2={username2}/>
              </div>
             
              <div className="narrowOuter">
            <Grid container spacing={2} justifyContent="center" columns={12}>
              <Grid >
              <div
                  className="narrowComponent"
                  style={{
                    width: '650px',
                    maxWidth: '650px',
                    margin: '1rem auto',
                    border: '1.5px solid black',
                    borderRadius: '10px',
                    backgroundColor: 'rgb(193, 232, 247)',
                    padding: '1rem',
                    boxSizing: 'border-box'
                  }}
                >

                 <CompareSubmissionsGraph submitStatsGlobal1={submitStatsGlobal1} submitStatsGlobal2={submitStatsGlobal2} username1={username1} username2={username2} />
              </div>

              </Grid>
              <Grid >
              <div
                  className="narrowComponent"
                  style={{
                    width: '650px',
                    maxWidth: '650px',
                    margin: '1rem auto',
                    border: '1.5px solid black',
                    borderRadius: '10px',
                    backgroundColor: 'rgb(193, 232, 247)',
                    padding: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                <CompareCommonContestsChart userContestRankingHistory1={userContestRankingHistory1} userContestRankingHistory2={userContestRankingHistory2} username1={username1} username2={username2} />
              </div>    
              </Grid>
           </Grid>
           </div>
            <div className='broadComponent'>      
              <Calender calendar={calendar1} username={username1}/>
            </div>
            <div className='broadComponent'>      
              <Calender calendar={calendar2} username={username2}/>
            </div>
            </>
        )
    }
}
function renderError() {
  return (
      <div className='invalid'>
          <Alert severity="error">
              <AlertTitle> <strong>Oops!</strong> </AlertTitle>
              It seems like you entered an <strong>invalid username</strong>.
          </Alert>
      </div>
  );
}
function renderWarning() {
  return (
      <div className="invalid">
          <Alert severity="warning">
              <AlertTitle> <strong>Oops!</strong> </AlertTitle>
              Please enter 2 different usernames to compare.
          </Alert>
      </div>
  );
}

  return (
    <div>
        <form className='form' noValidate autoComplete="on" onSubmit={handleSubmit} >
            <div className='flexContainer'>
                <TextField
                    className='textInput'
                    //onChange={(e) => setCurrname1(e.target.value)}
                    label="Codeforces Username 1"
                    variant="outlined"
                    color="primary"
                    inputRef={input1}
                    required
                />
                <TextField
                    className='textInput'
                    //onChange={(e) => setCurrname2(e.target.value)}
                    label="Codeforces Username 2"
                    variant="outlined"
                    color="primary"
                    inputRef={input2}
                    required
                />
                <Button
                    className='btn'
                    type="submit"
                    color="secondary"
                    variant="contained"        
                > Submit </Button>
            </div>

        </form>
        {(username1 !== '' && username2 !== '') ? (error ? renderError() : (username1===username2) ? renderWarning() : renderData()) : null}
    </div>
)
}

export default Compare
