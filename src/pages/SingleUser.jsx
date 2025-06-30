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

import './SingleUser.css';
import {
  UserInfo,
  ContestInfo,
  ContestRatingGraph,
  ProblemVerdictChart,
  SubmissionsGraph,
  ProblemLanguageChart,
  Calender,
} from '../components/SingleUser';

const SingleUser = () => {
  const inp = useRef(null);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [userContests, setUserContests] = useState('');
  const [userContestRankingHistory, setUserContestRankingHistory] = useState('');
  const [submitStatsGlobal, setSubmitStatsGlobal] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [languageStats, setLanguageStats] = useState('');
  const [calendar, setCalendar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const uname = inp.current.value.trim();
    setUsername(uname);
  };

  const fetchData = async (uname) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/user/${uname}`);
      const data = response.data;

      if (data?.matchedUser) {
        setUserInfo(data.matchedUser);
        setSubmitStatsGlobal(data.matchedUser.submitStatsGlobal || null);
        setUserContests(data.userContestRanking || null);
        setUserContestRankingHistory(data.userContestRankingHistory || null);
        setLanguageStats(data.languageStats || []);
        setCalendar(data.calendar || []);
        setError(false);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(true);
      setUserInfo(null);
      setUserContests(null);
      setSubmitStatsGlobal(null);
      setUserContestRankingHistory(null);
      setLanguageStats(null);
      setCalendar(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchData(username);
    }
  }, [username]);

  const renderError = () => (
    <Box className="invalid">
      <Alert severity="error">
        <AlertTitle>Oops!</AlertTitle>
        We couldn't find that <strong>LeetCode user</strong>. Please try again.
      </Alert>
    </Box>
  );

  const renderData = () => {
    if (loading) {
      return (
        <Box mt={4} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      );
    }

    if (!userInfo || !userContests || !userContestRankingHistory || !submitStatsGlobal) return null;

    return (
      <>
        <div className="flexContainer">
        <div className="narrowOuter">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <div className="narrowComponent0">
                <UserInfo userInfo={userInfo} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="narrowComponent0">
                <ContestInfo userContests={userContests} />
              </div>
            </Grid>
          </Grid>
        </div>

          <div className="broadComponent">
            <ContestRatingGraph userContestRankingHistory={userContestRankingHistory} />
          </div>

          <div className="narrowOuter">
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <div className="narrowComponent" style={{ backgroundColor: 'rgb(193, 232, 247)', border: '1.5px solid black' }}>
                  <ProblemVerdictChart submitStatsGlobal={submitStatsGlobal} />
                </div>
              </Grid>
              <Grid item>
                <div className="narrowComponent" style={{ backgroundColor: 'rgb(193, 232, 247)', border: '1.5px solid black' }}>
                  <SubmissionsGraph submitStatsGlobal={submitStatsGlobal} />
                </div>
              </Grid>
              <Grid item>
                <div className="narrowComponent" style={{ backgroundColor: 'rgb(193, 232, 247)', border: '1.5px solid black' }}>
                  <ProblemLanguageChart languageStatsQuery={languageStats} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="broadComponent">
            <Calender calendar={calendar} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="flexContainer">
          <TextField
            inputRef={inp}
            className="textInput"
            label="LeetCode Username"
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" className="btn" color="primary">
            Submit
          </Button>
        </div>
      </form>
      {username && (error ? renderError() : renderData())}
    </div>
  );
};

export default SingleUser;
