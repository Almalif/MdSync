import React, { useState } from 'react';
import { Divider, Grid, Segment, Form, TextArea } from 'semantic-ui-react';
import renderHTML from 'react-html-parser';

import renderMd from '../../utils/Markdown';
import MenuBar from './menuBar';

const Document = () => {
  const [md, setMd] = useState('');

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
                  style={{ minHeight: '100%', minWidth: '100%' }}
                  placeholder="Write your markdown here"
                  onChange={(_, b) => {
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
