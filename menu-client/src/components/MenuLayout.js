import React, { Component, useState } from 'react'
import MenuAdapter from './MenuAdapter'
import {
  Container,
  Dropdown,
  Grid,
  Header,
  Image,
  Menu,
  Segment,
} from 'semantic-ui-react'

const MenuLayout = () => {
  const [title, setTitle] = useState('a');

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='/pngegg.png' style={{ marginRight: '1.5em' }} />
            Today's Menu
          </Menu.Item>

          <Dropdown item simple text='Menus'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTitle('a')}>Menu A</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setTitle('b')}>Menu B</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <MenuAdapter option={title}></MenuAdapter>
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column>
              <Header inverted as='h4' content='Contact' />
              <p>Peter Nagy</p>
              <p>+36-70/414-9202</p>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    </div>
  )
}

export default MenuLayout
