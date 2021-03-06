import React from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import styles from './styles';
import ItemsCard from '../ItemsCard/ItemsCard';

const ProfileCard = ({ classes, profile, viewer }) => {
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.userInfo}>
            <Avatar className={classes.avatar}>
              <Gravatar email={profile.email} />
            </Avatar>
            <Typography className={classes.fullname}>
              {profile.fullname}
            </Typography>
          </div>

          <div>
            <Typography className={classes.numOfItems} component="h1">
              <span className={classes.bold}>{profile.items.length}</span> Items
              shared{' '}
              <span className={classes.bold}>{profile.borrowed.length}</span>{' '}
              Items borrowed
            </Typography>
            {profile.bio === null ? (
              <Typography className={classes.bioNull}>
                "No bio provided."
              </Typography>
            ) : (
              <Typography className={classes.bio}>"{profile.bio}"</Typography>
            )}
          </div>
        </CardContent>
      </Card>

      <Typography className={classes.profileGridTitle} component="h1">
        Shared Items
      </Typography>

      <Grid container className={classes.flexGrid} spacing={24}>
        {profile.items.map(item => {
          return (
            <Grid
              key={item.id}
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.gridItem}
            >
              <ItemsCard item={item} profile={profile} viewer={viewer} />
            </Grid>
          );
        })}
      </Grid>

      {profile.borrowed.id && (
        <Typography className={classes.profileGridTitle} component="h1">
          Borrowed Items
        </Typography>
      )}
      <Grid container className={classes.flexGrid} spacing={24}>
        {profile.borrowed.map(item => {
          return (
            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <ItemsCard
                key={item.id}
                item={item}
                profile={profile}
                viewer={viewer}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    bio: PropTypes.string,
    email: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
};

ProfileCard.defaultProps = {
  profile: {
    bio: '"No bio provided."',
    email: '',
    items: []
  }
};

export default withStyles(styles)(ProfileCard);
