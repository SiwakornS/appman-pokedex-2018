import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';

import SearchModal from './containers/SearchModal';
import AppContainer from './AppContainer';
import {
  calculateDamage, calculateHappiness, calculateHP, calculateWeakness,
} from './utils/formulas';
import StickyButton from './components/StickyButton';


import Card from './containers/Card';
import CenterColumns from './components/CenterColumns';


const App = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [cards, setCards] = useState([]);


  const getCards = async (searchType = 'name', query = '', selectedCardIds = []) => {
    const options = {
      params: {
        limit: 99,
      },
    };

    if (query) {
      options.params[searchType] = query;
    }

    const response = await axios.get('http://localhost:3030/api/cards', options);

    // eslint-disable-next-line max-len
    const formatedCards = response.data.cards
      .filter((card) => {
        if (selectedCardIds.length === 0) {
          return true;
        }
        return selectedCardIds.every(selectedCard => card.id !== selectedCard);
      }).map((card) => {
        const calculatedHp = calculateHP(card.hp);
        card.hp = (typeof calculatedHp === 'number') ? calculatedHp : 0;
        card.weakness = calculateWeakness(card.weaknesses);
        card.damage = calculateDamage(card.attacks);
        card.happiness = calculateHappiness(card.hp, card.damage, card.weakness);
        card.level = 4;
        card.strength = 0;
        return card;
      });
    setCards(formatedCards);
  };

  const handleAddCard = (id) => {
    const newCard = cards.filter(card => card.id === id);
    const remainingCards = cards.filter(card => card.id !== id);
    selectedCards.push(newCard[0]);
    setSelectedCards(selectedCards);
    setCards(remainingCards);
  };

  const handleRemoveCard = (id) => {
    const removed = selectedCards.filter(card => card.id !== id);
    setSelectedCards(removed);
  };

  useEffect(() => {
    const selectedCardIds = selectedCards.map(card => card.id);

    getCards(searchType, query, selectedCardIds);
  }, [query, searchType]);

  const handleCloseModal = () => {
    setQuery('');
    setIsShowModal(false);
  };

  return (
    <AppContainer>
      <SearchModal
        cards={cards}
        handleCloseModal={handleCloseModal}
        handleAddCard={handleAddCard}
        searchType={searchType}
        setSearchType={setSearchType}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        query={query}
        setQuery={setQuery}
      />

      <Columns>
        <Columns.Column className="has-text-centered">
          <br />
          <Heading>My Pokédex</Heading>
        </Columns.Column>
      </Columns>

      {selectedCards && (
        <Columns className="is-marginless">
          { selectedCards.map(card => (
            <Columns.Column size={6} key={card.id}>
              <Card
                imgUrl={card.imageUrlHiRes}
                hp={card.hp}
                strength={card.strength}
                weakness={card.weakness}
                level={card.level}
                name={card.name}
                mode="remove"
                onClick={() => handleRemoveCard(card.id)}
              />
            </Columns.Column>
          ))}
        </Columns>
      )}

      {selectedCards <= 0 && (
        <CenterColumns height="72%">
          <Columns.Column size={12}>
            <Heading className="has-text-centered">
                You don't have any Pokémon
            </Heading>
          </Columns.Column>
        </CenterColumns>
      )}

      <StickyButton color="danger" className="fas fa-heading is-size-4" fullwidth onClick={() => setIsShowModal(true)}>
        <span className="fas has-text-weight-bold is-size-4">Add</span>
      </StickyButton>
    </AppContainer>
  );
};
export default App;
