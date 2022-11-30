import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Firstpage from './component/Firstpage';
import Add from './component/Add';
import View from './component/View';
import Edit from './component/Edit';
function App() {
  return (
    <div>
     <Routes>
      <Route  path="/" element={<Firstpage></Firstpage>}></Route>
      <Route  path="/Firstpage" element={<Firstpage></Firstpage>}></Route>
      <Route  path="/Add" element={<Add></Add>}></Route>
      {/* <Route  path="/View" element={<View></View>}></Route> */}
        <Route path='/View/:Viewid' element={<View></View>}></Route>
        <Route  path="/Edit" element={<Edit></Edit>}></Route>
     </Routes>
    </div>
  );
};
export default App;
