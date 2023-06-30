import axios from "axios";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import web3 from "web3";
import useEth from "../../contexts/EthContext/useEth"; 
import Download from "../Download/Download";
import WrongNetwork from "../WrongNetwork/WrongNetwork";

const BPastorders = (props) => {
    const [length, setLength] = React.useState(0);
  const [hawker, setHawker] = React.useState(props.user);
  const [NoteIns, setNoteIns] = React.useState(null);
  const [NoteIns2, setNoteIns2] = React.useState(null);
  const [per, Sper] = React.useState({ lat: 0, long: 0 });
  const {ethereum} = window;
  const { state: { contract, accounts } } = useEth();
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  }, []);
  React.useEffect(() => {
    if (hawker === null || hawker === "") {
      window.location.replace("http://localhost:3000/Business");
    }
  }, [hawker]);

  const apihawker = async () => {
    const options = {
      method: "GET",
      url: "https://hawkerhut-back.onrender.com/api/web3/hawker",
      params: { HUser: hawker },
    };
    axios
      .request(options)
      .then((response) => {
        console.log(response.data)
        setLength(response.data.length);
        response.data.reverse();
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const apihawkerdone = async () => {
    const options = {
      method: "GET",
      url: "https://hawkerhut-back.onrender.com/api/web3/hawkerdone",
      params: { HUser: hawker },
    };
    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        response.data.reverse();
        setNoteIns2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    apihawker();
    apihawkerdone();
  }, [hawker]);

  const hawkerAccept = async (e,id,hash) => {
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const res=await contract.methods.hawkerId(hash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment: "+web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {  
      const data={
        id:id
      };///WEB3 CONNECT FUNCTION///////////////////////////////////////
      console.log(data);
      await axios.post("https://hawkerhut-back.onrender.com/api/web3/hawkeraccept", data);
      window.location.reload();
    }
  }
  const hawkerReach = async (e,id,lat,long,hash) => {
    //console.log(id);
    const data={
      id:id
    };
    console.log(data);
    //const a=true;
    //////////////////////////ADD CIRCLE CONDITION HERE !!!!!!!!!!!!!!!!!!!!
    if((Math.abs(lat-per.lat)>0.03)||(Math.abs(long-per.long)>0.03)) //ADD CIRCLE CONDITION HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      alert("Reach near the customer");
    else
    {   
        await axios.post("https://hawkerhut-back.onrender.com/api/web3/hawkerreach", data);
        window.location.reload();
    }
  }
  const hawkerReceive = async (e,id,hash) => {
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    ///WEB3 RECEIVE FUNCTION///////////////////////////////////////
    const res=await contract.methods.hawker_withdraw(hash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment to your account: "+web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {
      //console.log(id);
        const data={
          id:id
        };  
        console.log(data);
        await axios.post("https://hawkerhut-back.onrender.com/api/web3/hawkerreceive", data);
        window.location.reload();
    }
  }
  const hawkerDeny = async (e,id,hash) => {
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const res=await contract.methods.cancelPayment(hash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment to your account: "+web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {
      const data={
        id:id
      };
      console.log(data);
      await axios.post("https://hawkerhut-back.onrender.com/api/web3/hawkerdeny", data);
      window.location.reload();
    }
  }
  const { state } = useEth();
  const [download, setDownload] = React.useState(false);
  React.useEffect(() => {
    if(ethereum)
    {
      setDownload(true);
    }
  });
  return (
    <div style={{color:"white"}}>
    {(download)?<>
    Your past orders:
      {(!state.contract)? <WrongNetwork />:<></>}
    <br />
    <br />
    <div><Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                </Table>
      {(NoteIns2 === null ||NoteIns2 === []) ? (
        <div>No Past Orders</div>
      ) : 
        (
        NoteIns2.map((note, index) => {
          return (
          <div key={index}>
            <Table striped bordered hover>
                  <tr key={index}>
                    <td>{note.CUser}</td>
                    <td>{note.updatedAt}</td>
                    <td>{(note.HawkerStage==="Success")?
                      <Button variant="success"  onClick={event => hawkerReceive(event,note._id,note.Hash)}> Receive</Button>:
                      <>{note.HawkerStage}</>}</td>
                    <td>INR 0</td>
                  </tr>;
                  </Table>
                  </div>);
          }
        ))}
    </div></>:<><Download /></>}</div>
  )
}

export default BPastorders