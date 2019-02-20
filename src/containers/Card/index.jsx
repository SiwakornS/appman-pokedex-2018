import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Progress from 'react-bulma-components/lib/components/progress';
import PropTypes from 'prop-types';
import React from 'react';
import shortid from 'shortid';
import times from 'lodash/times';
import LevelIcon from './components/level';
import CardContainer from './container';

import happyIcon from '../../images/cute.png';

const Card = ({
  imgUrl, name, onClick, mode, hp, strength, weakness, level,
}) => (
  <CardContainer>
    <Columns>
      <Columns.Column>
        <Image src={imgUrl} />
      </Columns.Column>
      <Columns.Column>
        <Heading subtitle size={4}>{name}</Heading>
        <Columns>
          <Columns.Column>HP</Columns.Column>
          <Columns.Column size={7}>
            <Progress max={100} value={hp} color="info" />
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column>STR</Columns.Column>
          <Columns.Column size={7}>
            <Progress max={100} value={strength} color="info" />
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column>WEAK</Columns.Column>
          <Columns.Column size={7}>
            <Progress max={100} value={weakness} color="info" />
          </Columns.Column>
        </Columns>
        <Columns>
          <Columns.Column>
            {
               times(level, null).map(() => <LevelIcon key={shortid.generate()} src={happyIcon} size={32} />)
            }
          </Columns.Column>
        </Columns>

        { mode === 'add' && (
          <Columns className="has-text-centered">
            <Columns.Column>
              <Button color="primary" onClick={onClick}>Add</Button>
            </Columns.Column>
          </Columns>
        )}

        { mode === 'remove' && (
          <Columns className="has-text-centered">
            <Columns.Column>
              <Button color="danger" onClick={onClick}>Remove</Button>
            </Columns.Column>
          </Columns>
        )}
      </Columns.Column>
    </Columns>
  </CardContainer>
);

Card.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  hp: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  weakness: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};

export default Card;
