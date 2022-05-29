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
    // Simple GET request using fetch
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=btc%2Ceth%2Ceur%2Crub&include_last_updated_at=true',
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        inputEuro = document.querySelector('#euro').value;
        inputEuro = parseFloat(inputEuro) * (1 / data.usd.eur); // convert to float
        console.log(inputEuro);
        if (parseFloat(inputEuro) > 0 && parseFloat(inputEuro).isNaN !== true) {
          document.querySelector('#bitcoin').innerText =
            inputEuro * data.usd.btc;

          document.querySelector('#ethereum').innerText =
            inputEuro * data.usd.eth;
          document.querySelector('#rubli').innerText = inputEuro * data.usd.rub;
          document.querySelector('#usd').innerText = inputEuro;
          const localData = new Date(data.usd.last_updated_at).toLocaleTimeString("en-US");
          document.querySelector('#updatedPrice').innerText = `${localData} in GMT`; // last updated
          document.querySelector('#inputEu').innerText = 'Doing good';
        } else if (document.querySelector('#euro').value.length == 0) {
          document.querySelector('#inputEu').innerText =
            'Please enter a number';
        } else {
          document.querySelector('#inputEu').innerText =
            'Invalid input, please enter a number';
          console.log('Activating Lasers');
        }
      });
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
      <br />
      <span>Last Prices updated at</span> <span id="updatedPrice" />
      <br />
      {/* <button onClick={activateLasers}>Activate Lasers</button> */}
    </div>
  );
}
