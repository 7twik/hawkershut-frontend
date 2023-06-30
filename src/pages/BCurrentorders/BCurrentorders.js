import axios from "axios";
import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import web3 from "web3";
import useEth from "../../contexts/EthContext/useEth"; 
import Download from "../Download/Download";
import WrongNetwork from "../WrongNetwork/WrongNetwork";

const BCurrentorders = (props) => {
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
    // const hawkerReceive = async (e,id,hash) => {
    //   const accountss = await ethereum.request({
    //     method: 'eth_requestAccounts',
    //   });
    //   ///WEB3 RECEIVE FUNCTION///////////////////////////////////////
    //   const res=await contract.methods.hawker_withdraw(hash).send({ from: accountss[0] });
    //   console.log(res);
    //   const va=res.events.success.returnValues[2].toString();
    //   alert(res.events.success.returnValues[0]+"\n Payment to your account: "+web3.utils.fromWei(va, "ether")+" Eth");
    //   if(res.events.success.returnValues[1])
    //   {
    //     //console.log(id);
    //       const data={
    //         id:id
    //       };  
    //       console.log(data);
    //       await axios.post("https://hawkerhut-back.onrender.com/api/web3/hawkerreceive", data);
    //       window.location.reload();
    //   }
    // }
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
        Your orders:
          <br />
          <br />
          {(!state.contract)? <WrongNetwork />:<></>}
          <div>
            {(NoteIns === null || NoteIns === []) ? (
              <div>No Orders Currently</div>
            ) : (
              NoteIns.map((note, index) => {
                return <div key={index}>
                  <Table striped bordered hover style={{color:"white"}}>
                      <thead>
                        <tr>
                          <th>Customer Name</th>
                          <th>Loc</th>
                          <th>Requirement/message</th>
                          <th>Time</th>
                          <th>Accept</th>
                          <th>Deny</th>
                        </tr>
                      </thead>
                      <tbody style={{color:"white"}}>
                        <tr style={{color:"white"}}>
                          <td style={{color:"white"}}>{note.CUser}</td>
                          <td style={{color:"white"}}>lat:{note.Lat} | long:{note.Long}</td>
                          <td style={{color:"white"}}>{note.Message}</td>
                          <td style={{color:"white"}}>{note.updatedAt}</td>
                          <td style={{color:"white"}}>{(note.HawkerStage==="Waiting")?
                            <Button variant="success" onClick={event => hawkerAccept(event,note._id,note.Hash)}>Accept</Button>:
                            (note.HawkerStage==="Accepted")?
                            <Button variant="success"  onClick={event => hawkerReach(event,note._id,note.Lat,note.Long,note.Hash)}> Reached</Button>:
                            (note.HawkerStage==="Reached")?
                            <>Please contact {note.CPhone}</>:
                            <></>
                            }
                          </td>
                          <td style={{color:"white"}}><Button variant="danger" onClick={event =>hawkerDeny(event,note._id,note.Hash)}>Cancel</Button>{' '}</td>
                        </tr>
                      </tbody>
                    </Table>
                </div>;
              })
            )}
          </div>
          </>:<><Download /></>}
    </div>
  )
}

export default BCurrentorders