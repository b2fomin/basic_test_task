import Sidebar from "./SideBar";
import { styled } from '@mui/material/styles';

import Table from './Table';
import Box from '@mui/material/Box';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import PerPageSlider from './slider';
import * as React from 'react';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer({model}) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [perPage, setPerPage] = React.useState(Number(query.get('per_page')) || '1');
  const page = Number(query.get('page') || '1');

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar model={model}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <PerPageSlider perPage={perPage} setPerPage={setPerPage} min={0} max={100} step={10}/>
        <Table page={page} perPage={perPage} model={model}/>
      </Box>
    </Box>
  );
}


if (document.getElementById('example')) {
  const Index = ReactDOM.createRoot(document.getElementById("example"));
  Index.render(
      <React.StrictMode>
        <BrowserRouter basename="operations">
        <Routes >
        <Route path="/" element={<MiniDrawer model="operations"/>}></Route>
        </Routes>
        </BrowserRouter>
        
        <BrowserRouter basename="sub_operations">
        <Routes >
        <Route path="/" element={<MiniDrawer model="sub_operations"/>}></Route>
        </Routes>
        </BrowserRouter>
      </React.StrictMode>
  );
};
