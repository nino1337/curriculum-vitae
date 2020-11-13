import propTypes from 'prop-types';
import React from 'react';

import Button from '../button/Button';
import Heading from '../heading/Heading';
import * as S from './Stage.styles';

const Stage = ({ headline, buttonText, buttonLink }) => (
  <S.Stage>
    <S.StageContent>
      <Heading tag="h1">
        {headline.upfrontText}
        <S.HeadingName>{headline.name}</S.HeadingName>,
        <br />
        {headline.subsequentText}
      </Heading>
      <Button variant="stage" url={buttonLink} text={buttonText} />
    </S.StageContent>
  </S.Stage>
);

Stage.propTypes = {
  headline: propTypes.shape({
    upfrontText: propTypes.string,
    name: propTypes.string,
    subsequentText: propTypes.string,
  }).isRequired,
  buttonText: propTypes.string.isRequired,
  buttonLink: propTypes.string.isRequired,
};

export default Stage;
