
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';

import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React from 'react';

import {
  Label, Control, Input, Field, Select,
} from 'react-bulma-components/lib/components/form';

import CardColumns from '../../components/CardColumns';
import InputIcon from '../../components/InputIcon';
import SearchImg from '../../images/search.png';

import Card from '../Card';
import CenterColumns from '../../components/CenterColumns';

const customStyles = {
  content: {
    width: 752,
    height: 620,
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const SearchModal = ({
  isShowModal, handleCloseModal, searchType, setSearchType, query, setQuery, handleAddCard, cards,
}) => (
  <Modal
    // eslint-disable-next-line react/jsx-boolean-value
    shouldCloseOnOverlayClick={true}
    isOpen={isShowModal}
    contentLabel="Search Pokédex"
    style={customStyles}
    onRequestClose={() => handleCloseModal()}
  >
    <Columns>
      <Columns.Column size={9}>
        <Field>
          <Label>Search</Label>
          <Control iconLeft>
            <Input type="text" placeholder="Find your pokèmon" onChange={event => setQuery(event.target.value)} value={query} />
            <InputIcon size={24} src={SearchImg} />
          </Control>
        </Field>

      </Columns.Column>
      <Columns.Column>
        <Label>Type</Label>
        <Control>
          <Select
            onChange={event => setSearchType(event.target.value)}
            value={searchType}
          >
            <option value="name">Name</option>
            <option value="type">Type</option>
          </Select>
        </Control>
      </Columns.Column>

    </Columns>
    <Columns>
      <Columns.Column>
        <CardColumns className="is-marginless">
          {cards && cards.map(card => (
            <Columns.Column size={12} key={card.id}>
              <Card
                imgUrl={card.imageUrlHiRes}
                name={card.name}
                mode="add"
                hp={card.hp}
                strength={card.strength}
                weakness={card.weakness}
                level={card.level}
                onClick={() => handleAddCard(card.id)}
              />
            </Columns.Column>
          ))}
        </CardColumns>
      </Columns.Column>
    </Columns>

    {cards <= 0 && (
    <CenterColumns height="42%">
      <Columns.Column size={12}>
        <Heading className="has-text-centered">
          Not found
        </Heading>
      </Columns.Column>
    </CenterColumns>
    )}
  </Modal>
);

SearchModal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  searchType: PropTypes.string.isRequired,
  setSearchType: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleAddCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default SearchModal;
