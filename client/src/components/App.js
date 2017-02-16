import React, {Component} from 'react';
import autobind from 'class-autobind';
import SidebarNavigation from './SidebarNavigation';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autobind(this);
  }
  render() {
    return (
      <Split flex="right">
        <SidebarNavigation />
        <Article full="vertical" pad="none" direction="column">
          <Box colorIndex="light-2"
            direction="column"
            pad={{vertical: 'none'}}
            align="stretch"
            flex="grow"
            justify="start">
            {this.props.children}
          </Box>
        </Article>
      </Split>
    );
  }
}
