import React from 'react';
import Box from '@mui/material/Box';
import ArchiveIcon from '@mui/icons-material/Archive';
import List from '@mui/material/List';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import CallIcon from '@mui/icons-material/Call';

const Feed = (props) => {
    const { tabIndex, index, calls, singleCallClicked, fetchCallsData } = props;

    const arhieveButtonClicked = async (event, id) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('whole clicked', id)
        const updatedData = {
            is_archived: true
        }
        try {
            const response = await fetch(`https://aircall-backend.onrender.com/activities/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(updatedData),
            });

            fetchCallsData();
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
        }
    };

    return (
        <div role="tabpanel"
            hidden={tabIndex !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}>
            <Box>
                {calls && calls.length ? (
                    <>
                        <label style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>Activity Feed</label>

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {calls && calls.map(item => (
                                <ListItem key={item.id} button onClick={() => singleCallClicked(item.id)} sx={{
                                    borderRadius: '10px', 
                                    border: '1px solid #ccc', 
                                    padding: '10px', 
                                    marginTop: '5px', 
                                }}
                                    secondaryAction={
                                        <div >
                                            <ArchiveIcon
                                            sx={{marginRight:2}}
                                                edge="end"
                                                color="primary"
                                                onClick={(event) => arhieveButtonClicked(event, item.id)}
                                            />
                                            <CallIcon
                                             edge="end"
                                                color="primary"
                                            />
                                        </div>
                                    }>
                                    <ListItemAvatar>
                                        {item.direction == "inbound" ? <PhoneCallbackIcon color="success" /> : <PhoneForwardedIcon color="primary" />}
                                    </ListItemAvatar>
                                    <ListItemText primary={item.from} secondary={item.call_type} />
                                </ListItem>
                            ))}</List>
                    </>
                ) : (
                    <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 50 }}>No active calls.</p>
                )}
            </Box>
        </div>
    )
}

export default Feed;

