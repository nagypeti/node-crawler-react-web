import React, { Component } from 'react'
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

class MenuLayout extends Component {
  render() {
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
                <Dropdown.Item>Menu A</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Menu B</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container text style={{ marginTop: '7em' }}>
          <MenuAdapter option='a'></MenuAdapter>
          <MenuAdapter option='b'></MenuAdapter>
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
}

export default MenuLayout
