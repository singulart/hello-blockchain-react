import React from "react";
import { useState, useEffect } from "react";
import styles from "./Joystream.module.css";
import { WsProvider, ApiPromise } from "@polkadot/api";
import { types } from "@joystream/types";
import { CSSTransition } from "react-transition-group";

const wsLocation = "wss://rome-rpc-endpoint.joystream.org:9944";

const provider = new WsProvider(wsLocation);

const Joystream = () => {
  const [lastBlock, updateLastBlock] = useState(0);
  const [connected, updateConnected] = useState(false);
  const [blockShown, updateBlockShown] = useState(false);

  useEffect(() => {
    if (!connected) {
      ApiPromise.create({ provider, types }).then((api) =>
        api.isReady.then(() => {
          console.log(`Connected to ${wsLocation}`);
          api.rpc.chain.subscribeNewHeads((header) => {
            console.log(`Chain is at block: #${header.number}`);

            if(!connected) {
              updateConnected(true);
            }

            if (header.number.toNumber() !== lastBlock) {
              updateBlockShown(false);

              updateLastBlock(header.number.toNumber());

              updateBlockShown(true);
            }
          });
        })
      );
    }
  }, [
    lastBlock,
    connected,
    blockShown,
    updateBlockShown,
    updateConnected,
    updateLastBlock,
  ]);

  return (
    <div className={styles.Joystream} data-testid="Joystream">
      {!connected ? (
        <div>Connecting to blockchain...</div>
      ) : (
        <>
          <div>Connected! Latest block is: </div>
          <CSSTransition
            in={blockShown}
            classNames={{
              enterActive: styles.blockHeightEnterActive,
              enter: styles.blockHeightEnter,
              exitActive: styles.blockHeightExitActive,
              exit: styles.blockHeightExit,
            }}
            addEndListener={() => {
              updateBlockShown(true);
            }}
          >
            <h1>{lastBlock.toLocaleString()}</h1>
          </CSSTransition>
        </>
      )}
    </div>
  );
};

export default Joystream;
