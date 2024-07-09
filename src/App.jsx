import Header from './Header.jsx';
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Feed from './Feed.jsx';
import Archieve from './Archieve.jsx';
import Detail from './CallDetail.jsx';
import AlertDialogSlide from './dialog.jsx';
import NavigationBottom from './NavigationBottom.jsx';

const App = () => {

  const [callData, setCallData] = useState(null);
  const [archieveData, setArchieveData] = useState(null);
  const [nonArchieveData, setNonArchieveData] = useState(null);
  const [error, setError] = useState(null);
  const [tab, setTab] = React.useState(0);
  const [callId, setCallId] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const fetchCallsData = async () => {
    try {
      const response = await fetch('https://aircall-backend.onrender.com/activities');
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setCallData(responseData);
      const nonArchieveData = responseData.filter(item => item.is_archived === false);
      const archeveData = responseData.filter(item => item.is_archived === true);
      setArchieveData(archeveData);
      setNonArchieveData(nonArchieveData);
    } catch (error) {
      setCallData(null);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchCallsData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleItemClick = (itemId) => {
    setCallId(itemId);
    setTab(2);
  };

  const archiveAll = async () => {
    try {
      await Promise.all(
        callData.map(async (item) => {
          const updatedData = {
            is_archived: true
          };

          const response = await fetch(`https://aircall-backend.onrender.com/activities/${item.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });

          if (!response.ok) {
            throw new Error('Failed to archive all items');
          }
        })
      );

      fetchCallsData(); // Fetch data after successful archiveAll operation
    } catch (error) {
      console.error('Error archiving all items:', error);
      // Handle error if needed
    }
  }


  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = (status) => {
    setOpenDialog(false);
    if (status == 'ok') {
      archiveAll();
    }

  };

  return (
    <div className='container' style={{ position: 'relative' }}>
      <Header />
      <div className="container-view">
        {openDialog == true && <AlertDialogSlide openDialog={openDialog} handleClose={dialogClose}></AlertDialogSlide>}
        <Box >
          <Feed tabIndex={tab} index={0} calls={nonArchieveData} singleCallClicked={handleItemClick} fetchCallsData={fetchCallsData}>
          </Feed>
          {
            tab == 2 &&
            <Detail tabIndex={tab} index={2} id={callId}>
            </Detail>
          }
          <Archieve tabIndex={tab} index={1} calls={archieveData} singleCallClicked={handleItemClick} fetchCallsData={fetchCallsData}>
          </Archieve>

          <NavigationBottom
            tab={tab}
            dialogOpen={dialogOpen}
            handleTabChange={handleTabChange}
            fetchCallsData={fetchCallsData}
          />
        </Box>
      </div>
    </div>
  );
};


export default App;






//   <Router>
//   <div className="container">
//     <div className="container-view">
//       {open && <AlertDialogSlide open={open} handleClose={handleCloseButton} />}
//       <Box>
//         <Switch>
//           <Route exact path="/">
//             <Feed calls={nonArchieveData} handleItemClick={handleItemClick} fetchData={fetchData} />
//           </Route>
//           <Route path="/activity">
//             <Detail id={callId} />
//           </Route>
//           <Route path="/archive">
//             <Archieve calls={archieveData} handleItemClick={handleItemClick} fetchData={fetchData} />
//           </Route>
//         </Switch>

//         <span style={{ position: 'absolute', bottom: 90, right: 25 }}>
//           {window.location.pathname === '/' && nonArchieveData && (
//             <Tooltip title="Archive all" placement="left">
//               <Fab color="primary" aria-label="Archive all" onClick={handleClickOpen}>
//                 <ArchiveIcon />
//               </Fab>
//             </Tooltip>
//           )}
//           {window.location.pathname === '/archive' && archieveData && (
//             <Tooltip title="Unarchive all" placement="left">
//               <Fab color="primary" aria-label="Unarchive all" onClick={unArchiveAll}>
//                 <UnarchiveIcon />
//               </Fab>
//             </Tooltip>
//           )}
//         </span>

//         <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={0}>
//           <hr />
//           <BottomNavigation
//             showLabels
//             value={window.location.pathname}
//             onChange={(event, newValue) => {
//               // Handle navigation if needed
//             }}
//           >
//             <BottomNavigationAction
//               label="Feed"
//               icon={<FeedIcon />}
//               component={Link}
//               to="/"
//               value="/"
//             />
//             <BottomNavigationAction
//               label="Activity"
//               icon={<FavoriteIcon />}
//               component={Link}
//               to="/activity"
//               value="/activity"
//             />
//             <BottomNavigationAction
//               label="Archive"
//               icon={<ArchiveIcon />}
//               component={Link}
//               to="/archive"
//               value="/archive"
//             />
//           </BottomNavigation>
//         </Paper>
//       </Box>
//     </div>
//   </div>
// </Router>