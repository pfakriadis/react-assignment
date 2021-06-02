import React, { useState } from 'react';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { makeStyles, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  EsaButton,
} from '../layouts/components';
import { useWell } from '../hooks/useWell';
import { useLog } from '../hooks/useLog';
import { useFormation } from '../hooks/useFormation';
import { usePlot } from '../hooks/usePlot';
import Plot from 'react-plotly.js';
import EsaSelect from '../layouts/components/EsaSelect/EsaSelect';
import EsaPaper from '../layouts/components/EsaPaper/EsaPaper';
import { useDispatch, useSelector } from 'react-redux';
import { setAction } from '../store/actions/actions';
import * as types from '../store/types';


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullHeight: { height: '100%' },
  paper: {
    padding: theme.spacing(3)
  },
  button: { marginTop: theme.spacing(3) },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 800
    }
  },
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
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
});
const useStyles = makeStyles(styles);

export default function Histogram() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector(setAction);
  
  const {wells} = useWell();
  const {logs} = useLog();
  const {formations} = useFormation();
  const {plots} = usePlot();


  const [selectedWells, setSelectedWells] = useState(store.state.payload?.wells ? store.state.payload?.wells : []);
  const [selectedLogs, setSelectedLogs] = useState(store.state.payload?.logs ? store.state.payload?.logs : []);
  const [selectedFormations, setSelectedFormations] = useState(store.state.payload?.formations ? store.state.payload?.formations : []);
  const [selectedPlots, setSelectedPlots] = useState([]);
  const [barValue, onChangeBarValue] = useState(1);
  const [orientationValue, onChangeOrientationValue] = useState(1);

  const handleSelectWell = value => {
    const currentIndex = selectedWells.indexOf(value);
    const newSelectedOptions = [...selectedWells];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectedWells(newSelectedOptions);
  };

  const isSelectedWell = value => selectedWells.includes(value);

  const handleSelectLog = value => {
    const currentIndex = selectedLogs.indexOf(value);
    const newSelectedOptions = [...selectedLogs];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectedLogs(newSelectedOptions);
  };

  const isSelectedLog = value => selectedLogs.includes(value);

  const handleSelectFormation = value => {
    const currentIndex = selectedFormations.indexOf(value);
    const newSelectedOptions = [...selectedFormations];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectedFormations(newSelectedOptions);
  };

  const isSelectedFormation = value => selectedFormations.includes(value);

  const isDisabled = () => !(selectedWells.length > 0 && selectedLogs.length > 0 && selectedFormations.length > 0);
  

  const handleClick = () => {
    const plotFiltered = plots.filter(plot => selectedWells.includes(plot.wellId));
    let plotUpdatedArray = [];

    plotFiltered.forEach(plot => {
      let plotUpdated = {};
      plotUpdated.type = 'histogram';
      plotUpdated.orientation = orientationValue === 1 ? 'v' : 'h';
      plotUpdated.x = plot.x;
      plotUpdated.y = plot.y;
      plotUpdatedArray.push(plotUpdated);
    });
    setSelectedPlots(plotUpdatedArray);
    dispatch({ type: types.ACTIONS, payload: {wells: selectedWells, logs: selectedLogs, formations: selectedFormations} });
  };

  const handleChangeOrientation = (value) => {
    let plotUpdatedArray = [...selectedPlots];

    plotUpdatedArray.forEach(plot => {
      plot.orientation = value === 1 ? 'v' : 'h';
    });
    onChangeOrientationValue(value);
    setSelectedPlots(plotUpdatedArray);
  };

  return (
    <Dashboard>
      <Grid container spacing={1} className={classes.fullHeight}>
        <Grid item xs={12} md={7} container spacing={2}>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <EsaPaper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <EsaSelect
                          label="Bar Mode"
                          value={barValue}
                          options={[
                            { key: 'stack', value: 1, text: 'stack' },
                            { key: 'group', value: 2, text: 'group' }
                          ]}
                          onChange={value => onChangeBarValue(value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <EsaSelect
                          label="Orientation"
                          value={orientationValue}
                          options={[
                            { key: 'vertical', value: 1, text: 'vertical' },
                            { key: 'horizontal', value: 2, text: 'horizontal' }
                          ]}
                          onChange={value => handleChangeOrientation(value)}
                        />
                      </Grid>
                    </Grid>
              </EsaPaper>
            </Grid>
          </Grid>
          <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Wells" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                <List>
                  {wells.map(
                    well => (
                      <ListItem
                        key={well.id}
                        className={classes.listItem}
                        selected={isSelectedWell(well.id)}
                        onClick={() => handleSelectWell(well.id)}
                      >
                        <ListItemText primary={`${well.name}`} />
                      </ListItem>
                    )
                  )}
                </List>
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Logs" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                  <List>
                    {logs.map(
                      log => (
                        <ListItem
                          key={log.id}
                          className={classes.listItem}
                          selected={isSelectedLog(log.id)}
                          onClick={() => handleSelectLog(log.id)}
                        >
                          <ListItemText primary={`${log.log}`} />
                        </ListItem>
                      )
                    )}
                  </List>
                </PortletContent>
              </Portlet>
            </Grid>
            <Grid item xs={4}>
              <Portlet>
                <PortletHeader className={classes.header}>
                  <PortletLabel title="Formations" />
                </PortletHeader>
                <PortletContent className={classes.portletContent} noPadding>
                  <List>
                      {formations.map(
                        formation => (
                          <ListItem
                            key={formation.id}
                            className={classes.listItem}
                            selected={isSelectedFormation(formation.id)}
                            onClick={() => handleSelectFormation(formation.id)}
                          >
                            <ListItemText primary={`${formation.name}`} />
                          </ListItem>
                        )
                      )}
                    </List>
                </PortletContent>
              </Portlet>
              <EsaButton fullWidth className={classes.button} isDisabled={isDisabled()} handleClick={handleClick}>
                    Show Plot
              </EsaButton>
            </Grid>
        </Grid>
        <Grid item xs={12} md={5} container spacing={0}>
          <Plot
            data={selectedPlots}
            layout={ {width: "60%", height: "100%", barmode: barValue === 1 ? 'stack' : 'group',
             legend:{orientation: orientationValue === 1 ? 'v' : 'h'}} }
          />
        </Grid>
      </Grid>
    </Dashboard>
  );
}
