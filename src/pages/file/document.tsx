import React, { useState, useEffect } from 'react';
import { Divider, Grid, Segment, Form, TextArea } from 'semantic-ui-react';
import renderHTML from 'react-html-parser';
import io from 'socket.io-client';

import renderMd from '../../utils/Markdown';
import MenuBar from './menuBar';

const Document = (props: any) => {
  const [md, setMd] = useState('');
  const { idFile } = props;
  const [socket, setSocket] = useState(null);
  const [ref, setRef] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);

  useEffect(() => {
    if (!socket) {
      setSocket(io(process.env.SERVER_URL));
    }
    return () => {
      if (socket) {
        socket.emit('disconnect');
      }
    };
  });

  if (idFile) {
    socket.emit('join', props.idFile);
    socket.on('update', (data: any) => {
      if (ref) {
        ref.ref.current.selectionEnd = cursorPos;
        ref.ref.current.selectionStart = cursorPos;
      }
      setMd(data);
    });
  }
  const saveFile = (): void => {};

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
                  ref={(refVal: any) => {
                    setRef(refVal);
                  }}
                  value={md}
                  style={{ minHeight: '100%', minWidth: '100%' }}
                  placeholder="Write your markdown here"
                  onChange={(_, b) => {
                    if (ref) setCursorPos(ref.ref.current.selectionEnd);
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
