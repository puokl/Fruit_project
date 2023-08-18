import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateFruit from "./components/Fruit/Fruit";
import CreateUser from "./components/User/User";
import Missing from "./pages/Missign";
import Test from "./pages/Test";
import Unauthorized from "./pages/Unathorized";
import Layout from "./components/Layout";
import PreInspection from "./components/PreInspection/PreInspection";
import QcInspection from "./components/QcInspection/QcInspection";
import Tableau from "./pages/Tableau";
import Tab from "./pages/Tab";
import Inspect from "./pages/Inspect";
import GetAll from "./pages/GetAll";
import GetOne from "./pages/GetOne";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* public routes */}
        <Route path="user" element={<CreateUser />} />
        <Route path="inspection" element={<Inspect />} />
        <Route path="preinspection" element={<PreInspection />} />
        <Route path="qcinspection" element={<QcInspection />} />
        <Route path="fruit" element={<CreateFruit />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="test" element={<Test />} />
        <Route path="tableau" element={<Tableau />} />
        <Route path="tab" element={<Tab />} />
        <Route path="getall" element={<GetAll />} />{" "}
        <Route path="getone" element={<GetOne />} />
        {/* protected routes */}
        {/* <Route path="user" element={<User />} /> */}
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
