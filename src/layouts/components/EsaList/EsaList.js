import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';

// Component styles
const styles = theme => {
  return {
    root: {
      borderRadius: '4px',
      maxWidth: '100%',
      border: 0,
      boxShadow: '0 10px 40px 0 rgba(16, 36, 94, 0.2)'
    },
    squared: {
      borderRadius: 0
    },
    outlined: {
      border: `1px solid ${theme.palette.border}`
    },
    listItem: {
        cursor: 'pointer',
        justifyContent: ' space-between',
        '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
          backgroundColor: 'rgba(41, 150, 243, .3)'
        },
        '&:hover, &.Mui-selected,&.Mui-selected:hover': {
          backgroundColor: theme.palette.default.light
        },
        '&::selection': { backgroundColor: 'transparent' }
      }
  };
};

const EsaList = props => {
  const { classes, handleSelect, elements, isSelected,  ...rest } = props;

  const rootClassName = classNames(
    classes.listItem
  );

  return (
    <>
    <List>
    {elements.map(
      option => (
        <ListItem
          key={option}
          className={rootClassName}
          selected={isSelected(option)}
          onClick={() => handleSelect(option)}
        >
          <ListItemText primary={`item-${option}`} />
        </ListItem>
      )
    )}
  </List>
  </>
  );
};

EsaList.propTypes = {
  classes: PropTypes.object.isRequired,
  elements: PropTypes.array,
  isSelected: PropTypes.func,
  handleSelect: PropTypes.func
};

EsaList.defaultProps = {
};

export default withStyles(styles)(EsaList);
