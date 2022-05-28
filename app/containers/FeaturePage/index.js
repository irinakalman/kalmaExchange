/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import ListItemTitle from './ListItemTitle';
import { string } from 'prop-types';

export default function FeaturePage() {
  let inputEuro;
  const activateLasers = () => {
    inputEuro = document.querySelector('#euro').value;
    inputEuro = parseFloat(inputEuro); // convert to float
    if (parseFloat(inputEuro) > 0 && parseFloat(inputEuro).isNaN !== true) {
      document.querySelector('#bitcoin').innerText = inputEuro * 0.000037;
      document.querySelector('#ethereum').innerText = inputEuro * 0.00060042;
      document.querySelector('#rubli').innerText = inputEuro * 70.56;
      document.querySelector('#usd').innerText = inputEuro * 1.07;
      document.querySelector('#inputEu').innerText = 'Doing good';
    } else if (document.querySelector('#euro').value.length == 0) {
      document.querySelector('#inputEu').innerText = 'Please enter a number';
    } else {
      document.querySelector('#inputEu').innerText =
        'Invalid input, please enter a number';
      console.log('Activating Lasers');
    }
  };
  return (
    <div>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <label>
        Type the value in euros : <br />
        <input onChange={activateLasers} type="text" id="euro" />{' '}
        <span id="inputEu" />
      </label>
      <br />
      <span>Bitcoin</span> <span id="bitcoin" />
      <br />
      <span>Ethereum</span> <span id="ethereum" />
      <br />
      <span>Rubli</span> <span id="rubli" />
      <br />
      <span>USD</span> <span id="usd" />
      {/* <button onClick={activateLasers}>Activate Lasers</button> */}
    </div>
  );
}
