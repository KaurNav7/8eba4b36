import * as React from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

const  NavigationBottom = (props) => {  
    const { tab,dialogOpen,handleTabChange,fetchCallsData}=props

    const unArchiveAll = async () => {
        try {
          const response = await fetch(`https://aircall-backend.onrender.com/reset/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to archive all items');
          }
    
          fetchCallsData(); // Fetch data after successful archiveAll operation
        } catch (error) {
          console.error('Error archiving all items:', error);
        }
      }
  
    return (
        <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={0}>
        <hr></hr>
        <Box sx={{ position: 'relative', textAlign: 'center' }}>
          <Box sx={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
            <span >
              {
                tab == 0 &&
                <Tooltip title="Archive all" placement="top">
                  <Fab color="primary" aria-label="Archive all" onClick={() => dialogOpen()}>
                    <ArchiveIcon />
                  </Fab></Tooltip>
              }
              {tab == 1 &&
                <Tooltip title="Unarchive all" placement="top">
                  <Fab color="primary" aria-label="Unarchive all" onClick={() => unArchiveAll()}>
                    <UnarchiveIcon />
                  </Fab>
                </Tooltip>
              }
            </span>
          </Box>
          <BottomNavigation showLabels tab={tab} onChange={handleTabChange}>
            <BottomNavigationAction label="Feed" icon={<FeedIcon />} />
            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Box>
      </Paper>
    );
  };
  
  export default NavigationBottom;