import React,{useState,useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Web3 from "web3";
import HawkersHut from "../../contracts/HawkerHut.json";
const CPastorders = (props) => {

    const [customer, setCustomer] = React.useState(props.user);
  const orderRef = React.useRef();
  const phoneRef = React.useRef();
  const amountRef = React.useRef();
  const mesRef = React.useRef();
  const [NoteIns, setNoteIns] = React.useState(null);
  const [NoteIns2, setNoteIns2] = React.useState(null);
  const [iid,setiid]=React.useState(null);
  const { ethereum } = window;
  const [ihash,setihash]=React.useState(null); /////////////////hash for payment////////////////////

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [per, Sper] = React.useState({ lat: 0, long: 0 });
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  }, []);








   /////////////////hash for payment////////////////////
   

   function handleAccountsChanged() {
    // Handle new accounts, or lack thereof.
    setCount(count+1);
  }
  React.useEffect(()=>{
    if(ethereum)
  {window.ethereum.on('accountsChanged', handleAccountsChanged);
  window.ethereum.on('chainChanged', handleAccountsChanged);}});

  const [count, setCount] = useState(0);
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





   ////////////////////////////////////////////










  function hashGenerator(){
    const length=16;
    let result="";
    const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength=characters.length;
    for(let i=0;i<length;i++)
    { 
      result+=characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
  }
  const handleOrderSubmit = async () => {
    const { contract } = state;
    ////////////////web3 connect and ask payment//////////////////////
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const Hash=hashGenerator();
    console.log(Hash);
    let vale=amountRef.current.value.toString();
    const res=await contract.methods.pay(Hash).send({value:Web3.utils.toWei(vale, "ether"), from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment: "+Web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {
      /////////////////if error or denied then cancel order///////////////
      const data={
        Hash:Hash,
        CUser: customer,
        HUser: orderRef.current.value,
        CPhone: phoneRef.current.value,
        Lat: per.lat,
        Long: per.long,
        Message: mesRef.current.value
      }
      
      if (phoneRef.current.value.length !== 10) {
        alert("Enter a valid phone no");
      } else {
        await axios.post("https://hawkerhut-back.onrender.com/api/web3/order", data);
        console.log(
          "O: " +
            orderRef.current.value +
            " P:" +
            phoneRef.current.value +
            " L:" +
            per.lat +
            " L:" +
            per.long
        );
      }
    }
  };



  const apicustomer = async () => {
    const { contract } = state;
    const options = {
      method: "GET",
      url: "https://hawkerhut-back.onrender.com/api/web3/customer",
      params: { CUser: customer },
    };
    axios
      .request(options)
      .then((response) => {
        //console.log(response.data)
        response.data.reverse();
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const apicustomerdone = async () => {
    const { contract } = state;
    const options = {
      method: "GET",
      url: "https://hawkerhut-back.onrender.com/api/web3/customerdone",
      params: { CUser: customer },
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
    apicustomer();
    apicustomerdone();
  }, [customer]);

  const customerDeny = async (e,id,hash) => {
    const { contract } = state;
    const data={
      id:id
    };
    const phash=hash;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const res=await contract.methods.cancelPayment(phash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment to your account: "+Web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {
      
      ////////////////////////web3 receive payment/////////////////////////
      ////////////////////////////////////////////////////
      console.log(data);
      await axios.post("https://hawkerhut-back.onrender.com/api/web3/customerdeny", data);
      window.location.reload();
    }
  }
  const customerAccept = async (e,id,hash) => {
    const { contract } = state;
      setiid(id);
      setihash(hash);
      onOpenModal();
  }
  const partialPayment = async () => {
    const { contract } = state;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const res=await contract.methods.partialPayment(ihash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment to your account: "+Web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    {  const data={
        id:iid,
        UserStage:"PCompleted"
      };
      ////////////WEB3 PARTIAL PAYMENT FUNCTION/////////////////////
      ////////////////////////////////////////////////////
      await axios.post("https://hawkerhut-back.onrender.com/api/web3/customeraccept", data);
      window.location.reload();}
  }
  const fullPayment = async () => {
    const { contract } = state;
    const accountss = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const res=await contract.methods.completePayment(ihash).send({ from: accountss[0] });
    console.log(res);
    const va=res.events.success.returnValues[2].toString();
    alert(res.events.success.returnValues[0]+"\n Payment transfer to hawker: "+Web3.utils.fromWei(va, "ether")+" Eth");
    if(res.events.success.returnValues[1])
    { 
      const data={
        id:iid,
        UserStage:"Completed"
      };
      /////////////////////web3 full payment function//////////////////////
      ////////////////////////////////////////
      await axios.post("https://hawkerhut-back.onrender.com/api/web3/customeraccept", data);
      window.location.reload();
    }
  }
  


  return (
    <div style={{color:"white"}}>Your past orders:
    <br />
    <br />
    <><Table striped bordered hover style={{color:"white"}}>
                <thead>
                  <tr>
                    <th>Hawker Name</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                </Table>
      {(NoteIns2 === null||NoteIns2 === []) ? (
        <div>No Past Orders</div>
      ) : 
        (
        NoteIns2.map((note, index) => {
          return (
          <div key={index}>
            <Table striped bordered hover>
                  <tr key={index}>
                    <td>{note.HUser}</td>
                    <td>{note.updatedAt}</td>
                    <td>{note.UserStage}</td>
                    <td>- 0 ETH</td>
                  </tr>;
                  </Table>
                  </div>);
          }
        ))}
    </></div>
  )
}

export default CPastorders