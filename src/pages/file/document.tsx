import React, { useState } from 'react';
import { Divider, Grid, Segment, Form, TextArea } from 'semantic-ui-react';
import renderHTML from 'react-html-parser';
import io from 'socket.io-client';

import renderMd from '../../utils/Markdown';
import MenuBar from './menuBar';

const Document = (props: any) => {
  const [md, setMd] = useState('');

  console.log('CACACACACA', props);
  const socket = useState(io(process.env.SERVER_URL))[0];
  if (props.idFile) {
    console.log('CONNNEECCTTTTTTTT', props.idFile);
    socket.emit('join', props.idFile);
    // socket.emit('update', props.idFile, 'envoiecacaenstring')
    socket.on('update', (cequetaenvoye: any) => {
      setMd(cequetaenvoye)
      console.log('cequetaenvoye', cequetaenvoye);
    });
  }


  const saveFile = (): void => {
  };

  return (
    <div style={{ height: '100%' }}>
      <div>{MenuBar(saveFile)}</div>
      <Segment placeholder style={{ height: '100%' }}>
        <Grid columns={2} stackable textAlign="center" style={{ height: '100%' }} stretched>
          <Divider vertical>=</Divider>

          <Grid.Row verticalAlign="middle" size="massive" stretched style={{ height: '100%' }}>
            <Grid.Column stretched style={{ height: '100%' }}>
              <Form style={{ width: '100%' }}>
                <TextArea
                  style={{ minHeight: '100%', minWidth: '100%' }}
                  placeholder="Write your markdown here"
                  onChange={(_, b) => {
                    socket.emit('update', props.idFile, b.value as string);
                    setMd(b.value as string);
                  }}
                />
              </Form>
            </Grid.Column>

            <Grid.Column stretched style={{ height: '100%' }}>
              <div style={{ textAlign: 'left', overflowY: 'scroll' }}>{renderHTML(renderMd(md))}</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Document;
