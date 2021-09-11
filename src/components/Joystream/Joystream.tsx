import React from 'react';
import {useState, useEffect} from 'react';
import styles from './Joystream.module.css';
import { WsProvider, ApiPromise } from "@polkadot/api";
import { types } from "@joystream/types";

const wsLocation = 'wss://rome-rpc-endpoint.joystream.org:9944'
const provider = new WsProvider(wsLocation)

const Joystream = () => {

  const [lastBlock, updateLastBlock] = useState(0)
  const [connected, updateConnected] = useState(false)

  useEffect(() => {
    ApiPromise.create({ provider, types }).then((api) =>
      api.isReady.then(() => {
          console.log(`Connected to ${wsLocation}`);
          api.rpc.chain.subscribeNewHeads((header) => {
            console.log(`Chain is at block: #${header.number}`);
            
            if(!connected) {
              updateConnected(true);
            }

            if(header.number.toNumber() !== lastBlock) {
             updateLastBlock(header.number.toNumber());
            }
          })
      })
    );
  }, [lastBlock, connected]);

  return (
    <div className={styles.Joystream} data-testid="Joystream">
      {!connected? 'Connecting to blockchain...' : 
      `Connected! Latest block is: ${lastBlock.toLocaleString()}`}
    </div>
  )
};

export default Joystream;
