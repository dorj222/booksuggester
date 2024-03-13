import React from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import Button from './Button'

const SettingsModal = ({ showModal, authorYearStart, authorYearEnd, topics, handleDropdownPeriods, handleDropdownTopics, submitForm }) => (
  <Modal style={{ "marginTop": "200px" }} show={showModal}>
    <Modal.Body>
      <StyledForm>
        <DropdownWrapper>
          <Label style={{ "marginRight": "20px" }}>Literary Periods: </Label>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-periods" style={{ width: "200px" }}>
              {authorYearStart} - {authorYearEnd}
            </Dropdown.Toggle>
            <Dropdown.Menu className='font12'>
              <Dropdown.Item className='font12' onClick={() => handleDropdownPeriods(500, 1500)}>Medieval (500 - 1500)</Dropdown.Item>
              <Dropdown.Item className='font12' onClick={() => handleDropdownPeriods(1500, 1700)}>Renaissance (1500 - 1700)</Dropdown.Item>
              <Dropdown.Item className='font12' onClick={() => handleDropdownPeriods(1700, 1800)}>Enlightenment (1700 - 1800)</Dropdown.Item>
              <Dropdown.Item className='font12' onClick={() => handleDropdownPeriods(1800, 1870)}>Romantic Period (1800 - 1870)</Dropdown.Item>
              <Dropdown.Item className='font12' onClick={() => handleDropdownPeriods(1900, 1965)}>Modernism (1900 - 1965)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </DropdownWrapper>
        <DropdownWrapper>
          <Label style={{ "marginRight": "20px" }}>Topics: </Label>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-topic" style={{ width: "200px" }}>
              {topics}
            </Dropdown.Toggle>
            <Dropdown.Menu className='font12'>
              <Dropdown.Item onClick={() => handleDropdownTopics('All')} className='font12'>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownTopics('History')} className='font12'>History</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownTopics('Science')} className='font12'>Science</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownTopics('Religion')} className='font12'>Religion</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownTopics('Philosophy')} className='font12'>Philosophy</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDropdownTopics('Fiction')} className='font12'>Fiction</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </DropdownWrapper>
      </StyledForm>
      <ButtonContainer>
        <Button onClick={submitForm}>Submit</Button>
      </ButtonContainer>
    </Modal.Body>
  </Modal>
);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  flex: 1;
  width: 90%;
`;

const Label = styled.label`
  flex: 1;
`;

export default SettingsModal;