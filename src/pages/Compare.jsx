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

import {
  CompareUserInfo,
  CompareContestInfo,
  CompareContestRatingGraph,
  CompareSubmissionsGraph,
  CompareCommonContestsChart,
  Calender,
} from '../components/Compare';
import './Compare.css';

const Compare = () => {
  const [loading, setLoading] = useState(false);

  // Refs & state for user 1
  const input1 = useRef(null);
  const [username1, setUsername1] = useState('');
  const [userInfo1, setUserInfo1] = useState(null);
  const [userContests1, setUserContests1] = useState(null);
  const [userContestRankingHistory1, setUserContestRankingHistory1] = useState('');
  const [submitStatsGlobal1, setSubmitStatsGlobal1] = useState(null);
  const [calendar1, setCalendar1] = useState('');

  // Refs & state for user 2
  const input2 = useRef(null);
  const [username2, setUsername2] = useState('');
  const [userInfo2, setUserInfo2] = useState(null);
  const [userContests2, setUserContests2] = useState(null);
  const [userContestRankingHistory2, setUserContestRankingHistory2] = useState('');
  const [submitStatsGlobal2, setSubmitStatsGlobal2] = useState(null);
  const [calendar2, setCalendar2] = useState('');

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let user1 = input1.current.value.trim();
    let user2 = input2.current.value.trim();
    setUsername1(user1.toLowerCase());
    setUsername2(user2.toLowerCase());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL;

      try {
        const [response1, response2] = await Promise.all([
          axios.get(`${API_URL}/user/${username1}`),
          axios.get(`${API_URL}/user/${username2}`),
        ]);

        const data1 = response1.data;
        const data2 = response2.data;

        if (data1?.matchedUser) {
          setUserInfo1(data1.matchedUser);
          setUserContests1(data1.userContestRanking || null);
          setUserContestRankingHistory1(data1.userContestRankingHistory || null);
          setSubmitStatsGlobal1(data1.matchedUser.submitStatsGlobal || null);
          setCalendar1(data1.calendar || []);
          setError(false);
        } else throw new Error('User 1 not found');

        if (data2?.matchedUser) {
          setUserInfo2(data2.matchedUser);
          setUserContests2(data2.userContestRanking || null);
          setUserContestRankingHistory2(data2.userContestRankingHistory || null);
          setSubmitStatsGlobal2(data2.matchedUser.submitStatsGlobal || null);
          setCalendar2(data2.calendar || []);
          setError(false);
        } else throw new Error('User 2 not found');
      } catch (err) {
        console.error('Error:', err);
        setError(true);
        setUserInfo1(null);
        setUserInfo2(null);
        setUserContests1(null);
        setUserContests2(null);
        setUserContestRankingHistory1(null);
        setUserContestRankingHistory2(null);
        setSubmitStatsGlobal1(null);
        setSubmitStatsGlobal2(null);
        setCalendar1(null);
        setCalendar2(null);
      } finally {
        setLoading(false);
      }
    };

    if (username1 !== '' && username2 !== '') {
      fetchData();
    }
  }, [username1, username2]);

  const renderData = () => {
    if (loading) {
      return (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      );
    }

    if (userInfo1 && userInfo2) {
      return (
        <>
          <div className="broadComponent">
            <CompareUserInfo userInfo1={userInfo1} userInfo2={userInfo2} username1={username1} username2={username2} />
          </div>

          <div className="broadComponent">
            <CompareContestInfo userContests1={userContests1} userContests2={userContests2} username1={username1} username2={username2} />
          </div>

          <div className="broadComponent">
            <CompareContestRatingGraph userContestRankingHistory1={userContestRankingHistory1} userContestRankingHistory2={userContestRankingHistory2} username1={username1} username2={username2} />
          </div>

          <div className="narrowOuter">
            <Grid container spacing={2} justifyContent="center" columns={12}>
              <Grid item>
                <div className="narrowComponent" style={graphStyle}>
                  <CompareSubmissionsGraph submitStatsGlobal1={submitStatsGlobal1} submitStatsGlobal2={submitStatsGlobal2} username1={username1} username2={username2} />
                </div>
              </Grid>
              <Grid item>
                <div className="narrowComponent" style={graphStyle}>
                  <CompareCommonContestsChart userContestRankingHistory1={userContestRankingHistory1} userContestRankingHistory2={userContestRankingHistory2} username1={username1} username2={username2} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="broadComponent">
            <Calender calendar={calendar1} username={username1} />
          </div>
          <div className="broadComponent">
            <Calender calendar={calendar2} username={username2} />
          </div>
        </>
      );
    }
  };

  const renderError = () => (
    <div className="invalid">
      <Alert severity="error">
        <AlertTitle><strong>Oops!</strong></AlertTitle>
        It seems like you entered an <strong>invalid username</strong>.
      </Alert>
    </div>
  );

  const renderWarning = () => (
    <div className="invalid">
      <Alert severity="warning">
        <AlertTitle><strong>Oops!</strong></AlertTitle>
        Please enter 2 different usernames to compare.
      </Alert>
    </div>
  );

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flexContainer">
          <TextField className="textInput" label="LeetCode Username 1" variant="outlined" inputRef={input1} required />
          <TextField className="textInput" label="LeetCode Username 2" variant="outlined" inputRef={input2} required />
          <Button className="btn" type="submit" variant="contained" color="secondary">Submit</Button>
        </div>
      </form>

      {username1 && username2 && (
        error ? renderError() :
          username1 === username2 ? renderWarning() :
            renderData()
      )}
    </div>
  );
};

const graphStyle = {
  width: '650px',
  maxWidth: '650px',
  margin: '1rem auto',
  border: '1.5px solid black',
  borderRadius: '10px',
  backgroundColor: 'rgb(193, 232, 247)',
  padding: '1rem',
  boxSizing: 'border-box',
};

export default Compare;
