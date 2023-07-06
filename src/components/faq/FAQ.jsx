import React from 'react';
import "./FAQ.css";
import { Accordion } from 'react-bootstrap';

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="faq">
        <p>Frequently Asked Questions</p>
      </div>
      <div className="faq-tab-container">
        <div className="faq-left">
        <Accordion>
              <Accordion.Item eventKey="0" className="acc">
                <Accordion.Header>Head 1</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="acc">
                <Accordion.Header>Head 2</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="acc">
                <Accordion.Header>Head 3</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className="acc">
                <Accordion.Header>Head 4</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

        </Accordion>
        </div>
        <div className="faq-right">
              <Accordion>
              <Accordion.Item eventKey="4" className="acc">
                <Accordion.Header>Head 1</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5" className="acc">
                <Accordion.Header>Head 2</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6" className="acc">
                <Accordion.Header>Head 3</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="7" className="acc">
                <Accordion.Header>Head 4</Accordion.Header>
                <Accordion.Body>Lorem ipsump blah blah blah blah .</Accordion.Body>
              </Accordion.Item>

              </Accordion>
        </div>
      </div>
    </div>
  )
}

export default FAQ;