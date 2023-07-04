import axios from "axios";
import React,{useState,useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Web3 from "web3";
import Download from "../Download/Download";
import WrongNetwork from "../WrongNetwork/WrongNetwork";
import HawkersHut from "../../contracts/HawkerHut.json";
const BCurrentorders = (props) => {
    const [length, setLength] = React.useState(0);
    const [hawker, setHawker] = React.useState(props.user);
    const [NoteIns, setNoteIns] = React.useState(null);
    const [NoteIns2, setNoteIns2] = React.useState(null);
    const [per, Sper] = React.useState({ lat: 0, long: 0 });
    const {ethereum} = window;


      //////////////////////////////////////////////////////////////////////////////////////////////////////////////


      const [state, setState] = useState({
        web3: null,
        contract: null,
      });
      useEffect(() => {
        const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545");
    
        async function template() {
          const web3 = new Web3(provider);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = HawkersHut.networks[networkId];
          const contract = new web3.eth.Contract(
            HawkersHut.abi,
            deployedNetwork.address
          );
          console.log(contract);
          setState({ web3: web3, contract: contract });
        }
        provider && template();
      }, []);





      //////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
      const { contract } = state;
      const accountss = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const res=await contract.methods.hawkerId(hash).send({ from: accountss[0] });
      console.log(res);
      const va=res.events.success.returnValues[2].toString();
      alert(res.events.success.returnValues[0]+"\n Payment: "+Web3.utils.fromWei(va, "ether")+" Eth");
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
      const { contract } = state;
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
    
    const hawkerDeny = async (e,id,hash) => {
      const { contract } = state;
      const accountss = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const res=await contract.methods.cancelPayment(hash).send({ from: accountss[0] });
      console.log(res);
      const va=res.events.success.returnValues[2].toString();
      alert(res.events.success.returnValues[0]+"\n Payment to your account: "+Web3.utils.fromWei(va, "ether")+" Eth");
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

export default BCurrentorders;