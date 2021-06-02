import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ListItem, ListItemText } from '@material-ui/core';
import classnames from 'classnames';
import styles from './styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles);

const NavItem = ({ active, to, title }) => {
  const classes = useStyles();

  let history = useHistory();

  const handleNav = (to) => {
    history.push(to);
  };
  
  return (
    <ListItem
      button
      className={classnames({
        [classes.navItem]: true,
        [classes.activeListItem]: active
      })}
      component="a"
      onClick={() => handleNav(to)}
    >
      <ListItemText classes={{ primary: classes.listItemText }} primary={title} />
    </ListItem>
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  to: PropTypes.string,
  title: PropTypes.string
};

export default NavItem;
